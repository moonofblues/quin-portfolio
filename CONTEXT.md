# Domain Glossary — Quin Portfolio

## Project
A single piece of work displayed in the portfolio. Every Project is either a
**Case Study** or a **Showcase** (its `type`). Projects are stored in Sanity,
not in code.

## Case Study
A Project with full narrative structure: Overview, Challenge, Process Steps,
Solution, Results, and an optional Design Showcase. Rendered on the case study
detail page with all narrative sections.

## Showcase (project type)
A lightweight Project without narrative structure — typically graphic design
or social media work. Has a description, gallery images, and optionally an
embedded Facebook post. Listed under "Other Works".

## Design Showcase
The stacked set of images on a Case Study detail page presenting the full
design output (Behance-style vertical frames). Opens in a lightbox. Distinct
from a Showcase project — this is a *section* of a Case Study.

## Process Step
One numbered step in a Case Study's process narrative: a title plus a
description. Ordered.

## Result
A single outcome metric on a Case Study: a metric value (e.g. "60%") plus a
label (e.g. "Reduction in task time").

## Thumbnail
The single hero/cover image of a Project, shown on cards and at the top of the
detail page. Not part of the Design Showcase frames.

## Background *(optional Case Study section)*
Org/product framing that precedes the Challenge — "what is this thing and who
is it for." Renders as a two-column block alongside Challenge when filled;
Challenge renders alone (full-width) when it isn't. Named "Background" rather
than "Context" to avoid colliding with this glossary's own use of "context"
(as in `CONTEXT.md`/bounded context) — it is UI copy, not a modeling term.

## Research Objectives *(optional Case Study section)*
A bullet list stating what the Case Study's research set out to learn, shown
before Research Findings.

## Research Method *(optional Case Study section)*
One approach used to gather research for a Case Study: a title (e.g. "User
Interviews") plus a description. Distinct from a Process Step — a Research
Method describes how information was *gathered*, a Process Step describes how
the *design* progressed.

## Research Finding
Narrative summary text describing what the research revealed. Paired with
Research Methods.

## Pain Point *(optional Case Study section)*
One user frustration surfaced by research: a title plus a description,
rendered as a card. Distinct from Challenge — Challenge is the designer's
framing of the problem; a Pain Point is evidence from a specific research
finding.

## Persona *(optional Case Study section)*
A single representative research participant: photo, name, role/location, and
the tools they currently use. Paired with a pull Quote. Represents real
interview subjects, not a fabricated marketing persona — left empty on Case
Studies where no participant research was conducted.

## How Might We (HMW) *(optional Case Study section)*
A reframed design opportunity stated as a question, derived from Pain Points.
Rendered as a card grid.

## Ideation *(optional Case Study section)*
Narrative text plus a single flow-diagram image (uploaded, not built from
structured data) showing how the design direction was explored.

## Wireframe *(optional Case Study section)*
Early low-fidelity sketch/mockup images with a short description, distinct
from the polished Design Showcase frames.

## Solution Highlight *(optional Case Study section)*
One facet of why the Solution works: a title plus a description, rendered as
one of a small set of value-proposition cards. Falls back to plain Solution
prose when none are filled in.

## Key Function *(optional Case Study section)*
One feature of the shipped design: an annotated image plus a short caption.
Distinct from the Design Showcase — Key Functions highlight individual
features; Design Showcase is the full visual output end-to-end.

## Admin
The single authenticated owner (Quin) who manages Projects through the
protected `/admin` route. There is exactly one Admin; there are no other user
roles.

---

# Visual Language

Terms introduced by the 2026-09 dark redesign. See `docs/redesign-plan.md` for
the plan these belong to, and ADRs 0005-0007 for the decisions behind them.

## Ambient Layer
The non-interactive decorative field sitting behind page content: Moon, Stars
and Fireflies. Purely atmospheric — it never conveys information, never
receives pointer events, and must always stay quiet enough to sit behind text.

## Moon
A single large disc anchoring a section's composition. Placed deliberately, at
most one per section. Part of the Ambient Layer.

## Star
A small, hand-placed, individually positioned twinkling glyph. There are only
ever a few and every position is chosen by hand. Part of the Ambient Layer.

Distinct from a **Firefly**: a Star is deliberate and few, a Firefly is
procedural and many.

## Title Ornament
The Star glyph used inline as a mark beside a heading. Despite sharing a
component with the Star, this is *typographic*, not part of the Ambient
Layer — it sits in the text flow and scrolls with it.

## Firefly
One of many tiny, soft, slowly drifting motes in the Ambient Layer.
Procedurally generated, never hand-placed. Fireflies carry no meaning and are
deliberately subtle. The opposite of a Star in both count and intent.

## Custom Cursor
The pointer treatment replacing the native cursor on precise-pointer devices:
a dot tracking the true pointer position, plus a lagging ring. Absent on touch
devices and whenever reduced motion is requested — in those cases the native
cursor is left completely alone.

## Cursor Affordance
The label or shape the Custom Cursor takes over a particular element ("View
Project" over a project card, an arrow over an outbound link). A property of
the element being hovered, not of the cursor itself.

## Testimonial
An attributed quote from a real person who has worked with Quin: quote, name,
role, organisation, and optionally a photo and profile link. **Attribution is
mandatory** — an unattributed quote is not a Testimonial and is not published,
because anonymous praise reads as invented and costs more trust than it earns.
Attribution means name **and** role (both required); organisation and photo are
optional — a photo is not attribution, so requiring one would wrongly exclude
real, fully-credited quotes.

## Section Numeral
The oversized figure (`01`, `02`, `03`) marking a reworked homepage section.
Rendered in **Instrument Sans italic**, mint — deliberately the *body* font, not
the display font, because Krona One (the display face) has no italic axis and
faux-obliquing it would fail the quality bar. A decorative marker, not an index
the reader must track: never placed where existing content already carries an
ordering (e.g. the About timeline's date periods), which would create two
competing numbering systems. Distinct from the case-study **Timeline node**
badge, which is a functional step number, not decoration.

## Now
A homepage section stating what Quin is doing *right now* — a short,
present-tense list of current activities (building / teaching / learning) with a
manually-set "as of" date. Deliberately pitched at **activity** level, not
**role** level: the About timeline already lists current job titles, so "Now"
describes work in progress ("Building X at ZCMC") and never restates a title.
A "Now" that has gone stale is worse than none — keep it current or remove it.
