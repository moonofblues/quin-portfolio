# 2026-09 Dark Redesign — Plan

Working plan from the `/grill-with-docs` session of 2026-09-07.
**Phases 1-4 are implemented; Phase 5 (real content) is not.** See the per-phase
entries under "Implementation sequence" for what actually landed and what the
measured numbers were.

Read this first if you are picking the work up in a new session. Settled
decisions are binding.

**Status (updated 2026-09-07, second grilling session):** all eight questions
below are now **settled** — the "Open questions" heading is retained for history
but each entry is resolved. What remains before/while coding is not *decisions*
but *content inputs* from Quin, collected under "Inputs still needed" at the
bottom.

**Implementation status (2026-09-07):** Phases 1-4 are done — palette,
ambient layer + cursor, motion primitives, and all five section reworks —
and the Q8 Lenis reclaim has been taken. Critical set is
**718.03 KB raw / 227.92 KB gz**, ~4 KB gz under the ~232 working cap. Four
sections (Services tools, About photo, Now, Testimonials) are built against
placeholders and render their placeholder or nothing until Quin supplies the
real content listed under "Inputs still needed" — that's Phase 5.

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
corrected to this measured figure pending Quin's call (see Q8).

**Post-review fixes (code-review subagent, 2026-09-07):** the token *definitions*
were rewritten but dead light/dark *rules* lower in `index.css` were missed on
the first pass. Fixed: removed `html.light` background, scrollbar-track and
`.bg-gradient-radial` overrides (referenced deleted `--color-light-*` tokens);
removed dead `html.light .glass`; recolored `.glass` from the retired navy
`rgba(17,29,46,.8)` to the new surface `rgba(14,18,25,.8)`; **collapsed
`.dark .shadow-card` into `.shadow-card`** so the intended `0.2`-alpha shadow is
the base (the `.dark` scope no longer exists, so cards were silently falling
back to an invisible `0.06` shadow on the near-black ground — a real visual bug);
recolored the unused `pulse-glow` keyframe off gold. **Still latent (deferred):**
hardcoded gold `#c9a96e` in `src/data/projects.js:614` and
`src/data/categories.js:3` (data, not tokens — won't auto-recolor; decide during
a later phase whether category/project accents move to lavender/mint).**

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

### Phase 2 — Ambient layer + cursor — ✅ DONE (2026-09-07)
Implemented: `decorative/Fireflies.jsx` — 35 CSS motes desktop / 15 mobile via
`.firefly:nth-child(n+16){display:none}` (a hidden element gets no compositor
layer, and this needs no resize listener on the thread Lenis already owns);
positions procedural but seeded at module scope, so a re-render never
reshuffles the field; two loops per mote, drift and glow, on independent
durations so it never pulses in lockstep; hidden outright under
`prefers-reduced-motion`, because the global override only collapses duration
and would otherwise have left them frozen but *visible*.

`decorative/Cursor.jsx` added and `React.lazy`-d from `layout/Layout.jsx`. The
ADR 0007 gate string `(pointer: fine) and (prefers-reduced-motion:
no-preference)` is deliberately identical in `Layout.jsx` and `index.css`, so
the mount gate and the `cursor: none` rule cannot drift apart and strand
someone with no pointer. Rule 3 is enforced by *never mounting* — the chunk is
not downloaded at all, rather than downloaded then disabled. Rule 4 parks its
rAF loop once the ring is within 0.1px of the dot, so cost genuinely reaches
zero at rest rather than merely getting small.

**Also found & fixed — a Phase 1 miss, not a re-tint:** `Moon.jsx` hardcoded
the retired gold (`#d4c4a8` / `#c4b498` / `#a89878` plus an
`rgba(212,196,168,.4)` glow), so the moon came through the Phase 1 re-skin
untouched as a warm tan disc on the near-black lavender ground — while
`--color-moon` and `--color-moon-shadow` sat defined and referenced by
nothing. Both tokens now drive it. `Stars.jsx` needed no work; it already read
`--color-star`.

**Hero wash made translucent (Quin's call, 2026-09-07).** The Firefly layer is
a fixed `-z-10` sheet behind content, and the `bg-gradient-radial` at
`Hero.jsx:36` was fully opaque — it erased the whole field across the hero
viewport, the one screen where the Ambient Layer matters most. Putting the
layer *above* it was not available: every section body text is non-positioned,
so the motes would have painted over the copy. `.bg-gradient-radial` now mixes
both stops with `transparent` through a tunable `--hero-wash-alpha`, currently
`85%`. **Open:** at 85% the fireflies read very faintly in the hero; ~70% is
worth eyeballing on the real page. One-value change.

**Measured critical set after Phase 2: 733.40 KB raw / 232.45 KB gz** (index
55.85 + vendor-react 118.96 + vendor-router 12.95 + vendor-motion 44.69).
Against the corrected Phase 1 baseline of 731.60 / 231.73 that is **+1.80 KB
raw / +0.72 KB gz** — at the ~232 KB gz working cap, not past it, but with no
headroom left. Fireflies is necessarily eager (site-wide, mounted in
`Layout`); the Cursor is not, and its chunk (`Cursor-*.js`, ~2.0 KB raw /
~0.9 KB gz) is confirmed absent from the four chunks `dist/index.html`
preloads, with `has-custom-cursor` appearing in no other chunk.
**Phase 3 starts with effectively zero budget: treat lazy-loading or replacing
Lenis — the reclaim lever named in Q8 — as due before the next addition, not
after.**

Lint: 27 errors + 1 warning, unchanged from baseline, zero of them in a Phase 2
file. The first pass did add one (`setState` called inside an effect, for the
matchMedia subscription); replaced with `useSyncExternalStore`, which is the
correct primitive for an external store and closes the render-to-effect gap on
its own.

**Deferred:** nothing declares `data-cursor` yet, so the Cursor Affordance is
built but unexercised. It gets wired to elements during the Phase 4 section
reworks (for example a View Project label on a project card).

### Phase 2 (original spec) — Ambient layer + cursor (site-wide, independent)
- **Fireflies** (`decorative/Fireflies.jsx`): ~35 desktop / ~15 mobile CSS
  elements, fixed layer, transform+opacity keyframes only, behind content,
  `pointer-events: none`, `prefers-reduced-motion` off. (ADR 0006)
- **Recolor Moon/Stars** via the new tokens (no structural change).
- **Custom Cursor** (`Cursor.jsx`), `React.lazy`'d per Q8 so it's out of the
  entry chunk; precise-pointer + non-reduced-motion gated; dot 1:1 + lagging
  ring; the four safety rules. (ADR 0007)

### Phase 3 — Shared motion primitives — ✅ DONE (2026-09-07)
All four built in `src/components/ui/`.

- **`SectionNumeral`** — Instrument Sans italic, mint, `aria-hidden`.
  **Weight is capped at 500 and must stay there:** `index.html` loads the
  italic axis at `1,400;1,500` only, so 600+ would have the browser
  synthesise a faux-bold — the same quality failure the plan rejected
  faux-oblique for in Q3. Raising it means adding the weight to the font
  link first.
- **`RevealLines`** — one-shot per-line wipe; each line translates inside its
  own `overflow-hidden` box, so it is revealed by a mask rather than a fade.
  `viewport={{ once: true }}`. Stagger is 0.08s: the last line lands at
  `(lines-1) x 0.08`, so a four-line block finishes at 0.24s, inside the
  ~0.3s entrance cap. Raising the stagger pushes long headlines past it.
- **`Marquee`** — pure CSS `translateX` keyframe, never framer-motion, since
  it loops for the life of the page. Hover and focus-within pause it, because
  the row carries real content (the tools list) and must be readable.
  The duplicate track is `aria-hidden` so a screen reader reads the list once.
- **`CountUp`** — rAF tween, fires once. "Once" is enforced twice: `useInView
  ({ once: true })` never flips back, and a `hasRun` ref stops a re-render
  restarting it.

All four check `useReducedMotion` directly. The global reduced-motion block in
`index.css` only collapses CSS animation/transition duration — it cannot reach
framer-motion's inline transforms or a hand-rolled rAF tween, so relying on it
for JS-driven motion would have silently done nothing.

**Marquee bug caught pre-ship.** The gap was first placed on the wrapper
between the two tracks, making total width `2W + gap`; `-50%` then translates
`W + gap/2`, half a gap short, and the row jumps once per cycle. The gap now
lives inside each track as a trailing `paddingRight`, so both tracks are
exactly equal width and `-50%` is exact. Do not move it back to the wrapper.

**Measured critical set after Phase 3: 733.40 KB raw / 232.45 KB gz —
unchanged from Phase 2.** Nothing imports these primitives yet, so Rollup
tree-shakes all four out of the bundle entirely. **This is not headroom.**
The cost is deferred, not avoided: it lands in Phase 4, when the sections
import them. Treat the Q8 Lenis reclaim (~5.3 KB gz, measured minified +
gzipped standalone) as still outstanding and due before Phase 4, not after.

**Lint config fixed (Quin's call, 2026-09-07).** `eslint.config.js` was
missing `eslint-plugin-react`, so `react/jsx-uses-vars` never ran and ESLint
did not count a JSX reference as a use — every identifier used only inside JSX
(`motion`, `cn`, an `as`-prop `Tag`) reported as unused. That was ~19 of the 22
`no-unused-vars` errors, i.e. most of the "~30 pre-existing errors" CLAUDE.md
warns about were a missing plugin, not real debt. Added the plugin as a
devDependency and enabled that one rule; no other rules changed and no source
was touched. **Count went 31 -> 13 errors + 1 warning, with zero in any Phase 3
file.** The remaining ones are genuine: 4x `process` undefined, 3x setState-in-
effect, 3x truly-unused `cn`, `thumbnailPath`, `showcasePaths`, a
react-refresh export warning, and the `useMemo` dependency warning.

One of those setState-in-effect errors was mine (`CountUp` set the final value
synchronously in the effect when reduced motion was on); the value is now
derived at render instead.

### Phase 3 (original spec) — Shared motion primitives (build once, reused by sections)
- `SectionNumeral` — oversized Instrument Sans italic, mint (Q3).
- `RevealLines` — one-shot staggered per-line reveal, `viewport={{ once:true }}`.
- `Marquee` — infinite CSS `translateX` keyframe (single row, one direction).
- `CountUp` — fires once on scroll-in.

### Phase 4 — Section reworks — ✅ DONE (2026-09-07)
All five sections built against placeholder content, per the plan — none of
the four content inputs (tools, photo, Now activities, testimonials) have
arrived from Quin yet, and nothing here waits on them arriving.

- **Hero (Q4):** `RevealLines` on the headline, two lines. Structural change
  is genuinely none — collage and the eager ZCMC LCP image are untouched.
  RevealLines drives itself off `whileInView`, which fires immediately since
  the hero is on screen at mount; `delay={0.15}` keeps it landing at the same
  point in the fixed entrance sequence the plain h1 used to occupy.
- **Services (Q5):** positioning statement, a `Marquee` of tools, and the six
  capabilities as a compact pill row (icon + title only — the per-card
  descriptions are dropped; the positioning statement now carries that
  weight). Removed the hardcoded gold `boxShadow`
  (`rgba(201,169,110,0.3)`) and the `transition-all` the plan flagged.
  **Tools list is a placeholder**, restricted to the one sublist actually
  verifiable from this repo's `package.json` (React, Vite, Tailwind CSS,
  Sanity, Framer Motion) rather than guessed — design tools like Figma
  aren't included because they can't be confirmed. Replace the array
  wholesale once Quin supplies the real list; the code comment says the same.
- **About (Q6):** a scroll-drawn vertical connector through the timeline's
  icon column, reusing `ProcessTimeline`'s `useScroll`/`useTransform`
  pattern, plus one `SectionNumeral`. The connector runs the icon column's
  full height rather than being inset to the first/last icon's exact
  center — row height varies with each entry's text, so a precise inset
  would drift; `ProcessTimeline`'s own mobile connector uses the same
  full-height-behind-the-nodes approach. Swapping `space-y-4` for
  `flex flex-col gap-4` on the timeline list was necessary, not cosmetic:
  `gap` ignores out-of-flow children, so the two absolutely-positioned
  connector lines don't shift `space-y`'s `> * + *` selector's idea of which
  row is first and throw off its margins. No per-entry numerals, matching
  Q6. Monogram placeholder stays — no photo yet.
- **"Now" (Q1) — new section:** Sanity singleton `now` schema (`asOf` +
  `activities[]` of `{verb, text}`) registered in `sanity.config.js`,
  `SectionNumeral` fixed at `03` per Q1, `RevealLines` on the activity
  lines. Fetched at runtime in the component's own effect — see the ADR 0001
  correction below. Placed between About and Testimonials; the plan fixes
  Now's numeral but not its position, so this was a judgment call: activity-
  level content reads naturally right after About's role-level timeline.
  Renders nothing until Quin publishes the singleton in Studio (no document
  exists yet), consistent with ADR 0002.
- **Testimonials (Q7):** new Sanity `testimonial` document type per the Q7
  field spec, `fetchTestimonials()` querying `status == "published"`, photo-
  optional fallback (initials avatar when no photo). **The three hardcoded
  quotes this file used to carry are removed, not replaced with placeholders
  — they were unattributed by the glossary's own definition** ("Professional
  Colleague", "Client": a generic role standing in for a real name), which
  fails the mandatory-attribution rule this very redesign is meant to
  enforce. Renders nothing until Quin publishes real ones (ADR 0002); this is
  a compliance fix riding along with the redesign, not new redesign scope.

**ADR 0001 correction, found while implementing "Now".** This plan's Q1 entry
says Now "updates at build time, not runtime — per ADR 0001" and that a
"runtime-fetch exception was rejected as not worth violating ADR 0001". That
has the ADR backwards: ADR 0001's actual decision is *"no build-time snapshot
needed"* — build-time was the alternative it rejected, not the rule it set.
No build-time pipeline exists anywhere in this repo either — `npm run build`
is a plain `vite build`, and every other Sanity-backed query
(`fetchAllProjects`) already fetches at runtime through `ProjectsContext`.
Implementing Now as build-time would have meant inventing new infrastructure
this plan never actually asked for, and it would have undone the one thing
ADR 0001 explicitly bought by choosing Sanity: publishing in Studio takes
effect immediately, no rebuild required. `fetchNow()` and `fetchTestimonials()`
in `queries.js` both follow the existing runtime-fetch pattern; the comment
there carries this same correction so it isn't relitigated on a future read.

**Measured critical set after Phase 4: 718.03 KB raw / 227.92 KB gz** — this
is the first build where every Phase 3 primitive is actually imported and
live (Hero uses `RevealLines`, Services uses `Marquee`, About and Now use
`SectionNumeral`, Now uses `RevealLines` again), plus four new sections'
worth of JSX and two new Sanity queries. Against the post-reclaim baseline of
715.10 / 227.24 that is **+2.93 KB raw / +0.68 KB gz** — under the ~232 KB gz
cap, with about 4 KB gz of headroom left rather than none. `Cursor-*.js` and
`lenis-*.js` are both confirmed absent from the four chunks `dist/index.html`
preloads.

Lint: 13 errors + 1 warning, unchanged from the Phase 3 count. `About.jsx`
carries one of the pre-existing genuine errors (`cn` imported but unused) —
this predates Phase 4's edit to that file and is already accounted for in
the "3x truly-unused `cn`" baseline recorded after the Phase 3 lint fix; it
was not introduced here.

### Phase 4 (original spec) — Section reworks (each inherits the palette automatically)
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

### Q8 Lenis reclaim — ✅ DONE (2026-09-07, before Phase 4)
`HomePage.jsx` imported Lenis at the top of the file, so it sat in the entry
chunk and every visitor paid for scroll momentum before the homepage could
paint — for a library that cannot matter until they actually scroll. It is now
a dynamic `import("lenis")` inside the existing effect, which Rollup splits
into its own chunk (`lenis-*.js`, 18.42 KB raw / 5.34 KB gz) loaded after
first paint and confirmed absent from the four chunks `dist/index.html`
preloads.

| | raw | gz |
|---|---:|---:|
| Before (after Phase 3) | 733.40 KB | 232.45 KB |
| After reclaim | **715.10 KB** | **227.24 KB** |
| Reclaimed | -18.30 KB | **-5.21 KB** |

The effect keeps a `cancelled` flag because the import can resolve after the
component has unmounted (a fast route change, or React double-invoking the
effect in dev); without it, Lenis would be constructed with no live reference
to destroy, leaking an orphaned rAF loop. The only behavioural change is that
the first fraction of a second of scrolling is native rather than eased.

**Do not restore the top-level import.** This is the headroom Phase 4 spends.

### Phase 5 — Content fill + final verification
- Drop in the real inputs (below), then `npm run build` to re-confirm the perf
  cap and a clean-ish lint delta; visual pass on desktop + mobile widths.

## Phase 6 — Focus chooser + focused homepage (planned, 2026-09-08)

Working plan from the `/grill-with-docs` session of 2026-09-08. **Not yet
implemented — this section is the settled design, ready to build.** Decision
records: [ADR 0008](adr/0008-focus-chooser-and-service-taxonomy.md) and
[ADR 0009](adr/0009-category-document-type-focus-derived.md). Vocabulary
(*Focus*, *Focus chooser*, *Focused view*, *Default view*, *Service*,
*Category*): see `docs/glossary.md`.

> **Taxonomy amended 2026-09-09 (ADR 0009).** The Q3/Q4/Q13 rows below and the
> "Prerequisite" section describe ADR 0008's original shape, where the project
> stored a multi-valued `services` array and Category was retired. That has
> been superseded: **Category is now a Sanity document type**, each assigned to
> one Focus; a project references **Categories only** (≥ 1, required) and its
> **Focuses are derived** from them. See ADR 0009 and the "Taxonomy (amended)"
> subsection below for the binding version. The Focus chooser, Focused hero,
> and Work-page filter behaviour are otherwise as described.

### Brief

On load, greet the visitor (typically a hiring manager) with a choice of
which discipline to view the site through — UI/UX, video, graphic design, etc.
Picking one tailors the homepage to it. This promotes taxonomy that already
exists deeper in the site (the work-page category filter) up to the front
door; it is not a new information architecture.

### Settled

Every row below is a settled decision from the grilling session. They are
binding, same as the Q1–Q8 table above.

| # | Decision | Outcome |
|---|---|---|
| 1 | Entry pattern | **Dismissible pop-up** (the *Focus chooser*) on first visit, with a prominent **Skip**. "Seen" remembered in `localStorage`. Not a blocking gate. Chosen over a hard gate and over a non-blocking on-page section — see ADR 0008. |
| 2 | What a choice does | Keeps the **same homepage**; swaps only the **hero** (headline, description, tags) and **Featured Work**. What I Do, About, Contact are untouched. |
| 3 | Taxonomy | Unify the two drifted lists into one canonical **Service** taxonomy (6 values). The separate `categories.js` list is retired. |
| 4 | Cardinality | A project references **one or more** Services (multi-valued array), not a single category. Filter becomes `project.services.includes(focus)`. |
| 5 | Where the choice lives | In the **URL** as `?focus=<id>` (shareable; refresh- and back-button-safe). A URL naming a Focus **skips the chooser**. The `localStorage` "seen" flag is a separate concern. |
| 6 | Hero swap scope | **Headline + description + tags** change per Focus. The **collage screenshots do not** — they carry the LCP image (perf rule "never delay the LCP element"). |
| 7 | Where per-Focus copy lives | **One code file** — the single source of truth for the Service list *and* each Focus's hero copy, tags, and icon. Drives the chooser, the Focused hero, the work filter, and What I Do. |
| 8 | Featured Work per Focus | **Featured-in-Focus first**, then top up with the most recent projects in that same Focus, up to 6. Keeps curation, avoids a sparse grid. |
| 9 | Empty Focus | Show **all six** in the chooser; a Focus with no projects yet shows a "work coming soon" note and falls back to the full set. (Front-End / Low-Code start empty until re-tagged.) |
| 10 | Switching Focus | **Both:** clickable service pills in What I Do **and** a persistent **"Viewing: <Focus>"** switcher in the nav, plus a "View all" reset. Both read/write the same `?focus=` param. |
| 11 | Loading | The chooser is **bundled** (in the entry chunk) so it paints on the first frame with no flash. Kept to text + buttons; re-measure the homepage critical set against the ~232 KB gz cap after it lands. |
| — | Skip / Default | Skip, first paint before choosing, and any link without `?focus=` all show the **Default view**: the current generic hero + unfiltered featured set, clean URL, and the chooser is not shown again. |
| 13 | Data migration | **Additive & reversible:** add the `services` array alongside `category`, copy values over, verify, then retire `category`. Nothing deleted until the new field is proven. |

Accessibility (non-negotiable, built in regardless): the chooser traps
keyboard focus while open, **Esc = Skip**, background scroll is locked, it is
screen-reader labelled (`role="dialog"`, `aria-modal`), and it respects
`prefers-reduced-motion` (no large entrance animation).

### Prerequisite — Service taxonomy refactor

The chooser depends on the taxonomy being unified first. This is a
live-content refactor (Sanity schema + several files), so it is sequenced
ahead of any UI.

> **Superseded by ADR 0009 — see "Taxonomy (amended)" below.** The four steps
> that were here described storing a `services` array on the project. Under
> ADR 0009 the project stores **Category references** instead and Service is
> derived. The amended subsection is the binding version.

#### Taxonomy (amended) — Category document type, Focus derived (ADR 0009)

**✅ FULLY DONE (2026-09-09).** All five steps below are complete.

1. ✅ **`category` document type** (`src/sanity/schema/category.js`): `title`,
   `slug`, `focus` (radio of the six ids), `sortOrder`. Registered in
   `sanity.config.js`.
2. ✅ **`categories` reference array on project** — required (≥ 1), dereferenced
   in `queries.js` to `{ id, title, slug, focus }`. `fetchCategories()` query
   added for the Work page.
3. ✅ **`getProjectsByFocus` + `getProjectFocuses`** in `ProjectsContext` — focus
   derived from `p.categories[].focus`; no fallback needed.
4. ✅ **Migration complete** — `services`, `subcategory`, and legacy `category`
   fields removed from schema, `queries.js`, and all selectors.
5. ✅ **Work page two-level filter** — Focus tabs → Category sub-row,
   URL `/work?focus=<id>&category=<slug>`. `OtherWork.jsx` and `CaseStudyPage.jsx`
   derive their focus label from `project.categories[0].focus`.

Also done: `src/data/services.js` (single code source for the 6 Focuses),
`Services.jsx`, `WorkPage.jsx`, `OtherWork.jsx`, `CaseStudyPage.jsx` all
consume it. `SERVICE_BY_ID` map available for focus label lookups.

### Implementation sequence

Ordered by dependency:

1. ✅ **Taxonomy refactor** — complete (see above).
2. ✅ **Single Service source file** — `src/data/services.js` done; consumed by
   Services.jsx, WorkPage, OtherWork, CaseStudyPage.
3. **Focused hero + Featured Work** — make the hero read per-Focus copy
   (Q6) and Featured Work apply the Q8 rule, both driven by the `?focus=`
   param (Q5). Default view is the no-param path.
   **Blocked on:** per-Focus hero copy from Quin (headline + description + tags
   for each of the 6 Focuses — see "Inputs still needed" below).
4. **Switchers** — clickable What I Do pills + the nav "Viewing:" control +
   "View all" reset (Q10). No content input needed — can build now.
5. **Focus chooser** — the pop-up itself, last, once the underlying Focused
   view it navigates into already works (Q1, Q11 + accessibility).
   **Note:** chooser copy can be drafted by Claude; per-Focus hero copy (step 3)
   is the only true blocker.

### Performance notes

- The chooser ships in the entry chunk (Q11) — keep it text/buttons only, no
  new heavy dependency, and **re-measure** `dist/index.html`'s critical set
  after it lands (cap ~232 KB gz, per Q8 of the main plan).
- The hero collage / LCP image is untouched by design (Q6).
- The nav "Viewing:" switcher lives on the fixed header — obey the existing
  header rules (no `transition-all`, no per-frame `backdrop-filter` churn).

### Inputs still needed from Quin (Phase 6)

- **Per-Focus hero copy** — headline + description + tag set for each of the
  six Services (including Front-End Dev and Low-Code, which are always
  selectable).
- **Focus chooser copy** — the pop-up's heading, one-line subtext, and button
  labels (Claude can draft a first version).
- **Re-tagging** — which existing projects should also be tagged Front-End Dev
  and Low-Code, so those Focuses aren't empty on day one.

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

## Phase 7 — Concept visibility + default-hero copy (planned, 2026-09-10)

From a `/design-review` of the live homepage (2026-09-10), answering two
questions Quin posed: **does the landing page feel unique, and would it attract
recruiters / HR / clients right away?** The review's verdict: the craft is
there, but the page currently reads as a *polished generic dark portfolio*, and
its strongest material is hidden. Two root causes, both fixable without
re-architecture. This ties to [ADR 0010](adr/0010-differentiate-through-concept-not-more-motion.md)
(differentiate through a committed concept, not more motion). **Not yet
implemented — this is the settled direction plus draft copy, ready to build.**

Decision confirmed with Quin alongside this review: **stick to the night-sky
concept** (do not swap it for a different metaphor), and **keep the Focus
chooser** (its purpose is valid — see below).

### 7A — Make the night sky actually visible (commit to the concept)

**Problem.** The night sky is the intended differentiator, but it is
imperceptible. In a fully-composited capture of the hero, the background read
as near-flat near-black: the Moon (top-left), the three Stars, and the 35
Fireflies are all present in the DOM but do not register visually. A near-flat
dark background under a centered hero is the single most common portfolio look —
so the concept that should make the site unique currently isn't showing up. Per
ADR 0010, the concept must **organize**, not just sit behind the content as
dots too faint to see.

**Direction (all CSS / static SVG — no entry-chunk weight, no new library,
stays within the ~232 KB gz cap and consistent with ADRs 0006/0007):**

- **A real sky gradient behind the hero**, not near-flat black — e.g. a deep
  indigo/violet-to-near-black vertical wash, so the eye reads "night sky" on the
  first frame rather than "dark theme."
- **Reduce `--hero-wash-alpha`.** Phase 2 already flagged this: at `85%` the
  fireflies "read very faintly in the hero; ~70% is worth eyeballing." That one
  value dims the Moon, Stars, and Fireflies all at once. Lower it (try ~65–70%)
  so the ambient layer actually shows. One-line change in `.bg-gradient-radial`.
- **Make the Moon a present focal element** rather than a faint disc — larger
  and/or brighter (`--color-moon` is `#c9c4e0`), with a soft glow that survives
  the wash.
- **Denser / brighter Stars clustered near the headline**, and optionally faint
  **constellation connector lines** (static SVG, `aria-hidden`) — this reuses the
  reference's "drawn connector" motif already in the plan (Q3) but points it at
  the concept instead of a section index.
- **Optional structural commitment** (ADR 0010's "organize, not decorate"):
  let section transitions read as horizon/gradient shifts so scrolling feels
  like moving through the night. Lower priority than the hero fixes above.

**Success test (from the review):** show the first screen for ~6 seconds, take
it away, ask what the person remembers. "A night sky / distinct point of view"
= working; "another dark site" = not yet.

### 7B — Strengthen the *default* hero copy (the Skip / no-focus path)

**Problem.** The Focus chooser's Skip and first-paint both land on the
**Default view** (Phase 6, "Skip / Default" row), whose copy is generic:

- Headline (`Hero.jsx:14–17` `DEFAULT_HEADLINE`): "Designing Systems and Visuals
  That / **Actually Work**"
- Description (`Hero.jsx:18–19` `DEFAULT_DESCRIPTION`): "From pixel to production
  — I bridge design and development to create interfaces that are as functional
  as they are beautiful."

This is interchangeable with what most designer-developers write. Meanwhile the
genuinely strong, specific, outcome-driven copy — "hospital systems used by 500+
healthcare workers daily… 60% faster task completion" — lives only in the
**per-Focus** copy (`services.js`, UI/UX focus) and is therefore **gated behind
picking a discipline.** Since most visitors skip, the site leads with its
weakest foot and hides its best one.

**Direction.** Promote specificity and proof into the *default* hero, so a
visitor who never chooses a Focus still sees outcomes and numbers. The default
must stay discipline-spanning (the visitor hasn't picked one), but "spanning"
does not require "generic." Draft options for Quin to pick / edit:

- **Option A — proof-led.**
  - Headline: "Design and Code That **Hold Up in Production**"
  - Description: "I design and build the systems real people rely on — like
    hospital software used daily by 500+ healthcare workers. Research-driven,
    production-ready, and tested with a critical eye."
- **Option B — identity + proof.**
  - Headline: "I Design Systems People **Actually Rely On**"
  - Description: "UI/UX, front-end, and QA in one person — currently shaping
    hospital information systems used by 500+ staff daily at Zamboanga City
    Medical Center, and teaching the next generation of developers at Ateneo de
    Zamboanga University."

(Gradient/emphasis span shown in **bold** — keep the existing `text-gradient`
treatment on that segment.)

> **⚠ Verify before shipping:** the "500+ healthcare workers" and "60% faster
> task completion" figures are carried over from the existing per-Focus copy.
> Confirm they are accurate and defensible — a hiring manager may ask. Do not
> ship a metric Quin can't stand behind. Same "real and attributable" rule the
> testimonials and tools list already follow.

### 7C — Focus chooser: keep the purpose, reduce first-paint friction

**Purpose (confirmed valid, keep it).** The chooser exists so a recruiter or HR
screener can see **only the work relevant to the role they're hiring for** —
promoting the taxonomy up to the front door (Phase 6 brief). That goal is worth
keeping; the review does **not** recommend removing it.

**Friction to fix.** Phase 6 Q1 intended a *dismissible, non-blocking* pop-up
with a prominent Skip. Two gaps between that intent and the current build:

- **It covers the hero on first paint.** The current `FocusChooser.jsx` renders
  a full `bg-black/75` overlay and locks body scroll, so the very first thing a
  6-second skimmer sees is a *task* ("Pick a discipline") before any name,
  value, or work — friction ahead of value, against CLAUDE.md "minimize UI
  friction." Consider whether the hero should be **legible behind/around** the
  chooser (so value lands even before a choice), or whether the chooser should
  appear as a **non-blocking on-page control** rather than a covering overlay.
- **Implementation diverges from the plan.** Phase 6 Q1 specifies "seen"
  remembered in **`localStorage`**; the build uses a **module-level `_seen`
  flag that resets every reload** (deliberate — comment in `FocusChooser.jsx`
  says it's so every hiring manager gets it). Reconcile: decide whether
  re-showing every visit is intended, and align the plan and code either way.

**Dependency.** 7C interacts with 7B: whichever path is chosen, the **default /
skip experience must carry the strong copy from 7B**, since that is what most
visitors land on.

### Inputs still needed from Quin (Phase 7)

- **Default hero copy** — pick Option A or B above (or a variant), and
  **confirm the metrics are accurate** (7B).
- **Night-sky art direction call** — how far to push visibility (hero-only vs.
  the optional structural/section-transition commitment) (7A).
- **Focus-chooser behaviour call** — hero-legible-behind vs. non-blocking
  on-page control, and re-show-every-visit vs. `localStorage` once (7C).

## Known cleanup, unrelated to the redesign but in the same files

- `src/components/FeaturedWork.jsx` — roughly 90 lines of commented-out dead
  code at the top of the file.
- There are two `Navigation` components (`components/Navigation.jsx` and
  `components/layout/Navigation.jsx`) and two `Footer` components, both pairs
  apparently duplicated. Establish which is live before editing either.
- `ThemeContext` becomes dead once ADR 0005 is implemented.
