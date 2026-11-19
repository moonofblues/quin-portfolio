# 0021: One shared theme, and the brand blue gets a single value for shapes

Date: 2026-11-19
Status: Accepted. Not built yet.
Changes [ADR 0019](0019-one-brand-blue.md): its two blue values (`#6384ff` on
dark, `#0B2FB3` on paper) and its rule that photo pages keep lights-down. The rest
of 0019 stands.

## Context

Quin looked at the built hub and Visual and found four things that did not match
the intent of ADR 0019:

- The name "quin ledesma" in light mode used the near-black navy text colour,
  while the tapes used the royal blue `#0B2FB3`. Two blues sat side by side.
- On the hub, each portfolio row previews the ground of the portfolio it links to
  (Digital shows night, Visual shows paper). In dark mode the page is already
  night and in light mode it is already paper, so one of the two rows showed no
  hover at all in each mode.
- A photo set forced the page dark even when the visitor had chosen light.
- Visual had no light/dark switch at all, and its images ran far larger than the
  window.

Contrast was checked against WCAG 2.1 (4.5:1 for normal text, 3:1 for large text
and shapes). No single blue reaches 4.5:1 on both paper and night, because the
luminance range that passes on one fails on the other. A blue around `#3355e6`
does reach 3:1 or better on both grounds, and 4.79:1 against cream, so it works
for shapes, large type and the label text printed on them.

## Decision

1. **One shared theme.** The hub, Visual and Product read and write the same
   remembered light/dark setting. Visual gets a toggle in its top bar. Film pages
   hide the toggle, because they do not follow it.
2. **Photo sets follow the theme.** Films keep going dark on their own (lights
   down, ADR 0014). Graphic design pages and the Visual index already followed it.
3. **The brand blue for shapes has one value per ground, chosen by Quin from a
   side-by-side comparison.** On paper it is `#1a3ed6` (6.34:1 against cream). On
   night it is `#3355e6` (4.79:1 against cream, 3.4:1 against the ground). Both
   are used for tapes, marker blocks, crop brackets, frame marks, filled buttons
   and the hub contact band. Label text on those shapes is cream in both modes.
   Quin first asked for `#1a3ed6` everywhere, but on night it is only 2.57:1
   against the ground, under the 3:1 WCAG asks of shapes, so night keeps the
   brighter blue.
4. **The name is cream in dark mode and the brand blue in light mode,** on the hub
   and on Visual.
5. **Small blue text keeps its own value per ground.** On dark grounds it stays
   `#6384ff` (5.95:1), and is lightened only where a spot fails. On paper it uses
   the paper brand blue `#1a3ed6`. A single blue cannot serve small text on both
   grounds.
6. **Hub portfolio rows** show the blue marker block behind the portfolio name on
   hover and keyboard focus in both modes, and keep the ground preview where it is
   visible.
7. **Visual dark mode reuses its existing night ground,** not the hub's black, so
   Visual keeps its own mood (ADR 0019, point 3).
8. **Product (/dev) is recoloured only.** Shapes take the brand blue and its text
   stays `#6384ff`. It gets no light mode or toggle in this round.
9. **Order of work:** this batch, then a light Product with its toggle (phase 7),
   then the remaining Motion slices, then the copy pass. Motion scenes are built
   once for both modes instead of being redone afterwards.
10. **Visual images are capped by height,** about 80% of the window on photo and
    design pages, with proportions kept and the click-to-zoom view unchanged. The
    Visual index grid moves to 4 columns on wide screens, 3 on laptops and 2 on
    tablets, with a height cap on cards.

## Alternatives considered

- **Keep two tuned blues (`#6384ff` dark, `#0B2FB3` paper) and only match the
  light-mode name to its tapes.** Rejected by Quin: the two modes would still not
  share a blue, which was the complaint.
- **A separate Visual theme setting.** Rejected: two switches to keep in sync, and
  against the single site-wide switch already promised in ADR 0019.
- **Films follow the theme too.** Rejected: video on a dark ground is the cinema
  convention, and the player keeps its own frame either way.
- **Build the light Product after the Motion slices.** Rejected: every scene would
  need a second pass for light mode.
- **Width-only cap on Visual images.** Rejected: a tall portrait would still be
  taller than the screen.

## Consequences

- Hard to undo once tokens across hub, Visual and Product move to the new value,
  so this is recorded.
- Dark-mode shapes are deeper than the old glowing `#6384ff`. Anything that relied
  on that glow (the sky, fireflies, moon) needs a visual check.
- Tape and marker labels flip from night text to cream text in dark mode.
- Visual's `--ink` token, used for large type and small text on paper, changes from
  `#0B2FB3` to `#1a3ed6`. Small text on paper drops from 8.28:1 to 6.34:1, which
  still passes.
- The dark-mode blue and the light-mode blue are two values, so a shape that
  changes mode changes shade slightly. Accepted by Quin after comparing both.
- Visual loses part of ADR 0019's wording ("film and photo pages keep
  lights-down"): only films keep it.
