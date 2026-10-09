/*
 * Sample figures for every component type: what a catalogue, a widget editor
 * or a story renders before real data exists. Its own module because it
 * exports values, not components.
 */
import {
  CHART_BLACK,
  CHART_GREEN,
  CHART_CORAL,
  CHART_INK,
  CHART_PURPLE,
  CHART_PURPLE_XLT,
  CHART_RIDE_SENTIMENT,
  CHART_SENTIMENT,
  CHART_VIOLET,
} from "../ChartCard/ChartCard.theme.js";
import type { AnalyticsComponentKey } from "../AnalyticsCatalog/AnalyticsCatalog.js";
import type { AnalyticsWidgetDataMap } from "./AnalyticsWidget.types.js";

const TOPICS = [
  { name: "Billing", total: 412, resolved: 318, unresolved: 94 },
  { name: "Delivery", total: 318, resolved: 221, unresolved: 97 },
  { name: "Refunds", total: 204, resolved: 120, unresolved: 84 },
  { name: "Account access", total: 151, resolved: 132, unresolved: 19 },
  { name: "Plan change", total: 96, resolved: 81, unresolved: 15 },
];

const BY_HOUR = [
  4, 2, 1, 1, 2, 6, 14, 32, 58, 74, 81, 77, 69, 72, 80, 76, 64, 52, 41, 30, 22, 15, 9, 6,
];

const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const HOURS = Array.from({ length: 24 }, (_, hour) => `${String(hour).padStart(2, "0")}:00`);

/** A smooth, deterministic "busy daytime, quiet night" week. */
function weekHourValues() {
  return WEEKDAYS.map((_, day) =>
    HOURS.map((_, hour) => {
      const daytime = Math.max(0, Math.sin(((hour - 6) / 18) * Math.PI));
      const weekend = day >= 5 ? 0.7 : 1;
      const evening = hour >= 17 && hour <= 20 ? 1.25 : 1;
      return Math.round(40 * daytime * weekend * evening + ((day * 7 + hour) % 5));
    }),
  );
}

const SENTIMENT_SEGMENTS = [
  { key: "positive", label: "Positive", color: CHART_RIDE_SENTIMENT.positive, ink: "#fff" },
  { key: "neutral", label: "Neutral", color: CHART_RIDE_SENTIMENT.neutral, ink: CHART_INK },
  { key: "negative", label: "Negative", color: CHART_RIDE_SENTIMENT.negative, ink: "#fff" },
];

export const ANALYTICS_WIDGET_SAMPLES: { [K in AnalyticsComponentKey]: AnalyticsWidgetDataMap[K] } =
  {
    kpi_stat: { value: "1,284", accent: CHART_PURPLE },
    kpi_icon: { value: 72, unit: "/ 100", tone: "purple" },
    donut: {
      data: [
        { name: "Billing", value: 412 },
        { name: "Delivery", value: 318 },
        { name: "Refunds", value: 204 },
        { name: "Account access", value: 151 },
        { name: "Other", value: 96 },
      ],
    },
    donut_center_total: {
      totalLabel: "Total feedback",
      data: [
        { name: "TXAI", value: 1240, color: CHART_GREEN },
        { name: "Uber", value: 860, color: CHART_BLACK },
        { name: "K2", value: 512, color: CHART_PURPLE },
        { name: "Other providers", value: 188, color: CHART_PURPLE_XLT },
      ],
    },
    bar_vertical: {
      data: BY_HOUR.map((count, hour) => ({ name: String(hour).padStart(2, "0"), count })),
      series: [{ key: "count", label: "Calls", color: CHART_PURPLE }],
      maxBarSize: 14,
      tickInterval: 1,
    },
    bar_horizontal: {
      data: TOPICS,
      series: [{ key: "total", label: "Calls", color: CHART_PURPLE }],
    },
    bar_funnel: {
      data: [
        { name: "At risk", value: 320, color: CHART_PURPLE },
        { name: "Contacted", value: 214, color: CHART_VIOLET },
        { name: "Retained", value: 131, color: CHART_GREEN },
      ],
      series: [{ key: "value", label: "Customers", color: CHART_PURPLE }],
      categoryWidth: 90,
      maxBarSize: 36,
    },
    bar_stacked_horizontal: {
      data: TOPICS,
      series: [
        { key: "resolved", label: "Resolved", color: CHART_PURPLE },
        { key: "unresolved", label: "Unresolved", color: CHART_GREEN },
      ],
    },
    bar_stacked_100_vertical: {
      data: [
        { name: "Billing", positive: 38, neutral: 34, negative: 28 },
        { name: "Delivery", positive: 29, neutral: 30, negative: 41 },
        { name: "Refunds", positive: 21, neutral: 33, negative: 46 },
        { name: "Account access", positive: 55, neutral: 31, negative: 14 },
        { name: "Plan change", positive: 47, neutral: 38, negative: 15 },
      ],
      series: [
        { key: "positive", label: "Positive", color: CHART_SENTIMENT.positive },
        { key: "neutral", label: "Neutral", color: CHART_SENTIMENT.neutral },
        { key: "negative", label: "Negative", color: CHART_SENTIMENT.negative },
      ],
      slantLabels: true,
      height: 280,
    },
    bar_grouped_vertical: {
      data: [
        { name: "TXAI", safety: 2.1, cancellation: 8.4, longWait: 12.6 },
        { name: "Uber", safety: 1.2, cancellation: 5.9, longWait: 9.8 },
        { name: "K2", safety: 3.4, cancellation: 11.2, longWait: 7.1 },
      ],
      series: [
        { key: "safety", label: "Safety incident", color: CHART_CORAL },
        { key: "cancellation", label: "Cancellation", color: CHART_PURPLE },
        { key: "longWait", label: "Long wait", color: CHART_VIOLET },
      ],
      maxBarSize: 18,
      height: 200,
      formatValue: (value) => `${value}%`,
    },
    bar_grouped_horizontal: {
      data: [
        { name: "Billing", paid: 34, notPaid: 22 },
        { name: "Delivery", paid: 21, notPaid: 29 },
        { name: "Refunds", paid: 18, notPaid: 25 },
        { name: "Account access", paid: 15, notPaid: 12 },
      ],
      series: [
        { key: "paid", label: "Paid", color: CHART_PURPLE },
        { key: "notPaid", label: "Not paid", color: CHART_GREEN },
      ],
      maxBarSize: 12,
      categoryWidth: 130,
      formatValue: (value) => `${value}%`,
    },
    line_multi: {
      data: [
        { name: "Aug 4", positive: 120, neutral: 88, negative: 41 },
        { name: "Aug 11", positive: 134, neutral: 92, negative: 38 },
        { name: "Aug 18", positive: 128, neutral: 97, negative: 52 },
        { name: "Aug 25", positive: 151, neutral: 90, negative: 47 },
        { name: "Sep 1", positive: 162, neutral: 101, negative: 39 },
        { name: "Sep 8", positive: 149, neutral: 95, negative: 44 },
        { name: "Sep 15", positive: 171, neutral: 104, negative: 36 },
        { name: "Sep 22", positive: 183, neutral: 99, negative: 33 },
      ],
      series: [
        { key: "positive", label: "Positive", color: CHART_SENTIMENT.positive },
        { key: "neutral", label: "Neutral", color: CHART_SENTIMENT.neutral },
        { key: "negative", label: "Negative", color: CHART_SENTIMENT.negative },
      ],
      strokeWidth: 3,
    },
    line_score_reference: {
      data: [
        { name: "Sep 1", txai: 68, uber: 61, k2: 54 },
        { name: "Sep 8", txai: 71, uber: 58, k2: 49 },
        { name: "Sep 15", txai: 66, uber: 63, k2: 57 },
        { name: "Sep 22", txai: 74, uber: 60, k2: 45 },
        { name: "Sep 29", txai: 77, uber: 65, k2: 52 },
        { name: "Oct 6", txai: 72, uber: 67, k2: 58 },
      ],
      series: [
        { key: "txai", label: "TXAI", color: CHART_GREEN },
        { key: "uber", label: "Uber", color: CHART_BLACK },
        { key: "k2", label: "K2", color: CHART_PURPLE },
      ],
      height: 240,
    },
    scatter_bubble: {
      data: [
        { name: "Billing", minutes: 6.2, resolution: 77, total: 412 },
        { name: "Delivery", minutes: 8.9, resolution: 69, total: 318 },
        { name: "Refunds", minutes: 11.4, resolution: 59, total: 204 },
        { name: "Account access", minutes: 4.1, resolution: 87, total: 151 },
        { name: "Plan change", minutes: 5.3, resolution: 84, total: 96 },
      ],
      x: { key: "minutes", label: "Avg handling time", unit: " min" },
      y: { key: "resolution", label: "Resolution", unit: "%", domain: [0, 100] },
      size: { key: "total", label: "Interactions" },
    },
    scatter: {
      data: [
        { name: "Billing", poorService: 22, highRisk: 31 },
        { name: "Delivery", poorService: 35, highRisk: 44 },
        { name: "Refunds", poorService: 48, highRisk: 57 },
        { name: "Account access", poorService: 12, highRisk: 15 },
        { name: "Plan change", poorService: 18, highRisk: 38 },
      ],
      x: { key: "poorService", label: "Poor-service calls", unit: "%", domain: [0, 100] },
      y: { key: "highRisk", label: "High churn risk", unit: "%", domain: [0, 100] },
    },
    heatmap_matrix: {
      rows: ["Anna K.", "David M.", "Lilit S.", "Mark T.", "Sona A."],
      columns: ["Billing", "Delivery", "Refunds", "Access", "Plan"],
      values: [
        [12, 4, 9, 1, 0],
        [3, 15, 6, 2, 1],
        [7, 2, 18, 0, 3],
        [1, 8, 3, 5, 0],
        [0, 3, 11, 2, 6],
      ],
      cellLabel: (row, column, value) => `${row} · ${column}: ${value} unresolved`,
    },
    heatmap_week_hour: {
      rows: WEEKDAYS,
      columns: HOURS,
      values: weekHourValues(),
      columnLabel: (column, index) => (index % 4 === 0 ? column : ""),
      scaleLabel: "Feedback per hour",
      cellLabel: (row, column, value) => `${row} · ${column} — ${value} feedback`,
    },
    breakdown_100_rows: {
      segments: SENTIMENT_SEGMENTS,
      rows: [
        {
          key: "all",
          label: "All providers",
          emphasis: true,
          values: { positive: 1312, neutral: 804, negative: 496 },
        },
        {
          key: "txai",
          label: "TXAI",
          color: CHART_GREEN,
          values: { positive: 702, neutral: 341, negative: 197 },
        },
        {
          key: "uber",
          label: "Uber",
          color: CHART_BLACK,
          values: { positive: 418, neutral: 282, negative: 160 },
        },
        {
          key: "k2",
          label: "K2",
          color: CHART_PURPLE,
          values: { positive: 192, neutral: 181, negative: 139 },
        },
      ],
    },
    bar_list: {
      items: [
        { key: "wait", label: "Waiting time", value: 412 },
        { key: "app", label: "App booking", value: 298 },
        { key: "driving", label: "Driving smoothness", value: 241 },
        { key: "safety", label: "Safety", value: 133 },
        { key: "clean", label: "Vehicle cleanliness", value: 98 },
        { key: "fare", label: "Fare transparency", value: 74 },
      ],
    },
    scorecard_table: {
      columns: [
        { key: "name", label: "Provider", colorKey: "color" },
        {
          key: "feedback",
          label: "Feedback",
          format: "number",
          mutedKey: "share",
          mutedFormat: "percent",
        },
        { key: "avgSentiment", label: "Avg sentiment", format: "number" },
        { key: "positive", label: "Positive", format: "percent" },
        { key: "negative", label: "Negative", format: "percent" },
        { key: "analysed", label: "Analysed", format: "number" },
        { key: "cancellation", label: "Cancellation rate", format: "percent" },
        { key: "safety", label: "Safety incidents", format: "number" },
        { key: "longWait", label: "Long-wait rate", format: "percent" },
        { key: "topTopic", label: "Top topic" },
      ],
      rows: [
        {
          name: "TXAI",
          color: CHART_GREEN,
          feedback: 1240,
          share: 44,
          avgSentiment: 71,
          positive: 57,
          negative: 16,
          analysed: 1102,
          cancellation: 8.4,
          safety: 23,
          longWait: 12.6,
          topTopic: "Waiting time",
        },
        {
          name: "Uber",
          color: CHART_BLACK,
          feedback: 860,
          share: 31,
          avgSentiment: 66,
          positive: 49,
          negative: 19,
          analysed: 790,
          cancellation: 5.9,
          safety: 9,
          longWait: 9.8,
          topTopic: "App booking",
        },
        {
          name: "K2",
          color: CHART_PURPLE,
          feedback: 512,
          share: 18,
          avgSentiment: 54,
          positive: 38,
          negative: 27,
          analysed: 455,
          cancellation: 11.2,
          safety: 15,
          longWait: 7.1,
          topTopic: "Safety",
        },
      ],
    },
    note_info: { text: "Every figure counts customer feedback, not trips." },
    note_warning: {
      text: "Churn risk is a derived heuristic — no native churn data is collected yet.",
    },
  };
