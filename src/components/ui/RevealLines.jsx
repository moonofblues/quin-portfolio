import { motion, useReducedMotion } from "framer-motion";
import { cn } from "../../utils/cn";

/**
 * A one-shot staggered per-line text reveal — each line wipes up from behind
 * its own clipping box.
 *
 * One-shot is the whole point: `viewport={{ once: true }}` so it never re-runs
 * as the reader scrolls back past it. Reserved for framer-motion precisely
 * because it *is* a one-shot entrance; anything looping here would have to be
 * CSS instead.
 *
 * The stagger is deliberately tight. CLAUDE.md caps entrance delays at ~0.3s,
 * and the last line's delay is `(lines - 1) * STAGGER`, so a four-line block
 * lands its final line at 0.24s. Raising STAGGER pushes the longest headline
 * past the budget, which is felt as the page being slow.
 */

const STAGGER = 0.08;

export function RevealLines({
  lines,
  as: Tag = "div",
  className,
  lineClassName,
  delay = 0,
}) {
  // framer-motion drives inline transforms, which the global CSS
  // reduced-motion override in index.css cannot reach — that block only
  // collapses CSS animation/transition durations. So this is checked here.
  const reduceMotion = useReducedMotion();

  return (
    <Tag className={className}>
      {lines.map((line, i) => (
        // The clipping box. The line translates inside it, so the text is
        // revealed by the mask rather than simply faded in.
        <span key={i} className="block overflow-hidden">
          <motion.span
            className={cn("block", lineClassName)}
            initial={reduceMotion ? false : { y: "110%", opacity: 0 }}
            whileInView={{ y: "0%", opacity: 1 }}
            viewport={{ once: true }}
            transition={
              reduceMotion
                ? { duration: 0 }
                : {
                    duration: 0.6,
                    delay: delay + i * STAGGER,
                    ease: [0.22, 1, 0.36, 1],
                  }
            }
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
