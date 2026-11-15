import { SectionShell } from "./SectionShell";
import { ProcessTimeline } from "../../ProcessTimeline";

export function ProcessSection({ section, id, reveal }) {
  const steps = (section.steps ?? []).filter((step) => step?.title);
  if (!steps.length) return null;

  return (
    <SectionShell
      id={id}
      eyebrow={section.eyebrow}
      heading={section.heading}
      headline={section.headline}
      reveal={reveal}
      intro={
        section.intro && (
          <p className="text-lg leading-relaxed text-text-secondary">{section.intro}</p>
        )
      }
    >
      <ProcessTimeline steps={steps} />
      {section.note && (
        <p className="mt-12 md:mt-14 max-w-4xl border-l border-accent pl-5 leading-relaxed text-text-secondary">
          {section.note}
        </p>
      )}
    </SectionShell>
  );
}
