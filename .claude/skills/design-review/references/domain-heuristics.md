# Domain heuristics

Read only the section matching the product's domain. Each covers the regulatory floor, the characteristic failure modes, and what users in that space already expect.

## Contents

- [Healthcare](#healthcare)
- [Finance](#finance)
- [E-commerce](#e-commerce)
- [SaaS](#saas)
- [Education](#education)
- [Government and public sector](#government-and-public-sector)
- [Internal tools](#internal-tools)
- [Nonprofit](#nonprofit)

---

## Healthcare

**Regulatory floor:** WCAG 2.1 AA is effectively mandatory, not aspirational — public healthcare providers face legal exposure otherwise. Anything touching patient data carries privacy obligations (HIPAA in the US, DPA/equivalent elsewhere): no PHI in URLs, in analytics payloads, in client-side logs, or in screenshots used for support.

**What makes healthcare UI fail:**
- **Cognitive load under interruption.** Clinical staff are interrupted constantly. A form that loses state on navigation, or a multi-step flow with no progress persistence, gets abandoned mid-entry and produces incomplete records.
- **Alert fatigue.** When everything is red and urgent, nothing is. Count how many things compete for attention on a single screen. If more than one thing is styled as critical, the styling has stopped working.
- **Ambiguity in high-stakes fields.** Dosage, units, patient identity, dates. Ambiguous formats (is `03/04` March 4th or April 3rd?) and unlabeled units cause real harm. These fields need explicit units, confirmation on unusual values, and no silent defaults.
- **Destructive actions without recovery.** Deleting or overwriting a record needs confirmation and ideally an undo window.

**Environmental realities to check for:** older hardware and small or low-resolution displays; bright clinical lighting washing out low-contrast palettes; gloved hands needing larger targets than the 44–48px baseline; shared terminals meaning no reliance on persistent per-user state; wall-mounted displays read from several meters away needing much larger type than a desktop app.

**User realities:** staff skew older than typical software audiences and skill levels vary widely. Terminology should match what clinicians actually say, not what the database column is named. Training time is scarce — the interface has to be learnable in minutes, not hours.

---

## Finance

**Regulatory floor:** WCAG AA minimum, with AAA expected for consumer banking in many jurisdictions. Payment interfaces carry PCI-DSS constraints — card fields must not be logged, autofilled into the wrong place, or exposed in the DOM longer than needed.

**What makes finance UI fail:**
- **Trust signals that are absent or fake-looking.** Users abandon when a payment screen looks slightly off. Security indicators, clear provider names, and consistent branding through the whole flow matter more than in almost any other domain.
- **Irreversible actions with weak confirmation.** Transfers, trades, and account changes need a confirmation step that restates the actual values — amount, recipient, account — not just "Are you sure?"
- **Precision failures.** Rounding displayed amounts, ambiguous currency, unclear fee disclosure, and dates without timezones all destroy trust the moment a user notices.
- **Error prevention over error messages.** Validate before submission. Catching a mistyped account number after the transfer is worthless.

**User realities:** the audience skews older and more risk-averse than most consumer products. Anxiety is the baseline emotional state — jargon, unexplained delays, and vague status messages amplify it. Plain language beats precise-but-opaque terminology.

---

## E-commerce

**Regulatory floor:** WCAG AA. Price and fee transparency requirements vary by jurisdiction — surprise fees at the final step are both a conversion killer and increasingly a legal issue.

**What makes e-commerce UI fail:**
- **Checkout friction.** Every required field costs conversions. Forced account creation before purchase is the single most common self-inflicted wound. Guest checkout should exist.
- **Unclear product information.** Missing sizing, unclear stock status, low-quality or non-zoomable images, and buried return policies all push users to competitors.
- **Cart and state loss.** Losing the cart on session expiry or across devices is a direct revenue loss.
- **Mobile as an afterthought.** Most traffic is mobile. Check thumb reachability of primary actions, form input types (numeric keyboards for card fields), and whether the checkout is usable one-handed.

**User realities:** the audience is maximally diverse in age and skill. Users are comparison-shopping in other tabs and will leave over small friction. Trust signals — reviews, return policy, delivery estimates, secure payment marks — carry real conversion weight.

---

## SaaS

**Regulatory floor:** WCAG AA, plus whatever the customers' own compliance regimes demand (enterprise buyers increasingly require VPATs).

**What makes SaaS UI fail:**
- **Onboarding that dumps everything at once.** Progressive disclosure matters: new users need the core loop, not the full feature surface. Empty states are the highest-leverage onboarding surface and are usually neglected.
- **No keyboard path for frequent actions.** Daily users become power users. If the common action requires a mouse, the product feels slow forever.
- **Inconsistent patterns across features.** SaaS products accrete features from different teams and eras. Two different date pickers or three modal styles is design debt users feel as confusion.
- **Poor handling of scale.** Design for 5,000 rows, not 5. Check pagination, filtering, bulk actions, and what happens when a name is 200 characters long.

**User realities:** users are goal-directed and repetitive — they do the same tasks daily. Efficiency compounds. They will learn shortcuts if the product rewards it, and they'll build workarounds silently rather than filing feedback.

---

## Education

**Regulatory floor:** WCAG AA minimum; institutional buyers frequently require AA compliance documentation. Student data carries privacy obligations (FERPA in the US, equivalents elsewhere).

**What makes education UI fail:**
- **Assuming a single user type.** Students, teachers, parents, and administrators have different needs, skill levels, and devices, often in the same product.
- **Neglecting diverse learners.** ADHD, dyslexia, and low vision are heavily represented. That means: generous line spacing, no justified text, readable sans-serif faces, reduced motion options, no reliance on color alone, and no timed interactions without extensions.
- **Unclear progression.** Learners need to know where they are, what's next, and what's optional. Ambiguous progress is demotivating.
- **Ignoring device reality.** School-issued Chromebooks, shared tablets, and old phones on weak connections are common. Heavy JS bundles fail here.

**User realities:** teachers are time-poor and need answers in seconds. Students disengage instantly when confused. Design choices scale to thousands of learners — one confusing button multiplies.

---

## Government and public sector

**Regulatory floor:** the highest of any domain. WCAG AA is typically a legal requirement (Section 508 in the US, EN 301 549 in the EU, equivalents elsewhere). Plain language mandates often apply.

**What makes government UI fail:**
- **Assuming the user has a choice.** They don't. There's no competitor to switch to, which means accessibility failures lock people out of services entirely rather than costing conversions.
- **Bureaucratic language.** Form field labels that mirror internal terminology rather than what citizens understand.
- **Assuming modern devices and connectivity.** The audience includes people on very old hardware, limited data plans, and public library terminals.
- **No offline or print path.** Many users need to print, save, or complete a process in stages.

**User realities:** maximally diverse — every age, ability, language proficiency, and technical skill level. Design for the least-served user, because the service must reach them.

---

## Internal tools

**Regulatory floor:** WCAG AA still applies — employees have accessibility rights, and this is the most commonly neglected case.

**What makes internal tools fail:**
- **Assuming users will tolerate anything.** They will, and they'll build spreadsheets to avoid the tool instead. Silent workarounds are the failure signal, and nobody reports them.
- **Data-heavy screens without density controls.** Internal users want more information per screen than consumer users, but need filtering, sorting, saved views, and bulk operations to manage it.
- **No keyboard support.** These are the highest-repetition users in any product category. Mouse-only workflows waste real hours.
- **Poor error recovery.** Internal tools often touch production data. Undo, confirmation on destructive actions, and audit trails matter.

**User realities:** power users doing repetitive work under time pressure. They value speed and predictability over polish. Onboarding matters less than daily throughput, but new-hire ramp time is a real cost.

---

## Nonprofit

**Regulatory floor:** WCAG AA. Donation flows carry the same payment constraints as e-commerce.

**What makes nonprofit UI fail:**
- **Donation friction.** The donation flow is the conversion path. Every extra step, unclear amount option, or forced account creation loses gifts.
- **Unclear impact.** Users need to understand what their contribution does. Vague mission language without concrete outcomes underperforms.
- **Trust gaps.** Financial transparency, legitimacy signals, and clear organizational identity carry heavy weight for first-time donors.
- **Under-resourced accessibility.** Nonprofits often serve the populations most affected by accessibility failures, and often have the least capacity to address them. Prioritize accordingly.

**User realities:** wide age range, often skewing older for donors. Emotional context matters — the design supports a decision that is partly feeling-driven. Mobile donation is increasingly dominant.
