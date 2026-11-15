import { SectionShell } from "./SectionShell";
import { RichText } from "../blocks/RichText";
import { MediaBlock } from "../blocks/MediaBlock";
import { CardGrid } from "../blocks/CardGrid";
import { Callout } from "../blocks/Callout";
import { BLOCK_GAP, SPLIT_COLUMNS } from "../shared";

// Media and grids take the section's full width. Prose that comes after them
// sits in the right-hand column (SPLIT_COLUMNS), the same column the opening
// prose uses beside the heading, so text always lines up.
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

// Blocks that move up beside the heading when they open the section.
const INTRO_TYPES = new Set(["richTextBlock", "calloutBlock"]);

export function StorySection({ section, id }) {
  const content = section.content ?? [];

  // The opening run of prose and callouts sits beside the heading (saving a
  // full row of height); everything after it follows in order, full width.
  const firstOther = content.findIndex((block) => !INTRO_TYPES.has(block._type));
  const lead = firstOther === -1 ? content : content.slice(0, firstOther);
  const rest = firstOther === -1 ? [] : content.slice(firstOther);
  const hasHeading = Boolean(section.heading || section.headline || section.eyebrow);

  const intro =
    hasHeading && lead.length > 0 ? (
      <div className="space-y-6">
        {lead.map((block, i) =>
          block._type === "calloutBlock" ? (
            <Callout key={block._key ?? i} block={block} />
          ) : (
            <RichText key={block._key ?? i} value={block.body} />
          ),
        )}
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
      <div className={BLOCK_GAP}>
        {body.map((block, i) => {
          const Block = BLOCKS[block._type];
          return Block ? <Block key={block._key ?? i} block={block} /> : null;
        })}
      </div>
    </SectionShell>
  );
}
