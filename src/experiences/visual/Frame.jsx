import { sizedUrl, sizeFromUrl } from "./helpers";

/**
 * One contact-sheet print. The picture is drawn twice from the same URL (the
 * browser fetches it once): a grayscale copy that the stylesheet tints into the
 * ink, and the true-colour copy that fades in on hover or focus.
 *
 * `natural` keeps the photo's own proportions; otherwise the parent decides the
 * shape and the picture is cropped to fit. `eager` is for the single image that
 * is both above the fold and the page's largest (see CLAUDE.md, Performance).
 */
export function Frame({ project, number, natural = false, eager = false, maxWidth = 800 }) {
  const size = sizeFromUrl(project.thumbnail);
  const img = {
    src: sizedUrl(project.thumbnail, maxWidth),
    alt: "",
    width: size?.width,
    height: size?.height,
    decoding: "async",
  };

  return (
    <span
      className="v-frame"
      style={natural && size ? { aspectRatio: `${size.width} / ${size.height}` } : undefined}
    >
      <img
        className="v-pic"
        {...img}
        loading={eager ? "eager" : "lazy"}
        fetchPriority={eager ? "high" : "low"}
      />
      <img className="v-col" {...img} loading="lazy" fetchPriority="low" />
      {number && <span className="v-no">{number}</span>}
    </span>
  );
}
