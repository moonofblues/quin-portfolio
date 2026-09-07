// The "Now" section (redesign plan Q1, glossary "Now"): a homepage block
// stating what Quin is doing right now, at activity level — never role
// level, since the About timeline already lists current job titles.
//
// This is a singleton: exactly one "Now" document should ever exist. The
// query in queries.js reads the first (and only intended) match rather than
// a fixed known _id, so `__experimental_actions` below removes Create and
// Delete from Studio's document menu for this type — the only way left to
// get a second one is to duplicate the existing document by hand.
export const nowSchema = {
  name: "now",
  title: "Now",
  type: "document",
  __experimental_actions: ["update", "publish"],
  fields: [
    {
      name: "asOf",
      title: "As of",
      type: "date",
      description:
        "Manually set, not automatic — a stale \"Now\" is worse than none. Update this whenever the activities below change.",
      validation: (R) => R.required(),
    },
    {
      name: "activities",
      title: "Activities",
      type: "array",
      validation: (R) => R.required().min(1).max(4),
      of: [
        {
          type: "object",
          name: "activity",
          fields: [
            {
              name: "verb",
              title: "Verb",
              type: "string",
              description: "e.g. \"Building\", \"Teaching\", \"Learning\".",
              validation: (R) => R.required(),
            },
            {
              name: "text",
              title: "Text",
              type: "string",
              description:
                "The rest of the line, at activity level — e.g. \"a component library for ZCMC's internal tools\", not a job title already covered by the About timeline.",
              validation: (R) => R.required(),
            },
          ],
          preview: {
            select: { verb: "verb", text: "text" },
            prepare({ verb, text }) {
              return { title: `${verb ?? "…"} ${text ?? ""}`.trim() };
            },
          },
        },
      ],
    },
  ],
  preview: {
    select: { asOf: "asOf" },
    prepare({ asOf }) {
      return { title: "Now", subtitle: asOf ? `As of ${asOf}` : "No date set" };
    },
  },
};
