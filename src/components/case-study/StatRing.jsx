import { motion } from "framer-motion";

const RADIUS = 70;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

function parseRingPercent(metric) {
  if (!metric) return 100;
  const ofMatch = metric.match(/(\d+(?:\.\d+)?)\s*(?:of|\/)\s*(\d+(?:\.\d+)?)/i);
  if (ofMatch) {
    return (parseFloat(ofMatch[1]) / parseFloat(ofMatch[2])) * 100;
  }
  const pctMatch = metric.match(/(\d+(?:\.\d+)?)\s*%/);
  if (pctMatch) return parseFloat(pctMatch[1]);
  return 100;
}

export function StatRing({ metric, label, delay = 0 }) {
  const percent = Math.max(0, Math.min(100, parseRingPercent(metric)));
  const offset = CIRCUMFERENCE - (percent / 100) * CIRCUMFERENCE;

  return (
    <motion.div
      className="flex flex-col items-center text-center w-44"
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay }}
    >
      <div className="relative w-40 h-40 md:w-44 md:h-44">
        <svg viewBox="0 0 160 160" className="w-full h-full -rotate-90">
          <circle
            cx="80"
            cy="80"
            r={RADIUS}
            strokeWidth="10"
            fill="none"
            className="stroke-bg-tertiary"
          />
          <circle
            cx="80"
            cy="80"
            r={RADIUS}
            strokeWidth="10"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={offset}
            className="stroke-accent"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center px-3">
          <span className="font-display text-xl md:text-2xl text-text-primary text-center leading-tight">
            {metric}
          </span>
        </div>
      </div>
      <p className="mt-4 text-sm text-text-secondary leading-relaxed">{label}</p>
    </motion.div>
  );
}
