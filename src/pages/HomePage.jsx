import { useEffect } from "react";
import { Hero } from "../components/Hero";
import { Introduction } from "../components/Introduction";
import { FeaturedWork } from "../components/FeaturedWork";
import { OtherWork } from "../components/OtherWork";
import { Services } from "../components/Services";
import { About } from "../components/About";
import { Now } from "../components/Now";
import { Testimonials } from "../components/Testimonials";
import { Contact } from "../components/Contact";

export function HomePage() {
  // Lenis is loaded dynamically rather than imported at the top of the file.
  // A static import puts it in the entry chunk, so every visitor pays ~5.3 kB
  // gzipped (plus parse and execute) before the homepage can paint — for
  // scroll momentum that cannot matter until they actually scroll. Fetching it
  // here moves that cost off the critical path entirely; the only visible
  // effect is that the first fraction of a second of scrolling is native.
  //
  // Do not turn this back into a top-level import: it is the reclaim that
  // bought the headroom Phase 4 spends (see Q8 in docs/redesign-plan.md).
  useEffect(() => {
    let lenis;
    let rafId;
    // The import may resolve after this component has already unmounted (a
    // fast route change, or React 18 double-invoking the effect in dev), and
    // constructing Lenis then would leave an orphaned instance driving a rAF
    // loop with no way to reach it. This flag is what prevents that leak.
    let cancelled = false;

    import("lenis").then(({ default: Lenis }) => {
      if (cancelled) return;

      lenis = new Lenis({
        duration: 1.0,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
      });

      function raf(time) {
        lenis.raf(time);
        rafId = requestAnimationFrame(raf);
      }
      rafId = requestAnimationFrame(raf);
    });

    return () => {
      cancelled = true;
      if (rafId) cancelAnimationFrame(rafId);
      lenis?.destroy();
    };
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden noise-overlay">
      <main>
        <Hero />
        <Introduction />
        <FeaturedWork />
        <OtherWork />
        <Services />
        <About />
        {/* Placed here, not per any explicit ordering in the plan (Q1 only
            fixes its numeral at "03", not its position): activity-level
            "right now" content reads naturally right after About's
            role-level timeline, before Testimonials closes the narrative. */}
        <Now />
        <Testimonials />
        <Contact />
      </main>
    </div>
  );
}
