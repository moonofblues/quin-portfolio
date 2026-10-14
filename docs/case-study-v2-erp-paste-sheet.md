# ERP case study: v2 paste sheet

Field-by-field guide for entering the Claude Design reference
(`docs/reference/case-study-v2/`) into the existing ERP project in Studio
(slug `zcmc-erp-system`). Work top to bottom; each heading is a Studio tab.

**Preview while you work:** run `npm run dev`, then open
`http://localhost:5173/work/zcmc-erp-system?v=2`. The live site keeps showing
the old page until v2 is approved.

**Images** are in `docs/reference/case-study-v2/part-N/assets/`. Names below
are shortened to their first 4 characters (e.g. `4b55…`).

> ⚠️ **Pins.** In the reference, the numbered circles were drawn by the page,
> not baked into the screenshots. Decision D11 says pins live *in the image*,
> so before uploading, draw the numbered circles (lavender `#a99ce4` fill,
> dark `#07090d` number, Krona One) in Figma onto the images marked **📍** and
> export them. The pin positions are visible by opening the reference HTML in
> a browser (`npx serve docs/reference/case-study-v2/part-3`, then open the
> `.dc.html` file).

> **Order matters for one thing:** fill in the *Key Decisions* section before
> checking Solution at a Glance. The glance cards are built from it.

---

## Tab: Card & meta

| Field | Value |
|---|---|
| Title | `Planning & Procurement System` *(changing the title does **not** change the URL. Leave the Slug alone, don't click "Generate")* |
| Tags | `UI/UX Design`, `Enterprise`, `Healthcare`, `Workflow Redesign` |
| Thumbnail | `part-1/assets/4b55…` (Objectives page). It also becomes the first hero collage frame |
| Year | `2025` |
| My Role | `UI/UX Designer (design only)` |
| Team | `1 designer, 2 frontend and 1 backend developer` |
| Client | `A government hospital` |
| Duration | `Nov – Dec 2025 · MVP in 5 weeks` |
| Project Status | `MVP built · not deployed` |
| Tools Used | `Figma`, `Photoshop` |

## Tab: Story

| Field | Value |
|---|---|
| Headline | `Rebuilding a stalled hospital system around the plan itself` |
| Overview | A government hospital plans each year in two linked documents: the Annual Operations Plan (AOP), which sets each unit's objectives and activities, and the Project Procurement Management Plan (PPMP), which lists what has to be bought to carry them out. I redesigned the system meant to move both out of Excel after its development had stalled. |
| The Problem | Staff still planned in Excel because the system meant to replace it had stalled for six months inside one overloaded form. |

### Story sections: add these in this order

**1 · Story section** *(Background)*
- Chapter nav label: `Context`
- Heading: `Background`
- Headline: `One plan, spread across spreadsheets and paper`
- Content:
  1. **Text:** Each unit filled in spreadsheets more than a dozen columns wide, scrolling sideways and down to complete every row. The width was a nuisance. The bigger problem was that the two documents didn't know about each other.
  2. **Media**, layout *Single image*: `part-1/assets/3c94…`, alt `Blank AOP Excel template with its many columns`
  3. **Media**, layout *Single image*: `part-1/assets/234b…`, alt `PPMP spreadsheet with items, quantities, budgets and monthly schedule`, caption `The AOP template (top) and a PPMP sheet (bottom). Nothing in the PPMP points back to the objective an item serves.`
     *(The reference staggers these two wide sheets vertically, so use two single images rather than a pair. A side-by-side pair would make them too small to read.)*
  4. **Card grid**, 4 cards:
     - `No traceability`: A PPMP item wasn't tied to its AOP objective. Finding out why it was requested meant searching by hand.
     - `Duplicates`: Items were retyped each time they were needed, and the same item ended up entered more than once.
     - `Manual totals`: Budgets were calculated and checked by hand.
     - `Paper approvals`: Each approving office read a printed copy, signed it, and passed it on to the next.

**2 · Story section** *(What I Worked From)*
- Chapter nav label: `Evidence`
- Heading: `What I Worked From`
- Headline: `Four sources, no formal research`
- Content:
  1. **Text:** I didn't run interviews or usability tests on this project. My decisions came from what was already in front of me.
  2. **Card grid**, 4 cards:
     - `The Excel templates`: The AOP and PPMP sheets staff were using, which showed everything each plan had to capture.
     - `The inherited design`: The previous designer's screens and the half-built system based on them.
     - `The developers`: Conversations with the two frontend developers and one backend developer about where the build kept breaking.
     - `Staff feedback`: Complaints already coming in about the form, and later, feedback on how resources were displayed.
  3. **Callout** (no label): I didn't get to test with planning staff during the project, so the design hasn't been validated in use.

**3 · Story section** *(The Design I Inherited)*
- Chapter nav label: *(leave empty, stays in "Evidence")*
- Heading: `The Design I Inherited`
- Headline: `The replacement had the same shape as the spreadsheet`
- Content:
  1. **Text:** When I joined, the system had been in development for six months without a stable build. The first design put the whole plan into a single form. It already saved drafts, so losing work wasn't the issue. Getting to the fields was.
  2. **Callout**, label `Why it stalled`: Because the form was linear, one missing piece of data held up the entire submission. That much interlinked data in one place was also what the developers couldn't stabilize.
  3. **Media**, layout *Annotated image*: 📍 `part-2/assets/0211…` (3 pins), alt `Four screens from the previous design, each a wide table`. Legend:
     1. Every level of the plan is a wide table with its own horizontal scrollbar.
     2. Resources and responsible persons sit behind buttons at the far end of each activity row.
     3. Columns run past the edge of the card, out of view until you scroll.

**4 · Story section** *(Constraints)*
- Heading: `Constraints`
- Content:
  1. **Card grid**, 2 cards:
     - `1 designer, 3 developers`: Design alongside development
     - `Staff aged 20–60`: Mixed comfort with software

**5 · Statement**
- Label: `The Challenge`
- Statement: Restructure the plan so staff could fill it in, and developers could build it, one part at a time, without losing the link between what a unit plans and what it buys.

**6 · Process**
- Chapter nav label: `Process`
- Heading: `The Process`
- Intro: Design ran alongside development, so each step went to the developers as soon as it was ready.
- Steps:
  1. `Diagnose the stalled build`: Reviewed the inherited design, talked with the developers, and read the complaints already coming in.
  2. `Restructure the plan`: Split the single form into the plan's own levels, each saving on its own.
  3. `Design each level`: An item library for resources. Kept the card view and added a table view.
  4. `Lock and submit together`: Worked out the AOP lock with the developers, then the combined submission and approval timeline.
- Note: Feedback loop at step 03: staff asked for a list like their Excel sheets, so I added the table view.

**7 · Key Decisions**
- Chapter nav label: `Decisions`
- Heading: `Key Decisions`
- Headline: `Three decisions, and the reasoning behind each`

*Decision 1*
- Headline: `Split the plan along its own hierarchy`
- Glance card title: `Separate levels, separate saves`
- Glance card summary: The plan is split into objectives, activities, resources and responsible persons, each on its own page.
- Explanation (two paragraphs):
  - Since the form already saved drafts, more save points weren't the fix. The structure was. I broke the plan into the levels it already had (objectives, then activities, then resources and responsible persons), each on its own page and saved independently.
  - Resources are added inside a specific activity, so every item stays attached to the objective it supports. That link is what later made it possible to generate the PPMP directly from the AOP.
- Side notes:
  - `Considered`: Keeping the single form and adding save points. It already had drafts, so this wouldn't have fixed how hard the fields were to reach.
  - `Also solved`: Traceability. Every item now belongs to an activity, and every activity to an objective.
- Media, layout *Side-by-side pair*:
  - 📍 `part-3/assets/c837…` (pin 1), label `Before`, alt `Previous design: functions and objectives in one wide table`
  - 📍 `part-3/assets/4b55…` (pin 2), label `After`, alt `Redesigned objectives page with one card per objective`
  - Legend: (1) The old form: every objective is a table row, and its activities open from a button at the far right. (2) The new objectives page: one card per objective, each opening its own activities page.

*Decision 2*
- Headline: `Pick items instead of typing them`
- Glance card title: `Items from a library`
- Glance card summary: Resources are picked from the hospital's item library, with expense class and price already attached.
- Explanation:
  - Resources are chosen from the hospital's item library rather than typed in. Each item already carries its expense class (MOOE, CO, or PS) and unit price, which targets two of the old problems: duplicate entries and totals worked out by hand.
  - The earlier design showed items as product cards with photos, and I kept that view. Some staff wanted something closer to the Excel lists they knew, with the item name first, so I added a table view. People can switch between the two.
- Side notes:
  - `Feedback`: Staff asked for a familiar, list-style view. Other feedback led to smaller changes, mostly fields people expected to see.
  - `Why keep both`: Cards help when browsing. A list helps when you already know the item's name.
- Media 1, *Single image*: `part-3/assets/b6be…`, alt `Item Information Library with classification, budget and variant for each item`, caption `The item library. Each item carries its classification, category and estimated price before anyone adds it to a plan.`
- Media 2, *Side-by-side pair*: `part-3/assets/770c…` label `Card view · earlier design`, alt `Resource selection in card view`; `part-3/assets/cd03…` label `Table view · added from feedback`, alt `Resource selection in table view, item names first`

*Decision 3*
- Headline: `Lock the AOP before the PPMP is generated`
- Glance card title: `Lock, then submit together`
- Glance card summary: Finalizing the AOP locks it and generates the PPMP. Both go out as one request.
- Explanation:
  - This came out of a discussion with the developers. Because the PPMP is generated from the AOP, an edit afterward could leave the PPMP pointing at something that no longer exists. Removing a resource, for example, would break the PPMP after budget planning had already started on it.
  - So finalizing the AOP locks it. A confirmation explains the lock before it happens, and the user confirms with an authorization PIN. Both plans are then submitted together, and an approval timeline shows which office has the request, replacing the printed copy that used to travel from desk to desk.
- Side notes:
  - `Came from`: A logic conflict the developers and I found together.
  - `Trade-off`: Flexibility. Once locked, the AOP can only change if reviewers return it.
- Media, *Annotated image*: 📍 `part-3/assets/200a…` (3 pins), alt `Finalize AOP dialog, submission confirmation with PIN, success message and approval timeline`. Legend:
  1. Finalizing explains the lock before it happens.
  2. The AOP and PPMP go out as one request, confirmed with a PIN.
  3. The approval timeline shows every office in order, from Department Head to Medical Center Chief.

## Tab: Outcome

| Field | Value |
|---|---|
| Outcome Headline | `Built, but not yet proven in use` |
| Results | replace the current 3 with: `5 weeks` / `from the redesign to a working MVP`, and `6 months` / `the build had stalled before I joined` |

**Outcome Notes**
1. Label `Delivered`, as a **bulleted list**:
   - I designed the AOP-to-PPMP workflow: the split into levels, item selection, the lock, and combined submission.
   - Two frontend developers and one backend developer built it into a working MVP.
2. Label `Not yet verified`, bulleted list:
   - The system hasn't been deployed. Staff still plan in Excel.
   - Testing with planning staff is on hold while the planning process moves to the Budget Office.
   - The fixes for traceability, duplicates, totals and approvals are built into the design but untested in real use.

**Reflection**
- Headline: `The fix was in the data flow, not the screens`
- Text: My most useful changes were to how data moved through the plan, not to how the screens looked. Breaking one large requirement into parts that save independently was what unblocked the developers. It's also the change I expect to matter most to staff, though that still has to be confirmed once they're using it.

**Design Showcase Images** (replace or append; each image's Title + Caption):
1. `part-4/assets/af7c…`: **Resources for one activity.** Quantities and per-item and total costs, with the activity's timeframe and targets above.
2. `part-4/assets/6609…`: **AOP submission summary.** Counts for every level and the total cost, reviewed before anything is locked.
3. `part-4/assets/bda9…`: **PPMP overview.** The unit's own PPMP and the Dispensing Supply PPMP, kept separate, each with its checklist and approval timeline.
4. `part-4/assets/e955…`: **Approver review.** Reviewers go through each activity, mark it reviewed, and leave comments.

*Hero collage note:* the collage is built from the thumbnail plus the first
showcase images, so it will show `4b55…`, `af7c…`, `6609…`, `bda9…`. The
reference's `part-1/assets/2b2a…` (AOP overview) isn't used anywhere. Add it
as a showcase image if you want it.

## Tab: Legacy

Leave as is. Once Story sections has content, the page ignores this tab for
the ERP project. Nothing here is deleted.

---

## While you enter it, note anything that felt confusing

That's the point of entering it by hand (D16). Examples worth reporting: a
field you couldn't find, a label that didn't say what it does, a validation
message that blocked you, or a section type that didn't fit what you wanted to
say.
