# Blue redesign plan

Decided 2026-11-19 in a grilling session. Decision record:
[ADR 0019](adr/0019-one-brand-blue.md), changed on 2026-11-19 by
[ADR 0021](adr/0021-shared-theme-and-brand-blue-values.md) (the blue values, the
shared theme, photo sets following it). Phases 1 to 4 are built, and phase 5 is
partly built (status per phase below). Each phase needs Quin's go-ahead before
it starts, and builds and tests run only when he says so, one at a time.

## Decisions

| Topic | Decision |
|---|---|
| Acid yellow | Dropped |
| Brand and marker colour | Blue, one value per ground (ADR 0021): `#1a3ed6` on paper and `#3355e6` on night, with cream labels on shapes. Small blue text on night stays `#6384ff` (was `#6384ff` and `#0B2FB3` in ADR 0019) |
| Product (/dev) | Lavender to blue, mint to paper cream (small). Keeps Krona One and the night sky. Shapes use `#3355e6` with cream labels, text stays `#6384ff`. Dark only until phase 7 |
| Visual | Keeps Bricolage, Instrument Serif and paper. Gets the edge layer in its own language. Has its own dark mode on its own night `#050818` |
| Dark/light | One site-wide setting (`src/shared/siteTheme.js`), remembered, dark by default, shared by the hub, Visual and later Product. Only film pages go dark on their own, and hide the toggle. Photo sets and graphic design follow the theme. Product gets a light version in phase 7 |
| Marks | Spread by job, never decoration |
| `/sheet` | Its hero replaces `/`. `/sheet` redirects to `/` |
| Motion | One signature scene per portfolio plus a shared "develop into view" rule, as phase 5. CSS only, no added scroll depth ([ADR 0020](adr/0020-scroll-driven-motion.md)) |
| Copy voice | First person, plain, a little dry, one human line per section |
| Delivery | Phases, each its own commit, each approved before the next |

## What each mark is for

| Mark | Its one job |
|---|---|
| Marker block | Highlights the one key phrase in a section (at most one) |
| Tape | Labels a real thing: a pick, a screenshot's name, a project's real status |
| Crop brackets | Frame an image or screenshot |
| Frame number | Numbers items in a real collection (projects, shots) |
| Readout | Live counts, on the hero only |

## Phases

1. **Blue foundation (done).** Replace the acid yellow, lavender and mint tokens with
   the brand blue and paper cream. Lavender also lives in the moon, stars and
   card borders (`src/index.css`), not only the accent token. Hub tokens are in
   `src/hub/hub.css`.
2. **Hub (done).** Make the sheet hero the hub hero, remove the old hero and the
   `variant` prop, redirect `/sheet` to `/`.
3. **Edge by job (built, awaiting tests).** Add marks to Product and hub sections (list below).
4. **Visual edge (done).** Marker as blue ink block, masking tape, frame numbers, crop
   brackets, extending the existing printer's marks in `visual.css`.
   **Round of fixes after seeing it built (done, ADR 0021, on `dev`).** Blue values
   and the light-mode name, hub portfolio-row hover, the shared theme and a
   Visual toggle, photo sets and graphic pages following the theme, Visual dark
   mode, Visual image sizes, and the loader text. Details are in the ADR and in
   `docs/handoff-2026-11-19.md`.
5. **Motion (in progress: hub develop, Product sweep and the darkroom loader built)** ([ADR 0020](adr/0020-scroll-driven-motion.md)). One signature
   scene per portfolio and one shared rule:
   - Hub: develop on arrival (about 2 seconds, no extra scrolling). The darkroom
     loader (about 2.2 seconds, any key skips) is built and seen.
   - Product: inspector sweep on arrival (tape and brackets only on phones).
   - Visual: scroll-driven lights down on film pages (photo sets now follow the
     theme instead, ADR 0021).
   - Everywhere else: things develop into view.
   Remaining slices wait for phase 7, so each scene is built once for both modes.
7. **Site-wide light/dark and a light /dev. Next.** Moved ahead of the rest of
   phase 5 and phase 6 (ADR 0021). The shared theme and its store already exist
   (`src/shared/siteTheme.js`); what is left is a designed light Product and a
   toggle on /dev. Needs its own design pass first: the fireflies, moon and night
   sky need a light treatment. The light blue for Product shapes is `#1a3ed6`.
6. **Copy pass (after the Motion slices).** Draft first-person copy for approval. Real details come from
   Quin. No em dashes, no buzzwords, no invented claims.

Order from here: phase 7, then the remaining phase 5 slices, then phase 6.

## Per-section marks (draft, to confirm)

Currently only the Product hero, Work cards, case study opening, section numerals
and the hub sheet hero carry marks.

| Section | Marks it would get |
|---|---|
| Introduction | Marker on one phrase |
| What I Do (Services) | Tape on real labels |
| Featured Work | Frame numbers, crop brackets, tape on picks |
| Now | Tape with the real date or status |
| About | Marker on one phrase, crop brackets on the portrait |
| Other Work | Frame numbers |
| Testimonials | None unless the testimonials are real (see below) |
| Contact | Marker on the call to action |
| Case study sections | Crop brackets on media, tape on screenshot names |
| Visual pieces | Frame numbers, crop brackets, tape |

## Open items

- Confirm the per-section list above.
- Copy that lives in Sanity cannot be changed from code. List the fields for
  Quin to rewrite before phase 6.
- Design the light-mode night sky (for example blue ink specks on paper) before
  phase 7.
- Decide how Product's inspector sweep reuses Inspect mode's code, and what the
  phone fallback shows.
- Testimonials must be real, or the section stays out.
- Dark/light is stored in the browser under the key `hub-theme` and read through
  `src/shared/siteTheme.js`. Dark is the default, which also makes Visual open
  dark for a first-time visitor.
- Phase 7 changes ADR 0005 (dark-only Product). Update that ADR's status when
  it ships.
- Not yet checked after ADR 0021: phone and tablet widths, a film page (none is
  published, so it could not be tested), /dev's sky, moon and fireflies against
  the deeper blue, keyboard focus on the hub rows, and the build and tests.

## Rules for every phase

- Plan and get approval before coding.
- No AI attribution in commit messages.
- No builds or tests without checking first, and one at a time.
- Do not add to the existing lint count. `CLAUDE.md` says 28 problems, and the
  handoff measured 14 (13 errors, 1 warning) on 2026-11-19. Recheck before
  relying on either number.
