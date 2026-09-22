-- Disposable database only. Never run this fixture in a Supabase project.
\set ON_ERROR_STOP on
do $$begin if not exists(select 1 from pg_roles where rolname='anon') then create role anon;end if;if not exists(select 1 from pg_roles where rolname='authenticated') then create role authenticated;end if;end $$;
create schema auth;create function auth.uid() returns uuid language sql stable as $$select nullif(current_setting('request.jwt.claim.sub',true),'')::uuid$$;grant usage on schema auth to authenticated;
create table public.profile(id uuid primary key,name text,nick text,description text,profession text,avatar_path text);
create table public.project(id uuid primary key default gen_random_uuid(),owner_id uuid references profile(id),name text,slug text,color text,deadline date,created_at timestamptz default now());
create table public.project_participants(project_id uuid references project(id),profile_id uuid references profile(id),unique(project_id,profile_id));
create table public.task(id uuid primary key default gen_random_uuid(),owner_id uuid references profile(id),project_id uuid references project(id),title text not null,due_date date not null,start_time time,end_time time,icon text);
create table public.sub_task(id uuid primary key default gen_random_uuid(),task_id uuid references task(id) on delete cascade,title text,is_completed boolean default false);
create table public.task_participants(task_id uuid references task(id) on delete cascade,profile_id uuid references profile(id),unique(task_id,profile_id));
create table public.invite(id uuid primary key default gen_random_uuid(),code text unique,type text,project_id uuid references project(id),task_id uuid,created_by uuid references profile(id),expires_at timestamptz,max_uses int,used_count int);
\ir ../migrations/202609110001_private_messages.sql
insert into profile(id,name) values ('00000000-0000-0000-0000-000000000001','Owner'),('00000000-0000-0000-0000-000000000002','Admin'),('00000000-0000-0000-0000-000000000003','Member'),('00000000-0000-0000-0000-000000000004','Assigned member'),('00000000-0000-0000-0000-000000000005','Outsider');
insert into project(id,owner_id,name) values ('10000000-0000-0000-0000-000000000001','00000000-0000-0000-0000-000000000001','Project');
insert into project_participants values ('10000000-0000-0000-0000-000000000001','00000000-0000-0000-0000-000000000002'),('10000000-0000-0000-0000-000000000001','00000000-0000-0000-0000-000000000003'),('10000000-0000-0000-0000-000000000001','00000000-0000-0000-0000-000000000004');
\ir ../migrations/202609120001_workspace_events_roles_archive.sql
set role authenticated;set request.jwt.claim.sub='00000000-0000-0000-0000-000000000001';
select taskhub_set_member_role('10000000-0000-0000-0000-000000000001','00000000-0000-0000-0000-000000000002','admin');
insert into task(id,owner_id,project_id,title,due_date) values ('20000000-0000-0000-0000-000000000001','00000000-0000-0000-0000-000000000001','10000000-0000-0000-0000-000000000001','Owner task','2026-09-12');
insert into task_participants values ('20000000-0000-0000-0000-000000000001','00000000-0000-0000-0000-000000000004');
set request.jwt.claim.sub='00000000-0000-0000-0000-000000000003';
do $$ declare n int;begin
 if public.taskhub_role('10000000-0000-0000-0000-000000000001')<>'member' then raise exception 'FAIL: wrong member role';end if;
 if (select count(*) from task)<>1 then raise exception 'FAIL: member task visibility';end if;
 update task set title='Unauthorized' where id='20000000-0000-0000-0000-000000000001';get diagnostics n=row_count;if n<>0 then raise exception 'FAIL: unassigned member edited task';end if;
 begin perform taskhub_set_member_role('10000000-0000-0000-0000-000000000001','00000000-0000-0000-0000-000000000003','admin');raise exception 'FAIL: escalation allowed';exception when raise_exception then if sqlerrm='FAIL: escalation allowed' then raise;end if;end;
 if (select count(*) from taskhub_notification where title='Task created')<>1 then raise exception 'FAIL: task notification missing';end if;
 if exists(select 1 from taskhub_notification where recipient_id<>auth.uid()) then raise exception 'FAIL: private notifications leaked';end if;
 begin insert into taskhub_notification(recipient_id,kind,title,href) values(auth.uid(),'fake','Fake','/dashboard');raise exception 'FAIL: forged notification';exception when insufficient_privilege then null;end;
end $$;
update taskhub_notification set read_at=now();
set request.jwt.claim.sub='00000000-0000-0000-0000-000000000004';
update task set title='Assigned member edit' where id='20000000-0000-0000-0000-000000000001';
do $$ begin if not exists(select 1 from task where title='Assigned member edit') then raise exception 'FAIL: assignee edit rejected';end if;end $$;
set request.jwt.claim.sub='00000000-0000-0000-0000-000000000002';
select taskhub_create_invite('10000000-0000-0000-0000-000000000001');
do $$ declare before_count int;begin
 select count(*) into before_count from task;
 begin perform taskhub_save_task(null,'{"project_id":"10000000-0000-0000-0000-000000000001","title":"Invalid assignment","due_date":"2026-09-12","participants":["00000000-0000-0000-0000-000000000005"]}'::jsonb);raise exception 'FAIL: outsider assigned';exception when raise_exception then if sqlerrm='FAIL: outsider assigned' then raise;end if;end;
 if (select count(*) from task)<>before_count then raise exception 'FAIL: task partially saved';end if;
 perform taskhub_save_task(null,'{"project_id":"10000000-0000-0000-0000-000000000001","title":"Atomic task","due_date":"2026-09-12","participants":["00000000-0000-0000-0000-000000000003"]}'::jsonb);
 if not exists(select 1 from task join task_participants on task.id=task_id where title='Atomic task' and profile_id='00000000-0000-0000-0000-000000000003') then raise exception 'FAIL: assignment missing';end if;
end $$;

select taskhub_project_state('10000000-0000-0000-0000-000000000001','complete');
do $$ begin if public.taskhub_edit_task('20000000-0000-0000-0000-000000000001') then raise exception 'FAIL: completed project editable';end if;
 begin perform taskhub_project_state('10000000-0000-0000-0000-000000000001','archive');raise exception 'FAIL: admin archived';exception when raise_exception then if sqlerrm='FAIL: admin archived' then raise;end if;end;
end $$;
set request.jwt.claim.sub='00000000-0000-0000-0000-000000000001';
select taskhub_project_state('10000000-0000-0000-0000-000000000001','reopen');
select taskhub_project_state('10000000-0000-0000-0000-000000000001','archive');
do $$ begin if public.taskhub_edit_task('20000000-0000-0000-0000-000000000001') then raise exception 'FAIL: archived project editable';end if;end $$;
select taskhub_project_state('10000000-0000-0000-0000-000000000001','restore');
do $$ begin if not public.taskhub_edit_task('20000000-0000-0000-0000-000000000001') then raise exception 'FAIL: restored project not editable';end if;end $$;
set request.jwt.claim.sub='00000000-0000-0000-0000-000000000005';
do $$ begin if (select count(*) from project)<>0 or (select count(*) from task)<>0 or (select count(*) from taskhub_notification)<>0 then raise exception 'FAIL: outsider access';end if;end $$;
reset role;set role anon;
do $$ begin begin perform * from profile;raise exception 'FAIL: anonymous profile read';exception when insufficient_privilege then null;end;end $$;
reset role;
select 'PASS: role isolation, task editing, notifications, archive/restore, anonymous access' as result;
