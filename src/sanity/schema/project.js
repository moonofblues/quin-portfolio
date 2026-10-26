export const projectSchema = {
  name: "project",
  title: "Project",
  type: "document",
  // Studio tabs (ADR 0011). "Legacy" holds pre-v2 fields that the page's
  // adapter still reads until each case study is rewritten into `sections`.
  groups: [
    { name: "card", title: "Card & meta", default: true },
    { name: "story", title: "Story" },
    { name: "outcome", title: "Outcome" },
    { name: "legacy", title: "Legacy" },
  ],
  // Boxes inside the "Card & meta" tab. Field order across the whole schema
  // follows the page's reading order, and the paste sheets follow it too.
  fieldsets: [
    { name: "basics", title: "Basics" },
    {
      name: "cardDisplay",
      title: "Project card",
      description: "How this project looks on the Work page and homepage",
    },
    {
      name: "details",
      title: "Case study details",
      description: "The info card at the top of the case study, in the order shown there",
    },
  ],
  fields: [
    {
      name: "title",
      group: "card",
      fieldset: "basics",
      title: "Title",
      type: "string",
      validation: (R) => R.required(),
    },
    {
      name: "subtitle",
      group: "card",
      fieldset: "basics",
      title: "Subtitle",
      type: "string",
    },
    {
      name: "slug",
      group: "card",
      fieldset: "basics",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (R) => R.required(),
    },
    {
      name: "type",
      group: "card",
      fieldset: "basics",
      title: "Type",
      type: "string",
      options: {
        list: [
          { title: "Case Study", value: "case-study" },
          { title: "Showcase", value: "showcase" },
        ],
        layout: "radio",
      },
      validation: (R) => R.required(),
    },
    {
      name: "status",
      group: "card",
      fieldset: "basics",
      title: "Status",
      type: "string",
      options: {
        list: [
          { title: "Draft", value: "draft" },
          { title: "Published", value: "published" },
        ],
        layout: "radio",
      },
      initialValue: "draft",
      validation: (R) => R.required(),
    },
    {
      name: "categories",
      group: "card",
      fieldset: "basics",
      title: "Categories",
      type: "array",
      of: [{ type: "reference", to: [{ type: "category" }] }],
      description:
        "The categories this project belongs to. The project's Focus/Service is derived from these — see ADR 0009.",
      validation: (R) => R.required().min(1),
    },
    {
      name: "featured",
      group: "card",
      fieldset: "basics",
      title: "Featured",
      type: "boolean",
      initialValue: false,
    },
    {
      name: "sortOrder",
      group: "card",
      fieldset: "basics",
      title: "Sort Order",
      type: "number",
      description: "Lower numbers appear first",
    },
    {
      name: "thumbnail",
      group: "card",
      fieldset: "cardDisplay",
      title: "Thumbnail",
      type: "image",
      options: { hotspot: true },
    },
    {
      name: "tags",
      group: "card",
      fieldset: "cardDisplay",
      title: "Tags",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    },
    {
      name: "description",
      group: "card",
      fieldset: "cardDisplay",
      title: "Short Description",
      type: "text",
      rows: 3,
      description: "Shown on project cards",
    },
    {
      name: "impact",
      group: "card",
      fieldset: "cardDisplay",
      title: "Impact (one-liner)",
      type: "string",
      description: "e.g. 60% reduction in task completion time",
    },
    {
      name: "year",
      group: "card",
      fieldset: "details",
      title: "Year",
      type: "string",
    },
    {
      name: "duration",
      group: "card",
      fieldset: "details",
      title: "Duration",
      type: "string",
      description: 'Free text; add a note if useful, e.g. "Nov – Dec 2025 · MVP in 5 weeks"',
    },
    {
      name: "role",
      group: "card",
      fieldset: "details",
      title: "My Role",
      type: "string",
    },
    {
      name: "team",
      group: "card",
      fieldset: "details",
      title: "Team (optional)",
      type: "string",
      description: 'e.g. "1 designer, 2 frontend and 1 backend developer"',
    },
    {
      name: "client",
      group: "card",
      fieldset: "details",
      title: "Client",
      type: "string",
    },
    {
      // Not named `status` — that field is the Draft/Published switch above.
      name: "projectStatus",
      group: "card",
      fieldset: "details",
      title: "Project Status (optional)",
      type: "string",
      description: "Where the work stands today, shown in the case study meta card.",
      options: {
        list: [
          { title: "Shipped", value: "Shipped" },
          { title: "MVP built · not deployed", value: "MVP built · not deployed" },
          { title: "In progress", value: "In progress" },
          { title: "Concept", value: "Concept" },
        ],
      },
    },
    {
      name: "tools",
      group: "card",
      fieldset: "details",
      title: "Tools Used",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    },
    {
      name: "liveUrl",
      group: "card",
      fieldset: "details",
      title: "Live URL",
      type: "url",
    },
    // Case Study fields — the fixed "spine" plus the reorderable story
    // (ADR 0011).
    {
      name: "headline",
      group: "story",
      title: "Headline (optional)",
      type: "string",
      description:
        'The narrative hook under the title, e.g. "Rebuilding a stalled hospital system around the plan itself"',
    },
    {
      name: "overview",
      group: "story",
      title: "Overview",
      type: "text",
      rows: 5,
    },
    {
      name: "challenge",
      group: "story",
      title: "The Problem",
      type: "text",
      rows: 5,
      description:
        "Shown as The Problem near the top. One punchy sentence (≤30 words) renders large and centred.",
    },
    {
      name: "sections",
      group: "story",
      title: "Story sections",
      type: "array",
      description:
        "The middle of the case study, in reading order — drag to reorder. Sits between Solution at a Glance and the Design Showcase. While this is empty, the page builds sections from the Legacy tab.",
      of: [
        { type: "storySection" },
        { type: "statementSection" },
        { type: "processSection" },
        { type: "decisionsSection" },
      ],
      hidden: ({ document }) => document?.type !== "case-study",
      validation: (R) =>
        R.custom((sections) =>
          (sections ?? []).filter((s) => s._type === "decisionsSection").length > 1
            ? "Only one Key Decisions section per case study — Solution at a Glance is built from it"
            : true,
        ),
    },
    {
      name: "showcaseImages",
      group: "outcome",
      title: "Design Showcase Images",
      type: "array",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          // Optional so existing uploads stay valid (ADR 0011).
          fields: [
            {
              name: "title",
              title: "Title (optional)",
              type: "string",
              description: 'Bold lead-in shown with the caption, e.g. "Approver review."',
            },
            { name: "caption", title: "Caption (optional)", type: "text", rows: 2 },
            { name: "alt", title: "Alt text (optional)", type: "string" },
          ],
        },
      ],
      description: "Full Behance-style frames shown in the lightbox",
    },
    {
      name: "embeds",
      group: "outcome",
      title: "Embeds (optional)",
      type: "array",
      of: [
        {
          type: "object",
          name: "embed",
          fields: [
            {
              name: "platform",
              title: "Platform",
              type: "string",
              options: {
                list: [
                  { title: "Behance", value: "behance" },
                  { title: "Facebook", value: "facebook" },
                  { title: "Custom (paste embed code)", value: "custom" },
                ],
                layout: "radio",
              },
              initialValue: "behance",
              validation: (R) => R.required(),
            },
            {
              name: "url",
              title: "URL",
              type: "url",
              description: "The Behance project URL or Facebook post URL to embed.",
              hidden: ({ parent }) => parent?.platform === "custom",
              validation: (R) =>
                R.custom((value, context) =>
                  context.parent?.platform !== "custom" && !value
                    ? "URL is required for this platform"
                    : true,
                ),
            },
            {
              name: "embedCode",
              title: "Embed Code",
              type: "text",
              rows: 4,
              description:
                "Paste the <iframe> embed snippet from the platform's own Share → Embed button.",
              hidden: ({ parent }) => parent?.platform !== "custom",
              validation: (R) =>
                R.custom((value, context) =>
                  context.parent?.platform === "custom" && !value
                    ? "Embed code is required for a custom embed"
                    : true,
                ),
            },
            {
              name: "title",
              title: "Label (optional)",
              type: "string",
              description: 'e.g. "Full case study on Behance" — shown above the embed',
            },
          ],
          preview: {
            select: { title: "title", platform: "platform", url: "url" },
            prepare({ title, platform, url }) {
              return { title: title || url || "Embed", subtitle: platform };
            },
          },
        },
      ],
      description:
        "One or more embedded frames. Behance and Facebook render inline (Behance can expand to full width); use Custom to paste an <iframe> snippet for anything else. See docs/adr/0010.",
    },
    {
      name: "outcomeHeadline",
      group: "outcome",
      title: "Outcome Headline (optional)",
      type: "string",
      description: 'One line summing up where things stand, e.g. "Built, but not yet proven in use"',
    },
    {
      name: "results",
      group: "outcome",
      title: "Results",
      type: "array",
      of: [
        {
          type: "object",
          name: "result",
          fields: [
            { name: "metric", title: "Metric", type: "string", description: 'e.g. "60%"' },
            { name: "label", title: "Label", type: "string", description: 'e.g. "Reduction in task time"' },
          ],
          preview: {
            select: { title: "metric", subtitle: "label" },
          },
        },
      ],
    },
    {
      name: "outcomeNotes",
      group: "outcome",
      title: "Outcome Notes (optional)",
      type: "array",
      description:
        'Up to 3 labelled columns under the metrics. Suggested labels: "Delivered", "Not yet verified", "Measured impact".',
      of: [
        {
          type: "object",
          name: "outcomeNote",
          fields: [
            {
              name: "label",
              title: "Label",
              type: "string",
              options: {
                list: ["Delivered", "Not yet verified", "Measured impact", "What's next"],
              },
              validation: (R) => R.required(),
            },
            { name: "body", title: "Text", type: "portableText", validation: (R) => R.required() },
          ],
          preview: { select: { title: "label" } },
        },
      ],
      validation: (R) => R.max(3),
    },
    {
      name: "reflection",
      group: "outcome",
      title: "Reflection (optional)",
      type: "object",
      fields: [
        {
          name: "headline",
          title: "Headline",
          type: "string",
          description: 'e.g. "The fix was in the data flow, not the screens"',
        },
        { name: "body", title: "Text", type: "portableText" },
      ],
    },
    {
      name: "process",
      group: "legacy",
      title: "Process Steps",
      description: "Legacy (ADR 0011): only used while Story sections is empty.",
      type: "array",
      of: [
        {
          type: "object",
          name: "step",
          fields: [
            { name: "title", title: "Step Title", type: "string" },
            { name: "description", title: "Step Description", type: "text", rows: 3 },
          ],
          preview: {
            select: { title: "title", subtitle: "description" },
          },
        },
      ],
    },
    {
      name: "solution",
      group: "legacy",
      title: "The Solution",
      description: "Legacy (ADR 0011): only used while Story sections is empty.",
      type: "text",
      rows: 5,
    },
    // Optional research/UX sections — all unrequired. Each renders on the
    // case study page only when filled in; otherwise the section is omitted
    // entirely. See docs/adr/0002-optional-research-sections-for-case-studies.md
    {
      name: "background",
      group: "legacy",
      title: "Background (optional)",
      type: "text",
      rows: 5,
      description:
        "Legacy (ADR 0011): only used while Story sections is empty. Org/product framing shown side-by-side with The Challenge. Leave empty to render Challenge full-width as before.",
    },
    {
      name: "researchObjectives",
      group: "legacy",
      title: "Research Objectives (optional)",
      type: "array",
      of: [{ type: "string" }],
      description: "Legacy (ADR 0011): only used while Story sections is empty. Bullet list of what the research set out to learn",
    },
    {
      name: "researchMethods",
      group: "legacy",
      title: "Research Methods (optional)",
      description: "Legacy (ADR 0011): only used while Story sections is empty.",
      type: "array",
      of: [
        {
          type: "object",
          name: "method",
          fields: [
            { name: "title", title: "Method Title", type: "string", description: 'e.g. "User Interviews"' },
            { name: "description", title: "Description", type: "text", rows: 3 },
          ],
          preview: {
            select: { title: "title", subtitle: "description" },
          },
        },
      ],
    },
    {
      name: "researchFindings",
      group: "legacy",
      title: "Research Findings (optional)",
      description: "Legacy (ADR 0011): only used while Story sections is empty.",
      type: "text",
      rows: 5,
    },
    {
      name: "painPoints",
      group: "legacy",
      title: "Pain Points (optional)",
      description: "Legacy (ADR 0011): only used while Story sections is empty.",
      type: "array",
      of: [
        {
          type: "object",
          name: "painPoint",
          fields: [
            { name: "title", title: "Title", type: "string" },
            { name: "description", title: "Description", type: "text", rows: 3 },
          ],
          preview: {
            select: { title: "title", subtitle: "description" },
          },
        },
      ],
    },
    {
      name: "quote",
      group: "legacy",
      title: "Pull Quote (optional)",
      type: "text",
      rows: 2,
      description: "Legacy (ADR 0011): only used while Story sections is empty. A short participant quote shown as a full-width banner",
    },
    {
      name: "persona",
      group: "legacy",
      title: "Persona (optional)",
      type: "object",
      description: "A real research participant — leave empty if no participant research was conducted",
      fields: [
        { name: "photo", title: "Photo", type: "image", options: { hotspot: true } },
        { name: "name", title: "Name", type: "string" },
        { name: "role", title: "Role", type: "string", description: 'e.g. "Digital Marketing, 33"' },
        { name: "location", title: "Location", type: "string" },
        {
          name: "tools",
          title: "Current Tools/Apps",
          type: "array",
          of: [{ type: "string" }],
          options: { layout: "tags" },
        },
      ],
      preview: {
        select: { title: "name", subtitle: "role" },
      },
    },
    {
      name: "howMightWe",
      group: "legacy",
      title: "How Might We (optional)",
      type: "array",
      of: [{ type: "string" }],
      description: "Legacy (ADR 0011): only used while Story sections is empty. Reframed design opportunities, shown as a card grid",
    },
    {
      name: "ideation",
      group: "legacy",
      title: "Ideation (optional)",
      type: "object",
      fields: [
        { name: "description", title: "Description", type: "text", rows: 5 },
        { name: "diagramImage", title: "Flow Diagram", type: "image", options: { hotspot: true } },
      ],
    },
    {
      name: "wireframes",
      group: "legacy",
      title: "Wireframes (optional)",
      type: "object",
      fields: [
        { name: "description", title: "Description", type: "text", rows: 3 },
        {
          name: "images",
          title: "Wireframe Images",
          type: "array",
          of: [{ type: "image", options: { hotspot: true } }],
        },
      ],
    },
    {
      name: "solutionHighlights",
      group: "legacy",
      title: "Solution Highlights (optional)",
      type: "array",
      of: [
        {
          type: "object",
          name: "highlight",
          fields: [
            { name: "title", title: "Title", type: "string" },
            { name: "description", title: "Description", type: "text", rows: 3 },
            {
              name: "image",
              title: "Screenshot (optional)",
              type: "image",
              options: { hotspot: true },
              description: "Shown beside this highlight in the Solution section",
            },
          ],
          preview: {
            select: { title: "title", subtitle: "description", media: "image" },
          },
        },
      ],
      description: "Legacy (ADR 0011): only used while Story sections is empty. Value-prop cards shown instead of plain Solution prose when filled in",
    },
    {
      name: "keyFunctions",
      group: "legacy",
      title: "Key Functions (legacy, unused)",
      type: "array",
      of: [
        {
          type: "object",
          name: "keyFunction",
          fields: [
            { name: "image", title: "Image", type: "image", options: { hotspot: true } },
            { name: "caption", title: "Caption", type: "string" },
          ],
          preview: {
            select: { title: "caption", media: "image" },
          },
        },
      ],
      description:
        "No longer rendered — folded into Solution Highlights' per-card image. Field kept so existing content isn't lost; see docs/adr/0004.",
    },
    // Legacy external links
    {
      name: "behanceUrl",
      group: "legacy",
      title: "Behance URL (legacy, unused)",
      type: "url",
      description:
        "Deprecated — being migrated into Embeds above (platform: Behance). The hero's 'View on Behance' button now derives its link from Embeds instead of this field. Kept temporarily as a reference while re-entering existing values by hand; delete once migration is complete. See docs/adr/0010.",
    },
    {
      name: "fbPostUrl",
      group: "legacy",
      title: "Facebook Post URL (legacy, unused)",
      type: "url",
      description:
        "Deprecated — being migrated into Embeds above (platform: Facebook). No longer rendered anywhere. Kept temporarily as a reference while re-entering existing values by hand; delete once migration is complete. See docs/adr/0010.",
    },
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "type",
      media: "thumbnail",
    },
    prepare({ title, subtitle, media }) {
      return {
        title,
        subtitle: subtitle === "case-study" ? "Case Study" : "Showcase",
        media,
      };
    },
  },
};
