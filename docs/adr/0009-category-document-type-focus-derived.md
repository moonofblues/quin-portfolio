# 0009 — Category as a Sanity document type; Focus derived from Category

Date: 2026-09-09
Status: Accepted (plan stage — documents intent; not yet implemented).
Amends [ADR 0008](0008-focus-chooser-and-service-taxonomy.md).

## Context

ADR 0008 unified the project taxonomy onto a single canonical **Service**
(a.k.a. **Focus**): six code-defined values, stored on each project as a
multi-valued `services` array, with the earlier single-valued `category`
field retired. A first pass at "categories under a service" was then added as
a free-text `subcategory` string on the project.

Two problems surfaced with that shape:

1. **`subcategory` as free text doesn't model the relationship Quin wants.**
   Quin wants a **defined set of categories that each belong to a Focus** —
   e.g. Video Editing has "Travel Montage", "Promotional Video"; Graphic
   Design has "Branding" — managed in Sanity, not retyped per project. Free
   text can't enforce "this category belongs to that focus", can't be reused
   consistently, and can't drive a per-focus sub-filter reliably (typos make
   two "Travel montage" / "Travel Montage" buckets).

2. **Storing `services` *and* a category on the project reintroduces drift.**
   Two fields describing the same thing that can disagree is the exact bug
   ADR 0008 was written to kill. If a category already knows its focus, a
   separate `services` array on the project is redundant and can contradict
   it.

Fixed facts shaping the decision:

- Focus stays the six code-defined values (`src/data/services.js`) — Quin
  confirmed "stick to only the 6". It remains the single source of truth for
  the homepage Focus chooser, Focused hero, and What I Do (ADR 0008).
- The Work page filter is **Focus-first, then Category within it** (settled
  before this ADR).
- A project can span multiple Focuses (settled in ADR 0008).

## Decision

Promote **Category** to a first-class **Sanity document type**, and **derive
a project's Focuses from its Categories** rather than storing them.

**Category document** (`src/sanity/schema/category.js`), fields:

- `title` — e.g. "Travel Montage"
- `slug` — for the Work-page URL
- `focus` — a string dropdown of the six focus ids (`ui-ux`, `front-end`,
  `web-dev`, `low-code`, `graphic-design`, `video`); **exactly one** focus per
  category. If two focuses need the same name, that is two Category documents.
- `sortOrder` — controls tab order (mirrors `project.sortOrder`)

**Project → Category**: a project references **one or more** Category
documents and nothing else taxonomy-wise. Its **Focuses are derived** from the
set of its categories' `focus` values. Multi-focus projects arise naturally by
tagging categories across focuses. Category is **required** (≥ 1), rolled out
additively (see Migration).

**Where categories surface**: the **Work page only**, as a second-level filter
(pick a Focus tab → that Focus's categories appear as a sub-row → pick one to
narrow). The **homepage stays Focus-level** (ADR 0008 hero + Featured Work
swap, no categories). URL convention follows ADR 0008 — query params:
`/work?focus=video&category=travel-montage` (focus = code id, category = slug).

**Migration (additive, reversible):**

1. Add the `category` document type and a `categories` reference array on
   `project` (optional at first). Keep `services` / `subcategory` / legacy
   `category` in place.
2. Quin creates Category documents (title + focus) and tags every project's
   `categories`.
3. Once every published project is tagged, flip `categories` to required and
   remove the now-superseded `services`, `subcategory`, and legacy `category`
   fields.

## Consequences

- **One thing to tag, no drift.** A project carries only category references;
  focus falls out of them. There is no second taxonomy field to contradict the
  first — this preserves the anti-drift goal of ADR 0008 more strictly than
  ADR 0008 itself did (which still stored `services` on the project).
- **A category must exist before a project can be filed under a Focus.**
  Categories are created first, then projects tagged. Focuses with no
  categories yet (Front-End, Low-Code until Quin adds some) have no projects
  and fall back to ADR 0008's "coming soon" treatment.
- **Discipline labels derive from category.** A project's focus label on cards
  and the case-study hero now comes from its category's `focus`, not a stored
  field.
- **Runtime fetch gains a document type.** Categories are fetched at runtime
  like every other Sanity read (per the ADR 0001 correction in
  `redesign-plan.md`); the Work page needs the category list to build its
  sub-filter. Small text-only payload.
- **This amends ADR 0008**: `services` is no longer stored on the project
  (derived instead); **Category is un-retired** and promoted from a retired
  string to a managed document type. ADR 0008's Focus/Service definition,
  homepage chooser, and Focused-hero decisions are otherwise unchanged.
- **Live-content refactor.** Touches the Sanity schema (new type + project
  field), `queries.js`, `ProjectsContext` selectors, `WorkPage`, `OtherWork`,
  and `CaseStudyPage`. The additive migration keeps the site working on the
  old fields until the new ones are proven.

## Alternatives considered

- **Keep `subcategory` as free text** (the immediately-prior shape). Rejected:
  can't enforce category→focus membership, invites typo-duplicated buckets,
  and can't be centrally managed or reused. It was a stopgap, not the model
  Quin described.
- **Store both `services` and category references on the project.** Rejected:
  two fields for one fact can disagree — the drift bug ADR 0008 exists to
  remove. Deriving focus from category eliminates the contradiction by
  construction.
- **Make Focus a Sanity document type too**, with Category referencing it.
  Rejected for now: Quin wants the six Focuses fixed and in code, and ADR 0008
  deliberately keeps Service (with its hero copy, tags, icons) as a single
  code file driving the homepage. A code-id `focus` dropdown on Category gives
  the link without moving Focus into Sanity.
- **Path-based Work URLs** (`/work/:focus/:category`). Rejected: diverges from
  ADR 0008's `?focus=` query-param convention and complicates routing; query
  params keep one URL scheme across the site.
- **Category belongs to many Focuses** (multi-valued `focus`). Rejected:
  complicates the sub-filter (a category would appear under several tabs) and
  blurs the "categories live under one focus" model; the rare shared name is
  handled by two documents.
