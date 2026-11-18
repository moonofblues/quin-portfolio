# Visual Experience — Plan

Working plan for [ADR 0014](adr/0014-visual-experience.md), written
2026-11-18. It replaces `docs/redesign-plan.md` as the plan for the site's
overall structure. Read the ADR first: it holds the decisions, and this file
holds the order of work.

**Status (2026-11-18):** Steps 0, 1 and 2 are done. The design direction is
agreed and written up in [`visual-design-direction.md`](visual-design-direction.md),
with a browser prototype in `reference/visual-direction/prototype.html`.
Step 3 is unblocked.

## Summary

The site becomes one app with two Experiences:

- **Product** (UI/UX, Front-End, Web Dev, Low-Code): today's site and look,
  at `/` and `/work`.
- **Visual** (Video, Photography, Graphic Design): a new cinematic,
  image-first experience at `/visual`, with its own layout, fonts and
  colours.

Each step below is small, can be checked on its own, and can be undone
without touching the others. No step starts without Quin's go-ahead.

## Step 0 — Settle the in-progress photo-set work — ✅ DONE (2026-11-18)

Committed as "Add embed and link button to photo sets" plus the Fujifilm
paste sheet. The build passed; the feature itself has not been checked in a
browser or Studio.

The uncommitted changes in `PhotoGallery.jsx`, `PhotoSetPage.jsx`,
`queries.js` and `project.js` sit exactly where Steps 1 and 4 will work.
Finish and commit them (or park them on a branch) first, so the
restructuring doesn't get mixed up with unfinished features.

## Step 1 — Create `src/shared/` (no visible change) — ✅ DONE (2026-11-18)

Moved with `git mv` (history kept): `src/shared/sanity/` (client, queries),
`src/shared/context/` (ProjectsContext, useProjectDetail) and
`src/shared/image-viewer/` (LightboxShell, ImageLightbox). 13 imports updated.
The build output is identical: every chunk has the same size and hash, so the
homepage critical set is unchanged (about 731 KB raw / 232 KB gzipped).

Move the code both Experiences will need into one shared folder. The site
must look and behave exactly as before.

- Move: `src/sanity/client.js`, `src/sanity/queries.js`,
  `src/context/ProjectsContext.jsx`, `src/context/useProjectDetail.js`.
- Move the image viewer (`LightboxShell.jsx`, `ImageLightbox.jsx`), which
  case studies and photo sets both use.
- Leave the Sanity **schema** and `sanity.config.js` where they are. They
  belong to the Studio, not to either Experience.
- Update imports. No logic changes.

**Check:** `npm run build`. The homepage critical set should be unchanged
(about 730 KB raw / 232 KB gzipped). Click through the homepage, Work page,
a case study and a photo set.

## Step 2 — Record which Experience each Focus belongs to — ✅ DONE (2026-11-18)

Built as `src/shared/experiences.js`. Changed from the first draft of this
plan: the Focus-to-Experience map lives in `shared`, not inside
`src/data/services.js`. That file is Product's data (hero copy, icons), and a
shared helper reading from it would make `shared` depend on Product, which
breaks the import rule. Adding a new Focus now means adding it in both
`services.js` and `experiences.js`.

- A map of every Focus to `"product"` or `"visual"`.
- Helpers: `focusIdsOf(project)`, `experiencesOf(project)` (which
  Experiences it belongs to) and `mainExperienceOf(project)` (which page is
  its main one, by Type).
- Checked with a throwaway Node script against seven cases (photo set, case
  study, Showcase with only Visual Focuses, with both, with none, and so on).
  The script was deleted afterwards; there is no test suite in the project.

Rule for the main page:

| Project Type | Main page |
| --- | --- |
| Case study | Product (`/work/<slug>`) |
| Photo set | Visual (`/visual/<slug>`) |
| Showcase with only Visual Focuses | Visual |
| Showcase with any Product Focus | Product |

No visible change yet.

## Step 3 — Visual shell (empty but real) — ✅ DONE (2026-11-18)

Built in `src/experiences/visual/` (`VisualApp`, `VisualLayout`, `VisualHome`,
`Frame`, `helpers.js`, `visual.css`) and mounted as a lazy `/visual/*` route in
`App.jsx`, outside the Product `Layout`. A "Visual" link was added to the
Product nav. It is fed by real Sanity projects, with no placeholders: a project
shows when `mainExperienceOf(project)` is Visual and it has a thumbnail. Groups
with no work are not drawn.

Checked in a browser against real data (desktop and a 390px frame): hero,
ticker, index, hover "develop", About slate, credits, `#hash` links, and the
round trip Product <-> Visual (Visual's fonts, paper background and stylesheet
are only active on `/visual`). The build passes; the Visual chunk is 8.6 KB JS
plus 9.2 KB CSS, and the homepage critical set is about 729 KB raw / 232 KB
gzipped. Lint is clean for the new files.

Choices made on the way, easy to change:

- **Touch screens** show true colour straight away (no hover to develop it).
  This is the default for the open question in the design doc.
- **Graphic design shows at most 8 pieces** (`GRAPHIC_LIMIT` in `helpers.js`),
  featured first, with an "all N" link to the Work page. Curate by tagging
  Categories in Studio.
- **The tint is a live CSS blend for now.** The design doc says to bake it into
  the image files; that is a follow-up once real photos exist.
- **Frames link to `/work/<slug>`** for now. `projectPath()` in `helpers.js` is
  the one place to change when step 4 moves photo sets to `/visual/<slug>`.
- Today only graphic design appears. The photo set has no photos and there is
  no film yet.

Testing note: Sanity only answers requests from approved web addresses.
`localhost:5173` works; an unusual port (we tried 5199) gets a network error.

- `src/experiences/visual/`: `VisualLayout`, its own navigation and footer,
  and a theme wrapper that overrides the colour and font variables.
- Visual's fonts are added by the Visual Layout when it mounts, not in
  `index.html` (ADR 0014, point 3).
- Lazy-loaded route `/visual/*` in `App.jsx`, outside the Product
  `Layout`, so the fireflies, cursor and Lenis don't load there.
- A placeholder `/visual` index page.
- Cross-links: "Visual" in the Product nav, a link back in the Visual nav and
  footer, and the same name lockup on both.

**Design direction: agreed** (2026-11-18). Build the shell from
[`visual-design-direction.md`](visual-design-direction.md): paper and
cyanotype-ink tokens, the three type families, the slim top bar, the ticker
band, and the "lights down" detail layer. The prototype shows the intended
result.

**Check:** build. The homepage critical set must not grow. The Visual chunk
should load only on `/visual`.

## Step 4 — Move photo sets into Visual

- Photo set pages render at `/visual/<slug>` inside the Visual Layout.
- `PhotoSetPage` stops importing from the case-study code (`PAGE_WIDTH`,
  `Button`). Visual gets its own equivalents.
- `/work/<slug>` for a photo set redirects to `/visual/<slug>` (using
  `replace`, so the Back button doesn't bounce).
- Cards for photo sets, wherever they appear, link to the new address.
- Restyle the gallery to Visual's look.

**Check:** old photo-set links land on the new page. The Next set link still
works. The image viewer still opens.

## Step 5 — Visual index at `/visual`

- An index of Visual work, grouped as Film, Photo and Graphic design.
- Graphic design pieces (Showcases) shown in Visual's style.

## Step 6 — Video page

- Needs its own short ADR first: is video a new project Type (like photo
  sets) or a Showcase shown differently? What does a film page look like
  (full-bleed player, credits, stills)?
- Then build it inside `src/experiences/visual/`.

## Step 7 — Homepage changes (Product)

Partly done early (2026-11-18), since these parts don't depend on Visual's
design: the Focus chooser is removed (file deleted, `HomePage.jsx` and two
comments updated) and About now mentions the camera. Still waiting: the
Introduction line and the homepage invitation section, which need `/visual`
to exist.

- ✅ Remove the Focus chooser (`FocusChooser.jsx` and its use in
  `HomePage.jsx`). `?focus=` links keep working, and so do the What I Do
  pills.
- Keep the existing `Introduction` section. It is already person-first
  (checked 2026-11-18), so it is not rewritten. Add one line under its
  ZCMC and Ateneo line that points into Visual, in Quin's voice (draft,
  wording to confirm): "Away from the screen, I'm usually behind a camera
  — portraits, street moments, and the occasional video edit. See the
  visual work →". The link needs `/visual` to exist, so this waits for
  Step 3.
- ✅ In `About`, add photography to the last paragraph ("When I'm not designing
  or coding, you might find me teaching the next generation of developers,
  behind a camera, exploring motion graphics, or occasionally hitting the
  dance floor.").
- Add one homepage section inviting visitors into Visual.

**Check:** build. The homepage critical set should shrink slightly, since the
chooser was in the entry chunk.

## Step 8 — Work page becomes Product's work list

- The Work page tabs show Product Focuses.
- Visual work is reached through `/visual`, with a clear link from the Work
  page.
- A graphic design piece tagged with a Product Focus as well still shows
  here.

## Step 9 — Docs and clean-up

- Update `CLAUDE.md` (Conventions: the two Experiences and the import rule).
- Update `docs/glossary.md` where terms changed.
- Mark ADR 0014 as implemented.
- Re-measure the homepage critical set and record it in `CLAUDE.md`.

## Inputs needed from Quin

1. ✅ **Visual's design direction:** done, see
   `visual-design-direction.md`. Its "Open items" list what is still needed
   (real photos, a first film, touch behaviour, contact details).
2. **Confirm the Visual line** for the Introduction (Step 7). The draft says
   "the occasional video edit", which may undersell the film work.
3. **Video work:** which pieces, and where the files live (YouTube, Vimeo,
   Sanity). Needed for Step 6.
4. **Which graphic design pieces** should also appear on the Product Work
   page (done by tagging Categories in Studio).

## Not in this plan

- Subdomains or a bought domain (see the ADR's "When to move Visual to its
  own subdomain").
- A QA Focus (Quin's decision, 2026-11-18: maybe later).
- Moving Product code into `src/experiences/product/`.
