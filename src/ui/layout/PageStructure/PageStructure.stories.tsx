import type { Meta, StoryObj } from "@storybook/react-vite";

import { PageStructure } from "./PageStructure";
import { AppFilterRow } from "../AppFilterRow/AppFilterRow";
import { DataTable } from "../../brand/DataTable/DataTable";

const meta = {
  title: "Layout/PageStructure",
  component: PageStructure,
  parameters: { layout: "fullscreen" },
  decorators: [
    (Story) => (
      <div className="h-dvh p-4">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof PageStructure>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: <h1 className="text-2xl font-bold">Overview</h1>,
    children: <p>Page content scrolls inside the card.</p>,
  },
};

/** `filterRow` is opt-in — the app composes its own `<AppFilterRow>` and passes it in. */
export const WithFilterRow: Story = {
  args: {
    filterRow: <AppFilterRow>{null}</AppFilterRow>,
    title: <h1 className="text-2xl font-bold">Interactions</h1>,
    rightSlot: (
      <button className="ml-auto rounded-full bg-brand-purple px-4 py-2 text-sm text-white">
        Export
      </button>
    ),
    children: <p>Page content scrolls inside the card.</p>,
  },
};

const WIDE_ROWS = Array.from({ length: 30 }, (_, index) => ({
  id: `IX-${4821 + index}`,
  agent: ["Anna Petrosyan", "David Grigoryan", "Mariam Sargsyan"][index % 3],
  channel: ["voice", "webchat", "email"][index % 3],
  topic: "Billing question about a duplicated charge",
  status: index % 4 === 0 ? "Unresolved" : "Resolved",
  startedAt: "2026-08-28 09:14",
}));

/**
 * `fill` on a phone: the content stops scrolling as a page, and the table box
 * takes the card's remaining height and scrolls both ways itself — header
 * pinned, pager underneath. Widen the viewport past `lg` and the page scrolls
 * as one again.
 */
export const FilledByATable: Story = {
  globals: { viewport: { value: "mobile1", isRotated: false } },
  args: {
    fill: true,
    title: <h1 className="text-2xl font-bold">Interactions</h1>,
    children: (
      <DataTable
        columns={[
          { key: "id", dataIndex: "id", title: "ID" },
          { key: "agent", dataIndex: "agent", title: "Agent" },
          { key: "channel", dataIndex: "channel", title: "Channel" },
          { key: "topic", dataIndex: "topic", title: "Topic" },
          { key: "status", dataIndex: "status", title: "Status" },
          { key: "startedAt", dataIndex: "startedAt", title: "Started" },
        ]}
        dataSource={WIDE_ROWS}
        rowKey="id"
        pagination={{ pageSize: 15 }}
        fixedLayout
        stickyHeader
        className="max-lg:min-w-[720px]"
        containerClassName="max-lg:min-h-0 max-lg:overflow-auto"
        wrapperClassName="max-lg:flex max-lg:min-h-0 max-lg:flex-col"
      />
    ),
  },
};
