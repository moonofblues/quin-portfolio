import { cn } from "../../../../utils/cn";
import { SectionShell } from "./SectionShell";
import { RichText } from "../blocks/RichText";
import { MediaBlock } from "../blocks/MediaBlock";
import { EYEBROW, SCROLL_OFFSET, decisionId } from "../shared";

function SideNotes({ notes }) {
  const filled = (notes ?? []).filter((note) => note?.label && note?.body);
  if (!filled.length) return null;
  return (
    <dl className="rounded-2xl border border-border bg-bg-secondary p-6 md:p-7 grid gap-5">
      {filled.map((note, i) => (
        <div key={note._key ?? i}>
          <dt className="font-display text-[0.6875rem] uppercase tracking-[0.12em] text-accent">
            {note.label}
          </dt>
          <dd className="mt-2 leading-relaxed text-text-secondary">{note.body}</dd>
        </div>
      ))}
    </dl>
  );
}

/**
 * One decision. On wide screens a decision with media splits into two
 * columns: the reasoning stays pinned on the left while its screenshots scroll
 * past on the right, roughly halving its height versus the reference's full
 * stack (ADR 0011, D10). Without media, prose and notes sit side by side.
 * Phones always get the stacked order.
 */
function Decision({ decision, index }) {
  const media = (decision.media ?? []).filter((block) => block?.images?.some((i) => i?.url));
  const hasMedia = media.length > 0;
  const number = String(index + 1).padStart(2, "0");

  const reasoning = (
    <>
      <p className={cn(EYEBROW, "mb-4")}>Decision {number}</p>
      <h3 className="font-display text-xl md:text-2xl lg:text-3xl leading-snug text-text-primary mb-6">
        {decision.headline}
      </h3>
      <RichText value={decision.body} />
    </>
  );

  return (
    <article id={decisionId(index)} className={SCROLL_OFFSET}>
      {hasMedia ? (
        <div className="lg:grid lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:gap-16 lg:items-start">
          <div className="lg:sticky lg:top-36 space-y-8">
            <div>{reasoning}</div>
            <SideNotes notes={decision.notes} />
          </div>
          <div className="mt-12 lg:mt-0 space-y-14">
            {media.map((block, i) => (
              <MediaBlock key={block._key ?? i} block={block} />
            ))}
          </div>
        </div>
      ) : (
        <div className="grid gap-10 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] lg:gap-16 items-start">
          <div>{reasoning}</div>
          <SideNotes notes={decision.notes} />
        </div>
      )}
    </article>
  );
}

export function DecisionsSection({ section, id }) {
  const decisions = (section.decisions ?? []).filter((d) => d?.headline);
  if (!decisions.length) return null;

  return (
    <SectionShell
      id={id}
      eyebrow={section.eyebrow}
      heading={section.heading}
      headline={section.headline}
    >
      <div className="divide-y divide-border">
        {decisions.map((decision, i) => (
          <div key={decision._key ?? i} className="py-16 md:py-20 first:pt-0 last:pb-0">
            <Decision decision={decision} index={i} />
          </div>
        ))}
      </div>
    </SectionShell>
  );
}
