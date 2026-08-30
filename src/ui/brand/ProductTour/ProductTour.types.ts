import type * as React from "react";

export interface ProductTourLabels {
  /** Prefix before the step number, e.g. "Step". */
  stepLabel?: string;
  skip?: string;
  back?: string;
  next?: string;
  /** Primary action on the last step. */
  finish?: string;
}

export interface TourScrimProps {
  /** Bounds of the highlighted element; `null` dims the whole screen. */
  rect: DOMRect | null;
}

export interface TourSpotlightProps {
  rect: DOMRect | null;
}

export interface TourStepDotsProps {
  /** 0-based. */
  step: number;
  total: number;
}

export interface TourStepCardProps {
  /** 0-based. */
  step: number;
  total: number;
  rect: DOMRect | null;
  title: React.ReactNode;
  description: React.ReactNode;
  stepLabel?: string;
  /** The footer row — normally a <TourStepNav>. */
  children?: React.ReactNode;
}

export interface TourStepNavProps {
  onSkip: () => void;
  /** Omit on the first step. */
  onBack?: () => void;
  onNext: () => void;
  labels?: Pick<ProductTourLabels, "skip" | "back" | "next">;
  /** Replaces the primary action's label, e.g. "finish" on the last step. */
  nextLabel?: React.ReactNode;
}

export interface ProductTourProps {
  /** 0-based. */
  step: number;
  total: number;
  /** Bounds of the element this step highlights; `null` centers the card. */
  rect: DOMRect | null;
  title: React.ReactNode;
  description: React.ReactNode;
  onNext: () => void;
  onBack?: () => void;
  onSkip: () => void;
  labels?: ProductTourLabels;
}
