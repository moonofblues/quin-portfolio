import { useCallback, useState } from "react";
import { motion } from "framer-motion";
import { ImageLightbox } from "./blocks/ImageLightbox";
import { ArrowRight } from "lucide-react";
import { fadeUp, H2, H3_CAPS, HEADER_GAP, PAGE_WIDTH, SCROLL_OFFSET, SECTION_GAP } from "./shared";

/** Solution at a Glance. Cards come from getGlanceCards() in glance.js. */
export function SolutionGlance({ cards, fallbackText, id }) {
  const [openAt, setOpenAt] = useState(null);
  const close = useCallback(() => setOpenAt(null), []);
  if (!cards.length && !fallbackText) return null;

  const zoomable = cards
    .filter((card) => card.image)
    .map((card) => ({ url: card.image, alt: card.title }));

  return (
    <section
      id={id}
      className={`${PAGE_WIDTH} ${SECTION_GAP} ${SCROLL_OFFSET}`}
    >
      <motion.div {...fadeUp}>
        <h2 className={`${H2} ${HEADER_GAP}`}>The Solution at a Glance</h2>
        {cards.length ? (
          <div className="grid gap-12 md:gap-16 grid-cols-[repeat(auto-fit,minmax(16rem,1fr))]">
            {cards.map((card) => (
              <div key={card.key}>
                {card.image && (
                  <button
                    type="button"
                    onClick={() => setOpenAt(zoomable.findIndex((z) => z.url === card.image))}
                    className="block w-full mb-5 cursor-zoom-in"
                    aria-label={`View larger: ${card.title}`}
                  >
                    <img
                      src={card.image}
                      alt=""
                      className="w-full h-auto rounded-xl border border-border"
                      loading="lazy"
                      fetchPriority="low"
                      decoding="async"
                    />
                  </button>
                )}
                <h3 className={`${H3_CAPS} mb-3`}>{card.title}</h3>
                {card.text && (
                  <p className="leading-relaxed text-text-secondary">{card.text}</p>
                )}
                {card.href && (
                  <a
                    href={card.href}
                    className="group mt-4 inline-flex min-h-[44px] items-center gap-2 font-semibold text-accent hover:text-accent-hover transition-[color] duration-200"
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
          <p className="max-w-4xl text-lg leading-relaxed text-text-secondary">
            {fallbackText}
          </p>
        )}
      </motion.div>
      {openAt !== null && <ImageLightbox images={zoomable} startIndex={openAt} onClose={close} />}
    </section>
  );
}
