import { createContext, useContext, useEffect } from "react";

/**
 * Lights down (ADR 0014). VisualLayout owns the light/dark state and gives
 * pages a way to ask for it. A page that shows work in true colour (a photo set
 * or a film) calls useNight(); a page that should stay on paper (graphic design,
 * the index) simply doesn't. The layout stays mounted between pages, so the
 * colour change fades instead of cutting.
 */
export const NightContext = createContext(() => {});

export function useNight() {
  const setNight = useContext(NightContext);
  useEffect(() => {
    setNight(true);
    return () => setNight(false);
  }, [setNight]);
}
