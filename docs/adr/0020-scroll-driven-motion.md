# 0020: Scroll-driven motion

Date: 2026-11-19
Status: Accepted. Not built yet; it is phase 5 of `docs/blue-redesign-plan.md`.
Revises [ADR 0010](0010-differentiate-through-concept-not-more-motion.md), which
said the site should stand out through a committed concept and not through more
motion.

## Context

Quin showed three creator portfolios (a social media manager, a UGC video
editor, a video editor) whose pages are built from the tools of their own job:
a feed that fills in, an editing timeline that assembles, an export bar and a
raw-footage-to-final-cut counter. The motion there is not decoration. It
explains the work, and scroll drives it. Quin wants that feeling on his site.

ADR 0010 still holds in one respect: motion needs a purpose. What changes is
that the concept (the contact sheet, a cyanotype proof) now gets to move.

## Decision

One signature scene per portfolio, plus one small shared rule.

- **Hub: develop on arrival.** The name and statement show at once. The frames
  start as flat blue and come up to full colour one after another over about two
  seconds. The readout counts "developing… 07 / 18" and settles on the real
  totals, then the picks are taped one at a time. It plays once, inside the first
  screen, and adds no scrolling.
- **Product: inspector sweep on arrival.** Crop brackets snap onto a screenshot,
  its name tape sticks, then an outline sweeps a few real parts of the page and
  shows their live measurements once, reusing Inspect mode's code. On a phone it
  falls back to the tape and brackets only.
- **Visual: scroll-driven lights down.** On photo and film pages the intro stays
  on paper. As the work reaches the screen the room dims to blue-black over about
  one screen of scroll, and the lights come back up at the end. Text stays at 4.5:1
  contrast at every point between the two grounds.
- **Everywhere else: develop into view.** One shared rule: things arrive by
  developing, not by sliding or bouncing.

## Rules for all of it

- Anything that repeats is CSS only, never framer-motion.
- Animate only `transform` and `opacity` (a dimming layer, not a changing
  background colour), so the compositor owns it.
- Never delay the largest element on the page.
- Show the finished state under `prefers-reduced-motion`, and show every piece of
  information without the animation.
- Numbers are real: the counts come from the actual projects, never invented.
- No added scroll depth. A scene fits inside the page that is already there.

## Alternatives considered

- Motion on every section in the style of the references. Rejected: the most
  scrolling and the hardest to keep fast on a phone, and it fights the
  minimise-scroll-depth principle.
- Hero only. Rejected: it would not give the feeling Quin described.
- Pinned, scroll-driven hub (a sheet that exposes row by row). Rejected for the
  hub: it adds a screen or two of scrolling before the work.

## Consequences

- ADR 0010's "not more motion" is superseded by the rules above.
- The hub's old mouse lens was removed in phase 2; no pointer-only effect is
  needed for the signature scenes.
- Visual's layout code that fades to blue-black has to change from a fade on
  arrival to a scroll-driven layer.
- Glossary entries: Develop, Inspector sweep, Lights down.
