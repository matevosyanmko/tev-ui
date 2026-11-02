import { cva } from "class-variance-authority";

// Kept out of Chip.tsx so that file only exports components — a prerequisite
// for React Fast Refresh to hot-swap <Chip> instead of remounting the tree.
//
// Strokes are inset rings, as Figma draws them: inside the chip, so a chip
// hugging "12:35m" is the drawn 57px wide rather than 59.
export const chipVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-1 rounded-20 whitespace-nowrap text-content-primary [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      surface: {
        /** White with a black stroke: time chips, presets, filter chips, the chip on a status pill. */
        outline: "bg-surface-primary inset-ring inset-ring-stroke-ink",
        /** White with the hairline stroke: the detail screen's main-information chips. */
        subtle: "bg-surface-primary inset-ring inset-ring-stroke-subtle",
        /** Neutral fill, no stroke: the grey time chip, the calendar's time-zone chip. */
        grey: "bg-surface-neutral-subtle inset-ring-transparent",
      },
      size: {
        /** 21px: date and time presets, "All Languages". */
        xs: "h-5.25 px-3 text-caption-10",
        /** 23px: the chip inside a status pill. */
        sm: "h-5.75 px-3 text-caption-10",
        /** 32px: filter status chips, the filter panel's date and time fields. */
        md: "h-8 px-3 text-caption-10",
        /** 32px with 20px sides: main-information chips, the grey time chip. */
        wide: "h-8 px-5 text-caption-10",
        /** 11px, half-weight stroke: the chip on a micro meet card's status pill. */
        micro: "h-2.75 rounded-10 px-1.5 text-micro-5 inset-ring-0.5",
      },
      weight: {
        regular: "",
        /** Bold label: the calendar toolbar's "today | 22.04.2026", "GMT4+". */
        strong: "text-heading-12 font-bold",
      },
      interactive: {
        false: "",
        // Selected is the filled ink look: Figma draws no selected chip, so it
        // takes the one every other TevScribe selection uses.
        true: "cursor-pointer transition-[color,background-color,box-shadow] duration-(--duration-fast) ease-standard outline-none hover:bg-surface-subtle focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 aria-pressed:bg-surface-inverse aria-pressed:text-content-inverse aria-pressed:inset-ring-stroke-ink aria-pressed:hover:bg-surface-inverse/85 motion-reduce:transition-none",
      },
    },
    compoundVariants: [
      {
        surface: "grey",
        interactive: true,
        className: "hover:bg-surface-neutral-subtle/70",
      },
    ],
    defaultVariants: {
      surface: "outline",
      size: "md",
      weight: "regular",
      interactive: false,
    },
  },
);
