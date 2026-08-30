import * as React from "react";

/**
 * Nearest ancestor that actually scrolls vertically.
 *
 * Found by walking up and testing computed overflow rather than by looking for
 * a ScrollArea's `data-slot`, so this keeps working if a page scrolls in some
 * other container — or if the ScrollArea implementation changes underneath it.
 */
function findScrollParent(element: HTMLElement | null): HTMLElement | null {
  let node = element?.parentElement ?? null;
  while (node) {
    const { overflowY } = window.getComputedStyle(node);
    const scrolls = overflowY === "auto" || overflowY === "scroll";
    if (scrolls && node.scrollHeight > node.clientHeight) return node;
    node = node.parentElement;
  }
  return null;
}

export interface TableScrollResetOptions {
  /** Off by default — a table sitting under other content shouldn't hijack the scroll. */
  enabled?: boolean;
  /** Current page. A change means different rows. */
  page: number;
  /** The table is loading a genuinely different result set, not a background poll. */
  loadingNewData: boolean;
}

/**
 * Put the top of the table back in view when its contents become a different
 * result set.
 *
 * Two triggers, because two different things produce new rows:
 *
 * - `page` changing, which covers client-side pagination where no request is
 *   made at all and no status transition happens.
 * - `loadingNewData` going false → true, which is a new query key: a page
 *   change on a server-paginated list, or a filter change. Deliberately *not*
 *   true for a background poll or refetch, so a live board doesn't yank the
 *   viewport every few seconds.
 *
 * Scrolls the container so the table's top edge meets it, rather than to
 * scrollTop 0 — the table is not always the first thing in the scroll area.
 */
export function useTableScrollReset(
  targetRef: React.RefObject<HTMLElement | null>,
  { enabled = false, page, loadingNewData }: TableScrollResetOptions,
): void {
  // Seeded from the initial values so a freshly mounted table — which starts
  // out loading — doesn't scroll a viewport that is already at the top.
  const previous = React.useRef({ page, loadingNewData });

  React.useEffect(() => {
    const prior = previous.current;
    previous.current = { page, loadingNewData };
    if (!enabled) return;

    const pageChanged = prior.page !== page;
    const startedLoadingNewData = loadingNewData && !prior.loadingNewData;
    if (!pageChanged && !startedLoadingNewData) return;

    const element = targetRef.current;
    const container = findScrollParent(element);
    if (!element || !container) return;

    const offset = element.getBoundingClientRect().top - container.getBoundingClientRect().top;
    const target = Math.max(0, container.scrollTop + offset);
    if (Math.abs(target - container.scrollTop) < 1) return;

    // Instant, not smooth. Radix's ScrollArea viewport silently ignores
    // `behavior: "smooth"` — `auto` and a direct scrollTop assignment both move
    // it, smooth is a no-op — so asking for it would mean the scroll simply
    // never happened. Instant also matches what the user is looking at: the
    // rows underneath have already been replaced, so animating towards them
    // would lag the content.
    container.scrollTo({ top: target, behavior: "auto" });
  }, [targetRef, enabled, page, loadingNewData]);
}
