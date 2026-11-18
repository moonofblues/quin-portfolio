# 0014 — Two experiences in one site: Product and Visual

Date: 2026-11-18
Status: Accepted (plan stage: documents intent; not yet implemented)
Amends [ADR 0008](0008-focus-chooser-and-service-taxonomy.md): the Focus
chooser pop-up is removed. The build plan is in
[`docs/visual-experience-plan.md`](../visual-experience-plan.md).

## Context

Quin's work falls into two very different kinds:

- **Product work**: UI/UX, front-end, web development, low-code. Quin has a
  lot of it, and most projects **overlap** (one project is often designed,
  built and tested by Quin). It is read by hiring managers and product teams,
  who judge it by reading the story: problem, process, decisions, outcome.
- **Visual work**: film/video, photography, and graphic design (about 10
  pieces). Quin has a lot of film and photo work. It is judged by **looking**:
  big images, full-bleed video, quiet text. It is also aimed at a different
  audience (clients, collaborators, creative teams).

Today both live in one design: the dark night-sky theme (ADR 0005, 0010),
one set of fonts, one Layout with fireflies and a custom cursor. Photo sets
already got their own page (ADR 0013), but they still wear the product
site's look.

Quin wants each kind of work to feel like a deliberately designed
experience, not a category inside one generic site. Several shapes were
considered (see Alternatives), including a personal hub plus about five
separate portfolios on subdomains.

Fixed facts shaping the decision:

- The site stays on `*.vercel.app` for now. Subdomains like
  `film.quinledesma.com` need a bought domain, so they are not available yet.
- The project content model already supports this: a project's Focuses are
  derived from its Categories (ADR 0009), and a project can sit under several
  Focuses. No Sanity restructuring is needed for the split itself.
- `CLAUDE.md` puts the hiring manager first ("minimize UI friction") and
  forbids anything heavy in the homepage's critical set.
- `/studio` is already the Sanity editor's address.

## Decision

The site becomes **one app with two Experiences**, each with its own look,
layout and atmosphere.

**1. Two Experiences, grouped by Focus**

| Experience | Focuses | Address | Look |
| --- | --- | --- | --- |
| **Product** | UI/UX, Front-End, Web Dev, Low-Code | `/`, `/work`, `/work/<slug>` | Today's night-sky design, kept |
| **Visual** | Video, Photography, Graphic Design | `/visual`, `/visual/<slug>` | New: cinematic, image-first, its own fonts and colours |

- Each Focus belongs to exactly one Experience. This is recorded next to the
  Focus in `src/data/services.js`, the existing single source of truth.
- A project can still appear in both. A strong graphic design piece can be
  shown in Visual and also on the product Work page as evidence of visual
  skill. Nothing is duplicated in Sanity.
- QA is **not** added as a Focus for now (Quin's decision, 2026-11-18). It
  can be added to Product later.

**2. Independence rules (so Visual can move to a subdomain later)**

- Visual lives in its own folder, `src/experiences/visual/`, with its own
  Layout, navigation, footer and theme.
- Code both Experiences need (Sanity client and queries, project data
  context, the image viewer, the name lockup, the cross-link) moves into
  `src/shared/`.
- **The Experiences never import from each other, only from `src/shared/`.**
  This rule is what keeps them independent. It also means moving Visual to
  `film.quinledesma.com` later would mean moving one folder plus the shared
  one, not a rewrite.
- Product code stays where it is today (`src/components/`, `src/pages/`) for
  now. Moving it into `src/experiences/product/` only becomes worth it if the
  site is ever split into separate deployments.

**3. Separate looks**

- Visual's colours and fonts are set by overriding the theme's CSS variables
  under a Visual-only wrapper. Product's `@theme` values are unchanged.
- The fireflies, custom cursor and Lenis smooth scroll stay Product-only. The
  Visual Layout chooses its own atmosphere.
- **Visual's fonts load only when a Visual page opens** (added from the
  Visual Layout), not in `index.html`. Product visitors download nothing
  extra. The cost is a brief fallback font on the first Visual page. This is
  a trade-off that can be reversed by moving the `<link>` into `index.html`
  if the fallback bothers Quin.
- The whole Visual Experience is lazy-loaded from `App.jsx`, like the other
  routes, so the homepage critical set does not grow.

**4. Homepage and moving between Experiences**

- The homepage stays the **front door**, and stays the Product Experience.
  Hiring managers land on the strongest professional work with no extra step.
- The **Focus chooser pop-up is removed.** It asks visitors to choose a
  discipline before they see anything, which is the kind of selection screen
  Quin no longer wants. `?focus=<id>` links keep working, so a tailored link
  can still be sent to a recruiter. The What I Do pills and the Work page
  filter still narrow by Focus.
- The homepage's existing Introduction section is reshaped to be
  person-first: a short line about who Quin is, before the work.
- Visitors move between Experiences through a **Visual** link in the Product
  navigation, one inviting section on the homepage, and a matching link back
  in the Visual navigation and footer. The name lockup is the same on both.

**5. Old links keep working**

- A photo set currently lives at `/work/<slug>`. After the move, that address
  redirects to `/visual/<slug>`, so links already shared do not break.

## Consequences

- **Visual can be designed freely** without risking the hiring-manager
  experience, and without its heavy images and video reaching the homepage.
- **One codebase, one deploy, one Sanity setup.** Maintenance is roughly one
  site plus a second layout and theme, not two sites.
- **The shared folder must stay small.** Anything put there ties the two
  Experiences together. The default is: if only one Experience uses it, it
  does not belong in `shared`.
- **The Focus chooser and its `localStorage` "seen" flag go away.** ADR
  0008's Focused view (hero copy and Featured Work per Focus) stays, reached
  through `?focus=` links and the What I Do pills.
- **Video needs a page of its own.** Today video is shown as a Showcase with
  embeds. A proper video page is a separate decision (its own ADR) inside the
  Visual build.
- **The Work page changes meaning.** It becomes Product's work list. Visual
  work gets its own index at `/visual`. Exactly which graphic design pieces
  also appear on the Work page is decided per project by its Categories.
- **SEO is two sections of one site, not two sites.** Visitors mostly arrive
  by direct link (resume, LinkedIn, email), so this matters less than keeping
  links stable.

## When to move Visual to its own subdomain

Not now. Revisit when all of these are true:

1. Quin has bought a domain (for example `quinledesma.com`).
2. Visual's needs (tooling, assets, build settings) start to conflict with
   Product's.
3. The independence rule above has been kept, so the move is mechanical.

At that point the apex domain would stay Product (or a person-first hub), and
`film.` (or `visual.`) would serve this folder as a separate Vercel project.

## Alternatives considered

- **A personal hub plus about five portfolios on subdomains** (design, dev,
  QA, film, graphic). Rejected for now: UI/UX, dev and QA share one audience
  and overlapping projects, so splitting them makes a hiring manager visit
  several sites to see one person. It would mean about six sites for one
  person to maintain, and needs a bought domain. Kept as the long-term
  direction for Visual only.
- **Keep one design for everything** and just improve structure. Rejected:
  film, photo and graphic work is judged by looking, and a case-study design
  squeezes it.
- **Separate experiences for UI/UX, dev and QA.** Rejected: most of these
  projects overlap, and showing them whole proves Quin can carry a product
  from design to tested code. Different emphasis per Focus is enough.
- **A separate Visual site on its own `vercel.app` name right away.**
  Rejected: without a shared domain it would look like an unrelated website,
  and it doubles deployment and Sanity wiring.
- **Name the Experience "Studio".** Rejected: `/studio` is the Sanity editor.
- **Keep the Focus chooser.** Rejected: it is a selection screen before any
  work is shown, which Quin no longer wants.
