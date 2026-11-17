# 0013 — Photo set as a third project Type

Date: 2026-11-17
Status: Accepted (implemented; not yet checked in a browser or in Studio)
Builds on [ADR 0012](0012-photography-as-a-seventh-focus.md), which added the
Photography Focus and left the gallery page for later.

## Context

Photography projects are finished photo sets: portraits of friends, street
moments, a personal hobby. They need a page that feels like a photographer's
portfolio: the photos lead, the text is quiet, and nothing is cropped. The case
study template is built around a story (problem, process, outcome) and does not
fit. The Showcase type has no page of its own and no ordered gallery.

## Decision

Add **Photo set** (`photo-set`) as a third project **Type**, beside Case Study
and Showcase.

- **Studio.** A new "Photos" tab holds the photos (image, required alt text,
  optional caption), an optional intro, location and gear. It shows only for
  the Photo set type. For a photo set the Story, Outcome and Legacy tabs are
  hidden, and so is every field inside them. Hidden fields are not validated,
  so none of their rules can block publishing a photo set.
- **Data.** The photo fields are read only on the detail page (not on the
  site-wide card list), so the homepage download does not grow. Each photo
  carries its width, height and dominant colour.
- **Route.** `/work/<slug>` renders the new `PhotoSetPage` for a photo set,
  with or without `?v=2`. While the project list is still loading the route
  shows a neutral placeholder, so a photo set never flashes the case study page.
  The page is lazy-loaded.
- **Layout is automatic, not chosen per photo.** The first photo is a
  full-width opener (the largest image, so the only one loaded eagerly). After
  that: a landscape or square photo gets a full-width row; two portraits in a
  row sit side by side; a lone portrait is centred and capped at about 85% of
  the screen height. Photos are never cropped.
- **Viewer.** Clicking a photo opens the existing image viewer for the whole
  set. As part of this the viewer, shared with case studies, gained an "n / m"
  counter and an optional caption under the image.
- **Cards and lists.** Photo sets appear on the Work page and in Featured Work
  like any project. They are not counted as case studies (Next/Previous) or as
  "Other Works" showcases, which still filter on their own Type.

## Consequences

- Quin sets the Type to Photo set and fills one tab; the page arranges itself.
  The trade-off is less control: a pair or a solo cannot be forced in Studio.
  If one set needs a different arrangement, reordering the photos is the lever.
- The Studio schema now has a conditional-visibility rule that every
  case-study field passes through. A new case-study field in the Story,
  Outcome or Legacy tabs is hidden for photo sets automatically.
- Case studies get the viewer improvements too (counter, captions).
- The Photo set page has no entrance animations, which keeps the first photo
  undelayed.

## Alternatives considered

- **Reuse the Showcase type.** Rejected: Showcase has no detail page of its
  own and no ordered, captioned gallery, so it would need the same new fields
  and page under a name that does not describe it.
- **A per-photo layout field in Studio** (full, half, pair, and so on).
  Rejected by Quin in favour of the automatic rule: less to fill in for every
  photo, and no way to build a broken-looking page.
- **Masonry (columns of uneven height) or a justified grid (rows of equal
  height).** Rejected: both squeeze photos into a shared grid, which shrinks
  them and loses the one-photo-at-a-time rhythm a photographer's portfolio
  relies on. They also make the reading order unclear and need more JavaScript
  to measure and rearrange.

## Addendum (2026-11-17): highlighted photos and recognition

Quin wants a few photos in a set to stand out, for example shots that were
submitted to a contest and recognised (a Top 20 Finalist for Mindanao in the
Fujifilm National Photo and Video Walk 2026).

- Each photo gets two optional Studio fields: **Highlight** (a toggle) and
  **Recognition** (a short line, only editable when Highlight is on).
- Highlighted photos are laid out **first**, large, under a small "Highlights"
  label, with the recognition line as a solid dark badge on the photo. They are
  **not repeated** in the rest of the set, which follows under "The full set".
  With no highlights the page is unchanged (no labels, the first photo opens
  the page).
- There is **no hard cap**: how many highlights suit a set depends on the set.
  Studio only warns when there are more than three.
- The full-screen viewer follows the order on the page (highlights first), and
  shows the recognition line above the caption.
- Only one photo on the page is the eager "opener": the first highlight, or the
  first photo when there are none.
- The badge is a solid colour, not a blur: a blur has to be redrawn while the
  page scrolls.

Alternative considered: showing the badge only, in the photo's original place
in the story. Rejected by Quin in favour of both a top row and a badge, so the
recognised photos are the first thing a visitor sees.
