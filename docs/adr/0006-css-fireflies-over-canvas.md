# 0006 — Fireflies are CSS elements, not a canvas or a particle library

Date: 2026-09-07
Status: Accepted

## Context

The redesign calls for a subtle field of drifting motes (see **Firefly** in
`CONTEXT.md`) behind the whole page. Three implementations were considered:
CSS-animated elements, a hand-rolled Canvas 2D particle system, and a
particle library such as tsparticles or three.js.

`HomePage.jsx` already runs a `requestAnimationFrame` loop for Lenis smooth
scroll, on the main thread.

## Decision

Build the Firefly field as **~35 CSS-animated elements on desktop and ~15 on
mobile**, in a `position: fixed` layer, animating only `transform` and
`opacity`.

## Consequences

- Zero main-thread work per frame. The compositor owns the animation, so the
  main thread stays free for React and for the Lenis scroll loop that already
  lives there.
- Zero added download weight.
- Fireflies cannot react to the pointer. Accepted — that capability was the
  only real argument for canvas, and it was judged not worth a permanent
  main-thread loop for a decoration.
- The count and glow radius are a hard cap, not a suggestion. Each element is
  its own compositor layer, so this approach degrades badly if the count grows
  into the hundreds. If a future design wants many more particles, canvas
  becomes the correct choice and this ADR should be revisited.

## Alternatives considered

- **Canvas 2D + rAF.** Same download cost, more organic motion, and could
  react to the mouse. Rejected: it adds a *second* permanent rAF loop
  alongside Lenis's, on the very thread responsible for scroll smoothness —
  the failure CLAUDE.md describes as "what makes early scrolling feel sticky".
  Mitigable with offscreen pausing and a 30fps throttle, but still 0.5-2 ms
  every frame, forever, for a decoration.
- **tsparticles / three.js.** ~50-150 KB gzipped against a documented homepage
  budget of ~227 KB gzipped — a 20-60% increase in homepage weight to draw
  background dots. Rejected outright.
