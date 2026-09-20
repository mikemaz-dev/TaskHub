# Deployment and operations

[← Documentation](../README.md#documentation)

## Production configuration

Use a Node.js runtime compatible with Next.js 16 (20.9+). Install with `bun install --frozen-lockfile`, build with `bun run build`, and serve with `bun start` or a compatible Next.js hosting provider.

Set the two public Supabase environment variables for the production environment before building. Public variables are included in the client build. Configure Supabase Auth's Site URL and callback allowlist for the final HTTPS domain.

Apply the required database migrations before deploying code that depends on their columns/RPCs. Configure the avatars bucket and its policies. Preserve existing data and take a database backup before changing schema or access policies.

## Release checks

- Typecheck, lint, structure checks, tests, and production build pass.
- Landing and sign-in load with no runtime errors.
- Magic-link callback and onboarding work on the production origin.
- Project/task operations honor owner/admin/member permissions.
- Two members can redeem invitations and exchange messages; outsiders cannot read them.
- Notifications and unread counters update after supported events.
- Avatars, themes, and accent colors work on desktop and mobile.
- Dropdowns remain visible at the viewport bottom; chat composer stays reachable.

## Observe and recover

Inspect server logs, Supabase Auth/Postgres logs, and browser errors for failed requests. Avoid logging environment values, access tokens, or message bodies.

If application deployment fails, restore the previous application release and its matching dependency lockfile. Database rollback is separate: do not reset or drop tables to undo a frontend release. Restore from a reviewed migration or backup only with explicit authorization.

## Current limits

The checked-in migrations are incremental, not a full clean-install schema. Reports use scheduled dates and current checklist state. Message history loads the latest 100 messages; older-history pagination is not implemented. Activity notifications are in-app only. There are no attachments, tracked-work timers, or external productivity integrations.

## Search and sharing

Set `SITE_URL` to the final HTTPS origin before building. It supplies the canonical
URL, sitemap and absolute social-image URLs. The public landing page is indexable;
workspace and authentication pages are noindex. `/opengraph-image` produces a
1200×630 PNG without authentication. Check the preview with a public deployed URL;
localhost cannot be fetched by social networks. The SVG icon and Apple touch icon
use the TaskHub pulse mark.
