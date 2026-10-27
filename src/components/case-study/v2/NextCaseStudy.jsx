import { Link, useLocation } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { EYEBROW, PAGE_WIDTH } from "./shared";

/** One clear next step after a long read (ADR 0011, D17). */
export function NextCaseStudy({ next }) {
  // Keeps ?v=2 while previewing, so Next stays on the new page.
  const { search } = useLocation();
  return (
    <section className={PAGE_WIDTH}>
      {next && (
        <Link
          to={{ pathname: `/work/${next.slug}`, search }}
          className="group grid overflow-hidden rounded-3xl border border-border bg-bg-secondary md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] hover:border-accent/50 transition-[border-color] duration-200"
        >
          <div className="flex flex-col justify-center gap-4 p-8 md:p-12">
            <p className={EYEBROW}>Next case study</p>
            <h2 className="font-display text-2xl md:text-3xl leading-tight text-text-primary">
              {next.title}
            </h2>
            {next.description && (
              <p className="leading-relaxed text-text-secondary line-clamp-3">{next.description}</p>
            )}
            <span className="mt-2 inline-flex items-center gap-2 font-semibold text-accent">
              Read it
              <ArrowRight
                size={18}
                className="transition-transform duration-200 group-hover:translate-x-1 motion-reduce:transform-none"
              />
            </span>
          </div>
          {next.thumbnail && (
            <div className="overflow-hidden bg-bg-tertiary aspect-[16/10] md:aspect-auto">
              <img
                src={next.thumbnail}
                alt=""
                className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03] motion-reduce:transform-none"
                loading="lazy"
                fetchPriority="low"
                decoding="async"
              />
            </div>
          )}
        </Link>
      )}
      <Link
        to="/work"
        className="mt-8 inline-flex min-h-11 items-center gap-2 text-text-secondary hover:text-text-primary transition-[color] duration-200"
      >
        <ArrowLeft size={16} />
        Back to Work
      </Link>
    </section>
  );
}
