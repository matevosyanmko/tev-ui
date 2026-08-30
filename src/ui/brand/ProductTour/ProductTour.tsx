"use client";

import { TourScrim } from "./TourScrim.js";
import { TourSpotlight } from "./TourSpotlight.js";
import { TourStepCard } from "./TourStepCard.js";
import { TourStepNav } from "./TourStepNav.js";
import type { ProductTourProps } from "./ProductTour.types.js";

/**
 * The whole tour overlay for one step: scrim, ring and step card, already
 * wired together.
 *
 * It is stateless. Which step is current, where that step's anchor is, and
 * whether the tour has been completed are all the app's business — this draws
 * one frame of it and reports what the user pressed. The individual parts are
 * exported too, for a tour that needs a different card or its own chrome.
 *
 *   const rect = useTourAnchor(steps[step].anchor)
 *   <ProductTour step={step} total={steps.length} rect={rect} … />
 */
function ProductTour({
  step,
  total,
  rect,
  title,
  description,
  onNext,
  onBack,
  onSkip,
  labels,
}: ProductTourProps) {
  const isLast = step >= total - 1;

  return (
    <>
      <TourScrim rect={rect} />
      <TourSpotlight rect={rect} />
      <TourStepCard
        step={step}
        total={total}
        rect={rect}
        title={title}
        description={description}
        stepLabel={labels?.stepLabel}
      >
        <TourStepNav
          onSkip={onSkip}
          onBack={step > 0 ? onBack : undefined}
          onNext={onNext}
          labels={labels}
          nextLabel={isLast ? (labels?.finish ?? "Finish") : undefined}
        />
      </TourStepCard>
    </>
  );
}

export { ProductTour };
