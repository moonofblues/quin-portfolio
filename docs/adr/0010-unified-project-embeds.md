# 0010 — Unified, typed project embeds (Behance/Facebook/custom)

Date: 2026-09-18
Status: Accepted.

## Context

The `project` schema had accumulated three separate, inconsistent ways to
attach off-site content to a case study or showcase:

1. `embeds[]` — a repeatable `{title, embedCode}` field: paste a raw
   `<iframe>` snippet, rendered via `dangerouslySetInnerHTML` in
   `ProjectEmbeds.jsx`. Live-checked against the production dataset: **zero
   documents ever populated it.**
2. `behanceUrl` — a plain URL, rendered only as a "View on Behance" outbound
   button in the hero meta card. Never embedded inline. Populated on 4
   documents.
3. `fbPostUrl` — a plain URL, rendered only on the **showcase** page branch
   as a hardcoded `facebook.com/plugins/post.php` iframe. Case studies fetch
   this field but never render it — dead code on that branch. Populated on 7
   documents.

Quin asked for an optional, embeddable field covering Facebook posts and
Behance projects, with Behance embeds expandable to full viewport width like
Behance's own site. Rather than add a fourth mechanism, this was scoped as a
consolidation of the three above.

**Constraint discovered during design:** Behance's official embed is a
cross-origin iframe (`behance.net/embed/project/<id>`). There is no
postMessage API published for it, so a click on a specific photo *inside*
that iframe cannot be observed or intercepted by this site. "Expand like
Behance's site" is therefore implemented as: the whole embed card is wrapped
in our own click-to-expand control, which grows the card's container to full
viewport width in place — not a re-implementation of Behance's internal
lightbox.

## Decision

**One schema field, three platforms.** `project.embeds` stays an array, but
each item is now `{platform: "behance" | "facebook" | "custom", url, title?,
embedCode?}`. `platform` picks which inputs Studio shows (`url` for
behance/facebook, `embedCode` for custom) via conditional `hidden`. This
covers "etc." — a platform with no dedicated renderer yet just uses
`custom` with a pasted iframe, same as the old `embeds[]` behavior.

**`behanceUrl` is subsumed, not kept alongside.** The hero's "View on
Behance" button now derives its `href` from the first `embeds` entry with
`platform === "behance"`, instead of a separate field. One URL, one place to
edit it — no risk of the button and an inline embed pointing at different
projects.

**`fbPostUrl` is retired outright** — its only past behavior (an FB iframe on
the showcase branch) is now just a `platform: "facebook"` embed, available
on *both* case-study and showcase pages (it was never wired up for case
studies before; this is a bug fix as a side effect).

**Rendering:**

- Behance: parse the numeric project id out of the pasted URL
  (`behance.net/gallery/(\d+)`) and build the official embed iframe URL. If
  the id can't be parsed (bad/typo'd URL), silently fall back to a plain
  "View on Behance ↗" link — never a broken iframe (matches the
  never-show-broken-state rule from
  [ADR 0002](0002-optional-research-sections-for-case-studies.md)).
- Facebook: `facebook.com/plugins/post.php?href=...` iframe — the same
  lightweight, SDK-free method the old showcase code already used. No
  Facebook JS SDK; nothing added to any bundle.
- Custom: unchanged pass-through of pasted `<iframe>` HTML via
  `dangerouslySetInnerHTML` (still safe — only the site owner enters this,
  in Studio).
- All iframes use native `loading="lazy"`. No click-to-load facade — this
  site has no cookie-consent infrastructure and the extra component
  complexity wasn't judged worth it for a portfolio site.

**Full-width behavior (Behance only):** a Behance embed always renders at
full viewport width — no click, no toggle. (An earlier pass of this
implementation gated this behind a click-to-expand button, contained-by-
default; Quin tried it same-day and asked for it to just always be full
width, no interaction required — simpler, and matches what he actually
wanted on first use.) CSS: the card's container becomes `position: relative;
left: 50%; transform: translateX(-50%); width: 100vw`, breaking out of the
section's `max-w-7xl` ancestor at every breakpoint. This reflows the page in
place — **no modal, no dimmed backdrop, no focus trap.**

**Placement:** the embeds section sits right before "Design Showcase" (after
Results, before the showcase gallery) on both page types — treated as
supplementary proof/further-reading rather than front-loaded hero content.

**Migration:** `behanceUrl`/`fbPostUrl` stay in the schema, marked
"(legacy, unused)" with a description pointing at this ADR — same treatment
already used for `keyFunctions`/`ideation`/`wireframes` per
[ADR 0004](0004-case-study-narrative-restructure.md). Quin re-enters the 4 +
7 existing values into the new `embeds` array by hand, using the legacy
fields as a copy-paste reference; no migration script. Once all affected
documents are migrated, a follow-up change deletes `behanceUrl` and
`fbPostUrl` from the schema entirely.

## Consequences

- One embed mechanism instead of three; one field to check when debugging
  "why isn't this embed showing."
- Fixes a real bug: `fbPostUrl` case studies previously rendered nothing.
- The legacy fields are inert dead weight in Studio until the follow-up
  cleanup ships — a known, time-boxed cost, not a permanent one.
- `queries.js` no longer fetches `behanceUrl`/`fbPostUrl` (nothing consumes
  them on the frontend); Studio still reads/writes them directly via the
  schema, independent of the public query.
- Behance embeds degrade to a plain link on a malformed URL rather than
  failing loudly at save time — a typo could go unnoticed until someone
  checks the live page. Accepted trade-off; this repo's existing pattern
  favors graceful omission over hard Studio-side validation.

## Alternatives considered

- **Add a fourth embed mechanism alongside the existing three.** Rejected:
  would leave four ways to explain "how do embeds work here," including one
  (`fbPostUrl` on case studies) that silently does nothing.
- **Auto-detect platform from the URL** instead of an explicit `platform`
  field. Rejected: fragile against domain/URL-format changes, and gives no
  clean fallback path for a platform not yet coded — an editor would have no
  way to say "treat this as custom."
- **Modal/lightbox expand** (dimmed backdrop, centered overlay) instead of
  inline breakout. Rejected for now: meaningfully more accessibility surface
  (focus trap, scroll lock, Esc handling) for a visual difference that's
  cosmetic, not functional.
- **Automated migration script** for the 11 existing `behanceUrl`/
  `fbPostUrl` values. Rejected: Quin preferred manual re-entry over sharing a
  Sanity write token / running a one-off script for an 11-document, one-time
  job.
