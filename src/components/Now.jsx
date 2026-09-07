import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { SectionTitle } from "./ui/SectionTitle";
import { SectionNumeral } from "./ui/SectionNumeral";
import { RevealLines } from "./ui/RevealLines";
import { fetchNow } from "../sanity/queries";

/**
 * "Now" (redesign plan Q1, glossary "Now") — what Quin is doing right now, at
 * activity level, never role level (the About timeline already covers roles).
 *
 * Fetched at runtime, like everything else in this codebase (ADR 0001 says no
 * build-time snapshot is needed — see the note in queries.js). No document
 * exists in Sanity yet, so this renders nothing until Quin adds the singleton
 * "Now" document in Studio: ADR 0002's rule for optional content is to render
 * only when filled, never as an empty state, and a stale "Now" is worse than
 * a missing one.
 */
export function Now() {
  const [data, setData] = useState(null);

  useEffect(() => {
    let cancelled = false;
    fetchNow()
      .then((result) => {
        if (!cancelled) setData(result);
      })
      .catch((err) => {
        console.error("Failed to fetch Now:", err);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  if (!data?.activities?.length) return null;

  const formattedAsOf = data.asOf
    ? new Date(data.asOf).toLocaleDateString(undefined, {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

  return (
    <section id="now" className="section relative">
      <div className="container">
        {/* Same header pattern as About: SectionTitle + SectionNumeral,
            fixed at "03" per Q1 — not derived from position in the DOM. */}
        <div className="flex items-start justify-between gap-4 mb-4">
          <SectionTitle className="mb-0">Right Now</SectionTitle>
          <SectionNumeral value="03" />
        </div>

        {formattedAsOf && (
          <motion.p
            className="text-sm mb-10 text-text-muted"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            As of {formattedAsOf}
          </motion.p>
        )}

        <RevealLines
          as="div"
          className="max-w-4xl space-y-4"
          lineClassName="text-xl md:text-2xl leading-snug text-text-primary"
          lines={data.activities.map((activity, i) => (
            <span key={i}>
              <span className="font-display text-accent-secondary">
                {activity.verb}
              </span>{" "}
              {activity.text}
            </span>
          ))}
        />
      </div>
    </section>
  );
}
