import { useCallback, useEffect, useRef, useState } from "react";
import { Link, Navigate, useLocation } from "react-router-dom";
import { ArrowUpRight, Moon, Sun } from "lucide-react";
import { useProjects } from "../shared/context/ProjectsContext";
import { mainExperienceOf, PRODUCT, VISUAL } from "../shared/experiences";
import { TIMELINE } from "../shared/timeline";
import { EMAIL, LOCATION_LINE, SOCIAL_LINKS } from "../shared/contact";
import { Colophon } from "../shared/Colophon";
import { DeskPhoto } from "./DeskPhoto";
import { SheetHero } from "./SheetHero";
import { DarkroomLoader } from "./DarkroomLoader";
import { shouldScan } from "./darkroom";
import { frameNumbers } from "./frames";
import quinPortrait from "../assets/quin-portrait.webp";
import "./hub.css";

// The portfolio hub at / (ADR 0016): Quin's own website, with its own About,
// Work and Contact. It sits outside the Product and Visual layouts and imports
// only from src/shared/ and src/assets/, so neither portfolio depends on it.

const TITLE =
  "Quin Ledesma | Designer, developer, and the person behind the camera";
const THEME_KEY = "hub-theme";

// Visual's display and serif faces. Product's Krona One and Instrument Sans are
// already loaded by index.html; these two load only when the hub (or Visual)
// opens, so Product-only visitors never download them (ADR 0014).
const FONTS_ID = "hub-fonts";
const FONTS_HREF =
  "https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wdth,wght@12..96,75..100,200..800&family=Instrument+Serif:ital@0;1&family=DM+Mono:wght@400;500&display=swap";

// Sanity resizes images on the fly (?w=). 640px covers a third-width thumbnail
// at 2x density.
const THUMB_WIDTH = 640;
const THUMB_HEIGHT = 480;

// The two disciplines taken in turn, so neither leads. "dev" is Digital's
// colour, "vis" is Visual's.
const TICKER = [
  ["ui/ux design", "dev"],
  ["photography", "vis"],
  ["web development", "dev"],
  ["film", "vis"],
  ["software", "dev"],
  ["graphic design", "vis"],
  ["quality assurance", "dev"],
  ["video editing", "vis"],
  ["product design", "dev"],
];

function readTheme() {
  try {
    return localStorage.getItem(THEME_KEY) === "light" ? "light" : "night";
  } catch {
    return "night";
  }
}

/** Featured first, then the order Studio gives. Only pieces with a thumbnail. */
function pickSelected(projects, experience) {
  return projects
    .filter((p) => p.thumbnail && mainExperienceOf(p) === experience)
    .sort((a, b) => Number(!!b.featured) - Number(!!a.featured))
    .slice(0, 3);
}

export function HubPage() {
  const { search } = useLocation();

  // Tailored links shared before the hub existed (/?focus=ui-ux) still go to
  // the Product homepage, where the focus is read. `replace`: no Back bounce.
  if (new URLSearchParams(search).has("focus")) {
    return <Navigate to={`/dev${search}`} replace />;
  }
  return <HubSite />;
}

function HubSite() {
  const { hash } = useLocation();
  const { projects, loading } = useProjects();
  const [theme, setTheme] = useState(readTheme);
  // The darkroom loader opens the first visit of a session (ADR 0020). `ready`
  // is false while it is up, and the contact sheet starts developing when it
  // fades. Everyone else is ready at once.
  const [ready, setReady] = useState(() => !shouldScan(hash));
  const finishScan = useCallback(() => setReady(true), []);

  // Fonts, title and the page colour behind the app (so an overscroll in light
  // mode does not flash the Product site's dark ground). All undone on leaving.
  useEffect(() => {
    if (!document.getElementById(FONTS_ID)) {
      const link = document.createElement("link");
      link.id = FONTS_ID;
      link.rel = "stylesheet";
      link.href = FONTS_HREF;
      document.head.appendChild(link);
    }
    const previousTitle = document.title;
    document.title = TITLE;
    return () => {
      document.title = previousTitle;
    };
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    const previous = root.style.backgroundColor;
    root.style.backgroundColor = theme === "light" ? "#eee8d6" : "#07090d";
    return () => {
      root.style.backgroundColor = previous;
    };
  }, [theme]);

  // A link like /#about arrives before the page exists, so the browser's own
  // jump has nothing to land on. Do it once, when the page is first drawn.
  // (Later menu clicks use the browser's own smooth anchor scroll; repeating
  // this on every hash change would cut that glide short.)
  const arrivedWith = useRef(hash);
  useEffect(() => {
    if (!arrivedWith.current) return;
    const frame = requestAnimationFrame(() => {
      document.querySelector(arrivedWith.current)?.scrollIntoView();
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  const toggleTheme = () => {
    const next = theme === "light" ? "night" : "light";
    setTheme(next);
    try {
      localStorage.setItem(THEME_KEY, next);
    } catch {
      // Private window or blocked storage: the choice just won't be remembered.
    }
  };

  const digital = loading ? [] : pickSelected(projects, PRODUCT);
  const visual = loading ? [] : pickSelected(projects, VISUAL);
  // A project's number here is the one it has on the contact sheet above.
  const numbers = loading ? new Map() : frameNumbers(projects);

  return (
    <div className="hub" data-theme={theme}>
      {!ready && (
        <DarkroomLoader
          projects={projects}
          loading={loading}
          onDone={finishScan}
        />
      )}
      <header className="hub-bar">
        <a
          className="hub-brand"
          href="#top"
          aria-label="Quin Ledesma, top of page"
        >
          ql
        </a>
        <nav className="hub-nav" aria-label="Primary">
          <a href="#about">about</a>
          <a href="#work">work</a>
          <a href="#contact">contact</a>
          <button
            type="button"
            className="hub-theme"
            onClick={toggleTheme}
            aria-label={
              theme === "light"
                ? "Switch to night mode"
                : "Switch to light mode"
            }
          >
            {theme === "light" ? (
              <Moon size={18} aria-hidden="true" />
            ) : (
              <Sun size={18} aria-hidden="true" />
            )}
          </button>
        </nav>
      </header>

      <main id="top">
        <SheetHero projects={projects} loading={loading} ready={ready} />

        {/* Both disciplines, interleaved. Decorative: the Work section below says
            the same thing in words. */}
        <div className="hub-ticker" aria-hidden="true">
          <div className="hub-ticker-track">
            {[0, 1].map((copy) => (
              <div className="hub-ticker-group" key={copy}>
                {TICKER.map(([text, tone]) => (
                  <span className={tone} key={text}>
                    {text}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>

        <section className="hub-section" id="about" aria-labelledby="about-h">
          <div className="hub-wrap">
            <h2 className="hub-h2" id="about-h">
              about
            </h2>
            <div className="hub-about">
              <div className="hub-portrait-wrap">
                <img
                  className="hub-portrait"
                  src={quinPortrait}
                  alt="Portrait of Quin Ledesma"
                  width={640}
                  height={800}
                  loading="lazy"
                  decoding="async"
                  fetchPriority="low"
                />
                {/* Crop brackets frame the print. */}
                <span className="sheet-crop sheet-crop--tl" aria-hidden="true" />
                <span className="sheet-crop sheet-crop--tr" aria-hidden="true" />
                <span className="sheet-crop sheet-crop--bl" aria-hidden="true" />
                <span className="sheet-crop sheet-crop--br" aria-hidden="true" />
              </div>
              <div>
                <div className="hub-prose">
                  <p>
                    I&rsquo;m a designer who codes and a developer who designs.
                    My journey started with creating graphics in high school,
                    evolved through an Information Technology degree, and now
                    shows up in building systems that genuinely help people.
                  </p>
                  <p>
                    Working in healthcare tech has taught me that good design
                    isn&rsquo;t only aesthetics. It&rsquo;s about reducing
                    friction, preventing errors, and respecting people&rsquo;s
                    time. Every interface I create aims to make someone&rsquo;s
                    workday a little better.
                  </p>
                  <p>
                    Photography and film taught me to look closely; building
                    software taught me to make things hold up. I like work where
                    both matter.
                  </p>
                  <p>
                    When I&rsquo;m not designing or coding, you might find me
                    teaching the next generation of developers, behind a camera,
                    exploring motion graphics, or occasionally hitting the dance
                    floor.
                  </p>
                </div>

                <h3 className="hub-h3" id="experience">
                  where I&rsquo;ve worked
                </h3>
                <ul className="hub-timeline">
                  {TIMELINE.map((item) => (
                    <li key={`${item.period}-${item.role}`}>
                      <span className="when">{item.period}</span>
                      <span>
                        {item.role}
                        <span className="where">
                          {" "}
                          at {item.company}
                          {item.extra ? `, ${item.extra}` : ""}
                        </span>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <DeskPhoto />
          </div>
        </section>

        <section className="hub-section" id="work" aria-labelledby="work-h">
          <div className="hub-wrap">
            <h2 className="hub-h2" id="work-h">
              work
            </h2>

            <Practice
              tone="dev"
              name="Digital & Product"
              blurb="UI/UX and product design, web and software development, and quality assurance."
              to="/dev"
              enter="Open the digital portfolio"
              items={digital}
              numbers={numbers}
              pathFor={(p) => `/work/${p.slug}`}
            />
            <Practice
              tone="vis"
              name="Visual & Creative"
              blurb="Photography, film, video editing and graphic design."
              to="/visual"
              enter="Open the visual portfolio"
              items={visual}
              numbers={numbers}
              pathFor={(p) => `/visual/${p.slug}`}
            />
          </div>
        </section>

        <section
          className="hub-contact hub-flip"
          id="contact"
          aria-labelledby="contact-h"
        >
          <div className="hub-wrap">
            <h2 className="hub-h2" id="contact-h">
              contact
            </h2>
            <p className="hub-lead">
              A project in mind, a question, or just a hello. Write to me here,
              whichever portfolio brought you in.
            </p>
            <a className="hub-email" href={`mailto:${EMAIL}`}>
              {EMAIL}
            </a>
            <ul className="hub-socials">
              {SOCIAL_LINKS.map((link) => (
                <li key={link.label}>
                  <a href={link.href} target="_blank" rel="noopener noreferrer">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="hub-foot">
              <span>{LOCATION_LINE}</span>
              <span>&copy; {new Date().getFullYear()} Quin Ledesma</span>
            </div>
            <Colophon
              fonts={["Bricolage Grotesque", "Instrument Serif", "Instrument Sans"]}
              className="hub-colophon"
            />
          </div>
        </section>
      </main>
    </div>
  );
}

/** One of the two portfolios: its name in its own voice, a line, a way in. */
function Practice({ tone, name, blurb, to, enter, items, numbers, pathFor }) {
  const headingId = `practice-${tone}`;
  return (
    <article
      className={`hub-practice hub-practice--${tone}`}
      aria-labelledby={headingId}
    >
      <div>
        <h3 className={`hub-name--${tone}`} id={headingId}>
          <span className="hub-name-mark">{name}</span>
        </h3>
        <p className="hub-blurb">{blurb}</p>
        <Link className="hub-enter" to={to}>
          {enter}
          <ArrowUpRight size={18} aria-hidden="true" />
        </Link>
      </div>

      {items.length > 0 && (
        <ul className="hub-thumbs">
          {items.map((project) => (
            <li key={project.id}>
              <Link className="hub-thumb" to={pathFor(project)}>
                <span className="hub-thumb-img" style={{ display: "block" }}>
                  <img
                    src={`${project.thumbnail}?w=${THUMB_WIDTH}&auto=format`}
                    alt=""
                    width={THUMB_WIDTH}
                    height={THUMB_HEIGHT}
                    loading="lazy"
                    decoding="async"
                    fetchPriority="low"
                  />
                  {numbers.has(project.id) && (
                    <span
                      className="frame-no bottom-1.5 left-1.5"
                      aria-hidden="true"
                    >
                      {numbers.get(project.id)}
                    </span>
                  )}
                </span>
                <span className="hub-thumb-title">{project.title}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </article>
  );
}
