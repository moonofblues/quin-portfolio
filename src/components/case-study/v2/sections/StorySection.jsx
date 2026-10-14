import { SectionShell } from "./SectionShell";
import { RichText } from "../blocks/RichText";
import { MediaBlock } from "../blocks/MediaBlock";
import { CardGrid } from "../blocks/CardGrid";
import { Callout } from "../blocks/Callout";

// Prose and callouts keep a readable measure; media and grids take the
// section's full max-w-7xl (CLAUDE.md "mixed sections" rule).
const BLOCKS = {
  richTextBlock: ({ block }) => <RichText value={block.body} className="max-w-4xl" />,
  mediaBlock: MediaBlock,
  cardGridBlock: CardGrid,
  calloutBlock: Callout,
};

export function StorySection({ section, id }) {
  const content = section.content ?? [];
  return (
    <SectionShell
      id={id}
      eyebrow={section.eyebrow}
      heading={section.heading}
      headline={section.headline}
    >
      <div className="space-y-12 md:space-y-14">
        {content.map((block, i) => {
          const Block = BLOCKS[block._type];
          return Block ? <Block key={block._key ?? i} block={block} /> : null;
        })}
      </div>
    </SectionShell>
  );
}
