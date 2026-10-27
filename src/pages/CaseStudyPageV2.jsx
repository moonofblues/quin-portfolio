import { useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { Button } from "../components/ui/Button";
import { HeroCollage } from "../components/case-study/HeroCollage";
import { ProjectEmbeds } from "../components/case-study/ProjectEmbeds";
import { CaseStudyHero } from "../components/case-study/v2/CaseStudyHero";
import { ChapterNav } from "../components/case-study/v2/ChapterNav";
import { SolutionGlance } from "../components/case-study/v2/SolutionGlance";
import { getGlanceCards } from "../components/case-study/v2/glance";
import { SectionRenderer } from "../components/case-study/v2/SectionRenderer";
import { StatementPanel } from "../components/case-study/v2/sections/StatementSection";
import { ShowcaseSection } from "../components/case-study/v2/ShowcaseSection";
import { OutcomeSection, ReflectionSection } from "../components/case-study/v2/OutcomeSection";
import { NextCaseStudy } from "../components/case-study/v2/NextCaseStudy";
import { toSections } from "../components/case-study/v2/toSections";
import { slugify, fadeUp, PAGE_WIDTH, SCROLL_OFFSET } from "../components/case-study/v2/shared";
import { useProjects } from "../context/ProjectsContext";
import { useProjectDetail } from "../context/useProjectDetail";
import { CaseStudyPage } from "./CaseStudyPage";

const RESERVED_IDS = new Set(["overview", "outcome"]);

/**
 * Gives each section an anchor id and groups sections into chapters: a section
 * with a navLabel starts a chapter, unlabelled ones join the chapter above
 * (ADR 0011, D6). Overview and Outcome are fixed chapters from the spine.
 */
function planSections(sections) {
  const used = new Set(RESERVED_IDS);
  const chapters = [{ id: "overview", label: "Overview" }];
  const placed = sections.map((section, i) => {
    let id = section.navLabel ? slugify(section.navLabel) : `section-${i + 1}`;
    if (used.has(id) || id.startsWith("decision-")) id = `${id}-${i + 1}`;
    used.add(id);
    if (section.navLabel) chapters.push({ id, label: section.navLabel });
    return { section, id, startsChapter: Boolean(section.navLabel) };
  });
  return { placed, chapters };
}

/** In-page "Continue" link at the end of a chapter (the reference's part breaks). */
function ContinueLink({ to, label }) {
  return (
    <div className={`${PAGE_WIDTH} -mt-10 mb-24 md:-mt-16 md:mb-32`}>
      <a
        href={`#${to}`}
        className="group flex min-h-12 items-center justify-between gap-4 border-t border-border pt-6 text-text-secondary hover:text-text-primary transition-[color] duration-200"
      >
        <span>
          <span className="text-accent">Continue</span>
          <span className="mx-2 text-text-muted">·</span>
          {label}
        </span>
        <ArrowDown
          size={18}
          className="text-accent transition-transform duration-200 group-hover:translate-y-0.5 motion-reduce:transform-none"
        />
      </a>
    </div>
  );
}

export function CaseStudyPageV2() {
  const { slug } = useParams();
  const { projects, getProjectBySlug, loading: listLoading } = useProjects();
  const { project: detail, loading: detailLoading } = useProjectDetail(slug);
  const card = getProjectBySlug(slug) ?? detail;

  const sections = useMemo(() => (detail ? toSections(detail) : []), [detail]);
  const { placed, chapters } = useMemo(() => planSections(sections), [sections]);

  const next = useMemo(() => {
    const caseStudies = projects.filter((p) => p.type === "case-study");
    if (caseStudies.length < 2) return null;
    const index = caseStudies.findIndex((p) => p.slug === slug);
    return index === -1 ? null : caseStudies[(index + 1) % caseStudies.length];
  }, [projects, slug]);

  if (!card && (listLoading || detailLoading)) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <p className="font-display text-lg animate-pulse text-text-muted">Loading...</p>
      </div>
    );
  }

  if (!card || detail === null) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-2xl mb-4 text-text-primary">Project not found</h1>
          <Link to="/work">
            <Button>Back to Work</Button>
          </Link>
        </div>
      </div>
    );
  }

  // v2 covers case studies only; Showcase projects keep their existing page.
  if (card.type !== "case-study") return <CaseStudyPage />;

  const showcase = (detail?.showcase ?? []).filter((frame) => frame?.url);
  const heroImages = [card.thumbnail, ...showcase.map((frame) => frame.url)].filter(Boolean);
  const glanceCards = detail ? getGlanceCards(sections, detail) : [];
  const allChapters = [...chapters, { id: "outcome", label: "Outcome" }];

  return (
    <div className="min-h-screen pt-24 pb-20">
      <title>{`${card.title} — Quin Ledesma`}</title>
      <meta name="description" content={card.description} />
      <meta property="og:title" content={`${card.title} — Quin Ledesma`} />
      <meta property="og:description" content={card.description} />
      {card.thumbnail && <meta property="og:image" content={card.thumbnail} />}

      <CaseStudyHero id="overview" project={card} detail={detail} />

      {/* Full-bleed (small gutter): 3–4 screenshots in one row need the width.
          No entrance delay — this is the page's largest element (LCP). */}
      {heroImages.length > 0 && (
        <section className="w-full px-4 sm:px-6 mb-12">
          <HeroCollage images={heroImages} title={card.title} />
        </section>
      )}

      {!detail ? (
        <p className="text-center font-display text-sm animate-pulse text-text-muted">
          Loading case study…
        </p>
      ) : (
        <>
          <ChapterNav chapters={allChapters} />

          <StatementPanel label="The Problem" text={detail.challenge} />
          <SolutionGlance cards={glanceCards} fallbackText={detail.solution} />

          {placed.map(({ section, id, startsChapter }, i) => {
            const chapter = startsChapter && i > 0 && chapters.find((c) => c.id === id);
            return (
              <div key={section._key ?? id}>
                {chapter && <ContinueLink to={chapter.id} label={chapter.label} />}
                <SectionRenderer section={section} id={id} />
              </div>
            );
          })}

          <ContinueLink to="outcome" label="Showcase, outcome and reflection" />

          <div id="outcome" className={SCROLL_OFFSET}>
            <ShowcaseSection frames={showcase} title={card.title} />
            {detail.embeds?.length > 0 && (
              <section className={`${PAGE_WIDTH} mb-24 md:mb-32`}>
                <motion.div {...fadeUp}>
                  <ProjectEmbeds embeds={detail.embeds} />
                </motion.div>
              </section>
            )}
            <OutcomeSection project={detail} />
            <ReflectionSection reflection={detail.reflection} />
          </div>

          <NextCaseStudy next={next} />
        </>
      )}
    </div>
  );
}
