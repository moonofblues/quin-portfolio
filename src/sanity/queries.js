import { client } from "./client";

// Split per ADR 0011: the site-wide fetch carries only what project cards and
// selectors need, so the homepage never downloads full case-study text. The
// detail page fetches everything else for its one slug.
const CARD_FIELDS = `
  "id": _id,
  title,
  subtitle,
  "slug": slug.current,
  type,
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
  "thumbnail": thumbnail.asset->url,
  description,
  impact,
  year
`;

// An image with the dimensions CLAUDE.md requires on every <img>.
const IMAGE = `
  "url": asset->url,
  "width": asset->metadata.dimensions.width,
  "height": asset->metadata.dimensions.height
`;

const MEDIA_BLOCK = `
  ...,
  images[] { ${IMAGE}, alt, label, caption }
`;

const DETAIL_FIELDS = `
  ${CARD_FIELDS},
  headline,
  role,
  team,
  client,
  duration,
  projectStatus,
  tools,
  overview,
  challenge,
  sections[] {
    ...,
    _type == "storySection" => {
      content[] {
        ...,
        _type == "mediaBlock" => { ${MEDIA_BLOCK} }
      }
    },
    _type == "decisionsSection" => {
      decisions[] {
        ...,
        media[] { ${MEDIA_BLOCK} }
      }
    }
  },
  results[] { metric, label },
  outcomeHeadline,
  outcomeNotes[] { label, body },
  reflection { headline, body },
  "images": showcaseImages[].asset->url,
  "showcase": showcaseImages[] { ${IMAGE}, title, caption, alt },
  embeds[] { platform, url, embedCode, title },
  liveUrl,
  process[] { title, description },
  solution,
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
  solutionHighlights[] { title, description, "image": image.asset->url }
`;

export async function fetchAllProjects() {
  return client.fetch(
    `*[_type == "project" && status == "published"] | order(sortOrder asc, _createdAt desc) { ${CARD_FIELDS} }`
  );
}

// Full content for one project's detail page (case study or showcase). The
// trailing legacy fields (process … solutionHighlights) feed the v2 adapter
// and the old page until every case study is migrated into `sections`.
// Resolves to null when no published project has this slug.
export async function fetchProjectDetail(slug) {
  return client.fetch(
    `*[_type == "project" && status == "published" && slug.current == $slug][0] { ${DETAIL_FIELDS} }`,
    { slug }
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
