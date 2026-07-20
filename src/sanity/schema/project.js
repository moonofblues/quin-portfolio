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
