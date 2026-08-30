import type { TourStepNavProps } from "./ProductTour.types.js";

const LINK_CLASS = "text-[12px] lowercase underline underline-offset-2";

/**
 * Footer of the step card: skip on the left, back and next on the right.
 * `onBack` is omitted on the first step, and `nextLabel` lets the caller make
 * the primary action read "finish" on the last one.
 */
function TourStepNav({ onSkip, onBack, onNext, labels, nextLabel }: TourStepNavProps) {
  return (
    <>
      <button type="button" onClick={onSkip} className={`${LINK_CLASS} font-medium text-white/45`}>
        {labels?.skip ?? "Skip"}
      </button>
      <div className="flex items-center gap-3">
        {onBack ? (
          <button
            type="button"
            onClick={onBack}
            className={`${LINK_CLASS} font-semibold text-white/80`}
          >
            {labels?.back ?? "Back"}
          </button>
        ) : null}
        <button type="button" onClick={onNext} className={`${LINK_CLASS} font-bold text-white`}>
          {nextLabel ?? labels?.next ?? "Next"}
        </button>
      </div>
    </>
  );
}

export { TourStepNav };
