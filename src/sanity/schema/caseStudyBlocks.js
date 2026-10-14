// Case study v2 building pieces (ADR 0011). Shared blocks are defined once
// here and reused by the four typed sections, which `project.sections[]`
// lists in story order. Every new *kind* of section needs a type here plus a
// renderer in src/components/case-study/v2/ — see docs/case-study-v2-plan.md.

// ── Shared types ────────────────────────────────────────────────────────

// Deliberately minimal: headings come only from schema fields (section
// heading, decision headline), so rich text can never break the page's
// typography hierarchy.
export const portableText = {
  name: "portableText",
  title: "Rich text",
  type: "array",
  of: [
    {
      type: "block",
      styles: [{ title: "Normal", value: "normal" }],
      lists: [
        { title: "Bullet", value: "bullet" },
        { title: "Numbered", value: "number" },
      ],
      marks: {
        decorators: [
          { title: "Bold", value: "strong" },
          { title: "Italic", value: "em" },
        ],
        annotations: [
          {
            name: "link",
            title: "Link",
            type: "object",
            fields: [
              {
                name: "href",
                title: "URL",
                type: "url",
                validation: (R) =>
                  R.required().uri({ scheme: ["http", "https", "mailto"] }),
              },
            ],
          },
        ],
      },
    },
  ],
};

export const caseStudyImage = {
  name: "caseStudyImage",
  title: "Image",
  type: "image",
  options: { hotspot: true },
  fields: [
    {
      name: "alt",
      title: "Alt text",
      type: "string",
      description: "Describe the image for screen readers. Required.",
      validation: (R) => R.required(),
    },
    {
      name: "label",
      title: "Label (optional)",
      type: "string",
      description: 'Small tag above the image in a pair, e.g. "Before" or "Table view"',
    },
    {
      name: "caption",
      title: "Caption (optional)",
      type: "text",
      rows: 2,
    },
  ],
};

// ── Blocks ──────────────────────────────────────────────────────────────

const IMAGE_COUNT = { single: 1, pair: 2, annotated: 1 };

export const richTextBlock = {
  name: "richTextBlock",
  title: "Text",
  type: "object",
  fields: [
    {
      name: "body",
      title: "Text",
      type: "portableText",
      validation: (R) => R.required(),
    },
  ],
  preview: {
    select: { body: "body" },
    prepare({ body }) {
      const text = body?.[0]?.children?.map((c) => c.text).join("") || "";
      return { title: text || "Text", subtitle: "Text" };
    },
  },
};

export const mediaBlock = {
  name: "mediaBlock",
  title: "Media",
  type: "object",
  fields: [
    {
      name: "layout",
      title: "Layout",
      type: "string",
      options: {
        list: [
          { title: "Single image", value: "single" },
          { title: "Side-by-side pair (e.g. before / after)", value: "pair" },
          { title: "Annotated image (numbered legend)", value: "annotated" },
        ],
        layout: "radio",
      },
      initialValue: "single",
      validation: (R) => R.required(),
    },
    {
      name: "images",
      title: "Images",
      type: "array",
      of: [{ type: "caseStudyImage" }],
      validation: (R) =>
        R.custom((images, context) => {
          const expected = IMAGE_COUNT[context.parent?.layout];
          if (!expected) return true;
          const count = images?.length ?? 0;
          return count === expected
            ? true
            : `This layout needs exactly ${expected} image${expected > 1 ? "s" : ""} (has ${count})`;
        }),
    },
    {
      name: "legend",
      title: "Numbered legend (optional)",
      type: "array",
      of: [{ type: "string" }],
      description:
        "One line per number drawn on the image(s), in order (item 1 = pin 1). Draw the numbered pins into the image itself before uploading. Works with any layout.",
    },
  ],
  preview: {
    select: { layout: "layout", media: "images.0", caption: "images.0.caption" },
    prepare({ layout, media, caption }) {
      const names = { single: "Image", pair: "Image pair", annotated: "Annotated image" };
      return { title: caption || names[layout] || "Media", subtitle: names[layout], media };
    },
  },
};

export const cardGridBlock = {
  name: "cardGridBlock",
  title: "Card grid",
  type: "object",
  fields: [
    {
      name: "heading",
      title: "Small heading (optional)",
      type: "string",
      description: 'Label above the grid, e.g. "Key questions"',
    },
    {
      name: "items",
      title: "Cards",
      type: "array",
      of: [
        {
          type: "object",
          name: "card",
          fields: [
            { name: "title", title: "Title", type: "string", validation: (R) => R.required() },
            { name: "body", title: "Text", type: "text", rows: 3 },
          ],
          preview: { select: { title: "title", subtitle: "body" } },
        },
      ],
      validation: (R) => R.required().min(1),
    },
  ],
  preview: {
    select: { items: "items" },
    prepare({ items }) {
      const count = items?.length ?? 0;
      return {
        title: items?.[0]?.title ? `${items[0].title}${count > 1 ? ` + ${count - 1} more` : ""}` : "Card grid",
        subtitle: `Card grid · ${count} card${count === 1 ? "" : "s"}`,
      };
    },
  },
};

export const calloutBlock = {
  name: "calloutBlock",
  title: "Callout",
  type: "object",
  fields: [
    {
      name: "label",
      title: "Label (optional)",
      type: "string",
      description: 'e.g. "Why it stalled" or "A note on validation"',
    },
    {
      name: "body",
      title: "Text",
      type: "portableText",
      validation: (R) => R.required(),
    },
  ],
  preview: {
    select: { label: "label", body: "body" },
    prepare({ label, body }) {
      const text = body?.[0]?.children?.map((c) => c.text).join("") || "";
      return { title: label || text || "Callout", subtitle: "Callout" };
    },
  },
};

// ── Sections ────────────────────────────────────────────────────────────

// Every section can start a chapter in the sticky chapter nav (ADR 0011).
const sectionCommonFields = [
  {
    name: "navLabel",
    title: "Chapter nav label (optional)",
    type: "string",
    description:
      "Fill in to start a new chapter in the page's chapter bar (e.g. \"Context\"). Leave empty to keep this section in the chapter above. Keep it to one or two words.",
    validation: (R) => R.max(24),
  },
  {
    name: "eyebrow",
    title: "Eyebrow (optional)",
    type: "string",
    description: "Small uppercase label above the heading",
  },
];

function sectionPreview(typeName) {
  return {
    select: { title: "heading", navLabel: "navLabel" },
    prepare({ title, navLabel }) {
      return {
        title: title || typeName,
        subtitle: navLabel ? `${typeName} · starts chapter "${navLabel}"` : typeName,
      };
    },
  };
}

export const storySection = {
  name: "storySection",
  title: "Story section",
  type: "object",
  description:
    "General-purpose section: heading, then any mix of text, media, card grids and callouts.",
  fields: [
    ...sectionCommonFields,
    { name: "heading", title: "Heading", type: "string", validation: (R) => R.required() },
    {
      name: "headline",
      title: "Headline (optional)",
      type: "string",
      description: "A larger one-line takeaway under the heading",
    },
    {
      name: "content",
      title: "Content",
      type: "array",
      of: [
        { type: "richTextBlock" },
        { type: "mediaBlock" },
        { type: "cardGridBlock" },
        { type: "calloutBlock" },
      ],
      validation: (R) => R.required().min(1),
    },
  ],
  preview: sectionPreview("Story"),
};

export const statementSection = {
  name: "statementSection",
  title: "Statement",
  type: "object",
  description: "One large sentence, e.g. The Challenge (the reframed design goal).",
  fields: [
    ...sectionCommonFields,
    {
      name: "heading",
      title: "Label",
      type: "string",
      initialValue: "The Challenge",
      validation: (R) => R.required(),
    },
    {
      name: "statement",
      title: "Statement",
      type: "text",
      rows: 3,
      description: "Reads best at ~40 words or fewer.",
      validation: (R) => R.required(),
    },
  ],
  preview: {
    select: { title: "heading", subtitle: "statement" },
  },
};

export const processSection = {
  name: "processSection",
  title: "Process",
  type: "object",
  fields: [
    ...sectionCommonFields,
    {
      name: "heading",
      title: "Heading",
      type: "string",
      initialValue: "The Process",
      validation: (R) => R.required(),
    },
    { name: "intro", title: "Intro (optional)", type: "text", rows: 2 },
    {
      name: "steps",
      title: "Steps",
      type: "array",
      of: [
        {
          type: "object",
          name: "step",
          fields: [
            { name: "title", title: "Step Title", type: "string", validation: (R) => R.required() },
            { name: "description", title: "Step Description", type: "text", rows: 3 },
          ],
          preview: { select: { title: "title", subtitle: "description" } },
        },
      ],
      validation: (R) => R.required().min(1),
    },
    {
      name: "note",
      title: "Note (optional)",
      type: "text",
      rows: 2,
      description: 'Shown under the steps, e.g. "Feedback loop at step 03: …"',
    },
  ],
  preview: sectionPreview("Process"),
};

export const decisionsSection = {
  name: "decisionsSection",
  title: "Key Decisions",
  type: "object",
  description:
    "Each decision also feeds the Solution at a Glance cards near the top of the page.",
  fields: [
    ...sectionCommonFields,
    {
      name: "heading",
      title: "Heading",
      type: "string",
      initialValue: "Key Decisions",
      validation: (R) => R.required(),
    },
    { name: "headline", title: "Headline (optional)", type: "string" },
    {
      name: "decisions",
      title: "Decisions",
      type: "array",
      of: [
        {
          type: "object",
          name: "decision",
          fields: [
            { name: "headline", title: "Headline", type: "string", validation: (R) => R.required() },
            {
              name: "glanceTitle",
              title: "Glance card title",
              type: "string",
              description: "Short title for this decision's Solution at a Glance card.",
              validation: (R) =>
                R.required().warning("Without it, this decision has no Solution at a Glance card"),
            },
            {
              name: "glanceSummary",
              title: "Glance card summary",
              type: "text",
              rows: 2,
              description: "One or two sentences for the glance card.",
            },
            { name: "body", title: "Explanation", type: "portableText" },
            {
              name: "notes",
              title: "Side notes",
              type: "array",
              description: 'Labelled notes like "Considered", "Trade-off", "Came from".',
              of: [
                {
                  type: "object",
                  name: "labeledNote",
                  fields: [
                    { name: "label", title: "Label", type: "string", validation: (R) => R.required() },
                    { name: "body", title: "Text", type: "text", rows: 3, validation: (R) => R.required() },
                  ],
                  preview: { select: { title: "label", subtitle: "body" } },
                },
              ],
            },
            {
              name: "media",
              title: "Media",
              type: "array",
              of: [{ type: "mediaBlock" }],
            },
          ],
          preview: {
            select: { title: "headline", subtitle: "glanceTitle", media: "media.0.images.0" },
          },
        },
      ],
      validation: (R) => R.required().min(1),
    },
  ],
  preview: {
    select: { title: "heading", decisions: "decisions", navLabel: "navLabel" },
    prepare({ title, decisions, navLabel }) {
      const count = decisions?.length ?? 0;
      return {
        title: title || "Key Decisions",
        subtitle: `Key Decisions · ${count} decision${count === 1 ? "" : "s"}${navLabel ? ` · chapter "${navLabel}"` : ""}`,
      };
    },
  },
};

export const caseStudyTypes = [
  portableText,
  caseStudyImage,
  richTextBlock,
  mediaBlock,
  cardGridBlock,
  calloutBlock,
  storySection,
  statementSection,
  processSection,
  decisionsSection,
];
