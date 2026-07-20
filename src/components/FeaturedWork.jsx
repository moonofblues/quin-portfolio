// import { motion } from "framer-motion";
// import { SectionTitle } from "./ui/SectionTitle";
// import { ProjectCard } from "./ProjectCard";
// import { useTheme } from "../context/ThemeContext";
// import zcmcWebsiteDark from "../assets/zcmc-website-hero-dark.png";
// import adzuPortalDark from "../assets/adzu-portal.png";
// import leonora from "../assets/leonora-02.png";
// import dusc from "../assets/dusc-website.png";
// import hospitalDashboard from "../assets/hospital-operations-dashboard.png";
// import hospitalErp from "../assets/hospital-erp.png";

// const featuredProjects = [
//   {
//     id: 1,
//     title: "Institutional ERP System",
//     description:
//       "Comprehensive enterprise resource planning system for hospital operations. Designed and developed UI workflows, process documentation, and reusable component library.",
//     tags: ["UI/UX Design", "Design System", "Healthcare"],
//     impact: "60% reduction in task completion time of front-end developers",
//     image: hospitalErp,
//   },
//   {
//     id: 2,
//     title: "ZCMC Website Redesign",
//     description:
//       "Complete redesign of the medical center's public-facing website. Improved information architecture, accessibility, and visual identity while maintaining institutional branding.",
//     tags: ["Web Design", "Front-End Dev", "Healthcare"],
//     impact: null,
//     image: zcmcWebsiteDark,
//   },
//   {
//     id: 3,
//     title: "Hospital Operations Dashboard",
//     description:
//       "Led UI/UX design and prototyping for the university's internal systems portal. Created intuitive draft interfaces for students, faculty, and administrative staff.",
//     tags: ["UI/UX Design", "Prototyping", "Healthcare"],
//     impact: null,
//     image: hospitalDashboard,
//   },

//   {
//     id: 4,
//     title: "Leonora Financial Platform",
//     description:
//       "All-in-one financial empowerment platform featuring budgeting tools, savings tracking, and financial education. Complex dashboard UI with intuitive data visualization.",
//     tags: ["UI/UX Design", "Fintech", "Dashboard"],
//     impact: null,
//     image: leonora,
//   },
//   {
//     id: 5,
//     title: "Desert United Soccer Club",
//     description:
//       "Website design for a youth soccer club featuring team showcases, event management, and program information. Modern, energetic design reflecting the club's community spirit.",
//     tags: ["Web Design", "Branding", "Sports"],
//     impact: null,
//     image: dusc,
//   },
//   {
//     id: 6,
//     title: "AdZU Institutional Portal",
//     description:
//       "Led UI/UX design and prototyping for the university's internal systems portal. Created intuitive draft interfaces for students, faculty, and administrative staff.",
//     tags: ["UI/UX Design", "Prototyping", "Education"],
//     impact: null,
//     image: adzuPortalDark,
//   },
// ];

// export function FeaturedWork() {
//   const { theme } = useTheme();

//   return (
//     <section id="work" className="section relative">
//       <div className="container">
//         <SectionTitle>Featured Work</SectionTitle>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
//           {featuredProjects.map((project, index) => (
//             <ProjectCard key={project.id} project={project} index={index} />
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { SectionTitle } from "./ui/SectionTitle";
import { ProjectCard } from "./ProjectCard";
import { Button } from "./ui/Button";
import { useProjects } from "../context/ProjectsContext";
import { useTheme } from "../context/ThemeContext";

export function FeaturedWork() {
  const { theme } = useTheme();
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
