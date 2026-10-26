// Shared constants for the v2 case study page (ADR 0011). Every section
// pulls its type scale from here so content can vary while rhythm doesn't.

export const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.5 },
};

export const EYEBROW =
  "font-display text-xs uppercase tracking-[0.14em] text-accent";
export const H2 =
  "font-display text-2xl md:text-3xl lg:text-4xl leading-tight text-text-primary";
export const H3_CAPS =
  "font-display text-sm uppercase tracking-wider leading-snug text-text-primary";

// Outer frame of every full-width block on the page (hero, sections, nav).
// One constant so the page width is a one-line change.
export const PAGE_WIDTH = "w-full max-w-[96rem] mx-auto px-6 lg:px-10";

// Heading column left, prose column right, from lg up (stacked below). Shared
// by SectionShell and Reflection so the text always lines up the same way.
export const SPLIT_COLUMNS =
  "lg:grid lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-x-16 xl:gap-x-24";

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

export const decisionId = (index) => `decision-${index + 1}`;

// Big centred statements only read well when short; longer text drops to a
// left-aligned, smaller treatment (same ~30-word rule as The Problem).
export function isShortStatement(text) {
  return (text?.trim().split(/\s+/).length ?? 0) <= 30;
}
