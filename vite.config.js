import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// Rollup ids use the host separator, so normalize before matching.
const NM = "node_modules";

/** Package name a module id belongs to, or null if it isn't a dependency. */
function packageOf(id) {
  const i = id.lastIndexOf(NM);
  if (i === -1) return null;
  const rest = id.slice(i + NM.length + 1).replace(/\\/g, "/");
  const [first, second] = rest.split("/");
  return first?.startsWith("@") ? `${first}/${second}` : first;
}

const REACT_CORE = new Set(["react", "react-dom", "scheduler"]);
const MOTION = new Set(["framer-motion", "motion-dom", "motion-utils"]);

export default defineConfig({
  plugins: [react(), tailwindcss()],
  define: {
    // Required for Sanity Studio embedded in Vite
    "process.env": {},
  },
  build: {
    // The Sanity Studio chunk is legitimately large; it is lazy-loaded and
    // never touches a portfolio page, so the default 500 kB warning is noise.
    chunkSizeWarningLimit: 1500,
    rollupOptions: {
      output: {
        // Split long-lived vendor code out of the app chunk so a content edit
        // doesn't invalidate React/router/motion in a returning visitor's
        // cache. Sanity is deliberately absent: it must stay inside the lazy
        // /studio chunk Rollup derives from App.jsx and never be hoisted into
        // a chunk a portfolio page would download.
        manualChunks(id) {
          const pkg = packageOf(id);
          if (!pkg) return;
          if (REACT_CORE.has(pkg)) return "vendor-react";
          if (pkg.startsWith("react-router")) return "vendor-router";
          if (MOTION.has(pkg)) return "vendor-motion";
        },
      },
    },
  },
});
