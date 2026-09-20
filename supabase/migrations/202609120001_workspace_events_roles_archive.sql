-- Requires 202609110001_private_messages.sql. Atomic, non-destructive schema update.
begin;
alter table public.project add column if not exists archived_at timestamptz;
alter table public.project add column if not exists completed_at timestamptz;
alter table public.project_participants add column if not exists role text not null default 'member' check(role in ('admin','member'));
create or replace function public.taskhub_role(project_input uuid) returns text language sql stable security definer set search_path='' as $$
 select case when p.owner_id=auth.uid() then 'owner' else (select m.role from public.project_participants m where m.project_id=p.id and m.profile_id=auth.uid() limit 1) end from public.project p where p.id=project_input;
$$;
create or replace function public.taskhub_view_task(task_input uuid) returns boolean language sql stable security definer set search_path='' as $$
 select exists(select 1 from public.task t where t.id=task_input and ((t.project_id is not null and public.taskhub_role(t.project_id) is not null) or (t.project_id is null and t.owner_id=auth.uid())));
$$;
create or replace function public.taskhub_edit_task(task_input uuid) returns boolean language sql stable security definer set search_path='' as $$
 select exists(select 1 from public.task t where t.id=task_input and public.taskhub_view_task(t.id) and (t.owner_id=auth.uid() or public.taskhub_role(t.project_id) in ('owner','admin') or exists(select 1 from public.task_participants m where m.task_id=t.id and m.profile_id=auth.uid())) and not exists(select 1 from public.project p where p.id=t.project_id and (p.archived_at is not null or p.completed_at is not null)));
$$;
create or replace function public.taskhub_profile_visible(profile_input uuid) returns boolean language sql stable security definer set search_path='' as $$
 select profile_input=auth.uid() or exists(select 1 from public.project p where public.taskhub_role(p.id) is not null and public.taskhub_project_member(p.id,profile_input));
$$;
revoke all on function public.taskhub_role(uuid),public.taskhub_view_task(uuid),public.taskhub_edit_task(uuid),public.taskhub_profile_visible(uuid) from public;
grant execute on function public.taskhub_role(uuid),public.taskhub_view_task(uuid),public.taskhub_edit_task(uuid),public.taskhub_profile_visible(uuid) to authenticated;
-- Replace legacy policies on the workspace tables. No anonymous workspace access.
do $$ declare r record;begin
 for r in select tablename,policyname from pg_policies where schemaname='public' and tablename in ('project','profile','task','sub_task','project_participants','task_participants','invite') loop execute format('drop policy %I on public.%I',r.policyname,r.tablename);end loop;
end $$;
alter table public.project enable row level security;
alter table public.profile enable row level security;
alter table public.task enable row level security;
alter table public.sub_task enable row level security;
alter table public.project_participants enable row level security;
alter table public.task_participants enable row level security;
alter table public.invite enable row level security;
revoke all on public.project,public.profile,public.task,public.sub_task,public.project_participants,public.task_participants,public.invite from anon;
revoke all on public.project,public.profile,public.task,public.sub_task,public.project_participants,public.task_participants,public.invite from authenticated;
grant select,insert on public.project,public.profile to authenticated;
grant update(name,slug,color,deadline) on public.project to authenticated;
grant update(name,nick,description,profession,avatar_path) on public.profile to authenticated;
grant select,insert,delete on public.task,public.sub_task,public.task_participants to authenticated;
grant update(title,due_date,start_time,end_time,icon,project_id) on public.task to authenticated;
grant update(title,is_completed) on public.sub_task to authenticated;
grant select on public.project_participants,public.invite to authenticated;
create policy project_read on public.project for select to authenticated using(public.taskhub_role(id) is not null);
create policy project_create on public.project for insert to authenticated with check(owner_id=auth.uid() and archived_at is null and completed_at is null);
create policy project_edit on public.project for update to authenticated using(public.taskhub_role(id) in ('owner','admin') and archived_at is null) with check(public.taskhub_role(id) in ('owner','admin'));
create policy profile_read on public.profile for select to authenticated using(public.taskhub_profile_visible(id));
create policy profile_create on public.profile for insert to authenticated with check(id=auth.uid());
create policy profile_edit on public.profile for update to authenticated using(id=auth.uid()) with check(id=auth.uid());
create policy members_read on public.project_participants for select to authenticated using(public.taskhub_role(project_id) is not null);
create policy task_read on public.task for select to authenticated using(public.taskhub_view_task(id));
create policy task_create on public.task for insert to authenticated with check(owner_id=auth.uid() and (project_id is null or (public.taskhub_role(project_id) is not null and exists(select 1 from public.project p where p.id=project_id and p.archived_at is null and p.completed_at is null))));
create policy task_edit on public.task for update to authenticated using(public.taskhub_edit_task(id)) with check(public.taskhub_edit_task(id));
create policy task_delete on public.task for delete to authenticated using(public.taskhub_edit_task(id) and (owner_id=auth.uid() or public.taskhub_role(project_id) in ('owner','admin')));
create policy checklist_read on public.sub_task for select to authenticated using(public.taskhub_view_task(task_id));
create policy checklist_create on public.sub_task for insert to authenticated with check(public.taskhub_edit_task(task_id));
create policy checklist_edit on public.sub_task for update to authenticated using(public.taskhub_edit_task(task_id)) with check(public.taskhub_edit_task(task_id));
create policy checklist_delete on public.sub_task for delete to authenticated using(public.taskhub_edit_task(task_id));
create policy assignees_read on public.task_participants for select to authenticated using(public.taskhub_view_task(task_id));
create policy assignees_create on public.task_participants for insert to authenticated with check(public.taskhub_edit_task(task_id) and exists(select 1 from public.task t where t.id=task_id and public.taskhub_project_member(t.project_id,profile_id)));
create policy assignees_delete on public.task_participants for delete to authenticated using(public.taskhub_edit_task(task_id));
create policy invites_read on public.invite for select to authenticated using(public.taskhub_role(project_id) in ('owner','admin'));
-- Identity and project reassignment cannot be forged through a direct API update.
create or replace function public.taskhub_task_identity_guard() returns trigger language plpgsql set search_path='' as $$ begin
 if new.project_id is distinct from old.project_id or new.owner_id is distinct from old.owner_id or new.id<>old.id then raise exception 'Task identity and project cannot be changed';end if;return new;
end $$;
create trigger taskhub_task_identity before update on public.task for each row execute function public.taskhub_task_identity_guard();
-- Legacy RPC accepts a caller-supplied user id; retire it in favor of auth.uid().
do $$ declare f record;begin for f in select oid::regprocedure as signature from pg_proc where pronamespace='public'::regnamespace and proname='use_invite_code' loop execute format('revoke execute on function %s from public,anon,authenticated',f.signature);end loop;end $$;
create table public.taskhub_notification (
 id uuid primary key default gen_random_uuid(), recipient_id uuid not null references public.profile(id) on delete cascade,
 actor_id uuid references public.profile(id) on delete set null,project_id uuid references public.project(id) on delete cascade,
 kind text not null,title text not null,body text not null default '',href text not null,created_at timestamptz not null default now(),read_at timestamptz
);
create index taskhub_notification_inbox on public.taskhub_notification(recipient_id,created_at desc);
create index taskhub_notification_unread on public.taskhub_notification(recipient_id) where read_at is null;
alter table public.taskhub_notification enable row level security;
revoke all on public.taskhub_notification from public,anon,authenticated;
grant select on public.taskhub_notification to authenticated;
grant update(read_at) on public.taskhub_notification to authenticated;
create policy notification_read on public.taskhub_notification for select to authenticated using(recipient_id=auth.uid() and (project_id is null or public.taskhub_role(project_id) is not null));
create policy notification_mark_read on public.taskhub_notification for update to authenticated using(recipient_id=auth.uid()) with check(recipient_id=auth.uid());
create or replace function public.taskhub_emit(project_input uuid,kind_input text,title_input text,body_input text,href_input text) returns void language sql security definer set search_path='' as $$
 insert into public.taskhub_notification(recipient_id,actor_id,project_id,kind,title,body,href)
 select members.id,auth.uid(),project_input,kind_input,title_input,body_input,href_input from (
 select owner_id id from public.project where id=project_input union select profile_id from public.project_participants where project_id=project_input
 ) members join public.profile recipient on recipient.id=members.id where members.id is distinct from auth.uid();
$$;
revoke all on function public.taskhub_emit(uuid,text,text,text,text) from public,anon,authenticated;
create or replace function public.taskhub_workspace_event() returns trigger language plpgsql security definer set search_path='' as $$
declare project_uuid uuid; task_uuid uuid; event_title text; destination text; detail text;begin
 if tg_table_name='task' then
  if tg_op='UPDATE' and (new.title,new.due_date,new.start_time,new.end_time,new.icon) is not distinct from (old.title,old.due_date,old.start_time,old.end_time,old.icon) then return new;end if;
  project_uuid:=new.project_id;task_uuid:=new.id;detail:=new.title;event_title:=case when tg_op='INSERT' then 'Task created' else 'Task updated' end;destination:='/dashboard?task='||new.id;
 elsif tg_table_name='sub_task' then
  if tg_op='UPDATE' and (new.title,new.is_completed) is not distinct from (old.title,old.is_completed) then return new;end if;
  select t.project_id,t.id,t.title into project_uuid,task_uuid,detail from public.task t where t.id=new.task_id;
  event_title:=case when tg_op='INSERT' then 'Checklist item added' when new.is_completed then 'Checklist item completed' else 'Checklist updated' end;destination:='/dashboard?task='||task_uuid;
 elsif tg_table_name='project' then
  if (new.name,new.deadline,new.archived_at,new.completed_at) is not distinct from (old.name,old.deadline,old.archived_at,old.completed_at) then return new;end if;
  project_uuid:=new.id;detail:=new.name;destination:='/dashboard/projects/'||coalesce(new.slug,new.id::text);
  event_title:=case when new.archived_at is not null and old.archived_at is null then 'Project archived' when new.completed_at is not null and old.completed_at is null then 'Project completed' when new.archived_at is null and old.archived_at is not null then 'Project restored' when new.completed_at is null and old.completed_at is not null then 'Project reopened' else 'Project updated' end;
 elsif tg_table_name='project_participants' then
  project_uuid:=new.project_id;select coalesce(name,nick,'A teammate') into detail from public.profile where id=new.profile_id;event_title:=case when tg_op='INSERT' then 'Teammate joined the project' else 'Project role updated' end;destination:='/dashboard/team';
 end if;
 if project_uuid is not null then perform public.taskhub_emit(project_uuid,tg_table_name,event_title,coalesce(detail,''),destination);end if;return new;
end $$;
revoke all on function public.taskhub_workspace_event() from public,anon,authenticated;
create trigger taskhub_task_event after insert or update on public.task for each row execute function public.taskhub_workspace_event();
create trigger taskhub_checklist_event after insert or update on public.sub_task for each row execute function public.taskhub_workspace_event();
create trigger taskhub_project_event after update on public.project for each row execute function public.taskhub_workspace_event();
create trigger taskhub_member_event after insert or update of role on public.project_participants for each row execute function public.taskhub_workspace_event();
create or replace function public.taskhub_create_invite(project_input uuid) returns text language plpgsql security definer set search_path='' as $$
declare invite_code text:=gen_random_uuid()::text;begin
 if coalesce(public.taskhub_role(project_input),'') not in ('owner','admin') then raise exception 'Only project owners and admins can invite people';end if;
 if exists(select 1 from public.project where id=project_input and archived_at is not null) then raise exception 'Restore this project before inviting people';end if;
 insert into public.invite(code,type,project_id,created_by,max_uses,used_count,expires_at) values(invite_code,'project',project_input,auth.uid(),10,0,now()+interval '7 days');
 perform public.taskhub_emit(project_input,'invitation','Project invitation created','An owner or administrator created a team invitation.','/dashboard/team');return invite_code;
end $$;
create or replace function public.taskhub_accept_project_invite(code_input text) returns uuid language plpgsql security definer set search_path='' as $$
declare invitation public.invite%rowtype; user_uuid uuid:=auth.uid();begin
 if user_uuid is null then raise exception 'Authentication required';end if;
 if char_length(code_input)>128 then raise exception 'Invalid invitation';end if;
 select * into invitation from public.invite where code=code_input and type='project' for update;
 if not found or invitation.project_id is null then raise exception 'Invalid invitation';end if;
 if not exists(select 1 from public.project p where p.id=invitation.project_id and p.archived_at is null and (p.owner_id=invitation.created_by or exists(select 1 from public.project_participants m where m.project_id=p.id and m.profile_id=invitation.created_by and m.role='admin'))) then raise exception 'Invitation is no longer active';end if;
 if invitation.expires_at is not null and invitation.expires_at<=now() then raise exception 'Invitation expired';end if;
 if public.taskhub_project_member(invitation.project_id,user_uuid) then return invitation.project_id;end if;
 if invitation.max_uses is not null and coalesce(invitation.used_count,0)>=invitation.max_uses then raise exception 'Invitation exhausted';end if;
 if not exists(select 1 from public.profile where id=user_uuid) then raise exception 'Complete your profile first';end if;
 insert into public.project_participants(project_id,profile_id,role) values(invitation.project_id,user_uuid,'member');
 update public.invite set used_count=coalesce(used_count,0)+1 where id=invitation.id;return invitation.project_id;
end $$;
create or replace function public.taskhub_set_member_role(project_input uuid,profile_input uuid,role_input text) returns void language plpgsql security definer set search_path='' as $$ begin
 if public.taskhub_role(project_input) is distinct from 'owner' then raise exception 'Only the project creator can change roles';end if;
 if role_input not in ('admin','member') then raise exception 'Invalid role';end if;
 if exists(select 1 from public.project where id=project_input and owner_id=profile_input) then raise exception 'The creator role cannot be changed';end if;
 update public.project_participants set role=role_input where project_id=project_input and profile_id=profile_input and role is distinct from role_input;
end $$;
create or replace function public.taskhub_remove_member(project_input uuid,profile_input uuid) returns void language plpgsql security definer set search_path='' as $$ declare actor_role text:=public.taskhub_role(project_input);target_role text;begin
 select role into target_role from public.project_participants where project_id=project_input and profile_id=profile_input for update;
 if not found then raise exception 'Member not found';end if;
 if coalesce(actor_role,'') not in ('owner','admin') or (actor_role='admin' and target_role='admin') then raise exception 'Insufficient project permissions';end if;
 delete from public.task_participants where profile_id=profile_input and task_id in(select id from public.task where project_id=project_input);
 delete from public.project_participants where project_id=project_input and profile_id=profile_input;
 perform public.taskhub_emit(project_input,'membership','Project membership updated','A teammate was removed from the project.','/dashboard/team');
end $$;
create or replace function public.taskhub_project_state(project_input uuid,action_input text) returns void language plpgsql security definer set search_path='' as $$ declare actor_role text:=public.taskhub_role(project_input);begin
 if coalesce(actor_role,'') not in ('owner','admin') then raise exception 'Only the project creator or admin can manage project status';end if;
 if action_input in ('archive','restore') and actor_role<>'owner' then raise exception 'Only the project creator can archive or restore';end if;
 if action_input='archive' then update public.project set archived_at=now() where id=project_input and archived_at is null;
 elsif action_input='restore' then update public.project set archived_at=null where id=project_input;
 elsif action_input='complete' then update public.project set completed_at=now() where id=project_input and archived_at is null;
 elsif action_input='reopen' then update public.project set completed_at=null where id=project_input and archived_at is null;
 else raise exception 'Invalid project action';end if;
end $$;
revoke all on function public.taskhub_create_invite(uuid),public.taskhub_accept_project_invite(text),public.taskhub_set_member_role(uuid,uuid,text),public.taskhub_remove_member(uuid,uuid),public.taskhub_project_state(uuid,text) from public,anon;
grant execute on function public.taskhub_create_invite(uuid),public.taskhub_accept_project_invite(text),public.taskhub_set_member_role(uuid,uuid,text),public.taskhub_remove_member(uuid,uuid),public.taskhub_project_state(uuid,text) to authenticated;
do $$ begin if exists(select 1 from pg_publication where pubname='supabase_realtime') then alter publication supabase_realtime add table public.taskhub_notification;end if;end $$;
-- Task fields and assignments commit together, including edits by an assignee.
create or replace function public.taskhub_save_task(task_input uuid,payload jsonb) returns uuid language plpgsql security definer set search_path='' as $$
declare task_uuid uuid:=task_input;project_uuid uuid:=(payload->>'project_id')::uuid;profile_uuid uuid;begin
 if auth.uid() is null then raise exception 'Authentication required';end if;
 if char_length(btrim(coalesce(payload->>'title',''))) not between 1 and 100 then raise exception 'Task title must contain 1–100 characters';end if;
 if payload->>'due_date' is null then raise exception 'Due date is required';end if;
 if nullif(payload->>'end_time','') is not null and (nullif(payload->>'start_time','') is null or (payload->>'end_time')::time<=(payload->>'start_time')::time) then raise exception 'End time must be after start time';end if;
 if task_uuid is null then
  if public.taskhub_role(project_uuid) is null or exists(select 1 from public.project where id=project_uuid and (archived_at is not null or completed_at is not null)) then raise exception 'You cannot create tasks in this project';end if;
 else
  perform 1 from public.task where id=task_uuid for update;
  if not public.taskhub_edit_task(task_uuid) or not found then raise exception 'You cannot edit this task';end if;
  if not exists(select 1 from public.task where id=task_uuid and project_id=project_uuid) then raise exception 'Task project cannot be changed';end if;
 end if;
 if jsonb_typeof(coalesce(payload->'participants','[]'::jsonb))<>'array' then raise exception 'Invalid participants';end if;
 for profile_uuid in select distinct value::uuid from jsonb_array_elements_text(coalesce(payload->'participants','[]'::jsonb)) loop
  if not public.taskhub_project_member(project_uuid,profile_uuid) then raise exception 'Participants must belong to the project';end if;
 end loop;
 if task_uuid is null then
  insert into public.task(owner_id,project_id,title,due_date,start_time,end_time,icon) values(auth.uid(),project_uuid,btrim(payload->>'title'),(payload->>'due_date')::date,nullif(payload->>'start_time','')::time,nullif(payload->>'end_time','')::time,coalesce(payload->>'icon','check-circle')) returning id into task_uuid;
 else
  update public.task set title=btrim(payload->>'title'),due_date=(payload->>'due_date')::date,start_time=nullif(payload->>'start_time','')::time,end_time=nullif(payload->>'end_time','')::time,icon=coalesce(payload->>'icon','check-circle') where id=task_uuid;
 end if;
 delete from public.task_participants where task_id=task_uuid;
 insert into public.task_participants(task_id,profile_id) select task_uuid,value::uuid from (select distinct value from jsonb_array_elements_text(coalesce(payload->'participants','[]'::jsonb))) ids;
 return task_uuid;
end $$;
revoke all on function public.taskhub_save_task(uuid,jsonb) from public,anon;
grant execute on function public.taskhub_save_task(uuid,jsonb) to authenticated;

commit;
