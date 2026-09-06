# 0007 — Custom cursor, and the rules that keep it from being an accessibility problem

Date: 2026-09-07
Status: Accepted

## Context

The redesign adds a Custom Cursor: a dot tracking the pointer plus a lagging
ring that changes shape over interactive elements (see **Custom Cursor** and
**Cursor Affordance** in `CONTEXT.md`).

Replacing the native cursor is genuinely contentious. Done carelessly it
strands users with no visible pointer if JavaScript stalls, and it removes an
affordance that people with motor or visual difficulties rely on.

## Decision

Ship the Custom Cursor, bound by four non-negotiable rules:

1. **A dot tracks the true pointer position 1:1.** Only the ring lags. There
   is always something rendered at the real coordinates, so a stutter degrades
   the effect rather than losing the pointer.
2. **The native cursor is hidden only under `@media (pointer: fine)`.** Touch
   and hybrid devices keep their native behaviour and render no custom cursor
   at all.
3. **`prefers-reduced-motion` disables it entirely**, restoring the native
   cursor — not merely shortening the easing.
4. **The pointer listener is passive and rAF-coalesced**, and does nothing
   while the pointer is still.

## Consequences

- The signature "designed" feel, with contextual affordances ("View Project"
  over a card) that genuinely aid scanning rather than just decorating.
- Cost is proportional to pointer movement and falls to zero at rest — a
  different shape of cost from the permanent loop rejected in ADR 0006, which
  is why accepting one and refusing the other is consistent rather than
  contradictory.
- Four rules to remember on every future change to this component. They are
  listed here precisely because a future edit that quietly breaks rule 1 or 3
  would be hard to notice and bad for real users.

## Alternatives considered

- **Soft glow follower, native cursor kept.** Zero accessibility risk and it
  pairs well with the Firefly ground. Rejected as the primary treatment
  because it gives up contextual affordances, which are the part that earns
  its keep. Remains the natural fallback if the full cursor proves
  troublesome.
- **Magnetic buttons, no custom cursor.** No accessibility cost at all, but a
  per-element effect rather than a site-wide signature.
