begin;
alter table public.profile add column if not exists work_schedule jsonb;
grant update (work_schedule) on public.profile to authenticated;
create or replace function public.taskhub_validate_work_schedule() returns trigger
language plpgsql set search_path = '' as $$
declare s jsonb := new.work_schedule;
begin
 if s is null then return new; end if;
 if jsonb_typeof(s) <> 'object' or not (s ?& array['start','end','timezone','days'])
 or coalesce(s->>'start','') !~ '^([01][0-9]|2[0-3]):[0-5][0-9]$'
 or coalesce(s->>'end','') !~ '^([01][0-9]|2[0-3]):[0-5][0-9]$'
 or s->>'start' = s->>'end'
 or not exists(select 1 from pg_catalog.pg_timezone_names where name=s->>'timezone')
 or jsonb_typeof(s->'days') <> 'array' then raise exception 'Invalid working hours'; end if;
 if jsonb_array_length(s->'days') not between 1 and 7 or exists (
 select 1 from jsonb_array_elements(s->'days') d where jsonb_typeof(d) <> 'number' or d::text !~ '^[0-6]$'
 ) then raise exception 'Invalid working days'; end if;
 return new;
end; $$;
create trigger taskhub_validate_hours before insert or update of work_schedule on public.profile
for each row execute function public.taskhub_validate_work_schedule();

-- Presence is published only to the authenticated user's own channel.
-- Typing channels contain exactly two teammates and an optional shared project.
create or replace function public.taskhub_realtime_access(topic_input text, writing boolean)
returns boolean language plpgsql stable security definer set search_path = '' as $$
declare parts text[] := string_to_array(topic_input, ':'); a uuid; b uuid; project_uuid uuid;
begin
 if auth.uid() is null then return false; end if;
 if parts[1]='taskhub-online' and array_length(parts,1)=2 then
  a := parts[2]::uuid;
  return a=auth.uid() or (not writing and public.taskhub_teammates(a));
 end if;
 if parts[1]='taskhub-typing' and array_length(parts,1)=4 then
  a := parts[2]::uuid; b := parts[3]::uuid;
  if a=b or auth.uid() not in (a,b) then return false; end if;
  if parts[4]='general' then return public.taskhub_teammates(case when a=auth.uid() then b else a end); end if;
  project_uuid := parts[4]::uuid;
  return public.taskhub_project_member(project_uuid,a) and public.taskhub_project_member(project_uuid,b);
 end if;
 return false;
exception when invalid_text_representation then return false;
end; $$;
revoke all on function public.taskhub_realtime_access(text,boolean) from public;
grant execute on function public.taskhub_realtime_access(text,boolean) to authenticated;
create policy taskhub_live_read on realtime.messages for select to authenticated using (
 extension in ('presence','broadcast') and public.taskhub_realtime_access(realtime.topic(),false)
);
create policy taskhub_live_write on realtime.messages for insert to authenticated with check (
 extension in ('presence','broadcast') and public.taskhub_realtime_access(realtime.topic(),true)
);
commit;
