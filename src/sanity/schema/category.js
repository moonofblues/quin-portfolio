// A Category is a finer bucket within one Focus — e.g. "Travel Montage" under
// Video Editing, "Branding" under Graphic Design. See ADR 0009. Each Category
// belongs to exactly one Focus via its `focus` field; the values here are the
// six focus ids from src/data/services.js, so a project's Focuses can be
// derived from its categories. A project references Categories (not Services);
// Service/Focus is never stored on the project.
export const categorySchema = {
  name: "category",
  title: "Category",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      description: 'e.g. "Travel Montage", "Promotional Video", "Branding"',
      validation: (R) => R.required(),
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      description: "Used in the Work-page URL (?category=<slug>).",
      validation: (R) => R.required(),
    },
    {
      name: "focus",
      title: "Focus",
      type: "string",
      description: "Which of the six services this category lives under.",
      options: {
        list: [
          { title: "UI/UX Design", value: "ui-ux" },
          { title: "Front-End Development", value: "front-end" },
          { title: "Web Development", value: "web-dev" },
          { title: "Low-Code / No-Code", value: "low-code" },
          { title: "Graphic Design", value: "graphic-design" },
          { title: "Video Editing", value: "video" },
        ],
        layout: "radio",
      },
      validation: (R) => R.required(),
    },
    {
      name: "sortOrder",
      title: "Sort Order",
      type: "number",
      description: "Lower numbers appear first",
    },
  ],
  preview: {
    select: { title: "title", subtitle: "focus" },
  },
};
