import { cva } from "class-variance-authority";

// Kept out of ToolbarButton.tsx so that file only exports components — a
// prerequisite for React Fast Refresh to hot-swap the button.
//
// The two faces a control takes in `AppLayout`'s toolbar row: the dark tile of
// `SidebarSheet`'s menu and `FilterSheet`'s trigger, or the green of the row's
// one call to action.
export const toolbarButtonVariants = cva(
  "flex h-12 min-w-12 shrink-0 items-center justify-center gap-2 rounded-[16px] px-4 text-[13px] font-semibold whitespace-nowrap transition-[filter,opacity] outline-none focus-visible:ring-2 focus-visible:ring-brand-purple disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-5",
  {
    variants: {
      variant: {
        default: "bg-brand-surface-1 text-white hover:brightness-125",
        primary: "bg-brand-green text-brand-green-foreground hover:brightness-95",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);
