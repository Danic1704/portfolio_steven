"use client";

import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

type DataDotProps = {
  start: [number, number, number];
  end: [number, number, number];
  offset?: number;
  speed?: number;
  color?: string;
  reducedMotion?: boolean;
};

/**
 * A small warm packet travelling the connection between two nodes —
 * abstract "data in flight". Fades at each endpoint.
 */
export function DataDot({
  start,
  end,
  offset = 0,
  speed = 0.14,
  color = "#d79a55",
  reducedMotion = false,
}: DataDotProps) {
  const ref = useRef<THREE.Mesh>(null);
  const vector = useMemo(() => new THREE.Vector3(), []);

  const a = useMemo(() => new THREE.Vector3(...start), [start]);
  const b = useMemo(() => new THREE.Vector3(...end), [end]);

  useFrame((state) => {
    if (reducedMotion || !ref.current) return;
    const t = (state.clock.elapsedTime * speed + offset) % 1;
    vector.lerpVectors(a, b, t);
    ref.current.position.copy(vector);
    const material = ref.current.material as THREE.MeshBasicMaterial;
    material.opacity = Math.sin(t * Math.PI) * 0.8;
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.032, 12, 12]} />
      <meshBasicMaterial color={color} transparent opacity={0} />
    </mesh>
  );
}