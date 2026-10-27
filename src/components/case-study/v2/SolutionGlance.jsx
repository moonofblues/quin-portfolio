import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { fadeUp, H2, H3_CAPS, PAGE_WIDTH, SCROLL_OFFSET } from "./shared";

/** Solution at a Glance. Cards come from getGlanceCards() in glance.js. */
export function SolutionGlance({ cards, fallbackText, id }) {
  if (!cards.length && !fallbackText) return null;

  return (
    <section
      id={id}
      className={`${PAGE_WIDTH} mb-24 md:mb-32 ${SCROLL_OFFSET}`}
    >
      <motion.div {...fadeUp}>
        <h2 className={`${H2} mb-10 md:mb-12 text-center`}>The Solution at a Glance</h2>
        {cards.length ? (
          <div className="grid gap-10 md:gap-12 grid-cols-[repeat(auto-fit,minmax(16rem,1fr))]">
            {cards.map((card) => (
              <div key={card.key}>
                {card.image && (
                  <img
                    src={card.image}
                    alt=""
                    className="w-full h-auto rounded-xl mb-5 border border-border"
                    loading="lazy"
                    fetchPriority="low"
                    decoding="async"
                  />
                )}
                <h3 className={`${H3_CAPS} mb-3`}>{card.title}</h3>
                {card.text && (
                  <p className="leading-relaxed text-text-secondary">{card.text}</p>
                )}
                {card.href && (
                  <a
                    href={card.href}
                    className="group mt-4 inline-flex min-h-11 items-center gap-2 font-semibold text-accent hover:text-accent-hover transition-[color] duration-200"
                  >
                    Read the reasoning
                    <ArrowRight
                      size={18}
                      className="transition-transform duration-200 group-hover:translate-x-1 motion-reduce:transform-none"
                    />
                  </a>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="max-w-4xl mx-auto text-lg leading-relaxed text-text-secondary">
            {fallbackText}
          </p>
        )}
      </motion.div>
    </section>
  );
}
