export const projectSchema = {
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      validation: (R) => R.required(),
    },
    {
      name: "subtitle",
      title: "Subtitle",
      type: "string",
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (R) => R.required(),
    },
    {
      name: "type",
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
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "UI/UX Design", value: "ui-ux" },
          { title: "Web Development", value: "web-dev" },
          { title: "Graphic Design", value: "graphic-design" },
          { title: "Video", value: "video" },
        ],
      },
      validation: (R) => R.required(),
    },
    {
      name: "status",
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
      name: "featured",
      title: "Featured",
      type: "boolean",
      initialValue: false,
    },
    {
      name: "sortOrder",
      title: "Sort Order",
      type: "number",
      description: "Lower numbers appear first",
    },
    {
      name: "thumbnail",
      title: "Thumbnail",
      type: "image",
      options: { hotspot: true },
    },
    {
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    },
    {
      name: "tools",
      title: "Tools Used",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    },
    {
      name: "description",
      title: "Short Description",
      type: "text",
      rows: 3,
      description: "Shown on project cards",
    },
    {
      name: "impact",
      title: "Impact (one-liner)",
      type: "string",
      description: "e.g. 60% reduction in task completion time",
    },
    {
      name: "year",
      title: "Year",
      type: "string",
    },
    {
      name: "role",
      title: "My Role",
      type: "string",
    },
    {
      name: "client",
      title: "Client",
      type: "string",
    },
    {
      name: "duration",
      title: "Duration",
      type: "string",
    },
    // Case Study fields
    {
      name: "overview",
      title: "Overview",
      type: "text",
      rows: 5,
    },
    {
      name: "challenge",
      title: "The Challenge",
      type: "text",
      rows: 5,
    },
    {
      name: "process",
      title: "Process Steps",
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
      title: "The Solution",
      type: "text",
      rows: 5,
    },
    {
      name: "results",
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
      name: "showcaseImages",
      title: "Design Showcase Images",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
      description: "Full Behance-style frames shown in the lightbox",
    },
    // Optional research/UX sections — all unrequired. Each renders on the
    // case study page only when filled in; otherwise the section is omitted
    // entirely. See docs/adr/0002-optional-research-sections-for-case-studies.md
    {
      name: "background",
      title: "Background (optional)",
      type: "text",
      rows: 5,
      description:
        "Org/product framing shown side-by-side with The Challenge. Leave empty to render Challenge full-width as before.",
    },
    {
      name: "researchObjectives",
      title: "Research Objectives (optional)",
      type: "array",
      of: [{ type: "string" }],
      description: "Bullet list of what the research set out to learn",
    },
    {
      name: "researchMethods",
      title: "Research Methods (optional)",
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
      title: "Research Findings (optional)",
      type: "text",
      rows: 5,
    },
    {
      name: "painPoints",
      title: "Pain Points (optional)",
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
      title: "Pull Quote (optional)",
      type: "text",
      rows: 2,
      description: "A short participant quote shown as a full-width banner",
    },
    {
      name: "persona",
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
      title: "How Might We (optional)",
      type: "array",
      of: [{ type: "string" }],
      description: "Reframed design opportunities, shown as a card grid",
    },
    {
      name: "ideation",
      title: "Ideation (optional)",
      type: "object",
      fields: [
        { name: "description", title: "Description", type: "text", rows: 5 },
        { name: "diagramImage", title: "Flow Diagram", type: "image", options: { hotspot: true } },
      ],
    },
    {
      name: "wireframes",
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
      description: "Value-prop cards shown instead of plain Solution prose when filled in",
    },
    {
      name: "keyFunctions",
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
    // External links
    {
      name: "liveUrl",
      title: "Live URL",
      type: "url",
    },
    {
      name: "behanceUrl",
      title: "Behance URL",
      type: "url",
    },
    {
      name: "fbPostUrl",
      title: "Facebook Post URL",
      type: "url",
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
