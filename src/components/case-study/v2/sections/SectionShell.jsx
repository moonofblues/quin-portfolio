import { motion } from "framer-motion";
import { cn } from "../../../../utils/cn";
import { fadeUp, EYEBROW, H2, PAGE_WIDTH, SCROLL_OFFSET, SPLIT_COLUMNS } from "../shared";

/**
 * Common frame for every v2 section: anchor id, width, vertical rhythm and the
 * heading treatment. Like the reference, a section with a headline shows its
 * heading as the small accent label and the headline as the H2; without one,
 * the heading itself is the H2.
 *
 * `intro` is the section's opening prose. When given, wide screens put it in a
 * column beside the heading (SPLIT_COLUMNS) so the text lines up with the
 * media below instead of stopping short of it; phones stack the two.
 */
export function SectionShell({ id, eyebrow, heading, headline, intro, className, children }) {
  const label = headline ? heading : eyebrow;
  const title = headline || heading;
  const hasHeader = Boolean(label || title);

  const header = hasHeader && (
    <header>
      {headline && eyebrow && (
        <p className="mb-2 font-display text-xs uppercase tracking-[0.14em] text-text-muted">
          {eyebrow}
        </p>
      )}
      {label && <p className={cn(EYEBROW, "mb-4")}>{label}</p>}
      {title && <h2 className={H2}>{title}</h2>}
    </header>
  );

  return (
    <section id={id} className={cn(PAGE_WIDTH, "mb-24 md:mb-32", SCROLL_OFFSET, className)}>
      <motion.div {...fadeUp}>
        {(hasHeader || intro) && (
          <div
            className={cn(
              "mb-10 md:mb-12",
              // Heading and intro side by side only when both exist.
              hasHeader && intro && cn("space-y-6 lg:space-y-0 items-start", SPLIT_COLUMNS),
            )}
          >
            {header}
            {intro}
          </div>
        )}
        {children}
      </motion.div>
    </section>
  );
}
