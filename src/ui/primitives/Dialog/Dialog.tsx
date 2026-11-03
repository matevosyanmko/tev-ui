"use client";

import * as React from "react";
import { XIcon } from "lucide-react";
import { Dialog as DialogPrimitive } from "radix-ui";

import { cn } from "../../../utils.js";
import type { DialogContentProps, DialogFooterProps } from "./Dialog.types.js";
import { Button } from "../Button/Button.js";
import { CloseIcon } from "../../brand/ScribeIcons/ScribeIcons.js";
import { DialogContentVariantContext } from "./Dialog.context.js";
import { dialogContentVariants, dialogOverlayVariants } from "./Dialog.variants.js";

function Dialog({ ...props }: React.ComponentProps<typeof DialogPrimitive.Root>) {
  return <DialogPrimitive.Root data-slot="dialog" {...props} />;
}

function DialogTrigger({ ...props }: React.ComponentProps<typeof DialogPrimitive.Trigger>) {
  return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />;
}

function DialogPortal({ ...props }: React.ComponentProps<typeof DialogPrimitive.Portal>) {
  return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />;
}

function DialogClose({ ...props }: React.ComponentProps<typeof DialogPrimitive.Close>) {
  return <DialogPrimitive.Close data-slot="dialog-close" {...props} />;
}

// forwardRef: Radix's Portal hands the overlay a ref to watch its exit animation,
// and on React 18 a plain function component drops it (with a warning), so the
// overlay unmounted without fading out.
const DialogOverlay = React.forwardRef<
  React.ComponentRef<typeof DialogPrimitive.Overlay>,
  React.ComponentProps<typeof DialogPrimitive.Overlay> & { variant?: "default" | "panel" }
>(function DialogOverlay({ className, variant = "default", ...props }, ref) {
  return (
    <DialogPrimitive.Overlay
      ref={ref}
      data-slot="dialog-overlay"
      className={cn(dialogOverlayVariants({ variant }), className)}
      {...props}
    />
  );
});

/**
 * Centred over the page, and never taller than the screen: a dialog whose
 * content outgrows a phone in landscape (or a long form on any phone) scrolls
 * inside itself instead of losing its top and bottom off-screen.
 *
 * `variant="panel"` is TevScribe's modal card. Its close glyph is the last
 * element in the DOM, so focus reaches the form first, but `order-first`
 * draws it above the content at the drawn 16px from the title.
 */
function DialogContent({
  className,
  children,
  showCloseButton = true,
  variant = "default",
  surface = "subtle",
  closeLabel,
  ...props
}: DialogContentProps) {
  const panel = variant === "panel";
  return (
    <DialogPortal data-slot="dialog-portal">
      <DialogOverlay variant={variant} />
      <DialogPrimitive.Content
        data-slot="dialog-content"
        data-variant={panel ? "panel" : undefined}
        data-surface={panel ? surface : undefined}
        className={cn(dialogContentVariants({ variant, surface }), className)}
        {...props}
      >
        <DialogContentVariantContext.Provider value={variant}>
          {children}
        </DialogContentVariantContext.Provider>
        {showCloseButton && panel ? (
          <DialogPrimitive.Close data-slot="dialog-close" asChild>
            <Button
              variant="ghost"
              size="icon-pill"
              className="order-first -mb-4 self-end text-icon-ink hover:bg-surface-neutral-subtle hover:text-icon-ink"
            >
              <CloseIcon />
              <span className="sr-only">{closeLabel ?? "Close"}</span>
            </Button>
          </DialogPrimitive.Close>
        ) : null}
        {showCloseButton && !panel && (
          <DialogPrimitive.Close
            data-slot="dialog-close"
            className="absolute top-4 right-4 rounded-xs opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4"
          >
            <XIcon />
            <span className="sr-only">{closeLabel ?? "Close"}</span>
          </DialogPrimitive.Close>
        )}
      </DialogPrimitive.Content>
    </DialogPortal>
  );
}

function DialogHeader({ className, ...props }: React.ComponentProps<"div">) {
  const panel = React.useContext(DialogContentVariantContext) === "panel";
  return (
    <div
      data-slot="dialog-header"
      className={cn(
        panel ? "flex flex-col gap-3" : "flex flex-col gap-2 text-center sm:text-left",
        className,
      )}
      {...props}
    />
  );
}

function DialogFooter({
  className,
  showCloseButton = false,
  children,
  ...props
}: DialogFooterProps) {
  return (
    <div
      data-slot="dialog-footer"
      className={cn("flex flex-col-reverse gap-2 sm:flex-row sm:justify-end", className)}
      {...props}
    >
      {children}
      {showCloseButton && (
        <DialogPrimitive.Close asChild>
          <Button variant="outline">Close</Button>
        </DialogPrimitive.Close>
      )}
    </div>
  );
}

function DialogTitle({ className, ...props }: React.ComponentProps<typeof DialogPrimitive.Title>) {
  const panel = React.useContext(DialogContentVariantContext) === "panel";
  return (
    <DialogPrimitive.Title
      data-slot="dialog-title"
      className={cn(
        // New meeting's 16px bold title; Welcome passes `text-display-80`.
        panel ? "text-heading-16 text-content-primary" : "text-lg leading-none font-semibold",
        className,
      )}
      {...props}
    />
  );
}

function DialogDescription({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Description>) {
  const panel = React.useContext(DialogContentVariantContext) === "panel";
  return (
    <DialogPrimitive.Description
      data-slot="dialog-description"
      className={cn(
        panel ? "text-body-20 text-content-primary" : "text-sm text-muted-foreground",
        className,
      )}
      {...props}
    />
  );
}

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
};
