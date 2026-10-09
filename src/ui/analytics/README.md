# Analytics components

Dashboard widgets: KPI tiles, charts, heatmaps and the pieces they share, plus
the `componentKey` catalog that names them and the renderer that draws a
stored widget from its key. Published as `@tev-ui/ui/analytics/<Name>`; story
titles go under `Analytics/*`.

Same folder shape as brand: `index.tsx` is the published entry point,
`<Name>.tsx` holds the implementation, and non-component siblings
(`.types.ts`, `.theme.ts`, `.samples.ts`, …) exist only when they hold
something. See the root `CLAUDE.md` for the rules those files exist to satisfy.

Charts need `recharts` (an optional peer). `AnalyticsCatalog` does not: it is
plain data, so an app can import the keys without bundling a chart.

## What is here

| Component | What it is |
| --- | --- |
| `AnalyticsCatalog` | Every `componentKey` a widget may store (`ANALYTICS_COMPONENT_KEYS`, `AnalyticsComponentKey`), with label, category, description, drawing component and grid span. `isAnalyticsComponentKey` / `getAnalyticsComponent` for stored values. |
| `AnalyticsWidget` | Draws a widget from `componentKey` + `title` + `description` + `data`; `data` is typed per key. `AnalyticsWidgetPreview` draws any key with `ANALYTICS_WIDGET_SAMPLES`. `bare` drops the title, description and card. |
| `ChartCard` | The white card a chart sits in, plus `ChartFrame` (sized `ResponsiveContainer` with an empty state), `ChartEmpty`, and the chart palette and Recharts styling (`CHART_*`). |
| `ChartLegend` | HTML legend: ink labels, coloured square or line swatches. |
| `ChartTooltip` | Labelled tooltip for Recharts' `content` prop. |
| `StatTile` | One headline number on a coloured accent. |
| `KpiTile` | Icon chip, figure with unit, meta line; four tones. |
| `DonutChart` | Share of a whole: legend below, or total in the hole with a share list. |
| `BarChart` | Columns or rows; single, grouped, stacked or 100% stacked; per-category colours for funnels. |
| `LineChart` | Series over time, optional fixed range and dashed reference line. |
| `ScatterChart` | Two measures, optionally a third as bubble size. |
| `Heatmap` | Two categorical axes: `cells` with counts, or `dense` (weekday × hour) with a scale. |
| `BreakdownBars` | One 100% bar per row, split by share, with in-bar percentages. |
| `BarList` | Axis-free ranked list: label, thin bar, share and count. |
| `Scorecard` | One row per entity, declarative columns (JSON-describable). |
| `AnalyticsNote` | One-line info or warning note. |
| `WidgetIcons` | The lucide icons a stored widget may name (`WIDGET_ICON_NAMES`, `WidgetIconName`), by kebab-case name. `getWidgetIcon` / `isWidgetIconName` resolve a stored value. Plain data, like `AnalyticsCatalog`; separate from brand `Icons`. |

## Adding a component type

1. Build the component in its own folder (or reuse one with new options).
2. Add a key to `ANALYTICS_COMPONENT_KEYS` and its entry to `AnalyticsCatalog`.
3. Add its data shape to `AnalyticsWidgetDataMap`, a `case` in
   `AnalyticsWidget`, and a sample to `ANALYTICS_WIDGET_SAMPLES` — TypeScript
   fails the build until all three exist.

Keys are persisted by apps, so a released key is never renamed or reused.
The same goes for `WIDGET_ICON_NAMES`.
