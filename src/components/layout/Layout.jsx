import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Navigation } from "./Navigation";
import { Footer } from "./Footer";

export function Layout({ children }) {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // Scroll to top on route change, unless there's a hash
    if (!hash) {
      window.scrollTo(0, 0);
    } else {
      // Scroll to hash element
      setTimeout(() => {
        const element = document.querySelector(hash);
        element?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  }, [pathname, hash]);

  return (
    <div className="relative min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
