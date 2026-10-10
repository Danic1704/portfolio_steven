"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { ArchitectureScene } from "@/components/three/ArchitectureScene";
import { CanvasErrorBoundary } from "@/components/three/CanvasErrorBoundary";
import { suppressThreeClockDeprecation } from "@/lib/silence-three-warnings";
import type { Theme } from "@/lib/theme";

// three 0.185 deprecates THREE.Clock, which @react-three/fiber still instantiates
// internally at Canvas mount — silence that single warning (see lib module).
suppressThreeClockDeprecation();

type SceneQuality = "full" | "reduced" | "minimal";

type HeroSceneProps = {
  pointer: { x: number; y: number };
  quality: SceneQuality;
  reducedMotion?: boolean;
  theme: Theme;
};

const DPR: Record<SceneQuality, [number, number]> = {
  full: [1, 1.75],
  reduced: [1, 1.5],
  minimal: [1, 1],
};

const StaticFallback = () => (
  <div aria-hidden className="absolute inset-0 scene-fallback" />
);

export function HeroScene({
  pointer,
  quality,
  reducedMotion = false,
  theme,
}: HeroSceneProps) {
  return (
    <CanvasErrorBoundary fallback={<StaticFallback />}>
      <Canvas
        dpr={DPR[quality]}
        camera={{ position: [0, 0.25, 6.4], fov: 42, near: 0.05, far: 120 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
          stencil: false,
          depth: true,
          preserveDrawingBuffer: false,
        }}
        shadows={quality === "minimal" ? false : "percentage"}
        style={{ position: "absolute", inset: 0 }}
        aria-hidden
      >
        <Suspense fallback={null}>
          <ArchitectureScene
            pointer={pointer}
            quality={quality}
            reducedMotion={reducedMotion}
            theme={theme}
          />
        </Suspense>
      </Canvas>
    </CanvasErrorBoundary>
  );
}