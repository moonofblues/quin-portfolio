import { motion } from "framer-motion";
import { Palette, Code, Smartphone, Layers, Video, Wand2 } from "lucide-react";
import { SectionTitle } from "./ui/SectionTitle";
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
  return (
    <section id="services" className="section relative">
      <div className="container">
        <SectionTitle>What I Do</SectionTitle>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;

            return (
              <motion.div
                key={service.id}
                className={cn(
                  "relative flex flex-col justify-between p-6 md:p-8 rounded-2xl transition-all duration-300 card-hover shadow-card",
                  service.featured
                    ? "md:col-span-2 lg:col-span-1 lg:row-span-2 bg-accent"
                    : "bg-bg-secondary border border-bg-tertiary",
                )}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                style={service.featured ? { boxShadow: "0 10px 40px rgba(201, 169, 110, 0.3)" } : undefined}
              >
                <div
                  className={cn(
                    "w-12 h-12 rounded-xl flex items-center justify-center mb-4",
                    service.featured ? "bg-on-accent/20" : "bg-accent/10",
                  )}
                >
                  <Icon
                    size={24}
                    className={service.featured ? "text-on-accent" : "text-accent"}
                  />
                </div>
                <div>
                  <h3
                    className={cn(
                      "font-display text-lg md:text-xl mb-3",
                      service.featured ? "text-on-accent" : "text-text-primary",
                    )}
                  >
                    {service.title}
                  </h3>
                  <p
                    className={cn(
                      "text-sm md:text-base leading-relaxed",
                      service.featured ? "text-on-accent/80" : "text-text-secondary",
                    )}
                  >
                    {service.description}
                  </p>
                </div>
                {service.featured && (
                  <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-on-accent/20 text-on-accent text-xs font-medium">
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
