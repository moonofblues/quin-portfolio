import { motion, useReducedMotion } from "framer-motion";
import { cn } from "../../utils/cn";

/**
 * A one-shot staggered per-line text reveal — each line wipes up from behind
 * its own clipping box.
 *
 * One-shot is the whole point: `viewport={{ once: true }}` (the default,
 * non-`eager` path) so it never re-runs as the reader scrolls back past it.
 * Reserved for framer-motion precisely because it *is* a one-shot entrance;
 * anything looping here would have to be CSS instead.
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
  // For content that is already on screen at mount — the hero headline,
  // chiefly — rather than scrolled into view. `whileInView` needs an
  // IntersectionObserver callback to fire before it plays, and that callback
  // is not guaranteed to land inside the same frame as mount, especially
  // alongside sibling `animate`-driven entrances doing their own layout work
  // in the same instant (Hero's badge/tags/paragraph/buttons all use `animate`
  // for exactly this reason). Left `false`, the observer occasionally never
  // fires for an element that was visible from the very first paint, and the
  // line sits permanently in its pre-reveal state — invisible, not delayed.
  // `eager` swaps to `animate`, which needs no observer and always plays.
  eager = false,
}) {
  // framer-motion drives inline transforms, which the global CSS
  // reduced-motion override in index.css cannot reach — that block only
  // collapses CSS animation/transition durations. So this is checked here.
  const reduceMotion = useReducedMotion();

  const target = { y: "0%", opacity: 1 };
  const triggerProps = eager
    ? { animate: reduceMotion ? undefined : target }
    : { whileInView: target, viewport: { once: true } };

  return (
    <Tag className={className}>
      {lines.map((line, i) => (
        // The clipping box. The line translates inside it, so the text is
        // revealed by the mask rather than simply faded in.
        <span key={i} className="block overflow-hidden">
          <motion.span
            className={cn("block", lineClassName)}
            initial={reduceMotion ? false : { y: "110%", opacity: 0 }}
            {...triggerProps}
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
