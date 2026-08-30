import type * as React from "react";

import { placeStepCard, STEP_CARD_W } from "./ProductTour.geometry.js";
import { TourStepDots } from "./TourStepDots.js";
import type { TourStepCardProps } from "./ProductTour.types.js";

// Centered when there is nothing to point at.
const CENTERED: React.CSSProperties = {
  left: "50%",
  top: "50%",
  transform: "translate(-50%, -50%)",
};

/**
 * The step tooltip — pinned next to the highlighted element when one was
 * found, centered otherwise. Always rendered, so the user can still advance or
 * finish even when a step's anchor is not on the page.
 *
 * `children` is the footer row, normally a <TourStepNav>.
 */
function TourStepCard({
  step,
  total,
  rect,
  title,
  description,
  stepLabel,
  children,
}: TourStepCardProps) {
  return (
    <div
      role="dialog"
      aria-modal="true"
      data-slot="tour-step-card"
      className="fixed z-[131] rounded-[18px] border-2 border-brand-purple bg-brand-surface-1/60 p-5 text-white shadow-2xl backdrop-blur-[5px]"
      style={{ ...(rect ? placeStepCard(rect) : CENTERED), width: STEP_CARD_W }}
    >
      <div className="mb-2 flex items-center justify-between">
        <span className="text-[13px] font-semibold text-white/70">
          {stepLabel ?? "Step"} {step + 1}
        </span>
        <TourStepDots step={step} total={total} />
      </div>

      <span className="inline-block rounded-full bg-brand-green px-4 py-2 text-[13px] font-bold text-brand-green-foreground">
        {title}
      </span>

      <p className="mt-3 text-[12px] leading-6 text-white/75">{description}</p>

      <div className="mt-4 flex items-center justify-between">{children}</div>
    </div>
  );
}

export { TourStepCard };
