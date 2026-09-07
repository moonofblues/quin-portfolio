import { cn } from "../../utils/cn";

/**
 * A single twinkling star.
 *
 * The twinkle is a CSS loop (`animate-star-twinkle`), not framer-motion —
 * these never stop, and several render at once, so a JS animation loop would
 * keep the main thread busy for the whole session. `delay` is applied as a
 * negative animation-delay so the stars start out of phase without any of
 * them being invisible for the first second.
 *
 * Fill comes from the `--color-star` CSS variable, so the glyph never has to
 * subscribe to React state just to pick its colour.
 */
export function Star({ className, style, size = 24, delay = 0 }) {
  return (
    <svg
      className={cn("animate-star-twinkle", className)}
      style={{ animationDelay: `-${delay}s`, ...style }}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z"
        fill="var(--color-star)"
      />
    </svg>
  );
}

const POSITIONS = [
  { top: "10%", right: "15%", size: 16, delay: 0 },
  { top: "20%", right: "8%", size: 24, delay: 0.5 },
  { top: "35%", right: "20%", size: 12, delay: 1 },
  { top: "15%", left: "10%", size: 14, delay: 1.5 },
  { top: "45%", left: "5%", size: 18, delay: 2 },
];

export function Stars({ count = 5, className }) {
  return (
    <div
      className={cn(
        "absolute inset-0 pointer-events-none overflow-hidden",
        className,
      )}
    >
      {POSITIONS.slice(0, count).map((pos, i) => (
        <Star
          key={i}
          className="absolute"
          style={{ top: pos.top, left: pos.left, right: pos.right }}
          size={pos.size}
          delay={pos.delay}
        />
      ))}
    </div>
  );
}
