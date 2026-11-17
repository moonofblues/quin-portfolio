import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { EYEBROW, PAGE_WIDTH } from "../case-study/v2/shared";

/**
 * End of a photo set: a link to the next set (hidden when there is only one)
 * and back to Work. Same look as NextCaseStudy, but with no `?v=2` carried
 * over, because photo sets never use the case study preview switch.
 */
export function PhotoSetFooter({ next }) {
  return (
    <footer className={`${PAGE_WIDTH} mt-24 md:mt-32`}>
      {next && (
        <Link
          to={`/work/${next.slug}`}
          className="group grid overflow-hidden rounded-3xl border border-border bg-bg-secondary md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] hover:border-accent/50 transition-[border-color] duration-200"
        >
          <div className="flex flex-col justify-center gap-4 p-8 md:p-12">
            <p className={EYEBROW}>Next photo set</p>
            <h2 className="font-display text-2xl md:text-3xl leading-tight text-text-primary">
              {next.title}
            </h2>
            <span className="mt-2 inline-flex items-center gap-2 font-semibold text-accent">
              View photos
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
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03] motion-reduce:transform-none"
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
        className="mt-8 inline-flex min-h-[44px] items-center gap-2 text-text-secondary hover:text-text-primary transition-[color] duration-200"
      >
        <ArrowLeft size={16} />
        Back to Work
      </Link>
    </footer>
  );
}
