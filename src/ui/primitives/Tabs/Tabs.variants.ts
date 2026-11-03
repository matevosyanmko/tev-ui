import { cva } from "class-variance-authority";

// Kept out of Tabs.tsx so that file only exports components — a prerequisite
// for React Fast Refresh to hot-swap the tabs instead of remounting.
//
// `default` is the segmented control (a muted track, the active tab raised on
// it); `line` is a row of plain labels with the active one underlined;
// `inverse` is a black bar of icon-and-label tabs, the active one outlined.
export const tabsListVariants = cva(
  "group/tabs-list inline-flex w-fit items-center justify-center rounded-lg p-[3px] text-muted-foreground group-data-[orientation=horizontal]/tabs:h-9 group-data-[orientation=vertical]/tabs:h-fit group-data-[orientation=vertical]/tabs:flex-col data-[variant=line]:rounded-none",
  {
    variants: {
      variant: {
        default: "bg-muted",
        line: "gap-1 bg-transparent",
        /**
         * TevScribe's black Details bar (100:40786): full width, 8px in, the
         * active tab outlined in white rather than raised.
         */
        inverse:
          "flex w-full gap-2 rounded-16 bg-surface-inverse p-2 text-content-inverse group-data-[orientation=horizontal]/tabs:h-auto",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);
