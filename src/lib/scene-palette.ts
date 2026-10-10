import type { Theme } from "@/lib/theme";

/**
 * Theme-aware palette for the 3D architecture scene. The hero keeps its
 * cinematic structure in both modes: night (dark) and daylight (light).
 *
 * The dark materials are kept several stops above the page background so the
 * architecture reads clearly on `#080a0d`, and light intensities are tuned per
 * theme (dark needs a stronger key light to lift the surfaces).
 */
export const SCENE_PALETTE = {
  dark: {
    background: "#080a0d",
    ui: "#41525f",
    floatingPanel: "#2f3c49",
    state: "#394755",
    bff: "#4c5d74",
    api: "#2f3c49",
    ai: "#46351f",
    data: "#2c3742",
    edge: "#74848f",
    bffEdge: "#74848f",
    spine: "#394551",
    orb: "#5d6d7d",
    aiOrb: "#94693a",
    ambient: "#e8e8e8",
    hemiSky: "#38434f",
    hemiGround: "#080a0d",
    directional: "#f2f2f2",
    warm: "#d79a55",
    cool: "#b7d8d2",
    gray: "#8a9096",
    dataDotMint: "#b7d8d2",
    contactShadow: "#000000",
    contactOpacity: 0.42,
    vignetteDarkness: 0.5,
    // Lighting — dark mode needs a stronger key to lift the surfaces
    // (ACES tone mapping crushes dark materials otherwise).
    lightAmbient: 0.7,
    lightHemi: 0.8,
    lightDir: 1.15,
    lightWarm: 2.6,
    lightCool: 0.65,
    lightGray: 0.55,
    lightGrayAlt: 0.85,
    // Renderer exposure — applied in ArchitectureScene on theme change
    // (light theme keeps exposure 1).
    exposure: 1.4,
    // Light source ("sun") — kept restrained in dark so it never washes the title.
    sunCore: "#ffca8f",
    sunGlowOpacity: 0.11,
    // Bloom — subtle in dark: only the very core of the sun, tight halo.
    bloomIntensity: 0.16,
    bloomThreshold: 0.9,
    bloomSmoothing: 0.35,
    bloomRadius: 0.55,
  },
  light: {
    background: "#f5f4f0",
    ui: "#e9edf1",
    floatingPanel: "#f1f3f5",
    state: "#e6eaee",
    bff: "#e3e8ec",
    api: "#eef1f4",
    ai: "#f1e9df",
    data: "#e4e2da",
    edge: "#c7ced5",
    bffEdge: "#c2c9d0",
    spine: "#d3d8dd",
    orb: "#b9c0c7",
    aiOrb: "#c08a4a",
    ambient: "#ffffff",
    hemiSky: "#e9edf1",
    hemiGround: "#f5f4f0",
    directional: "#ffffff",
    warm: "#d79a55",
    cool: "#5fa398",
    gray: "#9aa1a8",
    dataDotMint: "#35887c",
    contactShadow: "#4a525a",
    contactOpacity: 0.26,
    vignetteDarkness: 0.18,
    lightAmbient: 0.34,
    lightHemi: 0.45,
    lightDir: 0.55,
    lightWarm: 1.45,
    lightCool: 0.4,
    lightGray: 0.32,
    lightGrayAlt: 0.5,
    exposure: 1,
    sunCore: "#ffca8f",
    sunGlowOpacity: 0.16,
    bloomIntensity: 0.22,
    bloomThreshold: 0.82,
    bloomSmoothing: 0.5,
    bloomRadius: 0.7,
  },
} as const satisfies Record<Theme, Record<string, unknown>>;

export type ScenePalette = (typeof SCENE_PALETTE)[keyof typeof SCENE_PALETTE];

export function getScenePalette(theme: Theme): ScenePalette {
  return SCENE_PALETTE[theme];
}