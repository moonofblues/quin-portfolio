# 0005 — Dark-only: drop the light theme and its toggle

Date: 2026-09-07
Status: Accepted

## Context

The site shipped with a full light and dark theme, a sun/moon toggle in the
navigation, and a default that followed `prefers-color-scheme` — so a visitor
on a light-mode laptop landed on the cream `#faf8f5` theme.

The 2026-09 redesign adopts a near-black ground with a lavender/mint accent
pair, and adds two decorations that depend on darkness to work at all: a
drifting Firefly field and a luminous Custom Cursor.

## Decision

Ship **dark only**. Remove the toggle from both `Navigation` components, drop
the light token set from `index.css`, and stop reading `prefers-color-scheme`.

## Consequences

- Fireflies, glow and the Custom Cursor read as designed rather than as
  effects that break in one of two modes.
- Every new section is styled once, not twice. This is the dominant practical
  benefit — the redesign adds several animated sections, and a second colour
  path on each is an ongoing tax on a solo maintainer.
- Visitors who prefer light interfaces get no choice. Accepted: a confidently
  dark portfolio reads as intentional, whereas a neglected light mode reads as
  unfinished.
- `ThemeContext` loses its reason to exist and should be deleted rather than
  left as a provider that only ever returns `"dark"`.

## Alternatives considered

- **Keep both, dark as the star.** Light survives as a plainer variant with
  fireflies faded out. Rejected: it commits every future section to two colour
  paths forever, in exchange for a mode that would never feel good.
- **Keep both at full parity**, including a light-mode firefly treatment
  (dark motes on cream). Rejected: most work by a wide margin, for a variant
  that cannot match the reference the redesign is chasing.
