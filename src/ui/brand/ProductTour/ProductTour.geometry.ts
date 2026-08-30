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
export const STEP_CARD_H = 210;

const MARGIN = 16;
const EDGE = 8;

/**
 * Places the step card adjacent to the highlighted element — right, then left,
 * then below, then above — clamped to the viewport and never covering it.
 *
 * Falls back to "below" when nothing fits outright, since a card that overlaps
 * a little is better than one pushed off screen.
 */
export function placeStepCard(rect: DOMRect): { left: number; top: number } {
  const vw = window.innerWidth;
  const vh = window.innerHeight;

  const clamp = (left: number, top: number) => ({
    left: Math.max(EDGE, Math.min(left, vw - STEP_CARD_W - EDGE)),
    top: Math.max(EDGE, Math.min(top, vh - STEP_CARD_H - EDGE)),
  });

  const midY = rect.top + rect.height / 2 - STEP_CARD_H / 2;
  const midX = rect.left + rect.width / 2 - STEP_CARD_W / 2;

  const candidates = [
    { left: rect.right + MARGIN, top: midY },
    { left: rect.left - STEP_CARD_W - MARGIN, top: midY },
    { left: midX, top: rect.bottom + MARGIN },
    { left: midX, top: rect.top - STEP_CARD_H - MARGIN },
  ];

  for (const candidate of candidates) {
    if (
      candidate.left >= EDGE &&
      candidate.left + STEP_CARD_W <= vw - EDGE &&
      candidate.top >= EDGE &&
      candidate.top + STEP_CARD_H <= vh - EDGE
    ) {
      return clamp(candidate.left, candidate.top);
    }
  }

  return clamp(candidates[2].left, candidates[2].top);
}
