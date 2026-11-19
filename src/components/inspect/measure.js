// Reads an element's real computed styles. Shared by Inspect mode (the nav
// button) and the hero's inspector sweep, so both show the same true numbers.

const COLOUR_PREFIX = "--color-";

// Collects every --color-* theme variable from the page's own stylesheets,
// following nested @layer blocks. Cross-origin sheets (Google Fonts) refuse to
// be read, so they are skipped.
function collectColourVariables(rules, found) {
  for (const rule of rules) {
    // The print stylesheet redefines the colours as black. Reading it would
    // overwrite the real values with those.
    if (rule.media && /print/.test(rule.media.mediaText)) continue;
    if (rule.cssRules) collectColourVariables(rule.cssRules, found);
    if (!rule.style) continue;
    for (const name of rule.style) {
      if (name.startsWith(COLOUR_PREFIX)) {
        found.set(name, rule.style.getPropertyValue(name).trim());
      }
    }
  }
}

// Maps a computed colour string, e.g. "rgb(99, 132, 255)", to its token name.
export function readColourTokens() {
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
  // Several tokens can share one value (the marker is the same blue as the
  // accent, ADR 0019). Name the colour after the general token first, and the
  // marker tokens only when nothing else has that value.
  const isMark = (name) => name.includes("mark");
  const ordered = [...variables].sort(
    ([a], [b]) => Number(isMark(a)) - Number(isMark(b)),
  );
  for (const [name, value] of ordered) {
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

/** True when the element holds text of its own, not only inside children. */
export function hasOwnText(el) {
  return [...el.childNodes].some(
    (node) => node.nodeType === Node.TEXT_NODE && node.textContent.trim(),
  );
}

export function describe(el, tokens) {
  const style = getComputedStyle(el);
  const rect = el.getBoundingClientRect();
  const hasText = hasOwnText(el);

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
