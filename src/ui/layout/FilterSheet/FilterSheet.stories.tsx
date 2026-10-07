import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";

import { FilterSheet } from "./FilterSheet";
import { FilterGroup } from "../../brand/FilterGroup/FilterGroup";
import { FilterDropdown } from "../../brand/FilterDropdown/FilterDropdown";
import { ChannelIcon, DirectionIcon, StatementIcon } from "../../brand/Icons/Icons";

const meta = {
  title: "Layout/FilterSheet",
  component: FilterSheet,
  parameters: { layout: "fullscreen" },
  // Mobile-only chrome: below `lg` is where an app shows it.
  globals: { viewport: { value: "mobile1", isRotated: false } },
  decorators: [
    (Story) => (
      <div className="flex h-dvh flex-col gap-3 bg-black p-3">
        <div className="flex h-12 items-center gap-2">
          <Story />
        </div>
        <div className="flex-1 rounded-3xl bg-brand-purple-soft" />
      </div>
    ),
  ],
} satisfies Meta<typeof FilterSheet>;

export default meta;
type Story = StoryObj<typeof meta>;

const GROUP = "h-12 rounded-[24px] bg-brand-surface-2 p-2";

/**
 * The same `<FilterGroup>`s an app puts in `AppFilterRow`, one per row. The
 * badge counts the filters that are set; Reset (shown only then) clears them.
 */
export const Default: Story = {
  args: { children: null },
  render: function Render() {
    const [channel, setChannel] = React.useState("voice");
    const [sentiment, setSentiment] = React.useState("");
    const [direction, setDirection] = React.useState("");
    const count = [channel, sentiment, direction].filter(Boolean).length;

    return (
      <FilterSheet
        count={count}
        summary="2026-01-01 – 2026-01-31"
        onReset={() => {
          setChannel("");
          setSentiment("");
          setDirection("");
        }}
      >
        <FilterGroup icon={ChannelIcon} label="Channel" className={GROUP}>
          <FilterDropdown
            value={channel}
            allLabel="All channels"
            options={[
              { value: "voice", label: "Voice" },
              { value: "webchat", label: "Web chat" },
              { value: "email", label: "Email" },
            ]}
            onChange={setChannel}
            minWidth={100}
          />
        </FilterGroup>
        <FilterGroup icon={StatementIcon} label="Sentiment" className={GROUP}>
          <FilterDropdown
            value={sentiment}
            allLabel="All sentiment"
            options={[
              { value: "positive", label: "Positive" },
              { value: "neutral", label: "Neutral" },
              { value: "negative", label: "Negative" },
            ]}
            onChange={setSentiment}
            minWidth={120}
          />
        </FilterGroup>
        <FilterGroup icon={DirectionIcon} label="Direction" className={GROUP}>
          <FilterDropdown
            value={direction}
            allLabel="All directions"
            options={[
              { value: "inbound", label: "Inbound" },
              { value: "outbound", label: "Outbound" },
            ]}
            onChange={setDirection}
            minWidth={120}
          />
        </FilterGroup>
      </FilterSheet>
    );
  },
};

/** Nothing set yet: no badge, no Reset. */
export const NoneSet: Story = {
  args: {
    summary: "Last 30 days",
    children: (
      <FilterGroup icon={ChannelIcon} label="Channel" className={GROUP}>
        <FilterDropdown
          value=""
          allLabel="All channels"
          options={[{ value: "voice", label: "Voice" }]}
          onChange={() => {}}
          minWidth={100}
        />
      </FilterGroup>
    ),
  },
};

/** While the page is loading, the trigger is dimmed and does not open. */
export const Disabled: Story = { args: { ...NoneSet.args, disabled: true } };
