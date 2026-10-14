import { textToBlocks } from "./shared";

/**
 * TEMPORARY ADAPTER (ADR 0011, D8). Returns the project's real `sections`
 * when it has any; otherwise builds equivalent sections from the pre-v2
 * fields so un-migrated case studies still render on the new page. Delete
 * this file (and the legacy fields in queries.js) once every case study has
 * been rewritten into `sections` in Studio.
 *
 * `ideation`, `wireframes`, `keyFunctions` and `persona` stay hidden, as they
 * have been since ADR 0004.
 */
export function toSections(project) {
  if (project.sections?.length) return project.sections;

  const sections = [];

  const painPoints = cards(project.painPoints);
  if (project.background || project.quote || painPoints.length) {
    sections.push({
      _type: "storySection",
      _key: "legacy-background",
      navLabel: "Context",
      heading: "Background",
      content: [
        project.background && richText("bg-text", project.background),
        project.quote && {
          _type: "calloutBlock",
          _key: "bg-quote",
          label: "In their words",
          body: textToBlocks(`“${project.quote}”`),
        },
        painPoints.length && {
          _type: "cardGridBlock",
          _key: "bg-pain",
          heading: "Pain points",
          items: painPoints,
        },
      ].filter(Boolean),
    });
  }

  const questions = (project.researchObjectives ?? [])
    .filter(Boolean)
    .map((title, i) => ({ _key: `q${i}`, title }));
  const methods = cards(project.researchMethods);
  if (project.researchFindings || questions.length || methods.length) {
    sections.push({
      _type: "storySection",
      _key: "legacy-research",
      navLabel: sections.length ? undefined : "Context",
      heading: "Research",
      content: [
        project.researchFindings && richText("research-text", project.researchFindings),
        questions.length && {
          _type: "cardGridBlock",
          _key: "research-questions",
          heading: "Key questions",
          items: questions,
        },
        methods.length && {
          _type: "cardGridBlock",
          _key: "research-methods",
          heading: "Methods",
          items: methods,
        },
      ].filter(Boolean),
    });
  }

  const hmw = (project.howMightWe ?? [])
    .filter(Boolean)
    .map((title, i) => ({ _key: `h${i}`, title }));
  if (hmw.length) {
    sections.push({
      _type: "storySection",
      _key: "legacy-hmw",
      heading: "How Might We",
      content: [{ _type: "cardGridBlock", _key: "hmw-cards", items: hmw }],
    });
  }

  const steps = (project.process ?? []).filter((step) => step?.title);
  if (steps.length) {
    sections.push({
      _type: "processSection",
      _key: "legacy-process",
      navLabel: "Process",
      heading: "The Process",
      steps,
    });
  }

  return sections;
}

function richText(key, text) {
  return { _type: "richTextBlock", _key: key, body: textToBlocks(text) };
}

function cards(items) {
  return (items ?? [])
    .filter((item) => item?.title || item?.description)
    .map((item, i) => ({ _key: `c${i}`, title: item.title, body: item.description }));
}
