"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import { scrollProgress } from "@/lib/scroll-progress";

type SceneCameraProps = {
  pointer: { x: number; y: number };
  reducedMotion?: boolean;
};

const BASE = new THREE.Vector3(0, 0.25, 6.4);
const LOOK = new THREE.Vector3(0, 0.1, 0);

/**
 * Cinematic camera. Subtle pointer parallax (lerped), and a slow
 * pull-back + rise driven by the hero→content scroll transition.
 */
export function SceneCamera({ pointer, reducedMotion }: SceneCameraProps) {
  const { camera } = useThree();
  const current = useRef(new THREE.Vector3().copy(BASE));
  const lookAt = useRef(new THREE.Vector3().copy(LOOK));

  useFrame((_, delta) => {
    const damp = reducedMotion ? 1 : 1 - Math.exp(-3.6 * delta);
    const progress = reducedMotion ? 0 : Math.min(0.9, scrollProgress.value);

    const targetX = BASE.x + pointer.x * 0.42;
    const targetY = BASE.y + pointer.y * 0.26 + progress * 0.25;
    const targetZ = BASE.z + progress * 0.4;

    current.current.x = THREE.MathUtils.lerp(current.current.x, targetX, damp);
    current.current.y = THREE.MathUtils.lerp(current.current.y, targetY, damp);
    current.current.z = THREE.MathUtils.lerp(current.current.z, targetZ, damp);

    lookAt.current.x = THREE.MathUtils.lerp(
      lookAt.current.x,
      pointer.x * 0.14,
      damp,
    );
    lookAt.current.y = THREE.MathUtils.lerp(
      lookAt.current.y,
      0.08 + pointer.y * 0.1 + progress * 0.05,
      damp,
    );

    camera.position.set(
      current.current.x,
      current.current.y,
      current.current.z,
    );
    camera.lookAt(lookAt.current);
  });

  return null;
}