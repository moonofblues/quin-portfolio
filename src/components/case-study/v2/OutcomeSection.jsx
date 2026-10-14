import { motion } from "framer-motion";
import { cn } from "../../../utils/cn";
import { RichText } from "./blocks/RichText";
import { fadeUp, EYEBROW, H2, SCROLL_OFFSET } from "./shared";

/**
 * Outcome & Status (ADR 0011, D7): headline, metric cards from `results`, and
 * up to three labelled notes ("Delivered", "Not yet verified", …). Metrics
 * are shown as big figures rather than StatRings — a ring only means
 * something for a percentage, and outcomes like "5 weeks" aren't one.
 */
export function OutcomeSection({ project, id }) {
  const results = (project.results ?? []).filter((r) => r?.metric);
  const notes = (project.outcomeNotes ?? []).filter((n) => n?.label && n?.body?.length);
  if (!project.outcomeHeadline && !results.length && !notes.length) return null;

  return (
    <section id={id} className={cn("w-full max-w-7xl mx-auto px-6 mb-24 md:mb-32", SCROLL_OFFSET)}>
      <motion.div {...fadeUp}>
        <header className="max-w-4xl mb-10 md:mb-12">
          <p className={cn(EYEBROW, "mb-4")}>Outcome &amp; Status</p>
          {project.outcomeHeadline && <h2 className={H2}>{project.outcomeHeadline}</h2>}
        </header>

        {results.length > 0 && (
          <div className="grid gap-5 grid-cols-[repeat(auto-fit,minmax(15rem,1fr))]">
            {results.map((result, i) => (
              <div key={i} className="rounded-2xl border border-border bg-bg-secondary p-7 md:p-8">
                <p className="font-display text-4xl md:text-5xl leading-none text-accent">
                  {result.metric}
                </p>
                {result.label && (
                  <p className="mt-4 leading-relaxed text-text-secondary">{result.label}</p>
                )}
              </div>
            ))}
          </div>
        )}

        {notes.length > 0 && (
          <div className="mt-14 grid gap-x-16 gap-y-12 grid-cols-[repeat(auto-fit,minmax(18rem,1fr))]">
            {notes.map((note, i) => (
              <div key={note._key ?? i}>
                <h3 className="mb-5 font-display text-sm uppercase tracking-wider text-text-primary">
                  {note.label}
                </h3>
                <RichText
                  value={note.body}
                  size="base"
                  className="border-l-2 border-border pl-5"
                />
              </div>
            ))}
          </div>
        )}
      </motion.div>
    </section>
  );
}

export function ReflectionSection({ reflection }) {
  if (!reflection?.headline && !reflection?.body?.length) return null;

  return (
    <section className="w-full max-w-7xl mx-auto px-6 mb-24 md:mb-32">
      <motion.div
        className="grid gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:gap-20 items-start"
        {...fadeUp}
      >
        <header>
          <p className={cn(EYEBROW, "mb-4")}>Reflection</p>
          {reflection.headline && <h2 className={H2}>{reflection.headline}</h2>}
        </header>
        <RichText value={reflection.body} className="max-w-4xl" />
      </motion.div>
    </section>
  );
}
