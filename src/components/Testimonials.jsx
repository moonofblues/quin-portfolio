import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { SectionTitle } from "./ui/SectionTitle";
import { useTheme } from "../context/ThemeContext";
import { cn } from "../utils/cn";

const testimonials = [
  {
    id: 1,
    quote:
      "Quin's ability to bridge design and development is remarkable. The UI library she created has significantly improved our team's workflow and consistency across projects.",
    name: "Professional Colleague",
    role: "ZCMC Information Systems",
  },
  {
    id: 2,
    quote:
      "Working with Quin was a seamless experience. She understood our vision immediately and delivered a design that exceeded our expectations.",
    name: "Client",
    role: "Project Collaboration",
  },
  {
    id: 3,
    quote:
      "As a mentor and instructor, Quin has a unique gift for making complex technical concepts accessible. Her students consistently produce outstanding work.",
    name: "Faculty Colleague",
    role: "Ateneo de Zamboanga University",
  },
];

export function Testimonials() {
  const { theme } = useTheme();

  return (
    <section className="section relative overflow-hidden">
      <div className="container">
        <SectionTitle>What People Say</SectionTitle>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              className={cn(
                "relative p-6 md:p-8 rounded-2xl",
                theme === "light"
                  ? "bg-[#ffffff] border border-[#e5e0d8]"
                  : "bg-[#111d2e] border border-[#1a2a3f]"
              )}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              style={{
                borderLeft: `4px solid ${
                  theme === "light" ? "#b8954f" : "#c9a96e"
                }`,
                boxShadow:
                  theme === "light"
                    ? "0 4px 24px rgba(0, 0, 0, 0.06)"
                    : "0 4px 24px rgba(0, 0, 0, 0.2)",
              }}
            >
              {/* Quote icon */}
              <Quote
                size={32}
                className={cn(
                  "mb-4 opacity-20",
                  theme === "light" ? "text-[#b8954f]" : "text-[#c9a96e]"
                )}
              />

              {/* Quote text */}
              <p
                className={cn(
                  "text-base leading-relaxed mb-6",
                  theme === "light" ? "text-[#4a5568]" : "text-[#a8a39c]"
                )}
              >
                "{testimonial.quote}"
              </p>

              {/* Attribution */}
              <div>
                <p
                  className={cn(
                    "font-medium",
                    theme === "light" ? "text-[#0a1628]" : "text-[#f5f0e8]"
                  )}
                >
                  {testimonial.name}
                </p>
                <p
                  className={cn(
                    "text-sm",
                    theme === "light" ? "text-[#718096]" : "text-[#6b7280]"
                  )}
                >
                  {testimonial.role}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
