"use client";

import { Component, type ReactNode } from "react";

type CanvasErrorBoundaryProps = {
  fallback: ReactNode;
  children: ReactNode;
};

type CanvasErrorBoundaryState = {
  hasError: boolean;
};

/**
 * Catches failures inside the WebGL tree (context creation, shader
 * compiles, provider issues) and falls back to a static visual.
 */
export class CanvasErrorBoundary extends Component<
  CanvasErrorBoundaryProps,
  CanvasErrorBoundaryState
> {
  state: CanvasErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): CanvasErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch() {
    // Page remains fully usable without WebGL; log for diagnostics.
  }

  render() {
    if (this.state.hasError) return this.props.fallback;
    return this.props.children;
  }
}