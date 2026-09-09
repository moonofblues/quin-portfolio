import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from "react";
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

  // The selectors and the context value are memoized on `projects`. Without
  // this, every provider render hands consumers a new value object holding new
  // function identities, so React re-renders the entire page tree — and any
  // consumer effect or memo keyed on these functions re-runs with it.
  const value = useMemo(() => {
    const getProjectBySlug = (slug) =>
      projects.find((p) => p.slug === slug) || null;

    const getCaseStudies = () => projects.filter((p) => p.type === "case-study");

    // A project's Focuses are derived from its Categories (ADR 0009). During
    // the additive migration, projects not yet tagged with categories fall
    // back to the older `services` array, then the legacy `category` string,
    // so filtering keeps working before every project is re-tagged.
    const focusesOf = (p) => {
      if (p.categories?.length)
        return [...new Set(p.categories.map((c) => c.focus).filter(Boolean))];
      if (p.services?.length) return p.services;
      return p.category ? [p.category] : [];
    };

    return {
      projects,
      loading,
      error,
      getFeaturedProjects: () => projects.filter((p) => p.featured),
      getOtherWorkProjects: () =>
        projects.filter((p) => p.type === "showcase"),
      // --- Interim selectors, still consumed by WorkPage/OtherWork until the
      // Chunk 2 two-level filter replaces them. Kept intact so nothing breaks
      // mid-migration; removed once the Work page reads categories directly. ---
      getProjectsByCategory: (cat) =>
        cat === "all" ? projects : projects.filter((p) => p.category === cat),
      getProjectsByService: (serviceId) =>
        serviceId === "all"
          ? projects
          : projects.filter((p) =>
              p.services?.length
                ? p.services.includes(serviceId)
                : p.category === serviceId
            ),
      getSubcategoriesByService: (serviceId) => {
        const pool =
          serviceId === "all"
            ? projects
            : projects.filter((p) =>
                p.services?.length
                  ? p.services.includes(serviceId)
                  : p.category === serviceId
              );
        return [
          ...new Set(pool.map((p) => p.subcategory).filter(Boolean)),
        ].sort();
      },
      // --- Category-aware selectors (ADR 0009), the target model. ---
      // Exposed so callers can render a project's discipline label(s) from the
      // derived focus rather than reading a stored field.
      getProjectFocuses: focusesOf,
      // Category-aware selector (ADR 0009). "all" returns everything; otherwise
      // a project matches when its derived Focuses include the given focus id.
      getProjectsByFocus: (focusId) =>
        focusId === "all"
          ? projects
          : projects.filter((p) => focusesOf(p).includes(focusId)),
      getProjectBySlug,
      getRelatedProjects: (slug, limit = 3) => {
        const current = getProjectBySlug(slug);
        if (!current) return [];
        const currentFocuses = focusesOf(current);
        return projects
          .filter(
            (p) =>
              p.slug !== slug &&
              focusesOf(p).some((f) => currentFocuses.includes(f)),
          )
          .slice(0, limit);
      },
      getNextPrevProjects: (slug) => {
        const caseStudies = getCaseStudies();
        const idx = caseStudies.findIndex((p) => p.slug === slug);
        return {
          prev: idx > 0 ? caseStudies[idx - 1] : null,
          next: idx < caseStudies.length - 1 ? caseStudies[idx + 1] : null,
        };
      },
    };
  }, [projects, loading, error]);

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
    <ProjectsContext.Provider value={value}>
      {children}
    </ProjectsContext.Provider>
  );
}

export const useProjects = () => useContext(ProjectsContext);
