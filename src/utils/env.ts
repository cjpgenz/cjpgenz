/**
 * A boolean indicating if the code is currently running in a browser/client environment.
 * Useful for safely referencing browser-only APIs like localStorage, sessionStorage, window, or document.
 */
export const isBrowser = typeof window !== "undefined";
