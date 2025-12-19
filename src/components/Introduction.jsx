import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import { cn } from "../utils/cn";

export function Introduction() {
  const { theme } = useTheme();

  return (
    <section className="section relative">
      <div className="container">
        <motion.div
          className="max-w-3xl mx-auto text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.p className="text-xl md:text-2xl lg:text-3xl leading-relaxed text-text-secondary">
            I started designing vectors in high school, then discovered I could{" "}
            <span className="text-accent">build what I designed</span> when I
            pursued Information Technology. Now I bridge both worlds — creating
            interfaces that are as functional as they are intentional.
          </motion.p>

          <motion.div
            // className={cn(
            //   "mt-8 pt-8 border-t",
            //   theme === "light" ? "border-[#e5e0d8]" : "border-[#1a2a3f]"
            // )}
            className="mt-8 pt-8 border-t border-bg-tertiary"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <p className="text-base text-text-muted">
              Currently shaping hospital information systems at{" "}
              <span className="text-text-primary">
                Zamboanga City Medical Center
              </span>{" "}
              while teaching the next generation of developers at{" "}
              <span className="text-text-primary">
                Ateneo de Zamboanga University
              </span>
              .
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
