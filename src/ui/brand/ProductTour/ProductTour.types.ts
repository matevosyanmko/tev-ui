import type * as React from "react";

import type { ProductTourVariant } from "./ProductTour.variants.js";

export type { ProductTourVariant };

export interface ProductTourLabels {
  /** Prefix before the step number, e.g. "Step". */
  stepLabel?: string;
  skip?: string;
  back?: string;
  next?: string;
  /** Primary action on the last step. */
  finish?: string;
  /**
   * What a screen reader hears as a step opens, before its title: "Step 2 of
   * 7". 1-based. A function, since the caller owns the plural rules.
   */
  stepOf?: (step: number, total: number) => string;
}

export interface TourScrimProps {
  /** Bounds of the highlighted element; `null` dims the whole screen. */
  rect: DOMRect | null;
  /** `scribe` is TevScribe's look; the default is Tevvoice's. */
  variant?: ProductTourVariant;
}

export interface TourSpotlightProps {
  rect: DOMRect | null;
  variant?: ProductTourVariant;
}

export interface TourStepDotsProps {
  /** 0-based. */
  step: number;
  total: number;
  variant?: ProductTourVariant;
}

export interface TourStepCardProps {
  /** 0-based. */
  step: number;
  total: number;
  rect: DOMRect | null;
  title: React.ReactNode;
  description: React.ReactNode;
  stepLabel?: string;
  /** Announced as the step opens; see `ProductTourLabels.stepOf`. */
  stepOf?: ProductTourLabels["stepOf"];
  variant?: ProductTourVariant;
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
  variant?: ProductTourVariant;
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
  /** Skip, and Escape. */
  onSkip: () => void;
  labels?: ProductTourLabels;
  /**
   * `scribe` draws TevScribe's tour: a white panel card with the Button
   * pills, over the modal scrim, with a green ring. The default is Tevvoice's
   * and unchanged.
   */
  variant?: ProductTourVariant;
}
