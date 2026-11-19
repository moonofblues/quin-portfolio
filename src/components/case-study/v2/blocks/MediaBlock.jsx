import { useCallback, useRef, useState } from "react";
import { ChevronsLeftRight, EyeOff, Expand } from "lucide-react";
import { cn } from "../../../../utils/cn";
import { ImageLightbox } from "../../../../shared/image-viewer/ImageLightbox";

function Frame({ image, onExpand, pins, legend, active, onActivate }) {
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
    <div className={image.label ? "pt-3" : undefined}>
      <div className="relative">
        {/* The screenshot's name is taped to the frame, and crop brackets sit
            just outside it, like the marks on a trimmed print. Outside, so they
            never cover the Expand button or the pins. */}
        {image.label && (
          <p className="tape -top-3 left-8">{image.label}</p>
        )}
        <div
          className="pointer-events-none absolute -inset-2"
          aria-hidden="true"
        >
          <span className="crop crop--tl" />
          <span className="crop crop--tr" />
          <span className="crop crop--bl" />
          <span className="crop crop--br" />
        </div>
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
        {/* Siblings of the expand button, not children: a button cannot
            contain another button. */}
        {pins?.map((pin, i) => (
          <button
            key={pin._key ?? i}
            type="button"
            onClick={() => onActivate(i)}
            onMouseEnter={() => onActivate(i)}
            onMouseLeave={() => onActivate(null)}
            onFocus={() => onActivate(i)}
            onBlur={() => onActivate(null)}
            aria-label={`Marker ${i + 1}${legend[i] ? `: ${legend[i]}` : ""}`}
            aria-pressed={active === i}
            className={cn(
              // The "!" marks beat the global `button { background: none;
              // border: none }` reset in index.css, which sits outside
              // Tailwind's layers and would otherwise hide the pin.
              "absolute flex h-7 w-7 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2! border-solid! font-display text-xs transition-[background-color,color,transform] duration-200 motion-reduce:transform-none",
              active === i
                ? "scale-110 border-white! bg-mark! text-on-mark"
                : "border-accent! bg-black/70! text-white",
            )}
            style={{ left: `${pin.x}%`, top: `${pin.y}%` }}
          >
            {i + 1}
          </button>
        ))}
      </div>
      </div>
    </div>
  );
}

function CompareImage({ image, className, style }) {
  return (
    <img
      src={image.url}
      alt={image.blurred ? "Screenshot blurred for confidentiality" : image.alt || ""}
      width={image.width}
      height={image.height}
      className={cn("absolute inset-0 h-full w-full object-contain", className)}
      style={style}
      loading="lazy"
      fetchPriority="low"
      decoding="async"
    />
  );
}

/**
 * Two images stacked, with the "before" one clipped at the handle. A native
 * range input sits invisibly over the stage, so dragging, touch and the arrow
 * keys all work without custom pointer code. The position goes straight to a
 * CSS variable, so dragging never re-renders React.
 */
function CompareSlider({ before, after }) {
  const stageRef = useRef(null);
  const setPosition = (event) =>
    stageRef.current?.style.setProperty("--pos", `${event.currentTarget.value}%`);

  return (
    <div>
      {/* Above the picture, not on it, so the labels never cover content. */}
      <div className="mb-3 flex justify-between font-display text-xs uppercase tracking-widest text-text-secondary">
        <span>{before.label || "Before"}</span>
        <span>{after.label || "After"}</span>
      </div>
      <div
        ref={stageRef}
        className="relative overflow-hidden rounded-xl border border-border shadow-xl bg-white select-none has-[input:focus-visible]:outline-2 has-[input:focus-visible]:outline-offset-2 has-[input:focus-visible]:outline-accent"
        style={{ "--pos": "50%", aspectRatio: `${before.width} / ${before.height}` }}
      >
      <CompareImage image={after} />
      <CompareImage image={before} style={{ clipPath: "inset(0 calc(100% - var(--pos)) 0 0)" }} />

      <div
        // A dark edge and soft shadow keep the split visible on both pale and
        // dark screenshots.
        className="pointer-events-none absolute inset-y-0 w-[3px] -translate-x-1/2 bg-white shadow-[0_0_0_1px_rgba(0,0,0,0.45),0_0_14px_rgba(0,0,0,0.5)]"
        style={{ left: "var(--pos)" }}
        aria-hidden="true"
      >
        <span className="absolute left-1/2 top-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-black shadow-lg">
          <ChevronsLeftRight size={18} />
        </span>
      </div>

      <input
        type="range"
        min={0}
        max={100}
        step={1}
        defaultValue={50}
        onInput={setPosition}
        aria-label="Drag to compare before and after"
        className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
        style={{ touchAction: "pan-y" }}
      />
      </div>
    </div>
  );
}

/**
 * One media block: a single image, a side-by-side pair, an annotated image, or
 * a before/after slider.
 * Numbered pins are drawn into the image itself (ADR 0011, D11), so this only
 * renders the legend that explains them. Images expand into a lightbox, except
 * blurred (confidential) ones: enlarging those would show nothing new.
 */
export function MediaBlock({ block }) {
  const [openAt, setOpenAt] = useState(null);
  const [activePin, setActivePin] = useState(null);
  const close = useCallback(() => setOpenAt(null), []);

  const images = (block?.images ?? []).filter((image) => image?.url);
  if (!images.length) return null;

  const isCompare = block.layout === "compare" && images.length > 1;
  const isPair = block.layout === "pair" && images.length > 1;
  const shown = isPair ? images.slice(0, 2) : images.slice(0, 1);
  const zoomable = shown.filter((image) => !image.blurred);
  const captions = images.map((image) => image.caption).filter(Boolean);
  const legend = (block.legend ?? []).filter(Boolean);
  const pins =
    block.layout === "annotated"
      ? (block.pins ?? []).filter((pin) => Number.isFinite(pin?.x) && Number.isFinite(pin?.y))
      : [];

  return (
    <figure>
      {isCompare ? (
        <CompareSlider before={images[0]} after={images[1]} />
      ) : (
        <div className={cn(isPair && "grid gap-6 md:grid-cols-2 items-start")}>
          {shown.map((image, i) => (
            <Frame
              key={i}
              image={image}
              onExpand={image.blurred ? undefined : () => setOpenAt(zoomable.indexOf(image))}
              pins={pins}
              legend={legend}
              active={activePin}
              onActivate={setActivePin}
            />
          ))}
        </div>
      )}
      {legend.length > 0 && (
        <ol className="mt-5 grid gap-x-8 gap-y-3 sm:grid-cols-2">
          {legend.map((line, i) => (
            <li
              key={i}
              onMouseEnter={() => pins.length && setActivePin(i)}
              onMouseLeave={() => setActivePin(null)}
              className={cn(
                "flex gap-3 text-sm leading-relaxed transition-colors duration-200",
                activePin === i ? "text-text-primary" : "text-text-secondary",
              )}
            >
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
