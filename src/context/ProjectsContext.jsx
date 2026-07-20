import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { fetchAllProjects } from "../sanity/queries";

const ProjectsContext = createContext(null);

export function ProjectsProvider({ children }) {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = useCallback(() => {
    setLoading(true);
    setError(null);
    fetchAllProjects()
      .then((data) => {
        setProjects(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch projects:", err);
        setError(err);
        setLoading(false);
      });
  }, []);

  useEffect(() => { load(); }, [load]);

  const getFeaturedProjects = () => projects.filter((p) => p.featured);

  const getOtherWorkProjects = () => projects.filter((p) => p.type === "showcase");

  const getProjectsByCategory = (cat) =>
    cat === "all" ? projects : projects.filter((p) => p.category === cat);

  const getProjectBySlug = (slug) =>
    projects.find((p) => p.slug === slug) || null;

  const getCaseStudies = () => projects.filter((p) => p.type === "case-study");

  const getRelatedProjects = (slug, limit = 3) => {
    const current = getProjectBySlug(slug);
    if (!current) return [];
    return projects
      .filter((p) => p.slug !== slug && p.category === current.category)
      .slice(0, limit);
  };

  const getNextPrevProjects = (slug) => {
    const caseStudies = getCaseStudies();
    const idx = caseStudies.findIndex((p) => p.slug === slug);
    return {
      prev: idx > 0 ? caseStudies[idx - 1] : null,
      next: idx < caseStudies.length - 1 ? caseStudies[idx + 1] : null,
    };
  };

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 px-6 text-center">
        <p className="text-text-secondary">Could not load projects. Check your connection.</p>
        <button
          onClick={load}
          className="px-4 py-2 rounded-full text-sm font-medium bg-accent text-on-accent hover:bg-accent-hover transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <ProjectsContext.Provider
      value={{
        projects,
        loading,
        error,
        getFeaturedProjects,
        getOtherWorkProjects,
        getProjectsByCategory,
        getProjectBySlug,
        getRelatedProjects,
        getNextPrevProjects,
      }}
    >
      {children}
    </ProjectsContext.Provider>
  );
}

export const useProjects = () => useContext(ProjectsContext);
