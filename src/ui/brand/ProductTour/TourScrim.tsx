import type * as React from "react";

import { SPOTLIGHT_PAD } from "./ProductTour.geometry.js";
import type { TourScrimProps } from "./ProductTour.types.js";

/**
 * Dim and blur behind the tour.
 *
 * This cannot be one div with a box-shadow hole: `backdrop-filter` only affects
 * what sits *behind* the element declaring it, and a shadow spread carries no
 * blur. So four panels tile the screen around the spotlight and the hole is
 * left empty, which leaves the highlighted element sharp.
 *
 * Without a `rect` — a step whose anchor never mounted — the whole screen dims.
 */
const PANEL_CLASS = "fixed z-[119] bg-black/65 backdrop-blur-[17.7px]";

const clamp = (value: number) => Math.max(0, value);

function holePanels(rect: DOMRect): React.CSSProperties[] {
  const top = rect.top - SPOTLIGHT_PAD;
  const left = rect.left - SPOTLIGHT_PAD;
  const right = rect.right + SPOTLIGHT_PAD;
  const bottom = rect.bottom + SPOTLIGHT_PAD;
  const height = clamp(bottom - top);

  return [
    { top: 0, left: 0, right: 0, height: clamp(top) }, // above
    { top: clamp(bottom), left: 0, right: 0, bottom: 0 }, // below
    { top: clamp(top), left: 0, width: clamp(left), height }, // left
    { top: clamp(top), left: clamp(right), right: 0, height }, // right
  ];
}

function TourScrim({ rect }: TourScrimProps) {
  if (!rect) {
    return <div aria-hidden="true" data-slot="tour-scrim" className={`${PANEL_CLASS} inset-0`} />;
  }

  return holePanels(rect).map((panel, index) => (
    <div
      key={index}
      aria-hidden="true"
      data-slot="tour-scrim"
      className={PANEL_CLASS}
      style={panel}
    />
  ));
}

export { TourScrim };
