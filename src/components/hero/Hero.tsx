"use client";

import { useCallback, useRef, useState, useSyncExternalStore, type PointerEvent as ReactPointerEvent } from "react";
import dynamic from "next/dynamic";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Container } from "@/components/layout/Container";
import { profile } from "@/data/profile";
import { useTheme } from "@/hooks/useTheme";
import { useIsMobile, useIsTablet } from "@/hooks/useMediaQuery";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { messages, type Locale } from "@/i18n/messages";
import { scrollProgress } from "@/lib/scroll-progress";
import { scrollToTarget } from "@/lib/lenis";

gsap.registerPlugin(ScrollTrigger, useGSAP);

function isWebGLAvailable(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const canvas = document.createElement("canvas");
    return Boolean(
      window.WebGLRenderingContext &&
        (canvas.getContext("webgl2") ||
          canvas.getContext("webgl") ||
          canvas.getContext("experimental-webgl")),
    );
  } catch {
    return false;
  }
}

const subscribeWebGL = () => () => {};

const HeroScene = dynamic(
  () =>
    import("@/components/hero/HeroScene").then((mod) => ({ default: mod.HeroScene })),
  {
    ssr: false,
    loading: () => (
      <div aria-hidden className="absolute inset-0 scene-fallback" />
    ),
  },
);

const StaticFallback = () => (
  <div aria-hidden className="absolute inset-0 scene-fallback" />
);

export function Hero({ locale }: { locale: Locale }) {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const leadRef = useRef<HTMLParagraphElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const reducedMotion = useReducedMotion();
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();
  const theme = useTheme();
  const [pointer, setPointer] = useState({ x: 0, y: 0 });
  const webglOk = useSyncExternalStore(
    subscribeWebGL,
    isWebGLAvailable,
    () => false,
  );
  const m = messages[locale];

  const quality = isMobile ? "minimal" : isTablet ? "reduced" : "full";

  const pointerRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number | null>(null);

  const onPointerMove = useCallback(
    (event: ReactPointerEvent<HTMLElement>) => {
      if (reducedMotion || isMobile) return;
      const rect = sectionRef.current?.getBoundingClientRect();
      if (!rect) return;
      const nx = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      const ny = -(((event.clientY - rect.top) / rect.height) * 2 - 1);
      const x = Math.max(-1, Math.min(1, nx));
      const y = Math.max(-1, Math.min(1, ny));
      pointerRef.current = { x, y: y * 0.7 };
      if (rafRef.current !== null) return;
      rafRef.current = requestAnimationFrame(() => {
        setPointer(pointerRef.current);
        rafRef.current = null;
      });
    },
    [isMobile, reducedMotion],
  );

  useGSAP(
    () => {
      if (reducedMotion) {
        gsap.set(
          [canvasRef.current, titleRef.current, metaRef.current, leadRef.current, scrollRef.current],
          {
            autoAlpha: 1,
          },
        );
        gsap.set(titleRef.current?.children ?? [], { autoAlpha: 1, y: 0 });
        return;
      }

      const titleLines = titleRef.current
        ? Array.from(titleRef.current.children).filter(
            (el) => !(el as HTMLElement).classList.contains("sr-only"),
          )
        : [];
      const lead = leadRef.current;

      gsap.set(canvasRef.current, { autoAlpha: 0 });
      gsap.set(titleLines, { autoAlpha: 0, y: 64 });
      gsap.set([metaRef.current, lead, scrollRef.current], { autoAlpha: 0, y: 20 });

      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        delay: 0.15,
      });
      tl.to(canvasRef.current, { autoAlpha: 1, duration: 1.6 }, 0)
        .to(titleLines, {
          autoAlpha: 1,
          y: 0,
          duration: 1.15,
          stagger: 0.12,
        }, "-=1.1")
        .to(metaRef.current, { autoAlpha: 1, y: 0, duration: 0.9 }, "-=0.7")
        .to(lead, { autoAlpha: 1, y: 0, duration: 0.9 }, "-=0.6")
        .to(scrollRef.current, { autoAlpha: 1, y: 0, duration: 0.8 }, "-=0.5");

      // Cinematic exit — hero content drifts up, type breathes, 3D follows
      const exit = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
          onUpdate: (self) => {
            scrollProgress.value = Math.min(1, Math.max(0, self.progress));
          },
        },
      });
      exit
        .to(titleRef.current, {
          yPercent: -12,
          scale: 0.98,
          ease: "none",
        }, 0)
        .to([metaRef.current, lead, scrollRef.current], {
          autoAlpha: 0.25,
          y: -30,
          ease: "none",
        }, 0);

      return () => {
        scrollProgress.value = 0;
        tl.kill();
        exit.kill();
        if (rafRef.current) {
          cancelAnimationFrame(rafRef.current);
          rafRef.current = null;
        }
      };
    },
    { scope: sectionRef, dependencies: [reducedMotion] },
  );

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-dvh flex-col overflow-hidden bg-background"
      aria-label={m.hero.intro}
      onPointerMove={onPointerMove}
    >
      {/* 3D architecture layer */}
      <div
        ref={canvasRef}
        className="pointer-events-none absolute inset-0 z-[var(--z-canvas)]"
        aria-hidden
      >
        {webglOk ? (
          <HeroScene
            pointer={pointer}
            quality={quality}
            reducedMotion={reducedMotion}
            theme={theme}
          />
        ) : (
          <StaticFallback />
        )}
        {/* Readability vignette */}
        <div className="absolute inset-0 scene-vignette" />
      </div>

      <Container className="relative z-[var(--z-hero-content)] flex flex-1 flex-col">
        {/* Top meta row */}
        <div
          ref={metaRef}
          className="mt-24 flex items-center justify-between md:mt-28"
        >
          <span className="label hero-text-shadow text-muted">{m.hero.eyebrow}</span>
          <span className="label hero-text-shadow hidden text-muted sm:block">
            {m.hero.location}
          </span>
        </div>

        {/* Title block */}
        <div className="flex flex-1 flex-col items-center justify-center pb-16 text-center">
          <h1
            ref={titleRef}
            className="display-hero will-change-transform text-foreground"
          >
            <span className="sr-only">{profile.name} — </span>
            <span className="hero-text-shadow block">{m.hero.line1}</span>
            <span className="hero-text-shadow block">{m.hero.line2}</span>
            <span className="hero-text-shadow mt-2 block text-[0.42em] font-medium tracking-[-0.04em] text-muted">
              {m.hero.lead}
            </span>
          </h1>

          <p
            ref={leadRef}
            className="hero-text-shadow mt-9 font-mono text-[0.6875rem] uppercase tracking-[0.28em] text-accent md:mt-10 md:text-xs"
          >
            {m.hero.tagline}
          </p>

          <p className="hero-text-shadow mt-5 max-w-md text-pretty text-sm leading-relaxed text-muted md:max-w-lg md:text-base">
            {m.hero.supporting}
          </p>
        </div>
      </Container>

      {/* Scroll indicator */}
      <div
        ref={scrollRef}
        className="relative z-[var(--z-hero-content)] flex justify-center pb-9"
      >
        <a
          href="#work"
          onClick={(e) => {
            e.preventDefault();
            scrollToTarget("#work");
          }}
          className="group flex flex-col items-center gap-2"
          aria-label={m.hero.scroll}
        >
          <span className="label hero-text-shadow text-muted transition-colors duration-300 group-hover:text-foreground">
            {m.hero.scroll}
          </span>
          <span
            aria-hidden
            className="text-muted transition-colors duration-300 group-hover:text-accent"
            style={{
              animation: reducedMotion ? undefined : "scroll-pulse 2.4s var(--ease-expo) infinite",
            }}
          >
            ↓
          </span>
        </a>
      </div>

      <style>{`
        @keyframes scroll-pulse {
          0%, 100% { opacity: 0.35; transform: translateY(0); }
          50% { opacity: 0.9; transform: translateY(6px); }
        }
      `}</style>
    </section>
  );
}