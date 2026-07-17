import { Hero } from "../components/Hero";
import { Introduction } from "../components/Introduction";
import { FeaturedWork } from "../components/FeaturedWork";
import { OtherWork } from "../components/OtherWork";
import { Services } from "../components/Services";
import { About } from "../components/About";
import { Testimonials } from "../components/Testimonials";
import { Contact } from "../components/Contact";

export function HomePage() {
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
