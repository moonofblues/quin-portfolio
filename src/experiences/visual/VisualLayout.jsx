import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Moon, Sun } from "lucide-react";
import { toggleSiteTheme, useSiteTheme } from "../../shared/siteTheme";
import { NightContext } from "./theme";
import "./visual.css";

// Visual's own typefaces. They are added here, when a Visual page opens, and
// not in index.html, so a Product visitor never downloads them (ADR 0014).
// index.html already preconnects to both Google hosts.
const FONTS_ID = "visual-fonts";
const FONTS_HREF =
  "https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wdth,wght@12..96,75..100,200..800&family=DM+Mono:wght@400;500&family=Instrument+Serif:ital@0;1&display=swap";

const PAPER = "#eee8d6";
const NIGHT = "#050818";

export function VisualLayout({ children }) {
  const { pathname, hash } = useLocation();
  // Light or dark follows the one site-wide choice (ADR 0021). A film page
  // ignores it: it asks for lights down with useNight() and the layout goes
  // blue-black whatever the choice. The layout stays mounted between pages, so
  // the colour change fades (see .v-root in visual.css) instead of cutting.
  const theme = useSiteTheme();
  const [lightsDown, setLightsDown] = useState(false);
  const dark = lightsDown || theme === "night";

  useEffect(() => {
    if (document.getElementById(FONTS_ID)) return;
    const link = document.createElement("link");
    link.id = FONTS_ID;
    link.rel = "stylesheet";
    link.href = FONTS_HREF;
    document.head.appendChild(link);
  }, []);

  // The Product site paints the page background near-black. Overscroll and the
  // gap behind short pages would show it, so paint it paper (or night, on a
  // work page) while Visual is open and hand it back on the way out.
  useEffect(() => {
    const html = document.documentElement;
    const prev = [html.style.backgroundColor, document.body.style.backgroundColor];
    return () => {
      html.style.backgroundColor = prev[0];
      document.body.style.backgroundColor = prev[1];
    };
  }, []);

  useEffect(() => {
    const colour = dark ? NIGHT : PAPER;
    document.documentElement.style.backgroundColor = colour;
    document.body.style.backgroundColor = colour;
  }, [dark]);

  // Same job Layout.jsx does for Product: top of page on a new route, or the
  // element named by the #hash.
  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, left: 0 });
      return;
    }
    const frame = requestAnimationFrame(() => {
      document.querySelector(hash)?.scrollIntoView({ behavior: "smooth" });
    });
    return () => cancelAnimationFrame(frame);
  }, [pathname, hash]);

  return (
    <NightContext.Provider value={setLightsDown}>
    <div className={dark ? "v-root v-dark" : "v-root"}>
      <header className="v-bar">
        {/* "ql" returns to the portfolio hub (ADR 0016); "visual" stays here. */}
        <span className="v-brand">
          <Link to="/" aria-label="Quin Ledesma, back to the main site">
            ql
          </Link>
          {" / "}
          <Link to="/visual" aria-label="Visual work">
            visual
          </Link>
        </span>
        <nav aria-label="Primary">
          <Link to="/visual#work">work</Link>
          <Link to="/visual#about">about</Link>
          <Link to="/visual#contact">contact</Link>
          <Link className="v-xlink" to="/dev">
            design &amp; dev ↗
          </Link>
          {/* A film page is always dark, so the switch would do nothing there. */}
          {!lightsDown && (
            <button
              type="button"
              className="v-theme"
              onClick={toggleSiteTheme}
              aria-label={
                theme === "light" ? "Switch to night mode" : "Switch to light mode"
              }
            >
              {theme === "light" ? (
                <Moon size={18} aria-hidden="true" />
              ) : (
                <Sun size={18} aria-hidden="true" />
              )}
            </button>
          )}
        </nav>
      </header>
      <main>{children}</main>
    </div>
    </NightContext.Provider>
  );
}
