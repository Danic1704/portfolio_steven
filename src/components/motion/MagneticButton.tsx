"use client";

import type { PointerEvent, ReactNode } from "react";
import { useRef } from "react";
import gsap from "gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";

type MagneticButtonProps = {
  children: ReactNode;
  className?: string;
  strength?: number;
};

/**
 * Subtle magnetic pull — the element drifts a few pixels toward the
 * pointer and springs back on leave. Disabled under reduced motion.
 */
export function MagneticButton({
  children,
  className,
  strength = 0.28,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const onMove = (event: PointerEvent<HTMLDivElement>) => {
    if (reduced || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (event.clientX - (rect.left + rect.width / 2)) * strength;
    const y = (event.clientY - (rect.top + rect.height / 2)) * strength;
    gsap.to(ref.current, {
      x,
      y,
      duration: 0.6,
      ease: "power3.out",
      overwrite: "auto",
    });
  };

  const onLeave = () => {
    if (reduced || !ref.current) return;
    gsap.to(ref.current, {
      x: 0,
      y: 0,
      duration: 0.9,
      ease: "elastic.out(1, 0.35)",
      overwrite: "auto",
    });
  };

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className={className}
      style={{ willChange: "transform" }}
    >
      {children}
    </div>
  );
}