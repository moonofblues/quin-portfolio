import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Calendar, User, Clock } from "lucide-react";
import { Tag } from "../components/ui/Tag";
import { Button } from "../components/ui/Button";
import { Star } from "../components/decorative/Stars";
import { ProjectCard } from "../components/ProjectCard";
import {
  getProjectBySlug,
  getNextPrevProjects,
  getRelatedProjects,
} from "../data/projects";
import { cn } from "../utils/cn";

export function CaseStudyPage() {
  const { slug } = useParams();

  const project = getProjectBySlug(slug);
  const { prev, next } = getNextPrevProjects(slug);
  const relatedProjects = getRelatedProjects(slug, 2);

  if (!project) {
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

  const isCaseStudy = project.type === "case-study";

  return (
    <div className="min-h-screen pt-24 pb-20">
      <title>{`${project.title} — Quin Ledesma`}</title>
      <meta name="description" content={project.description} />
      <meta property="og:title" content={`${project.title} — Quin Ledesma`} />
      <meta property="og:description" content={project.description} />
      {project.thumbnail && <meta property="og:image" content={project.thumbnail} />}

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
                <span className="text-sm text-text-secondary">{project.client}</span>
              </div>
            )}
            {project.year && (
              <div className="flex items-center gap-2">
                <Calendar size={18} className="text-accent" />
                <span className="text-sm text-text-secondary">{project.year}</span>
              </div>
            )}
            {project.duration && (
              <div className="flex items-center gap-2">
                <Clock size={18} className="text-accent" />
                <span className="text-sm text-text-secondary">{project.duration}</span>
              </div>
            )}
          </div>

          <div className="aspect-video rounded-2xl overflow-hidden mb-10 bg-bg-tertiary">
            {project.thumbnail ? (
              <img
                src={project.thumbnail}
                alt={project.title}
                className="w-full h-full object-cover"
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
                <h2 className="font-display text-2xl mb-6 text-text-primary">Overview</h2>
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
                  <p className="font-medium text-text-primary">{project.role}</p>
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
                <h2 className="font-display text-2xl mb-6 text-text-primary">The Challenge</h2>
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
                <h2 className="font-display text-2xl mb-8 text-text-primary">The Process</h2>
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
                <h2 className="font-display text-2xl mb-6 text-text-primary">The Solution</h2>
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
                <h2 className="font-display text-2xl mb-8 text-text-primary">Results</h2>
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
                      <div className="text-sm text-text-secondary">{result.label}</div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </section>
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
              <p className="font-display mt-1 text-text-primary">{prev.title}</p>
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
              <p className="font-display mt-1 text-text-primary">{next.title}</p>
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
