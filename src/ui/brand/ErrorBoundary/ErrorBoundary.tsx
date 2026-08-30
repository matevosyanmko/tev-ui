import { Component } from "react";
import type { ErrorInfo } from "react";
import { TriangleAlert } from "lucide-react";

import type { ErrorBoundaryProps, ErrorBoundaryState } from "./ErrorBoundary.types.js";

/**
 * Crash barrier. A render-time throw anywhere below this component would
 * otherwise unmount the entire React tree — sidebar, header and all — leaving
 * a blank screen with no way back except editing the URL.
 *
 * React never clears an error boundary on its own, so a caller that wants the
 * boundary to reset on navigation remounts it with a changing `key` (the
 * pathname is the usual choice).
 */
class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { error: null };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("Unhandled render error:", error, info?.componentStack);
    this.props.onError?.(error, info);
  }

  handleRetry = () => this.setState({ error: null });

  handleReload = () => window.location.reload();

  render() {
    const { error } = this.state;
    const { children, labels, fallback } = this.props;

    if (!error) return children;
    if (fallback) return fallback(error, this.handleRetry);

    return (
      <div
        role="alert"
        data-slot="error-boundary"
        className="flex h-full min-h-60 items-center justify-center p-6"
      >
        <div className="max-w-md rounded-[20px] border border-black/5 bg-card px-6 py-7 text-center">
          <TriangleAlert size={28} aria-hidden="true" className="mx-auto mb-3 text-destructive" />

          <h2 className="text-[16px] font-semibold text-card-foreground">
            {labels?.title ?? "Something went wrong"}
          </h2>

          <p className="mt-1.5 text-[13px] text-muted-foreground">
            {labels?.description ??
              "This page hit an unexpected error. The rest of the app is still available."}
          </p>

          {error.message ? (
            <p className="mt-3 rounded-lg bg-black/[0.03] px-3 py-2 text-left font-mono text-[11px] break-words text-muted-foreground">
              {error.message}
            </p>
          ) : null}

          <div className="mt-5 flex items-center justify-center gap-2">
            <button
              type="button"
              onClick={this.handleRetry}
              className="h-9 rounded-full bg-brand-purple px-4 text-[13px] font-medium text-brand-purple-foreground transition-opacity hover:opacity-90"
            >
              {labels?.retry ?? "Try again"}
            </button>

            <button
              type="button"
              onClick={this.handleReload}
              className="h-9 rounded-full border border-black/10 px-4 text-[13px] font-medium text-card-foreground transition-colors hover:bg-black/5"
            >
              {labels?.reload ?? "Reload page"}
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export { ErrorBoundary };
