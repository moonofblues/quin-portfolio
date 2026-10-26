import { motion } from "framer-motion";
import { cn } from "../../../../utils/cn";
import { fadeUp, EYEBROW, PAGE_WIDTH, SCROLL_OFFSET, isShortStatement } from "../shared";

/**
 * A single large sentence in a panel. Used by the Statement section (e.g.
 * The Challenge) and by the spine's The Problem, which share one look.
 */
export function StatementPanel({ id, label, text, className }) {
  if (!text) return null;
  const short = isShortStatement(text);

  return (
    <section
      id={id}
      className={cn(PAGE_WIDTH, "mb-24 md:mb-32", SCROLL_OFFSET, className)}
    >
      <motion.div
        className={cn(
          "rounded-3xl border border-border bg-accent-subtle px-6 py-10 sm:px-12 md:px-20 md:py-16",
          short && "text-center",
        )}
        {...fadeUp}
      >
        {label && <p className={cn(EYEBROW, "mb-6")}>{label}</p>}
        <p
          className={cn(
            "font-display text-text-primary",
            short
              ? "mx-auto max-w-4xl text-xl md:text-2xl lg:text-3xl leading-snug"
              : "text-lg md:text-xl leading-relaxed",
          )}
        >
          {text}
        </p>
      </motion.div>
    </section>
  );
}

export function StatementSection({ section, id }) {
  return (
    <StatementPanel
      id={id}
      label={section.eyebrow || section.heading}
      text={section.statement}
    />
  );
}
