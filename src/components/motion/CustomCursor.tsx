"use client";

import { useEffect, useRef } from "react";
import { usePointerFine } from "@/hooks/usePointerFine";
import { useReducedMotion } from "@/hooks/useReducedMotion";

type CursorState = "default" | "link" | "view" | "talk" | "drag";

const TARGET_SCALE: Record<CursorState, number> = {
  default: 1,
  link: 1.45,
  view: 2.35,
  talk: 2.35,
  drag: 2.35,
};

const LABEL: Record<CursorState, string> = {
  default: "",
  link: "",
  view: "VIEW",
  talk: "TALK",
  drag: "DRAG",
};

const INTERACTIVE_SELECTOR =
  'a, button, [role="button"], input, textarea, select, [data-cursor]';

/**
 * Minimal desktop-only custom cursor. Native cursor is hidden on
 * fine-pointer devices; disabled entirely under reduced motion.
 */
export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  const fine = usePointerFine();
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!fine || reduced) return;

    const root = document.documentElement;
    root.classList.add("has-custom-cursor");

    const state = { current: "default" as CursorState };
    const pos = { x: -100, y: -100 };
    const dotPos = { x: -100, y: -100 };
    const ring = { x: -100, y: -100 };
    const scale = { current: 1 };
    let started = false;

    const setTransform = (el: HTMLElement, x: number, y: number, s: number) => {
      el.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%) scale(${s})`;
    };

    const onPointerMove = (event: PointerEvent) => {
      pos.x = event.clientX;
      pos.y = event.clientY;
      if (!started) {
        started = true;
        ring.x = event.clientX;
        ring.y = event.clientY;
        dotPos.x = event.clientX;
        dotPos.y = event.clientY;
        const dot = dotRef.current;
        const ringEl = ringRef.current;
        if (dot) dot.style.opacity = "1";
        if (ringEl) ringEl.style.opacity = "1";
      }
    };

    const getState = (target: EventTarget | null): CursorState => {
      const el = target as HTMLElement | null;
      const hit = el?.closest?.(INTERACTIVE_SELECTOR) as HTMLElement | null;
      if (!hit) return "default";
      const cursor = hit.getAttribute("data-cursor");
      if (cursor === "view" || cursor === "talk" || cursor === "drag") {
        return cursor;
      }
      return "link";
    };

    const onOver = (event: MouseEvent) => {
      state.current = getState(event.target);
      if (labelRef.current) labelRef.current.textContent = LABEL[state.current];
    };

    const onLeave = () => {
      state.current = "default";
      if (labelRef.current) labelRef.current.textContent = "";
    };

    let raf = 0;
    let last = performance.now();
    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000 || 0.016);
      last = now;

      const targetScale = TARGET_SCALE[state.current];
      scale.current +=
        (targetScale - scale.current) * (1 - Math.exp(-8 * dt));

      // Frame-rate independent damping. The ring trails gently behind the
      // pointer; the dot follows close but smoothly — no more zippy feel.
      const dampDot = 1 - Math.exp(-18 * dt);
      const dampRing = 1 - Math.exp(-7 * dt);
      dotPos.x += (pos.x - dotPos.x) * dampDot;
      dotPos.y += (pos.y - dotPos.y) * dampDot;
      ring.x += (pos.x - ring.x) * dampRing;
      ring.y += (pos.y - ring.y) * dampRing;

      const dot = dotRef.current;
      const ringEl = ringRef.current;
      if (dot) {
        if (started) {
          setTransform(dot, dotPos.x, dotPos.y, 1);
          dot.dataset.state = state.current;
          dot.style.opacity =
            state.current === "default"
              ? "1"
              : String(1 - Math.min(1, scale.current / 2.8));
        } else {
          dot.style.opacity = "0";
        }
      }
      if (ringEl) {
        setTransform(ringEl, ring.x, ring.y, scale.current);
        ringEl.dataset.state = state.current;
      }
      raf = window.requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.addEventListener("mouseover", onOver, { passive: true });
    document.addEventListener("mouseout", onLeave, { passive: true });
    raf = window.requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onLeave);
      window.cancelAnimationFrame(raf);
      root.classList.remove("has-custom-cursor");
    };
  }, [fine, reduced]);

  if (!fine || reduced) return null;

  return (
    <>
      <div
        ref={dotRef}
        aria-hidden
        className="cursor-dot pointer-events-none fixed left-0 top-0 z-[var(--z-cursor)] h-1.5 w-1.5 rounded-full opacity-0"
        data-state="default"
        style={{
          willChange: "transform",
          transition: "opacity 160ms ease",
        }}
      />
      <div
        ref={ringRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[var(--z-cursor)] flex h-10 w-10 items-center justify-center rounded-full border-[1.5px] opacity-0 transition-colors duration-300"
        data-state="default"
        style={{ willChange: "transform" }}
      >
        <span
          ref={labelRef}
          className="select-none font-mono text-[0.5625rem] font-medium tracking-[0.18em]"
        />
      </div>
      <style>{`
        .cursor-dot {
          background: var(--accent-soft);
          box-shadow: 0 0 10px 2px rgba(183, 216, 210, 0.5);
        }
        .cursor-dot[data-state="link"],
        .cursor-dot[data-state="talk"],
        .cursor-dot[data-state="drag"],
        .cursor-dot[data-state="view"] {
          background: var(--accent);
          box-shadow: 0 0 10px 2px rgba(215, 154, 85, 0.55);
        }
        [data-state="default"] {
          border-color: color-mix(in srgb, var(--foreground) 55%, transparent);
          background: color-mix(in srgb, var(--foreground) 6%, transparent);
        }
        [data-state="link"],
        [data-state="talk"],
        [data-state="drag"] {
          border-color: var(--accent);
          background: color-mix(in srgb, var(--accent) 14%, transparent);
          box-shadow: 0 0 18px -2px rgba(215, 154, 85, 0.45);
        }
        [data-state="view"] {
          border-color: var(--accent);
          background: color-mix(in srgb, var(--accent) 16%, transparent);
          box-shadow: 0 0 18px -2px rgba(215, 154, 85, 0.45);
        }
        [data-state="talk"] span,
        [data-state="drag"] span,
        [data-state="view"] span {
          color: var(--accent);
        }
      `}</style>
    </>
  );
}
