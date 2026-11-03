import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";

import { DataTable } from "./DataTable";
import { Badge } from "../../primitives/Badge/Badge";
import { Chip } from "../../primitives/Chip/Chip";
import type { DataTableColumn, SortState } from "./DataTable.types";

interface Interaction {
  id: string;
  agent: { name: string };
  channel: "voice" | "webchat" | "email";
  sentiment: "positive" | "neutral" | "negative";
  duration: string;
  startedAt: string;
}

const ROWS: Interaction[] = [
  {
    id: "IX-4821",
    agent: { name: "Anna Petrosyan" },
    channel: "voice",
    sentiment: "positive",
    duration: "4m 12s",
    startedAt: "2026-08-28 09:14",
  },
  {
    id: "IX-4822",
    agent: { name: "David Grigoryan" },
    channel: "webchat",
    sentiment: "neutral",
    duration: "11m 03s",
    startedAt: "2026-08-28 09:20",
  },
  {
    id: "IX-4823",
    agent: { name: "Mariam Sargsyan" },
    channel: "email",
    sentiment: "negative",
    duration: "—",
    startedAt: "2026-08-28 09:31",
  },
  {
    id: "IX-4824",
    agent: { name: "Tigran Hakobyan" },
    channel: "voice",
    sentiment: "positive",
    duration: "2m 47s",
    startedAt: "2026-08-28 09:48",
  },
  {
    id: "IX-4825",
    agent: { name: "Anna Petrosyan" },
    channel: "voice",
    sentiment: "neutral",
    duration: "7m 30s",
    startedAt: "2026-08-28 10:02",
  },
];

const SENTIMENT_VARIANT = {
  positive: "secondary",
  neutral: "outline",
  negative: "destructive",
} as const;

const COLUMNS: DataTableColumn<Interaction>[] = [
  { key: "id", dataIndex: "id", title: "ID", width: 110, sortable: true },
  { key: "agent", dataIndex: ["agent", "name"], title: "Agent", sortable: true },
  { key: "channel", dataIndex: "channel", title: "Channel", width: 120 },
  {
    key: "sentiment",
    dataIndex: "sentiment",
    title: "Sentiment",
    width: 140,
    render: (value) => (
      <Badge variant={SENTIMENT_VARIANT[value as Interaction["sentiment"]]}>{String(value)}</Badge>
    ),
  },
  { key: "duration", dataIndex: "duration", title: "Duration", width: 120 },
  { key: "startedAt", dataIndex: "startedAt", title: "Started", width: 170, sortable: true },
];

const meta = {
  title: "Brand/DataTable",
  component: DataTable,
  argTypes: {
    status: { control: "inline-radio", options: ["ready", "pending", "refreshing", "error"] },
  },
  args: { columns: COLUMNS, dataSource: ROWS, rowKey: "id", status: "ready" },
  decorators: [
    (Story) => (
      <div className="w-[900px] max-w-full">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof DataTable<Interaction>>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Ready: Story = {};

/** First load: skeleton rows drawn through the real column grid, so the swap doesn't jolt. */
export const Pending: Story = { args: { status: "pending", skeletonRows: 5 } };

/**
 * The state the status union exists for — real rows still on screen, dimmed,
 * while the next page loads. The header and pager go inert; nothing unmounts.
 */
export const Refreshing: Story = { args: { status: "refreshing" } };

export const Errored: Story = {
  args: {
    status: "error",
    error: new Error("Request failed with status 503"),
    onRetry: () => {},
  },
};

/** Without `onRetry` no button is shown: there is genuinely nothing to re-run. */
export const ErroredWithoutRetry: Story = {
  args: { status: "error", error: new Error("Request failed with status 503") },
};

export const Empty: Story = { args: { dataSource: [] } };

/** Client-side paging: the table owns the page state and slices `dataSource` itself. */
export const ClientPagination: Story = {
  args: {
    dataSource: Array.from({ length: 47 }, (_, index) => ({
      ...ROWS[index % ROWS.length],
      id: `IX-${4821 + index}`,
    })),
    pagination: { pageSize: 8 },
  },
};

/** Server-driven paging: the caller owns `page` and fetches exactly one page's rows. */
export const ServerPagination: Story = {
  render: function ServerPaginationStory(args) {
    const [page, setPage] = React.useState(1);
    return (
      <DataTable {...args} pagination={{ page, pageSize: 5, total: 137, onPageChange: setPage }} />
    );
  },
};

/** Sorting is the caller's: the table renders the indicator and reports the key. */
export const Sortable: Story = {
  render: function SortableStory(args) {
    const [sort, setSort] = React.useState<SortState>({ key: "agent", dir: "asc" });
    return (
      <DataTable
        {...args}
        sort={sort}
        onSort={(key) =>
          setSort((current) =>
            current.key === key
              ? { key, dir: current.dir === "asc" ? "desc" : "asc" }
              : { key, dir: "asc" },
          )
        }
      />
    );
  },
};

/** The three header roles side by side, including the trailing action column. */
export const HeaderVariants: Story = {
  args: {
    fixedLayout: true,
    columns: [
      { key: "id", dataIndex: "id", title: "ID", width: 120 },
      { key: "agent", dataIndex: ["agent", "name"], title: "Agent" },
      {
        key: "channel",
        dataIndex: "channel",
        title: "Channel",
        headerVariant: "plain",
        width: 140,
      },
      {
        key: "actions",
        title: "Actions",
        headerVariant: "action",
        width: 120,
        render: () => (
          <button type="button" className="text-[11px] underline">
            Open
          </button>
        ),
      },
    ] satisfies DataTableColumn<Interaction>[],
  },
};

/** Every string it can draw, translated. The package carries no i18n itself. */
export const Translated: Story = {
  args: {
    dataSource: [],
    pagination: { pageSize: 2 },
    labels: {
      empty: "Данных нет",
      loadError: "Не удалось загрузить",
      retry: "Повторить",
      prev: "Назад",
      next: "Вперёд",
      page: (page, total) => `Страница ${page} из ${total}`,
      range: (from, to, total) => `${from}–${to} из ${total}`,
    },
  },
};

/**
 * The box as its own scroller: it fills a fixed-height parent through
 * `wrapperClassName`, scrolls both ways with `overflow-auto` in
 * `containerClassName`, and the header sticks inside it while the pager stays
 * under it. The table's `min-w-*` is what keeps the columns from shrinking.
 */
export const ScrollingBox: Story = {
  decorators: [
    (Story) => (
      <div className="flex h-[360px] w-[340px] flex-col">
        <Story />
      </div>
    ),
  ],
  args: {
    dataSource: Array.from({ length: 24 }, (_, index) => ({
      ...ROWS[index % ROWS.length],
      id: `IX-${4821 + index}`,
    })),
    pagination: { pageSize: 12 },
    stickyHeader: true,
    className: "min-w-[760px]",
    containerClassName: "min-h-0 overflow-auto",
    wrapperClassName: "flex min-h-0 flex-col",
  },
};

interface UsageRow {
  id: string;
  meeting: string;
  minutes: string;
  amount: string;
  date: string;
}

const USAGE_ROWS: UsageRow[] = [
  { id: "1", meeting: "UI/UX descussion", minutes: "12:35m", amount: "500$", date: "<1d" },
  {
    id: "2",
    meeting: "Very important topic of the day to be discussed ASAP",
    minutes: "12:35m",
    amount: "500$",
    date: "<1d",
  },
  { id: "3", meeting: "Ai talks", minutes: "12:35m", amount: "500$", date: "<1d" },
  { id: "4", meeting: "Հանդիպում հաճախորդի հետ", minutes: "1:05:10", amount: "1 200$", date: "3d" },
];

const USAGE_CELL = "h-16 px-4 text-body-14";
const USAGE_COLUMNS: DataTableColumn<UsageRow>[] = [
  {
    key: "meeting",
    dataIndex: "meeting",
    title: "Meeting",
    width: "50%",
    headerVariant: "inverse",
    cellClassName: `${USAGE_CELL} text-heading-16`,
  },
  {
    key: "minutes",
    dataIndex: "minutes",
    title: "Minutes",
    headerVariant: "inverse",
    cellClassName: USAGE_CELL,
    render: (value) => <Chip size="sm">{String(value)}</Chip>,
  },
  {
    key: "amount",
    dataIndex: "amount",
    title: "Amount",
    headerVariant: "inverse",
    cellClassName: USAGE_CELL,
  },
  {
    key: "date",
    dataIndex: "date",
    title: "Date",
    headerVariant: "inverse",
    cellClassName: USAGE_CELL,
  },
];

/**
 * TevScribe's plan history (100:40457): ink header cells, each with its own
 * 16px top radius, over white 64px rows with hairline dividers; the minutes
 * cell holds an outline Chip. Rows tint on hover.
 */
export const ScribeInverseHeader: StoryObj<typeof DataTable<UsageRow>> = {
  globals: { theme: "scribe" },
  render: () => (
    <div className="rounded-16 bg-surface-subtle p-4">
      <DataTable<UsageRow>
        columns={USAGE_COLUMNS}
        dataSource={USAGE_ROWS}
        rowKey="id"
        fixedLayout
        containerClassName="border-0"
      />
    </div>
  ),
};
