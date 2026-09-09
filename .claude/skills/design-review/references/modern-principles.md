# Modern design principles

The current baseline to evaluate designs against. These are expectations, not aspirations — a product missing several of these reads as dated regardless of how it looks.

## Contents

- [Accessibility](#accessibility)
- [Responsive and mobile-first](#responsive-and-mobile-first)
- [Touch and pointer targets](#touch-and-pointer-targets)
- [Typography](#typography)
- [Color and contrast](#color-and-contrast)
- [Design systems and tokens](#design-systems-and-tokens)
- [States and feedback](#states-and-feedback)
- [Micro-interactions and motion](#micro-interactions-and-motion)
- [Dark mode](#dark-mode)
- [Performance-aware design](#performance-aware-design)
- [Forms](#forms)

---

## Accessibility

WCAG 2.1 AA is the working floor. The practical checks that catch most real failures:

- **Semantic HTML first.** A `<button>` is keyboard-focusable, announces its role, and fires on Enter and Space for free. A `<div onClick>` does none of that. ARIA patches gaps in semantics; it doesn't replace them.
- **Keyboard completion.** Every task must be completable without a mouse. Tab order should follow visual order. Focus must be visible — never `outline: none` without a replacement.
- **Focus management in overlays.** Modals trap focus, return it to the trigger on close, and close on Escape.
- **Screen reader coherence.** Images have meaningful alt text (or `alt=""` if decorative). Form inputs have associated labels, not just placeholders. Icon-only buttons have accessible names. Dynamic updates use live regions.
- **No color-only encoding.** Status, validation, and categories need an icon, label, or pattern alongside the color.
- **Motion respect.** Honor `prefers-reduced-motion` for anything beyond subtle transitions.
- **Zoom and reflow.** Content must remain usable at 200% zoom without horizontal scrolling.

## Responsive and mobile-first

- Design the smallest viewport first, then expand. Retrofitting mobile onto a desktop layout produces compromised results in both.
- Breakpoints should follow content, not device names. When the layout breaks, add a breakpoint there.
- Test at 320px width — it still exists, and it exposes layout assumptions fast.
- Fluid type and spacing (`clamp()`) beats stepped breakpoint jumps for most text.
- Container queries are now well-supported and are the right tool when a component's layout depends on its container rather than the viewport.

## Touch and pointer targets

- 44×44px is the accessibility minimum (WCAG 2.5.5); 48×48px is the practical baseline for primary actions.
- Adjacent targets need at least 8px of separation to prevent mis-taps.
- Primary mobile actions belong in the thumb-reachable lower half of the screen; destructive actions should not.
- Gloves, motor impairments, and moving environments all push these numbers up. Ask about context.

## Typography

- 16px is the minimum for body text on the web — smaller triggers zoom on iOS and fails older eyes.
- Line height around 1.5 for body copy, tighter (1.1–1.3) for large headings.
- Line length 45–75 characters. Full-width text on a wide monitor is unreadable.
- A limited scale (5–7 sizes) beats arbitrary sizing. Weight and size together carry hierarchy; don't rely on size alone.
- Two weights are usually enough. Heavy weights read as aggressive in dense UI.
- Never justify text in UI — the uneven word spacing hurts dyslexic readers particularly.
- For displays read at distance (wall-mounted dashboards, kiosks), scale up substantially: 24px+ body, and check at the real viewing distance rather than on a desk.

## Color and contrast

- Body text: 4.5:1 minimum (AA), 7:1 for AAA.
- Large text (18px+, or 14px+ bold): 3:1 minimum.
- UI components and graphical objects: 3:1 against adjacent colors — this covers borders, icons, focus indicators, and chart elements, and is the most commonly missed rule.
- Placeholder text usually fails. Check it specifically.
- Disabled states are exempt from contrast requirements but still shouldn't be invisible.
- Test with a color blindness simulator. Red/green pairings for success/error are the classic failure.
- Semantic color roles (accent, danger, success, warning) beat naming colors by hue — `--color-danger` survives a rebrand, `--color-red-500` doesn't.

## Design systems and tokens

- Hardcoded values scattered through a codebase are the clearest signal of design debt. Colors, spacing, radii, type sizes, and shadows should come from tokens.
- Spacing should follow a scale (commonly 4px or 8px base). Arbitrary values produce visual noise that's hard to name but easy to feel.
- Components should own their variants rather than being restyled from outside. If every usage overrides the component's styles, the component is wrong.
- One accent color per view. Multiple competing primary actions means none of them is primary.
- Naming matters: purpose-based names (`--surface-raised`) outlive appearance-based names (`--gray-100`).

## States and feedback

Missing states are the most common real gap in shipped UI. Every interactive component needs:

- Default, hover, active, focus-visible, and disabled
- Loading — with a skeleton or spinner appropriate to the wait length
- Empty — the highest-leverage and most neglected state; it should teach and invite action, not apologize
- Error — specific, actionable, in plain language, positioned near the cause
- Success — confirmation that the action landed

Every async action needs immediate feedback. A button that does nothing visible for 800ms gets clicked twice.

## Micro-interactions and motion

- Motion should communicate: where something came from, what changed, what's loading. Decorative motion is noise.
- Durations: 100–200ms for small state changes, 200–400ms for larger transitions. Beyond 500ms feels sluggish.
- Ease-out for entrances, ease-in for exits.
- Animate `transform` and `opacity`; animating layout properties causes jank.
- Everything must degrade gracefully under `prefers-reduced-motion`.

## Dark mode

- Expected in most products now, not a bonus feature.
- Don't invert. Dark mode needs its own palette — pure white on pure black causes halation and eye strain. Use off-white text (around `#E8E8E8`) on dark gray (around `#121212`–`#1E1E1E`).
- Elevation inverts: in light mode higher surfaces are lighter with shadows; in dark mode higher surfaces are lighter but shadows barely read.
- Saturated colors vibrate on dark backgrounds. Desaturate and lighten accent colors for dark mode.
- Contrast ratios must be re-checked in both modes — passing in one says nothing about the other.

## Performance-aware design

Design decisions have performance costs, and slow interfaces are bad interfaces regardless of appearance.

- Images: modern formats (WebP/AVIF), correct dimensions, `loading="lazy"` below the fold, explicit width/height to prevent layout shift.
- Fonts: subset them, use `font-display: swap`, limit families and weights. Every weight is a separate download.
- Reserve space for async content — layout shift after load is one of the most disliked experiences on the web.
- Prefer CSS to JavaScript for animation and layout.
- Design for the slow case: what does this screen look like at 3G on a five-year-old Android?

## Forms

Forms are where most real usability failures live.

- Labels above fields, always visible. Placeholder-as-label disappears on focus and fails screen readers.
- Group related fields; single-column beats multi-column for scanning and completion.
- Correct input types (`email`, `tel`, `number`) so mobile keyboards match.
- Validate on blur, not on every keystroke. Show errors next to the field, in plain language, describing the fix.
- Never clear a form on error.
- Mark optional fields rather than required ones when most are required.
- Autocomplete attributes save real time and are trivially cheap to add.
- Multi-step forms need visible progress and the ability to go back without losing data.
