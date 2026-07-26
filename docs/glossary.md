# Glossary

Domain terms used across this codebase's docs (ADRs, code comments) that
aren't self-evident from the code alone.

## Case study page

- **Case study** — a `project` document with `type: "case-study"`, rendered
  by `CaseStudyPage.jsx` with the full set of sections (Brief, Challenge,
  Process, Solution, Results, and the optional research sections). Contrast
  with **Showcase**, the simpler `type: "showcase"` project which only
  renders a description and gallery images.

- **Process step** — one entry in a case study's `process` array
  (`{ title, description }`, `src/sanity/schema/project.js:144-160`). Always
  authored, unlike the optional research fields from
  [ADR 0002](adr/0002-optional-research-sections-for-case-studies.md).

- **Timeline node** — the circular marker for a single Process step in
  `ProcessTimeline.jsx`: an icon (see *keyword-derived icon* below) with the
  step number shown as a small corner badge, connected to its neighbors by
  the **draw-in line**.

- **Draw-in line** — the vertical connecting line running through all
  timeline nodes in the Process section, which progressively fills in as the
  user scrolls (via framer-motion `useScroll`/`useTransform`) rather than
  rendering fully visible on mount. See
  [ADR 0003](adr/0003-process-section-zigzag-timeline.md).

- **Zigzag timeline** — the Process section layout where steps alternate
  left/right of a center line on desktop (`md:` and up), collapsing to a
  single left-aligned column on mobile. See
  [ADR 0003](adr/0003-process-section-zigzag-timeline.md).

- **Keyword-derived icon** — a timeline node's icon, chosen at render time by
  matching substrings in the step's existing `title` text against
  `ICON_RULES` in `ProcessTimeline.jsx`, rather than being stored as data.
  Rules are checked in order; the first matching rule wins. A title matching
  no rule gets the `Compass` fallback icon. This keeps every node visually
  consistent (icon + badge) without any Sanity schema or content changes.

- **Optional research section** — any of the case-study fields added in
  [ADR 0002](adr/0002-optional-research-sections-for-case-studies.md)
  (`background`, `researchObjectives`, `researchMethods`,
  `researchFindings`, `painPoints`, `quote`, `persona`, `howMightWe`,
  `ideation`, `wireframes`, `solutionHighlights`, `keyFunctions`) — each
  renders only when filled in, and is omitted entirely (not shown as an
  empty state) otherwise.
