// Sanity serves every uploaded image through a CDN that can resize on the fly:
// add ?w=<pixels> to the URL and it sends back a smaller copy. `auto=format`
// lets it pick WebP or AVIF for browsers that support them.

const WIDTHS = [640, 960, 1280, 1920, 2560];

/** One resized URL, e.g. photoUrl(url, 1280). */
export function photoUrl(url, width) {
  return `${url}?w=${width}&auto=format`;
}

/**
 * The `srcSet` text for an <img>: the same photo at several widths, so the
 * browser downloads the smallest one that still looks sharp on the visitor's
 * screen. Widths bigger than the original are skipped (never upscale); if the
 * original is smaller than every step, it is offered at its own width.
 */
export function photoSrcSet(url, originalWidth) {
  const max = originalWidth || Infinity;
  const widths = WIDTHS.filter((w) => w <= max);
  if (!widths.length) widths.push(originalWidth);
  return widths.map((w) => `${photoUrl(url, w)} ${w}w`).join(", ");
}
