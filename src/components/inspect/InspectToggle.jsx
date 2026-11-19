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
        className={cn(
          "text-sm font-medium transition-colors duration-200 hover:text-accent",
          on ? "text-accent" : "text-text-secondary",
        )}
      >
        inspect
      </button>
      {on && (
        <Suspense fallback={null}>
          <Inspector onClose={close} />
        </Suspense>
      )}
    </>
  );
}
