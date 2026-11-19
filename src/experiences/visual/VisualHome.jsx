import { useMemo } from "react";
import { Link } from "react-router-dom";
import { useProjects } from "../../shared/context/ProjectsContext";
import { VISUAL, mainExperienceOf } from "../../shared/experiences";
import { Colophon } from "../../shared/Colophon";
import quinPortrait from "../../assets/quin-portrait.webp";
import { Frame } from "./Frame";
import {
  GRAPHIC_LIMIT,
  featuredFirst,
  groupOf,
  projectPath,
} from "./helpers";

// The three kinds of work, in the order the index shows them. A group with no
// published work is simply not drawn (ADR 0002: no empty states).
const GROUPS = [
  { id: "film", title: "film", noun: ["film", "films"] },
  {
    id: "photography",
    title: "photography",
    noun: ["set", "sets"],
    note: "Portraits of friends and moments caught on the street, shown as finished sets that hold together as one story.",
  },
  { id: "graphic", title: "graphic design", noun: ["piece", "pieces"] },
];

const pad = (n) => String(n).padStart(3, "0");

function Item({ project, number, natural = true, eager = false }) {
  return (
    <div className="v-item">
      <Link className="v-link" to={projectPath(project)}>
        <Frame project={project} number={pad(number)} natural={natural} eager={eager} />
        <span className="v-cap">
          <b>{project.title}</b>
          {project.year && <span>{project.year}</span>}
        </span>
      </Link>
    </div>
  );
}

export function VisualHome() {
  const { projects } = useProjects();
  const year = new Date().getFullYear();

  // Everything whose own page belongs to Visual and that has a picture to show.
  const visual = useMemo(
    () =>
      featuredFirst(
        projects.filter(
          (p) => mainExperienceOf(p) === VISUAL && p.thumbnail,
        ),
      ),
    [projects],
  );

  const grouped = useMemo(() => {
    const out = { film: [], photography: [], graphic: [] };
    for (const p of visual) out[groupOf(p)].push(p);
    return out;
  }, [visual]);

  // Up to four frames on the hero, drawn from the same pool as the index.
  const heroFrames = visual.slice(0, 4);
  const present = GROUPS.filter((g) => grouped[g.id].length > 0);

  // Running frame numbers down the index, like a contact sheet. Worked out
  // here, ahead of rendering, so the hero frames carry the same number as
  // their entry further down.
  const { numbers, shownIn } = useMemo(() => {
    const numbers = new Map();
    const shownIn = {};
    let n = 0;
    for (const g of GROUPS) {
      const list = grouped[g.id];
      const shown = g.id === "graphic" ? list.slice(0, GRAPHIC_LIMIT) : list;
      shownIn[g.id] = shown;
      for (const p of shown) numbers.set(p.id, ++n);
    }
    return { numbers, shownIn };
  }, [grouped]);

  return (
    <>
      <title>Quin Ledesma | Visual</title>
      <meta
        name="description"
        content="Film, photography and graphic design by Quin Ledesma, based in Zamboanga City, Philippines."
      />

      <div className="v-hero">
        {heroFrames.map((p, i) => (
          <div key={p.id} className={`v-hero-f v-hero-f${i + 1}`}>
            <Link
              className="v-link"
              to={projectPath(p)}
              aria-label={p.title}
              style={{ height: "100%" }}
            >
              <Frame
                project={p}
                number={numbers.has(p.id) ? pad(numbers.get(p.id)) : undefined}
                eager={i === 0}
                maxWidth={960}
              />
            </Link>
          </div>
        ))}

        <div className="v-lede">
          <p>film, photographs and graphic design. things I look at twice.</p>
          <span className="v-mono">zamboanga city</span>
        </div>
        <h1 className="v-name" aria-label="Quin Ledesma">
          <span aria-hidden="true">quin</span>
          <span aria-hidden="true">ledesma</span>
        </h1>
      </div>

      <nav className="v-ticker" aria-label="Kinds of work">
        <div className="v-track">
          {[0, 1, 2, 3].flatMap((round) =>
            GROUPS.map((g) => {
              const label = (
                <>
                  {g.title}
                  <i>/</i>
                </>
              );
              return grouped[g.id].length > 0 ? (
                <Link key={`${round}-${g.id}`} to={`/visual#${g.id}`}>
                  {label}
                </Link>
              ) : (
                <span key={`${round}-${g.id}`}>{label}</span>
              );
            }),
          )}
        </div>
      </nav>

      <section className="v-section" id="work" aria-label="Work">
        {present.map((g, gi) => {
          const all = grouped[g.id];
          const shown = shownIn[g.id];
          const noun = shown.length === 1 ? g.noun[0] : g.noun[1];
          return (
            <div className="v-group" id={g.id} key={g.id}>
              <div className="v-ghead">
                <h2>{g.title}</h2>
                <span className="v-mono">
                  {String.fromCharCode(97 + gi)} — {shown.length} {noun}
                  {shown.length < all.length && (
                    <>
                      {" · "}
                      <Link to="/work?focus=graphic-design">all {all.length}</Link>
                    </>
                  )}
                </span>
              </div>
              {g.note && <p className="v-gnote">{g.note}</p>}
              <div className={g.id === "film" ? "v-film" : "v-cols"}>
                {shown.map((p) => (
                  <Item
                    key={p.id}
                    project={p}
                    number={numbers.get(p.id)}
                    natural={g.id !== "film"}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </section>

      <section className="v-section v-about" id="about" aria-label="About">
        <div className="v-slate">
          <div className="v-clap" aria-hidden="true" />
          <div className="v-slate-grid">
            <div>
              <span className="v-mono">roll</span>
              <b>01</b>
            </div>
            <div>
              <span className="v-mono">scene</span>
              <b>about</b>
            </div>
            <div>
              <span className="v-mono">shot in</span>
              <b>zamboanga city</b>
            </div>
          </div>
          <div className="v-slate-body">
            <span className="v-frame">
              <img
                className="v-pic"
                src={quinPortrait}
                alt="Quin Ledesma"
                width={3025}
                height={3025}
                loading="lazy"
                decoding="async"
                fetchPriority="low"
              />
            </span>
            <div>
              <h3>a designer who codes, with a camera.</h3>
              <p>
                My journey started with creating graphics in high school, went
                through an Information Technology degree, and now shows up in
                systems that help people.
              </p>
              <p>
                Away from the screen I'm usually <em>behind a camera</em>:
                portraits of friends, moments on the street, and the occasional
                video.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="v-section v-credits" id="contact" aria-label="Contact">
        <h2>
          thanks
          <br />
          for watching.
        </h2>
        <dl className="v-roll">
          <div>
            <dt>say hello</dt>
            <dd>
              <a href="mailto:quinledesma@gmail.com">quinledesma@gmail.com</a>
            </dd>
          </div>
          <div>
            <dt>find me</dt>
            <dd>
              <a href="https://behance.net/quinledesma" target="_blank" rel="noopener noreferrer">
                behance
              </a>
              {" · "}
              <a href="https://linkedin.com/in/quinledesma" target="_blank" rel="noopener noreferrer">
                linkedin
              </a>
            </dd>
          </div>
          <div>
            <dt>based in</dt>
            <dd>zamboanga city, ph</dd>
          </div>
          <div>
            <dt>open to</dt>
            <dd>remote work worldwide</dd>
          </div>
        </dl>
        <div className="v-foot">
          <span>© {year} quin ledesma</span>
          <Link to="/dev">also by quin: design &amp; development ↗</Link>
        </div>
        <Colophon
          fonts={["Bricolage Grotesque", "Instrument Serif", "DM Mono"]}
          className="v-colophon"
        />
      </section>
    </>
  );
}
