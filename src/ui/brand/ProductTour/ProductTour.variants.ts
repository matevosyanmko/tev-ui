/*
 * The two looks of the tour overlay, one class string per part. Kept out of
 * the component files so each of them exports only components.
 *
 * `default` is every string the parts always carried, verbatim, so a Tevvoice
 * tour renders exactly as before. `scribe` is TevScribe's: Figma has no tour
 * frames, so it is the Welcome card (100:42294) and the Dialog `panel` carried
 * down to a 300px step card —
 *   scrim    the page behind a TevScribe modal (Dialog `panel`'s overlay);
 *   ring     brand green, which reads on that scrim and on a white or black
 *            anchor alike (ink, the theme's brand primary, vanishes on it);
 *   card     a white panel with ink type, the header's 16px title, Join's
 *            ink pill for next, Review's outline pill for back, and Welcome's
 *            grey "skip onboarding" for skip.
 */

export type ProductTourVariant = "default" | "scribe";

export const tourScrimClasses: Record<ProductTourVariant, string> = {
  default: "fixed z-[119] bg-black/65 backdrop-blur-[17.7px]",
  scribe: "fixed z-119 bg-surface-inverse/71 backdrop-blur-overlay",
};

export const tourSpotlightClasses: Record<ProductTourVariant, string> = {
  default:
    "pointer-events-none fixed z-[120] rounded-[12px] border-2 border-brand-purple transition-all duration-200",
  scribe:
    "pointer-events-none fixed z-120 rounded-12 border-2 border-stroke-accent-green transition-all duration-(--duration-base) ease-standard motion-reduce:transition-none",
};

export const tourStepCardClasses: Record<ProductTourVariant, string> = {
  default: [
    "fixed z-[131] rounded-[18px] border-2 border-brand-purple bg-brand-surface-1/60",
    "p-5 text-white shadow-2xl backdrop-blur-[5px]",
    // Last resort for a step whose copy outgrows the viewport: scroll the
    // card rather than run its footer off the bottom of the screen.
    "max-h-[calc(100dvh-16px)] overflow-y-auto overscroll-contain",
  ].join(" "),
  // The viewport cap is the inline style both looks share.
  scribe:
    "fixed z-131 flex flex-col gap-4 overflow-y-auto overscroll-contain rounded-24 bg-surface-primary p-6 text-content-primary shadow-popover",
};

export const tourStepHeadClasses: Record<ProductTourVariant, string> = {
  default: "mb-2 flex items-center justify-between gap-2",
  scribe: "flex items-center justify-between gap-2",
};

export const tourStepLabelClasses: Record<ProductTourVariant, string> = {
  default: "text-[13px] font-semibold text-white/70",
  scribe: "text-label-12 text-content-secondary",
};

export const tourStepTitleClasses: Record<ProductTourVariant, string> = {
  // A pill only as long as the title is. `rounded-full` reads the same as
  // this radius on the single line English titles fit into, but resolves to
  // half the height once a translated title wraps — which bows the ends
  // inward and crowds the text against them.
  default:
    "inline-block rounded-[18px] bg-brand-green px-4 py-2 text-[13px] font-bold text-brand-green-foreground",
  scribe: "text-heading-16 text-content-primary",
};

export const tourStepDescriptionClasses: Record<ProductTourVariant, string> = {
  default: "mt-3 text-[12px] leading-6 text-white/75",
  scribe: "text-body-14 text-content-primary",
};

export const tourStepFooterClasses: Record<ProductTourVariant, string> = {
  default: "mt-4 flex flex-wrap items-center justify-between gap-x-3 gap-y-2",
  scribe: "flex flex-wrap items-center justify-between gap-x-3 gap-y-2",
};

export const tourStepDotClasses: Record<ProductTourVariant, { current: string; other: string }> = {
  default: { current: "bg-brand-green", other: "bg-white/25" },
  scribe: { current: "bg-surface-inverse", other: "bg-surface-neutral-subtle" },
};
