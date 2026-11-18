import { useEffect, useState } from "react";
import { useProjects } from "./ProjectsContext";

// A project's full detail content. `project` is undefined while loading and
// null when the slug doesn't exist. Cached results return synchronously, so
// revisiting a project renders without a loading state.
export function useProjectDetail(slug) {
  const { getCachedProjectDetail, loadProjectDetail } = useProjects();
  const [result, setResult] = useState({ slug: null, project: undefined, error: null });

  useEffect(() => {
    if (getCachedProjectDetail(slug) !== undefined) return;
    let active = true;
    loadProjectDetail(slug).then(
      (project) => active && setResult({ slug, project, error: null }),
      (error) => active && setResult({ slug, project: undefined, error }),
    );
    return () => {
      active = false;
    };
  }, [slug, getCachedProjectDetail, loadProjectDetail]);

  const cached = getCachedProjectDetail(slug);
  if (cached !== undefined) return { project: cached, loading: false, error: null };
  if (result.slug === slug) return { ...result, loading: !result.error && result.project === undefined };
  return { project: undefined, loading: true, error: null };
}
