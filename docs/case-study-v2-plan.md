# Case study v2: narrative redesign + Sanity content model

## Context
Quin designed a narrative-driven case study in Claude Design. There are 4 exports in `D:\Users\HP\Downloads\*-html.zip`, written for the ERP AOP & PPMP project. Today's page (`src/pages/CaseStudyPage.jsx`, 743 lines) renders ~40 flat plain-text fields from `src/sanity/schema/project.js` in a fixed order, which can't be reordered, can't hold rich text, and can't express things like Key Decisions with notes and before/after media.

Goal: a reusable system where each case study tells its own story in Studio-controlled order, and the page keeps the site's identity. The reference already uses the site's tokens (Krona One / Instrument Sans, `#07090d`, `#a99ce4`). The background stars are `<Fireflies />` in `layout/Layout.jsx:69`, so they're preserved automatically as long as sections avoid opaque full-bleed backgrounds.

Live content facts: 7 published case studies, all with overview/challenge/solution, 4 process steps and 3 results. Only Hospital Ops Dashboard uses most research fields. ZCMC Website, UI Library and AdZU have base fields only.

## Decisions (resolved in grilling)
| # | Decision |
|---|---|
| D1 | One continuous page; chapters with a sticky chapter nav; "Continue" = in-page jump |
| D2 | Model C: fixed **spine** fields + drag-to-reorder `sections[]` of **typed** sections built from **shared blocks** |
| D3 | Top: Hero → Problem → Solution at a Glance. Middle: `sections[]`. Bottom: Showcase → Outcome & Status → Reflection → Next |
| D4 | Solution at a Glance is **derived** from Key Decisions (glanceTitle/glanceSummary, links to `#decision-n`). Fallback: `solutionHighlights` → `solution` |
| D5 | 4 section types: Story, Statement, Process, Key Decisions. 4 blocks: richText, media, cardGrid, callout. At most 1 Key Decisions section; alt text required |
| D6 | Optional `navLabel` per section starts a chapter; spine adds Overview + Outcome. Desktop sticky row, mobile "Chapter n of N ▾" pill |
| D7 | New spine fields: `headline`, `team`, `projectStatus`, showcase image title/caption, `outcomeHeadline`, `outcomeNotes[1–3]`, `reflection` |
| D8 | Adapter `toSections(project)` renders legacy fields as temporary sections → all 7 projects on v2 day one; hand-migrate; delete adapter after |
| D9 | Studio tabs: Card & meta / Story / Outcome / Legacy. Nothing deleted now |
| D10 | Key Decisions: two-column with text pinned on wide screens (text ~40% / media ~60%); stacked on mobile and for decisions without media |
| D11 | Annotated images: pins drawn into the image in Figma; Studio holds the numbered legend |
| D12 | Split queries: card fields global, full story per slug (cached); fetch image dimensions |
| D13 | `@portabletext/react`, minimal toolbar (paragraphs, bold, italic, link, lists) |
| D14 | `CaseStudyPageV2` behind `?v=2` until approved; Showcase-type pages unchanged |
| D15 | Existing surface tokens only; reuse `ProcessTimeline` + optional note |
| D16 | ERP migrated first, by hand, from a paste sheet in `docs/` |
| D17 | Ending: one Next case study card (loops) + Back to Work; no Prev/Next bar or Related Projects on case studies |

## Sanity schema
Files: new `src/sanity/schema/caseStudyBlocks.js` (shared objects + section types); edit `project.js`; register the types in `sanity.config.js`.

**Shared objects**
- `richText`: array of `block` with styles `[normal]`, lists `[bullet, number]`, marks `[strong, em, link]`
- `captionedImage`: image + `alt` (required) + `caption`
- `mediaBlock`: `layout` radio (single | pair | annotated)
  - single: `images[1]`
  - pair: `images[2]`, each with an optional `label` (e.g. "Before")
  - annotated: `image` + `legend[]` of strings, numbered by position
  - Validation checks the image count per layout.
- `cardGridBlock`: `items[] {title, body(text)}`, min 1
- `calloutBlock`: `label` (optional, e.g. "Why it stalled") + `body` richText
- `labeledNote`: `{label, body(text)}`

**Section types** (each has `navLabel?` and `eyebrow?`; the Studio preview shows the type + heading)
- `storySection`: `heading` (required), `headline?`, `content[]` of [richText, mediaBlock, cardGridBlock, calloutBlock], min 1
- `statementSection`: `label?` (default "The Challenge"), `statement` (text, required)
- `processSection`: `heading`, `intro?`, `steps[] {title, description}` min 1, `note?`
- `decisionsSection`: `heading`, `headline?`, `decisions[]` min 1, each with:
  - `headline` (required), `glanceTitle`, `glanceSummary`
  - `body` richText, `notes[]` labeledNote, `media[]` mediaBlock

**On `project`:**
- `sections[]` of the 4 types. Validation: at most one `decisionsSection`. Hidden unless `type == "case-study"`.
- Spine additions per D7, `projectStatus` options list (Shipped, MVP built · not deployed, In progress, Concept). Final values to be confirmed during build.
- `showcaseImages` items gain `title`/`caption` fields. This is non-breaking.
- `groups` per D9. The adapter-read legacy fields go into `group: "legacy"` with "Superseded by sections, see ADR 0011" descriptions.

## Frontend
**Queries (`src/sanity/queries.js`)**
- Split `PROJECT_FIELDS` into `CARD_FIELDS` (used by `fetchAllProjects`) and `fetchCaseStudy(slug)`.
- `fetchCaseStudy` projects the spine + legacy fields + `sections[]{..., _type, _key}`, with images as `{ "url": asset->url, "width": asset->metadata.dimensions.width, "height": ... , alt, caption }`.
- Showcase pages still need `images`/`embeds`: keep them in the per-slug fetch and fetch per slug for both types.

**Context (`ProjectsContext.jsx`):** add a memoized `getCaseStudy(slug)` with a `useRef(Map)` cache. The value stays `useMemo`'d and the function `useCallback`'d.

**Components (`src/components/case-study/`)**
- `v2/CaseStudyPageV2.jsx`: spine layout + `SectionRenderer` loop + chapter nav
- `v2/toSections.js`: the adapter. Returns `project.sections` if non-empty, otherwise synthesizes:
  - background + quote + painPoints → story section
  - research ×4 → story section
  - process → process section
  - howMightWe → card grid in a story section
  - ideation/wireframes/keyFunctions/persona stay hidden (ADR 0004)
- `v2/SectionRenderer.jsx`: map `{storySection: StorySection, ...}`. Unknown `_type` renders nothing, with a `console.warn` in dev.
- `v2/sections/` (`StorySection`, `StatementSection`, `ProcessSection`, `DecisionsSection`) and `v2/blocks/` (`RichText`, `MediaBlock`, `CardGrid`, `Callout`): one shared style per element, so content varies but rhythm doesn't
- `v2/ChapterNav.jsx`: anchors built from spine + `navLabel`s.
  - Active chapter tracked by IntersectionObserver (no scroll listener).
  - CSS `position: sticky`; transitions name their properties.
- `v2/SolutionGlance.jsx`, `v2/OutcomeSection.jsx` (reuses `StatRing` for `results`), `v2/NextCaseStudy.jsx`
- Reuse: `HeroCollage`, `ProcessTimeline`, `StatRing`, `ProjectEmbeds`, `Tag`, `Button`, `Star`, `SERVICE_BY_ID`, the existing lightbox logic (extract it into `ShowcaseLightbox.jsx`)

**Widths (CLAUDE.md scale):**
- Sections `max-w-7xl`; prose capped at `max-w-4xl`
- Meta/outcome columns `max-w-6xl`
- Card grids use `auto-fit minmax(240–280px)`, mapped to Tailwind grid classes

**Performance rules:**
- `fadeUp` with `viewport once`; delays under 0.3s; the hero image is not delayed
- No `whileHover`; no `transition-all`; images get width/height + lazy + `decoding="async"`; one eager hero image

**Rendering of missing content:** every spine element and block renders only when filled (ADR 0002). A project with empty `sections` and no legacy fields shows Hero → Problem → Glance fallback → Showcase → Outcome.

**`App.jsx`:** the case-study route renders V2 when `?v=2`, otherwise the old page. After approval, V2 becomes the default and the old page is deleted.

## Implementation sequence (each step builds and is checkable before the next)
1. **Docs.** ADR `0011-case-study-v2-spine-and-typed-sections.md`. Note that two ADRs already share number 0010, so 0011 is the next free one. Glossary entries: Spine, Section, Block, Chapter, Glance. Copy the reference exports to `docs/reference/case-study-v2/`.
2. **Schema.** Add the blocks/sections file, edit `project.js` with additive fields and groups, register in `sanity.config.js`. Check in Studio (`npm run dev` → `/studio`) that the old content is intact and the new tabs work.
3. **Queries + context split.** `CARD_FIELDS` + `fetchCaseStudy` + cache. The old page is temporarily wired to `getCaseStudy` so production behavior is unchanged.
4. **Blocks + sections + adapter + `CaseStudyPageV2` behind `?v=2`.** Check all 7 projects through the adapter.
5. **Chapter nav, Solution Glance, Outcome, Reflection, Next card.**
6. **Paste sheet** `docs/case-study-v2-erp-paste-sheet.md`. Quin enters the ERP content; we fix any Studio usability issues it reveals.
7. **Review gate.** Quin compares `?v=2` vs current on all 7 → approval → make V2 the default, delete the old page and the `?v=2` switch, update the glossary "Case study" entry.
8. **Later, after all 7 are hand-migrated:** remove the adapter and legacy fields in a cleanup ADR.

## Verification
- `npm run build` after each step. Homepage critical set (`dist/index.html` script + preloads) must not grow past ~698 KB raw / ~227 KB gz. It should *shrink* slightly after step 3. `@portabletext/react` must appear only in the CaseStudyPage chunk.
- `npm run lint`: error count must not rise above the pre-existing ~30.
- Browser check (claude-in-chrome) at 1440px and 390px on `/work/<slug>?v=2` for:
  - all 7 slugs
  - the ERP after entry
  - a project with zero optional content
  - chapter nav highlighting and anchor jumps, Glance → Decision links
  - pinned decision column
  - lightbox and Esc
  - reduced-motion
  - no horizontal scroll
  - stars visible behind sections
- Studio: the "≤1 Key Decisions" and "alt required" validations fire; the legacy tab shows old content untouched.

## Progress (2026-10-15)
- ✅ Steps 1–5 implemented. The new page is reachable at `/work/<slug>?v=2`; the live default is unchanged.
- ✅ Step 6 paste sheet: `docs/case-study-v2-erp-paste-sheet.md`. **Waiting on Quin** to enter the ERP content in Studio.
- ⏳ Step 7 review gate: **waiting on Quin**. Note for the swap: Showcase-type projects still render through the old `CaseStudyPage.jsx` (v2 hands them back to it), so extract its showcase branch into its own page *before* deleting the old file.
- Deviations from the plan, made during build:
  - Outcome metrics render as large number cards, not `StatRing`s (the reference does this, and a ring is meaningless for "5 weeks").
  - The media legend works on every layout, not only "annotated" (the reference's before/after pair has pins too).
  - `cardGridBlock` gained an optional small heading (the adapter needs it for "Key questions" / "Methods").
  - `ideation` / `wireframes` / `keyFunctions` are no longer fetched (never rendered since ADR 0004). Their content is untouched in Sanity.
- Verification done: Sanity schema validator 0 problems; GROQ queries run against live data; server-render of all 7 case studies plus a synthetic fully-migrated project; production build; homepage critical JS 225.8 KB gz. **Not yet done:** the visual browser check (the Chrome extension wasn't connected).
