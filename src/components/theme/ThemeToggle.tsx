"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";
import { toggleTheme } from "@/lib/theme";

type ThemeToggleProps = {
  lightLabel: string;
  darkLabel: string;
};

export function ThemeToggle({ lightLabel, darkLabel }: ThemeToggleProps) {
  const theme = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? lightLabel : darkLabel}
      title={isDark ? lightLabel : darkLabel}
      className="flex size-9 items-center justify-center rounded-full border border-line text-muted transition-colors duration-300 hover:border-accent hover:text-accent"
    >
      {isDark ? (
        <Sun className="size-4" aria-hidden />
      ) : (
        <Moon className="size-4" aria-hidden />
      )}
    </button>
  );
}