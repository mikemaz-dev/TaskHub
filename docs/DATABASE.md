# Database and permissions

[← Documentation](../README.md#documentation)

## Core entities

| Entity | Purpose |
| --- | --- |
| `profile` | User identity, display name, profession, description, avatar |
| `project` | Owner, name, slug, color, deadline, completion/archive timestamps |
| `project_participants` | Project membership with member/admin role |
| `task` | Project work, creator, due date, same-day start/end time |
| `sub_task` | Checklist items and completion state |
| `task_participants` | Assignees linked to task and profile |
| `invite` | Invitation code, expiry, usage limit |
| `taskhub_direct_message` | Sender, recipient, shared project, text, read timestamp |
| `taskhub_notification` | Recipient-specific project activity and read state |

The owner is determined by `project.owner_id`, not by a client-provided role label.

## Role matrix

| Action | Owner | Admin | Member |
| --- | --- | --- | --- |
| Read shared project and tasks | Yes | Yes | Yes |
| Create tasks in active project | Yes | Yes | Yes |
| Edit any task in active project | Yes | Yes | Own or assigned |
| Delete task | Yes | Yes | Own |
| Invite collaborators | Yes | Yes | No |
| Change member roles | Yes | No | No |
| Remove member | Yes | Members only | No |
| Complete/reopen project | Yes | Yes | No |
| Archive/restore project | Yes | No | No |

Completed or archived projects do not accept task edits. Their tasks, memberships, and conversations are retained. Archive is reversible and does not permanently delete data.

## RPC contracts

- `taskhub_save_task`: creates/updates a task and assignments atomically; validates project membership and assignees before writing.
- `taskhub_create_invite`: owner/admin creates a seven-day code with ten uses.
- `taskhub_accept_project_invite`: redeems a code with row locking and idempotent membership handling.
- `taskhub_set_member_role`, `taskhub_remove_member`: enforce membership administration rules.
- `taskhub_project_state`: complete, reopen, archive, or restore with role checks.
- `taskhub_edit_task`, `taskhub_view_task`, `taskhub_role`: scoped permission helpers.

Function signatures and exact constraints are defined in the migrations; application types mirror the database contract.

## Notifications and messages

Database triggers emit notifications for supported task/checklist, project-state, and membership events. Recipients are relevant project profiles, excluding the actor. Notifications describe events after the migration; historic activity is not fabricated.

Messages are private to sender and recipient within a shared project. Only incoming messages loaded in a visible, focused conversation are marked read. Read counters use realtime subscriptions plus polling. There are no email/push notifications or attachments.

## Migrations and tests

Apply the two migrations in timestamp order. The workspace migration replaces policies on legacy core tables, removes anonymous access, and retires old invitation-function grants. Inspect schema compatibility before applying it to a different database.

`supabase/tests/messaging.sql` and `workspace.sql` create disposable fixtures to test isolation, spoofing rejection, invitation redemption, role boundaries, archive transitions, and atomic task saves. Run them only in a new disposable PostgreSQL database; they are not production migration scripts.

## General conversations

Apply `202609130001_general_conversations.sql` after the two previous migrations.
It makes message `project_id` nullable. NULL means General; project conversations
retain their existing policies. General messages can be sent only to a shared
project teammate, and read only by sender/recipient. Existing messages are kept.


## Retired tables: RLS remediation

Apply `supabase/migrations/202609150001_lock_legacy_tables.sql` in SQL Editor
as the database owner. It enables RLS on `project_stat`, `project_chart_point`
and `chat_message`, revokes table/column privileges from PUBLIC, anon and
authenticated, and adds a restrictive deny policy for client roles. Existing
policies cannot override that deny. Rows and tables are preserved; privileged
administrative access remains available.

Current screens do not call the legacy statistics services. Dashboard analytics
use projects/tasks; current messages use `taskhub_direct_message`. Do not add
broad read policies to the retired tables. Review any external integrations,
views or security-definer functions separately; this migration addresses direct
client access to the three reported tables, not a full database security audit.

After applying, refresh Security Advisor. The three `rls_disabled_in_public`
findings should disappear. This read-only SQL verifies the RLS flags:

```sql
select relname, relrowsecurity
from pg_catalog.pg_class
where relnamespace = 'public'::regnamespace
  and relname in ('project_stat', 'project_chart_point', 'chat_message');
```

Expect exactly three rows with `relrowsecurity = true`. Manually confirm that
Dashboard and the current chat still work. The migration has not been applied
by the coding agent; SQL Editor execution and hosted verification are required.
