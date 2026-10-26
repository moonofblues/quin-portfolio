import { SectionShell } from "./SectionShell";
import { RichText } from "../blocks/RichText";
import { MediaBlock } from "../blocks/MediaBlock";
import { CardGrid } from "../blocks/CardGrid";
import { Callout } from "../blocks/Callout";
import { SPLIT_COLUMNS } from "../shared";

// Media, grids and callouts take the section's full width. Prose that comes
// after them sits in the right-hand column (SPLIT_COLUMNS), the same column
// the opening prose uses beside the heading, so text always lines up.
const BLOCKS = {
  richTextBlock: ({ block }) => (
    <div className={SPLIT_COLUMNS}>
      <RichText value={block.body} className="lg:col-start-2" />
    </div>
  ),
  mediaBlock: MediaBlock,
  cardGridBlock: CardGrid,
  calloutBlock: Callout,
};

export function StorySection({ section, id }) {
  const content = section.content ?? [];

  // Leading prose moves up beside the heading; everything else follows in order.
  const introCount = content.findIndex((block) => block._type !== "richTextBlock");
  const lead = introCount === -1 ? content : content.slice(0, introCount);
  const rest = introCount === -1 ? [] : content.slice(introCount);
  const hasHeading = Boolean(section.heading || section.headline || section.eyebrow);
  const intro =
    hasHeading && lead.length > 0 ? (
      <div className="space-y-5">
        {lead.map((block, i) => (
          <RichText key={block._key ?? i} value={block.body} />
        ))}
      </div>
    ) : null;
  const body = intro ? rest : content;

  return (
    <SectionShell
      id={id}
      eyebrow={section.eyebrow}
      heading={section.heading}
      headline={section.headline}
      intro={intro}
    >
      <div className="space-y-12 md:space-y-14">
        {body.map((block, i) => {
          const Block = BLOCKS[block._type];
          return Block ? <Block key={block._key ?? i} block={block} /> : null;
        })}
      </div>
    </SectionShell>
  );
}
