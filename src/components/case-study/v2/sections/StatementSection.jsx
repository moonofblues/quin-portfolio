import { motion } from "framer-motion";
import { cn } from "../../../../utils/cn";
import { fadeUp, EYEBROW, PAGE_WIDTH, SCROLL_OFFSET, SECTION_GAP, isShortStatement } from "../shared";

/**
 * A single large sentence in a panel. Used by the Statement section (e.g.
 * The Challenge) and by the spine's The Problem, which share one look.
 */
export function StatementPanel({ id, label, text, className, reveal = true }) {
  if (!text) return null;
  const short = isShortStatement(text);
  const Wrapper = reveal ? motion.div : "div";

  return (
    <section
      id={id}
      className={cn(PAGE_WIDTH, SECTION_GAP, SCROLL_OFFSET, className)}
    >
      <Wrapper
        className={cn(
          "rounded-3xl border border-border bg-accent-subtle px-6 py-10 sm:px-12 md:px-20 md:py-16",
          short && "text-center",
        )}
        {...(reveal ? fadeUp : {})}
      >
        {/* The label is the panel's heading, so the page outline has an h2 here. */}
        {label && <h2 className={cn(EYEBROW, "mb-6")}>{label}</h2>}
        <p
          className={cn(
            "text-text-primary",
            // The display face is for short, large statements. A longer one set
            // in it is hard going, so it drops to the body face.
            short
              ? "font-display mx-auto max-w-4xl text-xl md:text-2xl lg:text-3xl leading-snug"
              : "font-medium text-lg md:text-xl leading-relaxed",
          )}
        >
          {text}
        </p>
      </Wrapper>
    </section>
  );
}

export function StatementSection({ section, id, reveal }) {
  return (
    <StatementPanel
      id={id}
      reveal={reveal}
      label={section.eyebrow || section.heading}
      text={section.statement}
    />
  );
}
