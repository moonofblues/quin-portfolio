import { useCallback, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useProjects } from "../../../shared/context/ProjectsContext";
import { useProjectDetail } from "../../../shared/context/useProjectDetail";
import { ImageLightbox } from "../../../shared/image-viewer/ImageLightbox";
import { sizeFromUrl, sizedUrl } from "../helpers";
import { useNight } from "../theme";
import { YouTubePlayer } from "./YouTubePlayer";
import { youtubeId } from "./youtube";

/**
 * A film inside the Visual experience (ADR 0015). Loads the film's data, then
 * hands it to FilmPage. The lights are down: the film shows in true colour.
 */
export function VisualFilm() {
  useNight();
  const { slug } = useParams();
  const { projects, getProjectBySlug, loading: listLoading } = useProjects();
  const { project: detail, loading: detailLoading } = useProjectDetail(slug);
  const card = getProjectBySlug(slug) ?? detail;

  // The next film, wrapping round to the first. null when there is only one.
  const next = useMemo(() => {
    const films = projects.filter((p) => p.type === "film");
    if (films.length < 2) return null;
    const index = films.findIndex((p) => p.slug === slug);
    return index === -1 ? null : films[(index + 1) % films.length];
  }, [projects, slug]);

  if (!card && (listLoading || detailLoading)) {
    return <div className="vp-page" aria-busy="true" />;
  }

  if (!card || detail === null) {
    return (
      <div className="vp-page">
        <h1 className="vp-title">not found.</h1>
        <p className="vp-intro">That film doesn't exist, or it hasn't been published.</p>
        <Link className="vp-back" to="/visual#work">
          ← lights up
        </Link>
      </div>
    );
  }

  return <FilmPage card={card} detail={detail} next={next} />;
}

/**
 * The film page itself: the poster, then the video (loaded only on play), the
 * synopsis, a row of stills, and the credits. `detail` is undefined while the
 * full data is still loading. Meta, back and next links share the work-page
 * styles with photo sets.
 */
export function FilmPage({ card, detail, next }) {
  const [openAt, setOpenAt] = useState(null);
  const close = useCallback(() => setOpenAt(null), []);

  // A still missing its file or size would break the layout, so skip it.
  const stills = useMemo(
    () => (detail?.filmStills ?? []).filter((s) => s?.url && s.width && s.height),
    [detail],
  );

  const viewerImages = useMemo(
    () =>
      stills.map((s) => ({
        url: sizedUrl(s.url, Math.min(s.width, 2560)),
        alt: s.alt,
        width: s.width,
        height: s.height,
        caption: s.caption,
      })),
    [stills],
  );

  const description = detail?.filmSynopsis || card.description;
  const meta = [card.year, detail?.runtime, detail?.role, detail?.client].filter(Boolean);
  const size = sizeFromUrl(card.thumbnail);
  const poster = card.thumbnail
    ? {
        src: sizedUrl(card.thumbnail, 1920),
        width: size?.width,
        height: size?.height,
      }
    : null;
  const credits = detail?.filmCredits ?? [];
  const facts = [
    detail?.role && ["role", detail.role],
    detail?.filmGear && ["gear", detail.filmGear],
  ].filter(Boolean);

  return (
    <article className="vp-page">
      <title>{`${card.title} | Quin Ledesma`}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={`${card.title} | Quin Ledesma`} />
      <meta property="og:description" content={description} />
      {card.thumbnail && <meta property="og:image" content={card.thumbnail} />}

      <header className="vp-head">
        <Link className="vp-back" to="/visual#film">
          ← lights up
        </Link>
        <h1 className="vp-title">{card.title}</h1>
        {detail?.filmSynopsis && <p className="vp-intro">{detail.filmSynopsis}</p>}
        {meta.length > 0 && <p className="vp-meta">{meta.join(" · ")}</p>}
      </header>

      {detail && (
        <>
          <YouTubePlayer
            videoId={youtubeId(detail.videoUrl)}
            url={detail.videoUrl}
            title={card.title}
            poster={poster}
          />

          {stills.length > 0 && (
            <section className="vf-stills" aria-label="Stills">
              <h2 className="vp-label">stills</h2>
              <div className="vf-grid">
                {stills.map((s, i) => (
                  <button
                    key={s.url}
                    type="button"
                    className="vf-still"
                    onClick={() => setOpenAt(i)}
                    aria-label={`Open still ${i + 1} of ${stills.length}, ${s.alt}`}
                    style={{ backgroundColor: s.color, aspectRatio: `${s.width} / ${s.height}` }}
                  >
                    <img
                      src={sizedUrl(s.url, Math.min(s.width, 800))}
                      alt={s.alt}
                      width={s.width}
                      height={s.height}
                      loading="lazy"
                      decoding="async"
                      fetchPriority="low"
                    />
                  </button>
                ))}
              </div>
            </section>
          )}

          {(facts.length > 0 || credits.length > 0) && (
            <dl className="vf-facts">
              {facts.map(([label, value]) => (
                <div key={label}>
                  <dt>{label}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
              {credits.map((c, i) => (
                <div key={`${c.role}-${i}`}>
                  <dt>{c.role}</dt>
                  <dd>{c.name}</dd>
                </div>
              ))}
            </dl>
          )}

          <footer className="vp-foot">
            {next && (
              <div className="vp-next">
                <span className="vp-meta">next film</span>
                <Link to={`/visual/${next.slug}`}>{next.title} →</Link>
              </div>
            )}
            <Link className="vp-back" to="/visual#film">
              ← all work
            </Link>
          </footer>
        </>
      )}

      {openAt !== null && (
        <ImageLightbox images={viewerImages} startIndex={openAt} onClose={close} />
      )}
    </article>
  );
}
