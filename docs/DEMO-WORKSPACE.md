# Personal sample workspace

Apply `supabase/migrations/202609220001_demo_workspace.sql` after the existing
migrations. No hosted changes are applied by copying or deploying application code.

Settings → Explore with sample data creates 3 projects, 12 tasks and 36 checklist
steps, including an archived project and dates relative to the current device day.
Fixtures intentionally include past tasks and fixed example hours, so reports and
past calendar states can be explored regardless of the user's working schedule.
The About TaskHub page is linked from the sidebar and explains the project story.

## Ownership and cleanup

The RPC derives the owner from auth.uid(); callers cannot choose another owner or
supply IDs to delete. An owner-only registry stores the exact generated IDs. Clients
can only read their registry; writes happen inside the security-definer function.
An advisory transaction lock serializes generation/removal for each owner. Repeated
creation is a no-op until the previous sample set is removed. Failures roll back.

Removal deletes registered sample tasks, including edits and their checklist steps.
It deletes a registered project only if it still belongs to the caller and has no
remaining tasks, members, invitations or conversation messages. Otherwise that
project stays in place, with its Demo label, and is no longer registered for cleanup.
Personal tasks are never selected by name or date; they are outside the registry.
No fake profiles, invitations or messages are generated. Use a real teammate for
chat, presence and role testing. Sample data does not change profile preferences.

## Manual verification before deployment

- Apply the migration; confirm an empty account can populate its workspace.
- Click Add twice or from two tabs: only one sample set should exist.
- Create a personal task inside a demo project. Remove samples and verify the task
  and containing project remain, while registered sample tasks are removed.
- Confirm another account cannot read the registry or remove the first user's data.
- Confirm removal works when some demo tasks/projects have already been deleted.

SQL runtime and two-account checks require a database with the existing schema;
they have not been executed by the coding agent. Do not treat TypeScript checks as
proof of database behavior. Publishing application code does not apply database migrations automatically.
