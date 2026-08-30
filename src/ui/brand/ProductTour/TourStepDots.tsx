import { cn } from "../../../utils.js";
import type { TourStepDotsProps } from "./ProductTour.types.js";

/** One dot per step, the current one highlighted. */
function TourStepDots({ step, total }: TourStepDotsProps) {
  return (
    <span aria-hidden="true" data-slot="tour-step-dots" className="flex items-center gap-1">
      {Array.from({ length: total }).map((_, index) => (
        <span
          key={index}
          className={cn("size-1.5 rounded-full", index === step ? "bg-brand-green" : "bg-white/25")}
        />
      ))}
    </span>
  );
}

export { TourStepDots };
