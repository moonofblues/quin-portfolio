import { Link, Navigate, useParams } from "react-router-dom";
import { useProjects } from "../../shared/context/ProjectsContext";
import { VISUAL, mainExperienceOf } from "../../shared/experiences";
import { VisualFilm } from "./film/VisualFilm";
import { VisualGraphic } from "./graphic/VisualGraphic";
import { VisualPhotoSet } from "./photo-set/VisualPhotoSet";

/**
 * /visual/<slug>: decides which page a work gets, by its type.
 *   photo set -> the gallery (lights down)
 *   film      -> the film page (lights down)
 *   showcase  -> a graphic design page (on paper), when its main Experience is
 *                Visual
 * Anything else belongs to the Product site, so it is sent to its Work page.
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
        <p className="vp-intro">Nothing at this address. It may have moved, or it was never published.</p>
        <Link className="vp-back" to="/visual#work">
          ← lights up
        </Link>
      </div>
    );
  }

  if (card.type === "photo-set") return <VisualPhotoSet />;
  if (card.type === "film") return <VisualFilm />;
  if (card.type === "showcase" && mainExperienceOf(card) === VISUAL) {
    return <VisualGraphic />;
  }
  return <Navigate to={`/work/${slug}`} replace />;
}
