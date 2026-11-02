import { cva } from "class-variance-authority";

// Every state change on the TevScribe intents below: colour, ring and the 1px
// press, on the motion tokens, and none of it under reduced motion. Written
// once and interpolated whole, so each class still appears literally here for
// Tailwind's scanner.
const SCRIBE_MOTION =
  "transition-[color,background-color,box-shadow,translate] duration-(--duration-fast) ease-standard motion-reduce:transition-none active:translate-y-px";

// The TevScribe sizes draw ScribeIcons at their Figma size, so the base rule
// that forces an unsized <svg> to 16px is reset to the glyph's own width and
// height attributes.
const NATURAL_SVG = "[&_svg:not([class*='size-'])]:size-auto";

// Kept out of button.jsx so that file only exports components — a prerequisite
// for React Fast Refresh to hot-swap <Button> instead of remounting the tree.
export const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-2 rounded-md text-sm font-medium whitespace-nowrap transition-all outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:bg-destructive/60 dark:focus-visible:ring-destructive/40",
        outline:
          "border bg-background hover:bg-accent hover:text-accent-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline",

        // TevScribe intents, named by meaning. Strokes are inset rings, the way
        // Figma draws them: inside the pill, adding nothing to its size. The
        // ring width comes from the size key, so an outline pill drawn at 1px
        // in a row and at 1.7px in a page header is one intent; the filled
        // intents set the ring transparent so a size's stroke never shows.
        /** Filled black: Join, Save, Log in, Start recording. */
        ink: `bg-surface-inverse text-content-inverse inset-ring-transparent hover:bg-surface-inverse/85 ${SCRIBE_MOTION}`,
        /** White with a black stroke: Review, Export, Regenerate. */
        "outline-ink": `bg-surface-primary text-content-primary inset-ring inset-ring-stroke-ink hover:bg-surface-subtle ${SCRIBE_MOTION}`,
        /** The coral pill: Leave meeting, Delete, Reset. */
        danger: `bg-status-danger text-status-danger-foreground inset-ring-transparent hover:bg-status-danger/85 focus-visible:ring-status-danger/40 ${SCRIBE_MOTION}`,
        /** Brand green: Join on the expanded meet card. */
        accent: `bg-surface-accent-green text-content-primary inset-ring-transparent hover:bg-surface-accent-green/80 ${SCRIBE_MOTION}`,
        /** White on a dark surface: New meeting. The ring stays visible on black. */
        light: `bg-surface-primary text-content-primary inset-ring inset-ring-stroke-ink hover:bg-surface-subtle focus-visible:ring-stroke-white/60 ${SCRIBE_MOTION}`,
        /** A muted underlined text action beside a primary one: discard. */
        quiet: `bg-transparent text-content-muted inset-ring-transparent underline underline-offset-2 hover:text-content-secondary ${SCRIBE_MOTION}`,
        /** Plain light text on a dark surface: log out. */
        "quiet-inverse": `bg-transparent text-content-inverse inset-ring-transparent hover:bg-surface-primary/10 focus-visible:ring-stroke-white/60 ${SCRIBE_MOTION}`,
        /**
         * The onboarding CTA: a black slab inside a black frame, 14px of the
         * page between them. The slab is a pseudo-element so the button stays
         * one focusable element; `isolate` keeps it under the label.
         */
        framed: `relative isolate bg-transparent text-content-inverse inset-ring-2 inset-ring-stroke-ink before:absolute before:inset-4 before:-z-10 before:rounded-16 before:bg-surface-inverse before:transition-colors before:duration-(--duration-fast) before:ease-standard hover:before:bg-surface-inverse/85 motion-reduce:before:transition-none ${SCRIBE_MOTION}`,
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        xs: "h-6 gap-1 rounded-md px-2 text-xs has-[>svg]:px-1.5 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-8 gap-1.5 rounded-md px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
        "icon-xs": "size-6 rounded-md [&_svg:not([class*='size-'])]:size-3",
        "icon-sm": "size-8",
        "icon-lg": "size-10",

        // TevScribe sizes, named by geometry.
        /** 21px pill: the filter panel's Reset. */
        "pill-xs": `h-5.25 gap-0.5 rounded-20 px-3 text-label-10 font-semibold ${NATURAL_SVG}`,
        /** 32px row action: Join, Review; with a trailing icon, Leave meeting. */
        "pill-sm": `h-8 gap-0.5 rounded-20 px-5 text-label-10 font-semibold has-[>svg]:px-3 ${NATURAL_SVG}`,
        /**
         * 32px page action, bold with a 1.7px stroke: Export, Regenerate. New
         * meeting is drawn 4px wider a side (`className="px-5"`); CSS cannot
         * tell its label-first content from an icon-first one, since both
         * have the glyph as their first element.
         */
        "pill-md": `h-8 gap-2 rounded-full px-4 text-heading-12 font-bold inset-ring-1.7 ${NATURAL_SVG}`,
        /** The picker footer's 29px Save / discard pair. */
        compact: `h-7.25 gap-1 rounded-12 px-3.5 text-caption-10 font-normal ${NATURAL_SVG}`,
        /** 64px full-width block: Log in, Start recording, continue with Google. */
        block: `h-16 w-full gap-3 rounded-8 px-6 text-heading-16 font-bold inset-ring-1.5 ${NATURAL_SVG}`,
        /** 32px circle around a single glyph: Delete. */
        "icon-pill": `size-8 rounded-full p-0 ${NATURAL_SVG}`,
        /** The framed CTA: 124px tall, display type in capitals. */
        display: `h-31 gap-3 rounded-24 px-10 text-display-48 font-extrabold uppercase ${NATURAL_SVG}`,
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);
