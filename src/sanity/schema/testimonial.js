// Redesign plan Q7 / glossary "Testimonial": an attributed quote from a real
// person. Attribution (name + role) is mandatory — an unattributed quote is
// not a Testimonial and is not published, because anonymous praise reads as
// invented and costs more trust than it earns. Field spec matches
// project.js's conventions (status radio with a draft initialValue, sortOrder
// with the same "lower first" description).
export const testimonialSchema = {
  name: "testimonial",
  title: "Testimonial",
  type: "document",
  fields: [
    {
      name: "quote",
      title: "Quote",
      type: "text",
      rows: 4,
      validation: (R) => R.required(),
    },
    {
      name: "name",
      title: "Name",
      type: "string",
      validation: (R) => R.required(),
    },
    {
      name: "role",
      title: "Role",
      type: "string",
      description: "The credibility signal — required alongside name.",
      validation: (R) => R.required(),
    },
    {
      name: "organisation",
      title: "Organisation",
      type: "string",
      description:
        "Optional — covers freelancers and anyone who won't name an employer. Not required for attribution.",
    },
    {
      name: "photo",
      title: "Photo",
      type: "image",
      options: { hotspot: true },
      description:
        "Optional. A photo is not attribution, so it must not be required — the card falls back to a monogram when this is empty (ADR 0002).",
    },
    {
      name: "profileUrl",
      title: "Profile URL",
      type: "url",
    },
    {
      name: "sortOrder",
      title: "Sort Order",
      type: "number",
      description: "Lower numbers appear first",
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
  ],
  preview: {
    select: { title: "name", subtitle: "role", media: "photo" },
  },
};
