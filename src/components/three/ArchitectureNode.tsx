"use client";

import { useFrame } from "@react-three/fiber";
import type { ReactNode } from "react";
import { useRef } from "react";
import * as THREE from "three";

type ArchitectureNodeProps = {
  position: [number, number, number];
  scale?: [number, number, number];
  rotation?: [number, number, number];
  color?: string;
  roughness?: number;
  metalness?: number;
  floatSeed?: number;
  floatAmp?: number;
  reducedMotion?: boolean;
  children?: ReactNode;
};

/**
 * A single modular block in the architecture system. Floats slowly;
 * shadows enabled except at minimal quality.
 */
export function ArchitectureNode({
  position,
  scale = [1, 1, 1],
  rotation = [0, 0, 0],
  color = "#13171c",
  roughness = 0.74,
  metalness = 0.14,
  floatSeed = 0,
  floatAmp = 0.06,
  reducedMotion = false,
  children,
}: ArchitectureNodeProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const baseY = position[1];

  useFrame((state) => {
    if (!meshRef.current || reducedMotion) return;
    const t = state.clock.elapsedTime * 0.3 + floatSeed;
    meshRef.current.position.y = baseY + Math.sin(t) * floatAmp;
  });

  return (
    <mesh
      ref={meshRef}
      position={position}
      rotation={rotation}
      scale={scale}
      castShadow
      receiveShadow
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial
        color={color}
        roughness={roughness}
        metalness={metalness}
        envMapIntensity={0.35}
      />
      {children}
    </mesh>
  );
}