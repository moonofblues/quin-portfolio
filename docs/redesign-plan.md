# 2026-09 Dark Redesign — Plan

Working plan from the `/grill-with-docs` session of 2026-09-07. **Not yet
implemented — nothing in `src/` has been changed for this redesign.**

Read this first if you are picking the work up in a new session. Settled
decisions are binding.

**Status (updated 2026-09-07, second grilling session):** all eight questions
below are now **settled** — the "Open questions" heading is retained for history
but each entry is resolved. What remains before/while coding is not *decisions*
but *content inputs* from Quin, collected under "Inputs still needed" at the
bottom. Still nothing in `src/` has been changed.

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
| Hero (Q4) | **Re-skin + motion, no restructure.** Centered layout and three-screenshot collage stay. Adds new palette, ambient layer, and a staggered per-line reveal on the headline. No portrait, no section numeral. ZCMC screenshot stays the untouched eager LCP element. |

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

1. ~~**Which new section?**~~ **SETTLED → "Now" block (activity-level).**
   A homepage section of 3–4 present-tense current activities
   (building / teaching / learning), each a short line, with a manual "as of"
   date. **Operates at activity level, never role level** — it must not restate
   the job titles already in the About timeline (`About.jsx:6–24`), or it's
   redundant. Gets a section numeral (`03`) and per-line reveal.
   - **Data model:** a Sanity **singleton** `now` document (`asOf` date +
     `activities` array of `{verb, text}`). Edited in Studio, rebuilt via the
     existing pipeline (per ADR 0001 it updates at build time, not runtime — a
     runtime-fetch exception was rejected as not worth violating ADR 0001).
   - **Discipline:** keep it current or pull it — a stale "Now" is worse than
     none. See the glossary "Now" entry.
   - **Input still needed from Quin:** the actual current activities + as-of
     date.
2. ~~**Animation vocabulary.**~~ **SETTLED.** In scope: per-line text reveal
   (one-shot, `once:true`), CSS marquee (infinite `translateX` keyframe),
   count-up numbers (fire once on scroll-in), and scroll-drawn SVG connector
   lines *scoped to the About timeline + section markers only* (short lines,
   passive/rAF scroll progress, since `stroke-dashoffset` isn't compositor-only).
   Out of scope: parallax, sticky/pinned scroll sequences, page-transition
   overlays — dropped for friction/perf.
3. ~~**How far to push the reference motifs.**~~ **SETTLED.** Yes to large
   numeral markers on reworked sections, rendered in **Instrument Sans italic,
   mint** (Krona One has no italic axis — confirmed in `index.html` — and faux
   obliquing is off the table; numerals become a body-font accent). Connectors
   are **within-section only** (mainly the About timeline, plus optional short
   strokes by a numeral) — no line running between homepage sections, which
   would span full viewports and cross the full-bleed color bands.
4. ~~**Hero treatment.**~~ **SETTLED → Option B (re-skin + motion).** Layout and
   collage stay; new palette + ambient layer + staggered per-line headline
   reveal. No portrait, no numeral. LCP (ZCMC screenshot) untouched. The
   per-line reveal is the hero's slice of the Q2 animation vocabulary.
5. ~~**Services rework.**~~ **SETTLED → Hybrid (Option B).** Not a full replace.
   Structure: (a) a short **positioning statement** as the section anchor;
   (b) a **tools** marquee (single row, one direction, CSS `translateX`) —
   tools only, *not* mixed with capabilities; (c) the six **capabilities**
   retained as a **compact horizontal band** (pills/tight row), not six chunky
   cards. Drops the retired gold `bg-accent`/`rgba(201,169,110)` and the banned
   `transition-all` currently in `Services.jsx`.
   - **Input still needed from Quin:** the real tool list for the marquee
     (accurate to actual stack — no invented tools, mirroring the testimonials
     "real and attributable" rule).
6. ~~**About timeline animation.**~~ **SETTLED → Option A.** Drawn vertical
   connector (within-section, `stroke-dashoffset` on a passive/rAF scroll
   progress) linking entries through their existing icon nodes + sequential
   reveal (already staggers today) + **one** big italic mint section numeral
   for About. **No per-entry numerals** — the entries already carry date
   periods, so `01–05` would be a second competing index. Work/education icons
   (briefcase/cap) stay — they carry information.
   - **Portrait (resolved alongside Q4/Q6):** a real photo of Quin goes in the
     **About** left column, replacing the `QL` monogram placeholder
     (`About.jsx:59`). Hero stays photo-free (Q4). No photo elsewhere unless the
     new "Now" section (Q1) reuses it. **Input still needed:** the photo file
     (WebP, explicit width/height, below-the-fold lazy per perf rules).
7. ~~**Testimonial schema fields.**~~ **SETTLED.** New Sanity `testimonial`
   document type. Field spec (matching `project.js` conventions):
   - `quote` — text, **required**
   - `name` — string, **required**
   - `role` — string, **required** (the credibility signal)
   - `organisation` — string, optional (covers freelancers / those who won't
     name an employer)
   - `photo` — image (`hotspot: true`), **optional** — card needs a clean
     text-only/monogram fallback per ADR 0002's "render only when filled" rule
   - `profileUrl` — url, optional
   - `sortOrder` — number, "Lower numbers appear first" (as on `project`)
   - `status` — string radio `draft`/`published`, `initialValue: "draft"`,
     required — **not** a boolean `published`, to match `project.status`
   - Attribution (name + role) is mandatory per the glossary Testimonial entry;
     photo is not attribution, hence optional.
8. ~~**Performance budget.**~~ **SETTLED → hold the line (Option A).** ~227 KB
   gzipped / ~698 KB raw is a **hard cap**, measured as the homepage critical
   set (`index` + `vendor-react` + `vendor-router` + `vendor-motion` in
   `dist/index.html`). The **custom cursor is `React.lazy`'d** so it stays out
   of the entry chunk — touch / reduced-motion visitors never download it.
   Removing `ThemeContext` + light-mode tokens (ADR 0005) frees a little. Most
   other additions are CSS (fireflies, marquee, palette) or reuse existing
   `vendor-motion` (reveal, connectors, count-up). Re-measure with
   `npm run build` at implementation start — nothing in `src/` has changed yet.
   - **Corrected baseline (measured after Phase 1, 2026-09-07):** ~731.6 KB raw
     / **~231.7 KB gz** is the honest starting number — ~5 KB gz above the old
     nominal 227 due to pre-existing drift (likely **Lenis** in the entry
     chunk). **Decision:** accept ~232 KB gz as the working cap and proceed;
     treat lazy-loading/replacing **Lenis** as the known reclaim lever if a
     later phase needs headroom. Do not let the number climb from here without
     a reclaim.

## Implementation sequence

Ordered by dependency. Phases 1–4 (except final content fill) need **no** input
from Quin — only the last-mile content does. Verify the perf cap (Q8) after
Phase 1 and again at the end.

### Phase 1 — Foundation: palette + dark-only — ✅ DONE (2026-09-07)
Implemented: `index.css` rewritten to the dark-only lavender/mint `@theme`
(mapped onto existing token names + new `--color-accent-secondary` mint);
`.dark` block, light values and junk `--color-bg-what` deleted. `ThemeProvider`
removed from `App.jsx`; theme toggle removed from `layout/Navigation.jsx`;
`context/ThemeContext.jsx` deleted; dead root `components/Navigation.jsx` +
`components/Footer.jsx` deleted; `FeaturedWork.jsx` commented block + dead
`useTheme` binding removed; stale `Stars.jsx` comment fixed. **Also found &
removed** an inline anti-FOUC theme script in `index.html` (set
`documentElement.className` from `localStorage`/`prefers-color-scheme`) — outside
`src/`, so not in the original file list; wrong under dark-only.
**Measured critical set after Phase 1: ~731.6 KB raw / ~231.7 KB gz** (index
55.13 + vendor-react 118.96 + vendor-router 12.95 + vendor-motion 44.69 gz).
This is ~5 KB gz above the plan's cited ~227 — pre-existing drift (Phase 1 only
removed code), likely Lenis in the entry chunk. **Baseline for the Q8 cap
corrected to this measured figure pending Quin's call (see Q8).**

### Phase 1 (original spec) — Foundation: palette + dark-only (unblocks everything)
- **Rewrite `index.css` tokens.** Map the new palette onto the **existing token
  names** so components re-skin with no edits: `--color-bg-primary` ← `ground`,
  `--color-bg-secondary`/`-card` ← `surface`, `--color-text-primary` ← `text`,
  `--color-text-secondary`/`-muted` ← `muted`, `--color-accent` ← `lavender`.
  **Add** `--color-accent-secondary` ← `mint` (new secondary token). Set
  `--color-star`/moon to suit the dark ground. Delete the `.dark` block and the
  light values; the dark palette becomes the only `@theme`. Drop the junk
  `--color-bg-what`. (ADR 0005)
- **Remove theming machinery.** Delete `ThemeProvider` from `App.jsx`, the theme
  toggle from `layout/Navigation.jsx`, and `context/ThemeContext.jsx`. Drop any
  `.dark` class application. Update `Stars.jsx` if it still subscribes to theme.
- **Fold in the cleanup that shares these files:** delete the dead root
  `components/Navigation.jsx` + `components/Footer.jsx` (live pair is `layout/`),
  and the commented dead code in `FeaturedWork.jsx`.
- **Verify:** `npm run build`; confirm homepage critical set still ≤ ~227 KB gz
  and lint error count didn't grow.

### Phase 2 — Ambient layer + cursor (site-wide, independent)
- **Fireflies** (`decorative/Fireflies.jsx`): ~35 desktop / ~15 mobile CSS
  elements, fixed layer, transform+opacity keyframes only, behind content,
  `pointer-events: none`, `prefers-reduced-motion` off. (ADR 0006)
- **Recolor Moon/Stars** via the new tokens (no structural change).
- **Custom Cursor** (`Cursor.jsx`), `React.lazy`'d per Q8 so it's out of the
  entry chunk; precise-pointer + non-reduced-motion gated; dot 1:1 + lagging
  ring; the four safety rules. (ADR 0007)

### Phase 3 — Shared motion primitives (build once, reused by sections)
- `SectionNumeral` — oversized Instrument Sans italic, mint (Q3).
- `RevealLines` — one-shot staggered per-line reveal, `viewport={{ once:true }}`.
- `Marquee` — infinite CSS `translateX` keyframe (single row, one direction).
- `CountUp` — fires once on scroll-in.

### Phase 4 — Section reworks (each inherits the palette automatically)
- **Hero** (Q4): apply `RevealLines` to the headline; leave the collage and the
  eager ZCMC LCP image timing untouched. Structural change = none.
- **Services** (Q5): positioning statement + `Marquee` of tools + capability
  band; remove the hardcoded gold shadow (`Services.jsx:79`) and `transition-all`
  (line 70). Build with placeholder tools until the real list arrives.
- **About** (Q6): vertical draw-in connector (reuse the `ProcessTimeline`
  `useScroll`/`useTransform` pattern) + sequential reveal + one `SectionNumeral`;
  swap the `QL` monogram for the real photo when supplied (monogram stays until
  then). No per-entry numerals.
- **"Now"** (Q1): add Sanity singleton `now` schema (`asOf` + `activities[]`),
  a query, and a `Now.jsx` section on `HomePage`; `SectionNumeral` `03` +
  `RevealLines`. Build with placeholder content.
- **Testimonials** (Q7): add the Sanity `testimonial` document type + query;
  rework the existing `Testimonials.jsx` to real data with the photo-optional
  fallback card. Build against placeholders until real quotes arrive.

### Phase 5 — Content fill + final verification
- Drop in the real inputs (below), then `npm run build` to re-confirm the perf
  cap and a clean-ish lint delta; visual pass on desktop + mobile widths.

## Inputs still needed from Quin

Decisions are done; these are content items to gather (none block starting the
re-skin/palette work — they block the specific sections noted):

- **Services marquee:** the real tool list (accurate to actual stack — no
  invented tools). Blocks Q5.
- **About portrait:** a real photo of Quin (WebP, explicit width/height,
  below-the-fold lazy). Blocks the About left column; monogram stays until then.
- **"Now" section:** the 3–4 current activities + the "as of" date. Blocks Q1.
- **Testimonials:** the real, attributable quotes Quin is already collecting
  (name + role mandatory). Blocks the Testimonials section.

## Known cleanup, unrelated to the redesign but in the same files

- `src/components/FeaturedWork.jsx` — roughly 90 lines of commented-out dead
  code at the top of the file.
- There are two `Navigation` components (`components/Navigation.jsx` and
  `components/layout/Navigation.jsx`) and two `Footer` components, both pairs
  apparently duplicated. Establish which is live before editing either.
- `ThemeContext` becomes dead once ADR 0005 is implemented.
