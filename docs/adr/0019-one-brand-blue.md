# 0019: One brand blue

Date: 2026-11-19
Status: Accepted and built, see `docs/blue-redesign-plan.md`. The two blue values
and the "film and photo pages keep lights-down" rule were changed by
[ADR 0021](0021-shared-theme-and-brand-blue-values.md): films alone keep
lights-down now.
Supersedes the colour rules of [ADR 0014](0014-visual-experience.md) (each
Experience keeps its own colours), [ADR 0016](0016-portfolio-hub.md) (lavender
marks Digital, blue marks Visual) and [ADR 0018](0018-contact-sheet-concept-and-edge-layer.md)
(the marker is yellow-green). Reverses the dark-only rule of
[ADR 0005](0005-dark-only-drop-theme-toggle.md) for the Product experience.

## Context

The site used a different colour per side: lavender and mint on Product, ink
blue on Visual, and an acid yellow-green marker that Quin never chose. On the
hub, colour carried a meaning (lavender = Digital, blue = Visual), which a
visitor has no way to learn. Quin wants the colour to be consistent and to be
his branding. The blue already has a story: it is the ink of a cyanotype, the
photographic print made in blue on paper, which fits the contact sheet concept
(ADR 0018).

## Decision

1. **One brand blue across the whole site.** `#6384ff` on dark grounds,
   `#0B2FB3` on paper. The marker is this blue too.
2. **Product drops lavender and mint.** Lavender becomes blue. Mint becomes paper
   cream (`#eee8d6`), kept small (fireflies, section numbers). Body text stays
   light grey.
3. **The two worlds stay.** Product keeps Krona One and the night sky. Visual
   keeps Bricolage Grotesque, Instrument Serif and paper. Only the colour is
   shared, so ADR 0014's split into two Experiences stands.
4. **Visual gets the edge layer** in its own language: blue ink blocks, masking
   tape, frame numbers and crop brackets, extending its existing printer's marks.
5. **One site-wide dark/light switch**, remembered, dark by default. Film and
   photo pages keep lights-down. Product gets a real light version.
6. **Marks are spread by job** (marker, tape, crop brackets, frame numbers,
   readout), never as decoration.
7. **The contact sheet hero replaces the hero at `/`.** `/sheet` redirects to `/`.

## Alternatives considered

- Keep two colours and add blue as a third accent. Rejected: breaks the 2 to 3
  colour limit and keeps colour meaning something visitors cannot learn.
- Cream as the marker. Rejected once Product moved to blue, because blue as the
  brand makes a blue marker consistent.
- One world, one set of fonts everywhere. Rejected: the biggest rebuild, and
  Quin chose to keep Product and Visual as separate worlds.

## Consequences

- Hard to undo once Product's tokens, fireflies, moon and borders are re-coloured
  (lavender appears in more than the accent token), so this is recorded.
- Product needs a designed light mode. Every theme shipped has to work in both
  modes.
- The hub's Contact band, which flips ground on purpose, must still work with
  the single site-wide switch.
- Glossary entries for Marker and Product experience change (see
  `docs/glossary.md`).
