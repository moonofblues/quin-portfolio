# 0017: Show the skill, not just describe it

Date: 2026-11-19
Status: Accepted, implemented
Builds on [ADR 0010](0010-differentiate-through-concept-not-more-motion.md):
differentiate through a concept, not more motion.

## Context

Quin studied a set of role-specific portfolio templates and wanted the site to
be memorable. The useful lesson was not their look. It was that each site makes
the job's own tools the interface, and shows the skill working instead of
describing it. ADR 0010 already warned against decoration, so every addition
had to carry information for a hiring manager or a visitor.

## Decision

Add features that show the work, each optional and rendered only when its
content exists (ADR 0002):

- **Inspect mode** (Product nav, desktop only). Outlines the element under the
  pointer and reads its real computed styles, with theme token names. A
  separate lazy chunk, so the homepage bundle does not grow.
- **Before/after slider** (a layout on the case study Media block). Native
  range input underneath, so keyboard and touch work without pointer code.
- **Pins** on annotated images, placed by clicking in Studio
  (`PinPlacerInput`), linked to the existing legend lines. Only coordinates are
  new data.
- **Shot details**, **frame numbers** and **rejects** on photo sets, shown as a
  line under each photo and as a **contact sheet** at the bottom of the page.
- **Printer's marks** (crop marks and a tint strip) on graphic design pieces.
- **Desk photo** on the hub About, tappable objects. Switched on by filling in
  `src/shared/desk.js`.
- Small things: a 404 page for Product, a colophon line, print styles, a
  console note, and a rewrite of the not-found, empty and loading messages.

## Fixes found on the way

- The global `button { background: none; border: none }` rule sat outside
  Tailwind's layers, so it beat every `bg-*` and `border-*` class on a
  `<button>`. It now lives in `@layer base`. Anything new on a button works
  with plain utility classes.
- A photo set with no thumbnail was hidden from the Visual index. It now falls
  back to its first photo.

## Tests

Playwright (`npm run test:e2e`, config in `playwright.config.js`, specs in
`tests/e2e/`) drives the real site. It caught the invisible pins, which a unit
check could not have. The tests read live Sanity content, so they depend on the
published data they name (the Planning & Procurement System case study and the
Fujifilm photo set).

## Design review fixes (same day)

A review of the hub and the Product hero led to these changes, each with a
test in `tests/e2e/design-review-fixes.spec.js`:

- The moon is dimmed so white headline text over it stays readable.
- The "Portfolio in progress" pill is gone. It was a decorative badge with an
  endless pulse, and told hiring managers the site was unfinished.
- The focus pills moved under the buttons, so the headline comes first.
- The scroll arrow is in the layout instead of absolutely positioned, so it no
  longer overlaps the buttons.
- The hero subtitle was rewritten from facts already in the About section.
- On the hub, the name is larger and the top padding is smaller on phones.
- The before/after labels sit above the picture instead of on it.

## Not built, on purpose

- **Exposure transition** (hub to Visual developing in, hub to Product going
  dark). Tried with View Transitions and dropped: the site uses the declarative
  `BrowserRouter`, which ignores the `viewTransition` setting, and the Visual
  page loads as a lazy chunk, so the browser would capture a blank loading state
  as the new page. Revisit only if the router moves to a data router.
- **Film chapters.** Quin's films are short.
- **A fake loading bar, a stickers-and-avatars look, extra cursors,
  scroll-jacking.** Template looks and decoration that cost the reader time.

## Consequences

- More optional Studio fields. Each renders only when filled.
- The Studio pin input cannot be tested without running Studio.
- `docs/glossary.md` defines the new terms.
