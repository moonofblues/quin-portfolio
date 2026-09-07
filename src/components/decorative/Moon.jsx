import { cn } from "../../utils/cn";

export function Moon({ className, size = 120 }) {
  return (
    // The float loop is the CSS `animate-moon-drift` class, not framer-motion.
    // It runs for the life of the page, and a JS-driven loop would re-enter the
    // main thread every frame — including while the user is scrolling past it.
    // Transform-only keyframes let the compositor own it instead.
    <div
      className={cn(
        "relative animate-moon-drift",
        "sm:[--moon-size:var(--moon-base-size)] [--moon-size:100px] ",
        className,
      )}
      style={{
        "--moon-base-size": `${size}px`,
        width: "var(--moon-size)",
        height: "var(--moon-size)",
      }}
      aria-hidden="true"
    >
      {/* Moon body — the 60px glow is painted on this static child rather than
          the moving wrapper, so the blur is rasterized once instead of being
          re-rendered on every frame of the drift.

          Colour comes from --color-moon / --color-moon-shadow. Both were
          hardcoded to the retired gold (#d4c4a8 family), so the moon survived
          the Phase 1 re-skin untouched — a warm tan disc on the near-black
          lavender ground, while both tokens sat defined and unused. */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background:
            "linear-gradient(135deg, var(--color-moon) 0%, color-mix(in srgb, var(--color-moon) 65%, var(--color-moon-shadow)) 50%, var(--color-moon-shadow) 100%)",
          boxShadow:
            "0 0 60px color-mix(in srgb, var(--color-moon) 40%, transparent), inset -10px -10px 30px rgba(0, 0, 0, 0.25)",
        }}
      />
      {/* Moon glow */}
      <div
        className="absolute inset-0 rounded-full opacity-50"
        style={{
          background:
            "radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.3) 0%, transparent 60%)",
        }}
      />
    </div>
  );
}
