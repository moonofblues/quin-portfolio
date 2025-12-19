import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Moon, Sun, Menu, X } from "lucide-react";
import { cn } from "../utils/cn";
import { useTheme } from "../context/ThemeContext";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Work", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export function Navigation() {
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled ? "glass py-4" : "py-6",
          theme === "light" && scrolled && "bg-white/80"
        )}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container flex items-center justify-between">
          {/* Temporary Logo */}
          <a href="#home" className="font-display text-xl">
            {/* <span className="text-[#0a1628] dark:text-[#f5f0e8]">Q</span> */}
            <span className="text-text-primary ">Q</span>
            <span className="text-accent">L</span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                // className={cn(
                //   "text-sm font-medium transition-colors duration-200",
                //   theme === "light"
                //     ? "text-[#4a5568] hover:text-[#b8954f]"
                //     : "text-[#a8a39c] hover:text-[#c9a96e]"
                // )}
                className="text-sm font-medium transition-colors duration-200 text-text-secondary hover:text-accent-hover "
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4">
            {/* Day/Night Theme Toggle */}
            <motion.button
              onClick={toggleTheme}
              className={cn(
                "p-2 rounded-full transition-colors duration-200 hover:bg-[#e5e0d8] text-[#4a5568] dark:hover:bg-[#1a2a3f] text-[#a8a39c]"
              )}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Toggle theme"
            >
              {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
            </motion.button>

            {/* Mobile Menu Button */}
            <motion.button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={cn(
                "md:hidden p-2 rounded-full transition-colors duration-200",
                theme === "light"
                  ? "hover:bg-[#e5e0d8] text-[#4a5568]"
                  : "hover:bg-[#1a2a3f] text-[#a8a39c]"
              )}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className={cn(
              "fixed inset-0 z-40 pt-20 md:hidden",
              theme === "light" ? "bg-[#faf8f5]" : "bg-[#0a1628]"
            )}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            <div className="container flex flex-col gap-6 py-8">
              {navLinks.map((link, index) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "text-2xl font-display",
                    theme === "light"
                      ? "text-[#0a1628] hover:text-[#b8954f]"
                      : "text-[#f5f0e8] hover:text-[#c9a96e]"
                  )}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {link.label}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
