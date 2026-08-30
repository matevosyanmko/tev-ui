import { ScrollArea } from "../../primitives/ScrollArea/ScrollArea.js";
import { cn } from "../../../utils.js";
import type { PageStructureProps } from "./PageStructure.types.js";

/**
 * The per-page frame: an optional filter-row slot, then a
 * title/leftSlot/centerSlot/rightSlot header row, then a scrollable content
 * card. Sits inside `<AppLayout>`'s main slot.
 *
 * Owns no data or context — a page (or the app's own PageStructure wrapper)
 * builds `filterRow` itself and hands it in already wired to routing, i18n
 * and whatever filter state the app keeps.
 */
function PageStructure({
  filterRow,
  title,
  leftSlot,
  centerSlot,
  rightSlot,
  children,
  contentClassName = "mt-3",
  contentProps,
  className,
  ...props
}: PageStructureProps) {
  const hasHeader = Boolean(title || leftSlot || centerSlot || rightSlot);

  return (
    <div data-slot="page-structure" className={cn("flex h-full flex-col", className)} {...props}>
      {filterRow}

      <div
        data-slot="page-structure-content"
        className={cn(
          "h-full overflow-hidden rounded-3xl bg-brand-purple-soft text-black",
          contentClassName,
        )}
        {...contentProps}
      >
        <div className="flex h-full flex-col overflow-hidden p-4 pt-0">
          {hasHeader && (
            <div
              data-slot="page-structure-header"
              className="flex h-14 flex-wrap items-center gap-3"
            >
              {title}
              {leftSlot}
              {centerSlot}
              {rightSlot}
            </div>
          )}

          <div className="flex-1 overflow-hidden">
            <ScrollArea className="h-full">{children}</ScrollArea>
          </div>
        </div>
      </div>
    </div>
  );
}

export { PageStructure };
