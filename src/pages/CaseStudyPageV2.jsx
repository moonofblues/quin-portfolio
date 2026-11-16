import { useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, MotionConfig } from "framer-motion";
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
import {
  slugify,
  fadeUp,
  CHAPTER_START,
  PAGE_WIDTH,
  SECTION_GAP,
  getBehanceUrl,
} from "../components/case-study/v2/shared";
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
    // A process section is always its own chapter, so it never shows up under
    // the chapter before it; a navLabel set in Studio still wins.
    const navLabel = section.navLabel || (section._type === "processSection" ? "Process" : "");
    let id = navLabel ? slugify(navLabel) : `section-${i + 1}`;
    if (used.has(id) || id.startsWith("decision-")) id = `${id}-${i + 1}`;
    used.add(id);
    if (navLabel) chapters.push({ id, label: navLabel });
    return { section, id, startsChapter: Boolean(navLabel) };
  });
  return { placed, chapters };
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
    // reducedMotion="user": framer-motion entrances (the fade-ups) honour the
    // visitor's "reduce motion" setting. The CSS rule in index.css only covers
    // CSS animations.
    <MotionConfig reducedMotion="user">
    <div className="min-h-screen pt-24 pb-20">
      <title>{`${card.title} — Quin Ledesma`}</title>
      <meta name="description" content={card.description} />
      <meta property="og:title" content={`${card.title} — Quin Ledesma`} />
      <meta property="og:description" content={card.description} />
      {card.thumbnail && <meta property="og:image" content={card.thumbnail} />}

      <CaseStudyHero id="overview" project={card} detail={detail} />

      {/* Chapter bar and The Problem come straight after the title block, so a
          skimmer sees what the project is and why it existed before the cover
          image. The image follows, below the first screen. */}
      {detail && (
        <>
          <ChapterNav chapters={allChapters} />
          <StatementPanel
            label="The Problem"
            text={detail.challenge}
            className="mb-10 md:mb-12"
          />
        </>
      )}

      {/* A single cover image sits in the page frame so its edges line up with
          the text. 3–4 screenshots in one row go near full-bleed instead, since
          they need the width. No entrance delay on either. */}
      {heroImages.length > 0 && (
        <section
          className={
            heroImages.length < 3
              ? `${PAGE_WIDTH} mb-16 md:mb-20`
              : "w-full px-4 sm:px-6 mb-12"
          }
        >
          <HeroCollage images={heroImages} title={card.title} />
        </section>
      )}

      {!detail ? (
        <p className="text-center font-display text-sm animate-pulse text-text-muted">
          Loading case study…
        </p>
      ) : (
        <>
          <SolutionGlance cards={glanceCards} fallbackText={detail.solution} />

          {placed.map(({ section, id, startsChapter }) => (
            // A section that opens a chapter gets extra air above it, so the
            // chapters read as distinct parts of the story.
            <div key={section._key ?? id} className={startsChapter ? CHAPTER_START : undefined}>
              <SectionRenderer section={section} id={id} reveal={startsChapter} />
            </div>
          ))}

          {/* Opens the Outcome chapter: results and reflection first, then the
              finished-work gallery and embeds as supporting evidence. Its
              scroll offset is smaller than the sections' because CHAPTER_START
              padding already sits above it. */}
          <div id="outcome" className={`${CHAPTER_START} scroll-mt-20`}>
            <OutcomeSection project={detail} />
            <ReflectionSection reflection={detail.reflection} />
            <ShowcaseSection
              frames={showcase}
              title={card.title}
              behanceUrl={getBehanceUrl(detail)}
            />
            {detail.embeds?.length > 0 && (
              <section className={`${PAGE_WIDTH} ${SECTION_GAP}`}>
                <motion.div {...fadeUp}>
                  <ProjectEmbeds embeds={detail.embeds} />
                </motion.div>
              </section>
            )}
          </div>

          <NextCaseStudy next={next} />
        </>
      )}
    </div>
    </MotionConfig>
  );
}
