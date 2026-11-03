import { cn } from "../../../utils.js";
import type { TourStepDotsProps } from "./ProductTour.types.js";
import { tourStepDotClasses } from "./ProductTour.variants.js";

/** One dot per step, the current one highlighted. */
function TourStepDots({ step, total, variant = "default" }: TourStepDotsProps) {
  const tone = tourStepDotClasses[variant];
  return (
    <span aria-hidden="true" data-slot="tour-step-dots" className="flex items-center gap-1">
      {Array.from({ length: total }).map((_, index) => (
        <span
          key={index}
          className={cn("size-1.5 rounded-full", index === step ? tone.current : tone.other)}
        />
      ))}
    </span>
  );
}

export { TourStepDots };
