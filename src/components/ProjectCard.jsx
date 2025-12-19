import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Tag } from "./ui/Tag";
import { useTheme } from "../context/ThemeContext";
import { cn } from "../utils/cn";

export function ProjectCard({ project, index }) {
  const { theme } = useTheme();
  const isEven = index % 2 === 0;

  return (
    <motion.article
      className="group relative rounded-2xl overflow-hidden card-hover bg-bg-secondary border-bg-tertiary"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      style={{
        boxShadow:
          theme === "light"
            ? "0 4px 24px rgba(0, 0, 0, 0.06)"
            : "0 4px 24px rgba(0, 0, 0, 0.2)",
      }}
    >
      {/* Project Image */}
      <div className="relative aspect-[16/9] overflow-hidden">
        <div className="absolute inset-0 transition-transform duration-500 group-hover:scale-105 bg-bg-tertiary">
          {project.image ? (
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="font-display text-2xl text-text-secondary">
                {project.title}
              </span>
            </div>
          )}
        </div>

        {/* Overlay on hover */}
        <div
          className={cn(
            "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center",
            theme === "light" ? "bg-[#0a1628]/60" : "bg-[#0a1628]/80"
          )}
        >
          <motion.div
            className={cn(
              "flex items-center gap-2 px-6 py-3 rounded-full font-medium",
              "bg-[#c9a96e] text-[#0a1628]"
            )}
            whileHover={{ scale: 1.05 }}
          >
            View Case Study
            <ArrowUpRight size={18} />
          </motion.div>
        </div>
      </div>

      {/* Project Info */}
      <div className="p-6 md:p-8">
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </div>

        {/* Title */}
        <h3
          className={cn(
            "font-display text-xl md:text-2xl mb-3",
            theme === "light" ? "text-[#0a1628]" : "text-[#f5f0e8]"
          )}
        >
          {project.title}
        </h3>

        {/* Description */}
        <p
          className={cn(
            "text-base leading-relaxed mb-4",
            theme === "light" ? "text-[#4a5568]" : "text-[#a8a39c]"
          )}
        >
          {project.description}
        </p>

        {/* Impact metric if available */}
        {project.impact && (
          <div
            className={cn(
              "pt-4 border-t",
              theme === "light" ? "border-[#e5e0d8]" : "border-[#1a2a3f]"
            )}
          >
            <span
              className={cn(
                "text-sm",
                theme === "light" ? "text-[#718096]" : "text-[#6b7280]"
              )}
            >
              Impact:{" "}
            </span>
            <span
              className={
                theme === "light" ? "text-[#b8954f]" : "text-[#c9a96e]"
              }
            >
              {project.impact}
            </span>
          </div>
        )}
      </div>
    </motion.article>
  );
}
