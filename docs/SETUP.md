# Local setup

[← Documentation](../README.md#documentation)

## Requirements

- Node.js 20.9 or newer; Bun 1.3.14 (`packageManager` in `package.json`).
- A Supabase project with the legacy TaskHub tables and the incremental migrations below.
- An email address for Supabase magic-link sign-in.

## Install and configure

```sh
bun install --frozen-lockfile
cp .env.example .env.local
bun dev
```

Before starting, fill in both variables in `.env.local`:

| Variable | Value |
| --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | HTTPS API URL of your Supabase project, not the dashboard URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Complete public anon key from that same project |

Do not put a service-role key in either variable. Application access is enforced by database RLS. Local environment files are ignored by Git. Restart the server after changing them.

## Authentication and avatars

In Supabase Auth, set the Site URL to your deployment origin and allow `http://localhost:3000/auth/callback` plus the production callback. The application uses email magic links and an onboarding profile form. The legacy `/auth/confirm` token-hash route remains supported.

Avatars use the public `avatars` storage bucket. Uploads use `<user-id>/<filename>` paths. Storage policies must allow users to write/delete only their own directory; public reads serve avatars. Supported uploads are JPEG, PNG, or WebP up to 5 MB.

## Database prerequisites

This repository does not contain a full baseline for the original database. Do not run a database reset against an existing project. For a new installation, obtain the baseline schema and storage policies from the project maintainer first.

Apply incremental migrations in order through your normal Supabase migration process:

1. `202609110001_private_messages.sql`
2. `202609120001_workspace_events_roles_archive.sql`

The first adds private messaging and invitation redemption. The second adds roles, project lifecycle, notifications, stricter access policies, and atomic task writes. See [Database](DATABASE.md) for details. Hosted deployment state is environment-specific; a checked-in migration is not evidence that it has been applied.

After schema changes, regenerate types with `bun run db-gen-types`. The command targets the configured project ID in `package.json`; change that ID for your own Supabase project.

## Troubleshooting

| Symptom | Check |
| --- | --- |
| Missing Supabase URL/key | Both variables exist and the server was restarted |
| `Invalid URL` | URL starts with `https://` and is the API URL |
| Invalid API key | URL and key belong to the same Supabase project |
| Missing table or RPC | Required migrations were applied in order |
| Project disappears after access changes | User is the owner or a project member; RLS does not grant global access |
| Avatar upload fails | Bucket exists and the authenticated user's directory is writable |
| Magic link returns to the wrong site | Site URL and redirect allowlist match the intended environment |

For branded authentication emails, work schedules and chat presence, follow
[Availability and email setup](AVAILABILITY-AND-EMAIL.md).
