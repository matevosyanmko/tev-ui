import * as React from "react";
import { Info, TriangleAlert } from "lucide-react";

import { cn } from "../../../utils.js";

const TONES = {
  info: {
    box: "border-gray-100 bg-white text-gray-500",
    icon: "text-brand-purple",
    Icon: Info,
  },
  warning: {
    box: "border-amber-200 bg-amber-50 text-amber-700",
    icon: "text-amber-600",
    Icon: TriangleAlert,
  },
} as const;

interface AnalyticsNoteProps extends Omit<React.ComponentProps<"p">, "title"> {
  tone?: keyof typeof TONES;
  /** Bold lead-in before the text. */
  title?: React.ReactNode;
}

/**
 * One line that explains or qualifies the figures around it: what is counted
 * (info), or that a figure is an estimate (warning).
 */
function AnalyticsNote({
  tone = "info",
  title,
  className,
  children,
  ...props
}: AnalyticsNoteProps) {
  const { box, icon, Icon } = TONES[tone];
  return (
    <p
      data-slot="analytics-note"
      data-tone={tone}
      className={cn(
        "flex items-start gap-2 rounded-xl border px-4 py-2.5 text-[11px] leading-snug",
        box,
        className,
      )}
      {...props}
    >
      <Icon className={cn("mt-px size-3.5 shrink-0", icon)} aria-hidden="true" />
      <span>
        {title ? <span className="font-semibold">{title}</span> : null}
        {title && children ? " — " : null}
        {children}
      </span>
    </p>
  );
}

export { AnalyticsNote };
export type { AnalyticsNoteProps };
