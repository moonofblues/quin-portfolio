import { motion } from "framer-motion";
import { cn } from "../../../../utils/cn";
import { fadeUp, EYEBROW, H2, SCROLL_OFFSET } from "../shared";

/**
 * Common frame for every v2 section: anchor id, width, vertical rhythm and the
 * heading treatment. Like the reference, a section with a headline shows its
 * heading as the small accent label and the headline as the H2; without one,
 * the heading itself is the H2.
 */
export function SectionShell({ id, eyebrow, heading, headline, className, children }) {
  const label = headline ? heading : eyebrow;
  const title = headline || heading;

  return (
    <section
      id={id}
      className={cn("w-full max-w-7xl mx-auto px-6 mb-24 md:mb-32", SCROLL_OFFSET, className)}
    >
      <motion.div {...fadeUp}>
        {(label || title) && (
          <header className="max-w-4xl mb-10 md:mb-12">
            {headline && eyebrow && (
              <p className="mb-2 font-display text-xs uppercase tracking-[0.14em] text-text-muted">
                {eyebrow}
              </p>
            )}
            {label && <p className={cn(EYEBROW, "mb-4")}>{label}</p>}
            {title && <h2 className={H2}>{title}</h2>}
          </header>
        )}
        {children}
      </motion.div>
    </section>
  );
}
