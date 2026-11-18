/** How many graphic design pieces the index shows. The rest stay on Work. */
export const GRAPHIC_LIMIT = 8;

/** Sanity resizes images on the fly: ?w=<pixels>. auto=format picks WebP/AVIF. */
export function sizedUrl(url, width) {
  return `${url}?w=${width}&auto=format`;
}

/**
 * Sanity puts the original size in every image URL ("...-1080x1080.webp"), so
 * we can reserve the right space (no layout shift) without an extra request.
 */
export function sizeFromUrl(url) {
  const m = /-(\d+)x(\d+)\.[a-z0-9]+$/i.exec(url ?? "");
  return m ? { width: Number(m[1]), height: Number(m[2]) } : null;
}

/** Which of the three index groups a Visual project belongs to. */
export { visualGroupOf as groupOf } from "../../shared/experiences";

/**
 * Where a project's page is when reached from the Visual index. Photo sets and
 * films only have a Visual page. A graphic design piece (a Showcase) has both:
 * its Visual page here, and the Product one at /work/<slug>, which the Product
 * site keeps linking to.
 */
export function projectPath(project) {
  return `/visual/${project.slug}`;
}

/** Featured first, otherwise keep Studio's order. */
export function featuredFirst(list) {
  return [...list].sort((a, b) => Number(!!b.featured) - Number(!!a.featured));
}
