# 0003 — Process section: horizontal stepper with keyword-derived icons

Date: 2026-07-27
Status: Accepted

> Supersedes the alternating-zigzag layout that was briefly adopted and then
> reverted on the same day — see "Why the zigzag was abandoned" below. The
> icon and draw-in-line decisions from that iteration were kept.

## Context

The Case Study "Process" section (`CaseStudyPage.jsx`) rendered
`project.process` as a plain single-column list: a numbered accent circle
next to each step's title/description, spaced with `space-y-8`. It
communicated a sequence but had no visual rhythm, and it was the only major
case-study section still inlined in the page instead of extracted like
`HeroCollage.jsx` / `StatRing.jsx` (see `src/components/case-study/`).

Across the 7 existing case studies (`scripts/migrate-to-sanity.js`), every
`process` array has **3–4 steps**, and step descriptions run up to ~45
words. The `process` step schema (`src/sanity/schema/project.js:144-160`) is
`{ title, description }` only — no icon or image field.

The overriding constraint, stated by the site owner: **this page is read by
hiring managers, so UI friction — wasted horizontal space and unnecessary
scroll depth — is a real cost.** See `CLAUDE.md` → Design principles.

## Decision

Render Process as a **horizontal stepper**, extracted into
`src/components/case-study/ProcessTimeline.jsx` (matching the
`HeroCollage`/`StatRing` extraction pattern).

**Layout.** At `md` and up, all steps sit side by side in a single row, one
grid column each, with a horizontal connecting line running through the node
centers. Below `md` it collapses to a vertical single-column timeline with
the line down the left. Column count is driven by a `--process-steps` CSS
custom property set from `steps.length`, consumed by `.process-stepper` in
`src/index.css` — this keeps the responsive column count in CSS without
duplicating markup per breakpoint. The section container is `max-w-7xl`,
matching the widest sections on the page.

**Nodes.** Each node shows a **lucide-react icon auto-picked from the step's
title**, with the **step number as a small corner badge** rather than the
primary node content. Rules (`ICON_RULES` in the component) are checked in
order — first match wins — so titles matching multiple categories resolve
predictably (e.g. "Design Handoff" reads as documentation, not visual
design). Titles matching no rule fall back to a generic `Compass` icon,
keeping every node visually consistent (always icon + badge, never a bare
numeral). See [glossary](../glossary.md).

**Animation.** The connecting line **progressively draws in as the user
scrolls** (framer-motion `useScroll` + `useTransform`), animating `height`
in the mobile vertical layout and `width` in the desktop horizontal one from
the same scroll progress value. Step columns independently fade/rise in with
a small per-index stagger.

**Typography.** Node and title are centered within each column, but the
description stays **left-aligned** — at 3–4 columns in a `max-w-7xl`
container each column is ~280px, and a 45-word centered paragraph (ragged on
both edges) is measurably harder to read.

## Why the zigzag was abandoned

An alternating zigzag timeline (steps alternating left/right of a center
line) was implemented first. It looked more dynamic, but it was structurally
wrong for this page's goals: each row used
`grid-template-columns: 1fr auto 1fr` with the card on one side and an
**empty spacer on the other**, so ~50% of the container was permanently
blank, and it kept the worst property of the original list — one step per
row, maximizing vertical height. On a 1920px viewport with `max-w-6xl`, only
about a third of the screen width carried content. Widening the container
made the spacer bigger too; the only real fix was changing the layout.

The horizontal stepper inverts both problems: full width used, and the
section's height drops from roughly 900px to ~350px for a 4-step project.

## Consequences

- No Sanity schema change and no content-authoring work — all 7 existing
  case studies get icons immediately, derived purely from text already in
  the database.
- The icon mapping is a heuristic, not authored data. A title containing no
  expected keyword still shows *an* icon, just the generic `Compass` — an
  accepted tradeoff for zero content-authoring burden. Extend `ICON_RULES`
  rather than adding a schema field, unless per-step manual control becomes
  a real recurring need.
- **The horizontal stepper assumes a small step count.** At 3–4 steps
  (all current content) columns are ~280px and comfortable. Beyond ~5 steps
  columns get cramped, since `--process-steps` maps directly to column
  count with no wrapping. If a future project needs more steps, add a
  wrap/fallback rather than letting columns shrink indefinitely.
- `ProcessTimeline.jsx` owns process-step rendering entirely;
  `CaseStudyPage.jsx` only passes `project.process` through.
- The mobile and desktop connecting lines are separate elements shown per
  breakpoint (`md:hidden` / `hidden md:block`). They share one scroll-progress
  value, so behaviour stays in sync, but a change to line styling must be
  made in both places.

## Alternatives considered

- **Alternating zigzag timeline** — implemented, then reverted. See above.
- **Enhanced vertical timeline** — single column with a connecting line and
  larger nodes. Lowest risk, but keeps one-step-per-row scroll depth and
  uses no more width than the original.
- **Two-column card grid** — halves the height and uses full width, but
  drops the connecting-line timeline metaphor and ends up visually
  indistinguishable from the Pain Points / How Might We sections.
- **Manual `icon` field in Sanity** — most accurate, rejected because it
  requires hand-picking an icon for ~24 existing steps in Sanity Studio
  before the section would look complete everywhere.
- **Icon replaces step number entirely** — rejected: an explicit number is a
  low-cost, unambiguous sequence cue.
