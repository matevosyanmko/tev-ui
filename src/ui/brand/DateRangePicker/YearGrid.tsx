import { DateCell } from "./DateCell.js";
import type { YearGridProps } from "./DateRangePicker.types.js";

/** Year mode: pick a year, and the range becomes that whole year. */
function YearGrid({ years, selected, onSelect }: YearGridProps) {
  return (
    <div
      data-slot="year-grid"
      className="grid max-h-44 grid-cols-3 gap-2 overflow-y-auto pr-1"
    >
      {years.map((year) => (
        <DateCell
          key={year}
          selected={selected === year}
          onClick={() => onSelect(year)}
          className="text-sm"
        >
          {year}
        </DateCell>
      ))}
    </div>
  );
}

export { YearGrid };
