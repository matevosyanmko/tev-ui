import { cva } from "class-variance-authority";

// Kept out of GoogleSignInButton.tsx so that file only exports components — a
// prerequisite for React Fast Refresh to hot-swap the button.
//
// Google's "light" button: a white face, a hairline border and dark text, the
// one treatment its branding rules allow on any background. `default` is the
// full-width call to action of a sign-in screen; `sm` sits inline among the
// app's ordinary buttons, at their height.
export const googleSignInButtonVariants = cva(
  "inline-flex shrink-0 items-center justify-center border border-input bg-background font-semibold whitespace-nowrap text-foreground transition-colors outline-none select-none hover:bg-muted focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 dark:bg-background dark:hover:bg-muted",
  {
    variants: {
      size: {
        default: "h-12 gap-3 rounded-xl px-5 text-[15px] [&>[data-slot=google-mark]]:size-5",
        sm: "h-9 gap-2 rounded-md px-3 text-sm [&>[data-slot=google-mark]]:size-4",
      },
    },
    defaultVariants: {
      size: "default",
    },
  },
);
