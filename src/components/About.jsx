import { motion } from "framer-motion";
import { MapPin, Briefcase, GraduationCap } from "lucide-react";
import { SectionTitle } from "./ui/SectionTitle";
import { cn } from "../utils/cn";

const timeline = [
  {
    period: "Dec 2025 – Present",
    role: "Information Systems Analyst II",
    company: "Zamboanga City Medical Center",
    type: "work",
  },
  {
    period: "Aug 2025 – Nov 2025",
    role: "Computer Programmer II",
    company: "Zamboanga City Medical Center",
    type: "work",
  },
  {
    period: "2023 – Present",
    role: "College Instructor",
    company: "Ateneo de Zamboanga University",
    type: "work",
  },
  {
    period: "2023 – 2025",
    role: "System Developer",
    company: "AdZU Center for IT Services",
    type: "work",
  },
  {
    period: "2019 – 2023",
    role: "BS Information Technology",
    company: "Ateneo de Zamboanga University",
    extra: "Cum Laude",
    type: "education",
  },
];

export function About() {
  return (
    <section id="about" className="section relative">
      <div className="container">
        <SectionTitle>About Me</SectionTitle>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative max-w-md mx-auto lg:mx-0 mb-8">
              <div className="absolute inset-[-20px] rounded-full opacity-20 border border-accent" />
              <div className="absolute inset-[-40px] rounded-full opacity-10 border border-accent" />

              <div className="aspect-square rounded-2xl overflow-hidden bg-bg-tertiary">
                <div className="w-full h-full flex items-center justify-center">
                  <span className="font-display text-4xl text-accent">QL</span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-bg-tertiary">
                <MapPin size={16} className="text-accent" />
                <span className="text-sm text-text-secondary">Zamboanga City, PH</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-bg-tertiary">
                <span className="text-sm text-text-secondary">Open to Remote Work</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="mb-10">
              <p className="text-lg leading-relaxed mb-4 text-text-secondary">
                I'm a designer who codes and a developer who designs. My journey
                started with creating graphics in high school, evolved through
                an Information Technology degree, and now manifests in building
                systems that genuinely help people.
              </p>
              <p className="text-lg leading-relaxed mb-4 text-text-secondary">
                Working in healthcare tech has taught me that good design isn't
                about aesthetics alone — it's about reducing friction,
                preventing errors, and respecting people's time. Every interface
                I create aims to make someone's workday a little better.
              </p>
              <p className="text-lg leading-relaxed text-text-secondary">
                When I'm not designing or coding, you might find me teaching the
                next generation of developers, exploring motion graphics, or
                occasionally hitting the dance floor.
              </p>
            </div>

            <div className="space-y-4">
              <h4 className="font-display text-sm uppercase tracking-wider mb-4 text-text-muted">
                Experience
              </h4>

              {timeline.map((item, index) => (
                <motion.div
                  key={index}
                  className="flex gap-4 p-4 rounded-xl bg-bg-secondary"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 bg-accent/10">
                    {item.type === "education" ? (
                      <GraduationCap size={18} className="text-accent" />
                    ) : (
                      <Briefcase size={18} className="text-accent" />
                    )}
                  </div>
                  <div>
                    <p className="text-xs mb-1 text-text-muted">{item.period}</p>
                    <p className="font-medium text-text-primary">{item.role}</p>
                    <p className="text-sm text-text-secondary">
                      {item.company}
                      {item.extra && (
                        <span className="text-accent"> · {item.extra}</span>
                      )}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
