import * as React from "react";

/*
 * Focus for the tour's step card, which is a modal dialog: focus moves into
 * the card when the tour opens, Tab and Shift+Tab cycle inside it, and focus
 * goes back to wherever it was when the tour closes. A hook, not a component,
 * so it lives outside TourStepCard.tsx and that file stays a Fast Refresh
 * boundary.
 *
 * The card itself takes the focus (it is `tabIndex={-1}` and carries the
 * step's title and description as its name), as a tour usually does: a
 * screen reader reads the step, and the next Tab reaches its first action.
 * On a step change focus stays where it is if that element is still in the
 * card — so pressing next repeatedly keeps working — and returns to the card
 * if it was lost (back unmounts on the first step).
 */

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

function focusables(card: HTMLElement): HTMLElement[] {
  return Array.from(card.querySelectorAll<HTMLElement>(FOCUSABLE));
}

export function useTourFocus(cardRef: React.RefObject<HTMLElement | null>, step: number) {
  // Whatever had focus before the tour, given it back on close.
  React.useEffect(() => {
    const previous = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    return () => {
      if (previous?.isConnected) previous.focus({ preventScroll: true });
    };
  }, []);

  // Into the card on open, and back into it whenever a step change dropped it.
  React.useEffect(() => {
    const card = cardRef.current;
    if (card && !card.contains(document.activeElement)) card.focus({ preventScroll: true });
  }, [cardRef, step]);

  // Tab stays inside the card while it is open.
  React.useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const card = cardRef.current;
      if (event.key !== "Tab" || !card) return;
      const items = focusables(card);
      if (items.length === 0) {
        event.preventDefault();
        card.focus({ preventScroll: true });
        return;
      }
      const first = items[0];
      const last = items[items.length - 1];
      const active = document.activeElement;
      const inside = card.contains(active);
      if (event.shiftKey && (!inside || active === first || active === card)) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && (!inside || active === last)) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [cardRef]);
}
