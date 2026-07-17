import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Tag } from "./ui/Tag";
import { cn } from "../utils/cn";

export function ProjectCard({ project, index = 0 }) {
  return (
    <motion.article
      className="group relative rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 shadow-card"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link to={`/work/${project.slug}`}>
        <div className="relative aspect-[16/9] overflow-hidden">
          <div className="absolute inset-0 transition-transform duration-500 group-hover:scale-105">
            {project.thumbnail ? (
              <img
                src={project.thumbnail}
                alt={project.title}
                className="w-full h-full object-cover"
                loading="lazy"
                decoding="async"
              />
            ) : (
              <div className="w-full h-full bg-bg-tertiary flex items-center justify-center">
                <span className="font-display text-2xl text-text-muted">
                  {project.title}
                </span>
              </div>
            )}
          </div>

          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center bg-bg-primary/80">
            <motion.div
              className="flex items-center gap-2 px-6 py-3 rounded-full font-medium bg-accent text-on-accent"
              whileHover={{ scale: 1.05 }}
            >
              {project.type === "case-study" ? "View Case Study" : "View Project"}
              <ArrowUpRight size={18} />
            </motion.div>
          </div>
        </div>

        <div className="p-6 bg-bg-secondary">
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tags?.slice(0, 3).map((tag) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </div>

          <h3 className="font-display text-xl md:text-2xl mb-3 text-text-primary">
            {project.title}
          </h3>

          <p className="text-base leading-relaxed line-clamp-2 text-text-secondary">
            {project.description}
          </p>

          {project.impact && (
            <div className="mt-4 pt-4 border-t border-bg-tertiary">
              <span className="text-sm text-text-muted">Impact: </span>
              <span className="text-accent">{project.impact}</span>
            </div>
          )}
        </div>
      </Link>
    </motion.article>
  );
}
