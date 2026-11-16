import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronDown, ChevronUp, ExternalLink, Expand } from "lucide-react";
import { cn } from "../../../utils/cn";
import { Button } from "../../ui/Button";
import { LightboxShell } from "./blocks/LightboxShell";
import { H2, HEADER_GAP, PAGE_WIDTH, SECTION_GAP } from "./shared";

/** Full-screen stack of every frame, opened at the frame that was clicked. */
function ShowcaseLightbox({ frames, startIndex, title, onClose }) {
  const frameRefs = useRef([]);

  useEffect(() => {
    frameRefs.current[startIndex]?.scrollIntoView({ block: "start" });
  }, [startIndex]);

  return (
    <LightboxShell label={`${title}: design showcase`} closeLabel="Close showcase" onClose={onClose}>
      <div className="max-w-5xl mx-auto py-12 px-4 flex flex-col">
        {frames.map((frame, i) => (
          <img
            key={i}
            ref={(el) => (frameRefs.current[i] = el)}
            src={frame.url}
            alt={frame.alt || `${title}, frame ${i + 1}`}
            width={frame.width}
            height={frame.height}
            className="w-full h-auto block"
            loading={Math.abs(i - startIndex) <= 1 ? "eager" : "lazy"}
            decoding="async"
            onClick={(e) => e.stopPropagation()}
          />
        ))}
      </div>
    </LightboxShell>
  );
}

/**
 * Design Showcase (fixed bottom spine). Laid out like a Behance project: every
 * frame stacked edge to edge as one continuous piece. Showcase frames can be
 * thousands of pixels tall, so the stack starts capped to about one screen with
 * a fade, and "Continue viewing" opens it up in place. Clicking a frame opens
 * the same continuous stack full screen.
 */
export function ShowcaseSection({ frames, title, behanceUrl }) {
  const [openAt, setOpenAt] = useState(null);
  const [expanded, setExpanded] = useState(false);
  // True only when the stack is taller than the collapsed cap; short showcases
  // (one screen-sized frame) get no fade and no button.
  const [overflowing, setOverflowing] = useState(false);
  const panelRef = useRef(null);
  const stackRef = useRef(null);
  const sectionRef = useRef(null);
  // Stable so the lightbox effect (which scrolls to the opened frame) runs
  // once per open, not on every parent render.
  const close = useCallback(() => setOpenAt(null), []);

  // Images load in after first paint and change the stack's height, so watch
  // its size instead of measuring once.
  useEffect(() => {
    const panel = panelRef.current;
    const stack = stackRef.current;
    if (!panel || !stack) return;
    const measure = () => setOverflowing(stack.offsetHeight > panel.clientHeight + 1 || expanded);
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(stack);
    return () => observer.disconnect();
  }, [expanded, frames.length]);

  if (!frames.length) return null;

  const collapse = () => {
    setExpanded(false);
    sectionRef.current?.scrollIntoView({ block: "start" });
  };

  return (
    <section ref={sectionRef} className={cn(PAGE_WIDTH, SECTION_GAP, "scroll-mt-36")}>
      <header className={cn("flex flex-wrap items-end justify-between gap-4", HEADER_GAP)}>
        <h2 className={H2}>The finished work</h2>
        <div className="flex flex-wrap items-center gap-3">
          {behanceUrl && (
            <Button
              href={behanceUrl}
              target="_blank"
              rel="noopener noreferrer"
              variant="secondary"
              size="small"
            >
              View on Behance
              <ExternalLink size={16} />
            </Button>
          )}
          <button
            type="button"
            onClick={() => setOpenAt(0)}
            className="shrink-0 flex items-center gap-2 px-4 py-2 rounded-full bg-accent-subtle text-accent font-display text-sm transition-[background-color,transform] duration-200 hover:scale-105 motion-reduce:hover:transform-none"
          >
            <Expand size={16} />
            View full size{frames.length > 1 && ` · ${frames.length} frames`}
          </button>
        </div>
      </header>

      <div className="relative max-w-5xl mx-auto">
        <div
          ref={panelRef}
          className={cn(
            "overflow-hidden rounded-xl border border-border bg-bg-secondary",
            !expanded && "max-h-[85vh]",
          )}
        >
          <div ref={stackRef} className="flex flex-col">
            {frames.map((frame, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setOpenAt(i)}
                className="block w-full cursor-zoom-in"
                aria-label={`View ${frame.title || `frame ${i + 1}`} full size`}
              >
                <img
                  src={frame.url}
                  alt={frame.alt || frame.title || `${title}, frame ${i + 1}`}
                  width={frame.width}
                  height={frame.height}
                  className="block w-full h-auto"
                  loading={i === 0 ? "eager" : "lazy"}
                  fetchPriority="low"
                  decoding="async"
                />
              </button>
            ))}
          </div>
        </div>

        {!expanded && overflowing && (
          <div className="absolute inset-x-0 bottom-0 flex justify-center items-end h-48 rounded-b-xl bg-linear-to-t from-bg-primary via-bg-primary/80 to-transparent pointer-events-none">
            <button
              type="button"
              onClick={() => setExpanded(true)}
              className="pointer-events-auto mb-5 flex items-center gap-2 px-5 py-2.5 rounded-full bg-accent text-white font-display text-sm transition-[transform] duration-200 hover:scale-105 motion-reduce:hover:transform-none"
            >
              Continue viewing
              <ChevronDown size={16} />
            </button>
          </div>
        )}
      </div>

      {expanded && (
        <div className="mt-6 flex justify-center">
          <button
            type="button"
            onClick={collapse}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-accent-subtle text-accent font-display text-sm transition-[background-color,transform] duration-200 hover:scale-105 motion-reduce:hover:transform-none"
          >
            Show less
            <ChevronUp size={16} />
          </button>
        </div>
      )}

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
