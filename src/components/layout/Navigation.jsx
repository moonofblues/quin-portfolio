import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Moon, Sun, Menu, X } from "lucide-react";
import { cn } from "../../utils/cn";
import { useTheme } from "../../context/ThemeContext";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Work", href: "/work" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/#contact" },
];

export function Navigation() {
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  const handleNavClick = (href) => {
    if (href.startsWith("/#")) {
      // If we're not on home page, navigate there first
      if (location.pathname !== "/") {
        return; // Link component will handle navigation
      }
      // Scroll to section
      const element = document.querySelector(href.replace("/", ""));
      element?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <motion.nav
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled ? "glass py-4" : "py-6",
          theme === "light" && scrolled && "bg-white/80",
        )}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="w-full max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="font-display text-xl">
            <span
              className={
                theme === "light" ? "text-[#0a1628]" : "text-[#f5f0e8]"
              }
            >
              Q
            </span>
            <span
              className={
                theme === "light" ? "text-[#b8954f]" : "text-[#c9a96e]"
              }
            >
              L
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                onClick={() => handleNavClick(link.href)}
                className={cn(
                  "text-sm font-medium transition-colors duration-200",
                  theme === "light"
                    ? "text-[#4a5568] hover:text-[#b8954f]"
                    : "text-[#a8a39c] hover:text-[#c9a96e]",
                  (location.pathname === link.href ||
                    (link.href === "/work" &&
                      location.pathname.startsWith("/work"))) &&
                    (theme === "light" ? "text-[#b8954f]" : "text-[#c9a96e]"),
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <motion.button
              onClick={toggleTheme}
              className={cn(
                "p-2 rounded-full transition-colors duration-200",
                theme === "light"
                  ? "hover:bg-[#e5e0d8] text-[#4a5568]"
                  : "hover:bg-[#1a2a3f] text-[#a8a39c]",
              )}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Toggle theme"
            >
              {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
            </motion.button>

            <motion.button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={cn(
                "md:hidden p-2 rounded-full transition-colors duration-200",
                theme === "light"
                  ? "hover:bg-[#e5e0d8] text-[#4a5568]"
                  : "hover:bg-[#1a2a3f] text-[#a8a39c]",
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
              theme === "light" ? "bg-[#faf8f5]" : "bg-[#0a1628]",
            )}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            <div className="px-6 flex flex-col gap-6 py-8">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    to={link.href}
                    className={cn(
                      "text-2xl font-display",
                      theme === "light"
                        ? "text-[#0a1628] hover:text-[#b8954f]"
                        : "text-[#f5f0e8] hover:text-[#c9a96e]",
                    )}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
