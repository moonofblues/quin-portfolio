import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { Button } from "./ui/Button";
import { Tag } from "./ui/Tag";
import { Moon } from "./decorative/Moon";
import { Star } from "./decorative/Stars";
import { useTheme } from "../context/ThemeContext";
// import { cn } from "../utils/cn";
import zcmcWebsiteLight from "../assets/zcmc-website-hero-light.png";
import zcmcWebsiteDark from "../assets/zcmc-website-hero-dark.png";
import duscWebsite from "../assets/dusc-website.png";
import adzuPortal from "../assets/adzu-portal-home.png";
import erpDashboard from "../assets/erp-dashboard.png";

const skills = [
  "UI/UX Design",
  "Front-End Dev",
  "Web Development",
  "Low-Code/No-Code Dev",
  "Video Editing",
  "Graphic Designing",
];

export function Hero() {
  const { theme } = useTheme();

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-radial" />

      {/* Decorative elements */}
      <Moon
        className="absolute top-22 sm:top-48 left-8 md:left-16 lg:left-24 z-0"
        size={250}
      />
      <Star
        className="absolute top-32 right-12 md:right-24"
        size={28}
        delay={0}
      />
      <Star
        className="absolute top-48 right-8 md:right-16"
        size={16}
        delay={0.5}
      />
      <Star
        className="absolute bottom-32 left-16 md:left-32"
        size={20}
        delay={1}
      />

      {/* Content */}
      <div className="container relative z-10 text-center flex flex-col items-center pt-24 ">
        {/* Skills tags */}
        <motion.div
          className="flex flex-wrap justify-center max-w-2xl gap-2 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {skills.map((skill, index) => (
            <motion.div
              key={skill}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
            >
              <Tag>{skill}</Tag>
            </motion.div>
          ))}
        </motion.div>

        {/* Headline */}
        <motion.h1
          className="font-display text-4xl md:text-5xl lg:text-6xl xl:text-6xl leading-tight mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {/*   */}
        </motion.h1>

        {/* Tagline */}
        <motion.p
          className="text-lg md:text-xl max-w-2xl mx-auto mb-10 text-text-secondary"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          From pixel to production — I bridge design and development to create
          interfaces that are as functional as they are beautiful.
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <Button href="#work" variant="primary" size="large">
            View My Work
          </Button>
          <Button href="#contact" variant="secondary" size="large">
            Get in Touch
          </Button>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute top-105 lg:top-120 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.2 }}
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <ArrowDown size={24} className="text-text-secondary" />
          </motion.div>
        </motion.div>
      </div>

      {/* Project previews floating at bottom */}
      <div className="absolute -bottom-10 left-0 right-0 h-64 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute bottom-[-20%] left-[5%] w-[280px] md:w-[500px] rounded-xl overflow-hidden shadow-2xl"
          initial={{ opacity: 0, y: 100, rotate: -6 }}
          animate={{ opacity: 0.9, y: 0, rotate: -6 }}
          transition={{ duration: 0.8, delay: 1 }}
          style={{
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.4)",
          }}
        >
          <div className="aspect-video">
            <img src={adzuPortal} alt="ZCMC Website Landing Page Screenshot" />
            {/* <div className="w-full h-full flex items-center justify-center">
              <span
                className={cn(
                  "font-display text-sm",
                  theme === "light" ? "text-[#4a5568]" : "text-[#a8a39c]"
                )}
              >
                ZCMC ERP
              </span>
            </div> */}
          </div>
        </motion.div>

        <motion.div
          className="absolute bottom-[-15%] left-1/2 -translate-x-1/2 w-[300px] md:w-[520px] rounded-xl overflow-hidden shadow-2xl z-10"
          initial={{ opacity: 0, y: 100, rotate: 0 }}
          animate={{ opacity: 1, y: 0, rotate: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          style={{
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
          }}
        >
          <div className="aspect-video">
            <img
              src={zcmcWebsiteDark}
              alt="ZCMC Website Landing Page Screenshot"
            />
          </div>
        </motion.div>

        <motion.div
          className="absolute bottom-[-20%] right-[5%] w-[280px] md:w-[500px] rounded-xl overflow-hidden shadow-2xl"
          initial={{ opacity: 0, y: 100, rotate: 6 }}
          animate={{ opacity: 0.9, y: 0, rotate: 6 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          style={{
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.4)",
          }}
        >
          <div className="aspect-video">
            <img
              src={erpDashboard}
              alt="ZCMC Website Landing Page Screenshot"
            />
            {/* <div className="w-full h-full flex items-center justify-center">
              <span
                className={cn(
                  "font-display text-sm",
                  theme === "light" ? "text-[#4a5568]" : "text-[#a8a39c]"
                )}
              >
                AdZU Portal
              </span>
            </div> */}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
