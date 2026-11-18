import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { useProjects } from "../../../shared/context/ProjectsContext";
import { useProjectDetail } from "../../../shared/context/useProjectDetail";
import { PhotoGallery } from "./PhotoGallery";

// No framer-motion on purpose: the page has no animations to configure, and the
// first photo (the page's largest image) must never be delayed.
/**
 * A photo set inside the Visual experience (ADR 0013, ADR 0014). The lights are
 * down: VisualLayout dims the page to blue-black on any work page, and the
 * photos show in true colour. The photos lead; the text around them is quiet.
 */
export function VisualPhotoSet() {
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
    return <div className="vp-page" aria-busy="true" />;
  }

  if (!card || detail === null) {
    return (
      <div className="vp-page">
        <h1 className="vp-title">not found.</h1>
        <p className="vp-intro">That work doesn't exist, or it hasn't been published.</p>
        <Link className="vp-back" to="/visual#work">
          ← lights up
        </Link>
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
    <article className="vp-page">
      <title>{`${card.title} | Quin Ledesma`}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={`${card.title} | Quin Ledesma`} />
      <meta property="og:description" content={description} />
      {card.thumbnail && <meta property="og:image" content={card.thumbnail} />}

      <header className="vp-head">
        <Link className="vp-back" to="/visual#photography">
          ← lights up
        </Link>
        <h1 className="vp-title">{card.title}</h1>
        {detail?.photoIntro && <p className="vp-intro">{detail.photoIntro}</p>}
        {meta.length > 0 && <p className="vp-meta">{meta.join(" · ")}</p>}
      </header>

      <section aria-label="Photos">
        {!detail ? (
          <p className="vp-meta" aria-live="polite">
            loading photos…
          </p>
        ) : (
          <PhotoGallery
            photos={photos}
            embeds={detail.photoEmbeds}
            photoLink={detail.photoLink}
          />
        )}
      </section>

      {detail && (
        <footer className="vp-foot">
          {next && (
            <div className="vp-next">
              <span className="vp-meta">next photo set</span>
              <Link to={`/visual/${next.slug}`}>{next.title} →</Link>
            </div>
          )}
          <Link className="vp-back" to="/visual#photography">
            ← all work
          </Link>
        </footer>
      )}
    </article>
  );
}
