// Path geometry reverse-engineered from the hand-drawn button_bg*.svg assets
// (button_bg_sm.svg is the clearest reference: a 82x113 "dock" that notches
// into the content card's top-right corner). The left portion of the shape
// (the corner nub, the return curve, and its closing stub) is identical
// across every hand-drawn size, so it's kept as a literal constant below.
// Only the right portion — the flat top edge, the big corner arc, and the
// inner S-curve — depends on width, which lets one path formula serve any
// button count instead of picking between a few pre-rendered sizes.
const KAPPA = 0.5523; // cubic-bezier approximation of a quarter circle

export const ACTION_DOCK_HEIGHT = 113;
export const ACTION_DOCK_MIN_WIDTH = 82; // narrowest hand-drawn reference (button_bg_sm.svg)

const NOTCH_Y = 49; // height of the flat button row before the shape tapers
const OUTER_RADIUS = 33; // top-right corner, matches the card's own rounding
const NUB_RADIUS = 2.2533; // tiny decorative bottom-right corner nub
const LEFT_NOTCH_X = 31.2234; // fixed left edge of the flat notch (width-independent)

// The inner S-curve radius isn't constant across the hand-drawn assets (28.99 @ 82px,
// 34.14 @ 94px, 40.79 @ 202px) — it was eyeballed per size rather than derived from a
// formula. Scaling it with width and clamping keeps the curve proportioned at any size
// while tracking those reference values closely (~29 / ~33 / clamped-41 respectively).
const INNER_RADIUS_RATIO = 0.35;
const INNER_RADIUS_MIN = 20;
const INNER_RADIUS_MAX = 41;

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

export function buildActionDockPath(width: number): string {
  const w = Math.max(width, ACTION_DOCK_MIN_WIDTH);
  const h = ACTION_DOCK_HEIGHT;
  const innerRadius = clamp(w * INNER_RADIUS_RATIO, INNER_RADIUS_MIN, INNER_RADIUS_MAX);

  const topArcEndX = w - OUTER_RADIUS;
  const nubMidX = w - NUB_RADIUS;
  const rightEdgeX = w - 2 * NUB_RADIUS;
  const nubTopY = h - NUB_RADIUS;
  const returnTopY = NOTCH_Y + innerRadius;
  const innerNotchX = rightEdgeX - innerRadius;

  return [
    "M2.35714 7.00008",
    "C1.05533 7.00008 0 5.94475 0 4.64294",
    "V3.50014",
    "C0 1.56717 1.56697 0.000197473 3.49993 0.000192698",
    `L${topArcEndX} 0`,
    `C${topArcEndX + KAPPA * OUTER_RADIUS} 0 ${w} ${OUTER_RADIUS - KAPPA * OUTER_RADIUS} ${w} ${OUTER_RADIUS}`,
    `V${nubTopY}`,
    `C${w} ${nubTopY + KAPPA * NUB_RADIUS} ${nubMidX + KAPPA * NUB_RADIUS} ${h} ${nubMidX} ${h}`,
    `C${nubMidX - KAPPA * NUB_RADIUS} ${h} ${rightEdgeX} ${nubTopY + KAPPA * NUB_RADIUS} ${rightEdgeX} ${nubTopY}`,
    `V${returnTopY}`,
    `C${rightEdgeX} ${returnTopY - KAPPA * innerRadius} ${innerNotchX + KAPPA * innerRadius} ${NOTCH_Y} ${innerNotchX} ${NOTCH_Y}`,
    `H${LEFT_NOTCH_X}`,
    "C17.569 49 6.49997 37.931 6.49998 24.2767",
    "L6.5 11.1429",
    "C6.5 8.8549 4.64518 7.00008 2.35714 7.00008",
    "Z",
  ].join(" ");
}
