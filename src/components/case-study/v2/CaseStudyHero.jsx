import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { Tag } from "../../ui/Tag";
import { Button } from "../../ui/Button";
import { Star } from "../../decorative/Stars";
import { SERVICE_BY_ID } from "../../../data/services";
import { SCROLL_OFFSET } from "./shared";

function MetaRow({ label, children }) {
  return (
    <div>
      <dt className="font-display text-[0.6875rem] uppercase tracking-[0.14em] text-text-muted">
        {label}
      </dt>
      <dd className="mt-1.5 font-semibold leading-snug text-text-primary">{children}</dd>
    </div>
  );
}

/**
 * Hero + meta card. Renders from card fields alone (title, tags, focus) so it
 * can paint before the per-slug detail fetch finishes; the overview and meta
 * fill in when `detail` arrives.
 */
export function CaseStudyHero({ project, detail, id }) {
  const focusLabel = SERVICE_BY_ID[project.categories?.[0]?.focus]?.label;
  const behanceUrl = detail?.embeds?.find((e) => e.platform === "behance" && e.url)?.url;
  const meta = detail && [
    detail.year && ["Year", detail.year],
    detail.duration && ["Duration", detail.duration],
    detail.role && ["Role", detail.role],
    detail.team && ["Team", detail.team],
    detail.client && ["Client", detail.client],
  ].filter(Boolean);
  const hasCard =
    detail && (meta.length || detail.projectStatus || detail.tools?.length || detail.liveUrl || behanceUrl);

  return (
    <section id={id} className={`w-full max-w-7xl mx-auto px-6 mb-10 ${SCROLL_OFFSET}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Link to="/work" className="inline-block mb-8">
          <Button variant="ghost" size="small">
            <ArrowLeft size={16} />
            Back to Work
          </Button>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_20rem] gap-10 lg:gap-16 items-start">
          <div>
            {project.tags?.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-8">
                {project.tags.map((tag) => (
                  <Tag key={tag}>{tag}</Tag>
                ))}
              </div>
            )}
            <div className="flex items-start gap-4">
              <Star size={30} className="mt-2 shrink-0" />
              <div>
                {focusLabel && (
                  <p className="font-display text-xs uppercase tracking-[0.14em] mb-2 text-accent">
                    {focusLabel}
                  </p>
                )}
                <h1 className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1.1] text-text-primary">
                  {project.title}
                </h1>
              </div>
            </div>
            {(detail?.headline || project.subtitle) && (
              <p className="mt-7 text-xl md:text-2xl leading-snug text-text-secondary">
                {detail?.headline || project.subtitle}
              </p>
            )}
            {detail?.overview && (
              <p className="mt-6 max-w-4xl text-lg leading-relaxed text-text-secondary">
                {detail.overview}
              </p>
            )}
          </div>

          {hasCard && (
            <aside
              aria-label="Project details"
              className="rounded-3xl border border-border bg-bg-secondary p-7 md:p-8"
            >
              <dl className="grid gap-5">
                {meta.map(([label, value]) => (
                  <MetaRow key={label} label={label}>
                    {value}
                  </MetaRow>
                ))}
                {detail.projectStatus && (
                  <div>
                    <dt className="font-display text-[0.6875rem] uppercase tracking-[0.14em] text-text-muted">
                      Status
                    </dt>
                    <dd className="mt-2 inline-flex items-center gap-2 rounded-full border border-accent px-3.5 py-1.5 text-sm font-semibold text-accent">
                      <span className="h-2 w-2 rounded-full bg-accent" aria-hidden="true" />
                      {detail.projectStatus}
                    </dd>
                  </div>
                )}
                {detail.tools?.length > 0 && (
                  <div>
                    <dt className="font-display text-[0.6875rem] uppercase tracking-[0.14em] text-text-muted mb-2.5">
                      Tools used
                    </dt>
                    <dd className="flex flex-wrap gap-2">
                      {detail.tools.map((tool) => (
                        <Tag key={tool}>{tool}</Tag>
                      ))}
                    </dd>
                  </div>
                )}
              </dl>
              {(detail.liveUrl || behanceUrl) && (
                <div className="mt-6 flex flex-col gap-3">
                  {detail.liveUrl && (
                    <Button href={detail.liveUrl} target="_blank" rel="noopener noreferrer" variant="secondary" size="small">
                      Visit Live Site
                      <ExternalLink size={16} />
                    </Button>
                  )}
                  {behanceUrl && (
                    <Button href={behanceUrl} target="_blank" rel="noopener noreferrer" variant="secondary" size="small">
                      View on Behance
                      <ExternalLink size={16} />
                    </Button>
                  )}
                </div>
              )}
            </aside>
          )}
        </div>
      </motion.div>
    </section>
  );
}
