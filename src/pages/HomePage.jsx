import { useEffect } from "react";
import Lenis from "lenis";
import { Hero } from "../components/Hero";
import { Introduction } from "../components/Introduction";
import { FeaturedWork } from "../components/FeaturedWork";
import { OtherWork } from "../components/OtherWork";
import { Services } from "../components/Services";
import { About } from "../components/About";
import { Testimonials } from "../components/Testimonials";
import { Contact } from "../components/Contact";

export function HomePage() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.0,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    let rafId;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
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
        <Testimonials />
        <Contact />
      </main>
    </div>
  );
}
