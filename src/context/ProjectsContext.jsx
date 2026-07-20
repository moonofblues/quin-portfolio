import { createContext, useContext, useState, useEffect } from "react";
import { fetchAllProjects } from "../sanity/queries";

const ProjectsContext = createContext(null);

export function ProjectsProvider({ children }) {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
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
