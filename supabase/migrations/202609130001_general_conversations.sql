-- General messages remain private to two existing project teammates.
begin;
alter table public.taskhub_direct_message alter column project_id drop not null;
create or replace function public.taskhub_teammates(other_user uuid)
returns boolean language sql stable security definer set search_path = '' as $$
 select auth.uid() is not null and other_user <> auth.uid() and exists (
  select 1 from public.project p
  where public.taskhub_project_member(p.id, auth.uid())
    and public.taskhub_project_member(p.id, other_user)
 );
$$;
revoke all on function public.taskhub_teammates(uuid) from public;
grant execute on function public.taskhub_teammates(uuid) to authenticated;
drop policy if exists message_read on public.taskhub_direct_message;
drop policy if exists message_send on public.taskhub_direct_message;
drop policy if exists message_mark_read on public.taskhub_direct_message;
create policy message_read on public.taskhub_direct_message for select to authenticated using (
 (sender_id=auth.uid() or recipient_id=auth.uid())
 and (project_id is null or public.taskhub_project_member(project_id,auth.uid()))
);
create policy message_send on public.taskhub_direct_message for insert to authenticated with check (
 sender_id=auth.uid() and (
  (project_id is null and public.taskhub_teammates(recipient_id)) or
  (project_id is not null and public.taskhub_project_member(project_id,auth.uid())
   and public.taskhub_project_member(project_id,recipient_id))
 )
);
create policy message_mark_read on public.taskhub_direct_message for update to authenticated using (
 recipient_id=auth.uid() and (project_id is null or public.taskhub_project_member(project_id,auth.uid()))
) with check (
 recipient_id=auth.uid() and (project_id is null or public.taskhub_project_member(project_id,auth.uid()))
);
commit;
