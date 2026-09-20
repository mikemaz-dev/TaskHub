# Contributing

[← Documentation](../README.md#documentation)

## Workflow

1. Install with the committed Bun lockfile and configure `.env.local`.
2. Read the feature's route, service, types, and related SQL permissions before changing it.
3. Keep views small and place data operations in services or feature hooks.
4. Preserve user layout adjustments and existing behavior during refactors.
5. Run the relevant checks and describe any unverified environment-dependent behavior.

## Commands

| Command | Purpose |
| --- | --- |
| `bun dev` | Turbopack development server |
| `bun run build` | Production build |
| `bun start` | Serve the production build |
| `bun run typecheck` | TypeScript validation |
| `bun run lint` | Next.js/TypeScript/React lint rules |
| `bun test` | Pure logic tests |
| `bun run check:structure` | CSS ≤100 and handwritten TS/TSX ≤120 lines |
| `bun run db-gen-types` | Regenerate database types for the configured Supabase project |

Run Prettier on changed source files. The project uses tabs, single quotes, no semicolons, and a 100-character print width. Generated database types are exempt from line limits.

## Testing

Unit tests cover task metrics, date/time validation, and avatar URL normalization. SQL fixtures exercise authorization and transactional behavior against a disposable database. UI checks should cover empty/populated states, keyboard navigation, narrow screens, and a short viewport.

For authentication and collaboration changes, verify with two real project members and a nonmember. Do not send test messages to other users or modify hosted permissions without authorization. A successful build is not proof of a complete multi-user end-to-end flow.

## Upgrades

Next.js 16.3.5 uses `src/proxy.ts` for session middleware. ESLint runs as a separate command. Keep React and React DOM aligned and preserve the lockfile. Do not enable experimental caching for authenticated data as a routine dependency update.

Useful primary references: [Next.js 16 upgrade guide](https://nextjs.org/docs/app/guides/upgrading/version-16), [Supabase RLS](https://supabase.com/docs/guides/database/postgres/row-level-security).
