# 0010 — Differentiate through a committed concept, not more motion

Date: 2026-09-10
Status: Accepted

## Context

The site "feels generic and similar to most landing pages," and the first
instinct was to add more animations and "cool things" to make it stand out —
the reasoning being that a UI/UX designer's portfolio should showcase craft
through motion.

This was pressure-tested (see the critique that produced this ADR) and the
premise did not survive:

- The site is already heavily animated, not under-animated: a drifting Firefly
  field (ADR 0006), a lagging Custom Cursor with contextual affordances
  (ADR 0007), a drifting Moon, twinkling Stars, Lenis smooth scroll, a
  Marquee, RevealLines, animated StatRings and a ProcessTimeline, plus
  framer-motion entrances across ~25 components. Adding more motion to a site
  that already has this much and still feels generic treats the symptom, not
  the cause.
- "Add more cool animations" runs directly against the project's documented
  performance restraint (CLAUDE.md: nothing heavy in the entry chunk, infinite
  animations are CSS not framer-motion, no `whileHover`/`transition-all`,
  entrance delays under 0.3s, never delay the LCP element) and against the
  decisions in ADR 0006 (canvas/particle libraries rejected) and ADR 0007
  (cursor bound by four rules).
- The audience is a recruiter or hiring manager skimming in ~6 seconds, often
  on a phone or mid-range laptop. CLAUDE.md's "minimize UI friction" principle
  says clarity and speed beat novelty for this reader. Decorative motion that
  delays comprehension optimizes for the wrong person.

The reframing insight: what makes standout UI/UX portfolios distinctive (a
"museum," a terminal/OS, an editorial magazine, a game-world) is a **committed
organizing concept** that the layout, navigation, copy, and interactions all
serve — not a higher *quantity* of animation. This site already has a concept
(the night sky — fireflies, moon, stars, dark-only per ADR 0005), but it
currently reads as ambient decoration floating behind an otherwise standard
stacked-sections landing page. The concept decorates; it does not organize.

## Decision

Differentiation comes from **committing to an organizing concept**, not from
adding more animations.

- Treat "feels generic" as a diagnosis problem first, not a build task. Identify
  the specific section/moment that reads as template-like before changing
  anything.
- Commit harder to the existing night-sky concept (or deliberately choose a
  stronger one) at the level of layout, information architecture, and copy — the
  parts a recruiter grasps statically in the first 6 seconds — rather than the
  decorative layer.
- Motion is the polish layer on a distinctive skeleton, not the differentiator
  itself. New motion is spent on **communicative** moments (state transitions,
  page transitions, scroll-linked case-study narrative) over ambient decoration.
- Any new motion must clear the existing bar before it is even a candidate:
  CSS `transform`/`opacity` only, zero entry-chunk weight, honors
  `prefers-reduced-motion`, and never delays the LCP hero.

**Success criterion:** within ~6 seconds and one screen, a recruiter can tell
the portfolio has a deliberate point of view and knows what Quin does — without
waiting on any animation to finish. Testable by showing the first screen for 6
seconds, removing it, and asking what they remember.

## Consequences

- Cheaper and lower-risk than the animation plan: concept commitment is mostly
  layout/IA/copy work, adding little or no JS and not touching the entry chunk
  or the ADR 0006/0007 guardrails.
- Restraint is preserved as a deliberate senior-designer signal; the site avoids
  the "everything animates, nothing is prioritized" junior tell.
- The night-sky concept must now earn its place structurally, not just
  visually — which is more work to get right than adding another floating
  element, but is the work that actually moves a hiring decision.

## Open questions to resolve before building

1. **What specifically feels generic?** Name the section and the moment. If it
   can't be named, that is the first thing to find — not build.
2. **Does the night-sky concept get committed to, or is a stronger concept
   chosen?** Committing to the existing one is the lower-risk path since the
   assets already exist.
3. **What does the first screen say in 6 seconds** — what Quin does, and that he
   has a point of view — without relying on motion to land?
4. **Which one communicative motion moment is worth polishing** (page transition,
   case-study scroll narrative, FocusChooser state), if any, once the skeleton
   is distinctive?

## Alternatives considered

- **Add more animations broadly (the original idea).** Rejected: highest risk of
  violating documented performance/ADR decisions, high chance of reading as busy
  rather than crafted, and no defined success criterion.
- **One signature motion moment instead of many.** Not rejected — folded into the
  decision as the *polish* layer, explicitly after the skeleton is made
  distinctive, not as the differentiator itself.
- **Improve content/case studies only, touch nothing visual.** Strong on ROI for
  a portfolio and compatible with this decision; can run in parallel. Not chosen
  as the *answer to "feels generic"* because that specific complaint is about art
  direction and concept, which content alone does not address.
