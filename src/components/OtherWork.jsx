import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionTitle } from "./ui/SectionTitle";
// import { useTheme } from "../context/ThemeContext";
import { cn } from "../utils/cn";
import gdConverse from "../assets/other-work/gd-converse.png";
import gdBirthday from "../assets/other-work/birthday.png";
import gdITannouncement from "../assets/other-work/IT-announcement.png";
import gdITnews from "../assets/other-work/IT-news.png";

const categories = ["All", "Graphic Design", "Video", "Web Dev", "UI/UX"];

const otherProjects = [
  {
    id: 1,
    title: "Brand Identity System",
    category: "Graphic Design",
    image: null,
  },
  { id: 2, title: "News", category: "Graphic Design", image: gdITnews },
  { id: 3, title: "Birthday", category: "Graphic Design", image: gdBirthday },
  { id: 4, title: "Mobile App Prototype", category: "UI/UX", image: null },
  {
    id: 5,
    title: "Announcement",
    category: "Graphic Design",
    image: gdITannouncement,
  },
  { id: 6, title: "Product Demo Video", category: "Video", image: null },
  { id: 7, title: "Dashboard Interface", category: "UI/UX", image: null },
  {
    id: 8,
    title: "Social Media Kit",
    category: "Graphic Design",
    image: gdConverse,
  },
];

export function OtherWork() {
  // const { theme } = useTheme();
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredProjects =
    activeFilter === "All"
      ? otherProjects
      : otherProjects.filter((p) => p.category === activeFilter);

  return (
    <section className="section relative">
      <div className="container">
        <SectionTitle>Other Works</SectionTitle>

        {/* Filter tabs */}
        <motion.div
          className="flex flex-wrap gap-2 mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveFilter(category)}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 hover:bg-accent-hover ",
                activeFilter === category
                  ? "bg-accent text-text-primary text-lg"
                  : "bg-bg-tertiary text-text-secondary ",
              )}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Project grid */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
          layout
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="group relative aspect-square rounded-xl overflow-hidden cursor-pointer card-hover bg-bg-tertiary"
              >
                {project.image ? (
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-100"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center p-4">
                    <span className="font-display text-sm text-center text-text-muted">
                      {project.title}
                    </span>
                  </div>
                )}

                {/* Overlay when hovered */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-4 text-center bg-text-primary ">
                  <span className="font-display text-sm text-accent  mb-2">
                    {project.title}
                  </span>
                  <span className="text-xs text-text-secondary">
                    {project.category}
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
