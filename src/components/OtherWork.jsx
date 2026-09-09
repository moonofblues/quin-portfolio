import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionTitle } from "./ui/SectionTitle";
import { cn } from "../utils/cn";
import { useProjects } from "../context/ProjectsContext";
import { SERVICES, SERVICE_BY_ID } from "../data/services";

const ALL_TAB = { id: "all", label: "All" };

// A project's focuses are derived from its categories (ADR 0009).
function focusesOf(p) {
  return (p.categories ?? []).map((c) => c.focus).filter(Boolean);
}

export function OtherWork() {
  const { getOtherWorkProjects, loading } = useProjects();
  const [activeFilter, setActiveFilter] = useState("all");

  if (loading) return null;

  const otherWorkProjects = getOtherWorkProjects();

  // Only show focus tabs that have at least one showcase project.
  const visibleTabs = [
    ALL_TAB,
    ...SERVICES.filter((s) =>
      otherWorkProjects.some((p) => focusesOf(p).includes(s.id)),
    ).map((s) => ({ id: s.id, label: s.label })),
  ];

  const filteredProjects =
    activeFilter === "all"
      ? otherWorkProjects
      : otherWorkProjects.filter((p) => focusesOf(p).includes(activeFilter));

  // Display label for a project's primary focus — used in the hover overlay.
  const focusLabelOf = (p) => {
    const focuses = focusesOf(p);
    return focuses.length > 0
      ? SERVICE_BY_ID[focuses[0]]?.label ?? focuses[0]
      : null;
  };

  return (
    <section className="section relative">
      <div className="container">
        <SectionTitle>Other Works</SectionTitle>

        {/* Focus filter tabs */}
        <motion.div
          className="flex flex-wrap gap-2 mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {visibleTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id)}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-[background-color,color] duration-200 hover:bg-accent-hover",
                activeFilter === tab.id
                  ? "bg-accent text-text-primary text-lg"
                  : "bg-bg-tertiary text-text-secondary",
              )}
            >
              {tab.label}
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

                {/* Hover overlay */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-4 text-center bg-text-primary">
                  <span className="font-display text-sm text-accent mb-2">
                    {project.title}
                  </span>
                  <span className="text-xs text-text-secondary">
                    {focusLabelOf(project)}
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
