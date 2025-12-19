import { motion } from "framer-motion";
import { cn } from "../../utils/cn";

export function Moon({ className, size = 120 }) {
  return (
    <motion.div
      className={cn(
        "relative",
        "sm:[--moon-size:var(--moon-base-size)] [--moon-size:100px] ",
        className
      )}
      style={{
        "--moon-base-size": `${size}px`,
        width: "var(--moon-size)",
        height: "var(--moon-size)",
      }}
      animate={{ y: [0, -24, 0] }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
    >
      {/* Moon body */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background:
            "linear-gradient(135deg, #d4c4a8 0%, #c4b498 50%, #a89878 100%)",
          boxShadow:
            "0 0 60px rgba(212, 196, 168, 0.4), inset -10px -10px 30px rgba(0, 0, 0, 0.15)",
        }}
      />
      {/* Moon glow */}
      <div
        className="absolute inset-0 rounded-full opacity-50"
        style={{
          background:
            "radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.3) 0%, transparent 60%)",
        }}
      />
    </motion.div>
  );
}
