import { motion } from "framer-motion";
import { SectionTitle } from "./ui/SectionTitle";
import { ProjectCard } from "./ProjectCard";
import { useTheme } from "../context/ThemeContext";
import zcmcWebsiteDark from "../assets/zcmc-website-hero-dark.png";
import adzuPortalDark from "../assets/adzu-portal.png";
import leonora from "../assets/leonora-02.png";
import dusc from "../assets/dusc-website.png";

const featuredProjects = [
  {
    id: 1,
    title: "Hospital Institution ERP System",
    description:
      "Comprehensive enterprise resource planning system for hospital operations. Designed and developed UI workflows, process documentation, and reusable component library.",
    tags: ["UI/UX Design", "Design System", "Healthcare"],
    impact: "60% reduction in task completion time of front-end developers",
    image: null,
  },
  {
    id: 2,
    title: "ZCMC Website Redesign",
    description:
      "Complete redesign of the medical center's public-facing website. Improved information architecture, accessibility, and visual identity while maintaining institutional branding.",
    tags: ["Web Design", "Front-End Dev", "Healthcare"],
    impact: null,
    image: zcmcWebsiteDark,
  },
  {
    id: 3,
    title: "AdZU Institutional Portal",
    description:
      "Led UI/UX design and prototyping for the university's internal systems portal. Created intuitive draft interfaces for students, faculty, and administrative staff.",
    tags: ["UI/UX Design", "Prototyping", "Education"],
    impact: null,
    image: adzuPortalDark,
  },
  {
    id: 4,
    title: "Leonora Financial Platform",
    description:
      "All-in-one financial empowerment platform featuring budgeting tools, savings tracking, and financial education. Complex dashboard UI with intuitive data visualization.",
    tags: ["UI/UX Design", "Fintech", "Dashboard"],
    impact: null,
    image: leonora,
  },
  {
    id: 5,
    title: "Desert United Soccer Club",
    description:
      "Website design for a youth soccer club featuring team showcases, event management, and program information. Modern, energetic design reflecting the club's community spirit.",
    tags: ["Web Design", "Branding", "Sports"],
    impact: null,
    image: dusc,
  },
  {
    id: 6,
    title: "ZCMC Systems UI Library",
    description:
      "Developed and standardized reusable design components and patterns for consistent user experience across all hospital information systems.",
    tags: ["Design System", "Component Library", "Documentation"],
    impact: null,
    image: null,
  },
];

export function FeaturedWork() {
  const { theme } = useTheme();

  return (
    <section id="work" className="section relative">
      <div className="container">
        <SectionTitle>Featured Work</SectionTitle>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {featuredProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
