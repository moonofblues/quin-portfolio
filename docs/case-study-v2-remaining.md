# Case study v2: what is left after the UI/UX audit

Written so the work can continue on another computer. Context: an audit of
`/work/<slug>?v=2` (the v2 case study page) found 8 issues. Issues 1 to 8 are
done (two commits on `main`: "Reorder case study v2 for skimmers…" and the
one after it). This file lists what was deliberately left, what was not
checked, and decisions that are easy to revisit.

Audit score at the start: 23/36 on Nielsen's heuristics (Acceptable).
Re-run `/impeccable critique` on `src/pages/CaseStudyPageV2.jsx` to see the new
score.

## Not done yet

- [ ] **Skip-to-content link.** There is none on the site. Keyboard users tab
      through the whole nav first. Belongs in the layout, not the case study.
- [ ] **Next-case thumbnail has no `width`/`height`** (`v2/NextCaseStudy.jsx`).
      The card data only has a URL, so the query needs to return dimensions.
      Same gap in `v2/SolutionGlance.jsx` card images.
- [ ] **Glance cards can still orphan.** Five cards wrap 4 + 1 in
      `SolutionGlance`. `CardGrid` already lays five out as 3 + 2; the glance
      grid does not.
- [ ] **Chapter bar highlight can lag** after a sudden jump in scroll position
      (for example an instant scroll). It uses IntersectionObserver on a thin
      band, so a jump that skips past a chapter start never fires. Normal
      scrolling is fine. Fix idea: also recompute on `scroll` (passive, rAF).
- [ ] **Phone chapter bar sits ~1,090px down.** The title, overview and details
      card above it are long. Shortening the phone hero would help.
- [ ] **Em dashes in user-visible strings** (antislop rule R-02): the page
      `<title>` and og:title in `CaseStudyPageV2.jsx`, the alt text in
      `HeroCollage.jsx` (`screen N`), and a few aria-labels/alts in
      `ShowcaseSection.jsx`. None are in body copy.
- [ ] **Process icons.** Three of four ERP steps fall back to the same compass
      icon (`ProcessTimeline.jsx`), so the icons read as decoration. Either map
      real icons per step in Studio or drop icons.
- [ ] **`ProcessTimeline` uses framer `useScroll`** for its connecting line,
      which is JS tied to scroll. Could be a CSS scroll-driven animation.
- [ ] **Invisible shadow.** `shadow-xl` on media frames is not visible on the
      near-black background (`MediaBlock.jsx`). Use a lighter edge or a border
      instead.
- [ ] **Lightbox extras.** Neither viewer shows a caption or an "n of m"
      counter.
- [ ] **Remaining eyebrow labels.** I only removed the ones that repeat their
      heading ("Design Showcase", the hero focus label when a tag says the
      same). Left on purpose: chapter-name labels in `SectionShell`, "Decision
      01", "Outcome & Status", "Reflection", "Next case study". Revisit if the
      page still feels uniform.

## Content questions (not code)

- A callout on the ERP page says the design "hasn't been validated in use",
  while the outcome claims a "60% reduction in task time". A sceptical reader
  will notice. Check the wording in Sanity.
- The ERP page shows blurred before/after. With those blurred, what is the one
  piece of evidence a reader can verify, and is it high on the page?
- Showcase frames plus a Behance embed can show the same work twice. Decide
  whether to hide the embed when frames exist.
- Six of the seven case studies still render through the legacy adapter
  (`v2/toSections.js`). Only the ERP one has real v2 `sections` in Sanity.

## Decisions made (easy to change)

- **Blur strength is 40** (`BLUR_STRENGTH` in `src/sanity/queries.js`). I
  chose it by eye on a 1685px spreadsheet: at 25 large column headers were
  still guessable, at 40 nothing was readable but the table grid, header band
  and checkboxes still showed. Original files stay in Sanity.
- **Muted text colour is `#80858f`** (was `#5f646e`, 3.2:1). It is site-wide
  (`--color-text-muted` in `src/index.css`): about 5.1:1 on cards and 4.7:1 on
  tags.
- **A process section is always its own chapter** ("Process") in
  `planSections` in `CaseStudyPageV2.jsx`. A chapter label set in Studio wins.
- **Outcome comes first in the last chapter**, then Reflection, then the
  "finished work" gallery and embeds.
- **Image viewer animation:** fade + 0.97 to 1 scale in, 160ms exit. CSS in
  `index.css` (`.lightbox-*`), frame in `v2/blocks/LightboxShell.jsx`.

## Not verified

- The changes in the last round (viewer, Constraints, chapter bar) were only
  looked at on a desktop-width window. **Check at phone width**, especially the
  phone chapter menu (Esc / tap outside to close) and the Constraints row.
- `npm run lint` was only run on the files I touched (clean). The whole-project
  error count was not compared before and after (CLAUDE.md notes ~30
  pre-existing errors).
- No full manual click-through of every control.

## Reports that were not saved

The audit asked to archive its report to `.impeccable/critique/` and
`anti-slop/`. Nothing was written there. The findings are summarised above;
re-running `/impeccable critique` regenerates it.

## Uncommitted on the original computer

`CLAUDE.md` has unrelated edits that were left out of these commits.
