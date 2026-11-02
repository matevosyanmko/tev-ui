import type * as React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";

import { ClockIcon, ScribbleIcon } from "../ScribeIcons/ScribeIcons";
import { MetricTile } from "./MetricTile";

const meta = {
  title: "Brand/MetricTile",
  component: MetricTile,
  globals: { theme: "scribe" },
  argTypes: { tone: { control: "inline-radio", options: ["accent", "inverse", "plain"] } },
  args: { tone: "accent", value: "38", unit: "hours", icon: <ClockIcon /> },
} satisfies Meta<typeof MetricTile>;

export default meta;
type Story = StoryObj<typeof meta>;

const onInk = (Story: React.ComponentType) => (
  <div className="w-102.5 rounded-16 bg-surface-inverse p-4">
    <Story />
  </div>
);

export const Default: Story = { decorators: [onInk] };

/** The usage screen's hero row (100:40457), as drawn on its ink panel. */
export const UsageRow: Story = {
  render: () => (
    <div className="flex w-298 items-start gap-4 overflow-clip rounded-16 bg-surface-inverse p-4">
      <MetricTile tone="accent" value="38" unit="hours" icon={<ClockIcon />} className="flex-1" />
      <MetricTile
        tone="inverse"
        value="16"
        unit="Meetings"
        icon={<ScribbleIcon />}
        className="flex-1"
      />
      <MetricTile tone="plain" value="117.84$" unit="Total" className="flex-1" />
    </div>
  ),
};

/** Armenian units, a figure without a unit, and a long figure in a narrow tile. */
export const EdgeCases: Story = {
  decorators: [onInk],
  render: () => (
    <div className="flex flex-col gap-4">
      <MetricTile tone="accent" value="38" unit="ժամ" icon={<ClockIcon />} />
      <MetricTile tone="inverse" value="0" icon={<ScribbleIcon />} />
      <MetricTile tone="plain" value="12,417.84$" unit="Ընդհանուր" />
    </div>
  ),
};
