# Blue redesign plan

Decided 2026-11-19 in a grilling session. Decision record:
[ADR 0019](adr/0019-one-brand-blue.md). Nothing here is built yet. Each phase
needs Quin's go-ahead before it starts, and builds and tests run only when he
says so, one at a time.

## Decisions

| Topic | Decision |
|---|---|
| Acid yellow | Dropped |
| Brand and marker colour | Blue: `#6384ff` on dark, `#0B2FB3` on paper |
| Product (/dev) | Lavender to blue, mint to paper cream (small). Keeps Krona One and the night sky |
| Visual | Keeps Bricolage, Instrument Serif and paper. Gets the edge layer in its own language |
| Dark/light | One site-wide switch, remembered, dark by default. Film and photo pages keep lights-down. Product gets a light version |
| Marks | Spread by job, never decoration |
| `/sheet` | Its hero replaces `/`. `/sheet` redirects to `/` |
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
2. **Hub (built, awaiting review and tests).** Make the sheet hero the hub hero, remove the old hero and the
   `variant` prop, redirect `/sheet` to `/`.
3. **Edge by job.** Add marks to Product and hub sections (list below).
4. **Visual edge.** Marker as blue ink block, masking tape, frame numbers, crop
   brackets, extending the existing printer's marks in `visual.css`.
5. **Copy pass.** Draft first-person copy for approval. Real details come from
   Quin. No em dashes, no buzzwords, no invented claims.
6. **Site-wide light/dark and a light /dev.** Biggest job, so last. Needs its own
   design pass first: the fireflies, moon and night sky need a light treatment.

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
  Quin to rewrite before phase 5.
- Design the light-mode night sky (for example blue ink specks on paper) before
  phase 6.
- Testimonials must be real, or the section stays out.
- Check which look Quin sees today: dark/light is stored in the browser as
  `hub-theme` (`src/hub/HubPage.jsx`). Dark is the default.
- Phase 6 changes ADR 0005 (dark-only Product). Update that ADR's status when
  it ships.

## Rules for every phase

- Plan and get approval before coding.
- No AI attribution in commit messages.
- No builds or tests without checking first, and one at a time.
- Do not add to the existing lint count (28 problems before this work).
