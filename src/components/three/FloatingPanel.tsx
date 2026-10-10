"use client";

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

type FloatingPanelProps = {
  position: [number, number, number];
  size: [number, number];
  rotation?: [number, number, number];
  color?: string;
  floatSeed?: number;
  reducedMotion?: boolean;
};

/** A thin interface-like plane, subtly drifting and tilting. */
export function FloatingPanel({
  position,
  size,
  rotation = [0, 0, 0],
  color = "#11151a",
  floatSeed = 0,
  reducedMotion = false,
}: FloatingPanelProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const base = useRef(new THREE.Vector3(...position));

  useFrame((state) => {
    if (!meshRef.current || reducedMotion) return;
    const t = state.clock.elapsedTime * 0.26 + floatSeed;
    meshRef.current.position.y = base.current.y + Math.sin(t) * 0.05;
    meshRef.current.rotation.x = rotation[0] + Math.sin(t * 0.5) * 0.012;
    meshRef.current.rotation.z = rotation[2] + Math.sin(t * 0.4) * 0.01;
  });

  return (
    <mesh ref={meshRef} position={position} rotation={rotation} receiveShadow>
      <planeGeometry args={size} />
      <meshStandardMaterial
        color={color}
        roughness={0.82}
        metalness={0.1}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}