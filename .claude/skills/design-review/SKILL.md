---
name: design-review
description: Audit UI/UX work against modern design principles, accessibility standards, and the actual needs of the intended users. Gathers user personas, domain context, and product type first, then reviews either a codebase or design samples (Figma links, screenshots, wireframes) and returns prioritized P0/P1/P2 recommendations. Use this whenever the user asks for design feedback, a UI review, a UX audit, an accessibility check, or wants to know whether a screen, component, flow, or design system is ready to ship — including phrasings like "review this UI", "is this design good", "check my UI components", "audit this for accessibility", "does this work for our users", or when they share a Figma link, screenshot, or point at UI code and ask what they should improve.
---

# Design Review

Review UI/UX work the way a senior designer would: understand who it's for before judging whether it works.

Generic design feedback is nearly worthless. "Improve contrast" and "add whitespace" apply to everything and change nothing. The value in this review comes from grounding every observation in a specific user, a specific domain, and a specific product context — so that "the text is 14px" becomes "14px fails for your 55-year-old ward clerks reading a wall-mounted display from three meters away."

The workflow below front-loads context gathering for exactly this reason. Resist the urge to skip ahead to the audit.

## Workflow

### 1. Gather context before reviewing anything

Ask about users, domain, and product type. Ask them together in one message rather than interrogating one question at a time — the user is trying to get feedback, not fill out a form.

If the user already stated some of this ("our hospital admin dashboard"), extract what you can and only ask about the gaps. Confirm your inferences rather than silently assuming them.

**Target users** — age range, technical skill level, device types, accessibility requirements, and use environment. Environment matters more than people expect: outdoor sunlight kills low-contrast palettes, gloved hands need bigger targets, a noisy ward means visual feedback can't rely on sound, a shared terminal means no persistent login state.

**Domain** — healthcare, finance, e-commerce, education, SaaS, nonprofit, government, internal tooling. This determines which regulations apply and what users already expect from products in that space.

**Product type and scope** — web app, mobile app, responsive site, landing page, internal tool, dashboard. And how much is under review: a single screen, a full flow, a component library, or a whole design system. Scope changes what "consistency" even means — one screen can't be inconsistent with itself.

If the user resists the questions or says "just look at it," gather what you can from the artifacts themselves and state your assumptions explicitly at the top of the review. Assumptions the user can correct are far better than a review with no grounding at all.

### 2. Take in the design

Ask which they have. Both is better than either.

**Option A — Codebase.** Ask for a path, repo, or snippets. Read the actual files rather than reasoning about them abstractly. Look for:
- Component structure, naming, and reuse — is there a `Button`, or twelve different buttons?
- Design token usage vs. hardcoded values (`#3B82F6` scattered through the codebase is design debt)
- Responsive breakpoints and layout logic — is it mobile-first, or desktop with mobile patched on?
- Accessibility attributes: semantic HTML, ARIA where semantics fall short, focus states, keyboard handlers, alt text, form label associations
- State handling — loading, empty, error, disabled, and success states. Missing states are the most common real gap in shipped UI.

**Option B — Design samples.** Figma links, screenshots, wireframes, exported images. Look for:
- Visual hierarchy — does the eye land on the primary action first?
- Typography scale and readability at the actual viewing distance
- Color usage and measured contrast ratios (WCAG AA = 4.5:1 body text, 3:1 large text and UI components; AAA = 7:1)
- Component consistency across screens and how states are represented
- Interaction patterns and flow logic

Read `references/modern-principles.md` for the current baseline to evaluate against — mobile-first responsive behavior, touch target sizing, micro-interactions and feedback, design system thinking, dark mode, and performance-aware design decisions.

### 3. Apply domain-specific heuristics

Read the matching section of `references/domain-heuristics.md`. Each domain has its own failure modes, regulatory floor, and user expectations — a checkout flow and a clinical intake form fail in completely different ways. Flag design debt and anti-patterns that are specific to the domain rather than generic.

If the domain isn't covered in the reference, reason from first principles about what the users' stakes are: what happens if they make a mistake, how much do they trust the product, and how much time pressure are they under.

### 4. Trace flows against the personas

This is the step that produces the findings the user couldn't have gotten from a linter. Walk the actual paths through the interface as each persona:

- Is navigation intuitive at the stated skill level, or does it assume familiarity they don't have?
- Are accessibility requirements met in practice — keyboard-only completion, screen reader announcement order, contrast at real sizes, motion sensitivity?
- Does the design survive the environment — sunlight, gloves, one-handed use, interruptions, old hardware, slow connections?
- Are error states and edge cases handled? What does a new user with no data see? What does someone with 5,000 rows see?

Name the gaps between what the design assumes and what the users actually bring.

### 5. Prioritize by impact

Sort every recommendation into:

- **P0 (critical)** — accessibility failures, security or trust breaks, anything that blocks a user from completing their task. These are ship-blockers.
- **P1 (important)** — usability gaps, domain compliance risk, conversion friction, missing states.
- **P2 (nice to have)** — polish, micro-interactions, advanced patterns, refinements.

Every recommendation needs a concrete fix, not just a diagnosis. "Contrast is too low" is a complaint; "the `#9CA3AF` placeholder on `#F9FAFB` measures 2.1:1 — move to `#6B7280` for 4.6:1" is a fix. Where a before/after or a code snippet makes it unambiguous, include it.

Prioritize by user impact rather than by what's trendy. A working, ugly form beats a beautiful one that locks out keyboard users.

## Output format

Structure the review as:

```
## 1. User personas
## 2. Domain context
## 3. Current state assessment
## 4. Domain-aware audit
## 5. User-centered gaps
## 6. Prioritized recommendations
### P0 — Critical
### P1 — Important
### P2 — Nice to have
## 7. Next steps
```

Sections 1 and 2 should be brief — they're the grounding, not the review. If the user gave you the context in their own words, reflect it back compressed rather than padding it out.

Keep the recommendations specific enough that someone could act on them without asking a follow-up question. Reference actual file paths, component names, color values, and screen names from what you reviewed. A finding that doesn't point at something concrete probably isn't a real finding.

End with next steps that are actual next actions — "run the checkout flow with VoiceOver and note where the announcement order breaks" rather than "consider improving accessibility."

## Notes on judgment

State uncertainty rather than papering over it. If you're reviewing screenshots you can't measure contrast ratios precisely — say so and give the user the tool to check rather than guessing at a number.

This review is a strong baseline, not a substitute for testing with real users. Where a finding really needs validation from the actual audience — especially anything about comprehension, terminology, or workflow fit — say that plainly instead of asserting it with false confidence.

Be willing to say a design is in good shape. A review that manufactures problems to seem thorough trains the user to ignore it.
