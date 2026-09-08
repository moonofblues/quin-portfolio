# 0008 — Focus chooser, focused homepage, and the Service taxonomy

Date: 2026-09-08
Status: Accepted (plan stage — documents intent; not yet implemented)

## Context

Quin's work spans several disciplines — UI/UX, front-end and web development,
low-code/no-code, graphic design, and video. A single generic homepage asks
every visitor to infer for themselves which of these is relevant to them. The
goal of this change is to let a visitor (typically a hiring manager) declare
what they came for and see a homepage tailored to it.

Two pre-existing facts shaped the design:

1. **The site already had the taxonomy — twice, and inconsistently.**
   `src/data/categories.js` defined four project **categories** (`ui-ux`,
   `web-dev`, `graphic-design`, `video`) used by the work filter, while
   `Services.jsx` listed six **capabilities** (the four above plus Front-End
   Development and Low-Code/No-Code). Two lists meant to describe the same
   thing had drifted apart, and the two capabilities with no category had no
   filterable work behind them.

2. **This project's own rules push hard against friction.** `CLAUDE.md`'s
   first design principle is *"Minimize UI friction … every extra scroll,
   every hunt for information, is a real cost,"* and the performance rules
   state *"never delay the LCP element"* (the hero screenshot). Any entry
   experience that sits in front of the homepage is in direct tension with
   both.

## Decision

Add a **Focus** entry experience and collapse the two taxonomies into one.
Terms are defined in `docs/glossary.md`; the phased build lives in the
"Phase 6" section of `docs/redesign-plan.md`.

**Entry experience**

- A **dismissible Focus chooser** (a modal pop-up) greets first-time visitors
  with the six Focuses and a prominent **Skip**. It is *not* a blocking gate:
  Skip or Esc dismisses it to the Default view, background scroll is locked
  while open, focus is trapped, it is screen-reader labelled, and it respects
  `prefers-reduced-motion`.
- "Seen" is remembered in `localStorage`; the active Focus lives in the URL as
  `?focus=<id>`. A URL that already names a Focus **skips the chooser** and
  applies that Focus directly — so a shared link lands straight in the
  intended view.
- Choosing a Focus produces a **Focused view**: only the **hero** (headline,
  description, tags) and **Featured Work** change; What I Do, About, and
  Contact are untouched. The hero *screenshots* deliberately do **not** change
  (they carry the LCP image; see Consequences). Featured Work shows the
  Focus's featured projects first, topped up with its most recent projects.
- A Focus can be changed anywhere via two always-available controls: the
  clickable service pills in **What I Do**, and a persistent **"Viewing:
  <Focus>"** switcher in the navigation, plus a "View all" reset.
- The per-Focus hero copy and the Service list live in **one code file** — the
  single source of truth for the chooser, the Focused hero, the work filter,
  and What I Do.

**Taxonomy**

- **Service** replaces **Category** as the canonical taxonomy (six values). A
  project references **one or more** Services (multi-valued); the work filter
  becomes `project.services.includes(focus)`.
- Migration is **additive and reversible**: add the `services` array field
  alongside the existing `category`, copy each project's category into it,
  verify, and only then retire `category`.

## Consequences

- **The friction tension is accepted, and mitigated by shape, not avoided.** A
  first-time visitor does see an interstitial — but it is dismissible, remembered
  so it appears once, skippable by keyboard, and bypassed entirely by any
  `?focus=` link. The upside is a homepage that answers "is this person right
  for my role?" faster for the visitor who engages with it.
- **The LCP element is protected by scoping the hero swap to text only.** The
  center screenshot — the largest-contentful-paint candidate — is identical
  across Focuses, so the tuned eager/`fetchpriority="high"` load path is never
  disturbed. Swapping collage images per Focus was rejected for exactly this
  reason (see Alternatives).
- **The chooser is bundled, not lazy-loaded.** It must paint on first frame
  without a flash of homepage-then-popup, so it ships in the entry chunk. It is
  kept to text and buttons (no heavy graphics) and the build's homepage
  critical set must be re-measured against the ~232 KB gz working cap after it
  lands.
- **Empty Focuses are handled, not hidden.** All six always appear; a Focus
  with no projects yet (Front-End Dev, Low-Code until re-tagging) shows a
  "work coming soon" note and falls back to the full set, so a chosen Focus
  never dead-ends.
- **One taxonomy removes a class of drift bugs** but is a live-content
  refactor touching the Sanity schema, `categories.js`, the work filter,
  `ProjectsContext` selectors, and `WorkPage`. The additive migration keeps
  original data intact until the new field is proven.
- **Multi-valued Services backfill the thin tracks without new projects** —
  existing full-stack work can be tagged Front-End / Low-Code as well as its
  primary discipline, so a project can now appear under several Focuses.

## Alternatives considered

- **Blocking entry gate** (no content until a choice is made). Rejected: it is
  the maximal-friction reading of the idea and contradicts the "minimize
  friction" principle and the LCP rule outright — a hiring manager who just
  wants to see the work is charged a cover fee.
- **Non-blocking on-page section** (a "choose a discipline" band in the normal
  scroll, no overlay). Lower friction, but it loses the deliberate "greeting"
  moment Quin wanted and is easy to scroll straight past. Kept as the safe
  fallback if the pop-up ever tests poorly.
- **Session-wide personalization** (the Focus reorders/filters *every*
  section). Rejected as over-built: new global state on every section, and it
  risks hiding work from a visitor who would have looked at all of it. The
  scoped hero+featured swap gives most of the value for a fraction of the
  surface area.
- **Swapping the hero collage per Focus.** Rejected for v1: it moves the LCP
  image and re-opens the performance budget the redesign spent effort closing.
- **Keeping two taxonomies** (category for filtering, services for display).
  Rejected: the drift between them is the very problem this change removes.
- **Single-valued Service** (just rename/expand `category`). Rejected: forces
  every full-stack project into one bucket and leaves Front-End / Low-Code
  empty — the opposite of what multi-valued buys.
