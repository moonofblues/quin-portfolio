import { SERVICE_BY_ID } from "../data/services";

/**
 * The projects the Featured Work section shows. Kept in one place so Other
 * Works can continue the frame numbering where Featured Work stops.
 *
 * Q8 rule (Phase 6): featured-in-focus first, then top up with the most recent
 * projects in that focus, up to 6. Preserves the sortOrder the Sanity query
 * already applies (sortOrder asc, _createdAt desc). With no focus, the general
 * featured set, up to 6. A focus with no projects returns an empty list (ADR
 * 0012), so the caller shows "coming soon" and not unrelated work.
 */
export function pickFeaturedProjects(
  { getFeaturedProjects, getProjectsByFocus },
  focusId,
) {
  const service = focusId ? SERVICE_BY_ID[focusId] : null;
  if (!service) return getFeaturedProjects().slice(0, 6);

  const inFocus = getProjectsByFocus(focusId);
  const featuredInFocus = inFocus.filter((p) => p.featured);
  const restInFocus = inFocus.filter((p) => !p.featured);
  return [...featuredInFocus, ...restInFocus].slice(0, 6);
}
