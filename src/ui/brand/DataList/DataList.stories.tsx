import type { Meta, StoryObj } from "@storybook/react-vite";
import { Badge } from "../../primitives/Badge/Badge";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "../../primitives/Item/Item";
import { DataList, DataListEmpty, DataListGroup, DataListHeading } from "./DataList";

const meta = {
  title: "Brand/DataList",
  component: DataList,
  args: { status: "ready" },
  argTypes: {
    status: { control: "inline-radio", options: ["pending", "refreshing", "error", "ready"] },
  },
  decorators: [
    (Story) => (
      <div className="w-[360px] rounded-3xl bg-brand-purple-soft p-3">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof DataList>;

export default meta;
type Story = StoryObj<typeof meta>;

const DAYS = [
  {
    day: "Today",
    rows: [
      {
        id: "1",
        title: "Quarterly planning with the product, design and engineering leads",
        meta: "Zoom · 08:23 · 1 h 2 min",
      },
      { id: "2", title: "Weekly sync", meta: "Google Meet · 10:00 · 45 min" },
    ],
  },
  {
    day: "Tuesday, October 13",
    rows: [{ id: "3", title: "Customer interview", meta: "Google Meet · 15:30 · 30 min" }],
  },
];

const ROWS = DAYS.map(({ day, rows }) => (
  <DataListGroup key={day}>
    <DataListHeading>{day}</DataListHeading>
    {rows.map((row) => (
      <Item key={row.id} size="sm" asChild>
        <a href={`#${row.id}`}>
          <ItemMedia className="size-9 rounded-lg bg-accent text-xs font-semibold text-accent-foreground">
            GM
          </ItemMedia>
          <ItemContent>
            <ItemTitle className="line-clamp-2">{row.title}</ItemTitle>
            <ItemDescription>{row.meta}</ItemDescription>
          </ItemContent>
          <ItemActions>
            <Badge variant="secondary">Completed</Badge>
          </ItemActions>
        </a>
      </Item>
    ))}
  </DataListGroup>
));

/** Rows grouped by day, each one a link to its page. */
export const Ready: Story = { render: (args) => <DataList {...args}>{ROWS}</DataList> };

export const Pending: Story = {
  args: { status: "pending", skeletonItems: 4 },
  render: (args) => <DataList {...args}>{ROWS}</DataList>,
};

/** The real rows stay, dimmed and inert, while a different result set loads. */
export const Refreshing: Story = {
  args: { status: "refreshing" },
  render: (args) => <DataList {...args}>{ROWS}</DataList>,
};

export const LoadError: Story = {
  args: {
    status: "error",
    error: new globalThis.Error("Could not reach the server."),
    onRetry: () => {},
  },
  render: (args) => <DataList {...args}>{ROWS}</DataList>,
};

export const Empty: Story = {
  render: (args) => (
    <DataList {...args}>
      <DataListEmpty>No meetings yet.</DataListEmpty>
    </DataList>
  ),
};
