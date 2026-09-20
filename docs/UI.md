# UI system and help copy

[← Documentation](../README.md#documentation)

## Design rules

Use the existing `th-*` classes and CSS variables for surfaces, foreground, border, muted text, and accent colors. Keep light/dark behavior aligned. Preserve established spacing when extracting components; a structural refactor should not redesign the layout.

Each CSS module has at most 100 lines. Imports in `src/app/globals.css` are ordered; later overrides are intentional. Keep related selectors together and preserve that order. Do not compress multiple unrelated rules just to pass the line limit.

Handwritten TypeScript modules target at most 120 lines. Extract independently meaningful views, hooks, services, or types. Comments explain non-obvious decisions such as timezone handling, async races, or permission boundaries.

## Shared controls

- `MiniCalendar`: Monday-first date selection with keyboard navigation.
- `DatePicker`: calendar and date shortcuts with optional bounds.
- `TimePicker`: same-day time entry.
- `Select`: project/role choices with visible selected state.
- `useAnchoredPopover`: shared top-layer positioning, viewport clamping and upward flipping.
- `HelpTip`: small keyboard-accessible explanatory popover.

Top-layer popovers escape card clipping and stacking contexts. The menu's height is constrained to the viewport. Escape and outside dismissal return controls to a closed state.

## Help catalog

All shared explanatory text lives in `src/data/help.ts`:

| Topic | Placement | Explains |
| --- | --- | --- |
| `roles` | Project team | Owner, admin, and member responsibilities |
| `performance` | Project performance chart | Scheduled workload rather than completion history |
| `duration` | Task duration shortcuts | Same-day planning, not time tracking |
| `archive` | Archive header | Retention and restoration |
| `invitation` | Team invitation form | Code expiry, usage limit, redemption |

To add help, add a typed entry and render `<HelpTip topic='…' />` next to the relevant label. Keep essential validation and error messages visible; tooltips should not hide required instructions.

## Accessibility checks

Verify keyboard focus, Escape/outside dismissal, readable error states, light/dark contrast, and viewport-edge placement. Test at a narrow mobile width and a short desktop height. Avoid using color as the only status indicator.
