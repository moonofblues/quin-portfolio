import { createContext, useContext, useEffect } from "react";

/**
 * Lights down (ADR 0014, ADR 0021). The visitor's light/dark choice is the
 * shared site theme (src/shared/siteTheme.js). A film page ignores it and always
 * goes dark, so it calls useNight() to tell VisualLayout; the layout then hides
 * the theme toggle, which would do nothing there. Every other page just follows
 * the theme. The layout stays mounted between pages, so the colour change fades
 * instead of cutting.
 */
export const NightContext = createContext(() => {});

export function useNight() {
  const setNight = useContext(NightContext);
  useEffect(() => {
    setNight(true);
    return () => setNight(false);
  }, [setNight]);
}
