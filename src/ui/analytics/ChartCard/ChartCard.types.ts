/** One plotted series: which datum field it reads, what it is called, its hue. */
export interface ChartSeries {
  key: string;
  label: string;
  color: string;
}

/** A chart row: a category name plus the numeric fields its series read. */
export type ChartRow = { name: string } & Record<string, string | number | null | undefined>;

/** Formats a value for axes, tooltips and labels. */
export type ChartValueFormatter = (value: number) => string;
