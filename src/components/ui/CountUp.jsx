import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";

/**
 * A number that counts up to its value once, the first time it scrolls in.
 *
 * "Once" is enforced twice over: `useInView(..., { once: true })` never flips
 * back to false, and `hasRun` guards the effect so a re-render cannot restart
 * the count. A stat that re-animates every time it scrolls past reads as a
 * glitch rather than an effect.
 *
 * The tween is a plain rAF loop rather than framer-motion: it runs for well
 * under a second, exactly once, and then stops — so there is nothing for an
 * animation controller to manage, and this keeps the primitive free of any
 * per-instance motion machinery.
 */
export function CountUp({
  to,
  durationMs = 1200,
  decimals = 0,
  prefix = "",
  suffix = "",
  className,
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const reduceMotion = useReducedMotion();
  const hasRun = useRef(false);

  const [value, setValue] = useState(0);

  useEffect(() => {
    // Reduced motion is handled by deriving the rendered value below, not by
    // setting state here: a setState called synchronously in an effect body
    // triggers a second render pass for a value that was already knowable.
    if (!inView || hasRun.current || reduceMotion) return;
    hasRun.current = true;

    let frame = 0;
    const start = performance.now();
    // easeOutCubic — fast off the mark, settling gently onto the final value.
    const ease = (t) => 1 - Math.pow(1 - t, 3);

    function tick(now) {
      const t = Math.min(1, (now - start) / durationMs);
      setValue(to * ease(t));
      if (t < 1) frame = requestAnimationFrame(tick);
    }
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, reduceMotion, to, durationMs]);

  // Reduced motion shows the final number immediately — the point of the
  // component is the value, and the tween is the decoration.
  const shown = reduceMotion ? to : value;

  return (
    <span ref={ref} className={className}>
      {prefix}
      {shown.toFixed(decimals)}
      {suffix}
    </span>
  );
}
