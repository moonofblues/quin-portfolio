# Visual Experience — Plan

Working plan for [ADR 0014](adr/0014-visual-experience.md), written
2026-11-18. It replaces `docs/redesign-plan.md` as the plan for the site's
overall structure. Read the ADR first: it holds the decisions, and this file
holds the order of work.

**Status:** planned, nothing built yet.

## Summary

The site becomes one app with two Experiences:

- **Product** (UI/UX, Front-End, Web Dev, Low-Code): today's site and look,
  at `/` and `/work`.
- **Visual** (Video, Photography, Graphic Design): a new cinematic,
  image-first experience at `/visual`, with its own layout, fonts and
  colours.

Each step below is small, can be checked on its own, and can be undone
without touching the others. No step starts without Quin's go-ahead.

## Step 0 — Settle the in-progress photo-set work

The uncommitted changes in `PhotoGallery.jsx`, `PhotoSetPage.jsx`,
`queries.js` and `project.js` sit exactly where Steps 1 and 4 will work.
Finish and commit them (or park them on a branch) first, so the
restructuring doesn't get mixed up with unfinished features.

## Step 1 — Create `src/shared/` (no visible change)

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

## Step 2 — Record which Experience each Focus belongs to

- Add an `experience` value (`"product"` or `"visual"`) to each Focus in
  `src/data/services.js`.
- Add a small helper (in `shared`) that answers "which Experiences does this
  project belong to?" from its Focuses, and "which page is its main one?"
  from its Type.

Rule for the main page:

| Project Type | Main page |
| --- | --- |
| Case study | Product (`/work/<slug>`) |
| Photo set | Visual (`/visual/<slug>`) |
| Showcase with only Visual Focuses | Visual |
| Showcase with any Product Focus | Product |

No visible change yet.

## Step 3 — Visual shell (empty but real)

- `src/experiences/visual/`: `VisualLayout`, its own navigation and footer,
  and a theme wrapper that overrides the colour and font variables.
- Visual's fonts are added by the Visual Layout when it mounts, not in
  `index.html` (ADR 0014, point 3).
- Lazy-loaded route `/visual/*` in `App.jsx`, outside the Product
  `Layout`, so the fireflies, cursor and Lenis don't load there.
- A placeholder `/visual` index page.
- Cross-links: "Visual" in the Product nav, a link back in the Visual nav and
  footer, and the same name lockup on both.

**Before this step: Visual needs a design direction** (see "Inputs needed"
below). The shell can be built with placeholder styles, but it shouldn't be
designed by guesswork.

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

- Remove the Focus chooser (`FocusChooser.jsx` and its use in
  `HomePage.jsx`). `?focus=` links keep working, and so do the What I Do
  pills.
- Keep the existing `Introduction` section. It is already person-first
  (checked 2026-11-18), so it is not rewritten. Add one line under its
  ZCMC and Ateneo line that points into Visual, in Quin's voice (draft,
  wording to confirm): "Away from the screen, I'm usually behind a camera
  — portraits, street moments, and the occasional video edit. See the
  visual work →". The link needs `/visual` to exist, so this waits for
  Step 3.
- In `About`, add photography to the last paragraph ("When I'm not designing
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

1. **Visual's design direction:** mood, references, colours, fonts. This is
   needed before Step 3's styling. It could be worked out with a design
   session (for example the `frontend-design` or `impeccable` skill).
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
