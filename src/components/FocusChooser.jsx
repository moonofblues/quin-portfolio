import { useState, useEffect, useRef, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { SERVICES } from "../data/services";

// Module-level flag: resets on every page load/refresh (the JS module
// re-executes on each fresh navigation). This means the chooser appears
// each time a visitor lands on the site without a ?focus= param, which
// is the right behaviour for a portfolio — each hiring manager gets it,
// and Quin can test it by refreshing. localStorage would have hidden it
// forever after the first dismissal.
let _seen = false;

export function FocusChooser() {
  const [, setSearchParams] = useSearchParams();
  const reduceMotion = useReducedMotion();
  const dialogRef = useRef(null);

  // Don't show when the URL already carries a focus param — the visitor
  // arrived from a shared or bookmarked focus link and already has a view.
  const [open, setOpen] = useState(() => {
    if (typeof window === "undefined") return false;
    const params = new URLSearchParams(window.location.search);
    return !params.get("focus") && !_seen;
  });

  const close = useCallback(
    (focusId) => {
      _seen = true;
      if (focusId) setSearchParams({ focus: focusId });
      setOpen(false);
    },
    [setSearchParams]
  );

  // Lock body scroll while open so the background page doesn't scroll behind
  // the overlay.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  // Focus trap: keep keyboard focus inside the dialog. Esc = Skip.
  useEffect(() => {
    if (!open) return;
    const el = dialogRef.current;
    if (!el) return;

    const focusable = Array.from(el.querySelectorAll("button"));
    focusable[0]?.focus();

    const trap = (e) => {
      if (e.key === "Escape") {
        close();
        return;
      }
      if (e.key !== "Tab") return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    };

    document.addEventListener("keydown", trap);
    return () => document.removeEventListener("keydown", trap);
  }, [open, close]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/75"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.15 }}
        >
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="focus-chooser-title"
            className="relative w-full max-w-lg bg-bg-secondary border border-bg-tertiary rounded-2xl p-8 shadow-2xl"
            initial={{ opacity: 0, scale: reduceMotion ? 1 : 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: reduceMotion ? 1 : 0.97 }}
            transition={{ duration: reduceMotion ? 0 : 0.2 }}
          >
            <div className="mb-8 text-center">
              <h2
                id="focus-chooser-title"
                className="font-display text-2xl text-text-primary mb-2"
              >
                What are you looking for?
              </h2>
              <p className="text-text-secondary text-sm">
                Pick a discipline to see the most relevant work — or skip to
                browse everything.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
              {SERVICES.map((service) => {
                const Icon = service.icon;
                return (
                  <button
                    key={service.id}
                    type="button"
                    onClick={() => close(service.id)}
                    className="flex flex-col items-center gap-2 p-4 rounded-xl bg-bg-primary border border-bg-tertiary hover:border-accent/40 hover:bg-bg-hover transition-[background-color,border-color] text-center"
                  >
                    <Icon size={24} className="text-accent-secondary" />
                    <span className="text-sm font-medium text-text-primary leading-tight">
                      {service.label}
                    </span>
                  </button>
                );
              })}
            </div>

            <button
              type="button"
              onClick={() => close()}
              className="w-full py-2.5 rounded-xl text-sm text-text-secondary hover:text-text-primary border border-bg-tertiary hover:border-accent/30 transition-[color,border-color]"
            >
              Skip — show everything
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
