import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

const ICON_BUTTON =
  "p-2 rounded-full bg-white/10 hover:bg-white/20 transition-[background-color] duration-200 text-white";

/**
 * Full-screen viewer for case-study images. `images` is [{ url, alt, width }];
 * with more than one (e.g. a before/after pair) arrows and the arrow keys flip
 * between them. The image shows at its real size (never upscaled) and the
 * overlay scrolls for tall screenshots, like the Design Showcase viewer.
 * Esc, the X button or a click outside the image closes it.
 */
export function ImageLightbox({ images, startIndex = 0, onClose }) {
  const [index, setIndex] = useState(startIndex);
  const count = images.length;
  const image = images[index];

  useEffect(() => {
    // Hand focus back to the thumbnail that opened the viewer.
    const opener = document.activeElement;
    const step = (by) => setIndex((i) => (i + by + count) % count);
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
      else if (count > 1 && e.key === "ArrowRight") step(1);
      else if (count > 1 && e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
      opener?.focus?.();
    };
  }, [onClose, count]);

  if (!image) return null;

  const flip = (by) => (e) => {
    e.stopPropagation();
    setIndex((i) => (i + by + count) % count);
  };

  // Portalled to <body> so no animated/transformed ancestor can trap it.
  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={image.alt || "Enlarged image"}
      className="fixed inset-0 z-50 bg-black/95 overflow-y-auto"
      onClick={onClose}
    >
      <button
        type="button"
        onClick={onClose}
        className={`fixed top-4 right-4 z-50 ${ICON_BUTTON}`}
        aria-label="Close enlarged image"
        autoFocus
      >
        <X size={24} />
      </button>

      {count > 1 && (
        <>
          <button
            type="button"
            onClick={flip(-1)}
            className={`fixed left-4 top-1/2 -translate-y-1/2 z-50 ${ICON_BUTTON}`}
            aria-label="Previous image"
          >
            <ChevronLeft size={28} />
          </button>
          <button
            type="button"
            onClick={flip(1)}
            className={`fixed right-4 top-1/2 -translate-y-1/2 z-50 ${ICON_BUTTON}`}
            aria-label="Next image"
          >
            <ChevronRight size={28} />
          </button>
        </>
      )}

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
    </div>,
    document.body,
  );
}
