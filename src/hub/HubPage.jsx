import { useEffect, useRef, useState } from "react";
import { Link, Navigate, useLocation } from "react-router-dom";
import { ArrowUpRight, Moon, Sun } from "lucide-react";
import { useProjects } from "../shared/context/ProjectsContext";
import { mainExperienceOf, PRODUCT, VISUAL } from "../shared/experiences";
import { TIMELINE } from "../shared/timeline";
import { EMAIL, LOCATION_LINE, SOCIAL_LINKS } from "../shared/contact";
import { Colophon } from "../shared/Colophon";
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
  "https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wdth,wght@12..96,75..100,200..800&family=Instrument+Serif:ital@0;1&display=swap";

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
  const heroRef = useRef(null);

  // The lens follows a mouse or pen over the hero. The listener is passive and
  // writes at most once per frame, so it never holds up scrolling. Touch has no
  // hover, so there the lens is simply not shown (see hub.css).
  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;
    let frame = 0;
    let pointer = { x: 0, y: 0 };
    const paint = () => {
      frame = 0;
      const box = hero.getBoundingClientRect();
      hero.style.setProperty("--x", `${pointer.x - box.left}px`);
      hero.style.setProperty("--y", `${pointer.y - box.top}px`);
    };
    const move = (event) => {
      if (event.pointerType === "touch") return;
      pointer = { x: event.clientX, y: event.clientY };
      hero.dataset.lens = "on";
      if (!frame) frame = requestAnimationFrame(paint);
    };
    const leave = () => {
      delete hero.dataset.lens;
    };
    hero.addEventListener("pointermove", move, { passive: true });
    hero.addEventListener("pointerleave", leave);
    return () => {
      hero.removeEventListener("pointermove", move);
      hero.removeEventListener("pointerleave", leave);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

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

  return (
    <div className="hub" data-theme={theme}>
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
        <section className="hub-hero" ref={heroRef} aria-labelledby="hub-name">
          <div className="hub-wrap hub-hero-inner">
            <h1 className="hub-name" id="hub-name">
              quin ledesma
            </h1>
            <p className="hub-statement">
              I design and build{" "}
              <Link className="hub-pick hub-pick--dev" to="/dev">
                digital products
              </Link>
              , and I make{" "}
              <Link className="hub-pick hub-pick--vis" to="/visual">
                pictures
              </Link>
              .
            </p>
            <p className="hub-hint">
              Two portfolios, one person. Open either, or keep scrolling to read
              about me first.
            </p>
          </div>

          {/* The lens: the same words in the other portfolio's ground, shown
              only inside a circle that follows the pointer. A copy for the eye
              alone, so it is hidden from assistive tech and cannot be focused. */}
          <div className="hub-alt hub-flip" aria-hidden="true" inert>
            <div className="hub-wrap hub-hero-inner">
              <p className="hub-name">quin ledesma</p>
              <p className="hub-statement">
                I design and build{" "}
                <span className="hub-pick hub-pick--dev">digital products</span>
                , and I make{" "}
                <span className="hub-pick hub-pick--vis">pictures</span>.
              </p>
              <p className="hub-hint">
                Two portfolios, one person. Open either, or keep scrolling to
                read about me first.
              </p>
            </div>
          </div>
        </section>

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
              pathFor={(p) => `/work/${p.slug}`}
            />
            <Practice
              tone="vis"
              name="Visual & Creative"
              blurb="Photography, film, video editing and graphic design."
              to="/visual"
              enter="Open the visual portfolio"
              items={visual}
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
function Practice({ tone, name, blurb, to, enter, items, pathFor }) {
  const headingId = `practice-${tone}`;
  return (
    <article
      className={`hub-practice hub-practice--${tone}`}
      aria-labelledby={headingId}
    >
      <div>
        <h3 className={`hub-name--${tone}`} id={headingId}>
          {name}
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
