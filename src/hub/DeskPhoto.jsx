import { useState } from "react";
import { DESK } from "../shared/desk";

/**
 * A photo of Quin's desk with tappable objects. Each dot opens a short note
 * under the photo. Renders nothing until DESK is filled in (src/shared/desk.js).
 */
export function DeskPhoto() {
  const [active, setActive] = useState(null);
  if (!DESK) return null;

  const item = active === null ? null : DESK.items[active];

  return (
    <section className="hub-desk" aria-labelledby="desk-h">
      <h3 className="hub-h3" id="desk-h">
        on my desk
      </h3>
      <div className="hub-desk-stage">
        <img
          src={DESK.image}
          alt={DESK.alt}
          width={DESK.width}
          height={DESK.height}
          loading="lazy"
          decoding="async"
          fetchPriority="low"
        />
        {DESK.items.map((entry, i) => (
          <button
            key={entry.label}
            type="button"
            className="hub-desk-dot"
            aria-label={entry.label}
            aria-pressed={active === i}
            onClick={() => setActive(active === i ? null : i)}
            style={{ left: `${entry.x}%`, top: `${entry.y}%` }}
          />
        ))}
      </div>
      <p className="hub-desk-note" aria-live="polite">
        {item ? (
          <>
            <b>{item.label}.</b> {item.note}
          </>
        ) : (
          "Tap an object to see what it is."
        )}
      </p>
    </section>
  );
}
