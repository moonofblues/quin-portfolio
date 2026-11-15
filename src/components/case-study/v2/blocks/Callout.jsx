import { cn } from "../../../../utils/cn";
import { RichText } from "./RichText";
import { EYEBROW } from "../shared";

export function Callout({ block, className }) {
  if (!block?.body?.length) return null;
  return (
    <aside className={cn("rounded-2xl border border-border-hover bg-accent-subtle p-6 md:p-8", className)}>
      {block.label && <p className={`${EYEBROW} mb-3`}>{block.label}</p>}
      <RichText value={block.body} size="base" className="max-w-[75ch] [&_p]:text-text-primary" />
    </aside>
  );
}
