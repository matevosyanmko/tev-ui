import * as React from "react";

// Its own file because it is not a component: Badge.tsx stays a Fast Refresh
// boundary (see CLAUDE.md §2).

/**
 * Text that wraps keeps its box as wide as the space it wrapped in, so a badge
 * whose label breaks onto two lines stretches across the whole table cell,
 * with the lines floating inside it. CSS has no way to shrink a box back to
 * its longest line, so this measures the lines and sets the label's width to
 * the longest one; the inline-flex badge around it then fits again.
 *
 * Re-measured when the text changes, when the fonts finish loading, and when
 * the badge's container resizes, since a wider cell may fit the label on one
 * line again.
 */
function useHugText(ref: React.RefObject<HTMLElement | null>, text: string) {
  React.useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const fit = () => {
      // Back to the width it wraps in on its own, then measure.
      if (el.style.width) el.style.width = "";
      const widest = widestLine(el);
      if (widest !== null) el.style.width = `${Math.ceil(widest)}px`;
    };

    fit();
    // A web font arriving after the first measure changes every line's
    // width without resizing the cell.
    let live = true;
    document.fonts?.ready.then(() => {
      if (live) fit();
    });
    // label -> badge -> whatever the badge sits in (a table cell).
    const container = el.parentElement?.parentElement;
    const observer =
      container && typeof ResizeObserver !== "undefined" ? new ResizeObserver(fit) : null;
    if (container) observer?.observe(container);
    return () => {
      live = false;
      observer?.disconnect();
    };
  }, [ref, text]);
}

/** The width of the longest line, or null when the text sits on one line. */
function widestLine(el: HTMLElement): number | null {
  const range = document.createRange();
  range.selectNodeContents(el);
  const lines: { top: number; left: number; right: number }[] = [];
  for (const rect of Array.from(range.getClientRects())) {
    if (rect.width === 0) continue;
    // A line's fragments share a top; anything half a line lower is the next.
    const line = lines.find((l) => Math.abs(l.top - rect.top) < rect.height / 2);
    if (line) {
      line.left = Math.min(line.left, rect.left);
      line.right = Math.max(line.right, rect.right);
    } else {
      lines.push({ top: rect.top, left: rect.left, right: rect.right });
    }
  }
  if (lines.length < 2) return null;
  return Math.max(...lines.map((l) => l.right - l.left));
}

export { useHugText };
