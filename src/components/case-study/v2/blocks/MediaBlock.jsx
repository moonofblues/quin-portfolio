import { useCallback, useState } from "react";
import { EyeOff, Expand } from "lucide-react";
import { cn } from "../../../../utils/cn";
import { ImageLightbox } from "./ImageLightbox";

function Frame({ image, onExpand }) {
  const img = (
    <img
      src={image.url}
      // A blurred image shows nothing readable, so a generic alt avoids
      // leaking what the hidden screen contained.
      alt={image.blurred ? "Screenshot blurred for confidentiality" : image.alt || ""}
      width={image.width}
      height={image.height}
      className="block w-full h-auto"
      loading="lazy"
      fetchPriority="low"
      decoding="async"
    />
  );

  return (
    <div>
      {image.label && (
        <p className="inline-flex mb-3 px-3 py-1 rounded-full bg-bg-tertiary font-display text-[11px] uppercase tracking-widest text-accent">
          {image.label}
        </p>
      )}
      <div className="relative rounded-xl overflow-hidden border border-border shadow-xl bg-white">
        {image.blurred && (
          <p className="absolute left-3 top-3 z-10 inline-flex items-center gap-1.5 rounded-full bg-black/70 px-3 py-1 text-xs text-white">
            <EyeOff size={14} aria-hidden="true" />
            Blurred for confidentiality
          </p>
        )}
        {onExpand ? (
          <button
            type="button"
            onClick={onExpand}
            className="group relative block w-full cursor-zoom-in"
            aria-label={`View larger${image.alt ? `: ${image.alt}` : ""}`}
          >
            {img}
            {/* Always visible on touch screens (no hover there); on desktop it
                appears on hover or keyboard focus. Opacity only, so it stays
                on the compositor. */}
            <span className="absolute bottom-3 right-3 flex items-center gap-2 rounded-full bg-black/70 px-3 py-1.5 font-display text-xs text-white transition-[opacity] duration-200 md:opacity-0 md:group-hover:opacity-100 md:group-focus-visible:opacity-100">
              <Expand size={14} aria-hidden="true" />
              Expand
            </span>
          </button>
        ) : (
          img
        )}
      </div>
    </div>
  );
}

/**
 * One media block: a single image, a side-by-side pair, or an annotated image.
 * Numbered pins are drawn into the image itself (ADR 0011, D11), so this only
 * renders the legend that explains them. Images expand into a lightbox, except
 * blurred (confidential) ones: enlarging those would show nothing new.
 */
export function MediaBlock({ block }) {
  const [openAt, setOpenAt] = useState(null);
  const close = useCallback(() => setOpenAt(null), []);

  const images = (block?.images ?? []).filter((image) => image?.url);
  if (!images.length) return null;

  const isPair = block.layout === "pair" && images.length > 1;
  const shown = isPair ? images.slice(0, 2) : images.slice(0, 1);
  const zoomable = shown.filter((image) => !image.blurred);
  const captions = images.map((image) => image.caption).filter(Boolean);
  const legend = (block.legend ?? []).filter(Boolean);

  return (
    <figure>
      <div className={cn(isPair && "grid gap-6 md:grid-cols-2 items-start")}>
        {shown.map((image, i) => (
          <Frame
            key={i}
            image={image}
            onExpand={image.blurred ? undefined : () => setOpenAt(zoomable.indexOf(image))}
          />
        ))}
      </div>
      {legend.length > 0 && (
        <ol className="mt-5 grid gap-x-8 gap-y-3 sm:grid-cols-2">
          {legend.map((line, i) => (
            <li key={i} className="flex gap-3 text-sm leading-relaxed text-text-secondary">
              <span className="shrink-0 pt-0.5 font-display text-xs text-accent" aria-hidden="true">
                {i + 1}
              </span>
              <span>
                <span className="sr-only">{`Marker ${i + 1}: `}</span>
                {line}
              </span>
            </li>
          ))}
        </ol>
      )}
      {captions.length > 0 && (
        <figcaption className="mt-4 text-sm leading-relaxed text-text-muted max-w-4xl">
          {captions.join(" ")}
        </figcaption>
      )}
      {openAt !== null && (
        <ImageLightbox images={zoomable} startIndex={openAt} onClose={close} />
      )}
    </figure>
  );
}
