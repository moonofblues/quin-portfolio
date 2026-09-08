# quin-portfolio

Personal portfolio site — React + Vite + Tailwind v4, content in Sanity.

## Communication

**Explain for a non-expert.** Quin is still learning to code. Avoid
unexplained jargon; define any technical term the first time it appears, and
prefer plain-language analogies over insider shorthand. After a change, give a
short "what I did" note in plain English; in bug fixes, lead with the
diagnosis before the fix.

Step 5 — commit (the docs are unrelated to your portrait/section WIP, so a separate commit keeps history clean, but that's your call):
git add docs/ CLAUDE.md .gitignore
git commit -m "docs: plan Focus chooser + Service taxonomy (Phase 6, ADR 0008)"

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

| Width       | Use for                                                                                                                                                                                 |
| ----------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| full-bleed  | Color-blocked bands (Background/Challenge split, pull quote)                                                                                                                            |
| `max-w-7xl` | Media and multi-column grids: hero, process stepper, pain points, how-might-we, solution highlights, key functions, wireframes, ideation diagrams, showcase galleries, related projects |
| `max-w-6xl` | Sidebar layouts and smaller grids: project brief, research methods, results                                                                                                             |
| `max-w-4xl` | **Prose only** — applied to the paragraph itself, not the section                                                                                                                       |

The key pattern for mixed sections (prose + grid/media): put the **section**
at `max-w-7xl` and constrain the **paragraph** with its own `max-w-4xl`.
That gives images and cards the full width while keeping text at a readable
measure. Don't narrow the whole section just because it contains a
paragraph.

## Working process

**Always inquire first, with detailed info, before any implementation or
coding.** This is the default for every task, not just bugs. Before writing
or changing any code, present a detailed plan — what you intend to do, which
files, the approach, any trade-offs and alternatives — and stop and wait for
explicit approval. Do not start implementing on your own judgment, even when
the task seems clear or a single approach seems obviously best. The only
exception is a trivial, unambiguous, single-step change (e.g. a typo fix)
that carries no decision worth a person's input. When in doubt, ask.

**Diagnose before acting, in detail.** Before changing code — especially for
bugs, regressions, or "it feels slow/broken" reports — investigate first and
report findings before touching files:

- State what you observed and how you confirmed it (which file/line, which
  command, what output). Don't guess at a cause without checking it.
- If more than one plausible cause exists, say so, and say which one you
  believe it is and why.
- Before proposing a fix, lay out the options in detail: what each option
  does, its trade-offs, and whether it's reversible.
- Don't silently pick a side of a UX trade-off (e.g. animated vs. instant
  scroll) without flagging that it _is_ a trade-off.
- **Ask which option to take before implementing anything.** After laying
  out the diagnosis and the options, stop and ask the user which approach
  to proceed with — do not go ahead on your own judgment, even if one
  option seems clearly best. Wait for their choice, then implement only
  that one.
- Exception: trivial, unambiguous, single-option fixes (e.g. a typo, a
  clear off-by-one) can just be made — this rule is for anything with more
  than one reasonable way to solve it, or any tradeoff a person should
  weigh in on.

## Performance

**Default to the fastest correct implementation.** Every new component,
section, or animation must be written this way the first time — performance
is not a cleanup pass. A hiring manager on a mid-range laptop or a phone is
the target, not a dev machine.

### Non-negotiables

- **Nothing heavy in the entry chunk.** Anything large and route-specific
  gets `React.lazy` + `Suspense` in `App.jsx`. The Sanity Studio is the
  cautionary tale: a plain `import` of `StudioPage` put ~4.5 MB of CMS into
  the chunk every visitor downloaded before the homepage could paint. Never
  import from `sanity` or `sanity.config.js` outside `StudioPage.jsx` —
  reading data uses `@sanity/client` via `src/sanity/`, which is small.
- **Infinite animations are CSS, never framer-motion.** A JS-driven
  `repeat: Infinity` wakes the main thread every frame for the whole
  session, even offscreen. Use a keyframe class (`animate-moon-drift`,
  `animate-star-twinkle`, `animate-scroll-hint`) and animate **only**
  `transform` and `opacity` so the compositor owns it. Reserve
  framer-motion for one-shot entrances and `AnimatePresence` exits.
- **Hover/press feedback is CSS, never `whileHover`/`whileTap`.** Use
  `hover:` / `active:` variants. `whileHover` mounts an animation
  controller plus pointer listeners per instance, which is worst exactly
  where it's most tempting — buttons and cards rendered in a loop.
- **Never `transition-all`.** Name the properties
  (`transition-[color,background-color,transform]`). `transition-all`
  animates layout-affecting and expensive properties you didn't intend,
  and on a fixed header it re-evaluates `backdrop-filter` every frame.
- **Scroll listeners are `{ passive: true }` and rAF-coalesced.** A
  non-passive listener blocks the browser from compositing the scroll
  until JS returns — this is felt directly as sticky scrolling. See
  `layout/Navigation.jsx`.
- **Keep entrance delays under ~0.3s, and never delay the LCP element.**
  The hero screenshot is the largest element on the page; a 1.1s reveal
  delay makes the site feel slow no matter how fast the bytes arrive.
- **Context values are memoized.** `useMemo` the provider value and
  `useCallback` its functions. A raw object literal gives every consumer a
  new value on each provider render and re-renders the tree below it.
- **`whileInView` always carries `viewport={{ once: true }}`** so reveals
  don't re-run on every scroll past.
- **Images:** WebP, explicit `width`/`height` (prevents layout shift),
  `decoding="async"`, `loading="lazy"` + `fetchpriority="low"` for
  everything below the fold. Exactly one above-the-fold image may be eager
  with `fetchpriority="high"`.
- **Fonts load via `<link>` in `index.html`**, with `preconnect` to both
  Google hosts. Never `@import` a font URL in `index.css` — that
  serializes HTML → app CSS → font CSS → woff2, all render-blocking.
- **Respect `prefers-reduced-motion`.** `index.css` has a global override;
  add `motion-reduce:transform-none` to CSS hover transforms.

### Checking your work

Run `npm run build` and look at what the **homepage** pulls in — the
`<script>` plus preloaded chunks in `dist/index.html`, not the total.
That set is currently ~698 KB raw / ~227 KB gzipped across
`index`, `vendor-react`, `vendor-router`, `vendor-motion`. If a change
grows it noticeably, something got pulled into the critical path that
should have been lazy. Vendor splitting lives in `vite.config.js`; do not
add Sanity to `manualChunks` — it must stay inside the lazy `/studio`
chunk Rollup derives from `App.jsx`.

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
  change doesn't _add_ to the count rather than expecting a clean run.
