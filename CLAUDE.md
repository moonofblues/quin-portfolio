# quin-portfolio

Personal portfolio site — React + Vite + Tailwind v4, content in Sanity.

## Design principles

### Minimize UI friction

**This site is read by hiring managers.** Every extra scroll, every hunt for
information, is a real cost. When building or reviewing any section:

- **Use the available width.** Don't leave large empty margins on wide
  viewports. Check what `max-w-*` sibling sections on the same page use
  before defaulting to a narrow container. Multi-item content (cards,
  timelines, steppers, highlight grids) should generally use `max-w-6xl` or
  `max-w-7xl`, not `max-w-4xl`.
- **Watch for layouts that structurally waste space.** A layout can use a
  wide container and still waste most of it — e.g. an alternating/zigzag
  timeline reserves ~50% of every row as empty spacer. Widening the
  container doesn't fix that; changing the layout does.
- **Prefer horizontal arrangements over vertical stacking** when content
  allows. 4 steps in one row beats 4 stacked rows. Reducing scroll depth is
  usually worth more than visual novelty.
- **Exception: long-form prose.** Paragraph-only sections (Challenge,
  Solution, Overview) still benefit from a narrower measure (`max-w-4xl`)
  for readability, and body copy over ~30 words should stay left-aligned
  even inside a centered column.

### Container width scale

Widths had drifted across the case-study page (3xl through 7xl with no
rule), which both wasted margin space and cramped grid content. Stick to
this scale — don't invent intermediate widths:

| Width | Use for |
|---|---|
| full-bleed | Color-blocked bands (Background/Challenge split, pull quote) |
| `max-w-7xl` | Media and multi-column grids: hero, process stepper, pain points, how-might-we, solution highlights, key functions, wireframes, ideation diagrams, showcase galleries, related projects |
| `max-w-6xl` | Sidebar layouts and smaller grids: project brief, research methods, results |
| `max-w-4xl` | **Prose only** — applied to the paragraph itself, not the section |

The key pattern for mixed sections (prose + grid/media): put the **section**
at `max-w-7xl` and constrain the **paragraph** with its own `max-w-4xl`.
That gives images and cards the full width while keeping text at a readable
measure. Don't narrow the whole section just because it contains a
paragraph.

## Conventions

- Case-study page sections are extracted into
  `src/components/case-study/` (`HeroCollage`, `StatRing`,
  `ProcessTimeline`) rather than inlined in `CaseStudyPage.jsx`.
- Optional case-study fields render only when filled in, never as empty
  states — see `docs/adr/0002-*`.
- Architecture decisions go in `docs/adr/`, domain terms in
  `docs/glossary.md`.

## Notes

- `npm run lint` has ~30 pre-existing errors (unused `motion` imports,
  react-hooks warnings) unrelated to any given change — check that your
  change doesn't *add* to the count rather than expecting a clean run.
