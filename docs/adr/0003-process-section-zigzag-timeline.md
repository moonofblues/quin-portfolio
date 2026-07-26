# 0003 — Process section: alternating zigzag timeline with keyword-derived icons

Date: 2026-07-27
Status: Accepted

## Context

The Case Study "Process" section (`CaseStudyPage.jsx`, previously lines
291–324) rendered `project.process` as a plain single-column list: a numbered
accent circle next to each step's title/description, spaced with
`space-y-8`. It communicated a sequence but had no visual rhythm, and it was
the only major case-study section still inlined in the page instead of
extracted like `HeroCollage.jsx` / `StatRing.jsx` (see
`src/components/case-study/`).

Across the 7 existing case studies (`scripts/migrate-to-sanity.js`), every
`process` array has 3–4 steps, and step descriptions run up to ~50 words —
long enough that a horizontal stepper would force uncomfortable text
wrapping. The `process` step schema
(`src/sanity/schema/project.js:144-160`) is `{ title, description }` only —
no icon or image field.

Three layout options were considered:

1. **Enhanced vertical timeline** — keep single-column flow, add a
   connecting line and larger nodes. Lowest risk, but visually closest to
   what already existed.
2. **Alternating zigzag timeline** — steps alternate left/right of a center
   line on desktop, collapsing to single-column on mobile. More dynamic,
   reads as a deliberate "journey" rather than a bullet list.
3. **Numbered card grid** — matches the visual language already used by Pain
   Points / How Might We. Simplest to build, but loses the sequential/journey
   feeling that "Process" is specifically about.

For node content, three options were considered: numeral-only (zero data
model impact), a manual `icon` field added to the Sanity schema (accurate,
but requires content-authoring across ~24 existing steps), or an icon
auto-derived from each step's existing `title` text via keyword matching (no
schema change, ships against all existing content immediately).

## Decision

Use the **alternating zigzag timeline**, extracted into
`src/components/case-study/ProcessTimeline.jsx` (matching the
`HeroCollage`/`StatRing` extraction pattern).

Each timeline node shows a **lucide-react icon auto-picked from the step's
title**, with the **step number as a small corner badge** rather than the
primary node content. See [glossary](../glossary.md) for the icon-mapping
rule table (`ICON_RULES` in the component). Rules are checked in order —
first match wins — so titles matching multiple categories resolve
predictably (e.g. "Design Handoff" reads as documentation, not visual
design, because the documentation rule is checked first). Titles matching no
rule fall back to a generic `Compass` icon, keeping every node visually
consistent (always icon + badge, never a bare numeral).

The center connecting line **progressively draws in as the user scrolls**
(via framer-motion `useScroll` + `useTransform` driving a `scaleY`-equivalent
height animation), rather than rendering fully visible on mount. Step cards
independently slide in from their respective side using per-item
`whileInView`.

On mobile (below the `md` breakpoint used elsewhere on this page), the
zigzag collapses to a single column: the line moves to the left edge and
every card stacks full-width to its right — the same shape as the rejected
"enhanced vertical timeline" option, repurposed as the small-screen
fallback. This is implemented via CSS `grid-template-areas`
(`.process-row`, `.process-row--left/--right` in `src/index.css`) rather
than reordering the DOM or duplicating markup per breakpoint, so the same
node/card elements just get placed into different grid cells at `md:`.

## Consequences

- No Sanity schema change and no content-authoring work — all 7 existing
  case studies get icons immediately, derived purely from text already in
  the database.
- The icon mapping is a heuristic, not authored data. A title that doesn't
  contain any expected keyword (most of these are covered by the `Compass`
  fallback) will still show *an* icon, just a generic one — this is an
  accepted tradeoff for zero content-authoring burden. If a future project's
  process steps consistently need a specific icon the keyword rules don't
  cover, extend `ICON_RULES` in `ProcessTimeline.jsx` rather than adding a
  schema field, unless per-step manual control becomes a real recurring
  need.
- `ProcessTimeline.jsx` now owns process-step rendering entirely;
  `CaseStudyPage.jsx` only passes `project.process` through.
- The scroll-linked line adds a `useScroll`/`useTransform` dependency inside
  the component (framer-motion, already a project dependency) — no new
  package.

## Alternatives considered

- **Enhanced vertical timeline (no zigzag)** — lower implementation risk,
  but rejected in favor of the more dynamic zigzag once confirmed that 3–4
  step counts don't create meaningful asymmetry problems.
- **Numbered card grid** — rejected: reads identically to the already-used
  Pain Points / How Might We pattern, losing the sense of sequence that
  differentiates "Process" from those sections.
- **Manual `icon` field in Sanity** — most accurate/intentional, rejected
  for now because it requires going into Sanity Studio and hand-picking an
  icon for all ~24 existing steps before the section would look complete
  everywhere. Revisit if the keyword heuristic proves wrong often enough in
  practice.
- **Icon replaces step number entirely** — rejected: an explicit step number
  is a low-cost, unambiguous sequence cue that a viewer shouldn't have to
  infer from top-to-bottom position alone.
