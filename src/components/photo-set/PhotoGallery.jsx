import { useCallback, useMemo, useState } from "react";
import { ImageLightbox } from "../case-study/v2/blocks/ImageLightbox";
import { PhotoFrame } from "./PhotoFrame";
import { layoutPhotos } from "./layoutPhotos";
import { photoUrl } from "./photoUrl";

const LABEL = "mb-5 text-xs uppercase tracking-widest text-text-muted";

/** One block of rows, laid out by layoutPhotos(). */
function Rows({ rows, total, onOpen }) {
  return (
    <div className="flex flex-col gap-6 md:gap-10">
      {rows.map((row) => (
        <div
          key={row.items[0].index}
          className={row.kind === "pair" ? "grid items-start gap-6 md:grid-cols-2 md:gap-10" : undefined}
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
 * "Highlights" label, and are NOT repeated further down. The rest of the set
 * follows in its Studio order. With no highlights the page looks as it always
 * did: no labels, the first photo is the opener.
 */
export function PhotoGallery({ photos }) {
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
        recognition: p.highlight ? p.recognition : undefined,
      })),
    [ordered],
  );

  const hasHighlights = highlightRows.length > 0;

  return (
    <div className="flex flex-col gap-12 md:gap-16">
      {hasHighlights && (
        <div>
          <h2 className={LABEL}>Highlights</h2>
          <Rows rows={highlightRows} total={ordered.length} onOpen={setOpenAt} />
        </div>
      )}
      {restRows.length > 0 && (
        <div>
          {hasHighlights && <h2 className={LABEL}>The full set</h2>}
          <Rows rows={restRows} total={ordered.length} onOpen={setOpenAt} />
        </div>
      )}
      {openAt !== null && (
        <ImageLightbox images={viewerImages} startIndex={openAt} onClose={close} />
      )}
    </div>
  );
}
