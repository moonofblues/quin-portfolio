import { EyeOff } from "lucide-react";
import { cn } from "../../../../utils/cn";

function Frame({ image }) {
  return (
    <div>
      {image.label && (
        <p className="inline-flex mb-3 px-3 py-1 rounded-full bg-bg-tertiary font-display text-[0.6875rem] uppercase tracking-widest text-accent">
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
      </div>
    </div>
  );
}

/**
 * One media block: a single image, a side-by-side pair, or an annotated image.
 * Numbered pins are drawn into the image itself (ADR 0011, D11), so this only
 * renders the legend that explains them.
 */
export function MediaBlock({ block }) {
  const images = (block?.images ?? []).filter((image) => image?.url);
  if (!images.length) return null;

  const isPair = block.layout === "pair" && images.length > 1;
  const captions = images.map((image) => image.caption).filter(Boolean);
  const legend = (block.legend ?? []).filter(Boolean);

  return (
    <figure>
      <div className={cn(isPair && "grid gap-6 md:grid-cols-2 items-start")}>
        {(isPair ? images.slice(0, 2) : images.slice(0, 1)).map((image, i) => (
          <Frame key={i} image={image} />
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
    </figure>
  );
}
