import { Award } from "lucide-react";
import { photoUrl, photoSrcSet } from "./photoUrl";

// `sizes` tells the browser how wide the photo will be on screen, so it can
// pick the right file from the srcSet before the page is laid out.
const SIZES = {
  full: "(min-width: 1536px) 1536px, 100vw",
  pair: "(min-width: 1536px) 768px, (min-width: 768px) 50vw, 100vw",
  solo: "(min-width: 768px) 60vw, 100vw",
};

/**
 * One photo: a button (click or Enter/Space opens the viewer), the whole image
 * (never cropped), and its caption underneath when it has one.
 *
 * The wrapper reserves the photo's exact shape (aspect-ratio) and is painted
 * with the photo's dominant colour. So the page does not jump while the image
 * downloads, and the visitor sees a soft block of the right colour, not a hole.
 */
export function PhotoFrame({ photo, index, total, kind, onOpen }) {
  const isOpener = kind === "opener";
  const sizes = SIZES[kind === "opener" ? "full" : kind] ?? SIZES.full;
  // The badge only shows on highlighted photos that have recognition text.
  const recognition = photo.highlight ? photo.recognition : undefined;

  // A solo portrait is limited to 85% of the screen height, so it fits on one
  // screen. Width is worked out from the photo's shape so the box keeps its
  // proportions instead of being cropped or stretched.
  const soloStyle =
    kind === "solo"
      ? { width: `min(100%, calc(85vh * ${photo.width / photo.height}))` }
      : undefined;

  return (
    <figure className={kind === "solo" ? "mx-auto w-full" : "w-full"} style={soloStyle}>
      <button
        type="button"
        onClick={() => onOpen(index)}
        aria-label={`Open photo ${index + 1} of ${total}, ${photo.alt}${recognition ? `. ${recognition}` : ""}`}
        className="group block w-full cursor-zoom-in rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
      >
        <div
          className="relative overflow-hidden"
          style={{
            backgroundColor: photo.color,
            aspectRatio: `${photo.width} / ${photo.height}`,
          }}
        >
          <img
            src={photoUrl(photo.url, Math.min(photo.width, 1280))}
            srcSet={photoSrcSet(photo.url, photo.width)}
            sizes={sizes}
            alt={photo.alt}
            width={photo.width}
            height={photo.height}
            className="block h-auto w-full transition-[opacity] duration-200 group-hover:opacity-90"
            decoding="async"
            // Only the opener is the page's largest visible image, so only it
            // loads right away; everything else waits until it is near.
            loading={isOpener ? "eager" : "lazy"}
            fetchPriority={isOpener ? "high" : "low"}
          />
          {recognition && (
            // A solid dark pill (no blur: blur is costly to draw and would be
            // redrawn while scrolling) so the white text reads on any photo.
            <span className="absolute left-3 top-3 inline-flex max-w-[calc(100%-1.5rem)] items-start gap-1.5 rounded-lg bg-black/75 px-3 py-1.5 text-left text-xs font-medium leading-snug text-white">
              <Award size={14} className="mt-px shrink-0" aria-hidden="true" />
              {recognition}
            </span>
          )}
        </div>
      </button>
      {photo.caption && (
        <figcaption className="mt-3 text-sm leading-relaxed text-text-muted">
          {photo.caption}
        </figcaption>
      )}
    </figure>
  );
}
