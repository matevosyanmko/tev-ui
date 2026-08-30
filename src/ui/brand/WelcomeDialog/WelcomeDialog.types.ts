import type * as React from "react";

export interface WelcomeDialogProps {
  title: React.ReactNode;
  description?: React.ReactNode;
  /** Brand mark above the title — an <img>, an inline SVG, anything. */
  logo?: React.ReactNode;
  onStart: () => void;
  onSkip?: () => void;
  labels?: {
    start?: string;
    skip?: string;
  };
  className?: string;
}
