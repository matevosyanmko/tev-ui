import * as React from "react";

import { placeStepCard, STEP_CARD_H, STEP_CARD_W } from "./ProductTour.geometry.js";
import { TourStepDots } from "./TourStepDots.js";
import { cn } from "../../../utils.js";
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
  const cardRef = React.useRef<HTMLDivElement>(null);
  const [cardHeight, setCardHeight] = React.useState(STEP_CARD_H);

  // The card is placed relative to its own height, so that height has to be
  // observed rather than assumed — it changes with the length of the step's
  // copy, which changes with the language. Laid out before paint so the card
  // never appears at the wrong spot first; ResizeObserver then catches a
  // reflow from a font swap or a viewport resize.
  React.useLayoutEffect(() => {
    const element = cardRef.current;
    if (!element) return undefined;

    const measure = () => setCardHeight(element.offsetHeight);
    measure();

    const observer = new ResizeObserver(measure);
    observer.observe(element);
    return () => observer.disconnect();
  }, [title, description]);

  return (
    <div
      ref={cardRef}
      role="dialog"
      aria-modal="true"
      data-slot="tour-step-card"
      className={cn(
        "fixed z-[131] rounded-[18px] border-2 border-brand-purple bg-brand-surface-1/60",
        "p-5 text-white shadow-2xl backdrop-blur-[5px]",
        // Last resort for a step whose copy outgrows the viewport: scroll the
        // card rather than run its footer off the bottom of the screen.
        "max-h-[calc(100dvh-16px)] overflow-y-auto overscroll-contain",
      )}
      style={{
        ...(rect ? placeStepCard(rect, cardHeight) : CENTERED),
        width: STEP_CARD_W,
        maxWidth: "calc(100vw - 16px)",
      }}
    >
      <div className="mb-2 flex items-center justify-between gap-2">
        <span className="text-[13px] font-semibold text-white/70">
          {stepLabel ?? "Step"} {step + 1}
        </span>
        <TourStepDots step={step} total={total} />
      </div>

      {/* A pill only as long as the title is. `rounded-full` reads the same as
          this radius on the single line English titles fit into, but resolves
          to half the height once a translated title wraps — which bows the
          ends inward and crowds the text against them. */}
      <span className="inline-block rounded-[18px] bg-brand-green px-4 py-2 text-[13px] font-bold text-brand-green-foreground">
        {title}
      </span>

      <p className="mt-3 text-[12px] leading-6 text-white/75">{description}</p>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-x-3 gap-y-2">
        {children}
      </div>
    </div>
  );
}

export { TourStepCard };
