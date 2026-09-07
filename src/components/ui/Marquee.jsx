import { Children } from "react";
import { cn } from "../../utils/cn";

/**
 * A single-row, one-direction infinite marquee.
 *
 * CSS, never framer-motion. This loop runs for the life of the page, and a
 * JS-driven `repeat: Infinity` would wake the main thread every frame for the
 * whole session — even while the row is scrolled far offscreen. The keyframe
 * animates `transform` only, so the compositor owns it.
 *
 * The track is rendered twice and translated by exactly -50%, which is what
 * makes the seam invisible: at the halfway point the second copy sits exactly
 * where the first began. The duplicate is `aria-hidden` so a screen reader
 * reads the list once rather than twice.
 *
 * Hover pauses it (`animation-play-state`, so pausing costs nothing), which
 * matters because the content here is real information — the tools list — and
 * a reader must be able to stop it to actually read it.
 */
export function Marquee({ children, className, durationSeconds = 40, gap = "3rem" }) {
  const items = Children.toArray(children);

  // The trailing `paddingRight` is load-bearing, not cosmetic. Each track
  // carries its own trailing gap so the two tracks are exactly equal width
  // and the wrapper needs no gap of its own. Put the gap on the wrapper
  // instead and total width becomes `2W + gap`, so -50% translates by
  // `W + gap/2` — half a gap short, and the row visibly jumps once per cycle.
  const track = (hidden) => (
    <div
      className="marquee-track flex shrink-0 items-center"
      style={{ gap, paddingRight: gap }}
      aria-hidden={hidden || undefined}
    >
      {items.map((child, i) => (
        <div key={i} className="shrink-0">
          {child}
        </div>
      ))}
    </div>
  );

  return (
    <div className={cn("marquee", className)}>
      <div
        className="marquee-inner flex w-max"
        style={{ "--marquee-duration": `${durationSeconds}s` }}
      >
        {track(false)}
        {track(true)}
      </div>
    </div>
  );
}
