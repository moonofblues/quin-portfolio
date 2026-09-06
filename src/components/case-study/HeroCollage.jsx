import { cn } from "../../utils/cn";

// Subtle per-frame tilt only. The collage now sits in a single row, so the
// old vertical-translate offsets (tuned for a 2x2 grid) would just leave the
// row's top and bottom edges ragged.
const TILTS = ["md:-rotate-1", "md:rotate-1", "md:-rotate-2", "md:rotate-1"];

function BrowserFrame({ src, alt, className }) {
  return (
    <div
      className={cn(
        "rounded-xl overflow-hidden shadow-xl bg-bg-elevated border border-border",
        className,
      )}
    >
      <div className="flex items-center gap-1.5 px-3 py-2 bg-bg-tertiary">
        <span className="w-2.5 h-2.5 rounded-full bg-text-muted/40" />
        <span className="w-2.5 h-2.5 rounded-full bg-text-muted/40" />
        <span className="w-2.5 h-2.5 rounded-full bg-text-muted/40" />
      </div>
      {/* Fixed aspect so every frame in the row is the same height regardless
          of the screenshot's native dimensions. */}
      <img
        src={src}
        alt={alt}
        className="w-full aspect-[16/10] object-cover"
        loading="lazy"
        decoding="async"
      />
    </div>
  );
}

export function HeroCollage({ images, title }) {
  const frames = images.filter(Boolean).slice(0, 4);

  if (frames.length < 3) {
    const single = frames[0];
    return (
      <div className="rounded-2xl overflow-hidden bg-bg-tertiary aspect-video">
        {single ? (
          <img
            src={single}
            alt={title}
            className="w-full h-full object-cover"
            loading="lazy"
            decoding="async"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="font-display text-4xl text-text-muted">
              {title}
            </span>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="rounded-2xl p-6 md:p-12 ">
      {/* One row from md up; stacked on mobile so 3-4 browser frames don't
          shrink to an unreadable width. */}
      <div
        className={cn(
          "grid grid-cols-1 gap-4 md:gap-6",
          frames.length === 3 ? "md:grid-cols-3" : "md:grid-cols-4",
        )}
      >
        {frames.map((src, i) => (
          <BrowserFrame
            key={i}
            src={src}
            alt={`${title} — screen ${i + 1}`}
            className={TILTS[i % TILTS.length]}
          />
        ))}
      </div>
    </div>
  );
}
