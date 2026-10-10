"use client";

import { useSyncExternalStore } from "react";
import { readTheme, type Theme } from "@/lib/theme";

function subscribe(onStoreChange: () => void) {
  window.addEventListener("sd-theme-change", onStoreChange);
  return () => window.removeEventListener("sd-theme-change", onStoreChange);
}

export function useTheme(): Theme {
  return useSyncExternalStore(subscribe, readTheme, () => "dark");
}