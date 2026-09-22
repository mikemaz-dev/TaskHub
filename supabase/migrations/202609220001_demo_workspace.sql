-- Personal, transactional demo fixtures. No client-supplied owner or record IDs.
begin;
create table public.taskhub_demo_workspace (
 owner_id uuid primary key references public.profile(id) on delete cascade,
 project_ids uuid[] not null default '{}', task_ids uuid[] not null default '{}'
);
alter table public.taskhub_demo_workspace enable row level security;
revoke all on public.taskhub_demo_workspace from public, anon, authenticated;
grant select on public.taskhub_demo_workspace to authenticated;
create policy demo_owner_read on public.taskhub_demo_workspace for select to authenticated using(owner_id=auth.uid());

create function public.taskhub_demo_data(action_input text, day_input date default current_date)
returns void language plpgsql security definer set search_path='' as $$
declare actor uuid:=auth.uid(); saved public.taskhub_demo_workspace%rowtype;
 p uuid; t uuid; projects uuid[]:='{}'; tasks uuid[]:='{}'; i int; j int;
 names text[]:=array['Demo · Product launch','Demo · Design studio','Demo · Completed sprint'];
 titles text[]:=array['Outline the launch story','Review the landing page','Prepare the product walkthrough','Publish the release notes'];
begin
 if actor is null then raise exception 'Sign in before using demo data'; end if;
 -- Serialize add/remove across tabs, including the first insertion.
 perform pg_advisory_xact_lock(hashtextextended(actor::text, 220001));
 select * into saved from public.taskhub_demo_workspace where owner_id=actor;
 if action_input='remove' then
  if not found then return; end if;
  -- Never delete a project that now contains real tasks, collaborators or messages.
  -- Demo tasks (including edits to them) are explicitly disposable.
  delete from public.sub_task where task_id in (select id from public.task where id=any(saved.task_ids) and owner_id=actor);
  delete from public.task_participants where task_id in (select id from public.task where id=any(saved.task_ids) and owner_id=actor);
  delete from public.task where id=any(saved.task_ids) and owner_id=actor;
  delete from public.project p where p.id=any(saved.project_ids) and p.owner_id=actor
   and not exists(select 1 from public.task t where t.project_id=p.id)
   and not exists(select 1 from public.project_participants m where m.project_id=p.id)
   and not exists(select 1 from public.taskhub_direct_message m where m.project_id=p.id)
   and not exists(select 1 from public.invite v where v.project_id=p.id);
  delete from public.taskhub_demo_workspace where owner_id=actor;
  return;
 end if;
 if action_input<>'add' then raise exception 'Unknown demo action'; end if;
 if saved.owner_id is not null then return; end if;
 if day_input is null or abs(day_input-current_date)>1 then raise exception 'Invalid demo date'; end if;
 if not exists(select 1 from public.profile where id=actor) then raise exception 'Complete your profile first'; end if;
 for i in 1..3 loop
  p:=gen_random_uuid(); projects:=array_append(projects,p);
  insert into public.project(id,owner_id,name,slug,color,deadline)
   values(p,actor,names[i],'demo-'||p::text,(array['#8170f2','#10b981','#f59e0b'])[i],day_input+7);
  for j in 1..4 loop
   t:=gen_random_uuid(); tasks:=array_append(tasks,t);
   insert into public.task(id,owner_id,project_id,title,due_date,start_time,end_time,icon)
    values(t,actor,p,titles[j],day_input+j-2,time '09:00'+(j-1)*interval '1 hour',time '09:45'+(j-1)*interval '1 hour','check-circle');
   insert into public.sub_task(task_id,title,is_completed) values
    (t,'Define the outcome',true),(t,'Prepare the first draft',j<=2),(t,'Review and finish',j=1);
  end loop;
  if i=3 then update public.project set completed_at=now(),archived_at=now() where id=p; end if;
 end loop;
 insert into public.taskhub_demo_workspace(owner_id,project_ids,task_ids) values(actor,projects,tasks);
end $$;
revoke all on function public.taskhub_demo_data(text,date) from public,anon;
grant execute on function public.taskhub_demo_data(text,date) to authenticated;
commit;
