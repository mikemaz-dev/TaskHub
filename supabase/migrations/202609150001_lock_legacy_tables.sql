-- Retired tables: current UI uses tasks/projects and taskhub_direct_message.
-- Keep historical rows; deny client access even if old permissive policies exist.
-- Run as the database owner in Supabase SQL Editor. Safe to reapply.
begin;

do $migration$
declare
  table_name text;
  column_names text;
begin
  foreach table_name in array array['project_stat', 'project_chart_point', 'chat_message']
  loop
    -- Fail atomically on a schema mismatch rather than silently skip protection.
    execute format('alter table public.%I enable row level security', table_name);
    execute format('revoke all privileges on table public.%I from public, anon, authenticated', table_name);

    -- Table-level REVOKE does not remove separately granted column privileges.
    select string_agg(quote_ident(a.attname), ', ' order by a.attnum)
      into column_names
      from pg_catalog.pg_attribute a
      where a.attrelid = format('public.%I', table_name)::regclass
        and a.attnum > 0 and not a.attisdropped;
    execute format(
      'revoke select (%s), insert (%s), update (%s), references (%s) on table public.%I from public, anon, authenticated',
      column_names, column_names, column_names, column_names, table_name
    );

    execute format('drop policy if exists taskhub_retired_client_deny on public.%I', table_name);
    execute format(
      'create policy taskhub_retired_client_deny on public.%I as restrictive for all to anon, authenticated using (false) with check (false)',
      table_name
    );
  end loop;
end
$migration$;

commit;
