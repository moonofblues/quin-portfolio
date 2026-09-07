import { lazy, Suspense, useEffect, useSyncExternalStore } from "react";
import { useLocation } from "react-router-dom";
import { Navigation } from "./Navigation";
import { Footer } from "./Footer";
import { Fireflies } from "../decorative/Fireflies";

// The Custom Cursor is lazy so it stays out of the entry chunk (redesign
// plan Q8): touch and reduced-motion visitors never download it at all,
// which is also how ADR 0007 rule 3 is enforced — not by disabling the
// effect after loading it, but by never mounting the component.
const Cursor = lazy(() =>
  import("../decorative/Cursor").then((m) => ({ default: m.Cursor })),
);

// ADR 0007 rules 2 and 3 together. Kept identical to the guard in
// index.css that hides the native cursor, so the two can never disagree
// and strand someone with no pointer at all.
const CURSOR_QUERY =
  "(pointer: fine) and (prefers-reduced-motion: no-preference)";

// Created lazily and once: matchMedia at module scope would run on import,
// and a fresh MediaQueryList per snapshot read would be wasted work.
let cursorQueryList;
function getCursorQuery() {
  cursorQueryList ??= window.matchMedia(CURSOR_QUERY);
  return cursorQueryList;
}

function subscribeToCursorQuery(onStoreChange) {
  const mq = getCursorQuery();
  mq.addEventListener("change", onStoreChange);
  return () => mq.removeEventListener("change", onStoreChange);
}

const getCursorQuerySnapshot = () => getCursorQuery().matches;

// useSyncExternalStore rather than useState + useEffect: matchMedia is
// exactly the external store this hook exists for. It also re-reads the
// snapshot after mount on its own, closing the render-to-effect gap (the
// user plugging in a mouse, or flipping the OS reduced-motion setting)
// without a setState inside an effect.
function useCustomCursorAllowed() {
  return useSyncExternalStore(subscribeToCursorQuery, getCursorQuerySnapshot);
}

export function Layout({ children }) {
  const { pathname, hash } = useLocation();
  const cursorAllowed = useCustomCursorAllowed();

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      return;
    }

    // Wait one frame so the incoming route has committed and the target
    // element exists, rather than guessing with a fixed timeout.
    const frame = requestAnimationFrame(() => {
      document.querySelector(hash)?.scrollIntoView({ behavior: "smooth" });
    });
    return () => cancelAnimationFrame(frame);
  }, [pathname, hash]);

  return (
    <div className="relative min-h-screen flex flex-col">
      {/* Ambient Layer: a fixed -z-10 sheet behind every page. Mounted here
          rather than per page so it is continuous across route changes and
          never remounts mid-navigation. */}
      <Fireflies />
      <Navigation />
      <main className="flex-1">{children}</main>
      <Footer />
      {cursorAllowed && (
        <Suspense fallback={null}>
          <Cursor />
        </Suspense>
      )}
    </div>
  );
}
