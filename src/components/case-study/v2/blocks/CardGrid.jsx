import { cn } from "../../../../utils/cn";
import { H3_CAPS } from "../shared";

// The title style is short, uppercase display type. A whole sentence in it is
// unreadable, so a long title falls back to a normal-case sentence.
const isLongTitle = (title) => title.trim().split(/\s+/).length > 8;

export function CardGrid({ block }) {
  const items = (block?.items ?? []).filter((item) => item?.title || item?.body);
  if (!items.length) return null;
  const TitleTag = block.heading ? "h4" : "h3";

  return (
    <div>
      {block.heading && (
        <h3 className="mb-6 font-display text-[12px] uppercase tracking-[0.14em] text-text-muted">
          {block.heading}
        </h3>
      )}
      <div
        className={cn(
          "grid gap-6",
          // Five cards would orphan the last one (4 + 1): lay them out 3 + 2.
          items.length === 5
            ? "sm:grid-cols-2 lg:grid-cols-6"
            : "grid-cols-[repeat(auto-fit,minmax(15rem,1fr))]",
        )}
      >
        {items.map((item, i) => (
          <div
            key={item._key ?? i}
            className={cn(
              "rounded-2xl border border-border bg-bg-secondary p-6 md:p-7",
              items.length === 5 && (i < 3 ? "lg:col-span-2" : "lg:col-span-3"),
            )}
          >
            {item.title &&
              (isLongTitle(item.title) ? (
                <p className="font-semibold leading-snug text-text-primary">{item.title}</p>
              ) : (
                // Sits under the grid's own h3, or straight under the
                // section's h2 when the grid has no heading: no skipped level.
                <TitleTag className={H3_CAPS}>{item.title}</TitleTag>
              ))}
            {item.body && (
              <p className={cn("leading-relaxed text-text-secondary", item.title && "mt-3")}>{item.body}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
