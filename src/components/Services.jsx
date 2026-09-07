import { motion } from "framer-motion";
import { Palette, Code, Smartphone, Layers, Video, Wand2 } from "lucide-react";
import { SectionTitle } from "./ui/SectionTitle";
import { Marquee } from "./ui/Marquee";
import { Tag } from "./ui/Tag";
import { cn } from "../utils/cn";

// Q5 (Settled → Hybrid Option B): not a full replace. Three parts —
// (a) a positioning statement as the section anchor, (b) a tools marquee,
// (c) the six capabilities as a compact horizontal band rather than six
// chunky cards. The old per-card descriptions are dropped; the positioning
// statement now carries the narrative weight they used to.
const capabilities = [
  { id: 1, title: "UI/UX Design", icon: Palette },
  { id: 2, title: "Front-End Development", icon: Code },
  { id: 3, title: "Web Development", icon: Smartphone },
  { id: 4, title: "Low-Code / No-Code", icon: Wand2 },
  { id: 5, title: "Graphic Design", icon: Layers },
  { id: 6, title: "Video Editing", icon: Video },
];

// PLACEHOLDER — Quin's real tool list is an open input (redesign plan,
// "Inputs still needed"): "accurate to actual stack, no invented tools",
// the same real-and-attributable rule the plan holds Testimonials to. These
// five are the one sublist verifiable from this repo's own package.json —
// design tools (Figma, Adobe, etc.) aren't, so they're left out rather than
// guessed. Replace this whole array wholesale once Quin supplies the list;
// do not treat it as a base to extend piecemeal.
const tools = ["React", "Vite", "Tailwind CSS", "Sanity", "Framer Motion"];

export function Services() {
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
          {capabilities.map((capability, index) => {
            const Icon = capability.icon;
            return (
              <motion.div
                key={capability.id}
                className={cn(
                  "inline-flex items-center gap-3 pl-4 pr-6 py-4 rounded-full",
                  "bg-bg-secondary border border-bg-tertiary",
                  // Named properties, not `transition-all` (CLAUDE.md
                  // performance rule) — this row is six instances, and
                  // transition-all would animate layout-affecting properties
                  // none of these actually change on hover.
                  "transition-[background-color,border-color]",
                  "hover:bg-bg-hover hover:border-accent-secondary/40",
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
                  {capability.title}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
