import { SPOTLIGHT_PAD } from "./ProductTour.geometry.js";
import type { TourSpotlightProps } from "./ProductTour.types.js";

/**
 * The ring drawn around the highlighted element — purely the outline; the
 * dimming around it is <TourScrim>'s job. Renders nothing until an anchor
 * resolves, so a step pointing at an element that never mounted degrades to a
 * plain centered card rather than a ring around the top-left corner.
 */
function TourSpotlight({ rect }: TourSpotlightProps) {
  if (!rect) return null;

  return (
    <div
      aria-hidden="true"
      data-slot="tour-spotlight"
      className="pointer-events-none fixed z-[120] rounded-[12px] border-2 border-brand-purple transition-all duration-200"
      style={{
        top: rect.top - SPOTLIGHT_PAD,
        left: rect.left - SPOTLIGHT_PAD,
        width: rect.width + SPOTLIGHT_PAD * 2,
        height: rect.height + SPOTLIGHT_PAD * 2,
      }}
    />
  );
}

export { TourSpotlight };
