import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { describe, hasOwnText, readColourTokens } from "./measure";
import "./inspect.css";

// The hero's arrival scene (ADR 0020): the page inspects itself once. An
// outline moves across three real parts of the hero and the readout shows their
// live computed styles, read the same way Inspect mode reads them. Any scroll,
// click or key press ends it. Loaded only on desktop, only when motion is
// allowed, and only after the page has settled (see HeroSweep).

const TARGETS = ["#home h1", "#home a[href='#work']", "#home [data-sweep]"];
const STEP_MS = 1400;
const ROWS = 4;

// A heading built from per-line spans holds no text of its own, so its font and
// colour are read from the first element that does. The box still goes around
// the whole heading.
const textElementOf = (el) =>
  hasOwnText(el) ? el : ([...el.querySelectorAll("*")].find(hasOwnText) ?? el);

export function InspectorSweep({ onDone }) {
  const [step, setStep] = useState(null);

  useEffect(() => {
    const tokens = readColourTokens();
    const targets = TARGETS.map((selector) => document.querySelector(selector)).filter(
      Boolean,
    );
    let index = 0;
    let timer = 0;
    let stopped = false;

    const stop = () => {
      if (stopped) return;
      stopped = true;
      clearTimeout(timer);
      onDone();
    };

    const show = () => {
      if (stopped) return;
      // The real Inspect mode took over: step aside, never two panels at once.
      if (document.querySelector("[data-inspector]:not(.inspect-sweep)")) {
        stop();
        return;
      }
      const el = targets[index];
      if (!el || !el.isConnected) {
        stop();
        return;
      }
      const box = el.getBoundingClientRect();
      const info = describe(textElementOf(el), tokens);
      setStep({
        index,
        box: { left: box.left, top: box.top, width: box.width, height: box.height },
        name: el.tagName.toLowerCase(),
        rows: info.rows.slice(0, ROWS),
        // The readout goes on the side with room, so it never covers the box.
        side: box.left + box.width / 2 < 340 ? "right" : "left",
      });
      index += 1;
      timer = setTimeout(index < targets.length ? show : stop, STEP_MS);
    };

    timer = setTimeout(show, 0);

    const passive = { passive: true };
    window.addEventListener("scroll", stop, passive);
    window.addEventListener("resize", stop, passive);
    window.addEventListener("pointerdown", stop, passive);
    window.addEventListener("keydown", stop);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", stop);
      window.removeEventListener("resize", stop);
      window.removeEventListener("pointerdown", stop);
      window.removeEventListener("keydown", stop);
    };
  }, [onDone]);

  if (!step) return null;

  return createPortal(
    <>
      <div
        key={`box-${step.index}`}
        className="inspect-box inspect-sweep"
        data-inspector
        aria-hidden="true"
        style={{
          transform: `translate(${step.box.left}px, ${step.box.top}px)`,
          width: step.box.width,
          height: step.box.height,
        }}
      />
      <dl
        key={`readout-${step.index}`}
        className="inspect-readout inspect-sweep"
        data-inspector
        data-side={step.side}
        aria-hidden="true"
      >
        <dt className="inspect-name">{step.name}</dt>
        {step.rows.map(([label, value]) => (
          <div key={label} className="inspect-row">
            <dt>{label}</dt>
            <dd>{value}</dd>
          </div>
        ))}
      </dl>
    </>,
    document.body,
  );
}
