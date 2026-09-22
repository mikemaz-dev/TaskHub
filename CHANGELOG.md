# Changelog

## Unreleased — TaskHub workspace update

### Workspace and collaboration

- Redesigned dashboard, project pages and responsive application shell.
- Project invitations, owner/admin/member permissions and lifecycle actions.
- Private project and general conversations, unread counts and activity notifications.
- Working-hours settings, teammate availability and Realtime typing indicators.
- Archive views with restoration, task checklists and participant management.

### Planning and reporting

- Day, week and month planning with an independently scrolling hour grid.
- Current-time indicator, date/time controls and past-time validation.
- Project analytics, CSV export and print-friendly reports with selected dates.

### Identity and maintainability

- Branded authentication callback and an installable Supabase email template.
- Landing page, application icons, social preview, sitemap and metadata.
- Next.js 16 migration, smaller stylesheet modules and removal of legacy UI code.
- Database migrations for permissions, notifications, conversations and legacy RLS.
- Setup, architecture, database, deployment and contribution documentation.

### Validation and remaining manual checks

- TypeScript, ESLint, 13 unit tests, structure limits and production build passed.
- Hosted migrations and email templates must be applied separately from Git changes.
- Confirm online/typing behavior with two accounts and delivery of a new magic link.
- Working-hour validation exists in the task form; restricting the planner's visible
  hour range remains follow-up work. Existing historical tasks remain visible.
- Migrations extend the original database; a complete fresh-install schema is not included.

These changes are prepared locally. No GitHub push or deployment has been performed.
