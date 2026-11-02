import { cva } from "class-variance-authority";

// Kept out of SegmentPill.tsx so that file only exports components — a
// prerequisite for React Fast Refresh to hot-swap the pill.

/** The outer row: leading badge flush against the toned segment. */
export const segmentPillVariants = cva("inline-flex shrink-0 items-center", {
  variants: {
    size: {
      /**
       * Meeting rows: 200px wide so every row's pill lines up, the chip pushed
       * to the end. Grows past that for a longer (Armenian) label.
       */
      row: "min-w-50",
      /** Expanded meet cards: hugs its content. */
      card: "",
      /** The calendar's micro cards. */
      micro: "",
    },
  },
  defaultVariants: { size: "row" },
});

/**
 * The toned segment. Padding is drawn tighter on the chip side; done and
 * failed rows are drawn 2px tighter still, and are matched as drawn.
 */
export const segmentPillSegmentVariants = cva(
  "flex min-w-0 flex-1 items-center justify-between whitespace-nowrap",
  {
    variants: {
      tone: {
        live: "bg-status-live text-status-live-foreground",
        neutral: "bg-status-neutral text-status-neutral-foreground",
        success: "bg-status-success text-status-success-foreground",
        danger: "bg-status-danger text-status-danger-foreground",
      },
      size: {
        row: "h-8 gap-1.75 rounded-20 pl-3",
        card: "h-8 gap-1.75 rounded-20 pl-3",
        micro: "h-4 gap-1 rounded-10 pl-1.5",
      },
      trailing: {
        true: "",
        false: "",
      },
    },
    compoundVariants: [
      { size: ["row", "card"], trailing: false, className: "pr-3" },
      { size: ["row", "card"], tone: ["live", "neutral"], trailing: true, className: "pr-2" },
      { size: ["row", "card"], tone: ["success", "danger"], trailing: true, className: "pr-1.5" },
      { size: "micro", trailing: false, className: "pr-1.5" },
      { size: "micro", trailing: true, className: "pr-1" },
    ],
    defaultVariants: { tone: "neutral", size: "row", trailing: false },
  },
);

/** The label: semibold on coral, regular on the light tones, as drawn. */
export const segmentPillLabelVariants = cva("min-w-0 truncate", {
  variants: {
    tone: { live: "", neutral: "", success: "", danger: "" },
    size: { row: "", card: "", micro: "text-micro-5 font-semibold" },
  },
  compoundVariants: [
    { size: ["row", "card"], tone: ["live", "danger"], className: "text-label-10" },
    { size: ["row", "card"], tone: ["neutral", "success"], className: "text-caption-10" },
  ],
  defaultVariants: { tone: "neutral", size: "row" },
});
