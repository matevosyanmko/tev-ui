import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";

import { DataTable } from "./DataTable";
import { Badge } from "../../primitives/Badge/Badge";
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
