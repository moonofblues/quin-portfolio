# Hospital Operations Dashboard case study: v2 paste sheet

Field-by-field guide for entering this case study into the existing project in
Studio (slug `hospital-operations-dashboard`). Same format as
`case-study-v2-erp-paste-sheet.md`.

**How to use this sheet:** it follows Studio **exactly, top to bottom**. Every
field you'll see in Studio has a line here, even the ones you skip. Each `##`
heading is a Studio tab, and each `###` heading is a box (or a section) inside
that tab.

- **Bold value / `code`** → type or paste it in.
- *leave as is* → don't touch it, even if it already has something in it.
- *leave empty* → don't fill it in.

**Preview while you work:** run `npm run dev`, then open
`http://localhost:5173/work/hospital-operations-dashboard?v=2`.

**Images** are your five screenshots in `C:\Users\eledesma\Pictures\Screenshots\`.
They're called by the time in the file name:

| Short name | File | What it shows |
|---|---|---|
| **Overall** | `Screenshot 2026-11-17 092945.png` | Overall Dashboard tab |
| **Clinical** | `Screenshot 2026-11-17 092957.png` | Clinical Operations tab |
| **Logistics** | `Screenshot 2026-11-17 093015.png` | Logistics and Financial tab |
| **Customize** | `Screenshot 2026-11-17 093038.png` | The "Customize Drugs & Medicine" dialog |
| **Claims** | `Screenshot 2026-11-17 093052.png` | Claims Management tab |

> ⚠️ **Fix these in the screenshots before uploading.** Hiring managers will
> zoom in.
> - **Placeholder data:** *Clinical* repeats "Obstetrics & Gynecology" six
>   times, and several cards share the same numbers. Use realistic sample
>   data, or say in a caption that the figures are samples.
> - **Typo:** the Claims tab reads "Claims Managemennt" (*Claims*).
> - **Clipped text:** the chart axis in *Overall* is cut off ("1000000("), and
>   numbers overlap at the bottom of the chart in *Claims*.
> - **Blank grey circle** where the logo should be (every screenshot).

> ⚠️ **Pins.** Decision 1 and Decision 3 use numbered pins. Per decision D11,
> pins live *in the image*. Before uploading, draw the numbered circles
> (lavender `#a99ce4` fill, dark `#07090d` number, Krona One) in Figma onto the
> images marked **📍**. Image positions for each pin are listed with the image.

> ⚠️ **Old text in Studio disagrees with what you told me.** The current
> project (from `src/data/projects.js`) says: "60% reduction in task
> completion time", "15+ systems unified", "No login required", "Front-End
> Developer", and "PPE / touch targets". None of those came from you, and the
> site has a Logout button. This sheet replaces or removes them. Tell me if any
> of them is actually true.

> **Solution at a Glance** (the cards under The Problem) has no fields of its
> own. It's built from the *Key Decisions* section, so it looks empty until
> you've filled that in.

---

## Tab: Card & meta

### Box: Basics

| Field | Value |
|---|---|
| Title | *leave as is* (`Hospital Operations Dashboard`) |
| Subtitle | *leave as is* (the Headline in the Story tab replaces it on the case study page) |
| Slug | *leave as is.* **Don't click "Generate"** |
| Type | *leave as is* (Case Study) |
| Status | *leave as is* (Published) |
| Categories | *leave as is* |
| Featured | *leave as is* |
| Sort Order | *leave as is* |

### Box: Project card

| Field | Value |
|---|---|
| Thumbnail | Upload **Overall**. It also becomes the first hero collage frame |
| Tags | Remove the old ones, then add: `UI/UX Design`, `Dashboard Design`, `Healthcare`, `Enterprise` |
| Short Description | `One dashboard that shows a hospital's executive board what is happening across the institution, on a laptop or a TV.` |
| Impact (one-liner) | `Live now, used on a TV and on laptops` |

### Box: Case study details

| Field | Value |
|---|---|
| Year | `2025` |
| Duration | `1 month` |
| My Role | `UI/UX Designer` |
| Team (optional) | `1 designer and 1 full-stack developer` |
| Client | `A government hospital` *(the old text said "A Medical Center". Use whichever you prefer.)* |
| Project Status (optional) | Pick the option closest to **Live**. If there's no such option, tell me and I'll check the list |
| Tools Used | Remove the old ones (React, Tailwind CSS, Shadcn UI…), then add: `Figma` |
| Live URL | *leave as is* (`https://dashboard.zcmc.online/`) |

---

## Tab: Story

| Field | Value |
|---|---|
| Headline (optional) | `One page for the board to see what is happening, without asking each office` |
| Overview | A hospital's executive board had to ask each office for its report every time they wanted to know how the institution was doing. I designed one dashboard that gathers those numbers on a single page, built to be read on a laptop and on a TV. |
| The Problem | The board couldn't see what was happening across the hospital without asking each office for a report. |
| Story sections | Add the 6 sections below, **in this order**, with **Add item** |

**Inside a section, the add-buttons you'll meet:**
- **Content → Add item** offers 4 kinds: *Text*, *Media*, *Card grid*, *Callout*.
- **Media** asks for a *Layout* first, then *Images*, then *Numbered legend*.
  Each image has: the image itself, *Alt text*, *Label (optional)*,
  *Caption (optional)*.
- **Card grid** has *Small heading (optional)* (leave empty unless noted),
  then *Cards*, each with *Title* and *Text*.
- **Callout** has *Label (optional)*, then *Text*.

### Section 1 · Story section (Background)

| Field | Value |
|---|---|
| Chapter nav label (optional) | `Context` |
| Eyebrow (optional) | *leave empty* |
| Heading | `Background` |
| Headline (optional) | `Every update meant asking someone for a report` |
| Content | Add the 1 item below |

1. **Text:** To know how the institution was doing, the executive board had to ask each office for its report. Every time they wanted an update, they had to ask again. The board needed to see the current state of the hospital without waiting on anyone.

### Section 2 · Story section (What I Worked From)

| Field | Value |
|---|---|
| Chapter nav label (optional) | `Evidence` |
| Eyebrow (optional) | *leave empty* |
| Heading | `What I Worked From` |
| Headline (optional) | `A list from the board, a map of the data, then their feedback` |
| Content | Add the 1 item below |

1. **Card grid**, Small heading *leave empty*, 3 cards:

   | Title | Text |
   |---|---|
   | `The board's list` | The board gave me the reports and counts they wanted to see. I didn't have to guess what mattered. |
   | `The data sources` | I found out where each number would come from: spreadsheets, existing systems and others. That decided how each one could be shown. |
   | `Feedback on the first version` | The board reviewed the first design and asked for a few adjustments. That's also when I learned it would be shown on a TV. |

### Section 3 · Story section (Constraints)

| Field | Value |
|---|---|
| Chapter nav label (optional) | *leave empty* |
| Eyebrow (optional) | *leave empty* |
| Heading | `Constraints` |
| Headline (optional) | *leave empty* |
| Content | Add 1 item: |

1. **Card grid**, Small heading *leave empty*, 3 cards:

   | Title | Text |
   |---|---|
   | `1 designer, 1 developer` | Design alongside development |
   | `1 month` | From the board's list to a finished dashboard |
   | `Laptop and TV` | Found after the first feedback |

### Section 4 · Statement

| Field | Value |
|---|---|
| Chapter nav label (optional) | *leave empty* |
| Eyebrow (optional) | *leave empty* |
| Label | `The Challenge` (already filled in for you) |
| Statement | Show the executive board what is happening across the hospital in one place, so they stop asking each office, and keep it readable on a laptop and on a TV. |

### Section 5 · Process

| Field | Value |
|---|---|
| Chapter nav label (optional) | `Process` |
| Eyebrow (optional) | *leave empty* |
| Heading | `The Process` |
| Intro (optional) | Design ran for one month, with the board's feedback changing the layout once. |
| Steps | Add the 4 steps below |
| Note (optional) | Feedback loop at step 04: the board's first review changed the layout to avoid scrolling, because the dashboard would also be on a TV. |

| # | Step Title | Step Description |
|---|---|---|
| 1 | `Start from the board's list` | The board had already listed the reports and counts they wanted to see. I used that list as the scope. |
| 2 | `Map where the data comes from` | Worked out which numbers come from spreadsheets, which from systems, and what type of file each one is. |
| 3 | `Choose how to show each one` | Picked a number card, table or chart for each report, based on the data it came from. |
| 4 | `Adjust after feedback` | Made the adjustments from the first review. Learned it would also be shown on a TV, so I cut scrolling and kept a table or chart toggle for the board. |

### Section 6 · Key Decisions

| Field | Value |
|---|---|
| Chapter nav label (optional) | `Decisions` |
| Eyebrow (optional) | *leave empty* |
| Heading | `Key Decisions` |
| Headline (optional) | `Three decisions, and the reasoning behind each` |
| Decisions | Add the 3 decisions below |

Each decision has these fields, in this order: *Headline*, *Glance card
title*, *Glance card summary*, *Explanation*, *Side notes* (each with *Label*
and *Text*), *Media*.

> **Check these three.** I wrote them by reading your screenshots, not from
> your notes. Change anything that doesn't match how you actually decided.

#### Decision 1

| Field | Value |
|---|---|
| Headline | `One overview, with a tab for each area` |
| Glance card title | `Overview first, detail on request` |
| Glance card summary | A one-screen overview shows the key numbers. Three tabs hold the detail for clinical, logistics and finance, and claims. |
| Explanation | Two paragraphs (press Enter between them): ↓ |

> The first page the board sees is an overview with four panels: clinical, claims, finance and inventory. Each panel shows only the headline numbers, with a "View Full … Data" link into its own tab. The question "what is happening now?" is answered without scrolling or clicking.
>
> Every number also comes with context. Last month and the monthly average sit under each figure, with a percent change, so a number is never shown on its own.

Side notes:

| Label | Text |
|---|---|
| `Came from` | The board's own list of reports and counts, grouped by area. |

Media, add 2:
1. Layout: *Annotated image (numbered legend)*
   - Image: 📍 **Overall** (3 pins)
     - Alt text: `Overall Dashboard with four panels: clinical, claims, financial and inventory`
     - Label: *leave empty*
     - Caption: *leave empty*
   - Numbered legend, 3 lines:
     1. The four tabs: Overall, Clinical Operations, Logistics and Financial, Claims Management. *(pin on the tab row)*
     2. Each area gets one panel with its key numbers. *(pin on the Clinical Operations panel)*
     3. "View Full … Data" opens that area's own tab. *(pin on a "View Full Clinical Data" link)*
2. Layout: *Single image*
   - Image: **Clinical**
     - Alt text: `Clinical Operations tab with five number cards, each showing last month and monthly average`
     - Label: *leave empty*
     - Caption: `Each number shows last month and the monthly average, so the board can tell if it is high or low.`
   - Numbered legend: *leave empty*

#### Decision 2

| Field | Value |
|---|---|
| Headline | `Designed for a TV as well as a laptop` |
| Glance card title | `Almost no scrolling, with a table or chart toggle` |
| Glance card summary | Big numbers and a layout built to fit one screen. Each list can be a table or a chart, whichever the board prefers. |
| Explanation | Two paragraphs: ↓ |

> After the first feedback I learned the dashboard would also be shown on a TV, not only opened on a laptop. On a TV, nobody scrolls. So I kept the numbers large and the layout tight, to fit as much as possible on one screen.
>
> Some executives like a chart and some like a table. Instead of choosing for them, every Top 10 list has a toggle between the two. They can pick whichever they prefer when checking.

Side notes:

| Label | Text |
|---|---|
| `Came from` | The board's feedback on the first version. |
| `Trade-off` | The Overall tab fits one screen, but the Clinical and Claims tabs still scroll a little. |

Media, add 1:
- Layout: *Annotated image (numbered legend)*
- Image: 📍 **Claims** (3 pins)
  - Alt text: `Claims Management tab with a table, a chart and a table, each with a table or chart toggle`
  - Label: *leave empty*
  - Caption: *leave empty*
- Numbered legend, 3 lines:
  1. The same data as a table. *(pin on the left "Top 10 Claims Diagnosis" panel)*
  2. Or as a chart, using the toggle at the top right of each panel. *(pin on the middle "Chart" toggle)*
  3. Large figures with last month and the monthly average underneath. *(pin on the left money card)*

#### Decision 3

| Field | Value |
|---|---|
| Headline | `Pin the items you watch, and show their status` |
| Glance card title | `Pinned items with a status` |
| Glance card summary | Inventory shows the items the board pins, each with a Critical, Low or Normal label and a note about where the data comes from. |
| Explanation | Two paragraphs: ↓ |

> The hospital has thousands of drugs and supplies, and nobody wants to read a table of every one. Executives pick the items they care about with a "Customize" button and a search, and only those appear in the table.
>
> Each item has a colored label (Critical, Low or Normal), so a shortage stands out from across a room. A small note under each table says where the data comes from, for example "Data Source: Spreadsheet (Pharmacy)", so the board knows how far to trust it.

Side notes:

| Label | Text |
|---|---|
| `Came from` | The data sources: inventory arrives as spreadsheets, so the screen says so. |

Media, add 2:
1. Layout: *Annotated image (numbered legend)*
   - Image: 📍 **Logistics** (3 pins)
     - Alt text: `Logistics and Financial tab with fund totals, stock alerts and two item tables with status labels`
     - Label: *leave empty*
     - Caption: *leave empty*
   - Numbered legend, 3 lines:
     1. A pencil button opens "Customize" to pin the items you want. *(pin on the pencil beside "Search Drugs & Medicine")*
     2. Every item has a Critical, Low or Normal label. *(pin on a "Critical" label)*
     3. Each table says where its data comes from. *(pin on "Data Source: Spreadsheet (Pharmacy)")*
2. Layout: *Single image*
   - Image: **Customize**
     - Alt text: `Customize Drugs & Medicine dialog with two pinned items and a search box`
     - Label: *leave empty*
     - Caption: `Pick the drugs or medicines to show in the table.`
   - Numbered legend: *leave empty*

---

## Tab: Outcome

This tab is in the same order as the bottom of the page: Showcase first,
then the Outcome, then the Reflection.

### Design Showcase Images

Replace the current images with these 3, in this order. Click an image to
open its *Title*, *Caption* and *Alt text* fields.

| # | Image | Title (optional) | Caption (optional) | Alt text (optional) |
|---|---|---|---|---|
| 1 | **Clinical** | `Clinical Operations.` | Patient numbers with last month and monthly average, and the top 10 admissions, discharges and services. | `Clinical Operations tab` |
| 2 | **Logistics** | `Logistics and Financial.` | Funds at a glance, and stock tables with a status for every item. | `Logistics and Financial tab` |
| 3 | **Claims** | `Claims Management.` | Expected claims and social insurance, with the top 10 diagnoses and insurance types. | `Claims Management tab` |

*Hero collage note:* the collage at the top of the page is built from the
thumbnail plus the first showcase images, so it will show **Overall**,
**Clinical**, **Logistics**, **Claims**.

### The rest of the tab

| Field | Value |
|---|---|
| Embeds (optional) | *leave as is* (the Behance link) |
| Outcome Headline (optional) | `Live now, used on a TV and on laptops` |
| Results | Delete the current 3 (60%, 15+, 0), then add the 2 below |
| Outcome Notes (optional) | Add the 1 note below |
| Reflection (optional) | *leave empty.* You haven't told me what you learned yet. Tell me and I'll draft it |

**Results** (each has *Metric* and *Label*):

| Metric | Label |
|---|---|
| `1 month` | `from the board's list to a finished dashboard` |
| `Live now` | `in use on a TV and on laptops` |

**Outcome Notes** (each has *Label*, picked from a list, and *Text*). Use the
**bulleted list** button in the Text toolbar:

1. Label **Delivered**, Text as bullets:
   - I designed the dashboard: the overview, the three detail tabs, the table and chart toggle, and the pinned inventory items.
   - One full-stack developer built it, and it is live now.
   - The board uses it on a TV and on laptops.

---

## Tab: Legacy

*Leave the whole tab as is.* Once Story sections has content, the page
ignores this tab. Nothing here is deleted.

---

## While you enter it, note anything that felt confusing

That's the point of entering it by hand (D16). Examples worth reporting: a
field you couldn't find, a label that didn't say what it does, a validation
message that blocked you, or a section type that didn't fit what you wanted to
say.
