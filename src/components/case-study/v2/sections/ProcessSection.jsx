import { SectionShell } from "./SectionShell";
import { ProcessTimeline } from "../../ProcessTimeline";

export function ProcessSection({ section, id }) {
  const steps = (section.steps ?? []).filter((step) => step?.title);
  if (!steps.length) return null;

  return (
    <SectionShell
      id={id}
      eyebrow={section.eyebrow}
      heading={section.heading}
      headline={section.headline}
      intro={
        section.intro && (
          <p className="text-lg leading-relaxed text-text-secondary">{section.intro}</p>
        )
      }
    >
      <ProcessTimeline steps={steps} />
      {section.note && (
        <p className="mt-10 max-w-4xl border-l-2 border-accent pl-5 leading-relaxed text-text-secondary">
          {section.note}
        </p>
      )}
    </SectionShell>
  );
}
