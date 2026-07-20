# 0001 — Sanity CMS with runtime fetch instead of Supabase + build-time snapshot

Date: 2026-07-20
Status: Superseded (pivoted from Supabase to Sanity before implementation)

## Context

Project data was originally hardcoded in `projects.js`. The goal was to make
adding new works possible without editing code. We evaluated Supabase (Postgres
+ custom admin UI + build-time snapshot) and Sanity (headless CMS with
built-in Studio).

## Decision

Use **Sanity** as the content backend:

- Sanity Studio embedded at `/studio` in the same Vite app — no second repo.
- Public site fetches live from Sanity's CDN API at runtime using GROQ queries.
- No build-time snapshot needed — Sanity's CDN never pauses (unlike Supabase
  free tier), responses are fast and cacheable.
- All existing `projects.js` data migrated to Sanity via a one-time script.
  `src/assets/` project images uploaded to Sanity's media library.

## Consequences

- Publishing in Studio is instant — no deploy hook or rebuild wait.
- Public pages have a brief loading state instead of static instant render.
- Zero Supabase dependency. No custom admin UI to build or maintain.
- Sanity free tier: 3 users, 100k documents, 10GB bandwidth — more than
  enough for a portfolio.

## Alternatives considered

- **Supabase + custom admin UI + build-time snapshot** — would require building
  an entire CRUD interface (~2–3 weeks), a deploy hook wiring, and risked
  empty portfolio if the free-tier project paused. Abandoned before
  implementation.
- **Keep projects.js** — zero external dependency but adding new works
  requires editing code and redeploying.
