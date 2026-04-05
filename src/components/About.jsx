import { motion } from "framer-motion";
import { MapPin, Briefcase, GraduationCap } from "lucide-react";
import { SectionTitle } from "./ui/SectionTitle";
import { useTheme } from "../context/ThemeContext";
import { cn } from "../utils/cn";

const timeline = [
  {
    period: "2025 – Present",
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
  const { theme } = useTheme();

  return (
    <section id="about" className="section relative">
      <div className="container">
        <SectionTitle>About Me</SectionTitle>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left column - Photo and quick facts */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {/* Photo placeholder with orbital ring */}
            <div className="relative max-w-md mx-auto lg:mx-0 mb-8">
              {/* Orbital ring */}
              <div
                className="absolute inset-[-20px] rounded-full opacity-20"
                style={{
                  border: `1px solid ${
                    theme === "light" ? "#b8954f" : "#c9a96e"
                  }`,
                }}
              />
              <div
                className="absolute inset-[-40px] rounded-full opacity-10"
                style={{
                  border: `1px solid ${
                    theme === "light" ? "#b8954f" : "#c9a96e"
                  }`,
                }}
              />

              {/* Photo container */}
              <div
                className={cn(
                  "aspect-square rounded-2xl overflow-hidden",
                  theme === "light" ? "bg-[#e5e0d8]" : "bg-[#1a2a3f]",
                )}
              >
                <div className="w-full h-full flex items-center justify-center">
                  <span
                    className={cn(
                      "font-display text-4xl",
                      theme === "light" ? "text-[#b8954f]" : "text-[#c9a96e]",
                    )}
                  >
                    QL
                  </span>
                </div>
              </div>
            </div>

            {/* Quick facts */}
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
              <div
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-full",
                  theme === "light" ? "bg-[#e5e0d8]" : "bg-[#1a2a3f]",
                )}
              >
                <MapPin
                  size={16}
                  className={
                    theme === "light" ? "text-[#b8954f]" : "text-[#c9a96e]"
                  }
                />
                <span
                  className={cn(
                    "text-sm",
                    theme === "light" ? "text-[#4a5568]" : "text-[#a8a39c]",
                  )}
                >
                  Zamboanga City, PH
                </span>
              </div>
              <div
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-full",
                  theme === "light" ? "bg-[#e5e0d8]" : "bg-[#1a2a3f]",
                )}
              >
                <span
                  className={cn(
                    "text-sm",
                    theme === "light" ? "text-[#4a5568]" : "text-[#a8a39c]",
                  )}
                >
                  Open to Remote Work
                </span>
              </div>
            </div>
          </motion.div>

          {/* Right column - Story and timeline */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {/* Story */}
            <div className="mb-10">
              <p
                className={cn(
                  "text-lg leading-relaxed mb-4",
                  theme === "light" ? "text-[#4a5568]" : "text-[#a8a39c]",
                )}
              >
                I'm a designer who codes and a developer who designs. My journey
                started with creating graphics in high school, evolved through
                an Information Technology degree, and now manifests in building
                systems that genuinely help people.
              </p>
              <p
                className={cn(
                  "text-lg leading-relaxed mb-4",
                  theme === "light" ? "text-[#4a5568]" : "text-[#a8a39c]",
                )}
              >
                Working in healthcare tech has taught me that good design isn't
                about aesthetics alone — it's about reducing friction,
                preventing errors, and respecting people's time. Every interface
                I create aims to make someone's workday a little better.
              </p>
              <p
                className={cn(
                  "text-lg leading-relaxed",
                  theme === "light" ? "text-[#4a5568]" : "text-[#a8a39c]",
                )}
              >
                When I'm not designing or coding, you might find me teaching the
                next generation of developers, exploring motion graphics, or
                occasionally hitting the dance floor.
              </p>
            </div>

            {/* Timeline */}
            <div className="space-y-4">
              <h4
                className={cn(
                  "font-display text-sm uppercase tracking-wider mb-4",
                  theme === "light" ? "text-[#718096]" : "text-[#6b7280]",
                )}
              >
                Experience
              </h4>

              {timeline.map((item, index) => (
                <motion.div
                  key={index}
                  className={cn(
                    "flex gap-4 p-4 rounded-xl",
                    theme === "light" ? "bg-[#f0ece4]" : "bg-[#111d2e]",
                  )}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <div
                    className={cn(
                      "w-10 h-10 rounded-lg flex items-center justify-center shrink-0",
                      theme === "light" ? "bg-[#b8954f]/10" : "bg-[#c9a96e]/10",
                    )}
                  >
                    {item.type === "education" ? (
                      <GraduationCap
                        size={18}
                        className={
                          theme === "light"
                            ? "text-[#b8954f]"
                            : "text-[#c9a96e]"
                        }
                      />
                    ) : (
                      <Briefcase
                        size={18}
                        className={
                          theme === "light"
                            ? "text-[#b8954f]"
                            : "text-[#c9a96e]"
                        }
                      />
                    )}
                  </div>
                  <div>
                    <p
                      className={cn(
                        "text-xs mb-1",
                        theme === "light" ? "text-[#718096]" : "text-[#6b7280]",
                      )}
                    >
                      {item.period}
                    </p>
                    <p
                      className={cn(
                        "font-medium",
                        theme === "light" ? "text-[#0a1628]" : "text-[#f5f0e8]",
                      )}
                    >
                      {item.role}
                    </p>
                    <p
                      className={cn(
                        "text-sm",
                        theme === "light" ? "text-[#4a5568]" : "text-[#a8a39c]",
                      )}
                    >
                      {item.company}
                      {item.extra && (
                        <span
                          className={
                            theme === "light"
                              ? "text-[#b8954f]"
                              : "text-[#c9a96e]"
                          }
                        >
                          {" "}
                          · {item.extra}
                        </span>
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
