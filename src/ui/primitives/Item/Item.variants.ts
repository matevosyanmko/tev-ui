import { cva } from "class-variance-authority";

// Kept out of Item.tsx so that file only exports components — a prerequisite
// for React Fast Refresh to hot-swap the item parts instead of remounting.

/**
 * `variant` is the row's surface: bare, outlined, or on a muted fill. `size`
 * is its padding. A row rendered as a link (`asChild` with an <a>) tints on
 * hover whatever its variant.
 */
export const itemVariants = cva(
  "group/item flex flex-wrap items-center rounded-md border border-transparent text-sm transition-colors duration-100 outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 [a]:transition-colors [a]:hover:bg-accent/50",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        outline: "border-border",
        muted: "bg-muted/50",
      },
      size: {
        default: "gap-4 p-4",
        sm: "gap-2.5 px-4 py-3",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

/**
 * The leading visual. `icon` boxes a lucide icon; `image` crops an avatar or
 * thumbnail to a rounded square. With a description under the title, the
 * media aligns to the title's first line rather than the row's centre.
 */
export const itemMediaVariants = cva(
  "flex shrink-0 items-center justify-center gap-2 group-has-[[data-slot=item-description]]/item:translate-y-0.5 group-has-[[data-slot=item-description]]/item:self-start [&_svg]:pointer-events-none",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        icon: "size-8 rounded-sm border bg-muted [&_svg:not([class*='size-'])]:size-4",
        image: "size-10 overflow-hidden rounded-sm [&_img]:size-full [&_img]:object-cover",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);
