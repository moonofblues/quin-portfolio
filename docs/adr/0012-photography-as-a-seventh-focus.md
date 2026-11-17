# 0012 — Photography as a seventh Focus

Date: 2026-11-17
Status: Accepted (Part 1 implemented: the Focus itself. The Photo set page is
Part 2 and is not built yet.)
Amends [ADR 0008](0008-focus-chooser-and-service-taxonomy.md) and
[ADR 0009](0009-category-document-type-focus-derived.md).

## Context

ADR 0008 fixed the Service/Focus taxonomy at six values, and ADR 0009 recorded
Quin's confirmation to "stick to only the 6". Quin now wants to show
photography: a personal practice (portraits of friends, moments on the
street), shown as a few finished sets.

Two things were settled in conversation before this ADR:

- Photography must **not** live under Graphic Design. It gets its own Focus.
- A project that is both photography and graphic design must show under
  **both** Focuses.

## Decision

Add **Photography** (`id: "photography"`) as a seventh Focus.

- It is added to `src/data/services.js`, the single source of truth, with its
  own label, icon, hero headline, hero description and tags. The copy only
  claims what the work shows (portraits, street moments, finished sets) and
  makes no claims about years, clients or services.
- It is added to the `focus` list on the Category document type, so a
  Photography Category can be created in Studio.
- **No change to how projects are tagged.** A project's Focuses are still
  derived from its Categories (ADR 0009), so a project tagged with a
  Photography Category and a Graphic Design Category already appears under
  both Focuses. Nothing new was needed for that requirement.
- The Focus chooser's button grid is now a centered, wrapping row, so an odd
  number of Focuses (seven) leaves a centered last button instead of one
  stranded at the left. What I Do and the Work page tabs already wrap.

## Consequences

- The Focus chooser has one more choice. It is still dismissible and
  skippable, so the friction cost described in ADR 0008 is only slightly
  larger.
- Photography has no work yet. ADR 0008 said an empty Focus shows a note and
  falls back to the general featured set. That put unrelated work (UI/UX)
  under a Focus the visitor had just picked, so this ADR **changes the rule
  for every Focus**: Featured Work now shows only a "coming soon" card (with a
  "Browse all work" link) until a project is tagged with a Category in that
  Focus. The cost is that a visitor who picks an empty Focus sees nothing to
  look at on the homepage; the "Browse all work" link is the way out.
- The case study hero shows only the Focus of a project's **first** Category
  (`categories[0].focus`). A project in two Focuses therefore shows one label.
  This is existing behavior and is left as is.
- Photo sets need a gallery-style page, which the case study template does not
  provide. That is Part 2 and is tracked separately.

## Alternatives considered

- **Photography as a Category under Graphic Design.** Rejected by Quin:
  photography is not graphic design, and a visitor who wants photography
  should not have to open Graphic Design first.
- **A standalone gallery page outside the Focus system.** Rejected: it would
  not appear in the chooser, the Work filter or What I Do, and could not share
  a project with another Focus.
- **Mention photography as text only.** Rejected: it shows no work.
