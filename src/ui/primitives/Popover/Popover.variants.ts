import { cva } from "class-variance-authority";

// Kept out of Popover.tsx so that file only exports components — a
// prerequisite for React Fast Refresh to hot-swap <Popover> instead of
// remounting the tree.
//
// `default` is the string PopoverContent always carried, verbatim, so a
// Tevvoice popover renders exactly as before.

// Grows out of its trigger: fade, a 5% zoom and a 2-step slide from the
// trigger's side, on duration-base/ease-emphasized; out faster on the exit
// curve. Reduced motion drops it, and Radix Presence then unmounts at once;
// the reset carries the data-state variant too, or the attribute selector
// outranks it.
const SCRIBE_MOTION =
  "origin-(--radix-popover-content-transform-origin) duration-(--duration-base) data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[state=open]:ease-emphasized data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=closed]:duration-(--duration-fast) data-[state=closed]:ease-exit motion-reduce:data-[state=closed]:animate-none motion-reduce:data-[state=open]:animate-none";

export const popoverContentVariants = cva("", {
  variants: {
    variant: {
      default:
        "z-50 w-72 origin-(--radix-popover-content-transform-origin) rounded-md border bg-popover p-4 text-popover-foreground outline-hidden data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95",
      /**
       * TevScribe's floating panel: filters (100:43543) and the export menu
       * (100:40882). 250px, radius 12, a 1px ink border that the 8×10
       * padding sits inside (Figma includes this stroke in the layout), and
       * the popover shadow.
       */
      panel: `z-50 w-62.5 rounded-12 border border-stroke-ink bg-surface-primary px-2 py-2.5 text-content-primary shadow-popover outline-hidden ${SCRIBE_MOTION}`,
      /**
       * The pickers that open from a filter row: date (100:43738), time
       * (100:43801) and language (100:43832). Radius 16, 16px in, an inset
       * ink stroke that takes no room, no shadow; as wide as its content.
       */
      picker: `z-50 w-auto rounded-16 bg-surface-primary p-4 text-content-primary inset-ring inset-ring-stroke-ink outline-hidden ${SCRIBE_MOTION}`,
    },
  },
  defaultVariants: { variant: "default" },
});
