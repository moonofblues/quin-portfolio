import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
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
  // Lights down: a page that shows work in true colour (a photo set or a film)
  // asks for it with useNight(), and the whole layout dims to blue-black. The
  // index, About, Contact and graphic design pages stay on paper. The layout
  // stays mounted between pages, so the colour change fades (see .v-root in
  // visual.css) instead of cutting.
  const [dark, setDark] = useState(false);

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
    <NightContext.Provider value={setDark}>
    <div className={dark ? "v-root v-dark" : "v-root"}>
      <header className="v-bar">
        <Link className="v-brand" to="/visual" aria-label="Quin Ledesma, visual work">
          ql / visual
        </Link>
        <nav aria-label="Primary">
          <Link to="/visual#work">work</Link>
          <Link to="/visual#about">about</Link>
          <Link to="/visual#contact">contact</Link>
          <Link className="v-xlink" to="/">
            design &amp; dev ↗
          </Link>
        </nav>
      </header>
      <main>{children}</main>
    </div>
    </NightContext.Provider>
  );
}
