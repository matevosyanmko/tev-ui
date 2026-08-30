import { cn } from "../../../utils.js";
import type { AppFilterRowProps } from "./AppFilterRow.types.js";

/**
 * The dark horizontally-scrolling filter-strip shell: a sticky caption plus
 * whatever filter controls the app drops in as children (usually a run of
 * `<FilterGroup>`s). The app owns which filters exist — this is only the track.
 */
function AppFilterRow({
  label = "Filter by",
  disabled = false,
  className,
  children,
  ...props
}: AppFilterRowProps) {
  return (
    <div
      data-slot="app-filter-row"
      className={cn("flex h-20 w-full shrink-0 items-center", className)}
      {...props}
    >
      <div
        data-slot="app-filter-row-track"
        data-disabled={disabled || undefined}
        aria-disabled={disabled}
        className={cn(
          "flex h-full flex-1 [scrollbar-width:none] items-center gap-3 overflow-x-auto rounded-[16px] border-0 bg-brand-surface-1 pr-4 transition-opacity outline-none [&::-webkit-scrollbar]:hidden",
          disabled && "pointer-events-none opacity-50",
        )}
      >
        <span
          data-slot="app-filter-row-label"
          className="sticky left-0 flex h-full shrink-0 items-center bg-brand-surface-1 pr-2 pl-4 text-[11px] text-white/70"
        >
          {label}
        </span>
        {children}
      </div>
    </div>
  );
}

export { AppFilterRow };
