import { useCallback, useMemo, useState } from "react";
import { ExternalLink } from "lucide-react";
import { ImageLightbox } from "../../../shared/image-viewer/ImageLightbox";
import { ProjectEmbeds } from "../../../shared/embeds/ProjectEmbeds";
import { PhotoFrame } from "./PhotoFrame";
import { layoutPhotos } from "./layoutPhotos";
import { photoUrl } from "./photoUrl";

/**
 * One block of rows, laid out by layoutPhotos(). Editorial rhythm (docs/
 * visual-design-direction.md): rows alternate between the left and the right
 * (`data-side`), so the page zig-zags down instead of stacking in one column.
 * The CSS decides what that means for each kind of row.
 */
function Rows({ rows, total, onOpen }) {
  return (
    <div className="vp-rows">
      {rows.map((row, i) => (
        <div
          key={row.items[0].index}
          className="vp-row"
          data-kind={row.kind}
          data-side={i % 2 === 0 ? "start" : "end"}
        >
          {row.items.map(({ photo, index }) => (
            <PhotoFrame
              key={index}
              photo={photo}
              index={index}
              total={total}
              kind={row.kind}
              onOpen={onOpen}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

/**
 * The photos grouped into rows by layoutPhotos(), plus the full-screen viewer
 * that opens on click. `photos` must already have a url, width and height.
 *
 * Highlighted photos (the ones with `highlight`) come first, under a small
 * "highlights" label, and are NOT repeated further down. The rest of the set
 * follows in its Studio order. With no highlights the page has no labels and
 * the first photo is the opener.
 *
 * `embeds` (optional) and `photoLink` (optional button) are shown between the
 * highlights and the rest of the set.
 */
export function PhotoGallery({ photos, embeds, photoLink }) {
  const [openAt, setOpenAt] = useState(null);
  const close = useCallback(() => setOpenAt(null), []);

  // `ordered` is the order a visitor sees them in. The viewer uses the same
  // list, so the arrows go through the photos in the order they appear.
  const { highlightRows, restRows, ordered } = useMemo(() => {
    const highlights = photos.filter((p) => p.highlight);
    const rest = photos.filter((p) => !p.highlight);
    return {
      highlightRows: layoutPhotos(highlights, { opener: true, offset: 0 }),
      restRows: layoutPhotos(rest, {
        // The page has one opener: the first highlight, or, with no
        // highlights, the first photo of the set.
        opener: highlights.length === 0,
        offset: highlights.length,
      }),
      ordered: [...highlights, ...rest],
    };
  }, [photos]);

  // The viewer shows each photo large (up to 2560px wide, never bigger than the
  // original).
  const viewerImages = useMemo(
    () =>
      ordered.map((p) => ({
        url: photoUrl(p.url, Math.min(p.width, 2560)),
        alt: p.alt,
        width: p.width,
        height: p.height,
        caption: p.caption,
        shot: p.shot,
        recognition: p.highlight ? p.recognition : undefined,
      })),
    [ordered],
  );

  const hasHighlights = highlightRows.length > 0;

  return (
    <div className="vp-gallery">
      {hasHighlights && (
        <div>
          <h2 className="vp-label">highlights</h2>
          <Rows rows={highlightRows} total={ordered.length} onOpen={setOpenAt} />
        </div>
      )}
      {embeds?.length > 0 && <ProjectEmbeds embeds={embeds} />}
      {photoLink?.url && (
        <div className="vp-linkrow">
          <a href={photoLink.url} target="_blank" rel="noopener noreferrer" className="vp-linkbtn">
            {photoLink.label || "View on Facebook"}
            <ExternalLink size={16} aria-hidden="true" />
          </a>
        </div>
      )}
      {restRows.length > 0 && (
        <div>
          {hasHighlights && <h2 className="vp-label">the full set</h2>}
          <Rows rows={restRows} total={ordered.length} onOpen={setOpenAt} />
        </div>
      )}
      {openAt !== null && (
        <ImageLightbox images={viewerImages} startIndex={openAt} onClose={close} />
      )}
    </div>
  );
}
