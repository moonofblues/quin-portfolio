import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { describe, readColourTokens } from "./measure";
import "./inspect.css";

function place(node, left, top, width, height) {
  node.style.transform = `translate(${left}px, ${top}px)`;
  node.style.width = `${width}px`;
  node.style.height = `${height}px`;
}

/**
 * Draws a box around whatever the pointer or keyboard focus is on, with a
 * readout of its real computed styles. Colours that match a theme token show
 * the token's name. One passive listener per event, redraws batched per frame.
 */
export function Inspector({ onClose }) {
  const boxRef = useRef(null);
  const marginRef = useRef(null);
  const readoutRef = useRef(null);
  const [info, setInfo] = useState(null);

  useEffect(() => {
    const tokens = readColourTokens();
    let target = null;
    let frame = 0;

    const draw = () => {
      frame = 0;
      if (!target?.isConnected) return;
      const rect = target.getBoundingClientRect();
      place(boxRef.current, rect.left, rect.top, rect.width, rect.height);

      const style = getComputedStyle(target);
      const [mt, mr, mb, ml] = ["Top", "Right", "Bottom", "Left"].map((side) =>
        parseFloat(style[`margin${side}`]),
      );
      const hasMargin = mt || mr || mb || ml;
      marginRef.current.style.display = hasMargin ? "block" : "none";
      if (hasMargin) {
        place(
          marginRef.current,
          rect.left - ml,
          rect.top - mt,
          rect.width + ml + mr,
          rect.height + mt + mb,
        );
      }
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(draw);
    };

    const pick = (el, x) => {
      if (!(el instanceof Element) || el === target) return;
      if (el.closest("[data-inspector]")) return;
      if (el === document.documentElement || el === document.body) return;
      target = el;
      // Keep the readout out from under the pointer.
      if (x !== undefined && readoutRef.current) {
        readoutRef.current.dataset.side = x < 340 ? "right" : "left";
      }
      setInfo(describe(el, tokens));
      schedule();
    };

    const onMove = (event) => pick(event.target, event.clientX);
    const onFocus = (event) => pick(event.target);
    const onKey = (event) => {
      if (event.key === "Escape") onClose();
    };

    const passive = { passive: true };
    document.addEventListener("pointermove", onMove, passive);
    document.addEventListener("focusin", onFocus);
    document.addEventListener("keydown", onKey);
    window.addEventListener("scroll", schedule, passive);
    window.addEventListener("resize", schedule, passive);
    return () => {
      document.removeEventListener("pointermove", onMove);
      document.removeEventListener("focusin", onFocus);
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [onClose]);

  return createPortal(
    <>
      <div ref={marginRef} className="inspect-margin" data-inspector aria-hidden="true" />
      <div ref={boxRef} className="inspect-box" data-inspector aria-hidden="true" />
      <dl ref={readoutRef} className="inspect-readout" data-inspector data-side="left">
        {info ? (
          <>
            <dt className="inspect-name">{info.name}</dt>
            {info.rows.map(([label, value]) => (
              <div key={label} className="inspect-row">
                <dt>{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </>
        ) : (
          <>
            <dt className="inspect-name">Inspect mode is on</dt>
            <dd>
              Point at anything on this page to see its real font, colours and
              spacing, read live from the code. Esc to close.
            </dd>
          </>
        )}
      </dl>
    </>,
    document.body,
  );
}
