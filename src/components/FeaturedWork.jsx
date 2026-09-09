import { Link } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { SectionTitle } from "./ui/SectionTitle";
import { ProjectCard } from "./ProjectCard";
import { Button } from "./ui/Button";
import { useProjects } from "../context/ProjectsContext";
import { SERVICE_BY_ID } from "../data/services";

export function FeaturedWork() {
  const { getFeaturedProjects, getProjectsByFocus, loading } = useProjects();
  const [searchParams] = useSearchParams();
  const focusId = searchParams.get("focus");
  const service = focusId ? SERVICE_BY_ID[focusId] : null;

  if (loading) return null;

  // Q8 rule (Phase 6): featured-in-focus first, then top up with the most
  // recent projects in that focus, up to 6. Preserves the sortOrder the
  // Sanity query already applies (sortOrder asc, _createdAt desc).
  // Q9: if the focus has no projects yet, fall back to the full featured set
  // and show a "work coming soon" note.
  let featuredProjects;
  let comingSoon = false;

  if (service) {
    const inFocus = getProjectsByFocus(focusId);
    if (inFocus.length === 0) {
      comingSoon = true;
      featuredProjects = getFeaturedProjects().slice(0, 6);
    } else {
      const featuredInFocus = inFocus.filter((p) => p.featured);
      const restInFocus = inFocus.filter((p) => !p.featured);
      featuredProjects = [...featuredInFocus, ...restInFocus].slice(0, 6);
    }
  } else {
    featuredProjects = getFeaturedProjects().slice(0, 6);
  }

  return (
    <section id="work" className="py-20 md:py-28 relative">
      <div className="w-full max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
          <SectionTitle className="mb-0">Featured Work</SectionTitle>
          <Link to="/work">
            <Button variant="ghost" className="group">
              View All Projects
              <ArrowRight
                size={18}
                className="transition-transform group-hover:translate-x-1"
              />
            </Button>
          </Link>
        </div>

        {comingSoon && (
          <p className="text-text-secondary text-sm mb-8">
            No projects tagged{" "}
            <span className="text-text-primary font-medium">
              {service.label}
            </span>{" "}
            yet — showing all featured work in the meantime.
          </p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {featuredProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
