# Domain Glossary — Quin Portfolio

## Project
A single piece of work displayed in the portfolio. Every Project is either a
**Case Study** or a **Showcase** (its `type`). Projects are stored in Supabase,
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

## Admin
The single authenticated owner (Quin) who manages Projects through the
protected `/admin` route. There is exactly one Admin; there are no other user
roles.
