import { useState, useEffect, useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { ProjectCard } from "../components/ProjectCard";
import { Star } from "../components/decorative/Stars";
import { Button } from "../components/ui/Button";
import { SERVICES } from "../data/services";
import { fetchCategories } from "../sanity/queries";
import { useProjects } from "../context/ProjectsContext";
import { cn } from "../utils/cn";

const ALL_FOCUS = { id: "all", label: "All Work", description: "Browse all projects across disciplines" };
const FOCUS_FILTERS = [ALL_FOCUS, ...SERVICES];

export function WorkPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [allCategories, setAllCategories] = useState([]);
  const { projects, getProjectsByFocus, loading } = useProjects();

  const activeFocus = searchParams.get("focus") || "all";
  const activeCategory = searchParams.get("category") || null;

  useEffect(() => {
    fetchCategories().then(setAllCategories);
  }, []);

  // Sub-row: only categories belonging to the selected focus.
  const focusCategories = useMemo(
    () => allCategories.filter((c) => c.focus === activeFocus),
    [allCategories, activeFocus],
  );

  // Level 1: filter by focus.
  const focusProjects = useMemo(
    () => getProjectsByFocus(activeFocus),
    [activeFocus, projects],
  );

  // Level 2: narrow by category slug if one is selected.
  const filteredProjects = useMemo(() => {
    if (!activeCategory) return focusProjects;
    return focusProjects.filter((p) =>
      p.categories?.some((c) => c.slug === activeCategory),
    );
  }, [focusProjects, activeCategory]);

  const activeFocusInfo = FOCUS_FILTERS.find((f) => f.id === activeFocus);
  const activeCategoryInfo = focusCategories.find((c) => c.slug === activeCategory);

  const selectFocus = (focusId) => {
    if (focusId === "all") setSearchParams({});
    else setSearchParams({ focus: focusId });
  };

  const selectCategory = (catSlug) => {
    if (catSlug === activeCategory) {
      // Toggle off — go back to focus-only view.
      setSearchParams(activeFocus === "all" ? {} : { focus: activeFocus });
    } else {
      setSearchParams({ focus: activeFocus, category: catSlug });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <p className="font-display text-lg animate-pulse text-text-muted">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="w-full max-w-7xl mx-auto px-6">
        {/* Page header */}
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
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-text-primary">
              {activeCategoryInfo?.title ?? activeFocusInfo?.label ?? "All Work"}
            </h1>
          </div>

          <p className="text-lg max-w-2xl text-text-secondary">
            {activeFocusInfo?.description ?? "Browse all my projects across different disciplines"}
          </p>
        </motion.div>

        {/* Level 1 — Focus tabs */}
        <motion.div
          className="flex flex-wrap gap-2 mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {FOCUS_FILTERS.map((focus) => (
            <button
              key={focus.id}
              onClick={() => selectFocus(focus.id)}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-[background-color,color] duration-200",
                activeFocus === focus.id
                  ? "bg-accent text-on-accent"
                  : "bg-bg-tertiary text-text-secondary hover:bg-bg-hover",
              )}
            >
              {focus.label}
              <span className="ml-2 opacity-60">
                ({focus.id === "all" ? projects.length : getProjectsByFocus(focus.id).length})
              </span>
            </button>
          ))}
        </motion.div>

        {/* Level 2 — Category sub-row (only when a focus is selected and has categories) */}
        <AnimatePresence>
          {activeFocus !== "all" && focusCategories.length > 0 && (
            <motion.div
              className="flex flex-wrap gap-2 mb-10 pl-1"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
            >
              {focusCategories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => selectCategory(cat.slug)}
                  className={cn(
                    "px-3 py-1.5 rounded-full text-xs font-medium transition-[background-color,color,border-color] duration-200 border",
                    activeCategory === cat.slug
                      ? "bg-accent-secondary/20 border-accent-secondary text-accent-secondary"
                      : "bg-bg-secondary border-bg-tertiary text-text-muted hover:border-accent-secondary/50 hover:text-text-secondary",
                  )}
                >
                  {cat.title}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Without the sub-row, add bottom margin to the focus tabs */}
        {(activeFocus === "all" || focusCategories.length === 0) && (
          <div className="mb-10" />
        )}

        {/* Project grid */}
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
            <p className="text-lg text-text-muted">
              {activeCategory
                ? "No projects in this category yet."
                : activeFocus === "all"
                ? "No projects found."
                : "No projects in this focus yet — check back soon."}
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
