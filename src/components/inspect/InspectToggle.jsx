import { lazy, Suspense, useCallback, useState } from "react";
import { cn } from "../../utils/cn";

// The inspector and its stylesheet download only when the button is first
// pressed, so nobody else pays for them.
const Inspector = lazy(() =>
  import("./Inspector").then((m) => ({ default: m.Inspector })),
);

/** Nav button that turns the page inspector on and off. */
export function InspectToggle() {
  const [on, setOn] = useState(false);
  const close = useCallback(() => setOn(false), []);

  return (
    <>
      <button
        type="button"
        aria-pressed={on}
        onClick={() => setOn((value) => !value)}
        title="See this page's real fonts, colours and spacing"
        className={cn(
          // Outlined, unlike the plain nav links, so it reads as a tool and not
          // another page.
          "rounded-full border px-3 py-1 text-xs font-medium transition-[color,background-color,border-color] duration-200",
          on
            ? "border-accent bg-accent/15 text-accent"
            : "border-border-hover text-text-secondary hover:border-accent hover:text-accent",
        )}
      >
        Inspect design
      </button>
      {on && (
        <Suspense fallback={null}>
          <Inspector onClose={close} />
        </Suspense>
      )}
    </>
  );
}
