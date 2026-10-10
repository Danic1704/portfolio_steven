/**
 * Shared, mutable scroll progress used to drive the 3D scene from
 * GSAP ScrollTrigger without prop-drilling through the canvas tree.
 */
export const scrollProgress = {
  value: 0,
};