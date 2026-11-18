# Film: how to add one in Studio

A short field guide, in the same spirit as the other paste sheets in this
folder. A film is a **project** with Type **Film**. Everything on its page
comes from the fields below.

**Preview while you work:** run `npm run dev`, then open
`http://localhost:5173/visual/<slug>` (the slug Studio makes from the title).
An old `/work/<slug>` link redirects there.

---

## Tab: Card & meta

| Studio field | Enter |
|---|---|
| Title | The film's title |
| Subtitle | *optional* |
| Slug | *leave as is* |
| Type | **Film** |
| Status | **Draft**, then **Published** when you're happy |
| Categories | A **Video** category (this puts it in the Video Focus) |
| Featured | *optional*. Featured work comes first on the Visual index |
| **Thumbnail** | **Required.** A strong frame from the film. It is the poster shown before the video plays and the film's picture on the Visual index and hero |
| Short Description | One line, used when the page has no synopsis |
| Year | e.g. **2026** |
| Role | e.g. **Direction, camera, edit** (shown on the page) |
| Client | *optional* (shown on the page) |

## Tab: Film (appears once Type is Film)

| Studio field | Enter |
|---|---|
| **YouTube link** | **Required.** Paste the video's address: a watch link, a `youtu.be` link or a Shorts link all work |
| Runtime | *optional*, as written, e.g. **3:12** |
| Synopsis | *optional*. Two or three sentences |
| Gear | *optional*, e.g. the camera and lens |
| Credits | *optional*. Add one row per person: **Role** and **Name**, in reading order |
| Stills | *optional*. Frames from the film. Each needs **alt text**; a caption is optional. They open in the full-screen viewer |

## What a visitor sees

1. A giant lowercase title on a blue-black page, then the synopsis and a
   one-line `year · runtime · role · client`.
2. The **poster with a play button**. The video does not load until they press
   play.
3. Your **stills**, then role, gear and credits.
4. A "next film" link when there is more than one film.

## Notes

- A film without a thumbnail will not publish: Studio shows an error on the
  Thumbnail field.
- The film appears on the Visual index (`/visual`) in the **film** group once
  it is published and has a thumbnail.
