import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { SectionTitle } from "./ui/SectionTitle";
import { ProjectCard } from "./ProjectCard";
import { Button } from "./ui/Button";
import { useProjects } from "../context/ProjectsContext";

export function FeaturedWork() {
  const { getFeaturedProjects, loading } = useProjects();
  if (loading) return null;
  const featuredProjects = getFeaturedProjects().slice(0, 6);

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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {featuredProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
