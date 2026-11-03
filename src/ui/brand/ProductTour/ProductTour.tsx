"use client";

import { TourScrim } from "./TourScrim.js";
import { TourSpotlight } from "./TourSpotlight.js";
import { TourStepCard } from "./TourStepCard.js";
import { TourStepNav } from "./TourStepNav.js";
import type { ProductTourProps } from "./ProductTour.types.js";
import { useTourKeys } from "./useTourKeys.js";

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
 *
 * The keyboard is wired too: Escape calls `onSkip`, Right / Page Down
 * `onNext` (so on the last step it finishes), Left / Page Up `onBack`. The
 * card takes focus, keeps Tab inside it, and hands focus back on close.
 * `variant="scribe"` is TevScribe's look; the default is Tevvoice's.
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
  variant = "default",
}: ProductTourProps) {
  const isLast = step >= total - 1;
  const back = step > 0 ? onBack : undefined;

  useTourKeys({ step, onNext, onBack: back, onSkip });

  return (
    <>
      <TourScrim rect={rect} variant={variant} />
      <TourSpotlight rect={rect} variant={variant} />
      <TourStepCard
        step={step}
        total={total}
        rect={rect}
        title={title}
        description={description}
        stepLabel={labels?.stepLabel}
        stepOf={labels?.stepOf}
        variant={variant}
      >
        <TourStepNav
          onSkip={onSkip}
          onBack={back}
          onNext={onNext}
          labels={labels}
          nextLabel={isLast ? (labels?.finish ?? "Finish") : undefined}
          variant={variant}
        />
      </TourStepCard>
    </>
  );
}

export { ProductTour };
