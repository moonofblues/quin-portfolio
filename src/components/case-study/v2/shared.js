// Shared constants for the v2 case study page (ADR 0011). Every section
// pulls its type scale from here so content can vary while rhythm doesn't.

export const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.5 },
};

// Outer frame of every full-width block on the page (hero, sections, nav).
// One constant so the page width is a one-line change.
export const PAGE_WIDTH = "w-full max-w-[96rem] mx-auto px-6 lg:px-10";

// Vertical rhythm, in three tiers by how closely things relate. Change the
// spacing here, not per file.
//  - BLOCK_GAP: between blocks inside one section (text, media, card grids).
//  - HEADER_GAP: from a section's heading down to its content.
//  - SECTION_GAP: between sections of the same chapter.
//  - CHAPTER_START: extra air above a section that opens a new chapter (the
//    ones in the sticky chapter bar). It is padding on a wrapper, not a margin,
//    because margins between siblings collapse instead of adding up.
export const BLOCK_GAP = "space-y-14 md:space-y-16";
export const HEADER_GAP = "mb-12 md:mb-16";
export const SECTION_GAP = "mb-28 md:mb-36";
export const CHAPTER_START = "pt-12 md:pt-16";

// Heading column left, prose column right, from lg up (stacked below). Shared
// by SectionShell and Reflection so the text always lines up the same way.
export const SPLIT_COLUMNS =
  "lg:grid lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-x-16 xl:gap-x-24";

export const EYEBROW =
  "font-display text-[12px] uppercase tracking-[0.14em] text-accent";
export const H2 =
  "font-display text-2xl md:text-3xl lg:text-4xl leading-tight text-text-primary";
export const H3_CAPS =
  "font-display text-sm uppercase tracking-wider leading-snug text-text-primary";

// Offset for in-page jumps: fixed site nav + sticky chapter bar.
export const SCROLL_OFFSET = "scroll-mt-36";

export function slugify(text = "") {
  return (
    text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "") || "section"
  );
}

// Turns legacy plain text into Portable Text so the adapter's sections render
// through the same RichText component as real ones. Blank lines split
// paragraphs.
export function textToBlocks(text) {
  if (!text?.trim()) return [];
  return text
    .split(/\n\s*\n/)
    .map((para, i) => ({
      _type: "block",
      _key: `p${i}`,
      style: "normal",
      markDefs: [],
      children: [{ _type: "span", _key: `s${i}`, text: para.trim(), marks: [] }],
    }));
}

// The Behance link for a project: the Embeds entry wins; the old "legacy"
// field is a fallback so links not yet re-entered in Studio still show up.
export function getBehanceUrl(detail) {
  return (
    detail?.embeds?.find((e) => e.platform === "behance" && e.url)?.url ||
    detail?.behanceUrl ||
    null
  );
}

export const decisionId = (index) => `decision-${index + 1}`;

// Big centred statements only read well when short; longer text drops to a
// left-aligned, smaller treatment (same ~30-word rule as The Problem).
export function isShortStatement(text) {
  return (text?.trim().split(/\s+/).length ?? 0) <= 30;
}
