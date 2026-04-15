import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  Calendar,
  User,
  Clock,
} from "lucide-react";
import { Tag } from "../components/ui/Tag";
import { Button } from "../components/ui/Button";
import { Star } from "../components/decorative/Stars";
import { ProjectCard } from "../components/ProjectCard";
import {
  getProjectBySlug,
  getNextPrevProjects,
  getRelatedProjects,
} from "../data/projects";
import { useTheme } from "../context/ThemeContext";
import { cn } from "../utils/cn";

export function CaseStudyPage() {
  const { slug } = useParams();
  const { theme } = useTheme();
  const navigate = useNavigate();

  const project = getProjectBySlug(slug);
  const { prev, next } = getNextPrevProjects(slug);
  const relatedProjects = getRelatedProjects(slug, 2);

  if (!project) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-2xl mb-4">Project not found</h1>
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

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {project.tags?.map((tag) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </div>

          {/* Title */}
          <div className="flex items-start gap-4 mb-6">
            <Star size={36} className="mt-2 shrink-0" />
            <div>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl mb-4 white text-text-primary">
                {project.title}
              </h1>
              {project.subtitle && (
                <p
                  className={cn(
                    "text-xl md:text-2xl",
                    theme === "light" ? "text-[#4a5568]" : "text-[#a8a39c]",
                  )}
                >
                  {project.subtitle}
                </p>
              )}
            </div>
          </div>

          {/* Meta info */}
          <div className="flex flex-wrap gap-6 mb-10">
            {project.client && (
              <div className="flex items-center gap-2">
                <User
                  size={18}
                  className={
                    theme === "light" ? "text-[#b8954f]" : "text-[#c9a96e]"
                  }
                />
                <span
                  className={cn(
                    "text-sm",
                    theme === "light" ? "text-[#4a5568]" : "text-[#a8a39c]",
                  )}
                >
                  {project.client}
                </span>
              </div>
            )}
            {project.year && (
              <div className="flex items-center gap-2">
                <Calendar
                  size={18}
                  className={
                    theme === "light" ? "text-[#b8954f]" : "text-[#c9a96e]"
                  }
                />
                <span
                  className={cn(
                    "text-sm",
                    theme === "light" ? "text-[#4a5568]" : "text-[#a8a39c]",
                  )}
                >
                  {project.year}
                </span>
              </div>
            )}
            {project.duration && (
              <div className="flex items-center gap-2">
                <Clock
                  size={18}
                  className={
                    theme === "light" ? "text-[#b8954f]" : "text-[#c9a96e]"
                  }
                />
                <span
                  className={cn(
                    "text-sm",
                    theme === "light" ? "text-[#4a5568]" : "text-[#a8a39c]",
                  )}
                >
                  {project.duration}
                </span>
              </div>
            )}
          </div>

          {/* Hero image */}
          <div
            className={cn(
              "aspect-video rounded-2xl overflow-hidden mb-10",
              theme === "light" ? "bg-[#e5e0d8]" : "bg-[#1a2a3f]",
            )}
          >
            {project.thumbnail ? (
              <img
                src={project.thumbnail}
                alt={project.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <span
                  className={cn(
                    "font-display text-4xl",
                    theme === "light" ? "text-[#a8a39c]" : "text-[#4a5568]",
                  )}
                >
                  {project.title}
                </span>
              </div>
            )}
          </div>
        </motion.div>
      </section>

      {/* Case Study Content */}
      {isCaseStudy && (
        <>
          {/* Overview */}
          {project.overview && (
            <section className="w-full max-w-4xl mx-auto px-6 mb-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h2
                  className={cn(
                    "font-display text-2xl mb-6",
                    theme === "light" ? "text-[#0a1628]" : "text-[#f5f0e8]",
                  )}
                >
                  Overview
                </h2>
                <p
                  className={cn(
                    "text-lg leading-relaxed",
                    theme === "light" ? "text-[#4a5568]" : "text-[#a8a39c]",
                  )}
                >
                  {project.overview}
                </p>
              </motion.div>
            </section>
          )}

          {/* Role & Tools */}
          <section className="w-full max-w-4xl mx-auto px-6 mb-16">
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              {project.role && (
                <div
                  className={cn(
                    "p-6 rounded-xl",
                    theme === "light" ? "bg-[#f0ece4]" : "bg-[#111d2e]",
                  )}
                >
                  <h3
                    className={cn(
                      "font-display text-sm uppercase tracking-wider mb-3",
                      theme === "light" ? "text-[#718096]" : "text-[#6b7280]",
                    )}
                  >
                    My Role
                  </h3>
                  <p
                    className={cn(
                      "font-medium",
                      theme === "light" ? "text-[#0a1628]" : "text-[#f5f0e8]",
                    )}
                  >
                    {project.role}
                  </p>
                </div>
              )}
              {project.tools && (
                <div
                  className={cn(
                    "p-6 rounded-xl",
                    theme === "light" ? "bg-[#f0ece4]" : "bg-[#111d2e]",
                  )}
                >
                  <h3
                    className={cn(
                      "font-display text-sm uppercase tracking-wider mb-3",
                      theme === "light" ? "text-[#718096]" : "text-[#6b7280]",
                    )}
                  >
                    Tools Used
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {project.tools.map((tool) => (
                      <span
                        key={tool}
                        className={cn(
                          "px-3 py-1 rounded-full text-sm",
                          theme === "light"
                            ? "bg-[#e5e0d8] text-[#4a5568]"
                            : "bg-[#1a2a3f] text-[#a8a39c]",
                        )}
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </section>

          {/* Challenge */}
          {project.challenge && (
            <section className="w-full max-w-4xl mx-auto px-6 mb-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h2
                  className={cn(
                    "font-display text-2xl mb-6",
                    theme === "light" ? "text-[#0a1628]" : "text-[#f5f0e8]",
                  )}
                >
                  The Challenge
                </h2>
                <p
                  className={cn(
                    "text-lg leading-relaxed",
                    theme === "light" ? "text-[#4a5568]" : "text-[#a8a39c]",
                  )}
                >
                  {project.challenge}
                </p>
              </motion.div>
            </section>
          )}

          {/* Process */}
          {project.process && project.process.length > 0 && (
            <section className="w-full max-w-4xl mx-auto px-6 mb-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h2
                  className={cn(
                    "font-display text-2xl mb-8",
                    theme === "light" ? "text-[#0a1628]" : "text-[#f5f0e8]",
                  )}
                >
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
                      <div
                        className={cn(
                          "w-10 h-10 rounded-full flex items-center justify-center shrink-0 font-display text-sm",
                          theme === "light"
                            ? "bg-[#b8954f] text-[#faf8f5]"
                            : "bg-[#c9a96e] text-[#0a1628]",
                        )}
                      >
                        {index + 1}
                      </div>
                      <div>
                        <h3
                          className={cn(
                            "font-display text-lg mb-2",
                            theme === "light"
                              ? "text-[#0a1628]"
                              : "text-[#f5f0e8]",
                          )}
                        >
                          {step.title}
                        </h3>
                        <p
                          className={cn(
                            "leading-relaxed",
                            theme === "light"
                              ? "text-[#4a5568]"
                              : "text-[#a8a39c]",
                          )}
                        >
                          {step.description}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </section>
          )}

          {/* Solution */}
          {project.solution && (
            <section className="w-full max-w-4xl mx-auto px-6 mb-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h2
                  className={cn(
                    "font-display text-2xl mb-6",
                    theme === "light" ? "text-[#0a1628]" : "text-[#f5f0e8]",
                  )}
                >
                  The Solution
                </h2>
                <p
                  className={cn(
                    "text-lg leading-relaxed",
                    theme === "light" ? "text-[#4a5568]" : "text-[#a8a39c]",
                  )}
                >
                  {project.solution}
                </p>
              </motion.div>
            </section>
          )}

          {/* Results */}
          {project.results && project.results.length > 0 && (
            <section className="w-full max-w-4xl mx-auto px-6 mb-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h2
                  className={cn(
                    "font-display text-2xl mb-8",
                    theme === "light" ? "text-[#0a1628]" : "text-[#f5f0e8]",
                  )}
                >
                  Results
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                  {project.results.map((result, index) => (
                    <motion.div
                      key={index}
                      className={cn(
                        "p-6 rounded-xl text-center",
                        theme === "light" ? "bg-[#f0ece4]" : "bg-[#111d2e]",
                      )}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <div
                        className={cn(
                          "font-display text-3xl md:text-4xl mb-2",
                          theme === "light"
                            ? "text-[#b8954f]"
                            : "text-[#c9a96e]",
                        )}
                      >
                        {result.metric}
                      </div>
                      <div
                        className={cn(
                          "text-sm",
                          theme === "light"
                            ? "text-[#4a5568]"
                            : "text-[#a8a39c]",
                        )}
                      >
                        {result.label}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </section>
          )}
        </>
      )}

      {/* For showcase projects, just show description */}
      {!isCaseStudy && (
        <section className="w-full max-w-4xl mx-auto px-6 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p
              className={cn(
                "text-lg leading-relaxed",
                theme === "light" ? "text-[#4a5568]" : "text-[#a8a39c]",
              )}
            >
              {project.description}
            </p>
          </motion.div>
        </section>
      )}

      {/* Project Navigation */}
      <section className="w-full max-w-7xl mx-auto px-6 mb-16">
        <motion.div
          className={cn(
            "flex flex-col sm:flex-row justify-between items-center gap-4 py-8 border-t border-b",
            theme === "light" ? "border-[#e5e0d8]" : "border-[#1a2a3f]",
          )}
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
              <p
                className={cn(
                  "font-display mt-1",
                  theme === "light" ? "text-[#0a1628]" : "text-[#f5f0e8]",
                )}
              >
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
              <p
                className={cn(
                  "font-display mt-1",
                  theme === "light" ? "text-[#0a1628]" : "text-[#f5f0e8]",
                )}
              >
                {next.title}
              </p>
            </Link>
          ) : (
            <div />
          )}
        </motion.div>
      </section>

      {/* Related Projects */}
      {relatedProjects.length > 0 && (
        <section className="w-full max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2
              className={cn(
                "font-display text-2xl mb-8",
                theme === "light" ? "text-[#0a1628]" : "text-[#f5f0e8]",
              )}
            >
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
