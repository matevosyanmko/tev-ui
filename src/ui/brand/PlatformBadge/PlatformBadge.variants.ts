import { cva } from "class-variance-authority";

// Kept out of PlatformBadge.tsx so that file only exports components — a
// prerequisite for React Fast Refresh to hot-swap the badge.
export const platformBadgeVariants = cva(
  "inline-flex shrink-0 items-center justify-center overflow-hidden select-none",
  {
    variants: {
      size: {
        /** 40×32: meeting rows, expanded cards, the detail header. */
        default: "h-8 w-10 rounded-20 text-label-10",
        /** 20×16: the calendar's micro cards. */
        micro: "h-4 w-5 rounded-10 text-micro-5 font-semibold",
      },
      tone: {
        default: "bg-platform text-platform-foreground",
        /** A failed meeting's badge takes the pill's coral. */
        danger: "bg-status-danger text-status-danger-foreground",
      },
    },
    defaultVariants: {
      size: "default",
      tone: "default",
    },
  },
);
