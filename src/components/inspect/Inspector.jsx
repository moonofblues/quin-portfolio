import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import "./inspect.css";

const COLOUR_PREFIX = "--color-";

// Collects every --color-* theme variable from the page's own stylesheets,
// following nested @layer blocks. Cross-origin sheets (Google Fonts) refuse to
// be read, so they are skipped.
function collectColourVariables(rules, found) {
  for (const rule of rules) {
    if (rule.cssRules) collectColourVariables(rule.cssRules, found);
    if (!rule.style) continue;
    for (const name of rule.style) {
      if (name.startsWith(COLOUR_PREFIX)) {
        found.set(name, rule.style.getPropertyValue(name).trim());
      }
    }
  }
}

// Maps a computed colour string, e.g. "rgb(169, 156, 228)", to its token name.
function readColourTokens() {
  const variables = new Map();
  for (const sheet of document.styleSheets) {
    try {
      collectColourVariables(sheet.cssRules, variables);
    } catch {
      continue;
    }
  }

  const probe = document.createElement("span");
  probe.style.display = "none";
  document.body.appendChild(probe);
  const tokens = new Map();
  for (const [name, value] of variables) {
    probe.style.color = value;
    const computed = getComputedStyle(probe).color;
    if (!tokens.has(computed)) tokens.set(computed, name.slice(COLOUR_PREFIX.length));
  }
  probe.remove();
  return tokens;
}

const hex = (n) => Number(n).toString(16).padStart(2, "0");

function colourLabel(value, tokens) {
  const name = tokens.get(value);
  const match = value.match(/\d+(\.\d+)?/g);
  const [r, g, b, a] = match ?? [];
  const shown =
    match && (a === undefined || Number(a) === 1)
      ? `#${hex(r)}${hex(g)}${hex(b)}`
      : value;
  return name ? `${name}  ${shown}` : shown;
}

// 16px 24px 16px 24px -> "16 24".
function spacing(style, property) {
  const [t, r, b, l] = ["Top", "Right", "Bottom", "Left"].map((side) =>
    Math.round(parseFloat(style[`${property}${side}`])),
  );
  if (!t && !r && !b && !l) return null;
  if (t === r && r === b && b === l) return `${t}`;
  if (t === b && r === l) return `${t} ${r}`;
  return `${t} ${r} ${b} ${l}`;
}

function describe(el, tokens) {
  const style = getComputedStyle(el);
  const rect = el.getBoundingClientRect();
  const hasText = [...el.childNodes].some(
    (node) => node.nodeType === Node.TEXT_NODE && node.textContent.trim(),
  );

  const rows = [["size", `${Math.round(rect.width)} × ${Math.round(rect.height)}`]];
  if (hasText) {
    const family = style.fontFamily.split(",")[0].replace(/["']/g, "").trim();
    rows.push(["font", `${family}, ${style.fontSize}, ${style.fontWeight}`]);
    rows.push(["line height", style.lineHeight]);
    rows.push(["text", colourLabel(style.color, tokens)]);
  }
  if (style.backgroundColor !== "rgba(0, 0, 0, 0)") {
    rows.push(["background", colourLabel(style.backgroundColor, tokens)]);
  }
  const padding = spacing(style, "padding");
  if (padding) rows.push(["padding", padding]);
  const margin = spacing(style, "margin");
  if (margin) rows.push(["margin", margin]);
  if (style.borderRadius !== "0px") rows.push(["radius", style.borderRadius]);

  return { name: el.tagName.toLowerCase(), rows };
}

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
          <dt className="inspect-name">Point at anything on the page. Esc to close.</dt>
        )}
      </dl>
    </>,
    document.body,
  );
}
