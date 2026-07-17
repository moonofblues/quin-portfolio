import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { SectionTitle } from "./ui/SectionTitle";

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
  return (
    <section className="section relative overflow-hidden">
      <div className="container">
        <SectionTitle>What People Say</SectionTitle>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              className="relative p-6 md:p-8 rounded-2xl bg-bg-card border border-bg-tertiary border-l-4 border-l-accent shadow-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <Quote size={32} className="mb-4 opacity-20 text-accent" />

              <p className="text-base leading-relaxed mb-6 text-text-secondary">
                "{testimonial.quote}"
              </p>

              <div>
                <p className="font-medium text-text-primary">{testimonial.name}</p>
                <p className="text-sm text-text-muted">{testimonial.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
