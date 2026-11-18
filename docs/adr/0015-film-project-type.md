# 0015: Film as a fourth project Type

Date: 2026-11-18
Status: Accepted (implemented; checked in a browser with sample data, not yet
with a real film)
Builds on [ADR 0014](0014-visual-experience.md), which put film in the Visual
experience, and on [ADR 0013](0013-photo-set-project-type.md), which set the
pattern of a Type with its own Studio tab and page.

## Context

Quin has film work but nothing for it in the site. Video had a Focus (Video
Editing) and could only be shown as a Showcase with embeds, which has no page
of its own, no player and no credits. Plan step 6 needed a decision: is a film
a new Type, or a Showcase shown differently?

Facts that shaped it:

- Videos will be on YouTube.
- Performance rules (`CLAUDE.md`): a YouTube iframe downloads a lot of script,
  so six films must not mean six players loading with the page.
- A film page needs things a Showcase does not carry: a video, a runtime,
  credits, stills.

## Decision

Add **Film** (`film`) as a fourth project **Type**, beside Case Study,
Showcase and Photo set.

- **Studio.** A new "Film" tab holds: the YouTube link (required, validated as
  a YouTube address), runtime, synopsis, gear, credits (role and name) and
  stills (image, required alt text, optional caption). The tab shows only for
  the Film type. As with photo sets, the Story, Outcome and Legacy tabs are
  hidden for films, so none of their rules can block publishing. A film also
  **requires a thumbnail**: it is the poster before the video plays and the
  film's frame in the Visual index. Year, Role and Client come from the usual
  Card & meta tab.
- **Page.** `/visual/<slug>` renders `VisualFilm` with the lights down (the
  page asks the layout for it with `useNight()`): the poster, then the video,
  a row of stills that open in the shared viewer, and a credits block, with a
  "next film" link.
- **The video loads only on click.** Until then the page is the poster and a
  play button, with no iframe. Clicking creates the player, using
  `youtube-nocookie.com`, and starts playing. If the link has no usable video
  id the page falls back to a plain "Watch on YouTube" link.
- **Routing.** A film's main Experience is Visual. `/work/<slug>` for a film
  redirects to `/visual/<slug>` (films have no Product page). The Visual index
  puts films in the "film" group, and a project tagged with the Video Focus
  also lands there.
- **Data.** The film fields are read only on the detail page, not in the
  site-wide card list.

## Consequences

- Adding a film is: choose Type Film, tag a Video Category, set a thumbnail,
  paste the YouTube link. The page arranges itself.
- Existing Video Showcases are unaffected. They stay Showcases, with their own
  Visual graphic page if their Focuses are Visual only. They can be converted
  to Film by changing their Type and filling the Film tab.
- A new Type means one more branch in `App.jsx` (redirect), `VisualWork`
  (page choice), `experiences.js` (main Experience) and `helpers.js` (index
  group). There is still no shared "project type registry"; if a fifth Type
  appears, that is worth building.
- Only YouTube is supported. Vimeo or self-hosted video would need a second
  player component.
- The film page was tested with sample data (a real open-licence YouTube
  video and real Sanity images), because no film was published yet. The first
  real film is the real test.

## Alternatives considered

- **Treat video as a Showcase with an embed.** Rejected: no player control, no
  credits or stills, and an embedded iframe loads on page load, against the
  performance rules.
- **A custom embed inside the existing Embeds field.** Rejected for the same
  reasons; also it does not give a film its own page.
- **Self-host the video in Sanity.** Rejected: large files, bandwidth cost on
  the free tier, and no adaptive streaming.
- **Load the YouTube iframe on page load but lazily (`loading="lazy"`).**
  Rejected: it still pulls the player scripts when scrolled near, and a
  poster-and-click player is cheaper and looks better.
