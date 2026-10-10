/**
 * Suppresses a single deprecation console warning emitted by third-party
 * internals we cannot configure away:
 *
 *   "THREE.Clock: This module has been deprecated. Please use THREE.Timer instead."
 *
 * @react-three/fiber (^9.7, latest 9.8) still instantiates `THREE.Clock` in its
 * internal store at Canvas mount; three ^0.185 deprecates it. There is no
 * configuration hook to replace the clock, and the warning fires on every page
 * load where the hero scene mounts. THREE.Clock remains fully functional, so
 * the filter only drops this exact message and pipes everything else through.
 */
const CLOCK_WARNING_MARKER = "THREE.Clock";

let installed = false;

export function suppressThreeClockDeprecation() {
  if (installed || typeof window === "undefined") return;
  installed = true;

  const originalWarn = console.warn.bind(console);
  console.warn = (...args: unknown[]) => {
    const first = typeof args[0] === "string" ? args[0] : "";
    if (first.includes(CLOCK_WARNING_MARKER) && first.includes("deprecated")) {
      return;
    }
    originalWarn(...args);
  };
}