import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";

import { NotificationBell } from "./NotificationBell";
import type { NotificationItemData } from "./NotificationBell.types";

const minutesAgo = (minutes: number) => new Date(Date.now() - minutes * 60_000);

const ITEMS: NotificationItemData[] = [
  {
    id: 1,
    tone: "danger",
    title: "Critical alert: abandonment rate above 18%",
    hasDetails: true,
    createdAt: minutesAgo(3),
  },
  {
    id: 2,
    tone: "success",
    title: "Audio analysis complete",
    body: "42 recordings processed for the Yerevan team.",
    createdAt: minutesAgo(26),
  },
  {
    id: 3,
    tone: "warning",
    title: "Sentiment drift detected on webchat",
    hasDetails: true,
    createdAt: minutesAgo(190),
  },
  {
    id: 4,
    tone: "default",
    read: true,
    title: "Weekly quality digest is ready",
    body: "Resolution rate up 4 points week over week.",
    createdAt: minutesAgo(1520),
  },
  {
    id: 5,
    tone: "success",
    read: true,
    title: "Sentiment analysis complete",
    body: "A body long enough that it has to truncate rather than wrap onto a second line.",
    createdAt: minutesAgo(2900),
  },
];

const meta = {
  title: "Brand/NotificationBell",
  component: NotificationBell,
  args: { items: ITEMS, unseen: 3 },
  decorators: [
    (Story) => (
      <div className="flex h-[520px] w-[560px] justify-end rounded-[24px] bg-brand-surface-1 p-4">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof NotificationBell>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Click the bell: the panel opens with the green dot still marking unseen items. */
export const Default: Story = {};

/** Nothing unseen — no dot on the bell. */
export const AllSeen: Story = { args: { unseen: 0 } };

export const Empty: Story = { args: { items: [], unseen: 0 } };

/** The header only appears when there is a `onMarkAllRead` for it to call. */
export const WithMarkAllHeader: Story = {
  render: function WithMarkAllHeaderStory(args) {
    const [items, setItems] = React.useState(ITEMS);
    return (
      <NotificationBell
        {...args}
        items={items}
        onMarkAllRead={() => setItems((current) => current.map((i) => ({ ...i, read: true })))}
      />
    );
  },
};

/** Controlled open state, so the app can close the panel as it navigates away. */
export const Controlled: Story = {
  render: function ControlledStory(args) {
    const [open, setOpen] = React.useState(true);
    return <NotificationBell {...args} open={open} onOpenChange={setOpen} />;
  },
};

/** `formatTime` is where locale and plural rules belong — not in this package. */
export const TranslatedTimes: Story = {
  args: {
    labels: { title: "Уведомления", empty: "Пусто", showDetails: "Подробнее" },
    formatTime: (value) => {
      const minutes = Math.floor((Date.now() - new Date(value).getTime()) / 60_000);
      if (minutes < 60) return `${minutes} мин назад`;
      const hours = Math.floor(minutes / 60);
      if (hours < 24) return `${hours} ч назад`;
      return `${Math.floor(hours / 24)} дн назад`;
    },
  },
};
