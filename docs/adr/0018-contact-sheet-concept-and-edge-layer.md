# 0018: The contact sheet concept and the edge layer

Date: 2026-11-19
Status: Prototype on branch `redesign/contact-sheet`. Not merged. The sheet hero
became the hub's hero at `/` in phase 2 of `docs/blue-redesign-plan.md`, and
`/sheet` now redirects to `/` ([ADR 0019](0019-one-brand-blue.md)).
Follows [ADR 0010](0010-differentiate-through-concept-not-more-motion.md) and
[ADR 0017](0017-show-the-skill-features-and-e2e-tests.md).

## Context

ADR 0010 said a portfolio stands out through a committed concept, not more
motion. After the show-the-skill features (ADR 0017) the skeleton was still
conventional: hero, pills, screenshot collage, sections. Quin asked for the
uniqueness of the role-specific templates he had studied: giant type, highlighter
blocks, tape, crop brackets, personality in the small print.

## Decision

One concept, the **contact sheet**: the site is a sheet of numbered frames. Each
frame is a project, Product and Visual interleaved so neither leads. Picks (the
featured projects) are ringed and taped.

An **edge layer** carries the look, with one hot accent, the marker (`#d9ff3f`
on night, `#ffe14d` on paper). Every mark carries a fact:

- **Marker block** highlights the words that matter (the two doors on the hub,
  "Actually Work" on the Product hero, section headings).
- **Tape** labels a pick, a screenshot's name, or a project's real status.
- **Crop brackets** frame a trimmed print (hubs, Product hero, case study).
- **Frame numbers** number sheet frames, Work cards and hub sections.
- **Readout** on the hub hero follows the frame under the pointer, like a
  timecode, and otherwise states the real counts.

Lavender and blue stay as the two portfolio colours. Product tokens:
`--color-mark`, `--color-on-mark`, and the helper classes `.marker`, `.tape`,
`.crop`, `.frame-no` in `src/index.css`. Hub tokens are `--h-mark` and
`--h-on-mark`.

## Scope so far

- `/sheet`: the hub with the contact sheet hero and the edge layer. The live hub
  at `/` is unchanged.
- The Product hero, Work cards and case study opening carry the edge layer on the
  branch.
- Visual, the rest of the case study and the About section are not redone yet.

## Consequences

- The hub's earlier choice not to number sections (ADR 0016) is reversed for the
  sheet variant, because the numbers are frame numbers.
- Tape on frames sits outside the dimmed link so it stays at full strength.
- Before merging: decide whether `/sheet` replaces `/`, and review the Product
  look in a browser at several widths.