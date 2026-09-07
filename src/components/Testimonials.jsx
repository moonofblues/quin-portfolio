import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { SectionTitle } from "./ui/SectionTitle";
import { fetchTestimonials } from "../sanity/queries";

/** Initials fallback for a testimonial with no photo — same idea as About's
 *  monogram placeholder, sized for a small avatar circle. */
function initialsOf(name) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

function TestimonialAvatar({ name, photo }) {
  if (photo) {
    return (
      <img
        src={photo}
        alt=""
        width={40}
        height={40}
        loading="lazy"
        decoding="async"
        className="w-10 h-10 rounded-full object-cover shrink-0"
      />
    );
  }
  // ADR 0002: photo is optional, so this is not an empty state to avoid —
  // it's the card's normal, designed appearance when no photo was supplied.
  return (
    <span className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 bg-accent/15 text-accent font-display text-sm">
      {initialsOf(name)}
    </span>
  );
}

/**
 * Testimonials (redesign plan Q7, glossary "Testimonial") — now Sanity-driven
 * rather than the three hardcoded quotes this file used to carry. Those were
 * unattributed by the glossary's own definition ("Professional Colleague",
 * "Client" — generic role-only labels standing in for a real name), which
 * fails the mandatory-attribution rule the redesign is meant to enforce, not
 * relax. Renders nothing until Quin publishes real ones in Studio (ADR 0002).
 */
export function Testimonials() {
  const [testimonials, setTestimonials] = useState(null);

  useEffect(() => {
    let cancelled = false;
    fetchTestimonials()
      .then((result) => {
        if (!cancelled) setTestimonials(result);
      })
      .catch((err) => {
        console.error("Failed to fetch testimonials:", err);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  if (!testimonials?.length) return null;

  return (
    <section className="section relative overflow-hidden">
      <div className="container">
        <SectionTitle>What People Say</SectionTitle>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => {
            const attribution = (
              <p className="font-medium text-text-primary">{testimonial.name}</p>
            );

            return (
              <motion.div
                key={testimonial.id}
                className="relative p-6 md:p-8 rounded-2xl bg-bg-card border border-bg-tertiary border-l-4 border-l-accent shadow-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Quote size={32} className="mb-4 opacity-20 text-accent" />

                <p className="text-base leading-relaxed mb-6 text-text-secondary">
                  "{testimonial.quote}"
                </p>

                <div className="flex items-center gap-3">
                  <TestimonialAvatar
                    name={testimonial.name}
                    photo={testimonial.photo}
                  />
                  <div>
                    {testimonial.profileUrl ? (
                      <a
                        href={testimonial.profileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium text-text-primary hover:text-accent transition-colors"
                      >
                        {testimonial.name}
                      </a>
                    ) : (
                      attribution
                    )}
                    <p className="text-sm text-text-muted">
                      {testimonial.role}
                      {testimonial.organisation && ` · ${testimonial.organisation}`}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
