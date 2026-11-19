import { lazy, Suspense, useCallback, useEffect, useState } from "react";

// The sweep and its stylesheet download only if this gate says yes, so nobody
// else pays for them (CLAUDE.md, Performance: nothing heavy in the entry chunk).
const InspectorSweep = lazy(() =>
  import("./InspectorSweep").then((m) => ({ default: m.InspectorSweep })),
);

// Desktop with a mouse. A phone gets the tape and brackets only, no sweep.
const DESKTOP = "(min-width: 1024px) and (hover: hover) and (pointer: fine)";
const SETTLE_MS = 1200;

// Once per page load, so going back to /dev inside the app does not replay it.
let played = false;

/**
 * Runs the hero's inspector sweep once, a moment after the hero has settled.
 * Renders nothing itself.
 */
export function HeroSweep() {
  const [running, setRunning] = useState(false);
  const finish = useCallback(() => setRunning(false), []);

  useEffect(() => {
    if (played) return undefined;
    if (!window.matchMedia(DESKTOP).matches) return undefined;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;

    const timer = setTimeout(() => {
      // Do not fight the real Inspect mode if someone already turned it on.
      if (document.querySelector("[data-inspector]")) return;
      played = true;
      setRunning(true);
    }, SETTLE_MS);
    return () => clearTimeout(timer);
  }, []);

  if (!running) return null;
  return (
    <Suspense fallback={null}>
      <InspectorSweep onDone={finish} />
    </Suspense>
  );
}
