/**
 * Geometry for the tour overlay — the numbers the scrim, the ring and the step
 * card all have to agree on. Non-component module so every component file in
 * this folder exports only components.
 */

/**
 * Breathing room between the highlighted element and the ring around it.
 * Shared so the scrim's hole and the ring line up exactly.
 */
export const SPOTLIGHT_PAD = 8;

export const STEP_CARD_W = 300;

/**
 * The height of a card holding typical English copy — the starting guess used
 * before the card has been measured, and the fallback for callers that place a
 * card without measuring one. Translated copy routinely exceeds it: the same
 * step runs to ~325px in Armenian, which is why `placeStepCard` takes the real
 * height rather than assuming this one.
 */
export const STEP_CARD_H = 210;

const MARGIN = 16;
const EDGE = 8;

/**
 * Places the step card adjacent to the highlighted element — right, then left,
 * then below, then above — clamped to the viewport and never covering it.
 *
 * Falls back to "below" when nothing fits outright, since a card that overlaps
 * a little is better than one pushed off screen.
 *
 * `cardHeight` is the card's measured height. It has to be passed rather than
 * assumed: a card is as tall as the copy inside it, and the translated steps
 * run half again as tall as the English ones they were sized against. Placing
 * a 325px card as though it were 210px puts its last 115px — the row carrying
 * back and next — below the fold whenever the step is anchored low.
 */
export function placeStepCard(
  rect: DOMRect,
  cardHeight: number = STEP_CARD_H,
): { left: number; top: number } {
  const vw = window.innerWidth;
  const vh = window.innerHeight;

  const clamp = (left: number, top: number) => ({
    left: Math.max(EDGE, Math.min(left, vw - STEP_CARD_W - EDGE)),
    // A card taller than the viewport cannot be fully placed; pin it to the top
    // and let it scroll rather than pushing its heading off the screen.
    top: Math.max(EDGE, Math.min(top, Math.max(EDGE, vh - cardHeight - EDGE))),
  });

  const midY = rect.top + rect.height / 2 - cardHeight / 2;
  const midX = rect.left + rect.width / 2 - STEP_CARD_W / 2;

  // Each side is judged on the axis that decides whether it clears the anchor:
  // a card beside the anchor clears it by being far enough left or right, one
  // under or over it by being far enough down or up. The other axis is the one
  // `clamp` is free to move, so requiring it to fit as well would reject a side
  // that works — the case being a tall card against an anchor near a corner,
  // where "above" is the only placement left and its midpoint sits off the edge
  // horizontally. Rejected there, the card falls through to the overlap
  // fallback and covers the very thing it is pointing at.
  const candidates = [
    { left: rect.right + MARGIN, top: midY, axis: "x" },
    { left: rect.left - STEP_CARD_W - MARGIN, top: midY, axis: "x" },
    { left: midX, top: rect.bottom + MARGIN, axis: "y" },
    { left: midX, top: rect.top - cardHeight - MARGIN, axis: "y" },
  ] as const;

  for (const candidate of candidates) {
    const fits =
      candidate.axis === "x"
        ? candidate.left >= EDGE && candidate.left + STEP_CARD_W <= vw - EDGE
        : candidate.top >= EDGE && candidate.top + cardHeight <= vh - EDGE;

    if (fits) return clamp(candidate.left, candidate.top);
  }

  return clamp(candidates[2].left, candidates[2].top);
}
