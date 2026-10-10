"use client";

import { Component, type ReactNode } from "react";

/**
 * Catches failures from the post-processing composer.
 *
 * postprocessing v6 reads `renderer.getContext().getContextAttributes().alpha`
 * when passes are added/mounted. If the WebGL context is transiently lost
 * (driver hiccup, GPU restart), `getContext()` returns null and this throws,
 * which would otherwise crash the whole hero. When that happens we drop the
 * composer (bloom + vignette are polish, not core) and let the raw 3D scene
 * keep rendering. A few delayed retries cover quick context restores.
 */
type PostFxBoundaryProps = {
  children: ReactNode;
};

type PostFxBoundaryState = {
  failed: boolean;
};

const MAX_ATTEMPTS = 3;
const RETRY_DELAY_MS = 2500;

export class PostFxBoundary extends Component<
  PostFxBoundaryProps,
  PostFxBoundaryState
> {
  state: PostFxBoundaryState = { failed: false };
  private attempts = 0;
  private retryTimer: ReturnType<typeof setTimeout> | null = null;

  static getDerivedStateFromError(): PostFxBoundaryState {
    return { failed: true };
  }

  componentDidCatch() {
    this.attempts += 1;
    if (this.attempts < MAX_ATTEMPTS) {
      this.retryTimer = setTimeout(() => {
        this.setState({ failed: false });
      }, RETRY_DELAY_MS);
    }
  }

  componentWillUnmount() {
    if (this.retryTimer) clearTimeout(this.retryTimer);
  }

  render() {
    return this.state.failed ? null : this.props.children;
  }
}