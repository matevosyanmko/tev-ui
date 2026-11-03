import { cva } from "class-variance-authority";

// Kept out of Input.tsx so that file only exports components — a
// prerequisite for React Fast Refresh to hot-swap <Input> instead of
// remounting the tree.
//
// `default` is the string Input always carried, verbatim, so a Tevvoice
// field renders exactly as before.

/*
 * TevScribe's 64px field box (New meeting, 100:41869): white, radius 16,
 * 16px in, the stroke-muted hairline drawn inside it, as every TevScribe
 * stroke is. Shared by the field itself and by `FieldBox`, the same box
 * around a control that is not a text input (the language rows).
 */
const FIELD_BOX =
  "rounded-16 bg-surface-primary text-content-primary inset-ring inset-ring-stroke-muted transition-shadow duration-(--duration-fast) ease-standard motion-reduce:transition-none";

export const inputVariants = cva("", {
  variants: {
    variant: {
      default:
        "h-9 w-full min-w-0 rounded-md border border-input bg-transparent px-3 py-1 text-base transition-[color,box-shadow] outline-none selection:bg-primary selection:text-primary-foreground file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 md:text-sm dark:bg-input/30 dark:aria-invalid:ring-destructive/40",
      /**
       * The link field: 64px, the bold 14px type the frame's placeholder is
       * set in (secondary grey while empty). Focus inks the hairline and adds
       * the focus ring; invalid (`aria-invalid`, which FormControl sets)
       * turns the hairline red.
       */
      field: `${FIELD_BOX} h-16 w-full min-w-0 px-4 text-heading-14 outline-none selection:bg-primary selection:text-primary-foreground placeholder:text-content-secondary focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:inset-ring-stroke-ink disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:inset-ring-stroke-accent-red aria-invalid:focus-visible:ring-stroke-accent-red/20`,
    },
  },
  defaultVariants: { variant: "default" },
});

/**
 * The same 64px box around other controls: a row the language pill sits in.
 * It grows with what it holds, and goes red with an invalid control inside.
 */
export const fieldBoxClassName = `${FIELD_BOX} flex min-h-16 items-center gap-2 p-4 has-aria-invalid:inset-ring-stroke-accent-red`;
