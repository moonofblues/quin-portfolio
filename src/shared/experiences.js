// Which Experience each Focus belongs to (ADR 0014). This is the single place
// that says it, and it lives in `shared` on purpose: both Experiences need to
// ask the question, and neither may import from the other.
//
// Focus ids match `src/data/services.js` and the Category `focus` dropdown in
// Studio. A new Focus must be added here too, or its projects will have no
// Experience.

export const PRODUCT = "product";
export const VISUAL = "visual";

export const FOCUS_EXPERIENCE = {
  "ui-ux": PRODUCT,
  "front-end": PRODUCT,
  "web-dev": PRODUCT,
  "low-code": PRODUCT,
  video: VISUAL,
  photography: VISUAL,
  "graphic-design": VISUAL,
};

/** A project's Focus ids, derived from its Categories (ADR 0009). */
export function focusIdsOf(project) {
  return (project?.categories ?? []).map((c) => c.focus).filter(Boolean);
}

/** Every Experience a project belongs to, without repeats. */
export function experiencesOf(project) {
  const found = new Set();
  for (const id of focusIdsOf(project)) {
    const experience = FOCUS_EXPERIENCE[id];
    if (experience) found.add(experience);
  }
  return [...found];
}

/**
 * The one Experience a project's own page lives in.
 *
 * - Photo set and film: Visual.
 * - Case study: Product.
 * - Showcase: Product if any of its Focuses is a Product one, Visual if it has
 *   only Visual Focuses. A Showcase with no Focus yet stays in Product, which
 *   is where every project lived before the split.
 */
export function mainExperienceOf(project) {
  if (project?.type === "photo-set" || project?.type === "film") return VISUAL;
  if (project?.type === "case-study") return PRODUCT;

  const experiences = experiencesOf(project);
  if (experiences.includes(PRODUCT)) return PRODUCT;
  if (experiences.includes(VISUAL)) return VISUAL;
  return PRODUCT;
}
