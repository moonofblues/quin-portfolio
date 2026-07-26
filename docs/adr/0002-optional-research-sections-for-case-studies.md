# 0002 — Optional research sections instead of full adoption or style-only port

Date: 2026-07-26
Status: Accepted

## Context

We redesigned the Case Study detail page against a reference template (a
research-heavy UX case study: personas, pain-point cards, stat-ring findings,
How Might We cards, ideation flow diagrams, wireframes). The reference assumes
real interview/persona research behind every project. Our 7 existing Case
Studies (ZCMC ERP, Hospital Operations Dashboard, etc.) only have
Challenge/Process/Solution/Results content — none of them have documented
personas, pain points, or ideation artifacts.

Three options were considered:

1. **Full adoption** — rebuild every section and backfill real research
   content for all 7 projects before shipping.
2. **Style-only port** — keep the existing content model exactly, just restyle
   it (sidebar, color blocking, stat rings), and drop every section that
   presupposes research (persona, pain points, HMW, ideation, wireframes).
3. **Hybrid** — restyle the existing content model AND add the new
   research-oriented fields as optional schema, rendering each new section
   only when its field is filled in.

## Decision

Use the **hybrid** approach. All new fields (`background`, `researchObjectives`,
`researchMethods`, `researchFindings`, `painPoints`, `quote`, `persona`,
`howMightWe`, `ideation`, `wireframes`, `solutionHighlights`, `keyFunctions`)
are optional, unvalidated (no `required()`), and their corresponding page
sections are conditionally rendered — absent entirely when the field is
empty, not rendered as an empty/placeholder state.

## Consequences

- The other 6 case studies render unchanged today (base sections only) and
  can gain richer sections incrementally, project by project, without a
  second migration.
- No fabricated research content is ever displayed — a project without a real
  persona interview simply has no persona section, rather than a stand-in.
- The schema carries fields that most projects will never fill in. This is an
  accepted, intentional footprint — the alternative (splitting research
  fields into a separate document type) would add real indirection for no
  benefit at 7 projects.
- `CaseStudyPage.jsx` must treat every new field as absent-by-default and
  guard each section's render — a missed guard shows a broken/empty section
  rather than just omitting it.

## Alternatives considered

- **Full adoption** — most faithful to the reference, but requires
  fabricating or reconstructing research that was never actually conducted
  for older projects (ZCMC ERP shipped years ago with no interview records).
  Rejected: would misrepresent the work.
- **Style-only port** — zero content-authoring burden, but discards the
  reference's most distinctive sections entirely. Rejected: loses too much of
  what made the reference worth copying in the first place.
