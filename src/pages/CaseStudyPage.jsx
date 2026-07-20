import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  User,
  Clock,
  ExternalLink,
  X,
  Expand,
} from "lucide-react";
import { Tag } from "../components/ui/Tag";
import { Button } from "../components/ui/Button";
import { Star } from "../components/decorative/Stars";
import { ProjectCard } from "../components/ProjectCard";
import { useProjects } from "../context/ProjectsContext";
import { cn } from "../utils/cn";

export function CaseStudyPage() {
  const { slug } = useParams();
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const { getProjectBySlug, getNextPrevProjects, getRelatedProjects, loading } = useProjects();

  const project = getProjectBySlug(slug);
  const { prev, next } = getNextPrevProjects(slug);
  const relatedProjects = getRelatedProjects(slug, 2);

  if (loading) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <p className="font-display text-lg animate-pulse text-text-muted">Loading...</p>
      </div>
    );
  }

  const showcaseImages = [project?.images].flat().filter(Boolean);

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

  return (
    <div className="min-h-screen pt-24 pb-20">
      <title>{`${project.title} — Quin Ledesma`}</title>
      <meta name="description" content={project.description} />
      <meta property="og:title" content={`${project.title} — Quin Ledesma`} />
      <meta property="og:description" content={project.description} />
      {project.thumbnail && (
        <meta property="og:image" content={project.thumbnail} />
      )}

      {/* Hero Section */}
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

          <div className="flex flex-wrap gap-2 mb-6">
            {project.tags?.map((tag) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </div>

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

          <div className="flex flex-wrap gap-6 mb-10">
            {project.client && (
              <div className="flex items-center gap-2">
                <User size={18} className="text-accent" />
                <span className="text-sm text-text-secondary">
                  {project.client}
                </span>
              </div>
            )}
            {project.year && (
              <div className="flex items-center gap-2">
                <Calendar size={18} className="text-accent" />
                <span className="text-sm text-text-secondary">
                  {project.year}
                </span>
              </div>
            )}
            {project.duration && (
              <div className="flex items-center gap-2">
                <Clock size={18} className="text-accent" />
                <span className="text-sm text-text-secondary">
                  {project.duration}
                </span>
              </div>
            )}
          </div>

          {(project.liveUrl || project.behanceUrl) && (
            <div className="flex flex-wrap gap-3 mb-10">
              {project.liveUrl && (
                <Button
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="primary"
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
                  View Full UI showcase on Behance
                  <ExternalLink size={16} />
                </Button>
              )}
            </div>
          )}

          <div
            className={cn(
              "rounded-2xl overflow-hidden mb-10 bg-bg-tertiary",
              (isCaseStudy || !project.thumbnail) && "aspect-video",
            )}
          >
            {project.thumbnail ? (
              <img
                src={project.thumbnail}
                alt={project.title}
                className={
                  isCaseStudy
                    ? "w-full h-full object-cover"
                    : "w-auto max-w-full max-h-[85vh] mx-auto object-contain"
                }
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

      {isCaseStudy && (
        <>
          {project.overview && (
            <section className="w-full max-w-4xl mx-auto px-6 mb-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="font-display text-2xl mb-6 text-text-primary">
                  Overview
                </h2>
                <p className="text-lg leading-relaxed text-text-secondary">
                  {project.overview}
                </p>
              </motion.div>
            </section>
          )}

          <section className="w-full max-w-4xl mx-auto px-6 mb-16">
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              {project.role && (
                <div className="p-6 rounded-xl bg-bg-secondary">
                  <h3 className="font-display text-sm uppercase tracking-wider mb-3 text-text-muted">
                    My Role
                  </h3>
                  <p className="font-medium text-text-primary">
                    {project.role}
                  </p>
                </div>
              )}
              {project.tools && (
                <div className="p-6 rounded-xl bg-bg-secondary">
                  <h3 className="font-display text-sm uppercase tracking-wider mb-3 text-text-muted">
                    Tools Used
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {project.tools.map((tool) => (
                      <span
                        key={tool}
                        className="px-3 py-1 rounded-full text-sm bg-bg-tertiary text-text-secondary"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </section>

          {project.challenge && (
            <section className="w-full max-w-4xl mx-auto px-6 mb-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="font-display text-2xl mb-6 text-text-primary">
                  The Challenge
                </h2>
                <p className="text-lg leading-relaxed text-text-secondary">
                  {project.challenge}
                </p>
              </motion.div>
            </section>
          )}

          {project.process && project.process.length > 0 && (
            <section className="w-full max-w-4xl mx-auto px-6 mb-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="font-display text-2xl mb-8 text-text-primary">
                  The Process
                </h2>
                <div className="space-y-8">
                  {project.process.map((step, index) => (
                    <motion.div
                      key={index}
                      className="flex gap-6"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                    >
                      <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 font-display text-sm bg-accent text-on-accent">
                        {index + 1}
                      </div>
                      <div>
                        <h3 className="font-display text-lg mb-2 text-text-primary">
                          {step.title}
                        </h3>
                        <p className="leading-relaxed text-text-secondary">
                          {step.description}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </section>
          )}

          {project.solution && (
            <section className="w-full max-w-4xl mx-auto px-6 mb-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="font-display text-2xl mb-6 text-text-primary">
                  The Solution
                </h2>
                <p className="text-lg leading-relaxed text-text-secondary">
                  {project.solution}
                </p>
              </motion.div>
            </section>
          )}

          {project.results && project.results.length > 0 && (
            <section className="w-full max-w-4xl mx-auto px-6 mb-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="font-display text-2xl mb-8 text-text-primary">
                  Results
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                  {project.results.map((result, index) => (
                    <motion.div
                      key={index}
                      className="p-6 rounded-xl text-center bg-bg-secondary"
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <div className="font-display text-3xl md:text-4xl mb-2 text-accent">
                        {result.metric}
                      </div>
                      <div className="text-sm text-text-secondary">
                        {result.label}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </section>
          )}

          {showcaseImages.length > 0 && (
            <section className="w-full max-w-7xl mx-auto px-6 mb-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
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
              <div className="max-w-5xl mx-auto py-16 px-4 space-y-3">
                {showcaseImages.map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt={`${project.title} — frame ${i + 1}`}
                    className="w-full h-auto rounded-lg"
                    loading={i === 0 ? "eager" : "lazy"}
                    decoding="async"
                  />
                ))}
              </div>
            </div>
          )}
        </>
      )}

      {!isCaseStudy && (
        <section className="w-full max-w-4xl mx-auto px-6 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-lg leading-relaxed text-text-secondary">
              {project.description}
            </p>
          </motion.div>

          {galleryImages.length > 0 && (
            <div className="mt-10 space-y-8">
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
            <motion.div
              className="mt-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
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
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
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
