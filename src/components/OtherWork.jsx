import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionTitle } from "./ui/SectionTitle";
import { cn } from "../utils/cn";
import { useProjects } from "../context/ProjectsContext";

const FILTER_TABS = [
  { id: "all", label: "All" },
  { id: "graphic-design", label: "Graphic Design" },
  { id: "video", label: "Video" },
  { id: "web-dev", label: "Web Dev" },
  { id: "ui-ux", label: "UI/UX" },
];

export function OtherWork() {
  const { getOtherWorkProjects, loading } = useProjects();
  const [activeFilter, setActiveFilter] = useState("all");

  if (loading) return null;

  const otherWorkProjects = getOtherWorkProjects();
  const categories = FILTER_TABS.filter(
    (c) => c.id === "all" || otherWorkProjects.some((p) => p.category === c.id),
  );

  const filteredProjects =
    activeFilter === "all"
      ? otherWorkProjects
      : otherWorkProjects.filter((p) => p.category === activeFilter);

  return (
    <section className="section relative">
      <div className="container">
        <SectionTitle>Other Works</SectionTitle>

        {/* Filter tabs */}
        <motion.div
          className="flex flex-wrap gap-2 mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveFilter(category.id)}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 hover:bg-accent-hover ",
                activeFilter === category.id
                  ? "bg-accent text-text-primary text-lg"
                  : "bg-bg-tertiary text-text-secondary ",
              )}
            >
              {category.label}
            </button>
          ))}
        </motion.div>

        {/* Project grid */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
          layout
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="group relative aspect-square rounded-xl overflow-hidden cursor-pointer card-hover bg-bg-tertiary"
              >
                {project.thumbnail ? (
                  <img
                    src={project.thumbnail}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-100"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center p-4">
                    <span className="font-display text-sm text-center text-text-muted">
                      {project.title}
                    </span>
                  </div>
                )}

                {/* Overlay when hovered */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-4 text-center bg-text-primary ">
                  <span className="font-display text-sm text-accent  mb-2">
                    {project.title}
                  </span>
                  <span className="text-xs text-text-secondary">
                    {project.category}
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
