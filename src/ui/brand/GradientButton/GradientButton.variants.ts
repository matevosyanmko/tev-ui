import { cva } from "class-variance-authority";

// Kept out of GradientButton.tsx so that file only exports components — a
// prerequisite for React Fast Refresh to hot-swap <GradientButton> instead of
// remounting the tree.
//
// Two cva maps because the component renders two elements. The frame and the
// pill share a radius by design (the pill is inset in the frame, not clipped
// by it), so the `size` keys line up 1:1 between them.
//
// Heights are minimums, not fixed heights, and the label is allowed to wrap.
// The artwork was drawn around one short English word ("START"), but every
// real caller passes a phrase — "Start guided tour" already fills the pill in
// English and its Russian and Armenian translations run ~30% longer than that.
// With `whitespace-nowrap` and a fixed height those simply overflowed the pill
// and were clipped at both ends. Wrapping keeps the label inside the artwork;
// `text-balance` splits it into even lines instead of leaving a one-word
// orphan, and the line heights are ratios so a second line adds a line's worth
// of height rather than the 76px the fixed `leading-19` would have added.
//
// The radii are arbitrary rather than `rounded-lg`/`rounded-xl`: the Figma
// values (16/12/10px) don't sit on this package's radius scale, which is
// derived from `--radius` and would drift these three sizes apart if a
// consumer retuned it. Colour is what must stay tokenized; geometry is fixed
// by the artwork.
export const gradientButtonFrameVariants = cva("block w-full bg-black p-4", {
  variants: {
    size: {
      lg: "rounded-[16px]",
      md: "rounded-[12px]",
      sm: "rounded-[10px]",
    },
  },
  defaultVariants: { size: "lg" },
});

export const gradientButtonVariants = cva(
  [
    "relative inline-flex w-full shrink-0 items-center justify-center text-center text-balance",
    "font-extrabold text-white uppercase transition-opacity",
    "bg-[image:var(--brand-gradient)]",
    // The glassy top edge: a double inset highlight the gradient alone can't
    // produce. Arbitrary because it is a shadow, not a colour token.
    "shadow-[inset_1px_-1px_1.3px_0_rgba(255,255,255,0.53),inset_0_4px_4px_0_rgba(255,255,255,0.51)]",
    "outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-black",
    "disabled:pointer-events-none disabled:opacity-50",
  ].join(" "),
  {
    variants: {
      size: {
        lg: "min-h-23 rounded-[16px] px-6 py-3 text-5xl leading-[1.05]",
        md: "min-h-15 rounded-[12px] px-5 py-3 text-3xl leading-[1.1]",
        sm: "min-h-10 rounded-[10px] px-4 py-2 text-lg leading-[1.15]",
      },
    },
    defaultVariants: { size: "lg" },
  },
);
