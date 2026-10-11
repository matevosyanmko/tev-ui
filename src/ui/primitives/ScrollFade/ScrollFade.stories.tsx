import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { ScrollFade } from "./ScrollFade";

const meta = {
  title: "Primitives/ScrollFade",
  component: ScrollFade,
  argTypes: {
    orientation: { control: "inline-radio", options: ["vertical", "horizontal"] },
    fade: { control: "inline-radio", options: ["both", "start", "end", "none"] },
    fadeSize: { control: "text" },
    hideScrollbar: { control: "boolean" },
  },
  args: { orientation: "vertical", fade: "both", hideScrollbar: false },
} satisfies Meta<typeof ScrollFade>;

export default meta;
type Story = StoryObj<typeof meta>;

const topics = [
  "Billing dispute",
  "Card blocked",
  "Delivery delay",
  "Refund request",
  "Plan change",
  "Account access",
  "Password reset",
  "Roaming charges",
  "Internet outage",
  "Contract renewal",
  "Number porting",
  "Device repair",
  "Coverage complaint",
  "Data top-up",
  "Invoice copy",
];

const tabs = [
  "Operators Analysis",
  "Standard",
  "Custom (Churn)",
  "Agents",
  "Topics",
  "Quality",
  "Sentiment trend",
  "Peak hours",
  "Segments",
  "Paid vs not paid",
];

function TopicList() {
  return topics.map((topic, index) => (
    <div key={topic} className="flex justify-between border-b px-4 py-2.5 text-sm last:border-b-0">
      <span>{topic}</span>
      <span className="text-muted-foreground tabular-nums">{(index + 3) * 17}</span>
    </div>
  ));
}

/** A list in a fixed height: no top fade until it is scrolled. */
export const Vertical: Story = {
  render: (args) => (
    <ScrollFade {...args} className="h-64 w-72 rounded-md border">
      <TopicList />
    </ScrollFade>
  ),
};

/** A strip of pills wider than its row, scrollbar hidden. */
export const Horizontal: Story = {
  args: { orientation: "horizontal", hideScrollbar: true },
  render: (args) => (
    <ScrollFade {...args} className="flex w-96 gap-2">
      {tabs.map((tab) => (
        <span
          key={tab}
          className="shrink-0 rounded-full bg-secondary px-4 py-2 text-xs font-semibold whitespace-nowrap text-secondary-foreground"
        >
          {tab}
        </span>
      ))}
    </ScrollFade>
  ),
};

/**
 * `asChild`: the tab list itself is the scroller, keeping its own role and
 * classes, with no wrapper in between.
 */
export const AsChildTabList: Story = {
  args: { orientation: "horizontal", hideScrollbar: true, fadeSize: "2.5rem" },
  render: (args) => <TabListDemo {...args} />,
};

function TabListDemo(props: React.ComponentProps<typeof ScrollFade>) {
  const [selected, setSelected] = React.useState(tabs[0]);
  return (
    <ScrollFade {...props} asChild>
      <div role="tablist" aria-label="Analytics" className="flex w-96 snap-x gap-2">
        {tabs.map((tab) => (
          <button
            key={tab}
            type="button"
            role="tab"
            aria-selected={tab === selected}
            onClick={() => setSelected(tab)}
            className="h-9 shrink-0 snap-start rounded-full bg-secondary px-5 text-xs font-semibold whitespace-nowrap text-secondary-foreground aria-selected:bg-primary aria-selected:text-primary-foreground"
          >
            {tab}
          </button>
        ))}
      </div>
    </ScrollFade>
  );
}

/**
 * The fade is a mask, not a painted gradient: content turns transparent and
 * the background shows through, whatever it is.
 */
export const OnAnyBackground: Story = {
  render: (args) => (
    <div className="flex flex-wrap gap-4">
      {[
        "bg-background",
        "bg-primary text-primary-foreground",
        "bg-brand-purple-soft",
        "bg-foreground text-background",
      ].map((surface) => (
        <div key={surface} className={`rounded-xl p-3 ${surface}`}>
          <ScrollFade {...args} className="h-48 w-56">
            {topics.map((topic) => (
              <div key={topic} className="px-2 py-2 text-sm">
                {topic}
              </div>
            ))}
          </ScrollFade>
        </div>
      ))}
    </div>
  ),
};

/** Only the end fades: a hint that there is more, without dimming what was read. */
export const EndOnly: Story = {
  args: { fade: "end", fadeSize: 48 },
  render: Vertical.render,
};

/** Fewer items than room: nothing overflows, so nothing fades. */
export const NoOverflow: Story = {
  render: (args) => (
    <ScrollFade {...args} className="h-64 w-72 rounded-md border">
      {topics.slice(0, 3).map((topic) => (
        <div key={topic} className="border-b px-4 py-2.5 text-sm last:border-b-0">
          {topic}
        </div>
      ))}
    </ScrollFade>
  ),
};
