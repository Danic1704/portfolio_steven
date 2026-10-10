import type Lenis from "lenis";

/**
 * Registry so non-Lenis-aware components (nav links, menu, footer)
 * can drive smooth scrolling and pause/resume the scroll engine.
 */
let lenisInstance: Lenis | null = null;

export function registerLenis(instance: Lenis | null) {
  lenisInstance = instance;
}

export function getLenis(): Lenis | null {
  return lenisInstance;
}

export function scrollToTarget(target: string) {
  const lenis = lenisInstance;
  if (lenis) {
    lenis.scrollTo(target, { offset: -64, duration: 1.25 });
  } else {
    document
      .querySelector(target)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

export function stopScroll() {
  lenisInstance?.stop();
}

export function startScroll() {
  lenisInstance?.start();
}