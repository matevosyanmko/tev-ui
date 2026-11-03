import { cn } from "../../../utils.js";
import { Button } from "../../primitives/Button/Button.js";
import { Panel, PanelHeader, PanelRow } from "../Panel/Panel.js";
import type { FilterPanelProps } from "./FilterPanel.types.js";

/**
 * The meetings filter panel (100:43543): a header with the coral Reset pill
 * and the close square, then one canvas row per filter, 10px apart. It owns
 * no filter state — the app hands in each row's control (and that control's
 * picker popover) already wired, and resets or closes on the callbacks.
 *
 *   <PopoverContent variant="panel" align="end" sideOffset={8}>
 *     <FilterPanel rows={rows} onReset={reset} onClose={() => setOpen(false)} />
 *   </PopoverContent>
 *
 * A row's open trigger turns its chevron up (PanelRow), as 100:43660 draws.
 */
function FilterPanel({ rows, onReset, onClose, labels, className, ...props }: FilterPanelProps) {
  return (
    <Panel
      data-brand="filter-panel"
      role="group"
      aria-label={labels?.title ?? "Filters"}
      className={cn("gap-2.5", className)}
      {...props}
    >
      {onReset || onClose ? (
        <PanelHeader onClose={onClose} closeLabel={labels?.close ?? "Close filters"}>
          {onReset ? (
            <Button type="button" variant="danger" size="pill-xs" onClick={onReset}>
              {labels?.reset ?? "Reset"}
            </Button>
          ) : null}
        </PanelHeader>
      ) : null}
      {rows.map((row) => (
        <PanelRow key={row.id} label={row.label}>
          {row.control}
        </PanelRow>
      ))}
    </Panel>
  );
}

export { FilterPanel };
