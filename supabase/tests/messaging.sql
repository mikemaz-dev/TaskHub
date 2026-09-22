-- Run ONLY in a disposable, empty PostgreSQL database. This fixture approximates
-- the existing schema; it is not a replacement for testing the live RLS policies.
\set ON_ERROR_STOP on
create role anon;
create role authenticated;
create schema auth;
create function auth.uid() returns uuid language sql stable as $$ select nullif(current_setting('request.jwt.claim.sub',true),'')::uuid $$;
grant usage on schema auth to authenticated;
create table public.profile(id uuid primary key);
create table public.project(id uuid primary key,owner_id uuid references profile(id));
create table public.project_participants(project_id uuid references project(id),profile_id uuid references profile(id),unique(project_id,profile_id));
create table public.invite(id uuid primary key default gen_random_uuid(),code text unique,type text,project_id uuid references project(id),task_id uuid,created_by uuid references profile(id),expires_at timestamptz,max_uses int,used_count int);
grant select on public.project,public.profile,public.project_participants to authenticated;
grant select,insert,update on public.invite to authenticated;
\ir ../migrations/202609110001_private_messages.sql
insert into profile values ('00000000-0000-0000-0000-000000000001'),('00000000-0000-0000-0000-000000000002'),('00000000-0000-0000-0000-000000000003');
insert into project values ('10000000-0000-0000-0000-000000000001','00000000-0000-0000-0000-000000000001');
insert into project_participants values ('10000000-0000-0000-0000-000000000001','00000000-0000-0000-0000-000000000002');
set role authenticated;
set request.jwt.claim.sub='00000000-0000-0000-0000-000000000001';
insert into taskhub_direct_message(project_id,sender_id,recipient_id,body) values ('10000000-0000-0000-0000-000000000001','00000000-0000-0000-0000-000000000001','00000000-0000-0000-0000-000000000002','Hello');
insert into invite(code,type,project_id,created_by,max_uses,used_count) values ('test-invitation','project','10000000-0000-0000-0000-000000000001','00000000-0000-0000-0000-000000000001',1,0);
do $$ begin
 begin
 insert into taskhub_direct_message(project_id,sender_id,recipient_id,body) values ('10000000-0000-0000-0000-000000000001','00000000-0000-0000-0000-000000000002','00000000-0000-0000-0000-000000000001','Spoofed');
 raise exception 'FAIL: sender spoofing succeeded';
 exception when insufficient_privilege then null; end;
 begin
 insert into taskhub_direct_message(project_id,sender_id,recipient_id,body) values ('10000000-0000-0000-0000-000000000001','00000000-0000-0000-0000-000000000001','00000000-0000-0000-0000-000000000003','Outsider');
 raise exception 'FAIL: outsider message succeeded';
 exception when insufficient_privilege then null; end;
end $$;
set request.jwt.claim.sub='00000000-0000-0000-0000-000000000002';
do $$ begin
 if (select count(*) from taskhub_direct_message)<>1 then raise exception 'FAIL: recipient cannot read';end if;
 begin update taskhub_direct_message set body='Changed';raise exception 'FAIL: body mutation succeeded';exception when insufficient_privilege then null;end;
end $$;
update taskhub_direct_message set read_at=now();
set request.jwt.claim.sub='00000000-0000-0000-0000-000000000003';
do $$ begin if (select count(*) from taskhub_direct_message)<>0 then raise exception 'FAIL: outsider can read';end if;end $$;
select taskhub_accept_project_invite('test-invitation');
select taskhub_accept_project_invite('test-invitation');
reset role;
do $$ begin
 if (select used_count from invite where code='test-invitation')<>1 then raise exception 'FAIL: duplicate acceptance uses capacity';end if;
 if not exists(select 1 from project_participants where profile_id='00000000-0000-0000-0000-000000000003') then raise exception 'FAIL: invitation did not add member';end if;
end $$;
select 'PASS: private messages, spoofing prevention, read-only body, invitation acceptance and idempotency' as result;
