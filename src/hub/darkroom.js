// The darkroom loader (ADR 0020) shows once per visit, not on every page view.

const SEEN_KEY = "hub-scanned";

/** Whether this arrival should open with the loader. */
export function shouldScan(hash) {
  // A link straight to a section (/#about) goes straight there.
  if (hash) return false;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
  try {
    return sessionStorage.getItem(SEEN_KEY) !== "1";
  } catch {
    // Storage blocked: show it, it only lasts a moment.
    return true;
  }
}

export function markScanned() {
  try {
    sessionStorage.setItem(SEEN_KEY, "1");
  } catch {
    // Blocked storage: it just plays again next time.
  }
}
