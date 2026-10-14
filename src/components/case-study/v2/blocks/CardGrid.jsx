import { cn } from "../../../../utils/cn";
import { H3_CAPS } from "../shared";

export function CardGrid({ block }) {
  const items = (block?.items ?? []).filter((item) => item?.title || item?.body);
  if (!items.length) return null;

  return (
    <div>
      {block.heading && (
        <h3 className="mb-5 font-display text-xs uppercase tracking-[0.14em] text-text-muted">
          {block.heading}
        </h3>
      )}
      <div className="grid gap-5 grid-cols-[repeat(auto-fit,minmax(15rem,1fr))]">
        {items.map((item, i) => (
          <div
            key={item._key ?? i}
            className="rounded-2xl border border-border bg-bg-secondary p-6 md:p-7"
          >
            {item.title && <h4 className={H3_CAPS}>{item.title}</h4>}
            {item.body && (
              <p className={cn("leading-relaxed text-text-secondary", item.title && "mt-3")}>{item.body}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
