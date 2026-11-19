import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { pad, pickFrames } from "./frames";

// A contact sheet is every frame from a roll on one page. Here each frame is a
// project, Product and Visual interleaved so neither leads, and the featured
// ones are ringed and taped as the picks. The picking rule is in ./frames.js.

const FRAME_WIDTH = 480;

const pathFor = ({ project, side }) =>
  side === "product" ? `/work/${project.slug}` : `/visual/${project.slug}`;

/**
 * The hub hero as a contact sheet. The name and statement sit on top of it and
 * ignore the pointer, so the frames underneath stay clickable; only the two
 * links in the statement take clicks. The readout line at the top follows the
 * frame under the pointer, like a timecode.
 */
export function SheetHero({ projects, loading, ready = true }) {
  const [active, setActive] = useState(null);
  const frames = loading ? [] : pickFrames(projects);
  const picks = frames.filter((f) => f.project.featured).length;
  const current = active === null ? null : frames[active];

  // The readout counts the frames as they develop, in step with the CSS delay
  // (70ms a frame, see hub.css), then settles on the real totals. Under reduced
  // motion it goes straight to the totals. Only the timers set state, never the
  // effect body itself.
  const total = frames.length;
  const [developed, setDeveloped] = useState(0);
  useEffect(() => {
    // Wait for the darkroom loader to fade, if there is one.
    if (total === 0 || !ready) return undefined;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      const id = setTimeout(() => setDeveloped(total), 0);
      return () => clearTimeout(id);
    }
    let n = 0;
    const id = setInterval(() => {
      n += 1;
      setDeveloped(n);
      if (n >= total) clearInterval(id);
    }, 70);
    return () => clearInterval(id);
  }, [total, ready]);

  return (
    <section
      className="sheet-hero"
      data-ready={ready ? "true" : "false"}
      aria-labelledby="hub-name"
    >
      <ul className="sheet-grid" aria-label="Frames from my work">
        {frames.map((frame, i) => (
          <li
            key={frame.project.id}
            className="sheet-cell"
            data-side={frame.side}
            data-pick={frame.project.featured ? "true" : "false"}
            data-tilt={i % 4}
            style={{ "--i": i }}
          >
            <Link
              className="sheet-frame"
              to={pathFor(frame)}
              aria-label={`Open ${frame.project.title}${frame.project.featured ? ", one of my picks" : ""}`}
              onPointerEnter={() => setActive(i)}
              onPointerLeave={() => setActive(null)}
              onFocus={() => setActive(i)}
              onBlur={() => setActive(null)}
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
              <span className="sheet-no">{pad(i + 1)}</span>
            </Link>
            {/* Outside the link: the frame is dimmed and the tape must not be. */}
            {frame.project.featured && (
              <span
                className="sheet-tape"
                aria-hidden="true"
                style={{
                  "--p": frames.slice(0, i).filter((f) => f.project.featured).length,
                }}
              >
                pick
              </span>
            )}
          </li>
        ))}
      </ul>

      {/* Crop brackets, the corner marks of a trimmed print. */}
      <span className="sheet-crop sheet-crop--tl" aria-hidden="true" />
      <span className="sheet-crop sheet-crop--tr" aria-hidden="true" />
      <span className="sheet-crop sheet-crop--bl" aria-hidden="true" />
      <span className="sheet-crop sheet-crop--br" aria-hidden="true" />

      <div className="sheet-text">
        <div className="hub-wrap hub-hero-inner">
          <p className="sheet-readout">
            {current ? (
              <>
                <b>
                  frame {pad(active + 1)} / {pad(frames.length)}
                </b>{" "}
                {current.project.title} · {current.side === "product" ? "digital" : "visual"}
              </>
            ) : frames.length && developed < frames.length ? (
              <b>
                developing… {pad(developed)} / {pad(frames.length)}
              </b>
            ) : frames.length ? (
              <>
                <b>{pad(frames.length)} frames</b> {picks} picks · hover one to pull it out
              </>
            ) : (
              <b>developing…</b>
            )}
          </p>
          <h1 className="hub-name" id="hub-name">
            quin ledesma
          </h1>
          <p className="hub-statement">
            I design and build{" "}
            {/* The comma stays with its word, never starting the next line. */}
            <span className="sheet-nobreak">
              <Link className="hub-pick hub-pick--dev" to="/dev">
                digital products
              </Link>
              ,
            </span>{" "}
            and I make{" "}
            <Link className="hub-pick hub-pick--vis" to="/visual">
              pictures
            </Link>
            .
          </p>
          <p className="hub-hint">
            A contact sheet of my work. Every frame is a project. The taped,
            ringed ones are my picks. Open any frame, or keep scrolling to read
            about me first.
          </p>
        </div>
      </div>
    </section>
  );
}
