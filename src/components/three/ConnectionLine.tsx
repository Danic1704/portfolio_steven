"use client";

import { Line } from "@react-three/drei";
import { useMemo } from "react";
import * as THREE from "three";

type ConnectionLineProps = {
  start: [number, number, number];
  end: [number, number, number];
  opacity?: number;
  color?: string;
};

/** A static architectural connection between two nodes. */
export function ConnectionLine({
  start,
  end,
  opacity = 0.34,
  color = "#2b323a",
}: ConnectionLineProps) {
  const points = useMemo(
    () => [new THREE.Vector3(...start), new THREE.Vector3(...end)],
    [start, end],
  );

  return (
    <Line
      points={points}
      color={color}
      lineWidth={1}
      transparent
      opacity={opacity}
    />
  );
}