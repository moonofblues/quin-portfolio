import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  User,
  ExternalLink,
  X,
  Expand,
} from "lucide-react";
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

export function CaseStudyPage() {
  const { slug } = useParams();
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const { getProjectBySlug, getNextPrevProjects, getRelatedProjects, loading } = useProjects();

  // All hooks must come before any early returns
  useEffect(() => {
    if (!lightboxOpen) return;
    const handleKey = (e) => { if (e.key === "Escape") setLightboxOpen(false); };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [lightboxOpen]);

  useEffect(() => {
    document.body.style.overflow = lightboxOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [lightboxOpen]);

  const project = getProjectBySlug(slug);
  const { prev, next } = getNextPrevProjects(slug);
  const relatedProjects = getRelatedProjects(slug, 2);
  const showcaseImages = [project?.images].flat().filter(Boolean);

  if (loading) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <p className="font-display text-lg animate-pulse text-text-muted">Loading...</p>
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

  return (
    <div className="min-h-screen pt-24 pb-20">
      <title>{`${project.title} — Quin Ledesma`}</title>
      <meta name="description" content={project.description} />
      <meta property="og:title" content={`${project.title} — Quin Ledesma`} />
      <meta property="og:description" content={project.description} />
      {project.thumbnail && (
        <meta property="og:image" content={project.thumbnail} />
      )}

      {/* Hero */}
      <section className="w-full max-w-7xl mx-auto px-6 mb-16">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
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

          {isCaseStudy ? (
            <HeroCollage images={heroImages} title={project.title} />
          ) : (
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
          )}
        </motion.div>
      </section>

      {/* Brief: sticky sidebar + title/description */}
      {isCaseStudy && (
        <section className="w-full max-w-6xl mx-auto px-6 mb-16">
          <motion.div className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-10 md:gap-16" {...fadeUp}>
            <aside className="md:sticky md:top-28 md:self-start space-y-8">
              <div>
                <h3 className="font-display text-xs uppercase tracking-wider mb-2 text-text-muted">
                  Project Brief
                </h3>
                <p className="text-text-primary font-medium">
                  {CATEGORY_LABELS[project.category] || project.category}
                </p>
              </div>
              {project.role && (
                <div>
                  <h3 className="font-display text-xs uppercase tracking-wider mb-2 text-text-muted">
                    Role
                  </h3>
                  <p className="text-text-primary font-medium">{project.role}</p>
                </div>
              )}
              {project.duration && (
                <div>
                  <h3 className="font-display text-xs uppercase tracking-wider mb-2 text-text-muted">
                    Project Duration
                  </h3>
                  <p className="text-text-primary font-medium">{project.duration}</p>
                </div>
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
                <div className="flex flex-col gap-3">
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
            </aside>

            <div>
              <div className="flex items-start gap-4 mb-6">
                <Star size={36} className="mt-2 shrink-0" />
                <div>
                  <h1 className="font-display text-4xl md:text-5xl lg:text-6xl mb-4 text-text-primary">
                    {project.title}
                  </h1>
                  {project.subtitle && (
                    <p className="text-xl md:text-2xl text-text-secondary">
                      {project.subtitle}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex flex-wrap gap-6 mb-6">
                {project.client && (
                  <div className="flex items-center gap-2">
                    <User size={18} className="text-accent" />
                    <span className="text-sm text-text-secondary">{project.client}</span>
                  </div>
                )}
                {project.year && (
                  <div className="flex items-center gap-2">
                    <Calendar size={18} className="text-accent" />
                    <span className="text-sm text-text-secondary">{project.year}</span>
                  </div>
                )}
              </div>

              {project.overview && (
                <p className="text-lg md:text-xl leading-relaxed text-text-secondary">
                  {project.overview}
                </p>
              )}
            </div>
          </motion.div>
        </section>
      )}

      {isCaseStudy && (
        <>
          {/* Background + Challenge */}
          {project.background ? (
            <section className="w-full mb-16">
              <motion.div className="grid grid-cols-1 md:grid-cols-2" {...fadeUp}>
                <div className="p-10 md:p-16 bg-accent text-on-accent">
                  <h2 className="font-display text-sm uppercase tracking-wider mb-6 opacity-80">
                    Background
                  </h2>
                  <p className="text-lg leading-relaxed">{project.background}</p>
                </div>
                <div className="p-10 md:p-16 bg-bg-secondary">
                  <h2 className="font-display text-sm uppercase tracking-wider mb-6 text-text-muted">
                    The Challenge
                  </h2>
                  <p className="text-lg leading-relaxed text-text-primary">{project.challenge}</p>
                </div>
              </motion.div>
            </section>
          ) : (
            project.challenge && (
              <section className="w-full max-w-4xl mx-auto px-6 mb-16">
                <motion.div {...fadeUp}>
                  <h2 className="font-display text-2xl mb-6 text-text-primary">
                    The Challenge
                  </h2>
                  <p className="text-lg leading-relaxed text-text-secondary">
                    {project.challenge}
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

          {/* Research Objectives */}
          {project.researchObjectives?.length > 0 && (
            <section className="w-full mb-16 py-16 bg-accent text-on-accent">
              <div className="max-w-6xl mx-auto px-6">
                <motion.div {...fadeUp}>
                  <h2 className="font-display text-xl md:text-2xl uppercase tracking-wide mb-8">
                    Research Objectives
                  </h2>
                  <ul className="grid gap-3 md:grid-cols-2 md:gap-x-12">
                    {project.researchObjectives.map((objective, i) => (
                      <li key={i} className="flex gap-3 text-lg leading-relaxed">
                        <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-current shrink-0" />
                        {objective}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </div>
            </section>
          )}

          {/* Research Methods + Findings */}
          {(project.researchMethods?.length > 0 || project.researchFindings) && (
            <section className="w-full max-w-6xl mx-auto px-6 mb-16">
              <motion.div {...fadeUp}>
                {project.researchMethods?.length > 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
                    {project.researchMethods.map((method, i) => (
                      <div key={i} className="p-6 rounded-xl bg-bg-secondary">
                        <h3 className="font-display text-sm uppercase tracking-wider mb-3 text-text-muted">
                          {method.title}
                        </h3>
                        <p className="leading-relaxed text-text-secondary">
                          {method.description}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
                {project.researchFindings && (
                  <div className="max-w-4xl">
                    <h2 className="font-display text-2xl mb-4 text-text-primary">
                      Research Findings
                    </h2>
                    <p className="text-lg leading-relaxed text-text-secondary">
                      {project.researchFindings}
                    </p>
                  </div>
                )}
              </motion.div>
            </section>
          )}

          {/* Common Pain Points */}
          {project.painPoints?.length > 0 && (
            <section className="w-full mb-16 py-16 bg-accent-subtle">
              <div className="max-w-7xl mx-auto px-6">
                <motion.div {...fadeUp}>
                  <h2 className="font-display text-2xl mb-10 text-text-primary">
                    Common Pain Points
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {project.painPoints.map((point, i) => (
                      <div key={i} className="p-6 rounded-xl bg-bg-elevated">
                        <h3 className="font-display text-sm uppercase tracking-wider mb-3 text-text-primary">
                          {point.title}
                        </h3>
                        <p className="leading-relaxed text-text-secondary">
                          {point.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </section>
          )}

          {/* Quote + Persona */}
          {(project.quote || project.persona?.name) && (
            <section className="w-full mb-16">
              {project.quote && (
                <div className="py-16 px-6 bg-accent text-on-accent text-center">
                  <motion.blockquote
                    className="font-display text-2xl md:text-4xl max-w-4xl mx-auto leading-snug"
                    {...fadeUp}
                  >
                    &ldquo;{project.quote}&rdquo;
                  </motion.blockquote>
                </div>
              )}
              {project.persona?.name && (
                <div className="max-w-5xl mx-auto px-6 mt-10">
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
                        {[project.persona.role, project.persona.location].filter(Boolean).join(", ")}
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
                </div>
              )}
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

          {/* Ideation */}
          {(project.ideation?.description || project.ideation?.diagramImage) && (
            <section className="w-full max-w-7xl mx-auto px-6 mb-16">
              <motion.div {...fadeUp}>
                <h2 className="font-display text-2xl mb-6 text-text-primary">Ideation</h2>
                {project.ideation.description && (
                  <p className="max-w-4xl text-lg leading-relaxed text-text-secondary mb-8">
                    {project.ideation.description}
                  </p>
                )}
                {project.ideation.diagramImage && (
                  <img
                    src={project.ideation.diagramImage}
                    alt={`${project.title} — ideation flow`}
                    className="w-full h-auto rounded-2xl"
                    loading="lazy"
                    decoding="async"
                  />
                )}
              </motion.div>
            </section>
          )}

          {/* Wireframes */}
          {(project.wireframes?.description || project.wireframes?.images?.length > 0) && (
            <section className="w-full max-w-7xl mx-auto px-6 mb-16">
              <motion.div {...fadeUp}>
                <h2 className="font-display text-2xl mb-6 text-text-primary">
                  Laying the Foundation
                </h2>
                {project.wireframes.description && (
                  <p className="max-w-4xl text-lg leading-relaxed text-text-secondary mb-8">
                    {project.wireframes.description}
                  </p>
                )}
                {project.wireframes.images?.length > 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    {project.wireframes.images.map((img, i) => (
                      <img
                        key={i}
                        src={img}
                        alt={`${project.title} — wireframe ${i + 1}`}
                        className="w-full h-auto rounded-xl"
                        loading="lazy"
                        decoding="async"
                      />
                    ))}
                  </div>
                )}
              </motion.div>
            </section>
          )}

          {/* Solution */}
          {hasSolutionHighlights ? (
            <section className="w-full max-w-7xl mx-auto px-6 mb-16">
              <motion.div {...fadeUp}>
                <h2 className="font-display text-2xl mb-10 text-text-primary text-center">
                  The Solution
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                  {project.solutionHighlights.map((highlight, i) => (
                    <div key={i}>
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

          {/* Key Functions */}
          {project.keyFunctions?.length > 0 && (
            <section className="w-full max-w-7xl mx-auto px-6 mb-16">
              <motion.div {...fadeUp}>
                <h2 className="font-display text-2xl mb-10 text-text-primary">Key Functions</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  {project.keyFunctions.map((fn, i) => (
                    <div key={i}>
                      {fn.image && (
                        <img
                          src={fn.image}
                          alt={fn.caption || project.title}
                          className="w-full h-auto rounded-2xl mb-4"
                          loading="lazy"
                          decoding="async"
                        />
                      )}
                      {fn.caption && (
                        <p className="text-text-secondary text-center">{fn.caption}</p>
                      )}
                    </div>
                  ))}
                </div>
              </motion.div>
            </section>
          )}

          {/* Design Showcase */}
          {showcaseImages.length > 0 && (
            <section className="w-full max-w-7xl mx-auto px-6 mb-16">
              <motion.div {...fadeUp}>
                <h2 className="font-display text-2xl mb-6 text-text-primary">
                  Design Showcase
                </h2>
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
              onClick={(e) => { if (e.target === e.currentTarget) setLightboxOpen(false); }}
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

          {/* Results */}
          {project.results && project.results.length > 0 && (
            <section className="w-full max-w-6xl mx-auto px-6 mb-16">
              <motion.div {...fadeUp}>
                <h2 className="font-display text-2xl mb-10 text-text-primary">Results</h2>
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
        </>
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
