# Glossary

Domain terms used across this codebase's docs (ADRs, code comments) that
aren't self-evident from the code alone.

## Experiences (site structure)

Introduced by [ADR 0014](adr/0014-visual-experience.md); build plan in
`docs/visual-experience-plan.md`.

- **Experience** — one of the two parts of the site, each with its own
  layout, fonts, colours and atmosphere. Every Focus belongs to exactly one
  Experience. A project can still appear in both, depending on its Focuses.

- **Product experience** — the hiring-manager side: UI/UX, Front-End, Web
  Dev and Low-Code work, at `/` and `/work`. Uses the night-sky design
  (fireflies, cursor, lavender and mint). The homepage is its front door.

- **Visual experience** — the cinematic, image-first side: Video,
  Photography and Graphic Design work, at `/visual`. Its code lives in
  `src/experiences/visual/` and never imports from the Product code.

- **Shared layer** — `src/shared/`: the code both Experiences use (Sanity
  client and queries, project data, the image viewer, the name lockup, the
  cross-link). Kept small on purpose: anything only one Experience needs
  stays in that Experience.

- **Main page** (of a project) — the Experience a project belongs to, picked
  from its Type: case studies on Product (`/work/<slug>`); photo sets and films
  on Visual (`/visual/<slug>`, and `/work/<slug>` redirects there); Showcases by
  their Focuses. A Visual-only Showcase is listed on the Visual index and has a
  page in both Experiences.

## Focus (homepage entry experience)

Introduced in Phase 6 of the redesign; see
[ADR 0008](adr/0008-focus-chooser-and-service-taxonomy.md) and the "Phase 6"
section of `docs/redesign-plan.md`.

- **Focus** — one discipline a visitor can choose to view the homepage
  through: UI/UX, Front-End Dev, Web Dev, Low-Code/No-Code, Graphic Design,
  Video, or Photography ([ADR 0012](adr/0012-photography-as-a-seventh-focus.md)). A Focus is exactly a **Service** (see below) — the two words name
  the same thing from two sides: *Service* is what Quin offers, *Focus* is the
  visitor's chosen slice of it. The active Focus lives in the URL as
  `?focus=<id>` (e.g. `?focus=video`), which makes it shareable and lets a
  link skip the Focus chooser.

- **Focus chooser** — *removed 2026-11-18 (ADR 0014).* It was a dismissible
  pop-up (a modal dialog) shown to a first-time visitor, offering all seven
  Focuses plus a prominent **Skip**. (Its "seen" flag was an in-memory
  variable, not `localStorage` as first written.) A visitor now picks a Focus
  through the What I Do pills or a `?focus=` link. Not a blocking gate — Skip (or Esc) dismisses it to the Default
  view. See ADR 0008 for why a dismissible pop-up was chosen over both a hard
  gate and a non-blocking on-page section. *Being removed:*
  [ADR 0014](adr/0014-visual-experience.md) drops the pop-up because it is a
  selection screen before any work is shown. `?focus=` links stay.

- **Focused view** — the homepage while a Focus is active. Only the **hero**
  (headline, description, tags) and **Featured Work** change; What I Do,
  About, and Contact are unaffected. Featured Work shows that Focus's featured
  projects first, topped up with its most recent projects to fill the grid.

- **Default view** — the homepage with no Focus active (any link without a
  `?focus=` param): the original
  generic hero and the unfiltered featured set.

- **Service** — the canonical top-level taxonomy of what Quin does (seven
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

- **Photo set** — a `project` document with `type: "photo-set"`: a finished
  series of photographs (portraits, street moments), shown on its own
  gallery-style page (`VisualPhotoSet.jsx`, at `/visual/<slug>` since ADR 0014)
  where the photos lead and the text is
  quiet. It is a *Type* (how the project is presented), not a Focus: a photo
  set is usually tagged with a Photography Category, which is what places it
  under the Photography Focus ([ADR 0012](adr/0012-photography-as-a-seventh-focus.md)).
  Photos are laid out automatically from their shape, with no per-photo layout
  setting. See [ADR 0013](adr/0013-photo-set-project-type.md).

- **Film** — a `project` document with `type: "film"`: one film, shown on its
  own page at `/visual/<slug>` with the lights down. It has a YouTube link
  (the video loads only when played), runtime, synopsis, credits and stills,
  and requires a thumbnail (the poster). See
  [ADR 0015](adr/0015-film-project-type.md) and `docs/film-paste-sheet.md`.

- **Graphic design page** — the Visual page for a Showcase whose Focuses are
  all Visual (`VisualGraphic.jsx`, at `/visual/<slug>`). It stays on paper (no
  lights down), shows the piece's images at their own proportions, and opens
  them in the viewer. The same Showcase keeps its Product page at
  `/work/<slug>`, so it can be linked from either side.

- **Lights down** — a work page that shows photos or film in true colour asks
  the Visual layout (with `useNight()`) to fade to blue-black. The index, About,
  Contact and graphic design pages stay on paper.

## Case study page

- **Case study** — a `project` document with `type: "case-study"`. Since
  2026-11-17 it renders through the v2 page (`CaseStudyPageV2.jsx`, see
  "Case study v2" below). The description that follows is the original (v1)
  layout from `CaseStudyPage.jsx`, which now only serves Showcase projects: Hero (title/subtitle/overview/meta
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

## Case study v2 (narrative model)

Introduced by [ADR 0011](adr/0011-case-study-v2-spine-and-typed-sections.md);
full design in `docs/case-study-v2-plan.md`.

- **Spine** — the case-study content that always sits in a fixed position:
  Hero (title, `headline`, overview, meta card), The Problem, Solution at a
  Glance at the top; Design Showcase, Outcome & Status, Reflection, Next case
  study at the bottom. Stored as dedicated `project` fields.

- **Section** — one entry in a project's drag-to-reorder `sections[]` list,
  the middle of the story between the top and bottom spine. Always one of four
  **typed sections**: *Story* (`storySection`), *Statement*
  (`statementSection`), *Process* (`processSection`), *Key Decisions*
  (`decisionsSection`).

- **Block** — a reusable piece of content inside a Story section (and, for
  media, inside a Key Decision): rich text, media, card grid, or callout.
  Defined once in `src/sanity/schema/caseStudyBlocks.js`.

- **Chapter** — a group of consecutive sections shown as one entry in the
  sticky chapter nav. A section with a `navLabel` starts a new chapter;
  sections without one belong to the chapter above. The spine adds the fixed
  "Overview" and "Outcome" chapters.

- **Solution at a Glance** — the short cards under The Problem. Derived from
  the Key Decisions section (each decision's `glanceTitle`/`glanceSummary`)
  and linking to that decision; falls back to `solutionHighlights`, then
  `solution`, on projects without Key Decisions.

- **Adapter** — `toSections(project)`, temporary code that builds sections
  from legacy fields for projects whose `sections` list is still empty.
  Removed once every case study has been migrated by hand.

## Show-the-skill features

Introduced by [ADR 0017](adr/0017-show-the-skill-features-and-e2e-tests.md).

- **Inspect mode** — a nav button on the Product site that outlines whatever
  the pointer or keyboard focus is on and shows its real font, colours,
  spacing and radius, read live from the page. Colours matching a theme token
  show the token's name. Desktop only.

- **Pin** — a numbered dot on an annotated case study image, placed by
  clicking in Studio. Pin 1 matches legend line 1. Stored as x and y
  percentages.

- **Shot details** — an optional line on a photo ("X-S20 · Meike 33mm f/1.8 ·
  1/250"), typed by hand, shown under the photo and in the viewer.

- **Rejects** — frames from a shoot that did not make the set. Together with
  the picks (the set's own photos) they form the contact sheet.

- **Contact sheet** — a section at the bottom of a photo set showing every
  frame in shoot order: picks ringed, rejects dimmed with a one-line reason.
  Appears only when the set has at least one reject.

- **Printer's marks** — the crop marks and tint strip around a graphic design
  piece on the Visual page.
