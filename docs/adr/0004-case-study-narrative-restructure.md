# 0004 — Case study page: TL;DR-first narrative order, merged Solution+Key Functions, hidden Ideation/Wireframes

Date: 2026-09-06
Status: Accepted

## Context

The case study page had grown to ~15 possible sections (Hero, Brief, Background+Challenge,
Process, Research Objectives, Research Methods, Research Findings, Results, Pain
Points, Quote+Persona, How Might We, Ideation, Wireframes, Solution, Key Functions,
Design Showcase) with two problems raised directly by the site owner:

1. The page opened with a screenshot collage before any text said what the
   project was — confirmed in code, not just perception: the Hero section
   rendered `HeroCollage` before the Brief section's `<h1>` even existed on
   the page.
2. Reading the reference portfolios (Matt Fredette's "Anchor" case study,
   Naomi Ncube's hair-care app case study) against ours, our sections were
   dense prose blocks where theirs decomposed into short statements and
   card grids, and their Results-style content never appeared ahead of the
   Persona/How-Might-We work that produces it.

## Decision

1. **Hero and Brief are merged into one section.** Title, subtitle,
   overview, and a compact meta card (Year/Duration/Role/Client/Tools/links)
   all render before the screenshot collage, which now follows as a
   supporting visual rather than the opening beat. The previous sticky
   sidebar layout is retired in favor of the compact card.
2. **"The Challenge" is renamed "The Problem"** in the UI, still backed by
   the same `challenge` field — no schema change, no content rewrite
   required. Its styling is **adaptive by word count**: `challenge` text of
   30 words or fewer renders large, bold, and centered (matching the
   reference's punchy one-liner); longer text (all 7 existing case studies
   today) renders left-aligned at a more moderate size instead, per the
   existing "body copy over ~30 words stays left-aligned" rule in
   `CLAUDE.md`. This was discovered mid-implementation by checking real
   Sanity content (ZCMC ERP's `challenge` is ~130 words) — the naive
   always-big-and-centered version looked worse than the block it replaced.
3. **The Problem is immediately followed by The Solution.** A reader who
   only wants the pitch gets both without scrolling through
   Process/Background/Research/Persona/How-Might-We, which now form a
   "keep reading for the full story" middle section instead of gating the
   pitch.
4. **`solutionHighlights` gains an optional `image` field**, and the
   standalone `keyFunctions` section is retired from the page (each
   solution point now shows its own screenshot inline). The `keyFunctions`
   schema field itself is **kept, not deleted** — relabeled "(legacy,
   unused)" — so any project that already has content in it isn't silently
   destroyed; it simply stops rendering.
5. **Research Objectives, Research Methods, Research Findings, and Pain
   Points are merged into one "Research" section**: an intro paragraph,
   an optional row of research-question cards, and a single insight-card
   grid built from research methods + pain points together (both are
   "things learned during research" and splitting them into three text
   blocks added bulk without adding meaning).
6. **Ideation and Wireframes stop rendering.** Neither has an equivalent in
   the reference material, and both were pure-text sections with no visual
   break. Their schema fields and Sanity content are untouched — only
   `CaseStudyPage.jsx` no longer reads them — so they can be brought back
   without a second migration if a future project needs them.
7. **Final section order**: Hero → Screenshot collage → The Problem → The
   Solution → Process → Background (with the pull-quote now embedded here
   instead of its own full-bleed banner) → Research → Persona → How Might
   We → Results → Design Showcase → Prev/Next → Related Projects. Results
   was deliberately moved to *after* Persona/How-Might-We/Solution — it
   measures the outcome of the solution, so it cannot correctly precede the
   sections that produce that solution.

## Consequences

- No existing case study content is lost or requires a rewrite to keep
  working: `challenge`, `background`, `quote`, `keyFunctions` all still
  exist in the schema and render (or safely don't) exactly as their data
  dictates.
- Two schema fields (`ideation`, `wireframes`, `keyFunctions`) are now
  fetched by `queries.js` but never rendered. This is intentional slack,
  not dead code to clean up — see point 4 and 6 above. A future ADR should
  supersede this one if any of the three are formally retired (fields
  actually deleted) rather than just hidden.
- Any project that wants the full "punchy Problem statement" effect needs
  a `challenge` field of ~30 words or fewer; this is an authoring
  choice per project, not enforced by validation.
- `CaseStudyPage.jsx` grew a `MetaRow` presentational helper and an
  `insightCards`/`isProblemStatementShort` pair of derived values; neither
  was extracted to `src/components/case-study/` since — consistent with
  how Background/Research/Persona were already inlined before this
  change — they're single-use and simple enough not to warrant a new file.

## Alternatives considered

- **Add a new dedicated `problemStatement` field** instead of reusing
  `challenge`. Rejected for now: would require rewriting all 7 existing
  case studies before the page could ship correctly. The adaptive-sizing
  approach (point 2) achieves the same visual goal without that
  authoring burden, and a dedicated field can still be added later if the
  adaptive approach proves insufficient.
- **Delete `ideation`/`wireframes`/`keyFunctions` from the schema** instead
  of just hiding them. Rejected: deleting schema fields is meaningfully
  harder to reverse than hiding a render path, and none of the three had
  been confirmed empty across all 7 projects at the time of this decision.
