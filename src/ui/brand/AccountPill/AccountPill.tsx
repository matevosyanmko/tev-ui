import { Slot } from "radix-ui";

import { cn } from "../../../utils.js";
import { accountInitials } from "./AccountPill.utils.js";
import type { AccountPillProps } from "./AccountPill.types.js";

/**
 * The signed-in account in the header: an initials avatar plus two lines of
 * text, on the brand gradient. Sits beside <NotificationBell> in the
 * <AppHeader> cluster and shares its 80px height.
 *
 * Takes its two lines as plain strings rather than an app's session object, so
 * nothing about the caller's user shape reaches the library — and so the pill
 * can label a company, a team or a workspace just as well as a person.
 *
 * A real <button>, not a clickable <div> — so it is reachable by Tab and
 * fires on Enter and Space. When the account page is a route rather than a
 * handler, hand in the link instead and keep both:
 *
 *   <AccountPill asChild fullName={user.name} position={user.role}>
 *     <Link to="/account" title={t("nav.account")} />
 *   </AccountPill>
 *
 * The avatar and identity are rendered from props, so under `asChild` they
 * have to be injected into the caller's element as its children — which is
 * what <Slot.Slottable> does: it marks which child is the element to render,
 * leaving the siblings to become that element's content.
 */
function AccountPill({
  fullName,
  position,
  initials,
  asChild = false,
  type = "button",
  labels,
  className,
  children,
  ...props
}: AccountPillProps) {
  const Comp = asChild ? Slot.Root : "button";

  return (
    <Comp
      data-slot="account-pill"
      type={asChild ? undefined : type}
      className={cn(
        // `text-left` because a <button> centres its content and the identity
        // block is left-aligned text; `min-w-56` is what stops the pill
        // collapsing as the name truncates.
        "flex h-20 min-w-56 shrink-0 items-center gap-3 rounded-[20px] px-3 py-2 text-left select-none sm:px-4",
        "bg-[image:var(--brand-gradient-chrome)]",
        // One box-shadow, not two: the purple glow and the glassy top edge
        // are a single property, so a second declaration would silently drop
        // the first. The glow is `--brand-purple` at 25%, derived through
        // color-mix so that re-theming the token re-themes the glow with it;
        // the inset highlights are white-on-gradient artwork, not a colour a
        // theme owns.
        "shadow-[0_8px_24px_color-mix(in_oklab,var(--brand-purple)_25%,transparent),inset_1px_-1px_1.3px_0_rgba(255,255,255,0.53),inset_0_4px_4px_0_rgba(255,255,255,0.51)]",
        "outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-black",
        className,
      )}
      {...props}
    >
      {asChild ? <Slot.Slottable>{children}</Slot.Slottable> : null}

      <span
        data-slot="account-pill-avatar"
        aria-hidden="true"
        className="flex size-11 shrink-0 items-center justify-center rounded-full border-2 border-white text-[13px] font-bold text-white"
      >
        {initials ?? accountInitials(fullName)}
      </span>

      {/* The visible identity is hidden below `sm` (the breakpoint at which
          <AppLogoWordmark> also drops out), which would otherwise leave a
          button with no accessible name at all — the avatar being decorative.
          This carries the name for assistive tech at exactly those widths, and
          leaves at `sm` where the real one takes over, so the name is never
          announced twice. */}
      <span data-slot="account-pill-label" className="sr-only sm:hidden">
        {fullName ?? labels?.unknownUser ?? "User"}
      </span>

      <span data-slot="account-pill-identity" className="hidden min-w-0 pr-1 sm:block">
        <span
          data-slot="account-pill-name"
          className="block max-w-40 truncate text-[15px] leading-tight font-bold text-white"
        >
          {fullName ?? labels?.unknownUser ?? "User"}
        </span>
        {position ? (
          <span
            data-slot="account-pill-position"
            className="block max-w-40 truncate text-xs leading-tight text-white/70 capitalize"
          >
            {position}
          </span>
        ) : null}
      </span>
    </Comp>
  );
}

export { AccountPill };
