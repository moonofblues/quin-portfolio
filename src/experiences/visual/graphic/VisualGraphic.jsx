import { useCallback, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useProjects } from "../../../shared/context/ProjectsContext";
import { useProjectDetail } from "../../../shared/context/useProjectDetail";
import { ImageLightbox } from "../../../shared/image-viewer/ImageLightbox";
import { ProjectEmbeds } from "../../../shared/embeds/ProjectEmbeds";
import { sizeFromUrl, sizedUrl } from "../helpers";

/**
 * A graphic design piece inside the Visual experience (plan step 5). Print
 * stays on paper, so this page does not ask for the lights to go down. The
 * pieces show at their own proportions (never cropped), large, and open in the
 * full-screen viewer. The Product site keeps its own page for the same piece at
 * /work/<slug>.
 */
export function VisualGraphic() {
  const { slug } = useParams();
  const { getProjectBySlug, loading: listLoading } = useProjects();
  const { project: detail, loading: detailLoading } = useProjectDetail(slug);
  const card = getProjectBySlug(slug) ?? detail;
  const [openAt, setOpenAt] = useState(null);
  const close = useCallback(() => setOpenAt(null), []);

  // The piece's own images; a single-image post has none, so use its thumbnail.
  const images = useMemo(() => {
    const fromStudio = (detail?.showcase ?? []).filter((i) => i?.url && i.width && i.height);
    if (fromStudio.length) return fromStudio;
    if (!card?.thumbnail) return [];
    const size = sizeFromUrl(card.thumbnail);
    return size
      ? [{ url: card.thumbnail, ...size, alt: card.title, title: undefined, caption: undefined }]
      : [];
  }, [detail, card]);

  const viewerImages = useMemo(
    () =>
      images.map((i) => ({
        url: sizedUrl(i.url, Math.min(i.width, 2560)),
        alt: i.alt || card?.title,
        width: i.width,
        height: i.height,
        caption: [i.title, i.caption].filter(Boolean).join(". ") || undefined,
      })),
    [images, card],
  );

  if (!card && (listLoading || detailLoading)) {
    return <div className="vp-page vp-paper" aria-busy="true" />;
  }

  if (!card || detail === null) {
    return (
      <div className="vp-page vp-paper">
        <h1 className="vp-title">not found.</h1>
        <p className="vp-intro">Nothing at this address. It may have moved, or it was never published.</p>
        <Link className="vp-back" to="/visual#work">
          ← all work
        </Link>
      </div>
    );
  }

  const description = card.description || detail?.overview;
  const tools = Array.isArray(detail?.tools) ? detail.tools.join(", ") : detail?.tools;
  const meta = [card.year, detail?.client, detail?.role, tools].filter(Boolean);

  return (
    <article className="vp-page vp-paper">
      <title>{`${card.title} | Quin Ledesma`}</title>
      {description && <meta name="description" content={description} />}
      <meta property="og:title" content={`${card.title} | Quin Ledesma`} />
      {description && <meta property="og:description" content={description} />}
      {card.thumbnail && <meta property="og:image" content={card.thumbnail} />}

      <header className="vp-head">
        <Link className="vp-back" to="/visual#graphic">
          ← all work
        </Link>
        <h1 className="vp-title">{card.title}</h1>
        {description && <p className="vp-intro">{description}</p>}
        {meta.length > 0 && <p className="vp-meta">{meta.join(" · ")}</p>}
      </header>

      <section aria-label="Pieces">
        <div className="vg-cols" data-count={Math.min(images.length, 2)}>
          {images.map((img, i) => (
            <figure className="vg-fig" key={img.url}>
              <button
                type="button"
                className="vg-btn"
                onClick={() => setOpenAt(i)}
                aria-label={`Open ${i + 1} of ${images.length}, ${img.alt || card.title}`}
                style={{ aspectRatio: `${img.width} / ${img.height}` }}
              >
                <img
                  src={sizedUrl(img.url, Math.min(img.width, 1280))}
                  alt={img.alt || card.title}
                  width={img.width}
                  height={img.height}
                  decoding="async"
                  // Only the first picture can be above the fold.
                  loading={i === 0 ? "eager" : "lazy"}
                  fetchPriority={i === 0 ? "high" : "low"}
                />
              </button>
              {(img.title || img.caption) && (
                <figcaption className="vg-caption">
                  {img.title && <b>{img.title} </b>}
                  {img.caption}
                </figcaption>
              )}
            </figure>
          ))}
        </div>
      </section>

      {detail?.embeds?.length > 0 && (
        <div className="vg-embeds">
          <ProjectEmbeds embeds={detail.embeds} />
        </div>
      )}

      <footer className="vp-foot">
        <Link className="vp-back" to="/visual#graphic">
          ← all work
        </Link>
      </footer>

      {openAt !== null && (
        <ImageLightbox images={viewerImages} startIndex={openAt} onClose={close} />
      )}
    </article>
  );
}
