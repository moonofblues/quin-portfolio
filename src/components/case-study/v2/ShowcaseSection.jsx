import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Expand, X } from "lucide-react";
import { cn } from "../../../utils/cn";
import { fadeUp, EYEBROW, H2 } from "./shared";

/** Full-screen stack of every frame, opened at the frame that was clicked. */
function ShowcaseLightbox({ frames, startIndex, title, onClose }) {
  const frameRefs = useRef([]);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    frameRefs.current[startIndex]?.scrollIntoView({ block: "start" });
    return () => {
      window.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose, startIndex]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${title} — design showcase`}
      className="fixed inset-0 z-50 bg-black/95 overflow-y-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <button
        type="button"
        onClick={onClose}
        className="fixed top-4 right-4 z-50 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-[background-color] duration-200 text-white"
        aria-label="Close showcase"
        autoFocus
      >
        <X size={24} />
      </button>
      <div className="max-w-5xl mx-auto py-12 px-4 flex flex-col">
        {frames.map((frame, i) => (
          <img
            key={i}
            ref={(el) => (frameRefs.current[i] = el)}
            src={frame.url}
            alt={frame.alt || `${title} — frame ${i + 1}`}
            width={frame.width}
            height={frame.height}
            className="w-full h-auto block"
            loading={Math.abs(i - startIndex) <= 1 ? "eager" : "lazy"}
            decoding="async"
          />
        ))}
      </div>
    </div>
  );
}

/**
 * Design Showcase (fixed bottom spine). Frames show as a cropped, captioned
 * grid — showcase images range from screen-sized to 18,000px-tall Behance
 * strips, so each card shows the top of its frame and opens the full set.
 */
export function ShowcaseSection({ frames, title }) {
  const [openAt, setOpenAt] = useState(null);
  // Stable so the lightbox effect (which scrolls to the opened frame) runs
  // once per open, not on every parent render.
  const close = useCallback(() => setOpenAt(null), []);
  if (!frames.length) return null;
  const single = frames.length === 1;

  return (
    <section className="w-full max-w-7xl mx-auto px-6 mb-24 md:mb-32">
      <motion.div {...fadeUp}>
        <header className="flex flex-wrap items-end justify-between gap-4 mb-10 md:mb-12">
          <div>
            <p className={cn(EYEBROW, "mb-4")}>Design Showcase</p>
            <h2 className={H2}>The finished work</h2>
          </div>
          <button
            type="button"
            onClick={() => setOpenAt(0)}
            className="shrink-0 flex items-center gap-2 px-4 py-2 rounded-full bg-accent-subtle text-accent font-display text-sm transition-[background-color,transform] duration-200 hover:scale-105 motion-reduce:hover:transform-none"
          >
            <Expand size={16} />
            View full size{frames.length > 1 && ` · ${frames.length} frames`}
          </button>
        </header>

        <div className={cn("grid gap-x-8 gap-y-12", !single && "md:grid-cols-2")}>
          {frames.map((frame, i) => (
            <figure key={i}>
              <button
                type="button"
                onClick={() => setOpenAt(i)}
                className="group relative block w-full overflow-hidden rounded-xl border border-border bg-bg-secondary"
                aria-label={`View ${frame.title || `frame ${i + 1}`} full size`}
              >
                <img
                  src={frame.url}
                  alt={frame.alt || frame.title || `${title} — frame ${i + 1}`}
                  width={frame.width}
                  height={frame.height}
                  className={cn(
                    "w-full object-cover object-top",
                    single ? "aspect-[16/9]" : "aspect-[4/3]",
                  )}
                  loading="lazy"
                  fetchPriority="low"
                  decoding="async"
                />
                <span className="absolute inset-x-0 bottom-0 h-24 bg-linear-to-t from-black/60 to-transparent pointer-events-none" />
                <span className="absolute bottom-3 right-3 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/70 text-white text-xs font-display transition-[transform] duration-200 group-hover:scale-105 motion-reduce:transform-none">
                  <Expand size={14} />
                  Expand
                </span>
              </button>
              {(frame.title || frame.caption) && (
                <figcaption className="mt-4 leading-relaxed text-text-secondary">
                  {frame.title && (
                    <strong className="font-semibold text-text-primary">{frame.title} </strong>
                  )}
                  {frame.caption}
                </figcaption>
              )}
            </figure>
          ))}
        </div>
      </motion.div>

      {openAt !== null && (
        <ShowcaseLightbox
          frames={frames}
          startIndex={openAt}
          title={title}
          onClose={close}
        />
      )}
    </section>
  );
}
