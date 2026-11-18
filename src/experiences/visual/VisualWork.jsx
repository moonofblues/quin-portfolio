import { Link, Navigate, useParams } from "react-router-dom";
import { useProjects } from "../../shared/context/ProjectsContext";
import { VisualPhotoSet } from "./photo-set/VisualPhotoSet";

/**
 * /visual/<slug>: decides which page a work gets. Photo sets live here. Anything
 * else is not a Visual page yet (graphic design pieces arrive in plan step 5,
 * film in step 6), so it is sent to its Work page instead of showing nothing.
 */
export function VisualWork() {
  const { slug } = useParams();
  const { getProjectBySlug, loading } = useProjects();
  const card = getProjectBySlug(slug);

  // The type is only known once the list has loaded. Until then show a blank
  // page rather than guessing, so nothing flashes and then changes.
  if (!card && loading) return <div className="vp-page" aria-busy="true" />;

  if (!card) {
    return (
      <div className="vp-page">
        <h1 className="vp-title">not found.</h1>
        <p className="vp-intro">That work doesn't exist, or it hasn't been published.</p>
        <Link className="vp-back" to="/visual#work">
          ← lights up
        </Link>
      </div>
    );
  }

  if (card.type === "photo-set") return <VisualPhotoSet />;
  return <Navigate to={`/work/${slug}`} replace />;
}
