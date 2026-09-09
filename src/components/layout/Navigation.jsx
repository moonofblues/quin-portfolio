import { useState, useEffect } from "react";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "../../utils/cn";
import { SERVICE_BY_ID } from "../../data/services";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Work", href: "/work" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/#contact" },
];

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const focusId = searchParams.get("focus");
  const activeService = focusId ? SERVICE_BY_ID[focusId] : null;

  useEffect(() => {
    // Scroll fires far more often than once per frame. Coalescing into a
    // single rAF keeps the handler off the scrolling thread's critical path,
    // and `passive` tells the browser up front that we never preventDefault —
    // without it, Chrome must wait for this listener before compositing the
    // scroll, which is felt directly as sticky scrolling.
    let frame = 0;
    const read = () => {
      frame = 0;
      setScrolled(window.scrollY > 50);
    };
    const handleScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(read);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  const handleNavClick = (href) => {
    if (href.startsWith("/#") && location.pathname === "/") {
      const element = document.querySelector(href.replace("/", ""));
      element?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <motion.nav
        className={cn(
          // Transition only what actually changes. `transition-all` on a fixed
          // header also animates backdrop-filter and background, forcing the
          // blur to be re-evaluated on every frame of the 300ms cross-fade.
          "fixed top-0 left-0 right-0 z-50 transition-[padding] duration-300",
          scrolled ? "glass py-4" : "py-6",
        )}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="w-full max-w-7xl mx-auto px-6 flex items-center justify-between">
          <Link to="/" className="font-display text-xl">
            <span className="text-text-primary">Q</span>
            <span className="text-accent">L</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                onClick={() => handleNavClick(link.href)}
                className={cn(
                  "text-sm font-medium transition-colors duration-200 text-text-secondary hover:text-accent",
                  (location.pathname === link.href ||
                    (link.href === "/work" &&
                      location.pathname.startsWith("/work"))) &&
                    "text-accent",
                )}
              >
                {link.label}
              </Link>
            ))}
            {activeService && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-accent/10 border border-accent/20 text-accent">
                Viewing: {activeService.label}
                <button
                  type="button"
                  onClick={() => setSearchParams({})}
                  aria-label="Clear focus filter"
                  className="hover:text-text-primary transition-colors duration-200 leading-none"
                >
                  <X size={11} />
                </button>
              </span>
            )}
          </div>

          <div className="flex items-center gap-4">
            {/* Hover/press feedback is CSS, not framer-motion. whileHover
                routes every pointerenter through React state and a JS
                animation loop; hover:/active: variants are handled entirely by
                the compositor and cost nothing on the main thread. */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-full text-text-secondary hover:bg-bg-tertiary transition duration-200 hover:scale-110 active:scale-90 motion-reduce:transform-none"
              aria-label="Toggle menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 pt-20 md:hidden bg-bg-primary"
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
                    className="text-2xl font-display text-text-primary hover:text-accent transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              {activeService && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: navLinks.length * 0.1 }}
                >
                  <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium bg-accent/10 border border-accent/20 text-accent">
                    Viewing: {activeService.label}
                    <button
                      type="button"
                      onClick={() => setSearchParams({})}
                      aria-label="Clear focus filter"
                      className="hover:text-text-primary transition-colors duration-200 leading-none"
                    >
                      <X size={13} />
                    </button>
                  </span>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
