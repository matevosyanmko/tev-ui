import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../primitives/Select/Select.js";
import { DateCell } from "./DateCell.js";
import type { MonthGridProps } from "./DateRangePicker.types.js";

/**
 * Month mode: a year picker over a twelve-cell grid. The range becomes the
 * whole of the chosen month.
 */
function MonthGrid({
  years,
  selectedYear,
  selectedMonth,
  months,
  yearLabel,
  onYearSelect,
  onMonthSelect,
}: MonthGridProps) {
  return (
    <div data-slot="month-grid" className="space-y-2">
      <Select value={selectedYear} onValueChange={onYearSelect}>
        <SelectTrigger className="rounded-xl border-black/10">
          <SelectValue placeholder={yearLabel} />
        </SelectTrigger>
        <SelectContent>
          {years.map((year) => (
            <SelectItem key={year} value={year}>
              {year}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <div className="grid grid-cols-3 gap-2">
        {months.map((name, index) => (
          <DateCell
            key={name}
            selected={selectedMonth === String(index)}
            onClick={() => onMonthSelect(String(index))}
            className="text-xs"
          >
            {name.slice(0, 3)}
          </DateCell>
        ))}
      </div>
    </div>
  );
}

export { MonthGrid };
