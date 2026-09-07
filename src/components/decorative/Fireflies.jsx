import { cn } from "../../utils/cn";

/**
 * The Firefly field — the procedural half of the Ambient Layer.
 *
 * Deliberately CSS elements rather than a canvas or a particle library
 * (ADR 0006): `HomePage` already runs a permanent rAF loop for Lenis, and a
 * second loop on that same thread is exactly what makes scrolling feel
 * sticky. Every mote animates only `transform` and `opacity`, so the
 * compositor owns the whole field and the main thread does nothing per frame.
 *
 * The count is a hard cap, not a suggestion — each element is its own
 * compositor layer, so this approach degrades badly in the hundreds. If a
 * future design wants that many, canvas becomes the right answer and ADR 0006
 * should be revisited rather than this number quietly raised.
 */

const DESKTOP_COUNT = 35;

/** Small, fast, seedable PRNG (mulberry32). */
function mulberry32(seed) {
  return function random() {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// A Firefly is procedural where a Star is hand-placed — that distinction is
// the whole point of the two terms. But procedural must not mean *unstable*:
// the field is generated once at module scope from a fixed seed, so a
// re-render never reshuffles it under the reader.
const FIREFLIES = (() => {
  const rand = mulberry32(0x5eed);
  const pick = (min, max) => min + rand() * (max - min);

  return Array.from({ length: DESKTOP_COUNT }, () => ({
    left: `${pick(0, 100).toFixed(2)}%`,
    top: `${pick(0, 100).toFixed(2)}%`,
    size: `${pick(2, 4.5).toFixed(2)}px`,
    // Drift stays small and mostly upward — a mote adrift, not an insect
    // crossing the room. Large travel reads as movement and pulls the eye,
    // which the Ambient Layer must never do.
    dx: `${pick(-40, 40).toFixed(1)}px`,
    dy: `${pick(-50, -14).toFixed(1)}px`,
    driftDuration: `${pick(14, 30).toFixed(1)}s`,
    // Glow runs on its own duration so drift and brightness fall out of phase
    // instead of the field pulsing in lockstep.
    glowDuration: `${pick(3.5, 8).toFixed(1)}s`,
    // Negative delays start the field mid-animation: no synchronised fade-in
    // on load, and nothing sitting invisible for its first several seconds.
    driftDelay: `-${pick(0, 30).toFixed(1)}s`,
    glowDelay: `-${pick(0, 8).toFixed(1)}s`,
    minOpacity: pick(0.05, 0.15).toFixed(2),
    maxOpacity: pick(0.3, 0.6).toFixed(2),
    // Roughly a third mint, the rest lavender — the palette's two accents.
    mint: rand() < 0.35,
  }));
})();

export function Fireflies({ className }) {
  return (
    <div
      className={cn(
        "fireflies pointer-events-none fixed inset-0 -z-10 overflow-hidden",
        className,
      )}
      aria-hidden="true"
    >
      {FIREFLIES.map((f, i) => (
        <span
          key={i}
          className="firefly"
          style={{
            left: f.left,
            top: f.top,
            "--ff-size": f.size,
            "--ff-dx": f.dx,
            "--ff-dy": f.dy,
            "--ff-drift-duration": f.driftDuration,
            "--ff-glow-duration": f.glowDuration,
            "--ff-drift-delay": f.driftDelay,
            "--ff-glow-delay": f.glowDelay,
            "--ff-min": f.minOpacity,
            "--ff-max": f.maxOpacity,
            "--ff-color": f.mint
              ? "var(--color-accent-secondary)"
              : "var(--color-accent)",
          }}
        />
      ))}
    </div>
  );
}
