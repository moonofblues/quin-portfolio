import { motion } from "framer-motion";
import { Palette, Code, Smartphone, Layers, Video, Wand2 } from "lucide-react";
import { SectionTitle } from "./ui/SectionTitle";
import { useTheme } from "../context/ThemeContext";
import { cn } from "../utils/cn";

const services = [
  {
    id: 1,
    title: "UI/UX Design",
    description:
      "Research, wireframing, prototyping, and design systems. Creating intuitive interfaces that users love.",
    icon: Palette,
    featured: true,
  },
  {
    id: 2,
    title: "Front-End Development",
    description:
      "React, Vue, Tailwind CSS. Bringing designs to life with clean, performant code.",
    icon: Code,
    featured: false,
  },
  {
    id: 3,
    title: "Web Development",
    description:
      "Full website builds, CMS integration, responsive design across all devices.",
    icon: Smartphone,
    featured: false,
  },
  {
    id: 4,
    title: "Low-Code / No-Code",
    description:
      "Rapid prototyping and internal tools using Webflow, Framer, and similar platforms.",
    icon: Wand2,
    featured: false,
  },
  {
    id: 5,
    title: "Graphic Design",
    description:
      "Branding, print materials, digital assets, and visual identity systems.",
    icon: Layers,
    featured: false,
  },
  {
    id: 6,
    title: "Video Editing",
    description: "Motion graphics, promotional content, and video production.",
    icon: Video,
    featured: false,
  },
];

export function Services() {
  const { theme } = useTheme();

  return (
    <section id="services" className="section relative">
      <div className="container">
        <SectionTitle>What I Do</SectionTitle>

        {/* Services Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;

            return (
              <motion.div
                key={service.id}
                // className={cn(
                //   "relative flex flex-col justify-between p-6 md:p-8 rounded-2xl transition-all duration-300",
                //   service.featured
                //     ? "md:col-span-2 lg:col-span-1 lg:row-span-2"
                //     : "",
                //   service.featured
                //     ? theme === "light"
                //       ? "bg-[#b8954f] text-[#faf8f5]"
                //       : "bg-[#c9a96e] text-[#0a1628]"
                //     : theme === "light"
                //     ? "bg-[#ffffff] border border-[#e5e0d8]"
                //     : "bg-[#111d2e] border border-[#1a2a3f]",
                //   "card-hover"
                // )}
                className={cn(
                  "relative flex flex-col justify-between p-6 md:p-8 rounded-2xl transition-all duration-300 card-hover",
                  service.featured
                    ? "md:col-span-2 lg:col-span-1 lg:row-span-2"
                    : "",
                  service.featured
                    ? "bg-accent text-text-primary"
                    : "bg-bg-secondary border border-bg-tertiary"
                )}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                style={{
                  boxShadow: service.featured
                    ? "0 10px 40px rgba(201, 169, 110, 0.3)"
                    : theme === "light"
                    ? "0 4px 24px rgba(0, 0, 0, 0.06)"
                    : "0 4px 24px rgba(0, 0, 0, 0.2)",
                }}
              >
                {/* Icon */}
                <div
                  className={cn(
                    "w-12 h-12 rounded-xl flex items-center justify-center mb-4",
                    service.featured
                      ? "bg-[#0a1628]/20"
                      : theme === "light"
                      ? "bg-[#b8954f]/10"
                      : "bg-[#c9a96e]/10"
                  )}
                >
                  <Icon
                    size={24}
                    className={
                      service.featured
                        ? "text-[#0a1628]"
                        : theme === "light"
                        ? "text-[#b8954f]"
                        : "text-[#c9a96e]"
                    }
                  />
                </div>
                <div>
                  <h3
                    className={cn(
                      "font-display text-lg md:text-xl mb-3",
                      service.featured
                        ? "text-[#0a1628]"
                        : theme === "light"
                        ? "text-[#0a1628]"
                        : "text-[#f5f0e8]"
                    )}
                  >
                    {service.title}
                  </h3>
                  {/* Description */}
                  <p
                    className={cn(
                      "text-sm md:text-base leading-relaxed",
                      service.featured
                        ? "text-[#0a1628]/80"
                        : theme === "light"
                        ? "text-[#4a5568]"
                        : "text-[#a8a39c]"
                    )}
                  >
                    {service.description}
                  </p>
                </div>
                {/* Featured badge */}
                {service.featured && (
                  <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-bg-primary/20 text-xs font-medium">
                    Primary
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
