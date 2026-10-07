import { cva } from "class-variance-authority";

// Kept out of Sheet.tsx so that file only exports components — a prerequisite
// for React Fast Refresh to hot-swap <SheetContent> instead of remounting.
//
// `side` docks the panel to an edge and picks the slide it enters and leaves
// with. A side panel takes three quarters of a phone's width (capped from `sm`
// up); a top or bottom one takes the full width and its content's height.
export const sheetVariants = cva(
  "fixed z-50 flex flex-col gap-4 bg-background shadow-lg outline-none data-[state=closed]:animate-out data-[state=closed]:duration-200 data-[state=open]:animate-in data-[state=open]:duration-300 motion-reduce:animate-none",
  {
    variants: {
      side: {
        top: "inset-x-0 top-0 h-auto border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
        right:
          "inset-y-0 right-0 h-full w-3/4 border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm",
        bottom:
          "inset-x-0 bottom-0 h-auto border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
        left: "inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm",
      },
    },
    defaultVariants: {
      side: "right",
    },
  },
);
