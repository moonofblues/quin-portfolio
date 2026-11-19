import { Link } from "react-router-dom";
import { mainExperienceOf, PRODUCT, VISUAL } from "../shared/experiences";

// A contact sheet is every frame from a roll on one page. Here each frame is a
// project, Product and Visual interleaved so neither leads, and the featured
// ones are ringed as the picks. Prototype of the contact sheet concept.

const FRAME_LIMIT = 18;
const FRAME_WIDTH = 480;

const featuredFirst = (a, b) => Number(!!b.featured) - Number(!!a.featured);

function pickFrames(projects) {
  const withPicture = projects.filter((p) => p.thumbnail);
  const product = withPicture
    .filter((p) => mainExperienceOf(p) === PRODUCT)
    .sort(featuredFirst);
  const visual = withPicture
    .filter((p) => mainExperienceOf(p) === VISUAL)
    .sort(featuredFirst);

  const frames = [];
  for (let i = 0; frames.length < FRAME_LIMIT && (product[i] || visual[i]); i++) {
    if (product[i]) frames.push({ project: product[i], side: "product" });
    if (visual[i] && frames.length < FRAME_LIMIT) {
      frames.push({ project: visual[i], side: "visual" });
    }
  }
  return frames;
}

const pathFor = ({ project, side }) =>
  side === "product" ? `/work/${project.slug}` : `/visual/${project.slug}`;

/**
 * The hub hero as a contact sheet. The name and statement sit on top of it and
 * ignore the pointer, so the frames underneath stay clickable; only the two
 * links in the statement take clicks.
 */
export function SheetHero({ projects, loading }) {
  const frames = loading ? [] : pickFrames(projects);

  return (
    <section className="sheet-hero" aria-labelledby="hub-name">
      <ul className="sheet-grid" aria-label="Frames from my work">
        {frames.map((frame, i) => (
          <li
            key={frame.project.id}
            className="sheet-cell"
            data-side={frame.side}
            data-pick={frame.project.featured ? "true" : "false"}
          >
            <Link
              className="sheet-frame"
              to={pathFor(frame)}
              aria-label={`Open ${frame.project.title}${frame.project.featured ? ", one of my picks" : ""}`}
            >
              <img
                src={`${frame.project.thumbnail}?w=${FRAME_WIDTH}&auto=format`}
                alt=""
                width={FRAME_WIDTH}
                height={Math.round(FRAME_WIDTH * 0.75)}
                decoding="async"
                // One image may be eager and high priority: the first frame.
                loading={i === 0 ? "eager" : "lazy"}
                fetchPriority={i === 0 ? "high" : "low"}
              />
              <span className="sheet-title">{frame.project.title}</span>
              <span className="sheet-no">{String(i + 1).padStart(3, "0")}</span>
            </Link>
          </li>
        ))}
      </ul>

      <div className="sheet-text">
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
            This is a contact sheet of my work. Every frame is a project, and
            the ringed ones are my picks. Open any frame, or keep scrolling to
            read about me first.
          </p>
        </div>
      </div>
    </section>
  );
}
