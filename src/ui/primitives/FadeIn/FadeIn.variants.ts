import { cva } from "class-variance-authority";

// Kept out of FadeIn.tsx so that file only exports components (React Fast
// Refresh).
//
// Built on tw-animate-css's `animate-in` (imported by theme.css, the
// same enter animation Dialog, Popover and Sheet use): it plays once when the
// element is inserted, from the --tw-enter-* values to the element's own.
// `fade-in` starts it transparent; `from` adds a slide of --fade-in-distance.
// `duration-*`/`ease-*`/`delay-*` classes work on it as on any tw-animate
// element; FadeIn's props set the same variables inline.
//
// fill-mode-backwards keeps it at the start values during a delay, so delayed
// content doesn't flash in first. Reduced motion: no animation, shown as is.
export const fadeInVariants = cva(
  "animate-in duration-200 ease-out fill-mode-backwards [--fade-in-distance:0.5rem] fade-in motion-reduce:animate-none",
  {
    variants: {
      from: {
        none: "",
        top: "[--tw-enter-translate-y:calc(var(--fade-in-distance)*-1)]",
        bottom: "[--tw-enter-translate-y:var(--fade-in-distance)]",
        left: "[--tw-enter-translate-x:calc(var(--fade-in-distance)*-1)]",
        right: "[--tw-enter-translate-x:var(--fade-in-distance)]",
      },
    },
    defaultVariants: {
      from: "none",
    },
  },
);
