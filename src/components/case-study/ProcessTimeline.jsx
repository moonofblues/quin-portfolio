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
import { cn } from "../../utils/cn";

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
    offset: ["start 0.75", "end 0.4"],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  if (!steps?.length) return null;

  return (
    <div ref={containerRef} className="relative">
      <div className="absolute left-6 md:left-1/2 -translate-x-1/2 top-0 bottom-0 w-0.5 bg-bg-tertiary" />
      <motion.div
        className="absolute left-6 md:left-1/2 -translate-x-1/2 top-0 w-0.5 bg-accent origin-top"
        style={{ height: lineHeight }}
      />

      <div className="space-y-12 md:space-y-16">
        {steps.map((step, index) => {
          const isLeft = index % 2 === 0;
          const Icon = getStepIcon(step.title);

          return (
            <div
              key={index}
              className={cn(
                "process-row items-start md:items-center gap-x-6 md:gap-x-10 gap-y-4",
                isLeft ? "process-row--left" : "process-row--right",
              )}
            >
              <motion.div
                className="process-row__node relative z-10"
                initial={{ opacity: 0.35, scale: 0.85 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.4 }}
              >
                <div className="w-12 h-12 rounded-full flex items-center justify-center bg-bg-elevated border-2 border-accent shadow-card">
                  <Icon size={20} className="text-accent" />
                </div>
                <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center font-display text-[10px] bg-accent text-on-accent">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </motion.div>

              <motion.div
                className={cn("process-row__card", isLeft ? "md:text-right" : "md:text-left")}
                initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.5 }}
              >
                <h3 className="font-display text-lg mb-2 text-text-primary">
                  {step.title}
                </h3>
                <p className="leading-relaxed text-text-secondary">
                  {step.description}
                </p>
              </motion.div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
