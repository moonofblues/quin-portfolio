import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, ExternalLink, X, Expand } from "lucide-react";
import { Tag } from "../components/ui/Tag";
import { Button } from "../components/ui/Button";
import { Star } from "../components/decorative/Stars";
import { ProjectCard } from "../components/ProjectCard";
import { HeroCollage } from "../components/case-study/HeroCollage";
import { StatRing } from "../components/case-study/StatRing";
import { ProcessTimeline } from "../components/case-study/ProcessTimeline";
import { useProjects } from "../context/ProjectsContext";
import { cn } from "../utils/cn";

const CATEGORY_LABELS = {
  "ui-ux": "UI/UX Design",
  "web-dev": "Web Development",
  "graphic-design": "Graphic Design",
  video: "Video",
};

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
};

/** One label/value row in the hero meta card. */
function MetaRow({ label, children }) {
  return (
    <div>
      <h3 className="font-display text-xs uppercase tracking-wider mb-1 text-text-muted">
        {label}
      </h3>
      <p className="text-text-primary font-medium">{children}</p>
    </div>
  );
}

export function CaseStudyPage() {
  const { slug } = useParams();
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const { getProjectBySlug, getNextPrevProjects, getRelatedProjects, loading } =
    useProjects();

  // All hooks must come before any early returns
  useEffect(() => {
    if (!lightboxOpen) return;
    const handleKey = (e) => {
      if (e.key === "Escape") setLightboxOpen(false);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [lightboxOpen]);

  useEffect(() => {
    document.body.style.overflow = lightboxOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [lightboxOpen]);

  const project = getProjectBySlug(slug);
  const { prev, next } = getNextPrevProjects(slug);
  const relatedProjects = getRelatedProjects(slug, 2);
  const showcaseImages = [project?.images].flat().filter(Boolean);

  if (loading) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <p className="font-display text-lg animate-pulse text-text-muted">
          Loading...
        </p>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-2xl mb-4 text-text-primary">
            Project not found
          </h1>
          <Link to="/work">
            <Button>Back to Work</Button>
          </Link>
        </div>
      </div>
    );
  }

  const isCaseStudy = project.type === "case-study";
  // All of a showcase project's images except the one already shown as the hero
  const galleryImages = [project.images]
    .flat()
    .filter((image) => image && image !== project.thumbnail);
  const heroImages = [project.thumbnail, ...showcaseImages].filter(Boolean);
  const hasSolutionHighlights = project.solutionHighlights?.length > 0;
  // The Problem's big/centered treatment only reads well on a short, punchy
  // line. Existing case studies were written as multi-sentence prose (ZCMC
  // ERP's `challenge` is ~130 words), which would otherwise render as an
  // oversized, centered wall of text — the opposite of the goal. Longer text
  // falls back to a smaller, left-aligned treatment automatically, matching
  // the "body copy over ~30 words stays left-aligned" rule already in
  // CLAUDE.md, so no case study needs its copy rewritten to look right.
  const isProblemStatementShort =
    (project.challenge?.trim().split(/\s+/).length ?? 0) <= 30;

  // Research section merges four optional ADR-0002 fields into one: an intro
  // paragraph, an optional "key questions" row, and a single insight-card
  // grid built from both research methods and pain points — they're both
  // "things learned during research," and splitting them into three
  // separate blocks (as the page used to) was pure text bulk with no reader
  // benefit. See docs/adr/0004-case-study-narrative-restructure.md.
  const insightCards = [
    ...(project.researchMethods || []),
    ...(project.painPoints || []),
  ];
  const hasResearchSection =
    project.researchFindings ||
    project.researchObjectives?.length > 0 ||
    insightCards.length > 0;

  return (
    <div className="min-h-screen pt-24 pb-20">
      <title>{`${project.title} — Quin Ledesma`}</title>
      <meta name="description" content={project.description} />
      <meta property="og:title" content={`${project.title} — Quin Ledesma`} />
      <meta property="og:description" content={project.description} />
      {project.thumbnail && (
        <meta property="og:image" content={project.thumbnail} />
      )}

      {isCaseStudy ? (
        <>
          {/* Hero: everything that says what this is comes before any
              screenshot — title, subtitle, overview, and a compact meta card
              all render first, with the screenshot collage as a supporting
              visual afterward, not the opening beat. */}
          <section className="w-full max-w-7xl mx-auto px-6 mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Link to="/work" className="inline-block mb-8">
                <Button variant="ghost" size="small">
                  <ArrowLeft size={16} />
                  Back to Work
                </Button>
              </Link>

              <div className="flex flex-wrap gap-2 mb-6">
                {project.tags?.map((tag) => (
                  <Tag key={tag}>{tag}</Tag>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-10 lg:gap-16 items-start">
                <div className="max-w">
                  <div className="flex items-start gap-4 mb-4">
                    <Star size={32} className="mt-2 shrink-0" />
                    <div>
                      <h3 className="font-display text-xs uppercase tracking-wider mb-2 text-accent">
                        {CATEGORY_LABELS[project.category] || project.category}
                      </h3>
                      <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-text-primary">
                        {project.title}
                      </h1>
                    </div>
                  </div>
                  {project.subtitle && (
                    <p className="text-xl md:text-2xl mb-6 text-text-secondary">
                      {project.subtitle}
                    </p>
                  )}
                  {project.overview && (
                    <p className="text-lg leading-relaxed text-text-secondary">
                      {project.overview}
                    </p>
                  )}
                </div>
                <div className="w-full lg:w-72 shrink-0 rounded-2xl shadow-card bg-bg-elevated p-6 md:p-8 space-y-5">
                  {project.year && (
                    <MetaRow label="Year">{project.year}</MetaRow>
                  )}
                  {project.duration && (
                    <MetaRow label="Duration">{project.duration}</MetaRow>
                  )}
                  {project.role && (
                    <MetaRow label="Role">{project.role}</MetaRow>
                  )}
                  {project.client && (
                    <MetaRow label="Client">{project.client}</MetaRow>
                  )}
                  {project.tools?.length > 0 && (
                    <div>
                      <h3 className="font-display text-xs uppercase tracking-wider mb-2 text-text-muted">
                        Tools Used
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {project.tools.map((tool) => (
                          <Tag key={tool}>{tool}</Tag>
                        ))}
                      </div>
                    </div>
                  )}
                  {(project.liveUrl || project.behanceUrl) && (
                    <div className="flex flex-col gap-3 pt-1">
                      {project.liveUrl && (
                        <Button
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          variant="secondary"
                          size="small"
                        >
                          Visit Live Site
                          <ExternalLink size={16} />
                        </Button>
                      )}
                      {project.behanceUrl && (
                        <Button
                          href={project.behanceUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          variant="secondary"
                          size="small"
                        >
                          View on Behance
                          <ExternalLink size={16} />
                        </Button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </section>

          {/* Full-bleed (only a small gutter) rather than the max-w-7xl the
              other sections use — 3-4 screenshots in one row need the width
              to stay legible. */}
          <section className="w-full px-4 sm:px-6 mb-16">
            <motion.div {...fadeUp}>
              <HeroCollage images={heroImages} title={project.title} />
            </motion.div>
          </section>

          {/* The Problem, immediately followed by The Solution: a reader who
              only wants the pitch gets both without scrolling past the
              deeper-dive sections (Process/Background/Research/Persona/HMW),
              which follow afterward for anyone still reading. */}
          {project.challenge && (
            <section className="w-full max-w-5xl mx-auto px-6 mb-16">
              <motion.div
                className={cn(
                  "rounded-3xl bg-accent-subtle p-10 md:p-16",
                  isProblemStatementShort && "text-center",
                )}
                {...fadeUp}
              >
                <h2
                  className={cn(
                    "font-display text-xs uppercase tracking-wider mb-6 text-accent",
                    !isProblemStatementShort && "text-left",
                  )}
                >
                  The Problem
                </h2>
                <p
                  className={cn(
                    "font-display text-text-primary",
                    isProblemStatementShort
                      ? "text-2xl md:text-3xl leading-snug"
                      : "text-left text-xl md:text-2xl leading-relaxed",
                  )}
                >
                  {project.challenge}
                </p>
              </motion.div>
            </section>
          )}

          {hasSolutionHighlights ? (
            <section className="w-full max-w-7xl mx-auto px-6 mb-16">
              <motion.div {...fadeUp}>
                <h2 className="font-display text-2xl mb-10 text-text-primary text-center">
                  The Solution
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {project.solutionHighlights.map((highlight, i) => (
                    <div key={i}>
                      {highlight.image && (
                        <img
                          src={highlight.image}
                          alt={highlight.title || project.title}
                          className="w-full h-auto rounded-xl mb-4"
                          loading="lazy"
                          decoding="async"
                        />
                      )}
                      <h3 className="font-display text-sm uppercase tracking-wider mb-3 text-text-primary">
                        {highlight.title}
                      </h3>
                      <p className="leading-relaxed text-text-secondary">
                        {highlight.description}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </section>
          ) : (
            project.solution && (
              <section className="w-full max-w-4xl mx-auto px-6 mb-16">
                <motion.div {...fadeUp}>
                  <h2 className="font-display text-2xl mb-6 text-text-primary">
                    The Solution
                  </h2>
                  <p className="text-lg leading-relaxed text-text-secondary">
                    {project.solution}
                  </p>
                </motion.div>
              </section>
            )
          )}

          {/* Process */}
          {project.process && project.process.length > 0 && (
            <section className="w-full max-w-7xl mx-auto px-6 mb-16">
              <motion.div {...fadeUp}>
                <h2 className="font-display text-2xl mb-8 md:mb-12 text-text-primary">
                  The Process
                </h2>
                <ProcessTimeline steps={project.process} />
              </motion.div>
            </section>
          )}

          {/* Background — standalone context, no longer force-split with
              Challenge (which is now "The Problem" above). The pull quote
              renders here instead of as its own full-bleed banner. */}
          {project.background && (
            <section className="w-full mb-16 py-16 md:py-20 bg-bg-secondary">
              <div className="max-w-4xl mx-auto px-6">
                <motion.div {...fadeUp}>
                  <h2 className="font-display text-sm uppercase tracking-wider mb-6 text-text-muted">
                    Background
                  </h2>
                  <p className="text-lg leading-relaxed text-text-primary">
                    {project.background}
                  </p>
                  {project.quote && (
                    <blockquote className="mt-10 pl-6 border-l-4 border-accent font-display text-xl md:text-2xl leading-snug text-text-primary">
                      &ldquo;{project.quote}&rdquo;
                    </blockquote>
                  )}
                </motion.div>
              </div>
            </section>
          )}

          {/* Research: intro + optional key-questions row + one merged
              insight-card grid (research methods + pain points together). */}
          {hasResearchSection && (
            <section className="w-full max-w-7xl mx-auto px-6 mb-16">
              <motion.div {...fadeUp}>
                <h2 className="font-display text-2xl mb-6 text-text-primary">
                  Research
                </h2>
                {project.researchFindings && (
                  <p className="max-w-4xl text-lg leading-relaxed text-text-secondary mb-10">
                    {project.researchFindings}
                  </p>
                )}
                {project.researchObjectives?.length > 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
                    {project.researchObjectives.map((question, i) => (
                      <div
                        key={i}
                        className="p-5 rounded-xl bg-bg-secondary text-text-primary leading-relaxed"
                      >
                        {question}
                      </div>
                    ))}
                  </div>
                )}
                {insightCards.length > 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {insightCards.map((card, i) => (
                      <div key={i} className="p-6 rounded-xl bg-accent-subtle">
                        <h3 className="font-display text-sm uppercase tracking-wider mb-3 text-text-primary">
                          {card.title}
                        </h3>
                        <p className="text-sm leading-relaxed text-text-secondary">
                          {card.description}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            </section>
          )}

          {/* Persona */}
          {project.persona?.name && (
            <section className="w-full max-w-6xl mx-auto px-6 mb-16">
              <motion.div
                className="rounded-2xl overflow-hidden shadow-card bg-bg-elevated grid grid-cols-1 sm:grid-cols-[10rem_1fr]"
                {...fadeUp}
              >
                {project.persona.photo && (
                  <img
                    src={project.persona.photo}
                    alt={project.persona.name}
                    className="w-full h-40 sm:h-full object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                )}
                <div className="p-6">
                  <h3 className="font-display text-lg text-text-primary">
                    {project.persona.name}
                  </h3>
                  <p className="text-sm text-text-secondary mb-4">
                    {[project.persona.role, project.persona.location]
                      .filter(Boolean)
                      .join(", ")}
                  </p>
                  {project.persona.tools?.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {project.persona.tools.map((tool) => (
                        <Tag key={tool}>{tool}</Tag>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            </section>
          )}

          {/* How Might We */}
          {project.howMightWe?.length > 0 && (
            <section className="w-full mb-16 py-16 bg-accent-subtle">
              <div className="max-w-7xl mx-auto px-6">
                <motion.div {...fadeUp}>
                  <h2 className="font-display text-2xl mb-10 text-text-primary">
                    How Might We
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {project.howMightWe.map((question, i) => (
                      <div
                        key={i}
                        className="p-6 rounded-xl bg-bg-elevated text-text-primary leading-relaxed"
                      >
                        {question}
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </section>
          )}

          {/* Results — after Solution/Persona/HMW so it measures what came
              before it, rather than front-running the reveal. */}
          {project.results && project.results.length > 0 && (
            <section className="w-full max-w-6xl mx-auto px-6 mb-16">
              <motion.div {...fadeUp}>
                <h2 className="font-display text-2xl mb-10 text-text-primary">
                  Results
                </h2>
                <div className="flex flex-wrap justify-center gap-10 md:gap-16">
                  {project.results.map((result, index) => (
                    <StatRing
                      key={index}
                      metric={result.metric}
                      label={result.label}
                      delay={index * 0.1}
                    />
                  ))}
                </div>
              </motion.div>
            </section>
          )}

          {/* Design Showcase */}
          {showcaseImages.length > 0 && (
            <section className="w-full max-w-7xl mx-auto px-6 mb-16">
              <motion.div {...fadeUp}>
                {/* Persistent affordance in the heading row — the section
                    scrolls in heading-first, so the "expandable" cue has to
                    live up here, not only in the badge at the bottom of a
                    tall preview image the user hasn't scrolled to yet. */}
                <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 mb-2">
                  <h2 className="font-display text-2xl text-text-primary">
                    Design Showcase
                  </h2>
                  <button
                    type="button"
                    onClick={() => setLightboxOpen(true)}
                    className="shrink-0 flex items-center gap-2 px-4 py-2 rounded-full bg-accent-subtle text-accent font-display text-sm transition-[background-color,transform] duration-200 hover:scale-105 motion-reduce:hover:transform-none"
                  >
                    <Expand size={16} />
                    <span>
                      View Full Showcase
                      {showcaseImages.length > 1 &&
                        ` · ${showcaseImages.length} frames`}
                    </span>
                  </button>
                </div>
                <p className="text-sm text-text-secondary mb-6">
                  {showcaseImages.length > 1
                    ? "Click any frame to view every screen full size."
                    : "Click to view full size."}
                </p>
                <div
                  className="relative cursor-pointer group rounded-2xl overflow-hidden"
                  onClick={() => setLightboxOpen(true)}
                >
                  <img
                    src={showcaseImages[0]}
                    alt={`${project.title} — design showcase`}
                    className="w-full h-auto"
                    loading="lazy"
                    decoding="async"
                  />
                  {/* Always-visible bottom fade + badge, not just on hover —
                      without it, a cropped preview image just reads as cut
                      off rather than "there's more, click to see it." */}
                  <div className="absolute inset-x-0 bottom-0 h-28 bg-linear-to-t from-black/70 to-transparent pointer-events-none" />
                  <div className="absolute bottom-4 right-4 flex items-center gap-2 px-4 py-2 rounded-full bg-black/70 backdrop-blur-sm text-white shadow-lg transition-[scale,opacity] duration-200 group-hover:scale-105 group-hover:opacity-0">
                    <Expand size={16} />
                    <span className="font-display text-sm">
                      View Full Showcase
                      {showcaseImages.length > 1 &&
                        ` · ${showcaseImages.length} frames`}
                    </span>
                  </div>
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col items-center justify-center gap-3">
                    <Expand size={32} className="text-white" />
                    <span className="font-display text-white text-lg">
                      View Full Showcase
                    </span>
                    {showcaseImages.length > 1 && (
                      <span className="text-white/70 text-sm">
                        {showcaseImages.length} frames
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            </section>
          )}

          {lightboxOpen && (
            <div
              className="fixed inset-0 z-50 bg-black/95 overflow-y-auto"
              onClick={(e) => {
                if (e.target === e.currentTarget) setLightboxOpen(false);
              }}
            >
              <button
                onClick={() => setLightboxOpen(false)}
                className="fixed top-4 right-4 z-50 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white"
                aria-label="Close showcase"
              >
                <X size={24} />
              </button>
              <div className="max-w-5xl mx-auto py-12 px-4">
                <div className="flex flex-col">
                  {showcaseImages.map((img, i) => (
                    <img
                      key={i}
                      src={img}
                      alt={`${project.title} — frame ${i + 1}`}
                      className="w-full h-auto block"
                      loading={i === 0 ? "eager" : "lazy"}
                      decoding="async"
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
        </>
      ) : (
        <section className="w-full max-w-7xl mx-auto px-6 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link to="/work" className="inline-block mb-8">
              <Button variant="ghost" size="small">
                <ArrowLeft size={16} />
                Back to Work
              </Button>
            </Link>

            <div className="flex flex-wrap gap-2 mb-8">
              {project.tags?.map((tag) => (
                <Tag key={tag}>{tag}</Tag>
              ))}
            </div>

            <div
              className={cn(
                "rounded-2xl overflow-hidden bg-bg-tertiary",
                !project.thumbnail && "aspect-video",
              )}
            >
              {project.thumbnail ? (
                <img
                  src={project.thumbnail}
                  alt={project.title}
                  className="w-auto max-w-full max-h-[85vh] mx-auto object-contain"
                  loading="lazy"
                  decoding="async"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="font-display text-4xl text-text-muted">
                    {project.title}
                  </span>
                </div>
              )}
            </div>
          </motion.div>
        </section>
      )}

      {!isCaseStudy && (
        <section className="w-full max-w-7xl mx-auto px-6 mb-16">
          <motion.div {...fadeUp}>
            <p className="max-w-4xl text-lg leading-relaxed text-text-secondary">
              {project.description}
            </p>
          </motion.div>

          {galleryImages.length > 0 && (
            <div className="mt-10 grid gap-8 lg:grid-cols-2">
              {galleryImages.map((image, index) => (
                <motion.img
                  key={index}
                  src={image}
                  alt={`${project.title} — view ${index + 2}`}
                  className="w-full h-auto rounded-2xl"
                  loading="lazy"
                  decoding="async"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                />
              ))}
            </div>
          )}

          {project.fbPostUrl && (
            <motion.div className="mt-16" {...fadeUp}>
              <h2 className="font-display text-2xl mb-6 text-text-primary">
                See the Post Live
              </h2>
              <div className="flex justify-center rounded-2xl p-4 md:p-8 bg-bg-secondary">
                <iframe
                  src={`https://www.facebook.com/plugins/post.php?href=${encodeURIComponent(
                    project.fbPostUrl,
                  )}&show_text=true&width=500`}
                  width="500"
                  height="720"
                  className="max-w-full border-0 overflow-hidden rounded-xl bg-white"
                  scrolling="no"
                  allowFullScreen
                  allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                  title={`Facebook post — ${project.title}`}
                />
              </div>
            </motion.div>
          )}
        </section>
      )}

      <section className="w-full max-w-7xl mx-auto px-6 mb-16">
        <motion.div
          className="flex flex-col sm:flex-row justify-between items-center gap-4 py-8 border-t border-b border-bg-tertiary"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {prev ? (
            <Link to={`/work/${prev.slug}`} className="group">
              <Button variant="ghost">
                <ArrowLeft
                  size={16}
                  className="transition-transform group-hover:-translate-x-1"
                />
                <span className="text-sm">Previous</span>
              </Button>
              <p className="font-display mt-1 text-text-primary">
                {prev.title}
              </p>
            </Link>
          ) : (
            <div />
          )}

          {next ? (
            <Link to={`/work/${next.slug}`} className="group text-right">
              <Button variant="ghost">
                <span className="text-sm">Next</span>
                <ArrowRight
                  size={16}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Button>
              <p className="font-display mt-1 text-text-primary">
                {next.title}
              </p>
            </Link>
          ) : (
            <div />
          )}
        </motion.div>
      </section>

      {relatedProjects.length > 0 && (
        <section className="w-full max-w-7xl mx-auto px-6">
          <motion.div {...fadeUp}>
            <h2 className="font-display text-2xl mb-8 text-text-primary">
              Related Projects
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedProjects.map((relatedProject, index) => (
                <ProjectCard
                  key={relatedProject.id}
                  project={relatedProject}
                  index={index}
                />
              ))}
            </div>
          </motion.div>
        </section>
      )}
    </div>
  );
}
