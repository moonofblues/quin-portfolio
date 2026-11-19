import { mainExperienceOf, PRODUCT, VISUAL } from "../shared/experiences";

// The contact sheet's frames: one per project, Product and Visual interleaved
// so neither leads, picks (featured) first within each side. Shared by the hero
// and the Work thumbnails so a project has the same frame number in both.

export const FRAME_LIMIT = 18;

const featuredFirst = (a, b) => Number(!!b.featured) - Number(!!a.featured);

export const pad = (n) => String(n).padStart(3, "0");

export function pickFrames(projects) {
  const withPicture = projects.filter((p) => p.thumbnail);
  const product = withPicture
    .filter((p) => mainExperienceOf(p) === PRODUCT)
    .sort(featuredFirst);
  const visual = withPicture
    .filter((p) => mainExperienceOf(p) === VISUAL)
    .sort(featuredFirst);

  const frames = [];
  for (let i = 0; frames.length < FRAME_LIMIT && (product[i] || visual[i]); i++) {
    if (product[i]) frames.push({ project: product[i], side: "product" });
    if (visual[i] && frames.length < FRAME_LIMIT) {
      frames.push({ project: visual[i], side: "visual" });
    }
  }
  return frames;
}

/** Project id to its frame number ("007"), for projects that are on the sheet. */
export function frameNumbers(projects) {
  return new Map(pickFrames(projects).map((f, i) => [f.project.id, pad(i + 1)]));
}
