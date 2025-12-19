import { motion } from "framer-motion";
import { cn } from "../../utils/cn";
import { Star } from "../decorative/Stars";

export function SectionTitle({ children, className, showStar = true }) {
  return (
    <motion.div
      className={cn("flex items-center gap-3 mb-12", className)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      {showStar && <Star size={28} />}
      <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-text-primary">
        {children}
      </h2>
    </motion.div>
  );
}
