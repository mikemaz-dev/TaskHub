-- Additive migration for the existing TaskHub schema. Review existing grants/RLS before production rollout.
begin;
create or replace function public.taskhub_project_member(project_id_input uuid, user_id_input uuid)
returns boolean language sql stable security definer set search_path = '' as $$
 select exists(select 1 from public.project p where p.id=project_id_input and
 (p.owner_id=user_id_input or exists(select 1 from public.project_participants m where m.project_id=p.id and m.profile_id=user_id_input)));
$$;
revoke all on function public.taskhub_project_member(uuid,uuid) from public;
grant execute on function public.taskhub_project_member(uuid,uuid) to authenticated;

create table public.taskhub_direct_message (
 id uuid primary key default gen_random_uuid(),
 project_id uuid not null references public.project(id) on delete cascade,
 sender_id uuid not null references public.profile(id) on delete cascade,
 recipient_id uuid not null references public.profile(id) on delete cascade,
 body text not null check (char_length(btrim(body)) between 1 and 4000),
 created_at timestamptz not null default now(),
 read_at timestamptz,
 constraint distinct_message_participants check(sender_id<>recipient_id)
);
create index taskhub_messages_inbox on public.taskhub_direct_message(recipient_id,created_at desc);
create index taskhub_messages_outbox on public.taskhub_direct_message(sender_id,created_at desc);
alter table public.taskhub_direct_message enable row level security;
revoke all on public.taskhub_direct_message from anon, authenticated;
grant select on public.taskhub_direct_message to authenticated;
grant insert (project_id,sender_id,recipient_id,body) on public.taskhub_direct_message to authenticated;
grant update (read_at) on public.taskhub_direct_message to authenticated;
create policy message_read on public.taskhub_direct_message for select to authenticated using (
 (sender_id=auth.uid() or recipient_id=auth.uid()) and public.taskhub_project_member(project_id,auth.uid())
);
create policy message_send on public.taskhub_direct_message for insert to authenticated with check (
 sender_id=auth.uid() and public.taskhub_project_member(project_id,auth.uid()) and public.taskhub_project_member(project_id,recipient_id)
);
create policy message_mark_read on public.taskhub_direct_message for update to authenticated using (
 recipient_id=auth.uid() and public.taskhub_project_member(project_id,auth.uid())
) with check (recipient_id=auth.uid() and public.taskhub_project_member(project_id,auth.uid()));

create or replace function public.taskhub_accept_project_invite(code_input text)
returns uuid language plpgsql security definer set search_path = '' as $$
declare invitation public.invite%rowtype; current_user_id uuid:=auth.uid();
begin
 if current_user_id is null then raise exception 'Authentication required'; end if;
 if char_length(code_input)>128 then raise exception 'Invalid invitation'; end if;
 select * into invitation from public.invite where code=code_input and type='project' for update;
 if not found or invitation.project_id is null then raise exception 'Invalid invitation'; end if;
 if not exists(select 1 from public.project where id=invitation.project_id and owner_id=invitation.created_by) then raise exception 'Invalid invitation owner'; end if;
 if invitation.expires_at is not null and invitation.expires_at<=now() then raise exception 'Invitation expired'; end if;
 if public.taskhub_project_member(invitation.project_id,current_user_id) then return invitation.project_id; end if;
 if invitation.max_uses is not null and coalesce(invitation.used_count,0)>=invitation.max_uses then raise exception 'Invitation exhausted'; end if;
 if not exists(select 1 from public.profile where id=current_user_id) then raise exception 'Complete your profile first'; end if;
 insert into public.project_participants(project_id,profile_id) values(invitation.project_id,current_user_id) on conflict do nothing;
 update public.invite set used_count=coalesce(used_count,0)+1 where id=invitation.id;
 return invitation.project_id;
end;
$$;
revoke all on function public.taskhub_accept_project_invite(text) from public;
grant execute on function public.taskhub_accept_project_invite(text) to authenticated;
-- Existing permissive policies cannot bypass these ownership checks.
alter table public.invite enable row level security;
create policy taskhub_invite_create on public.invite for insert to authenticated with check (created_by=auth.uid());
create policy taskhub_invite_owner_insert on public.invite as restrictive for insert to authenticated with check (
 created_by=auth.uid() and type='project' and task_id is null and exists(select 1 from public.project p where p.id=project_id and p.owner_id=auth.uid())
);
create policy taskhub_invite_owner_update on public.invite as restrictive for update to authenticated using (
 created_by=auth.uid()
) with check(created_by=auth.uid() and exists(select 1 from public.project p where p.id=project_id and p.owner_id=auth.uid()));
-- Realtime is optional: the application also refreshes conversations periodically.
do $$ begin
 if exists(select 1 from pg_publication where pubname='supabase_realtime') then
  alter publication supabase_realtime add table public.taskhub_direct_message;
 end if;
end $$;
commit;
