import { decisionId } from "./shared";

/**
 * Solution at a Glance cards (ADR 0011, D4). Built from the Key Decisions
 * section so each card links to its full reasoning; projects without one fall
 * back to the legacy `solutionHighlights` cards. When this returns no cards,
 * the page falls back again to the plain `solution` prose.
 */
export function getGlanceCards(sections, project) {
  const decisionsSection = sections.find((s) => s._type === "decisionsSection");
  const decisions = (decisionsSection?.decisions ?? []).filter((d) => d?.headline);
  const fromDecisions = decisions
    .map((d, i) => ({
      key: d._key ?? i,
      title: d.glanceTitle,
      text: d.glanceSummary,
      href: `#${decisionId(i)}`,
    }))
    .filter((card) => card.title);
  if (fromDecisions.length) return fromDecisions;

  return (project.solutionHighlights ?? [])
    .filter((h) => h?.title)
    .map((h, i) => ({ key: i, title: h.title, text: h.description, image: h.image }));
}
