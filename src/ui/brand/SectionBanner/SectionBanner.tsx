import * as React from "react";

import { cn } from "../../../utils.js";

/**
 * Section divider used across dashboards: a full-width lavender banner holding
 * the section title, replacing the older "uppercase label + hairline rule".
 * Shared so every dashboard divides its sections identically.
 *
 * The heading level is fixed at <h2> — this sits under the page's <h1> by
 * construction. A page that needs a different level renders its own heading.
 */
function SectionBanner({
  className,
  children,
  variant = "default",
  ...props
}: React.ComponentProps<"div"> & {
  /**
   * `success-soft`: TevScribe's soft green note (100:40786) — a hug-sized
   * pill in the soft green with a green stroke and 12px body text, for a
   * plain statement rather than a section title, so it is a <p>, not an <h2>.
   */
  variant?: "default" | "success-soft";
}) {
  if (variant === "success-soft") {
    return (
      <div
        data-slot="section-banner"
        data-variant="success-soft"
        className={cn(
          "flex w-fit max-w-full items-center rounded-16 border border-stroke-accent-green bg-surface-accent-green-soft px-4 py-2",
          className,
        )}
        {...props}
      >
        <p data-slot="section-banner-title" className="text-body-12 text-content-primary">
          {children}
        </p>
      </div>
    );
  }

  return (
    <div
      data-slot="section-banner"
      className={cn(
        "mt-7 mb-4 rounded-full bg-brand-lavender-soft px-5 py-2.5 first:mt-0",
        className,
      )}
      {...props}
    >
      <h2
        data-slot="section-banner-title"
        className="text-[13px] font-bold tracking-[0.02em] text-black"
      >
        {children}
      </h2>
    </div>
  );
}

export { SectionBanner };
