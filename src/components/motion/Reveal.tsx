"use client";

import type { ReactNode } from "react";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/hooks/useReducedMotion";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  duration?: number;
  stagger?: number;
  scopeRef?: React.RefObject<HTMLElement | null>;
};

/**
 * Scroll-triggered reveal. Content is visible by default (progressive
 * enhancement); GSAP fades/translates it in as it enters the viewport.
 * Reduced-motion leaves everything visible.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 36,
  duration = 1.1,
  stagger = 0,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      if (reduced) return;
      const el = ref.current;
      if (!el) return;
      gsap.fromTo(
        el,
        { y, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration,
          ease: "power3.out",
          delay,
          stagger,
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            once: true,
          },
        },
      );
    },
    { scope: ref, dependencies: [reduced, delay, y, duration, stagger] },
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}