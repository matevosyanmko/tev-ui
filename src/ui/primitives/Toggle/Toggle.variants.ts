import { cva } from "class-variance-authority";

// Kept out of toggle.jsx so that file only exports components — a prerequisite
// for React Fast Refresh to hot-swap <Toggle> instead of remounting the tree.
export const toggleVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium whitespace-nowrap transition-[color,box-shadow] outline-none hover:bg-muted hover:text-muted-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        outline: "border border-input bg-transparent hover:bg-accent hover:text-accent-foreground",
        /**
         * TevScribe's 32px icon boxes: the list/calendar switch and the
         * filter button (100:41115, active in 100:41492). On is ink-filled;
         * the glyph keeps its Figma size.
         */
        boxed:
          "rounded-8 bg-surface-primary text-icon-ink inset-ring inset-ring-stroke-ink transition-[color,background-color,box-shadow] duration-(--duration-fast) ease-standard motion-reduce:transition-none hover:bg-surface-subtle hover:text-icon-ink data-[state=on]:bg-surface-inverse data-[state=on]:text-icon-white data-[state=on]:hover:bg-surface-inverse/85 [&_svg:not([class*='size-'])]:size-auto",
      },
      size: {
        default: "h-9 min-w-9 px-2",
        sm: "h-8 min-w-8 px-1.5",
        lg: "h-10 min-w-10 px-2.5",
        /** The 32×32 box `boxed` is drawn at. */
        box: "size-8 min-w-8 p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);
