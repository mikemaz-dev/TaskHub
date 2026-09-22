# Architecture

[← Documentation](../README.md#documentation)

## Application boundaries

TaskHub uses the Next.js App Router. Server pages load authenticated data through server Supabase clients. Interactive client components handle forms, filters, task dialogs, and realtime updates. The database is the final authority for permissions.

| Location | Responsibility |
| --- | --- |
| `src/app` | Routes, server loaders, layouts, route-specific UI |
| `src/proxy.ts` | Next.js 16 request interception and Supabase session refresh |
| `src/components/workspace` | Workspace features and their small view components/hooks |
| `src/components/workspace/messages` | Conversation loading, read receipts, composer, contacts |
| `src/components/workspace/controls` | Calendar, time/select controls, anchored top-layer popovers |
| `src/components/modals/task` | Task editor fields, permissions, form state, save mutation |
| `src/components/ui` | Shared low-level UI primitives |
| `src/services` | Supabase queries, mutations, profile and project operations |
| `src/lib/analytics` | Pure metric calculations and report export |
| `src/data/help.ts` | Shared user-facing help copy |
| `src/styles` | Ordered CSS modules, each at most 100 lines |
| `src/types` | Database and application contracts |
| `supabase/migrations` | Incremental schema, RPC, and permission changes |

## Data flow

A server page reads the current session, fetches scoped data, and passes it to the workspace view. User actions call a service or RPC. Successful mutations invalidate relevant React Query caches and refresh server-rendered data. Supabase RLS applies to every request.

React Query owns task details, search results, and conversations. Search is debounced by 250 ms and keyed by query. Conversations are keyed by current user and contact, preventing stale responses from replacing a different conversation. Realtime triggers refreshes; a 15-second poll provides a fallback.

Appearance is device-local. Theme uses `next-themes`; accent uses an external-store subscription to localStorage. Profile data, tasks, membership, messages, and notifications live in Supabase.

## Styles and components

`src/app/globals.css` imports style modules in explicit cascade order. Descriptive names identify each module; the import list retains the original order, including responsive overrides. The split improves maintainability; it does not claim that every source file becomes a separate network request or route bundle. Next.js/Tailwind compile and optimize the delivered CSS.

Components are separated by responsibility, not by arbitrary line fragments. CSS files are limited to 100 lines; handwritten TypeScript files to 120. Generated `db.types.ts` is excluded so type regeneration remains reliable. `bun run check:structure` enforces these boundaries.

## Dependencies

Next.js 16.3.5 and React 19.3.0 are pinned. Turbopack is used for development and production builds. Async request APIs and App Router conventions are retained; `middleware.ts` was migrated to `proxy.ts`.

Unused legacy calendar, Zustand state, old screens, and shadcn CLI dependencies were removed. Some local form primitives originally based on shadcn remain in active use, together with Radix Label/Slot. Removing those would require replacing working accessibility/form behavior; they are not unused dependencies.

React Compiler and Cache Components are not enabled as part of this upgrade. Authenticated, permission-sensitive data should not be globally cached without a separate design and validation step.
