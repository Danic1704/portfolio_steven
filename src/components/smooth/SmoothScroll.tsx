"use client";

import type { ReactNode } from "react";
import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { registerLenis } from "@/lib/lenis";

gsap.registerPlugin(ScrollTrigger);

/**
 * Lenis smooth scrolling synced to GSAP ScrollTrigger.
 * Disabled entirely under prefers-reduced-motion.
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduce) return;

    const lenis = new Lenis({
      duration: 1.05,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    registerLenis(lenis);
    lenis.on("scroll", ScrollTrigger.update);

    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    // Re-measure triggers after layout settles.
    const refresh = window.setTimeout(() => ScrollTrigger.refresh(), 200);

    return () => {
      window.clearTimeout(refresh);
      gsap.ticker.remove(raf);
      registerLenis(null);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}