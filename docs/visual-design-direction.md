# Visual experience: design direction

Written 2026-11-18 with Quin, after reviewing eleven reference screenshots.
This is the art direction for the Visual experience (ADR 0014): film,
photography and graphic design at `/visual`. The build order is in
[`visual-experience-plan.md`](visual-experience-plan.md), and a working
prototype is in [`reference/visual-direction/prototype.html`](reference/visual-direction/prototype.html).

Status: direction agreed, prototype reviewed in a browser, **not built into
the site yet**. Open items are listed at the end.

## 1. What we took from the references, and what we didn't

The references share a recipe: one ink on paper or black, grain and
halftone texture, huge tightly set lowercase type, ticker bands, a casual
voice, and a personal motif built into the type (Alexis's eye inside the
letters). Quin's answer on what drew him to them: *"the uniqueness and
coolness"*, specifically the giant names, grain texture and single ink.

**Kept:** giant lowercase name, single ink, grain and halftone, ticker band,
informal voice, tiny mono labels.

**Not copied:** red-on-cream or black-and-red palettes, the eye motif, name
laid over a face, the stepped skills columns. That recipe is already common,
so the design needs its own concept (see ADR 0010).

**Quin's choices:** blue, not dark-by-default, and his work is **warm and
saturated**. That drove the main decision below.

## 2. The concept: lights up, lights down

The site has two lighting states.

- **Lights up** (index, About, Contact): warm paper with cyanotype-blue ink.
  Work appears as a printed contact sheet, tinted into the ink.
- **Lights down** (opening a film or photo set): the paper dims to
  blue-black and the work appears in **true colour**, like a screen in a
  dark room.

Why this works for Quin's work:

- Warm, saturated photos against a blue frame is a complementary pairing.
  Tinting the photographs blue everywhere would throw away exactly what makes
  them his, so the tint is limited to index thumbnails, and colour returns on
  hover, focus and on every detail page.
- Paper-light keeps Visual clearly separate from the Product site (dark with
  lavender and mint). Blue-on-dark would have looked like a sibling of it.
- It gives the one signature transition a meaning: opening a work is the
  house lights going down.
- **Graphic design stays on paper**, because print pieces belong in light.

## 3. Colour

One ink plus paper. Contrast ratios are hand-calculated approximations.

| Token | Value | Use | Contrast |
| --- | --- | --- | --- |
| `--paper` | `#EEE8D6` | Lights-up ground (warm, so warm photos sit well) | |
| `--paper-2` | `#E4DDC7` | About band | |
| `--ink` | `#0B2FB3` | Display type, ticker, frames, credits band | 8.3:1 on paper |
| `--ink-deep` | `#071E78` | Ticker rules | |
| `--text` | `#0A1030` | Body text | about 15:1 on paper |
| `--night` | `#050818` | Lights-down ground | |
| `--ink-light` | `#8EA2FF` | The ink, lifted for dark grounds | 8.2:1 on night |
| `--cream-on-night` | `#EEE8D6` | Type on night | about 16:1 |

No second accent colour. The work supplies the colour.

## 4. Typography

Three families, loaded only on Visual pages (ADR 0014):

- **Bricolage Grotesque** 800, lowercase, for names and headings. Tracking
  `-0.04em` and `font-stretch: 90%`. Tighter than that (we tried -0.065em at
  80% stretch) fuses letters into blobs; the prototype fixed this.
- **Instrument Serif**, regular and italic, for the voice: the tagline,
  captions, About prose.
- **DM Mono**, uppercase, small (11.5px and up), for frame numbers, years,
  runtimes, credits.

Giant type is lowercase display only. Body copy stays in sentence case.

## 5. The experience, section by section

**Hero.** The name, `quin ledesma`, is the headline, set as large as the
screen allows. Four frames from a contact sheet sit above and beside it,
tinted into the ink with a halftone texture. Hovering or focusing a frame
"develops" it into full colour. Nothing auto-plays, and the first thing a
visitor sees is the name and the work, never a menu.

**Ticker band.** A blue strip that repeats `film / photography / graphic
design`. It is also navigation: each word jumps to that section. It pauses on
hover and becomes a scrollable row under reduced motion.

**Index (work).** One contact sheet, three groups: film (A), photography
(B), graphic design (C). Every frame has a number and a one-line caption.
Film frames are 16:9 with the first one larger. Photography and graphic
design use columns so every piece keeps its own proportions and nothing is
cropped into a square.

**Detail, lights down.** Opening a film puts the lights down: a 16:9 player
in true colour, a grid of stills, and a short credits block. Opening a photo
set follows the existing photo-set layout rules (ADR 0013), including the
highlighted photos and the recognition stamp. A "next" link continues to the
next work. Esc or "lights up" returns to the index with focus restored.

**About, the slate.** A film slate (roll, scene, shot in) with Quin's portrait
as a cyanotype and a short, warm paragraph. It is deliberately not a generic
"about me" block.

**Contact, end credits.** "thanks for watching." in the largest type on the
page over the ink colour, followed by a short credits-style list. No form.
Contact is email and social links, which keeps the page fast and simple.

**Navigation.** A slim fixed bar: `ql / visual` on the left (links home),
`work · about · contact` and a small `design & dev ↗` link to the Product
experience on the right. The same cross-link repeats in the footer. The name
lockup matches the Product site, which is the common thread between the two.

## 6. Motion

Restrained. Only transforms and opacity, all one-shot except the ticker.

1. Frame develop (opacity crossfade, about 0.5s).
2. Lights down and up (opacity fade, about 0.4s). This is the one signature
   moment.
3. The ticker (CSS only, infinite).

No parallax, no cursor effects, no scroll-jacking, no entrance animations
that delay the first image. `prefers-reduced-motion` stops the ticker and
removes transitions.

## 7. Responsive

Checked in the prototype at desktop width and a 390px frame. On phones the
hero keeps the name and two frames, the film grid becomes one column, photo
and graphic columns drop to two and then one, the slate becomes a single
column, and the `design & dev` pill hides from the top bar (it stays in the
footer). No horizontal overflow.

## 8. Performance and asset rules

- **Tint and texture are baked into image files**, not computed in the
  browser. In the prototype the duotone is a live CSS blend so it can be
  tweaked; in production each index image has a pre-tinted version, a
  true-colour version and a halftone overlay, as WebP. Live blend modes and
  filters on large images are expensive on phones.
- True-colour originals load only on hover, focus or the detail page.
- **YouTube loads on click** (a poster image with a play button, then the
  iframe), so a page with six films does not load six players.
- Fonts load only when a Visual route opens.
- Every above-the-fold image has explicit dimensions, and only one is eager.

## 9. What this means for content

These came from checking Sanity, not from taste:

- **Photography:** the one published photo set (Fujifilm Nationwide Photo
  Walk 2026) has **no photos uploaded yet**, so there is nothing real to show.
- **Film:** nothing is published yet. The video page (plan Step 6) needs its
  own ADR, and YouTube is the working assumption.
- **Graphic design:** 14 published pieces, and most are institutional posts
  for the hospital IT team (announcements, tips, greetings). They suit the
  Product audience, and the Converse concept poster is the one strongly
  "art" piece. Visual's graphic section should be **curated**, with only the
  pieces that show craft. Which pieces appear is controlled by tagging
  Categories in Studio (ADR 0009), so no code change is needed to curate.
- The blue ink matches the graphic work, which already leans blue.

## 10. Risks and trade-offs

- **Tinted thumbnails misrepresent colour.** Mitigated by colour on hover,
  focus and every detail page, and by never tinting a work on its own page.
- **Touch devices have no hover.** Needs a decision at build time: tap
  once to develop, tap again to open, or show true colour on in-view frames.
  The prototype only handles hover and keyboard focus.
- **Three type families and heavy textures** can feel busy. The rule is
  large lowercase display, quiet body text, and everything else small.
- **The look depends on real photographs.** With placeholder gradients the
  index looks sparse. The first real sets will tell us whether the tint
  strength and halftone size need adjusting.

## 11. Open items

1. Quin to upload photos to the Fujifilm photo set and supply a first film
   (YouTube link) so the design can be tuned against real work.
2. Choose how touch devices "develop" a frame (see risks).
3. Confirm the Introduction's Visual line (plan Step 7).
4. Real contact details and social links for the credits block.
5. Decide which graphic design pieces are curated into Visual.
