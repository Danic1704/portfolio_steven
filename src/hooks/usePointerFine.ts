"use client";

import { useSyncExternalStore } from "react";

function subscribePointerFine(onStoreChange: () => void) {
  const mql = window.matchMedia("(pointer: fine)");
  mql.addEventListener("change", onStoreChange);
  return () => mql.removeEventListener("change", onStoreChange);
}

function getPointerFineSnapshot(): boolean {
  return window.matchMedia("(pointer: fine)").matches;
}

/**
 * True when the primary input is a fine pointer (mouse) —
 * used to gate the custom cursor and hover-driven effects.
 */
export function usePointerFine(): boolean {
  return useSyncExternalStore(
    subscribePointerFine,
    getPointerFineSnapshot,
    () => false,
  );
}