import { cva } from "class-variance-authority";

// Kept out of ScrollFade.tsx so that file only exports components (React Fast
// Refresh).
//
// The fade is a mask on the scroller itself, not a gradient painted over it:
// content turns transparent towards an edge and whatever is behind the
// element shows through, so it works on any background, in any theme. The
// mask colour is only its alpha.
//
// Three mask layers per axis: a fade at the start, the solid middle, a fade at
// the end. The fades' lengths come from --scroll-fade-start/--scroll-fade-end,
// which are 0 until there is content beyond that edge (data-fade-start /
// data-fade-end, set by ScrollFade) and then --scroll-fade-size. Layer sizes
// and positions are transitioned, so a fade grows in and out rather than
// popping.
export const scrollFadeVariants = cva(
  [
    "[--scroll-fade-end:0px] [--scroll-fade-size:2rem] [--scroll-fade-start:0px]",
    "data-[fade-start]:[--scroll-fade-start:var(--scroll-fade-size)]",
    "data-[fade-end]:[--scroll-fade-end:var(--scroll-fade-size)]",
    "[mask-repeat:no-repeat]",
    "transition-[mask-size,mask-position] duration-200 ease-out motion-reduce:transition-none",
  ],
  {
    variants: {
      orientation: {
        horizontal: [
          "overflow-x-auto overflow-y-hidden",
          "[mask-image:linear-gradient(to_right,transparent,#000),linear-gradient(#000,#000),linear-gradient(to_left,transparent,#000)]",
          "[mask-position:left_0_top_0,left_var(--scroll-fade-start)_top_0,right_0_top_0]",
          "[mask-size:var(--scroll-fade-start)_100%,calc(100%_-_var(--scroll-fade-start)_-_var(--scroll-fade-end))_100%,var(--scroll-fade-end)_100%]",
          // Right to left, the start is the right-hand edge.
          "rtl:[mask-image:linear-gradient(to_left,transparent,#000),linear-gradient(#000,#000),linear-gradient(to_right,transparent,#000)]",
          "rtl:[mask-position:right_0_top_0,right_var(--scroll-fade-start)_top_0,left_0_top_0]",
        ],
        vertical: [
          "overflow-x-hidden overflow-y-auto",
          "[mask-image:linear-gradient(to_bottom,transparent,#000),linear-gradient(#000,#000),linear-gradient(to_top,transparent,#000)]",
          "[mask-position:left_0_top_0,left_0_top_var(--scroll-fade-start),left_0_bottom_0]",
          "[mask-size:100%_var(--scroll-fade-start),100%_calc(100%_-_var(--scroll-fade-start)_-_var(--scroll-fade-end)),100%_var(--scroll-fade-end)]",
        ],
      },
      hideScrollbar: {
        // Still scrolls by wheel, touch, keyboard and trackpad.
        true: "[scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
        false: "",
      },
    },
    defaultVariants: {
      orientation: "vertical",
      hideScrollbar: false,
    },
  },
);
