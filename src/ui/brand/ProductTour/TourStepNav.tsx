import { Button } from "../../primitives/Button/Button.js";
import type { TourStepNavProps } from "./ProductTour.types.js";

const LINK_CLASS = "text-[12px] lowercase underline underline-offset-2";

/**
 * Footer of the step card: skip on the left, back and next on the right.
 * `onBack` is omitted on the first step, and `nextLabel` lets the caller make
 * the primary action read "finish" on the last one.
 *
 * `variant="scribe"` draws them as TevScribe's Button pills: next is the ink
 * pill (Join), back the outline one (Review), skip Welcome's grey text action
 * (`data-brand="tour-step-next"` and friends, to target them).
 */
function TourStepNav({
  onSkip,
  onBack,
  onNext,
  labels,
  nextLabel,
  variant = "default",
}: TourStepNavProps) {
  const skip = labels?.skip ?? "Skip";
  const back = labels?.back ?? "Back";
  const next = nextLabel ?? labels?.next ?? "Next";

  if (variant === "scribe") {
    return (
      <>
        <Button
          type="button"
          variant="quiet"
          size="pill-sm"
          data-brand="tour-step-skip"
          onClick={onSkip}
          className="max-w-full px-0 text-left whitespace-normal text-content-secondary no-underline hover:text-content-primary"
        >
          {skip}
        </Button>
        <div className="ml-auto flex items-center gap-2">
          {onBack ? (
            <Button
              type="button"
              variant="outline-ink"
              size="pill-sm"
              data-brand="tour-step-back"
              onClick={onBack}
            >
              {back}
            </Button>
          ) : null}
          <Button
            type="button"
            variant="ink"
            size="pill-sm"
            data-brand="tour-step-next"
            onClick={onNext}
          >
            {next}
          </Button>
        </div>
      </>
    );
  }

  return (
    <>
      <button
        type="button"
        onClick={onSkip}
        className={`${LINK_CLASS} max-w-full text-left font-medium text-white/45`}
      >
        {skip}
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
            {back}
          </button>
        ) : null}
        <button type="button" onClick={onNext} className={`${LINK_CLASS} font-bold text-white`}>
          {next}
        </button>
      </div>
    </>
  );
}

export { TourStepNav };
