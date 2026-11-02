import { cva } from "class-variance-authority";

// Kept out of Dialog.tsx so that file only exports components — a
// prerequisite for React Fast Refresh to hot-swap <Dialog> instead of
// remounting the tree.
//
// `default` is the string DialogContent / DialogOverlay always carried,
// verbatim, so a Tevvoice dialog renders exactly as before.

// Open: fade, a 5% zoom and an 8px rise on the emphasized curve (which
// overshoots a hair, so the card settles). Close: the same in reverse,
// faster, on the exit curve. Reduced motion drops the animation; Radix
// Presence then unmounts at once. The reduced-motion reset carries the same
// data-state variant as the animation, or the attribute selector outranks it.
const PANEL_MOTION =
  "duration-(--duration-base) data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[state=open]:slide-in-from-bottom-2 data-[state=open]:ease-emphasized data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=closed]:slide-out-to-bottom-2 data-[state=closed]:duration-(--duration-fast) data-[state=closed]:ease-exit motion-reduce:data-[state=closed]:animate-none motion-reduce:data-[state=open]:animate-none";

export const dialogContentVariants = cva("", {
  variants: {
    variant: {
      default:
        "fixed top-[50%] left-[50%] z-50 grid max-h-[calc(100dvh-2rem)] w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 overflow-y-auto overscroll-contain rounded-[24px] border bg-background p-6 duration-200 outline-none data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 sm:max-w-lg",
      /**
       * TevScribe's modal card (New meeting 100:41869, Welcome 100:42294):
       * radius 40, 64px sides and 48px ends, its parts 32px apart.
       *
       * Centred without a transform: pinned 16px in from every edge, then
       * shrunk to its content (`max-h-fit`) and to the drawn 663px
       * (`max-w-165.75`), so `m-auto` splits what is left. A card taller
       * than the screen keeps the 16px gutter and scrolls inside itself.
       * Phones get a tighter card; the frames are desktop only.
       */
      panel: `fixed inset-4 z-50 m-auto flex max-h-fit max-w-165.75 flex-col gap-8 overflow-y-auto overscroll-contain rounded-32 px-6 py-8 text-content-primary outline-none lg:rounded-40 lg:px-16 lg:py-12 ${PANEL_MOTION}`,
    },
    surface: {
      /** Canvas grey: New meeting. */
      subtle: "",
      /** White: Welcome. */
      primary: "",
    },
  },
  compoundVariants: [
    { variant: "panel", surface: "subtle", className: "bg-surface-subtle" },
    { variant: "panel", surface: "primary", className: "bg-surface-primary" },
  ],
  defaultVariants: { variant: "default", surface: "subtle" },
});

export const dialogOverlayVariants = cva("", {
  variants: {
    variant: {
      default:
        "fixed inset-0 z-50 bg-black/50 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0",
      /**
       * The page behind a TevScribe modal: Figma's "Group 192" is the page at
       * a 10px layer blur, darkened to 29% of itself (white reads #494949).
       * The blur comes in with the fade, since it belongs to this layer.
       */
      panel:
        "fixed inset-0 z-50 bg-surface-inverse/71 backdrop-blur-overlay duration-(--duration-base) ease-standard data-[state=closed]:animate-out data-[state=closed]:duration-(--duration-fast) data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0 motion-reduce:data-[state=closed]:animate-none motion-reduce:data-[state=open]:animate-none",
    },
  },
  defaultVariants: { variant: "default" },
});
