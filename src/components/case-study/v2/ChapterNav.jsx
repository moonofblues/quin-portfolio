import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "../../../utils/cn";

/**
 * Sticky chapter bar (ADR 0011, D6). `chapters` is [{ id, label }] in page
 * order, where `id` is the element where each chapter starts. The active
 * chapter is the last one whose start has passed a line 40% down the
 * viewport, tracked with IntersectionObserver, so there is no scroll listener
 * on the main thread.
 */
export function ChapterNav({ chapters }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const targets = chapters
      .map((chapter) => document.getElementById(chapter.id))
      .filter(Boolean);
    if (!targets.length) return;

    const update = () => {
      const line = window.innerHeight * 0.4;
      let index = 0;
      chapters.forEach((chapter, i) => {
        const el = document.getElementById(chapter.id);
        if (el && el.getBoundingClientRect().top <= line) index = i;
      });
      setActiveIndex(index);
    };

    // A zero-height band at the 40% line: every chapter start crossing it, in
    // either direction, triggers one recompute.
    const observer = new IntersectionObserver(update, {
      rootMargin: "-40% 0px -60% 0px",
    });
    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [chapters]);

  if (chapters.length < 2) return null;
  const active = chapters[activeIndex] ?? chapters[0];

  return (
    <nav
      aria-label="Case study chapters"
      className="sticky top-[4.25rem] md:top-[4.75rem] z-40 w-full max-w-7xl mx-auto px-6 mb-10"
    >
      {/* Wide screens: one row, current chapter highlighted. */}
      <ol className="hidden md:flex w-fit mx-auto items-center gap-1 rounded-full glass border border-border p-1.5">
        {chapters.map((chapter, i) => (
          <li key={chapter.id}>
            <a
              href={`#${chapter.id}`}
              aria-current={i === activeIndex ? "location" : undefined}
              className={cn(
                "block rounded-full px-4 py-1.5 font-display text-xs uppercase tracking-wider transition-[color,background-color] duration-200",
                i === activeIndex
                  ? "bg-accent text-on-accent"
                  : "text-text-secondary hover:text-text-primary hover:bg-bg-hover",
              )}
            >
              {chapter.label}
            </a>
          </li>
        ))}
      </ol>

      {/* Phones: a compact pill that opens the chapter list. */}
      <div className="md:hidden">
        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          className="w-full flex items-center justify-between gap-3 rounded-full glass border border-border px-5 py-2.5 text-sm text-text-primary"
        >
          <span>
            <span className="text-text-muted">
              Chapter {activeIndex + 1} of {chapters.length} ·{" "}
            </span>
            {active.label}
          </span>
          <ChevronDown
            size={16}
            className={cn("transition-transform duration-200", open && "rotate-180")}
          />
        </button>
        {open && (
          <ol className="mt-2 rounded-2xl glass border border-border p-2">
            {chapters.map((chapter, i) => (
              <li key={chapter.id}>
                <a
                  href={`#${chapter.id}`}
                  onClick={() => setOpen(false)}
                  aria-current={i === activeIndex ? "location" : undefined}
                  className={cn(
                    "block rounded-xl px-4 py-3 text-sm",
                    i === activeIndex ? "bg-accent-subtle text-accent" : "text-text-secondary",
                  )}
                >
                  {chapter.label}
                </a>
              </li>
            ))}
          </ol>
        )}
      </div>
    </nav>
  );
}
