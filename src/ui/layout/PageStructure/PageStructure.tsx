import { ScrollArea } from "../../primitives/ScrollArea/ScrollArea.js";
import { cn } from "../../../utils.js";
import type { PageStructureProps } from "./PageStructure.types.js";

// One header slot: its own full-width line below `lg`, no box at all from `lg` up.
const SLOT = "flex w-full min-w-0 items-center gap-2 lg:contents";

/**
 * The per-page frame: an optional filter-row slot, then a
 * title/leftSlot/centerSlot/rightSlot header row, then a scrollable content
 * card. Sits inside `<AppLayout>`'s main slot.
 *
 * Owns no data or context — a page (or the app's own PageStructure wrapper)
 * builds `filterRow` itself and hands it in already wired to routing, i18n
 * and whatever filter state the app keeps.
 *
 * Below `lg` the header row stacks: the title on its own line, then each of
 * the left and center slots at full width (a search field gets the whole
 * line), then the right slot as one line that scrolls sideways when its
 * actions do not fit. From `lg` up the slot wrappers are `display: contents`,
 * so every slot is a direct item of the one 56px header row, as it always was.
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
        <div className="flex h-full flex-col overflow-hidden px-3 pb-3 lg:px-4 lg:pb-4">
          {hasHeader && (
            <div
              data-slot="page-structure-header"
              className="flex flex-wrap items-center gap-x-3 gap-y-2 py-3 lg:h-14 lg:gap-y-3 lg:py-0"
            >
              {title}
              {leftSlot ? (
                <div data-slot="page-structure-left" className={SLOT}>
                  {leftSlot}
                </div>
              ) : null}
              {centerSlot ? (
                <div data-slot="page-structure-center" className={SLOT}>
                  {centerSlot}
                </div>
              ) : null}
              {rightSlot ? (
                <div
                  data-slot="page-structure-right"
                  className={cn(
                    SLOT,
                    "[scrollbar-width:none] overflow-x-auto max-lg:*:shrink-0 [&::-webkit-scrollbar]:hidden",
                  )}
                >
                  {rightSlot}
                </div>
              ) : null}
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
