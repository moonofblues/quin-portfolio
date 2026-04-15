import { useState, useMemo } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { ProjectCard } from "../components/ProjectCard";
import { Star } from "../components/decorative/Stars";
import { Button } from "../components/ui/Button";
import { projects, categories, getProjectsByCategory } from "../data/projects";
import { useTheme } from "../context/ThemeContext";
import { cn } from "../utils/cn";

export function WorkPage() {
  const { theme } = useTheme();
  const { category } = useParams();
  const navigate = useNavigate();

  const activeCategory = category || "all";

  const filteredProjects = useMemo(() => {
    return getProjectsByCategory(activeCategory);
  }, [activeCategory]);

  const currentCategory = categories.find((c) => c.id === activeCategory);

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="w-full max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link to="/" className="inline-block mb-6">
            <Button variant="ghost" size="small">
              <ArrowLeft size={16} />
              Back to Home
            </Button>
          </Link>

          <div className="flex items-center gap-3 mb-4">
            <Star size={32} />
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl dark:text-white">
              {activeCategory === "all" ? "All Work" : currentCategory?.label}
            </h1>
          </div>

          <p
            className={cn(
              "text-lg max-w-2xl",
              theme === "light" ? "text-[#4a5568]" : "text-[#a8a39c]",
            )}
          >
            {currentCategory?.description ||
              "Browse all my projects across different disciplines"}
          </p>
        </motion.div>

        {/* Category filters */}
        <motion.div
          className="flex flex-wrap gap-2 mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() =>
                navigate(
                  cat.id === "all" ? "/work" : `/work/category/${cat.id}`,
                )
              }
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200",
                activeCategory === cat.id
                  ? theme === "light"
                    ? "bg-[#b8954f] text-[#faf8f5]"
                    : "bg-[#c9a96e] text-[#0a1628]"
                  : theme === "light"
                    ? "bg-[#e5e0d8] text-[#4a5568] hover:bg-[#d5d0c8]"
                    : "bg-[#1a2a3f] text-[#a8a39c] hover:bg-[#243347]",
              )}
            >
              {cat.label}
              <span className="ml-2 opacity-60">
                (
                {cat.id === "all"
                  ? projects.length
                  : getProjectsByCategory(cat.id).length}
                )
              </span>
            </button>
          ))}
        </motion.div>

        {/* Projects grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          layout
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredProjects.length === 0 && (
          <motion.div
            className="text-center py-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <p
              className={cn(
                "text-lg",
                theme === "light" ? "text-[#718096]" : "text-[#6b7280]",
              )}
            >
              No projects found in this category.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
