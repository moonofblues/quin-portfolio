import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Search,
  Network,
  Palette,
  CheckCircle2,
  Code2,
  FileText,
  Compass,
} from "lucide-react";

// Checked in order — earlier rules win on titles that match multiple
// categories (e.g. "Design Handoff" reads as documentation, not visual design).
const ICON_RULES = [
  { icon: FileText, keywords: ["document", "handoff"] },
  { icon: CheckCircle2, keywords: ["prototyp", "valid"] },
  { icon: Network, keywords: ["architecture", "mapping", "token", "inventory"] },
  { icon: Code2, keywords: ["develop", "launch", "logic"] },
  { icon: Palette, keywords: ["visual", "design", "wireframe"] },
  { icon: Search, keywords: ["audit", "research", "analysis", "interview", "stakeholder", "understanding"] },
];

function getStepIcon(title = "") {
  const lower = title.toLowerCase();
  const rule = ICON_RULES.find((r) => r.keywords.some((kw) => lower.includes(kw)));
  return rule?.icon ?? Compass;
}

export function ProcessTimeline({ steps }) {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.85", "end 0.6"],
  });

  const count = steps?.length || 1;
  // Nodes are centered in their columns, so the connecting line spans from the
  // first node's center to the last one's — half a column in from each edge.
  const edgeInset = `${50 / count}%`;
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const lineWidth = useTransform(scrollYProgress, [0, 1], ["0%", `${100 - 100 / count}%`]);

  if (!steps?.length) return null;

  return (
    <div ref={containerRef} className="relative">
      {/* Connecting line — vertical down the left on mobile, horizontal
          through the node row on desktop. Both draw in on scroll. */}
      <div className="md:hidden absolute left-6 -translate-x-1/2 top-0 bottom-0 w-0.5 bg-bg-tertiary" />
      <motion.div
        className="md:hidden absolute left-6 -translate-x-1/2 top-0 w-0.5 bg-accent"
        style={{ height: lineHeight }}
      />
      <div
        className="hidden md:block absolute top-6 h-0.5 bg-bg-tertiary"
        style={{ left: edgeInset, right: edgeInset }}
      />
      <motion.div
        className="hidden md:block absolute top-6 h-0.5 bg-accent"
        style={{ left: edgeInset, width: lineWidth }}
      />

      <div
        className="process-stepper grid gap-y-10 md:gap-x-8"
        style={{ "--process-steps": count }}
      >
        {steps.map((step, index) => {
          const Icon = getStepIcon(step.title);

          return (
            <motion.div
              key={index}
              className="flex md:flex-col items-start md:items-center gap-4 md:gap-0"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
            >
              <div className="relative z-10 shrink-0">
                <div className="w-12 h-12 rounded-full flex items-center justify-center bg-bg-elevated border-2 border-accent shadow-card">
                  <Icon size={20} className="text-accent" />
                </div>
                <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center font-display text-[10px] bg-accent text-on-accent">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>

              <div className="md:mt-5 md:w-full">
                <h3 className="font-display text-lg mb-2 text-text-primary md:text-center">
                  {step.title}
                </h3>
                {/* Left-aligned even when the column is centered — these run
                    40+ words, and centered body copy that long reads poorly. */}
                <p className="leading-relaxed text-text-secondary">
                  {step.description}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
