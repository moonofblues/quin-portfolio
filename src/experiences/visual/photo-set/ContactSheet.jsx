import { useCallback, useMemo, useState } from "react";
import { ImageLightbox } from "../../../shared/image-viewer/ImageLightbox";
import { photoUrl } from "./photoUrl";

/**
 * Every frame from the shoot on one sheet: the photos above are the picks
 * (ringed), the rest are the rejects (dimmed, each with its reason). Frames
 * with a frame number sit in shoot order; frames without one follow, picks
 * first. Needs at least one reject to be worth showing.
 */
export function ContactSheet({ photos, rejects }) {
  const [openAt, setOpenAt] = useState(null);
  const close = useCallback(() => setOpenAt(null), []);

  const frames = useMemo(() => {
    const picks = photos.map((p, i) => ({ ...p, picked: true, order: i }));
    const rest = rejects
      .filter((r) => r?.url && r.width && r.height)
      .map((r, i) => ({ ...r, picked: false, order: photos.length + i }));
    // Frames with no number sort last; ties keep their Studio order.
    return [...picks, ...rest].sort(
      (a, b) => (a.frame ?? Infinity) - (b.frame ?? Infinity) || a.order - b.order,
    );
  }, [photos, rejects]);

  const viewerImages = useMemo(
    () =>
      frames.map((f) => ({
        url: photoUrl(f.url, Math.min(f.width, 2560)),
        alt: f.alt,
        width: f.width,
        height: f.height,
        caption: f.picked ? "Picked" : f.reason || "Not picked",
      })),
    [frames],
  );

  if (frames.length === photos.length) return null;

  return (
    <section className="vc-sheet" aria-label="Contact sheet">
      <h2 className="vp-label">the contact sheet</h2>
      <ul className="vc-grid">
        {frames.map((frame, i) => (
          <li key={frame.url} className="vc-cell" data-picked={frame.picked}>
            <button
              type="button"
              className="vc-btn"
              onClick={() => setOpenAt(i)}
              aria-label={`Open frame ${frame.frame ?? i + 1}, ${frame.picked ? "picked" : "not picked"}, ${frame.alt}`}
            >
              <img
                src={photoUrl(frame.url, 480)}
                alt=""
                width={frame.width}
                height={frame.height}
                loading="lazy"
                decoding="async"
                fetchPriority="low"
              />
            </button>
            <p className="vc-cap">
              <span>{String(frame.frame ?? i + 1).padStart(2, "0")}</span>
              {frame.picked ? " picked" : frame.reason ? ` ${frame.reason}` : ""}
            </p>
          </li>
        ))}
      </ul>
      {openAt !== null && (
        <ImageLightbox images={viewerImages} startIndex={openAt} onClose={close} />
      )}
    </section>
  );
}
