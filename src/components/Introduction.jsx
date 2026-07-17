import { motion } from "framer-motion";

export function Introduction() {
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
            I began with visuals, but I stayed for the systems behind them. Now
            I{" "}
            <span className="text-accent">
              {" "}
              design with structure, build with intention, and test with a
              critical eye
            </span>{" "}
            —bridging UI/UX, development, and QA to create products that hold up
            beyond the mockups.
          </motion.p>

          <motion.div
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
