import { motion } from "framer-motion";
import { cn } from "../../utils/cn";

/**
 * The oversized figure marking a reworked homepage section (`01`, `02`, `03`).
 *
 * Rendered in Instrument Sans *italic* — the body font, not the display
 * font. Krona One has no italic axis, and faux-obliquing it fails the quality
 * bar, so the numerals deliberately become a body-font accent (Q3).
 *
 * Weight is capped at 500 for the same reason in the other direction:
 * `index.html` loads Instrument Sans italic at `1,400;1,500` only, so asking
 * for 600+ here would have the browser synthesise a faux-bold — the identical
 * problem the plan rejected faux-oblique for. Do not raise this past 500
 * without adding the weight to the font link first.
 *
 * A decorative marker, not an index the reader must track: it is
 * `aria-hidden`, and per the glossary it never goes where existing content
 * already carries an ordering (the About timeline's date periods, say), which
 * would set up two competing numbering systems.
 */
export function SectionNumeral({ value, className }) {
  return (
    <motion.span
      className={cn(
        "font-body italic font-medium leading-none select-none",
        "text-6xl md:text-7xl lg:text-8xl",
        "text-accent-secondary",
        className,
      )}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      aria-hidden="true"
    >
      {value}
    </motion.span>
  );
}
