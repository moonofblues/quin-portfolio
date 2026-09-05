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
          re-rendered on every frame of the drift. */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background:
            "linear-gradient(135deg, #d4c4a8 0%, #c4b498 50%, #a89878 100%)",
          boxShadow:
            "0 0 60px rgba(212, 196, 168, 0.4), inset -10px -10px 30px rgba(0, 0, 0, 0.15)",
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
