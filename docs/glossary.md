# Glossary

Domain terms used across this codebase's docs (ADRs, code comments) that
aren't self-evident from the code alone.

## Focus (homepage entry experience)

Introduced in Phase 6 of the redesign; see
[ADR 0008](adr/0008-focus-chooser-and-service-taxonomy.md) and the "Phase 6"
section of `docs/redesign-plan.md`.

- **Focus** — one discipline a visitor can choose to view the homepage
  through: UI/UX, Front-End Dev, Web Dev, Low-Code/No-Code, Graphic Design,
  or Video. A Focus is exactly a **Service** (see below) — the two words name
  the same thing from two sides: *Service* is what Quin offers, *Focus* is the
  visitor's chosen slice of it. The active Focus lives in the URL as
  `?focus=<id>` (e.g. `?focus=video`), which makes it shareable and lets a
  link skip the Focus chooser.

- **Focus chooser** — the dismissible pop-up (a modal dialog) shown once to a
  first-time visitor, offering all six Focuses plus a prominent **Skip**. Seen
  state is remembered in `localStorage`; a URL that already names a Focus
  skips it. Not a blocking gate — Skip (or Esc) dismisses it to the Default
  view. See ADR 0008 for why a dismissible pop-up was chosen over both a hard
  gate and a non-blocking on-page section.

- **Focused view** — the homepage while a Focus is active. Only the **hero**
  (headline, description, tags) and **Featured Work** change; What I Do,
  About, and Contact are unaffected. Featured Work shows that Focus's featured
  projects first, topped up with its most recent projects to fill the grid.

- **Default view** — the homepage with no Focus active (a first paint before
  choosing, after Skip, or any link without a `?focus=` param): the original
  generic hero and the unfiltered featured set.

- **Service** — the canonical top-level taxonomy of what Quin does (six
  values). Same thing as **Focus**, named from Quin's side. Defined once in
  code (`src/data/services.js`) and the single source of truth for the Focus
  chooser, the Focused hero, and the "What I Do" section. A project does **not**
  store its Services directly — they are **derived** from the project's
  Categories (see below). See ADR 0008 and [ADR 0009](adr/0009-category-document-type-focus-derived.md).

- **Category** — a finer bucket *within* one Focus — e.g. "Travel Montage"
  under Video Editing, "Branding" under Graphic Design. As of
  [ADR 0009](adr/0009-category-document-type-focus-derived.md) it is a **Sanity
  document type** (`title`, `slug`, `focus`, `sortOrder`), each Category
  assigned to **exactly one** Focus via its `focus` field. A project references
  **one or more** Categories (required, ≥ 1); this is the *only* taxonomy field
  a project carries, and a project's Focuses fall out of its categories'
  `focus` values. Categories surface on the **Work page only**, as the
  second-level filter under a chosen Focus. (Supersedes both the earlier
  retired single-valued `category` string and the interim free-text
  `subcategory` field.)

  *Historical note:* ADR 0008 briefly stored a multi-valued `services` array on
  the project and retired `category`. ADR 0009 reverses that split — Category
  returns as a managed document type and Service becomes derived — to avoid two
  taxonomy fields drifting apart.

## Case study page

- **Case study** — a `project` document with `type: "case-study"`, rendered
  by `CaseStudyPage.jsx` in this order: Hero (title/subtitle/overview/meta
  card + screenshot collage), The Problem, The Solution, Process,
  Background, Research, Persona, How Might We, Results, Design Showcase.
  See [ADR 0004](adr/0004-case-study-narrative-restructure.md) for why
  Problem/Solution sit together near the top while Results sits near the
  bottom. Contrast with **Showcase**, the simpler `type: "showcase"`
  project which only renders a description and gallery images.

- **The Problem** — the case study's `challenge` field, labeled "The
  Problem" in the UI (renamed from "The Challenge"). Styled adaptively: 30
  words or fewer renders large/bold/centered, longer text renders
  left-aligned at a more moderate size. See
  [ADR 0004](adr/0004-case-study-narrative-restructure.md).

- **Meta card** — the compact card in the Hero section holding
  Year/Duration/Role/Client/Tools and the live-site/Behance links. Replaced
  the earlier sticky sidebar layout. See
  [ADR 0004](adr/0004-case-study-narrative-restructure.md).

- **Insight card** — one card in the Research section's grid, built from
  either a `researchMethods` entry or a `painPoints` entry (both treated as
  equally-weighted "things learned during research"). See
  [ADR 0004](adr/0004-case-study-narrative-restructure.md).

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

- **Horizontal stepper** — the Process section layout where all steps sit
  side by side in one row on desktop (`md:` and up), connected by a
  horizontal draw-in line, collapsing to a vertical single-column timeline
  on mobile. Chosen to use full container width and minimize scroll depth.
  See [ADR 0003](adr/0003-process-section-zigzag-timeline.md).

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
  empty state) otherwise. As of
  [ADR 0004](adr/0004-case-study-narrative-restructure.md), `ideation` and
  `wireframes` are never rendered regardless of content (schema kept, page
  no longer reads them), and `researchObjectives`/`researchMethods`/
  `researchFindings`/`painPoints` are consolidated into the single Research
  section rather than four separate ones.

- **Legacy, unused field** — a schema field intentionally kept (and still
  fetched in `queries.js`) even though `CaseStudyPage.jsx` no longer renders
  it, so that any project with existing content in it doesn't silently lose
  that data. Currently `keyFunctions` (folded into `solutionHighlights`'
  per-card `image`), `ideation`, and `wireframes`. See
  [ADR 0004](adr/0004-case-study-narrative-restructure.md).
