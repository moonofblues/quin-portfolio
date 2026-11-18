# 0016 — A portfolio hub: Quin's own website at /

Date: 2026-11-19
Status: Accepted, implemented
Amends [ADR 0014](0014-visual-experience.md), point 4 ("Homepage and moving
between Experiences"). Also lifts the dark-only rule of
[ADR 0005](0005-dark-only-drop-theme-toggle.md) for the hub only.

## Context

ADR 0014 kept the homepage as the Product Experience and reached Visual
through side doors. Quin found Visual too hidden. Two attempts followed and
were dropped the same day:

1. A split hero (Product two thirds, Visual one third).
2. A hub made of two large preview panels side by side. It read as choosing
   between two website templates, not as one person's body of work.

The direction that stuck: **one personal brand, one central website, two
distinct portfolios.** The hub must stand as Quin's website even if a visitor
never enters either portfolio.

## Decision

**`/` is the hub, a one-page personal site** (`src/hub/`), outside both
Experiences' layouts. It has its own sections, all inside the hub:

- **Hero:** the name, and one sentence in which the two entry points are the
  links: "I design and build *digital products*, and I make *pictures*." The
  first goes to `/dev`, the second to `/visual`.
- **About:** Quin as one person across both disciplines (the existing About
  text, a short bridging paragraph, the portrait, the work history).
- **Work:** the two portfolios as two plain rows, each named in its own
  portfolio's type voice (Krona One for Digital & Product, Instrument Serif
  italic for Visual & Creative), with an "open" link and three featured
  projects picked automatically (featured first, then Studio order).
- **Contact:** one central contact section.

The hub menu (about, work, contact) never leaves the hub. Only the two
portfolio entry points and project links do.

**Moves:** the Product homepage is now **`/dev`**. `/work`, `/work/<slug>` and
`/visual` are unchanged. In Product, "Home", About and Contact point at `/dev`
and the QL logo returns to the hub. In Visual, the `ql` part of `ql / visual`
returns to the hub and "design & dev" points at `/dev`.

**Old links:** `/?focus=<id>` redirects to `/dev?focus=<id>`. `/#about`,
`/#contact` and `/#experience` now land on the hub's own sections. Résumé and
LinkedIn links to the Product work should use `/dev`.

**Visual identity: the meeting point of the two portfolios.**

- Ground and text: Product's night (`#07090d`) by default, Visual's paper
  (`#eee8d6`) as a light mode, switchable (the hub's own, remembered in
  `localStorage`). The Contact band always takes the other ground, so both
  meet on one page.
- Type: Visual's Bricolage Grotesque (lowercase headings) and Instrument Serif
  (voice), with Product's Instrument Sans for body. Krona One appears once, on
  "Digital & Product".
- Colour: Product's lavender marks Digital, Visual's ink blue marks Visual,
  each only where its portfolio is named.
- Interactions, all CSS or one passive listener, compositor-friendly, and
  static under `prefers-reduced-motion`: a lens that shows the other ground
  under the cursor in the hero; a ticker interleaving the two disciplines; the
  portrait "developing" from blue monotone to colour on hover; each Work row
  lighting up in its own portfolio's ground on hover; a scroll-progress
  hairline and timeline rules drawn by scroll (CSS scroll-driven animation,
  progressive).
- Not used, on purpose: numbered sections, small caps labels above headings,
  cards, glass, glows, gradient text.

**Speed and independence.** The hub is eager (it is the landing page) and
imports only from `src/shared/` and `src/assets/`. Bricolage and Instrument
Serif load when the hub (or Visual) opens, not from `index.html`. Thumbnails
are lazy. Shared data (`shared/timeline.js`, `shared/contact.js`,
`visualGroupOf` in `shared/experiences.js`) lives in `src/shared/`.

## Alternatives considered

- **Split hero**, and **two large preview panels**: built and dropped (above).
- **A Product / Visual toggle in the nav bars.** Easy to miss.
- **Keep ADR 0014 as is.** Visual stayed too hidden.

## Consequences

- A bare `/` link lands on the hub, one click from the work.
- Contact details exist in two places: `shared/contact.js` (hub) and
  `components/Contact.jsx` (Product). Change both.
- The hub's Visual door shows what has a thumbnail. Today that is graphic
  design only; photography and film appear when published.
- The hub About has a drafted bridging paragraph ("Photography and film taught
  me to look closely...") for Quin to edit.
