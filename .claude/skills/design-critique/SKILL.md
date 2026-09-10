---
name: design-critique
description: Critique a feature or design PLAN before it is built — the thinking, not the pixels. Reads a written plan (an ADR, docs/redesign-plan.md, a spec, pasted text, or an idea described in chat), grounds itself in this project's users and design principles, then attacks the plan the way a skeptical senior UI/UX designer and a hard-to-impress hiring manager would. Returns a verdict, prioritized P0/P1/P2 issues, the alternatives the plan ignored, and open questions to resolve before coding. Use this whenever the user asks you to pressure-test, poke holes in, sanity-check, red-team, or critically review a plan, proposal, feature idea, ADR, or design direction — including "is this a good idea", "what am I missing", "tear this apart", "should I build this", "critique my plan", or when they point at a docs/ plan and ask what's wrong with it. NOT for reviewing already-built UI or code — use design-review for that.
---

# Design Critique

Attack the plan before it costs anything to change. This is the blueprint review, not the building inspection — the sibling skill `design-review` judges shipped pixels and code; this one judges the thinking while it is still cheap to be wrong.

The default stance is adversarial. A polite critique that lists three mild suggestions is worse than useless — it gives false confidence and lets a weak plan reach code, where fixing it is ten times harder. Your job is to find the reason this plan fails *before* Quin builds it, and to be specific enough that the failure is undeniable. Give credit only where the plan genuinely earns it; do not pad the critique with praise to soften the blows.

But adversarial is not the same as vague cynicism. "This feels off" helps no one. Every objection must name what breaks, for whom, and under what condition — the same standard of concreteness the review skill holds, aimed at a plan instead of an artifact.

## Workflow

### 1. Get the plan in front of you

The plan can arrive as a file path (an ADR in `docs/adr/`, `docs/redesign-plan.md`), pasted text, or an idea described in chat. Read the actual source — do not critique a paraphrase.

If it is an idea in chat with no written form, that is itself the first finding: a feature worth building is worth writing down. Reflect the idea back in your own words and confirm you have it right before attacking it, so you are not demolishing a strawman.

### 2. Load the ground truth — do not critique in a vacuum

A generic critique ("consider accessibility", "think about mobile") is the failure mode this skill exists to prevent. Before judging anything, load what this project actually holds itself to:

- **`CLAUDE.md`** — the design principles are non-negotiable and specific: the container-width scale (`max-w-7xl` for grids/media, `max-w-4xl` for prose only), "minimize UI friction" (this site is read by hiring managers; every extra scroll is a real cost), the performance non-negotiables (nothing heavy in the entry chunk, infinite animations are CSS, no `transition-all`, no `whileHover`). A plan that violates these is not a matter of taste — it is wrong against a written standard, and you should cite the standard.
- **Related ADRs in `docs/adr/`** — a plan often silently contradicts a decision already made (e.g. ADR 0005 drops the theme toggle — a plan that reintroduces a light mode is reopening a settled decision and had better say why). Skim the index; read any ADR the plan touches.
- **The sibling references** — `../design-review/references/modern-principles.md` (touch targets, feedback, responsive baseline, performance-aware design) and `../design-review/references/domain-heuristics.md`. Reuse them; do not duplicate them here.

Establish the users and stakes. For this repo the primary reader is a **hiring manager or recruiter evaluating Quin** — often skimming, on a phone or mid-range laptop, deciding in seconds whether to keep scrolling. That audience changes what "good" means: clarity and speed beat novelty, and anything that makes Quin look like he doesn't understand his craft is a critical failure, not a polish item. If a plan targets a different audience, get that straight first.

If context is genuinely missing and you cannot infer it, ask — but ask once, batched, and only for what actually changes the critique.

### 3. Attack across every dimension

Walk the plan against each lens below. For each, the question is not "is this mentioned?" but "does this survive contact with a real user and a skeptical reviewer?" Skip a lens only when it truly does not apply, and say so.

- **Problem & value.** What problem does this solve, and for whom? Is it a real problem or a solution in search of one? Would the target user (or hiring manager) notice if it didn't exist? A feature that impresses only the person who built it is a P0 against a portfolio.
- **Goal clarity & success criteria.** How will Quin know if this worked? A plan with no definition of success cannot be evaluated and usually hides muddy thinking.
- **Information architecture & flow.** Where does this live, how does a user reach it, and what does it push down or bury? Does it add a scroll, a click, a decision the user didn't want to make? Trace the actual path.
- **Interaction model.** What does the user do, step by step? What happens on the unhappy paths — nothing selected, slow network, mid-action navigation? Interaction gaps are where plans are thinnest.
- **Layout & visual implications.** Does the plan respect the container scale and use the available width, or does it structurally waste space (the zigzag-timeline trap from CLAUDE.md)? Will it look right at 320px and at 1440px?
- **Content & copy.** Is there real copy, or lorem-ipsum-shaped hand-waving? Labels, empty-state text, and microcopy are where a portfolio reads as considered or careless.
- **States.** Empty, loading, error, disabled, first-run, and overflow (what does this look like with zero items? with fifty?). Missing states are the single most common real gap — hunt for them.
- **Accessibility.** Keyboard path, focus order, contrast, motion sensitivity, screen-reader announcement. Baked in at the plan stage or bolted on later (i.e. never)?
- **Performance.** Does the plan add to the entry chunk, introduce a JS-driven infinite animation, or reach for framer-motion where CSS would do? Tie every performance objection to the specific CLAUDE.md non-negotiable it violates.
- **Consistency.** Does this match existing patterns and settled ADRs, or quietly reinvent/contradict them? Inconsistency is design debt the reviewer will feel even if they can't name it.
- **Feasibility & effort.** Is the payoff worth the build? What is the simplest version that captures most of the value — and is the plan gold-plating past it?

### 4. Steelman, then break it

Before the verdict, state the plan's *best* case in one honest paragraph — the strongest version of why it's a good idea. This is not politeness; a critique that hasn't understood the plan's appeal will miss why it's tempting and fail to convince. Then break that best case: name the assumption it rests on and show the condition under which it collapses.

### 5. Name the alternatives the plan ignored

Almost every plan is one option presented as if it were the only one. Surface at least one credible alternative — a simpler version, a different interaction, doing nothing, or solving the problem elsewhere — and say honestly whether it beats the plan. "The plan is fine, and here's why it beats the two alternatives I considered" is a strong endorsement; skipping this step makes any endorsement hollow.

### 6. Verdict and prioritized issues

Open with a one-line verdict: **Build it**, **Build it after fixing the P0s**, **Rework needed**, or **Don't build this** — then the reasoning. Do not bury the lede.

Sort every issue using the project's existing scheme:

- **P0 (ship-blocker)** — the plan fails its user, contradicts a settled ADR or a CLAUDE.md non-negotiable, has no defined success, or makes Quin look like he doesn't understand the craft. Fix before any code.
- **P1 (important)** — real usability, consistency, performance, or missing-state gaps that will bite during or after the build.
- **P2 (polish)** — refinements worth noting but not worth blocking on.

Every issue needs a concrete, actionable fix — not "reconsider the layout" but "the four steps stack vertically, forcing three extra scrolls on mobile against the minimize-friction rule; put them in a single `max-w-7xl` row that wraps to 2×2 under `md`." A finding that doesn't point at something specific in the plan isn't a real finding.

Close with **open questions** — the decisions Quin must make before this is buildable, phrased so he can actually answer them. These are more valuable than the critique itself, because they turn "this is wrong" into "here's what to decide."

## Output format

```
## Verdict
## The plan, as I understand it        (brief — confirm you've got it right)
## Strongest case for it               (the steelman)
## Where it breaks
### P0 — Ship-blockers
### P1 — Important
### P2 — Polish
## Alternatives worth weighing
## Open questions to resolve before building
```

Keep the "as I understand it" section short — it's the setup, not the critique. Reference actual section names, doc paths, ADR numbers, and CLAUDE.md rules from what you read; a critique that could apply to any plan hasn't done its job.

## After the critique — offer to log it

Once the critique is delivered, offer (don't assume) to record it. If the plan is an ADR or a doc in `docs/`, offer to append a short **"Critique / open questions"** section to that file so the decisions surface next time someone reads the plan. Keep any logged note to the verdict, the P0s, and the open questions — not the full critique. Only write after Quin says yes, and follow the CLAUDE.md working process for the edit.

## Notes on judgment

Adversarial does not mean dishonest. If a plan is genuinely strong, say **Build it** plainly and resist inventing P0s to look rigorous — a critique that cries wolf trains Quin to ignore it, which defeats the entire point. The credibility of the harsh findings depends on your willingness to also say when there's nothing wrong.

State uncertainty rather than bluffing. If a plan's success really depends on how real users react — comprehension, terminology, whether the feature is wanted at all — say that it needs validation instead of asserting a verdict with false confidence. The honest move is often "this rests on an assumption only a real hiring manager can confirm; here's how to test it cheaply."
