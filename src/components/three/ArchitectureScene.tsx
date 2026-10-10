"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { ContactShadows, Edges } from "@react-three/drei";
import { Bloom, EffectComposer, Vignette } from "@react-three/postprocessing";
import { ArchitectureNode } from "@/components/three/ArchitectureNode";
import { ConnectionLine } from "@/components/three/ConnectionLine";
import { DataDot } from "@/components/three/DataDot";
import { FloatingPanel } from "@/components/three/FloatingPanel";
import { PostFxBoundary } from "@/components/three/PostFxBoundary";
import { SceneCamera } from "@/components/three/SceneCamera";
import { scrollProgress } from "@/lib/scroll-progress";
import { getScenePalette } from "@/lib/scene-palette";
import type { Theme } from "@/lib/theme";

type ArchitectureSceneProps = {
  pointer: { x: number; y: number };
  quality: "full" | "reduced" | "minimal";
  reducedMotion?: boolean;
  theme: Theme;
};

/** Warm light source — the reference image's sun, abstracted. */
function LightSource({
  position,
  reducedMotion,
  quality,
  theme,
}: {
  position: [number, number, number];
  reducedMotion: boolean;
  quality: "full" | "reduced" | "minimal";
  theme: Theme;
}) {
  const ref = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const P = getScenePalette(theme);

  useFrame((state) => {
    if (reducedMotion) return;
    const t = state.clock.elapsedTime * 0.4;
    if (ref.current) {
      ref.current.position.y = position[1] + Math.sin(t) * 0.08;
    }
    if (glowRef.current) {
      glowRef.current.position.y = position[1] + Math.sin(t) * 0.08;
      const s = 1 + Math.sin(state.clock.elapsedTime * 0.7) * 0.06;
      glowRef.current.scale.setScalar(s);
    }
  });

  return (
    <group position={[0, 0, 0]}>
      <mesh ref={ref} position={position}>
        <sphereGeometry args={[0.17, 32, 32]} />
        <meshBasicMaterial color={P.sunCore} />
      </mesh>
      {quality === "full" && (
        <mesh ref={glowRef} position={position}>
          <sphereGeometry args={[0.5, 24, 24]} />
          <meshBasicMaterial
            color={P.warm}
            transparent
            opacity={Math.min(P.sunGlowOpacity, 0.03)}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      )}
    </group>
  );
}

export function ArchitectureScene({
  pointer,
  quality,
  reducedMotion = false,
  theme,
}: ArchitectureSceneProps) {
  const groupRef = useRef<THREE.Group>(null);
  const full = quality === "full";
  const extras = quality !== "minimal";
  const P = getScenePalette(theme);
  const gl = useThree((state) => state.gl);

  // Dark materials are easily crushed by ACESFilmicToneMapping (r3f default) —
  // carry the theme exposure here each frame (light theme keeps 1).
  useFrame((state) => {
    state.gl.toneMappingExposure = P.exposure;
  });

  // If the WebGL context is lost (driver hiccup, GPU restart), postprocessing
  // v6 throws reading getContextAttributes().alpha — unmount the composer
  // before that can happen and remount it once the context is restored.
  // <PostFxBoundary> remains as a backstop for the mount/loss race.
  const [fxHealthy, setFxHealthy] = useState(true);
  useEffect(() => {
    const el = gl.domElement;
    if (!el) return;
    const onLost = () => setFxHealthy(false);
    const onRestored = () => setFxHealthy(true);
    el.addEventListener("webglcontextlost", onLost);
    el.addEventListener("webglcontextrestored", onRestored);
    return () => {
      el.removeEventListener("webglcontextlost", onLost);
      el.removeEventListener("webglcontextrestored", onRestored);
    };
  }, [gl]);

  const baseX = quality === "full" ? 3.35 : quality === "reduced" ? 2.3 : 0;
  const baseScale = quality === "minimal" ? 0.72 : 1;

  useFrame(() => {
    const group = groupRef.current;
    if (!group) return;
    const progress = reducedMotion ? 0 : Math.min(0.9, scrollProgress.value);
    group.position.set(baseX, -progress * 0.6, 0);
    group.rotation.x = -progress * 0.05;
  });

  return (
    <>
      <color attach="background" args={[P.background]} />
      <fog attach="fog" args={[P.background, 10, 24]} />

      {/* Cinematic lighting */}
      <ambientLight intensity={P.lightAmbient} color={P.ambient} />
      <hemisphereLight
        color={P.hemiSky}
        groundColor={P.hemiGround}
        intensity={P.lightHemi}
      />
      <directionalLight
        position={[-4, 5, 3]}
        intensity={P.lightDir}
        color={P.directional}
        castShadow
        shadow-mapSize={[768, 768]}
      />
      <pointLight
        position={[2.8, 2.4, 2.4]}
        intensity={P.lightWarm}
        color={P.warm}
        distance={13}
        decay={2}
      />
      {extras && (
        <pointLight
          position={[-3.4, -0.4, 1.8]}
          intensity={P.lightCool}
          color={P.cool}
          distance={12}
          decay={2}
        />
      )}
      <pointLight
        position={[0, -1.4, 2]}
        intensity={extras ? P.lightGray : P.lightGrayAlt}
        color={P.gray}
        distance={11}
        decay={2}
      />

      <SceneCamera pointer={pointer} reducedMotion={reducedMotion} />

      <LightSource
        position={[2.35, 2.55, -1.7]}
        reducedMotion={reducedMotion}
        quality={quality}
        theme={theme}
      />

      <group ref={groupRef} position={[baseX, 0, 0]} scale={baseScale}>
        <group rotation={[0, extras ? -0.14 : -0.1, 0]}>
          {/* UI layer */}
          <ArchitectureNode
            position={[0, 2.02, 0]}
            scale={[2.55, 0.14, 1.15]}
            color={P.ui}
            floatSeed={0.2}
            floatAmp={0.05}
            reducedMotion={reducedMotion}
          >
            {full && <Edges scale={1.02} color={P.edge} />}
          </ArchitectureNode>

          {extras && (
            <FloatingPanel
              position={[0.62, 1.72, 0.42]}
              size={[1.45, 0.85]}
              rotation={[-Math.PI / 2.4, 0, 0]}
              color={P.floatingPanel}
              floatSeed={0.8}
              reducedMotion={reducedMotion}
            />
          )}

          {/* STATE */}
          <ArchitectureNode
            position={[0, 1.18, 0]}
            scale={[1.75, 0.52, 1.02]}
            color={P.state}
            floatSeed={0.7}
            floatAmp={0.05}
            reducedMotion={reducedMotion}
          />

          {/* BFF hub */}
          <ArchitectureNode
            position={[0, 0.32, 0]}
            scale={[2.18, 0.42, 1.3]}
            color={P.bff}
            floatSeed={1.2}
            floatAmp={0.04}
            reducedMotion={reducedMotion}
          >
            {full && <Edges scale={1.03} color={P.bffEdge} />}
          </ArchitectureNode>

          {/* Spine */}
          <mesh position={[0, 1.15, -0.95]} castShadow>
            <boxGeometry args={[0.07, 2.9, 0.07]} />
            <meshStandardMaterial
              color={P.spine}
              roughness={0.6}
              metalness={0.3}
            />
          </mesh>

          {/* API branch */}
          {extras && (
            <>
              <ArchitectureNode
                position={[-1.48, -0.62, 0.15]}
                scale={[0.88, 0.5, 0.88]}
                color={P.api}
                floatSeed={1.8}
                floatAmp={0.05}
                reducedMotion={reducedMotion}
              />
              <mesh position={[-1.48, -0.62, 0.15]} castShadow>
                <sphereGeometry args={[0.09, 20, 20]} />
                <meshStandardMaterial
                  color={P.orb}
                  roughness={0.5}
                  metalness={0.25}
                />
              </mesh>
            </>
          )}

          {/* AI branch */}
          {extras && (
            <>
              <ArchitectureNode
                position={[1.48, -0.62, -0.08]}
                scale={[0.88, 0.5, 0.88]}
                color={P.ai}
                floatSeed={2.2}
                floatAmp={0.05}
                reducedMotion={reducedMotion}
              />
              <mesh position={[1.48, -0.62, -0.08]} castShadow>
                <sphereGeometry args={[0.09, 20, 20]} />
                <meshStandardMaterial
                  color={P.aiOrb}
                  roughness={0.45}
                  metalness={0.2}
                  emissive={full ? "#d79a55" : "#000000"}
                  emissiveIntensity={full ? 0.35 : 0}
                />
              </mesh>
            </>
          )}

          {/* DATA foundation */}
          <ArchitectureNode
            position={[0, -1.6, 0]}
            scale={[3.15, 0.22, 1.65]}
            color={P.data}
            floatSeed={2.6}
            floatAmp={0.03}
            reducedMotion={reducedMotion}
          />

          {/* Connections */}
          <ConnectionLine
            start={[0, 1.94, 0]}
            end={[0, 1.45, 0]}
            opacity={0.4}
            color={P.edge}
          />
          <ConnectionLine
            start={[0, 0.93, 0]}
            end={[0, 0.54, 0]}
            opacity={0.4}
            color={P.edge}
          />
          <ConnectionLine
            start={[0, 0.11, 0]}
            end={[0, -1.48, 0]}
            opacity={0.3}
            color={P.edge}
          />

          {extras && (
            <>
              <ConnectionLine
                start={[0, 0.1, 0]}
                end={[-1.48, -0.38, 0.15]}
                opacity={0.26}
                color={P.edge}
              />
              <ConnectionLine
                start={[0, 0.1, 0]}
                end={[1.48, -0.38, -0.08]}
                opacity={0.26}
                color={P.edge}
              />
              <ConnectionLine
                start={[-1.48, -0.88, 0.15]}
                end={[-1.05, -1.47, 0]}
                opacity={0.24}
                color={P.edge}
              />
              <ConnectionLine
                start={[1.48, -0.88, -0.08]}
                end={[1.05, -1.47, 0]}
                opacity={0.24}
                color={P.edge}
              />
            </>
          )}

          {/* Data in flight */}
          {full && (
            <>
              <DataDot
                start={[0, 0.1, 0]}
                end={[-1.48, -0.38, 0.15]}
                offset={0.2}
                speed={0.16}
              />
              <DataDot
                start={[0, 0.1, 0]}
                end={[1.48, -0.38, -0.08]}
                offset={0.6}
                speed={0.16}
              />
              <DataDot
                start={[0, 1.94, 0]}
                end={[0, 1.45, 0]}
                offset={0.4}
                speed={0.2}
                color={P.dataDotMint}
              />
            </>
          )}
        </group>
      </group>

      <ContactShadows
        position={[baseX, -2.15, 0]}
        opacity={P.contactOpacity}
        scale={quality === "minimal" ? 6 : 9}
        blur={2.6}
        far={5}
        resolution={256}
        color={P.contactShadow}
      />

      {full && fxHealthy && (
        <PostFxBoundary>
          <EffectComposer multisampling={0}>
            <Bloom
              intensity={P.bloomIntensity}
              luminanceThreshold={P.bloomThreshold}
              luminanceSmoothing={P.bloomSmoothing}
              mipmapBlur
              radius={P.bloomRadius}
            />
            <Vignette
              eskil={false}
              offset={0.22}
              darkness={P.vignetteDarkness}
            />
          </EffectComposer>
        </PostFxBoundary>
      )}
    </>
  );
}