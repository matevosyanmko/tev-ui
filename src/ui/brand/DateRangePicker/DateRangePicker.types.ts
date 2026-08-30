import type { Dayjs } from "dayjs";

export type DateMode = "year" | "month" | "custom";

/** `[start, end]`. Empty while nothing is chosen. */
export type DateRangeValue = Dayjs[];

export type DatePreset = "7d" | "30d" | "90d" | "month";

export interface DateRangePickerLabels {
  selectRange?: string;
  year?: string;
  month?: string;
  custom?: string;
  last7Days?: string;
  last30Days?: string;
  last90Days?: string;
  thisMonth?: string;
  from?: string;
  to?: string;
  discard?: string;
  save?: string;
  /** Twelve month names, January first. The month grid slices these to three characters. */
  months?: string[];
}

export interface DateRangePickerProps {
  value?: DateRangeValue;
  onChange: (value: DateRangeValue) => void;
  mode?: DateMode;
  onModeChange?: (mode: DateMode) => void;
  /** How many years back the year list reaches. */
  yearSpan?: number;
  labels?: DateRangePickerLabels;
  /** Classes for the trigger button. */
  className?: string;
  /** Classes for the popover panel. */
  contentClassName?: string;
}

export interface YearGridProps {
  years: string[];
  selected: string;
  onSelect: (year: string) => void;
}

export interface MonthGridProps {
  years: string[];
  selectedYear: string;
  selectedMonth: string;
  months: string[];
  yearLabel?: string;
  onYearSelect: (year: string) => void;
  onMonthSelect: (month: string) => void;
}

export interface CustomRangePanelProps {
  value?: DateRangeValue;
  onChange: (value: DateRangeValue) => void;
  /** Close the popover — the panel owns both the discard and the save action. */
  onClose: () => void;
  labels?: DateRangePickerLabels;
}
