# Working hours, live status and sign-in emails

## Apply in Supabase

1. Run `supabase/migrations/202609140001_availability.sql` in SQL Editor after
   `202609130001_general_conversations.sql`. It adds the optional working schedule,
   server-side validation and private Realtime channel policies. No existing
   profile data or messages are removed.
2. Open Authentication → Email templates → Magic Link. Set the subject to
   **Your TaskHub workspace is one click away** and paste
   `supabase/templates/magic-link.html` into the body.
3. Apply the same HTML to Confirm signup, with subject **Welcome to TaskHub**.
   New accounts and returning users can receive different Supabase template types.
4. Keep `{{ .ConfirmationURL }}` intact. Keep the Site URL and allowed callbacks
   configured for localhost and the deployed origin as described in SETUP.md.

The repository template does not change hosted Supabase settings automatically.
Sender name/address are configured separately in Auth SMTP settings; this HTML
changes the email contents. No emails are sent by these setup steps.

## Behavior

- Settings → Your working hours saves start/end, selected days and an IANA time
  zone. An overnight shift belongs to the day on which it starts. End time is
  exclusive; equal start/end is invalid. Hide hours clears the saved schedule.
- Team cards and project members display the schedule and whether it is currently
  a working time. Status uses the participant's time zone, including daylight
  saving time, and refreshes every 30 seconds. Schedule changes are loaded when
  the team/project page refreshes.
- Online means a visible TaskHub workspace tab is connected. Multiple tabs are
  supported. Offline means no presence is tracked. If Realtime cannot connect,
  the UI shows Status unavailable rather than claiming the person is offline.
- Each user can publish only to their own private online channel. Teammates can
  subscribe to it. Typing channels are private to the two participants and
  scoped to General or a shared project. No draft text is broadcast or stored.
- Typing stops after a short pause, blur, switching conversations, hiding the tab
  or sending. A receiving-side timeout clears stale typing after a disconnect.
- Magic-link callbacks now show the branded confirmation screen before entering
  the workspace. The success screen verifies the session, not just a URL flag.

## Manual review

Use two signed-in accounts to check visible/hidden tabs, lost connections,
typing and switching projects. Set one user's schedule across midnight or in a
different time zone and confirm the team status. Preview the email in Supabase,
then request a new link yourself and check success and expired-link screens.
The publication preparation passed type checking, lint, unit tests and a production
build. Hosted two-account Realtime and email-delivery verification remains manual.
The task form checks working hours, but the planner grid still displays the full
day; limiting the visible grid to working hours remains follow-up work.

## References

- [Supabase email templates](https://supabase.com/docs/guides/auth/auth-email-templates)
- [Supabase private Realtime authorization](https://supabase.com/docs/guides/realtime/authorization)
- [Supabase Presence](https://supabase.com/docs/guides/realtime/presence)
