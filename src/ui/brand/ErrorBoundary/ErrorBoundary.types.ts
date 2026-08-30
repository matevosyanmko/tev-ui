import type { ErrorInfo, ReactNode } from "react";

export interface ErrorBoundaryLabels {
  title?: string;
  description?: string;
  retry?: string;
  reload?: string;
}

export interface ErrorBoundaryProps {
  children?: ReactNode;
  /**
   * Translated strings. Every one falls back to English, because this also
   * renders above the layout — on a crash there may be no translator mounted.
   */
  labels?: ErrorBoundaryLabels;
  /**
   * Replaces the whole default panel. Receives the caught error and a reset
   * callback, so a caller can render its own recovery UI without reimplementing
   * the boundary.
   */
  fallback?: (error: Error, reset: () => void) => ReactNode;
  /** Report the crash somewhere real (Sentry, a logger) as well as the console. */
  onError?: (error: Error, info: ErrorInfo) => void;
}

export interface ErrorBoundaryState {
  error: Error | null;
}
