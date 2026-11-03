import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/*
 * tailwind-merge only knows Tailwind's default theme, so it reads a utility
 * named after one of theme.css's own scales as something else: `text-label-10`
 * as a text *colour* (and drops it the moment a `text-content-*` follows),
 * `rounded-8` as an unknown class that never replaces a `rounded-md`. Naming
 * the scales here is what lets a variant override a base class with a token.
 * Only names theme.css declares are listed, so no existing class merges any
 * differently.
 */
const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      text: [
        "display-80",
        "display-56",
        "number-56",
        "display-48",
        "heading-56",
        "heading-40",
        "heading-32",
        "heading-28",
        "heading-24",
        "heading-20",
        "heading-16",
        "heading-14",
        "heading-12",
        "body-20",
        "body-16",
        "body-14",
        "body-12",
        "label-12",
        "label-10",
        "caption-10",
        "micro-8",
        "micro-6",
        "micro-5",
      ],
      font: ["figure"],
      radius: ["3", "8", "10", "12", "16", "20", "24", "30", "32", "40"],
      shadow: ["popover", "glass"],
      blur: ["overlay"],
      ease: ["standard", "emphasized", "exit"],
    },
    classGroups: {
      transition: [{ transition: ["tint", "fill", "fade", "control", "press", "tab", "height"] }],
    },
  },
});

/**
 * Merge class names, letting later Tailwind utilities win over earlier
 * conflicting ones. Every component in this package routes its `className`
 * prop through here, so a consumer's utility always beats the default.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
