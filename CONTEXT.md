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
