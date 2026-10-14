# 0011 — Case study v2: fixed spine + reorderable typed sections

Date: 2026-10-15
Status: Accepted (partially supersedes 0004's fixed section order)

> Numbering note: two ADRs already share the number 0010
> (`0010-differentiate-through-concept-not-more-motion.md` and
> `0010-unified-project-embeds.md`), so this is the next free number.

## Context

Quin designed a narrative-driven case study in Claude Design (exports kept in
`docs/reference/case-study-v2/`, written for the ERP AOP & PPMP project). It
tells the project as a story: a headline hook, the problem, a "Solution at a
Glance" that links into detailed Key Decisions, evidence sections (What I
Worked From, The Design I Inherited, Constraints), and an honest Outcome &
Status plus a Reflection.

The existing model couldn't express that:

- `project.js` held ~40 flat, plain-text fields rendered in one fixed order
  (ADR 0004), so a project could not reorder, add or drop story beats.
- No rich text, and repeatable lists (`process`, `results`, `painPoints`…)
  had no room for images, labelled side-notes or before/after comparisons.
- Every visitor downloaded every project's full case-study text on first
  load (`ProjectsContext` → `fetchAllProjects`), a cost that would grow with
  longer narrative content.

Full design discussion: `docs/case-study-v2-plan.md`.

## Decision

1. **Hybrid model.** Content a case study *always* has stays in dedicated
   **spine** fields that render in fixed positions:
   - Top: Hero (title, `headline`, overview, meta incl. new `team` and
     `projectStatus`) → The Problem (`challenge`) → Solution at a Glance.
   - Bottom: Design Showcase → Outcome & Status (`outcomeHeadline`,
     `results`, `outcomeNotes`) → Reflection → Next case study.
2. **The middle of the story is `sections[]`**, a drag-to-reorder list of
   four **typed sections**: Story, Statement, Process, Key Decisions. They're
   built from four shared **blocks** (rich text, media, card grid, callout).
   Each typed section has its own fields, so Studio stays clear and each
   renders with a dedicated component.
3. **Solution at a Glance is derived from Key Decisions** (`glanceTitle` /
   `glanceSummary` on each decision, linking to `#decision-n`). At most one
   Key Decisions section per project. When a project has none, the page falls
   back to `solutionHighlights`, then `solution`.
4. **Chapters** come from an optional `navLabel` on sections, plus fixed
   Overview / Outcome entries from the spine.
5. **Migration via an adapter.** `toSections(project)` builds temporary
   sections from legacy fields when `sections` is empty, so all existing case
   studies render on the new page without content edits. Projects are then
   rewritten by hand, one at a time.
6. **All schema changes are additive.** Legacy fields move to a "Legacy"
   Studio tab; none are deleted until every case study has been migrated and
   the adapter removed (a future ADR).
7. **Queries split**: the site-wide fetch carries card fields only, and the
   case study page fetches its full story by slug.
8. **Rollout behind `?v=2`** until approved, then the new page becomes the
   default and the old `CaseStudyPage.jsx` is deleted.

## Consequences

- A new *kind* of section still needs one schema type plus one component.
  That's deliberate: it keeps typography and rhythm consistent.
- The adapter is temporary code with a defined removal point.
- Opening a case study shows a brief loading state below the hero (one CDN
  request); fetched case studies are cached in memory for the session.
- Rich text is intentionally minimal (paragraphs, bold, italic, links,
  lists): headings only come from schema fields.

## Alternatives considered

- **Fully generic sections** (title + body + "display as"): rejected. Key
  Decisions needs structure a generic block can't express without turning
  into a pile of conditional fields.
- **Fixed predefined sections with richer items**: rejected. Section order
  stays hard-coded, which fails the reorder requirement.
- **One-time migration script**: rejected for now. It writes to live data, and
  converted legacy text wouldn't read as narrative anyway.
