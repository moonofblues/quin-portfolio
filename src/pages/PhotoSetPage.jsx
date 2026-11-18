import { useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "../components/ui/Button";
import { PhotoGallery } from "../components/photo-set/PhotoGallery";
import { PhotoSetFooter } from "../components/photo-set/PhotoSetFooter";
import { PAGE_WIDTH } from "../components/case-study/v2/shared";
import { useProjects } from "../context/ProjectsContext";
import { useProjectDetail } from "../context/useProjectDetail";

// No framer-motion here on purpose: the page has no animations to configure.
/**
 * Gallery page for a project of type "photo-set" (ADR 0013). The photos lead;
 * the text around them is deliberately quiet. No entrance animations, so the
 * first photo (the page's largest image) is never delayed.
 */
export function PhotoSetPage() {
  const { slug } = useParams();
  const { projects, getProjectBySlug, loading: listLoading } = useProjects();
  const { project: detail, loading: detailLoading } = useProjectDetail(slug);
  const card = getProjectBySlug(slug) ?? detail;

  // A photo missing its file or size would break the layout, so skip it.
  const photos = useMemo(
    () => (detail?.photos ?? []).filter((p) => p?.url && p.width && p.height),
    [detail],
  );

  // The next photo set, wrapping round to the first. null when there is only one.
  const next = useMemo(() => {
    const sets = projects.filter((p) => p.type === "photo-set");
    if (sets.length < 2) return null;
    const index = sets.findIndex((p) => p.slug === slug);
    return index === -1 ? null : sets[(index + 1) % sets.length];
  }, [projects, slug]);

  if (!card && (listLoading || detailLoading)) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <p className="font-display text-lg animate-pulse text-text-muted">Loading...</p>
      </div>
    );
  }

  if (!card || detail === null) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-2xl mb-4 text-text-primary">Project not found</h1>
          <Link to="/work">
            <Button>Back to Work</Button>
          </Link>
        </div>
      </div>
    );
  }

  const description = detail?.photoIntro || card.description;
  // One quiet line: year, duration, role, place, camera. Only the ones that exist.
  const meta = [
    card.year,
    detail?.duration,
    detail?.role,
    detail?.photoLocation,
    detail?.photoGear,
  ].filter(Boolean);

  return (
    <>
      <div className="min-h-screen pt-24 pb-20">
        <title>{`${card.title} | Quin Ledesma`}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={`${card.title} | Quin Ledesma`} />
        <meta property="og:description" content={description} />
        {card.thumbnail && <meta property="og:image" content={card.thumbnail} />}

        <header className={`${PAGE_WIDTH} mb-10 md:mb-14`}>
          <Link
            to="/work"
            className="mb-8 inline-flex min-h-[44px] items-center gap-2 text-sm text-text-muted hover:text-text-primary transition-[color] duration-200"
          >
            <ArrowLeft size={16} />
            Back to Work
          </Link>
          <h1 className="font-display text-3xl md:text-5xl leading-tight text-text-primary">
            {card.title}
          </h1>
          {detail?.photoIntro && (
            <p className="mt-5 max-w-2xl text-left leading-relaxed text-text-secondary">
              {detail.photoIntro}
            </p>
          )}
          {meta.length > 0 && (
            <p className="mt-5 text-sm text-text-muted">{meta.join(" · ")}</p>
          )}
        </header>

        <section className={PAGE_WIDTH} aria-label="Photos">
          {!detail ? (
            <p className="text-center font-display text-sm animate-pulse text-text-muted">
              Loading photos…
            </p>
          ) : (
            <PhotoGallery
              photos={photos}
              embeds={detail.photoEmbeds}
              photoLink={detail.photoLink}
            />
          )}
        </section>

        {detail && <PhotoSetFooter next={next} />}
      </div>
    </>
  );
}
