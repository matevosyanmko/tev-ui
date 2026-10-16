import { cva } from "class-variance-authority";

// Kept out of Tabs.tsx so that file only exports components — a prerequisite
// for React Fast Refresh to hot-swap the tabs instead of remounting.
//
// `default` is the segmented control (a muted track, the active tab raised on
// it); `line` is a row of plain labels with the active one underlined.
export const tabsListVariants = cva(
  "group/tabs-list inline-flex w-fit items-center justify-center rounded-lg p-[3px] text-muted-foreground group-data-[orientation=horizontal]/tabs:h-9 group-data-[orientation=vertical]/tabs:h-fit group-data-[orientation=vertical]/tabs:flex-col data-[variant=line]:rounded-none",
  {
    variants: {
      variant: {
        default: "bg-muted",
        line: "gap-1 bg-transparent",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);
