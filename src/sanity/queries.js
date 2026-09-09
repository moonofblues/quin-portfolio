import { client } from "./client";

const PROJECT_FIELDS = `
  "id": _id,
  title,
  subtitle,
  "slug": slug.current,
  type,
  category,
  services,
  subcategory,
  categories[]-> {
    "id": _id,
    title,
    "slug": slug.current,
    focus
  },
  featured,
  status,
  sortOrder,
  tags,
  tools,
  "thumbnail": thumbnail.asset->url,
  description,
  impact,
  year,
  role,
  client,
  duration,
  overview,
  challenge,
  process[] { title, description },
  solution,
  results[] { metric, label },
  "images": showcaseImages[].asset->url,
  background,
  researchObjectives,
  researchMethods[] { title, description },
  researchFindings,
  painPoints[] { title, description },
  quote,
  persona {
    "photo": photo.asset->url,
    name,
    role,
    location,
    tools
  },
  howMightWe,
  ideation {
    description,
    "diagramImage": diagramImage.asset->url
  },
  wireframes {
    description,
    "images": images[].asset->url
  },
  solutionHighlights[] { title, description, "image": image.asset->url },
  keyFunctions[] {
    "image": image.asset->url,
    caption
  },
  liveUrl,
  behanceUrl,
  fbPostUrl
`;

export async function fetchAllProjects() {
  return client.fetch(
    `*[_type == "project" && status == "published"] | order(sortOrder asc, _createdAt desc) { ${PROJECT_FIELDS} }`
  );
}

// Runtime fetch, matching every other query in this file — not a build-time
// snapshot. The redesign plan's Q1 entry cites ADR 0001 as requiring a
// build-time pipeline, but that has the ADR backwards: ADR 0001's actual
// decision is "no build-time snapshot needed" (that's the alternative it
// rejected), and no such pipeline exists anywhere in this repo — `npm run
// build` is a plain `vite build`. Runtime fetch is also what keeps Studio
// publishing instant, which is the whole reason ADR 0001 picked Sanity.
export async function fetchNow() {
  return client.fetch(
    `*[_type == "now"][0] { asOf, activities[] { verb, text } }`
  );
}

// The full list of Category documents, ordered for the Work-page sub-filter.
// Fetched by the Work page only (not site-wide), so the homepage bundle and
// network are untouched — see ADR 0009 and the Phase 6 plan.
export async function fetchCategories() {
  return client.fetch(
    `*[_type == "category"] | order(sortOrder asc, title asc) {
      "id": _id,
      title,
      "slug": slug.current,
      focus,
      sortOrder
    }`
  );
}

export async function fetchTestimonials() {
  return client.fetch(
    `*[_type == "testimonial" && status == "published"] | order(sortOrder asc, _createdAt desc) {
      "id": _id,
      quote,
      name,
      role,
      organisation,
      "photo": photo.asset->url,
      profileUrl
    }`
  );
}
