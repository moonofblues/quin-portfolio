import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { LightboxShell, LIGHTBOX_BUTTON } from "./LightboxShell";

/**
 * Full-screen viewer for case-study images. `images` is [{ url, alt, width }];
 * with more than one (e.g. a before/after pair) arrows and the arrow keys flip
 * between them. The image shows at its real size (never upscaled) and the
 * overlay scrolls for tall screenshots, like the Design Showcase viewer.
 * Esc, the X button or a click outside the image closes it; the frame, motion
 * and focus handling live in LightboxShell.
 */
export function ImageLightbox({ images, startIndex = 0, onClose }) {
  const [index, setIndex] = useState(startIndex);
  const count = images.length;
  const image = images[index];

  if (!image) return null;

  const step = (by) => setIndex((i) => (i + by + count) % count);
  const handleKey = (e) => {
    if (count > 1 && e.key === "ArrowRight") step(1);
    else if (count > 1 && e.key === "ArrowLeft") step(-1);
  };
  const flip = (by) => (e) => {
    e.stopPropagation();
    step(by);
  };

  const controls =
    count > 1 ? (
      <>
        <button
          type="button"
          onClick={flip(-1)}
          className={`fixed left-4 top-1/2 -translate-y-1/2 z-50 ${LIGHTBOX_BUTTON}`}
          aria-label="Previous image"
        >
          <ChevronLeft size={28} />
        </button>
        <button
          type="button"
          onClick={flip(1)}
          className={`fixed right-4 top-1/2 -translate-y-1/2 z-50 ${LIGHTBOX_BUTTON}`}
          aria-label="Next image"
        >
          <ChevronRight size={28} />
        </button>
      </>
    ) : null;

  return (
    <LightboxShell
      label={image.alt || "Enlarged image"}
      onClose={onClose}
      onKeyDown={handleKey}
      controls={controls}
    >
      <div className="mx-auto px-4 py-14 sm:px-16" style={{ maxWidth: image.width || undefined }}>
        <img
          src={image.url}
          alt={image.alt || ""}
          width={image.width}
          height={image.height}
          className="block w-full h-auto"
          decoding="async"
          onClick={(e) => e.stopPropagation()}
        />
      </div>
    </LightboxShell>
  );
}
