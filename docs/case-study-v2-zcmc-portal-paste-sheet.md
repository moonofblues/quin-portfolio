# ZCMC Portal website redesign case study: v2 paste sheet

Field-by-field guide for entering this case study into the existing project in
Studio (slug `zcmc-website-redesign`). Same format as
`case-study-v2-erp-paste-sheet.md`.

**How to use this sheet:** it follows Studio **exactly, top to bottom**. Every
field you'll see in Studio has a line here, even the ones you skip. Each `##`
heading is a Studio tab, and each `###` heading is a box (or a section) inside
that tab.

- **Bold value / `code`** → type or paste it in.
- *leave as is* → don't touch it, even if it already has something in it.
- *leave empty* → don't fill it in.

**Preview while you work:** run `npm run dev`, then open
`http://localhost:5173/work/zcmc-website-redesign?v=2`.

**Images** are your screenshots in `C:\Users\eledesma\Pictures\Screenshots\`
and your Figma exports in `D:\Users\Documents\Quin\UI UX\ZCMC Website\`. They're
called by a short name:

| Short name | File | What it shows |
|---|---|---|
| **Figma frames** | `Screenshot 2026-11-17 094717.png` | Early Figma frames (landing page v2, desktop view, news CMS) |
| **Figma landing** | `Initial - Light Mode.png` | Early Figma design of the landing page (for the public) |
| **Figma portal** | `Initial - Frame.png` | Early Figma design of the employee portal |
| **Hero dark** | `Screenshot 2026-11-17 100028.png` | Coded hero, dark mode, with "Open portal" button |
| **Hero light** | `Screenshot 2026-11-17 100043.png` | Coded hero, light mode |
| **About** | `Screenshot 2026-11-17 101044.png` | "Committed to Your Health" section |
| **News** | `Screenshot 2026-11-17 101150.png` | "Latest news and events" section |
| **Visit** | `Screenshot 2026-11-17 101351.png` | "Visit Us Today" with map, dark mode |
| **History** | `Screenshot 2026-11-17 101414.png` | Legal mandate and History page |
| **Office** | `Screenshot 2026-11-17 101452.png` | Office of the Medical Center Chief page |
| **Services** | `Screenshot 2026-11-17 101530.png` | "All healthcare services" page |
| **Admin services** | `Screenshot 2026-11-17 101558.png` | Admin tool: services list |
| **Admin text** | `Screenshot 2026-11-17 101622.png` | Admin tool: "Website text and images" with preview |
| **Admin news** | `Screenshot 2026-11-17 101650.png` | Admin tool: write a news article |
| **Portal** | `Screenshot 2026-11-17 101740.png` | Employee portal: connected systems, announcements, guides |

> I haven't looked at 10 of your 28 screenshots (`101401`, `101502`, `101516`,
> `101543`, `101550`, `101605`, `101613`, `101631`, `101704`, `101721`). This
> sheet doesn't use them. If one is better than what I picked, swap it in.

> ⚠️ **I can't tell which screenshot is the old site.** You said the old
> reference is in the screenshots, but none of the ones I opened is the
> original broken site. Section 1 has an optional slot for it. Tell me which
> file it is, or leave that slot out.

> ⚠️ **Fix these before uploading.** Hiring managers will zoom in.
> - **Test data:** *Admin news* shows the headline `sdfsdf` and summary `sdfds`.
>   Type a real article before taking that screenshot.
> - **Placeholder phone:** *Office* shows the phone as `000`.
> - **Typo:** *Visit* and the light-mode Visit page say "vehicles.s".
> - **Empty map:** the light-mode Visit Us page shows an empty grey circle where
>   the map should be.
> - **"Not yet available"** shows next to every guide in *Portal*.

> ⚠️ **Pins.** Decisions 2 and 3 use numbered pins. Per decision D11, pins live
> *in the image*. Before uploading, draw the numbered circles (lavender
> `#a99ce4` fill, dark `#07090d` number, Krona One) in Figma onto the images
> marked **📍**. Where each pin goes is listed with the image.

> ⚠️ **Old text in Studio disagrees with what you told me.** The current
> project (from `src/data/projects.js`) says it's a "Public-Facing" site that
> "launched", with "100% mobile responsive", "WCAG 2.1 accessibility
> compliant", "3s average load time", "6 months", "surveyed patients and
> visitors", "worked with department heads", and year `2024`. None of that came
> from you, and the project isn't live. This sheet replaces or removes all of
> it. Tell me if any of it is actually true.

> **Solution at a Glance** (the cards under The Problem) has no fields of its
> own. It's built from the *Key Decisions* section, so it looks empty until
> you've filled that in.

---

## Tab: Card & meta

### Box: Basics

| Field | Value |
|---|---|
| Title | `ZCMC Portal Website Redesign` |
| Subtitle | `Hospital Landing Pages, Employee Portal and Admin Tool` *(the old one says "Public-Facing", which is no longer true)* |
| Slug | *leave as is.* **Don't click "Generate"** |
| Type | *leave as is* (Case Study) |
| Status | *leave as is* (Published) |
| Categories | *leave as is* |
| Featured | *leave as is* |
| Sort Order | *leave as is* |

### Box: Project card

| Field | Value |
|---|---|
| Thumbnail | Upload **Hero dark**. It also becomes the first hero collage frame |
| Tags | Remove the old ones, then add: `UI/UX Design`, `Web Design`, `Front-End Development`, `Healthcare` |
| Short Description | `A hospital landing site, employee portal and admin tool, rebuilt from a broken base. Still in progress.` |
| Impact (one-liner) | `In progress, going live soon` |

### Box: Case study details

| Field | Value |
|---|---|
| Year | `2025` |
| Duration | `Started 2025 · built in free time, on and off` |
| My Role | `UI/UX Designer & Front-End Developer` |
| Team (optional) | `Just me` |
| Client | *leave as is* (`Zamboanga City Medical Center`) |
| Project Status (optional) | Pick the option closest to **In progress**. If there isn't one, tell me |
| Tools Used | Remove the old ones (HTML/CSS, JavaScript, CMS…), then add: `Figma`, `Claude AI` |
| Live URL | **Clear it if it points to a live public site.** The project isn't live yet |

---

## Tab: Story

| Field | Value |
|---|---|
| Headline (optional) | `From a public hospital website to an employee portal, and the admin tool behind it` |
| Overview | The hospital's existing website was a base that didn't work: its news was hardcoded and the pages didn't feel like one site. I redesigned it, then changed direction when I learned a mandatory national site already serves the public. It's now an employee landing site and portal, with an admin tool to edit its content. It is still in progress. |
| The Problem | The existing site was a base that didn't work: news was hardcoded and the pages weren't cohesive. |
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
| Headline (optional) | `A base that didn't work` |
| Content | Add the 1 or 2 items below |

1. **Text:** The hospital's existing site had a base, but it didn't work. The news was hardcoded, so it couldn't be updated without changing code, and the pages didn't feel like one site.
2. **Media** *(optional, only if you have a screenshot of the old site)*
   - Layout: *Single image*
   - Image: the old site screenshot *(tell me which file)*
     - Alt text: `The hospital's previous website`
     - Label: *leave empty*
     - Caption: *leave empty*
   - Numbered legend: *leave empty*

### Section 2 · Story section (What I Worked From)

| Field | Value |
|---|---|
| Chapter nav label (optional) | `Evidence` |
| Eyebrow (optional) | *leave empty* |
| Heading | `What I Worked From` |
| Headline (optional) | `Who it was for, what was missing, what others did` |
| Content | Add the 1 item below |

1. **Card grid**, Small heading *leave empty*, 4 cards:

   | Title | Text |
   |---|---|
   | `Who it was for` | I worked out what the public needs from a hospital website, including regular patients, citizens and businesses. |
   | `The current page` | I went through the existing landing page and listed what it was missing. |
   | `Other websites` | I compared it with other websites and collected a list of inspiration. |
   | `The people at the hospital` | I considered the age range of the people at the institution. |

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
   | `Just me` | Design and code, with no team |
   | `Free time only` | Sometimes twice in one month, then nothing for three months |
   | `Not the priority` | Other hospital systems came first |

### Section 4 · Statement

| Field | Value |
|---|---|
| Chapter nav label (optional) | *leave empty* |
| Eyebrow (optional) | *leave empty* |
| Label | `The Challenge` (already filled in for you) |
| Statement | Turn a base that didn't work into one cohesive site, and give staff a way to change what it shows without touching code. |

### Section 5 · Process

| Field | Value |
|---|---|
| Chapter nav label (optional) | `Process` |
| Eyebrow (optional) | *leave empty* |
| Heading | `The Process` |
| Intro (optional) | This was built in my free time, so the work happened in bursts over more than a year. |
| Steps | Add the 5 steps below |
| Note (optional) | Direction change at step 05: I was advised not to ship it as a public site, so it became an employee landing site and portal. |

| # | Step Title | Step Description |
|---|---|---|
| 1 | `Work out who it's for` | Listed what regular patients, citizens and businesses need from a hospital website, and thought about the age range of the people at the institution. |
| 2 | `Review the current page` | Went through the existing landing page, found what was missing, and compared it with other websites and a list of inspiration. |
| 3 | `Design the landing page in Figma` | I was asked to do only the landing page at first. I designed it in Figma and drew the icons for it. |
| 4 | `Code it, then improve it` | Coded the design. Months later, I used AI to improve the design. |
| 5 | `Change direction` | Plans changed: it became an employee landing site and portal. I used AI to revamp the code, and added more pages and an admin tool to manage the content. |

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

#### Decision 1

| Field | Value |
|---|---|
| Headline | `Stop building a public site, and make it for employees` |
| Glance card title | `Employees, not the public` |
| Glance card summary | A mandatory national hospital website already serves the public, so this became a landing site and portal for employees. |
| Explanation | Two paragraphs (press Enter between them): ↓ |

> Partway through, I was advised not to continue it as a public-facing website. The DOH already has an official, mandatory website, and we noticed that other DOH hospitals don't run a public website of their own beyond it. A second public site would have duplicated that.
>
> So I kept the design work and changed who it was for. The landing pages now introduce the hospital to employees, and an "Open portal" button leads to the employee portal. I added more pages, and an admin tool to manage what they show.

Side notes:

| Label | Text |
|---|---|
| `Came from` | Advice from colleagues, and seeing that other DOH hospitals have no public site of their own. |

Media, add 1:
- Layout: *Side-by-side pair (e.g. before / after)*
- Image 1: **Figma landing**
  - Alt text: `Early Figma design of a public landing page`
  - Label: `Early design · for the public`
  - Caption: *leave empty*
- Image 2: **Hero dark**
  - Alt text: `Coded landing page with an Open portal button`
  - Label: `Now · landing page with an Open portal button`
  - Caption: *leave empty*
- Numbered legend: *leave empty*

#### Decision 2

| Field | Value |
|---|---|
| Headline | `Let staff edit the site in plain words` |
| Glance card title | `An admin tool with a live preview` |
| Glance card summary | Services, news, highlights, offices and page text can all be changed from one admin tool, with a preview of what's being edited. |
| Explanation | Two paragraphs: ↓ |

> The old site's news was hardcoded. So the new site has an admin tool where the hospital changes what the landing pages show: services, news, highlights, offices, and the information about the hospital.
>
> The tool uses plain labels, like "Website text and images" and "Pick a part of the website, then change its words or pictures", and a preview that updates as you type. Writing a news article comes with a "Ready to publish?" checklist, and you can save a draft or publish.

Side notes:

| Label | Text |
|---|---|
| `Fixes` | The old site's hardcoded news. |

Media, add 2:
1. Layout: *Annotated image (numbered legend)*
   - Image: 📍 **Admin text** (3 pins)
     - Alt text: `Admin tool editing the homepage hero, with fields on the left and a live preview on the right`
     - Label: *leave empty*
     - Caption: *leave empty*
   - Numbered legend, 3 lines:
     1. Each part of the website is a card you pick, with a short description. *(pin on the row of cards: Hero, About, Contact…)*
     2. Plain fields with a hint under each one. *(pin on "Title, first line")*
     3. The preview shows what you're editing, and updates as you type. *(pin on the "Preview" box)*
2. Layout: *Single image*
   - Image: **Admin services**
     - Alt text: `Admin list of hospital services with search, status and category filters`
     - Label: *leave empty*
     - Caption: `Services can be searched, filtered by status or category, edited and added.`
   - Numbered legend: *leave empty*

#### Decision 3

| Field | Value |
|---|---|
| Headline | `One place to open every hospital system` |
| Glance card title | `One login, every system` |
| Glance card summary | Employees sign in once and open every connected system from one page. |
| Explanation | Two paragraphs: ↓ |

> The hospital runs several separate systems. The portal lists them in one place, so employees sign in once and open any of them from there, instead of finding each one separately.
>
> The same page carries announcements, filtered by Memorandum, Circular or Advisory, and the user manuals for the systems.

Side notes:

| Label | Text |
|---|---|
| `Also on the page` | Announcements, and a list of guides for each system. |

Media, add 1:
- Layout: *Annotated image (numbered legend)*
- Image: 📍 **Portal** (3 pins)
  - Alt text: `Employee portal with connected systems, announcements and user guides`
  - Label: *leave empty*
  - Caption: *leave empty*
- Numbered legend, 3 lines:
  1. Every connected system, one click away. *(pin on the "Open a system" list)*
  2. Announcements, filtered by type. *(pin on the All / Memorandum / Circular / Advisory buttons)*
  3. User guides, next to the announcements. *(pin on the "Guides" list)*

---

## Tab: Outcome

This tab is in the same order as the bottom of the page: Showcase first,
then the Outcome, then the Reflection.

### Design Showcase Images

Replace the current images with these 4, in this order. Click an image to
open its *Title*, *Caption* and *Alt text* fields.

| # | Image | Title (optional) | Caption (optional) | Alt text (optional) |
|---|---|---|---|---|
| 1 | **Services** | `All healthcare services.` | Search, and filter by category. | `All healthcare services page` |
| 2 | **Office** | `An office page.` | Each office has its head, contact details and an About section. | `Office of the Medical Center Chief page` |
| 3 | **History** | `Legal mandate and history.` | A side menu jumps between sections. | `Legal mandate and history page` |
| 4 | **Admin services** | `Admin: services.` | Staff add, edit and filter the services the site shows. | `Admin tool services list` |

*Hero collage note:* the collage at the top of the page is built from the
thumbnail plus the first showcase images, so it will show **Hero dark**,
**Services**, **Office**, **History**.

### The rest of the tab

| Field | Value |
|---|---|
| Embeds (optional) | *leave as is* |
| Outcome Headline (optional) | `Still in progress, built and not live yet` |
| Results | Delete the current 3 (100%, WCAG 2.1, 3s), then add the 1 below |
| Outcome Notes (optional) | Add the 2 notes below |
| Reflection (optional) | *leave empty.* You haven't told me what you learned yet. Tell me and I'll draft it |

**Results** (each has *Metric* and *Label*):

| Metric | Label |
|---|---|
| `In progress` | `not live yet, planned to go live soon` |

**Outcome Notes** (each has *Label*, picked from a list, and *Text*). Use the
**bulleted list** button in the Text toolbar:

1. Label **Delivered**, Text as bullets:
   - I designed and coded the landing pages, the employee portal and the admin tool, using Figma and Claude AI.
   - The admin tool lets staff manage services, news, highlights, offices and page text.
2. Label **Not yet verified**, Text as bullets:
   - It isn't live yet, so it hasn't been used by employees.
   - Going live is planned for soon. Work on it is still going on, in my free time.

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
