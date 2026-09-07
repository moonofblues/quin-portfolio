import { useEffect, useRef, useState } from "react";
import { cn } from "../../utils/cn";

/**
 * The Custom Cursor — a dot at the true pointer position plus a lagging ring.
 *
 * ADR 0007 binds this component to four rules. They are not stylistic
 * preferences: quietly breaking rule 1 or 3 strands real users with no
 * visible pointer, and it is the kind of regression that is hard to notice.
 *
 *   1. The dot tracks the pointer 1:1 — only the ring eases. Something is
 *      always rendered at the real coordinates, so a stall degrades the
 *      effect rather than losing the pointer.
 *   2. The native cursor is hidden only under `(pointer: fine)`. Enforced in
 *      `index.css`, keyed off the class this component adds on mount, so a
 *      chunk that never loads leaves the native cursor alone.
 *   3. `prefers-reduced-motion` disables it entirely. Enforced by the caller
 *      (`layout/Layout.jsx`), which never mounts this component — so the lazy
 *      chunk is not even downloaded.
 *   4. The pointer listener is passive and rAF-coalesced, and the loop parks
 *      itself once the ring has caught up. Cost falls to zero at rest.
 */

// Fraction of the remaining gap the ring closes per frame. Lower lags more.
const RING_EASE = 0.18;
// Below this the ring is visually on target and the loop can stop.
const SETTLE_EPSILON = 0.1;

export function Cursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  // Pointer truth and ring position live in refs, never in state: these change
  // on every pointer frame, and a re-render per frame is the exact cost this
  // component is shaped to avoid.
  const target = useRef({ x: 0, y: 0 });
  const ring = useRef({ x: 0, y: 0 });
  const frame = useRef(0); // 0 means the loop is parked
  const seeded = useRef(false); // has the pointer been seen at all yet?

  // These two *do* belong in state — they change on hover and on entering or
  // leaving the window, not per frame. A Cursor Affordance is a property of
  // the hovered element, so the label is read from its `data-cursor`.
  const [label, setLabel] = useState(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("has-custom-cursor");

    function render() {
      const dot = dotRef.current;
      const ringEl = ringRef.current;
      if (!dot || !ringEl) {
        frame.current = 0;
        return;
      }

      const { x, y } = target.current;

      // Rule 1 — raw coordinates, no easing, every frame.
      dot.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;

      const dx = x - ring.current.x;
      const dy = y - ring.current.y;
      ring.current.x += dx * RING_EASE;
      ring.current.y += dy * RING_EASE;
      ringEl.style.transform = `translate3d(${ring.current.x}px, ${ring.current.y}px, 0) translate(-50%, -50%)`;

      // Rule 4 — once the ring is on target there is nothing left to animate,
      // so park the loop rather than burn a frame for the rest of the session.
      if (Math.abs(dx) < SETTLE_EPSILON && Math.abs(dy) < SETTLE_EPSILON) {
        ring.current.x = x;
        ring.current.y = y;
        frame.current = 0;
        return;
      }
      frame.current = requestAnimationFrame(render);
    }

    function wake() {
      if (!frame.current) frame.current = requestAnimationFrame(render);
    }

    function onMove(e) {
      target.current.x = e.clientX;
      target.current.y = e.clientY;

      if (!seeded.current) {
        // Start the ring where the pointer actually is, so it doesn't sweep in
        // from the top-left corner on the first sighting.
        seeded.current = true;
        ring.current.x = e.clientX;
        ring.current.y = e.clientY;
        setVisible(true);
      }
      wake();
    }

    function onOver(e) {
      const el = e.target?.closest?.("[data-cursor]");
      const next = el ? el.getAttribute("data-cursor") : null;
      // Compare before setting: pointerover fires constantly while moving
      // within one element, and an unchanged value would re-render for nothing.
      setLabel((prev) => (prev === next ? prev : next));
    }

    function onLeave() {
      setVisible(false);
    }
    function onEnter() {
      if (seeded.current) setVisible(true);
    }

    // Rule 4 — passive, so the listener can never hold up compositing.
    const opts = { passive: true };
    window.addEventListener("pointermove", onMove, opts);
    window.addEventListener("pointerover", onOver, opts);
    document.addEventListener("pointerleave", onLeave, opts);
    document.addEventListener("pointerenter", onEnter, opts);

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
      document.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("pointerenter", onEnter);
      if (frame.current) cancelAnimationFrame(frame.current);
      // Never leave the page with no pointer at all.
      root.classList.remove("has-custom-cursor");
    };
  }, []);

  return (
    <div
      className={cn("cursor-layer", visible && "is-visible")}
      aria-hidden="true"
    >
      <div
        ref={ringRef}
        className="cursor-ring"
        data-labelled={label ? "" : undefined}
      >
        {label && <span className="cursor-label">{label}</span>}
      </div>
      <div ref={dotRef} className="cursor-dot" />
    </div>
  );
}
