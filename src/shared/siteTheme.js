import { useSyncExternalStore } from "react";

// The one light/dark setting for the whole site (ADR 0021). The hub, Visual and,
// later, Product all read and change this, so a choice made on one page holds on
// the next. Dark ("night") is the default.
//
// It is a tiny store instead of React context, so a page outside the hub can use
// it without a provider, and so every reader updates together.

// Kept as the hub's old key so a choice someone already made is not lost.
export const THEME_KEY = "hub-theme";

let current;
const listeners = new Set();

function read() {
  if (current === undefined) {
    try {
      current = localStorage.getItem(THEME_KEY) === "light" ? "light" : "night";
    } catch {
      current = "night";
    }
  }
  return current;
}

function emit() {
  listeners.forEach((listener) => listener());
}

function subscribe(listener) {
  listeners.add(listener);
  // Another tab changed it.
  const onStorage = (event) => {
    if (event.key !== THEME_KEY) return;
    current = event.newValue === "light" ? "light" : "night";
    listener();
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

/** "light" or "night". Changing it re-renders every component that reads it. */
export function useSiteTheme() {
  return useSyncExternalStore(subscribe, read, () => "night");
}

export function toggleSiteTheme() {
  current = read() === "light" ? "night" : "light";
  try {
    localStorage.setItem(THEME_KEY, current);
  } catch {
    // Private window or blocked storage: it holds until the tab closes.
  }
  emit();
}
