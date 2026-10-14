import { StorySection } from "./sections/StorySection";
import { StatementSection } from "./sections/StatementSection";
import { ProcessSection } from "./sections/ProcessSection";
import { DecisionsSection } from "./sections/DecisionsSection";

// One entry per section type in src/sanity/schema/caseStudyBlocks.js. A new
// kind of section = a schema type there + a component here.
const SECTION_COMPONENTS = {
  storySection: StorySection,
  statementSection: StatementSection,
  processSection: ProcessSection,
  decisionsSection: DecisionsSection,
};

export function SectionRenderer({ section, id }) {
  const Component = SECTION_COMPONENTS[section?._type];
  if (!Component) {
    if (import.meta.env.DEV) {
      console.warn(`[case-study] No renderer for section type "${section?._type}"`);
    }
    return null;
  }
  return <Component section={section} id={id} />;
}
