import { RichText } from "./RichText";
import { EYEBROW } from "../shared";

export function Callout({ block }) {
  if (!block?.body?.length) return null;
  return (
    <aside className="max-w-4xl rounded-2xl border-l-4 border-accent bg-accent-subtle p-6 md:p-8">
      {block.label && <p className={`${EYEBROW} mb-3`}>{block.label}</p>}
      <RichText value={block.body} size="base" className="[&_p]:text-text-primary" />
    </aside>
  );
}
