import { motion } from "framer-motion";
import { cn } from "../../../utils/cn";
import { RichText } from "./blocks/RichText";
import {
  fadeUp,
  EYEBROW,
  H2,
  HEADER_GAP,
  PAGE_WIDTH,
  SCROLL_OFFSET,
  SECTION_GAP,
  SPLIT_COLUMNS,
} from "./shared";

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
    <section id={id} className={cn(PAGE_WIDTH, SECTION_GAP, SCROLL_OFFSET)}>
      <motion.div {...fadeUp}>
        <header className={HEADER_GAP}>
          {/* With no headline written, the section name becomes the h2 so the
              chapter always has a heading to land on. */}
          {project.outcomeHeadline ? (
            <>
              <p className={cn(EYEBROW, "mb-4")}>Outcome &amp; Status</p>
              <h2 className={H2}>{project.outcomeHeadline}</h2>
            </>
          ) : (
            <h2 className={H2}>Outcome &amp; Status</h2>
          )}
        </header>

        {results.length > 0 && (
          <div className="grid gap-6 grid-cols-[repeat(auto-fit,minmax(15rem,1fr))]">
            {results.map((result, i) => (
              // The one tinted, larger treatment on the page: these are the
              // results, the thing a reader came for.
              <div key={i} className="rounded-2xl border border-border-hover bg-accent-subtle p-7 md:p-9">
                <p className="font-display text-5xl md:text-6xl leading-none text-accent">
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
          <div className="mt-16 md:mt-20 grid gap-x-16 gap-y-14 grid-cols-[repeat(auto-fit,minmax(18rem,1fr))]">
            {notes.map((note, i) => (
              <div key={note._key ?? i}>
                <h3 className="mb-5 font-display text-sm uppercase tracking-wider text-text-primary">
                  {note.label}
                </h3>
                <RichText
                  value={note.body}
                  size="base"
                  className="border-l border-border-hover pl-5"
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
    <section className={cn(PAGE_WIDTH, SECTION_GAP)}>
      <div className={cn("grid gap-8 items-start", SPLIT_COLUMNS)}>
        <header>
          <p className={cn(EYEBROW, "mb-4")}>Reflection</p>
          {reflection.headline && <h2 className={H2}>{reflection.headline}</h2>}
        </header>
        <RichText value={reflection.body} />
      </div>
    </section>
  );
}
