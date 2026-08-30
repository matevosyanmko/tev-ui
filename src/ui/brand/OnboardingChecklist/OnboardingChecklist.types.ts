import type * as React from "react";

export interface OnboardingTask {
  title: React.ReactNode;
  description?: React.ReactNode;
}

export interface OnboardingChecklistLabels {
  heading?: string;
  next?: string;
  finish?: string;
  skip?: string;
}

export interface OnboardingChecklistProps {
  tasks: OnboardingTask[];
  /** How many tasks are done. Also the index of the current one. */
  completed: number;
  onNext: () => void;
  onFinish: () => void;
  onSkip?: () => void;
  labels?: OnboardingChecklistLabels;
  className?: string;
}
