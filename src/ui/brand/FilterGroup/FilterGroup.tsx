import { cn } from "../../../utils.js";
import type { FilterGroupProps } from "./FilterGroup.types.js";

/**
 * One labelled cluster in a filter strip: icon, caption, then whatever control
 * the caller drops in as `children` (usually a <FilterDropdown>).
 */
function FilterGroup({ icon: Icon, label, children, className, ...props }: FilterGroupProps) {
  return (
    <div
      data-slot="filter-group"
      className={cn("flex shrink-0 items-center gap-1.5 border-0 outline-none", className)}
      {...props}
    >
      {Icon ? <Icon size={24} className="shrink-0" /> : null}
      <span data-slot="filter-group-label" className="shrink-0 text-[11px]">
        {label}
      </span>
      {children}
    </div>
  );
}

export { FilterGroup };
