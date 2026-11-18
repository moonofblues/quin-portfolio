import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

export const LIGHTBOX_BUTTON =
  "p-2 rounded-full bg-white/10 hover:bg-white/20 transition-[background-color] duration-200 text-white";

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';
// Matches the exit animation length in index.css (.lightbox-*).
const EXIT_MS = 160;

/**
 * The full-screen frame shared by the case-study image viewers: dark backdrop,
 * close button, and everything a modal needs to behave.
 *
 *  - Fades and scales in, and plays the same in reverse before it unmounts
 *    (CSS only; the global reduced-motion rule collapses it to a cut).
 *  - Esc, the X, or a click outside the content closes it.
 *  - Focus is trapped inside, the page behind is inert, and focus goes back to
 *    whatever opened the viewer when it closes.
 *
 * `children` is the content (it animates in); `controls` are fixed-position
 * extras such as arrows, kept outside the animated panel because a transformed
 * ancestor would stop `position: fixed` from pinning to the screen.
 * `onKeyDown` receives any other key press (e.g. arrow keys).
 */
export function LightboxShell({ label, closeLabel, onClose, onKeyDown, controls, children }) {
  const [closing, setClosing] = useState(false);
  const dialogRef = useRef(null);
  const closeRef = useRef(null);
  const keyRef = useRef(onKeyDown);
  // Read once, during the first render, before autoFocus moves focus to the
  // close button: this is the thumbnail that opened the viewer.
  const [opener] = useState(() => document.activeElement);

  const requestClose = useCallback(() => setClosing(true), []);

  useEffect(() => {
    keyRef.current = onKeyDown;
  }, [onKeyDown]);

  // Let the exit animation play, then tell the parent to unmount.
  useEffect(() => {
    if (!closing) return;
    const timer = setTimeout(onClose, EXIT_MS);
    return () => clearTimeout(timer);
  }, [closing, onClose]);

  useEffect(() => {
    const root = document.getElementById("root");
    const handleKey = (e) => {
      if (e.key === "Escape") {
        requestClose();
        return;
      }
      if (e.key === "Tab") {
        const nodes = dialogRef.current?.querySelectorAll(FOCUSABLE);
        if (!nodes?.length) return;
        const first = nodes[0];
        const last = nodes[nodes.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
        return;
      }
      keyRef.current?.(e);
    };
    window.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    root?.setAttribute("inert", "");
    // Explicit rather than autoFocus: in development React runs this effect's
    // cleanup and setup twice, and the cleanup hands focus back to the opener,
    // which would otherwise leave focus outside the dialog.
    closeRef.current?.focus();
    return () => {
      window.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
      root?.removeAttribute("inert");
      opener?.focus?.();
    };
  }, [requestClose, opener]);

  // Portalled to <body> so no animated/transformed ancestor can trap it.
  return createPortal(
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={label}
      data-closing={closing ? "true" : undefined}
      className="fixed inset-0 z-50 overflow-y-auto"
      onClick={requestClose}
    >
      <div className="lightbox-scrim fixed inset-0 bg-black/95" aria-hidden="true" />
      <button
        ref={closeRef}
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          requestClose();
        }}
        className={`fixed top-4 right-4 z-50 ${LIGHTBOX_BUTTON}`}
        aria-label={closeLabel ?? "Close enlarged image"}
      >
        <X size={24} />
      </button>
      {controls}
      <div className="lightbox-panel relative">{children}</div>
    </div>,
    document.body,
  );
}
