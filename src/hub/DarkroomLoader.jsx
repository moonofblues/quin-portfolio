import { useCallback, useEffect, useState } from "react";
import { pad, pickFrames } from "./frames";
import { markScanned } from "./darkroom";

// The darkroom loader (ADR 0020). A scan of the real frames: each project's own
// name goes by as a filename, a bar fills, and a counter ticks to the real
// total. Then it fades and the contact sheet develops underneath. Once per
// visit, and any click or key skips it.

const TICK_MS = 90;
const HOLD_MS = 280;
const FADE_MS = 320;
// If the projects are slow to arrive, never keep the visitor waiting on a show.
const GIVE_UP_MS = 2600;

export function DarkroomLoader({ projects, loading, onDone }) {
  const frames = loading ? [] : pickFrames(projects);
  const total = frames.length;
  const [shown, setShown] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const finish = useCallback(() => setLeaving(true), []);

  // Fade out, then hand over to the page.
  useEffect(() => {
    if (!leaving) return undefined;
    markScanned();
    const id = setTimeout(onDone, FADE_MS);
    return () => clearTimeout(id);
  }, [leaving, onDone]);

  // Step through the frames once they are known.
  useEffect(() => {
    if (leaving || loading) return undefined;
    if (total === 0) {
      const id = setTimeout(finish, 0);
      return () => clearTimeout(id);
    }
    let n = 0;
    let hold = 0;
    const id = setInterval(() => {
      n += 1;
      setShown(n);
      if (n >= total) {
        clearInterval(id);
        hold = setTimeout(finish, HOLD_MS);
      }
    }, TICK_MS);
    return () => {
      clearInterval(id);
      clearTimeout(hold);
    };
  }, [leaving, loading, total, finish]);

  // Give up if the data is slow, and let any click or key skip the show.
  useEffect(() => {
    const giveUp = setTimeout(finish, GIVE_UP_MS);
    const passive = { passive: true };
    window.addEventListener("pointerdown", finish, passive);
    window.addEventListener("keydown", finish);
    return () => {
      clearTimeout(giveUp);
      window.removeEventListener("pointerdown", finish);
      window.removeEventListener("keydown", finish);
    };
  }, [finish]);

  // Hold the page still behind it.
  useEffect(() => {
    const root = document.documentElement;
    const previous = root.style.overflow;
    root.style.overflow = "hidden";
    return () => {
      root.style.overflow = previous;
    };
  }, []);

  const current = shown > 0 ? frames[shown - 1] : null;
  const file = current ? `${current.project.slug}.tif` : "warming up the scanner";
  const progress = total ? shown / total : 0;

  return (
    <div
      className="darkroom"
      data-leaving={leaving ? "true" : undefined}
      role="status"
      aria-label="Loading"
    >
      <span className="sr-only">Loading the portfolio</span>
      <div className="darkroom-card" aria-hidden="true">
        <p className="darkroom-row">
          <span>developing</span>
          <span>{Math.round(progress * 100)}%</span>
        </p>
        <p className="darkroom-file">
          <b>{file}</b>
        </p>
        <div className="darkroom-bar">
          <span style={{ transform: `scaleX(${progress})` }} />
        </div>
        <p className="darkroom-row darkroom-foot">
          <span>
            {pad(shown)} / {pad(total)} frames
          </span>
          <span>any key skips</span>
        </p>
      </div>
    </div>
  );
}
