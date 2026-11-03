import * as React from "react";

import { placeStepCard, STEP_CARD_EDGE, STEP_CARD_H, STEP_CARD_W } from "./ProductTour.geometry.js";
import { TourStepDots } from "./TourStepDots.js";
import { cn } from "../../../utils.js";
import type { TourStepCardProps } from "./ProductTour.types.js";
import {
  tourStepCardClasses,
  tourStepDescriptionClasses,
  tourStepFooterClasses,
  tourStepHeadClasses,
  tourStepLabelClasses,
  tourStepTitleClasses,
} from "./ProductTour.variants.js";
import { useTourFocus } from "./useTourFocus.js";

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
 *
 * A modal dialog named by its title and described by its copy: focus moves
 * into it as the tour opens, Tab cycles inside it, and focus returns on close
 * (`useTourFocus`). Each new step is announced politely — "Step 2 of 7",
 * then the title — since focus may stay on the next button.
 */
function TourStepCard({
  step,
  total,
  rect,
  title,
  description,
  stepLabel,
  stepOf,
  variant = "default",
  children,
}: TourStepCardProps) {
  const cardRef = React.useRef<HTMLDivElement>(null);
  const [cardHeight, setCardHeight] = React.useState(STEP_CARD_H);
  const id = React.useId();
  const titleId = `${id}-title`;
  const descriptionId = `${id}-description`;
  const scribe = variant === "scribe";
  const Title = scribe ? "h2" : "span";

  useTourFocus(cardRef, step);

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
      aria-labelledby={titleId}
      aria-describedby={descriptionId}
      tabIndex={-1}
      data-slot="tour-step-card"
      data-variant={scribe ? "scribe" : undefined}
      className={cn(tourStepCardClasses[variant], "outline-none")}
      style={{
        ...(rect ? placeStepCard(rect, cardHeight) : CENTERED),
        width: STEP_CARD_W,
        maxWidth: `calc(100vw - ${STEP_CARD_EDGE * 2}px)`,
        maxHeight: `calc(100dvh - ${STEP_CARD_EDGE * 2}px)`,
      }}
    >
      <span aria-live="polite" aria-atomic="true" className="sr-only">
        {stepOf?.(step + 1, total) ?? `Step ${step + 1} of ${total}`}: {title}
      </span>

      <div className={tourStepHeadClasses[variant]}>
        <span className={tourStepLabelClasses[variant]}>
          {stepLabel ?? "Step"} {step + 1}
        </span>
        <TourStepDots step={step} total={total} variant={variant} />
      </div>

      <Title id={titleId} className={tourStepTitleClasses[variant]}>
        {title}
      </Title>

      <p id={descriptionId} className={tourStepDescriptionClasses[variant]}>
        {description}
      </p>

      <div className={tourStepFooterClasses[variant]}>{children}</div>
    </div>
  );
}

export { TourStepCard };
