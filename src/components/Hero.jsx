import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import { Button } from "./ui/Button";
import { Tag } from "./ui/Tag";
import { Moon } from "./decorative/Moon";
import { Star } from "./decorative/Stars";
import { RevealLines } from "./ui/RevealLines";
import { SERVICE_BY_ID, parseHeadline } from "../data/services";
import zcmcWebsiteDark from "../assets/zcmc-website-hero-dark.webp";
import adzuPortal from "../assets/adzu-portal-home.webp";
import erpDashboard from "../assets/erp-dashboard.webp";

const DEFAULT_HEADLINE = [
  "Designing Systems and Visuals That",
  <span className="text-gradient">Actually Work</span>,
];
const DEFAULT_DESCRIPTION =
  "From pixel to production — I bridge design and development to create interfaces that are as functional as they are beautiful.";
const DEFAULT_TAGS = [
  "UI/UX Design",
  "Front-End Dev",
  "Web Development",
  "Low-Code/No-Code Dev",
  "Video Editing",
  "Graphic Designing",
];

// Entrance timings.
//
// These used to run out to a 1.2s delay, which meant the hero screenshot — the
// largest element on the page, i.e. the LCP candidate — sat at opacity 0 for
// over a second no matter how fast it downloaded. The stagger is kept, but
// compressed so the whole sequence resolves in well under half a second, and
// the centre screenshot now leads the collage instead of trailing it.
const EASE_OUT = [0.22, 1, 0.36, 1];

export function Hero() {
  const [searchParams] = useSearchParams();
  const focusId = searchParams.get("focus");
  const service = focusId ? SERVICE_BY_ID[focusId] : null;

  // When a focus is active, build a single headline line with gradient spans
  // parsed from the *marked* segments in the copy. When no focus, use the
  // two-line default with the hardcoded gradient second line.
  const headlineLines = service
    ? [
        <>
          {parseHeadline(service.heroHeadline).map((p, i) =>
            p.gradient ? (
              <span key={i} className="text-gradient">
                {p.text}
              </span>
            ) : (
              p.text
            )
          )}
        </>,
      ]
    : DEFAULT_HEADLINE;

  const description = service ? service.heroDescription : DEFAULT_DESCRIPTION;
  const tags = service ? service.heroTags : DEFAULT_TAGS;

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col overflow-hidden pt-24 md:pt-28"
      aria-label="hero section"
    >
      <div className="absolute inset-0 bg-gradient-radial" />

      <Moon
        className="absolute top-22 sm:top-48 left-8 md:left-16 lg:left-24 z-0"
        size={250}
      />
      <Star
        className="absolute top-32 right-12 md:right-24"
        size={28}
        delay={0}
      />
      <Star
        className="absolute top-48 right-8 md:right-16"
        size={16}
        delay={0.5}
      />
      <Star
        className="absolute bottom-32 left-16 md:left-32"
        size={20}
        delay={1}
      />

      <div className="container relative z-10 text-center flex flex-col items-center justify-center grow">
        <motion.div
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs md:text-sm bg-bg-tertiary text-text-secondary mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.05, ease: EASE_OUT }}
        >
          <span className="relative flex h-2 w-2" aria-hidden="true">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
          </span>
          Portfolio in progress — more of my works are still being added
        </motion.div>

        <motion.div
          className="flex flex-wrap justify-center max-w-2xl gap-2 mb-8"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1, ease: EASE_OUT }}
        >
          {tags.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </motion.div>

        {/* Q4 (Hero): re-skin + motion, no restructure — the collage and LCP
            timing below are untouched. RevealLines wipes each line up from
            behind its own mask. `eager` uses `animate` instead of
            `whileInView` so the headline is never stuck invisible on first
            paint. Content swaps in place when focus changes — no key remount,
            which avoids old and new instances painting simultaneously. */}
        <RevealLines
          as="h1"
          className="font-display text-3xl md:text-5xl lg:text-6xl xl:text-6xl leading-tight mb-6 text-text-primary"
          delay={0.15}
          eager
          lines={headlineLines}
        />

        <motion.p
          className="text-md md:text-xl max-w-2xl mx-auto mb-10 text-text-secondary"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.22, ease: EASE_OUT }}
        >
          {description}
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.3, ease: EASE_OUT }}
        >
          <Button href="#work" variant="primary" size="large">
            View My Work
          </Button>
          <Button href="#contact" variant="secondary" size="large">
            Get in Touch
          </Button>
        </motion.div>

        <motion.div
          className="absolute top-105 lg:top-120 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          {/* Infinite bob is a CSS keyframe — a framer-motion repeat loop here
              would drive the main thread for the entire session. */}
          <div className="animate-scroll-hint">
            <ArrowDown size={24} className="text-text-secondary" />
          </div>
        </motion.div>
      </div>

      <div className="relative w-full h-44 md:h-72 mt-10 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute bottom-[-10%] left-[5%] w-[280px] md:w-[500px] rounded-xl overflow-hidden shadow-2xl"
          initial={{ opacity: 0, y: 60, rotate: -6 }}
          animate={{ opacity: 0.9, y: 0, rotate: -6 }}
          transition={{ duration: 0.55, delay: 0.2, ease: EASE_OUT }}
          style={{ boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.4)" }}
        >
          <div className="aspect-video">
            <img
              src={adzuPortal}
              alt="AdZU Institutional Portal Screenshot"
              width={1600}
              height={891}
              fetchpriority="low"
              loading="lazy"
              decoding="async"
            />
          </div>
        </motion.div>

        {/* LCP candidate: shortest delay of the three, eager, high priority. */}
        <motion.div
          className="absolute bottom-[-5%] left-1/2 -translate-x-1/2 w-[300px] md:w-[520px] rounded-xl overflow-hidden shadow-2xl z-10"
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.1, ease: EASE_OUT }}
          style={{ boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)" }}
        >
          <div className="aspect-video">
            <img
              src={zcmcWebsiteDark}
              alt="ZCMC Website Redesign Screenshot"
              width={1600}
              height={904}
              fetchpriority="high"
              decoding="async"
            />
          </div>
        </motion.div>

        <motion.div
          className="absolute bottom-[-10%] right-[5%] w-[280px] md:w-[500px] rounded-xl overflow-hidden shadow-2xl"
          initial={{ opacity: 0, y: 60, rotate: 6 }}
          animate={{ opacity: 0.9, y: 0, rotate: 6 }}
          transition={{ duration: 0.55, delay: 0.25, ease: EASE_OUT }}
          style={{ boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.4)" }}
        >
          <div className="aspect-video">
            <img
              src={erpDashboard}
              alt="Hospital ERP Dashboard Screenshot"
              width={1600}
              height={833}
              fetchpriority="low"
              loading="lazy"
              decoding="async"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
