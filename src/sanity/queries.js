import { client } from "./client";

const PROJECT_FIELDS = `
  "id": _id,
  title,
  subtitle,
  "slug": slug.current,
  type,
  category,
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
  solutionHighlights[] { title, description },
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
