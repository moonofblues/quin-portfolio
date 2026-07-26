import { cn } from "../../utils/cn";

const OFFSETS = [
  "md:translate-y-6 md:-rotate-1 z-[3]",
  "md:-translate-y-4 md:rotate-1 z-[2]",
  "md:translate-y-10 md:-rotate-2 z-[1]",
  "md:-translate-y-2 md:rotate-2 z-[4]",
];

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
      <img
        src={src}
        alt={alt}
        className="w-full h-auto object-cover"
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
            <span className="font-display text-4xl text-text-muted">{title}</span>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="rounded-2xl p-6 md:p-12 bg-accent-subtle">
      <div className="grid grid-cols-2 gap-4 md:gap-6">
        {frames.map((src, i) => (
          <BrowserFrame
            key={i}
            src={src}
            alt={`${title} — screen ${i + 1}`}
            className={cn("transition-transform", OFFSETS[i % OFFSETS.length])}
          />
        ))}
      </div>
    </div>
  );
}
