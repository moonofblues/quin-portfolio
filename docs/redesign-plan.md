# 2026-09 Dark Redesign — Plan

Working plan from the `/grill-with-docs` session of 2026-09-07. **Not yet
implemented — nothing in `src/` has been changed for this redesign.**

Read this first if you are picking the work up in a new session. Settled
decisions are binding; open questions still need Quin's answer before code is
written.

## Brief

Make the portfolio feel more creative — interesting sections, real animation,
distinctive styling — using two references for *vibe only*, not to copy:

- **Kristian Ulrych** (`ulrychkristian.cz`) — the colour source. Near-black
  ground, lavender accent, mint secondary, faint starfield.
- **A VCA Animal Hospitals case study** — big italic display numerals as
  section markers, drawn connector lines, horizontal marquee.

Hard constraint from Quin: **keep the current layout for the majority of the
site, and do not change the fonts.** This is a re-skin plus targeted section
work, not a re-architecture.

## Settled

| Decision | Outcome |
|---|---|
| Scope | Full visual re-skin. Current layout stays. Fonts stay (Krona One / Instrument Sans). |
| Light mode | **Dropped.** Dark only, toggle removed. See ADR 0005. |
| Palette | Lavender primary + mint secondary on a near-black ground. Gold `#c9a96e` retired. |
| Decorations | Moon, Stars **and** Fireflies all coexist. Fireflies are a separate, subtler system — not a replacement for the Stars. |
| Fireflies | ~35 CSS elements desktop / ~15 mobile, fixed layer, transform+opacity only. No canvas, no library. See ADR 0006. |
| Cursor | Dot tracking 1:1 + lagging ring + contextual affordances. Four safety rules. See ADR 0007. |
| Testimonials | Real and attributable — Quin is collecting names and permission. Moving to a new Sanity `testimonial` document type. |
| Sections to change | Testimonials, Services, About timeline, plus one new section. |

### Palette tokens

Replaces the `.dark` / `@theme` blocks in `src/index.css`. The light token set
is deleted.

```
ground    #07090D   page background (darker than the reference's #0d1117)
surface   #0E1219   cards, elevated panels
text      #F2F1EE   primary text
muted     #8A8F9A   secondary text
lavender  #A99CE4   PRIMARY accent — links, emphasis, active nav, cursor
mint      #A8D5CD   SECONDARY accent — badges, pills, numerals, stats
```

## Open questions

Answer these before writing code.

1. **Which new section?** Quin asked for one addition but we did not pick it.
   Standing suggestion: a "Currently" / "Now" block — what Quin is building
   and teaching right now. Personal, factual, not in any template.
2. **Animation vocabulary.** Which techniques are in scope beyond the scroll
   reveals already present? Candidates: staggered text reveal per line,
   scroll-drawn SVG connector lines, a CSS marquee, sticky/pinned scroll
   sequences, parallax, page-transition overlays, count-up numbers.
3. **How far to push the reference motifs.** Specifically: do the homepage
   sections get large italic display numerals (`01`, `02`, `03`) as markers,
   and do drawn connector lines link them?
4. **Hero treatment.** The reference leads with a huge type statement plus a
   portrait. The current hero leads with a badge, skill tags, headline and a
   three-screenshot collage. Does the hero change, or is it re-skinned only?
   ("Keep the current layout" suggests re-skin only — needs confirming, since
   the hero is what carries first impressions.)
5. **Services rework.** Provisional direction is a CSS marquee of real tools
   and capabilities plus a short positioning statement, replacing the six
   generic service cards. Confirm.
6. **About timeline animation.** Confirm the treatment: large numerals, a
   connector line that draws itself on scroll, roles revealing in sequence.
7. **Testimonial schema fields.** Proposed: `quote`, `name`, `role`,
   `organisation`, `photo`, `profileUrl`, `sortOrder`, `published`. Is a photo
   required or optional?
8. **Performance budget.** Current homepage critical path is ~698 KB raw /
   ~227 KB gzipped. What is the new ceiling? Recommend holding the existing
   number as a hard cap, since every decision so far was made to avoid adding
   weight.

## Known cleanup, unrelated to the redesign but in the same files

- `src/components/FeaturedWork.jsx` — roughly 90 lines of commented-out dead
  code at the top of the file.
- There are two `Navigation` components (`components/Navigation.jsx` and
  `components/layout/Navigation.jsx`) and two `Footer` components, both pairs
  apparently duplicated. Establish which is live before editing either.
- `ThemeContext` becomes dead once ADR 0005 is implemented.
