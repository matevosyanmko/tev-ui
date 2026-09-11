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
      <button
        type="button"
        onClick={onSkip}
        className={`${LINK_CLASS} max-w-full text-left font-medium text-white/45`}
      >
        {labels?.skip ?? "Skip"}
      </button>
      {/* `ml-auto` and not the row's `justify-between` alone: a long translated
          skip label wraps this group onto its own line, where the row's
          justification would leave it hanging on the left. */}
      <div className="ml-auto flex items-center gap-3">
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
