import type * as React from "react";

import { cn } from "../../../utils.js";
import type { AuthShellArtProps, AuthShellPanelProps } from "./AuthShell.types.js";

/**
 * The frame every signed-out screen shares: brand art, a light panel holding
 * the form, and a corner for the language picker.
 *
 *   <AuthShell>
 *     <AuthShellArt src={art}>
 *       <img src={logo} alt="Acme" className="size-14 lg:size-20" />
 *     </AuthShellArt>
 *     <AuthShellCorner><LangPicker … /></AuthShellCorner>
 *     <AuthShellPanel>
 *       <AuthShellHeader>
 *         <AuthShellTitle>Welcome back</AuthShellTitle>
 *         <AuthShellDescription>…</AuthShellDescription>
 *       </AuthShellHeader>
 *       …the form…
 *       <AuthShellFooter>…</AuthShellFooter>
 *     </AuthShellPanel>
 *   </AuthShell>
 *
 * From `lg` up the art is a column beside the panel, the panel's rounded edge
 * overlapping it. Below `lg` the art is a banner and the panel a sheet pulled
 * up over its bottom edge, filling the rest of the screen.
 */
function AuthShell({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="auth-shell"
      className={cn("relative flex min-h-dvh w-full flex-col bg-black lg:flex-row", className)}
      {...props}
    />
  );
}

/**
 * The brand art. Its children — a logo, usually — sit centred in the visible
 * part of the mobile banner, and in the bottom-left corner of the desktop
 * column.
 */
function AuthShellArt({ src, className, children, ...props }: AuthShellArtProps) {
  return (
    <div
      data-slot="auth-shell-art"
      className={cn(
        "relative h-40 shrink-0 overflow-hidden bg-black",
        // One corner radius (2.5rem) wider than the visible column: the panel
        // overlaps that strip, so its rounded corners show the artwork instead
        // of the frame's black.
        "lg:sticky lg:top-0 lg:h-dvh lg:w-[calc(50%+2.5rem)]",
        !src && "bg-[image:var(--brand-gradient)]",
        className,
      )}
      {...props}
    >
      {src ? (
        <img
          data-slot="auth-shell-art-image"
          src={src}
          alt=""
          draggable={false}
          className="absolute inset-0 size-full object-cover"
        />
      ) : null}
      {children ? (
        // The panel covers the banner's bottom 2rem, so the brand centres in
        // the part left showing.
        <div
          data-slot="auth-shell-brand"
          className="absolute top-[calc(50%-1rem)] left-1/2 -translate-x-1/2 -translate-y-1/2 lg:top-auto lg:bottom-8 lg:left-8 lg:translate-x-0 lg:translate-y-0"
        >
          {children}
        </div>
      ) : null}
    </div>
  );
}

/**
 * Pinned to the frame's top-right corner — over the banner on mobile, on the
 * panel's corner on desktop. Where a visitor picks a language before signing in.
 */
function AuthShellCorner({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="auth-shell-corner"
      className={cn("absolute top-4 right-4 z-20 lg:top-6 lg:right-6", className)}
      {...props}
    />
  );
}

/**
 * The light panel, and inside it a centred column capped at a comfortable
 * form width. The column fades in when it mounts.
 */
function AuthShellPanel({ className, contentClassName, children, ...props }: AuthShellPanelProps) {
  return (
    <main
      data-slot="auth-shell-panel"
      className={cn(
        "relative z-10 flex w-full min-w-0 flex-1 flex-col justify-center bg-background text-foreground",
        // Mobile: a sheet under the banner, filling the rest of the screen.
        "-mt-8 rounded-t-[2rem] px-5 pt-10 pb-[max(--spacing(10),env(safe-area-inset-bottom))] sm:px-10",
        // Desktop: beside the art column, overlapping it by one corner radius.
        // The vertical padding clears the corner slot when a long form fills
        // the panel; it is even top and bottom, so centring is unchanged.
        "lg:mt-0 lg:-ml-10 lg:min-h-dvh lg:rounded-t-none lg:rounded-l-[2.5rem] lg:px-20 lg:py-16",
        className,
      )}
      {...props}
    >
      {/* overflow-hidden keeps wide content from scrolling the panel
          sideways, but it would also clip the focus ring of a field running
          edge to edge. The 4px of padding gives the ring room inside the
          clip; the matching negative margin and wider width keep the content
          where it was. */}
      <div
        data-slot="auth-shell-content"
        className={cn(
          "-m-1 w-[calc(100%+0.5rem)] max-w-[calc(28rem+0.5rem)] self-center overflow-hidden p-1 lg:max-w-[calc(35rem+0.5rem)]",
          "animate-in duration-300 fade-in-0 motion-reduce:animate-none",
          contentClassName,
        )}
      >
        {children}
      </div>
    </main>
  );
}

function AuthShellHeader({ className, ...props }: React.ComponentProps<"header">) {
  return (
    <header
      data-slot="auth-shell-header"
      className={cn("mb-8 grid gap-2 sm:mb-10", className)}
      {...props}
    />
  );
}

function AuthShellTitle({ className, ...props }: React.ComponentProps<"h1">) {
  return (
    <h1
      data-slot="auth-shell-title"
      className={cn(
        "text-[32px] leading-[1.05] font-extrabold tracking-tight text-balance text-foreground sm:text-[40px]",
        className,
      )}
      {...props}
    />
  );
}

function AuthShellDescription({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="auth-shell-description"
      className={cn("text-sm text-pretty text-muted-foreground", className)}
      {...props}
    />
  );
}

/** Secondary links under the form — terms, "Already have an account?". */
function AuthShellFooter({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="auth-shell-footer"
      className={cn("mt-8 text-center text-sm text-pretty text-muted-foreground", className)}
      {...props}
    />
  );
}

export {
  AuthShell,
  AuthShellArt,
  AuthShellCorner,
  AuthShellDescription,
  AuthShellFooter,
  AuthShellHeader,
  AuthShellPanel,
  AuthShellTitle,
};
