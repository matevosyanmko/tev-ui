import * as React from "react";

/*
 * The tour's keyboard: Escape skips it, Right / Page Down goes to the next
 * step (finishing on the last, as the next button does), Left / Page Up goes
 * back. A hook, so a tour composed from the parts can have the same keys;
 * <ProductTour> wires it. Its own module so no component file exports it.
 */

export interface TourKeyHandlers {
  /** 0-based. Back is ignored on the first step. */
  step: number;
  onNext: () => void;
  onBack?: () => void;
  onSkip: () => void;
}

function isEditable(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false;
  return target.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName);
}

export function useTourKeys({ step, onNext, onBack, onSkip }: TourKeyHandlers) {
  // Read through a ref so the listener is attached once, not on every render.
  const handlers = React.useRef({ step, onNext, onBack, onSkip });
  React.useEffect(() => {
    handlers.current = { step, onNext, onBack, onSkip };
  });

  React.useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.defaultPrevented || event.isComposing) return;
      if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
      const { step: current, onNext: next, onBack: back, onSkip: skip } = handlers.current;
      if (event.key === "Escape") skip();
      else if (isEditable(event.target)) return;
      else if (event.key === "ArrowRight" || event.key === "PageDown") next();
      else if (event.key === "ArrowLeft" || event.key === "PageUp") {
        if (current > 0 && back) back();
      } else return;
      event.preventDefault();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);
}
