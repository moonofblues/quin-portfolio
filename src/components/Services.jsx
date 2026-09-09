import { motion } from "framer-motion";
import { useSearchParams } from "react-router-dom";
import { SectionTitle } from "./ui/SectionTitle";
import { Marquee } from "./ui/Marquee";
import { Tag } from "./ui/Tag";
import { cn } from "../utils/cn";
import { SERVICES } from "../data/services";

// PLACEHOLDER — Quin's real tool list is an open input (redesign plan,
// "Inputs still needed"): "accurate to actual stack, no invented tools",
// the same real-and-attributable rule the plan holds Testimonials to. These
// five are the one sublist verifiable from this repo's own package.json —
// design tools (Figma, Adobe, etc.) aren't, so they're left out rather than
// guessed. Replace this whole array wholesale once Quin supplies the list;
// do not treat it as a base to extend piecemeal.
const tools = ["React", "Vite", "Tailwind CSS", "Sanity", "Framer Motion"];

export function Services() {
  const [searchParams, setSearchParams] = useSearchParams();
  const focusId = searchParams.get("focus");

  // Toggle: clicking the active pill deselects it; clicking a new one selects it.
  const handlePillClick = (id) => {
    setSearchParams(focusId === id ? {} : { focus: id });
  };

  return (
    <section id="services" className="section relative">
      <div className="container">
        <SectionTitle>What I Do</SectionTitle>

        <motion.p
          className="max-w-4xl text-lg leading-relaxed mb-12 text-text-secondary"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          A blend of design thinking and engineering discipline — from the first
          wireframe to the shipped interface, working across the whole path
          rather than handing off partway through.
        </motion.p>

        <motion.div
          className="mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Marquee durationSeconds={28}>
            {tools.map((tool) => (
              <Tag
                key={tool}
                className="text-sm md:text-base px-4 py-2 justify-center"
              >
                {tool}
              </Tag>
            ))}
          </Marquee>
        </motion.div>

        <div className="flex flex-wrap gap-4 items-center justify-center">
          {SERVICES.map((capability, index) => {
            const Icon = capability.icon;
            const isActive = focusId === capability.id;
            return (
              <motion.div
                key={capability.id}
                role="button"
                tabIndex={0}
                onClick={() => handlePillClick(capability.id)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handlePillClick(capability.id);
                  }
                }}
                className={cn(
                  "inline-flex items-center gap-3 pl-4 pr-6 py-4 rounded-full cursor-pointer",
                  "bg-bg-secondary border",
                  // Named properties only — transition-all animates layout-
                  // affecting properties and triggers backdrop-filter on every
                  // frame, which is expensive on the fixed header. Not an issue
                  // here, but the rule applies site-wide.
                  "transition-[background-color,border-color,box-shadow]",
                  isActive
                    ? "border-accent-secondary/60 bg-bg-hover ring-1 ring-accent-secondary/25"
                    : "border-bg-tertiary hover:bg-bg-hover hover:border-accent-secondary/40",
                )}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: index * 0.06 }}
              >
                <span className="w-11 h-11 rounded-full flex items-center justify-center shrink-0 bg-accent-secondary/15">
                  <Icon size={22} className="text-accent-secondary" />
                </span>
                <span className="text-base md:text-lg font-medium text-text-primary">
                  {capability.label}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
