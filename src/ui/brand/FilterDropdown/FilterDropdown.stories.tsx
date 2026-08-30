import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";

import { FilterDropdown } from "./FilterDropdown";

const CHANNELS = [
  { value: "voice", label: "Voice" },
  { value: "webchat", label: "Webchat" },
  { value: "email", label: "Email" },
];

const meta = {
  title: "Brand/FilterDropdown",
  component: FilterDropdown,
  decorators: [
    (Story) => (
      <div className="w-fit rounded-2xl bg-brand-surface-1 p-6">
        <Story />
      </div>
    ),
  ],
  args: { value: "", options: CHANNELS, allLabel: "All channels", onChange: () => {} },
} satisfies Meta<typeof FilterDropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Controlled: open it, pick something, and the pill takes the new label. */
export const Default: Story = {
  render: function DefaultStory(args) {
    const [value, setValue] = React.useState("");
    return <FilterDropdown {...args} value={value} onChange={setValue} />;
  },
};

/** Without `allLabel` the first option is the implicit default — no "all" entry. */
export const NoAllOption: Story = {
  args: { allLabel: undefined, value: "voice" },
};

/**
 * `tone: "danger"` paints the trigger coral while that option is active. The
 * library never inspects the value itself — the caller says which one is the
 * alarming one.
 */
export const DangerTone: Story = {
  args: {
    allLabel: undefined,
    value: "disabled",
    options: [
      { value: "enabled", label: "Enabled" },
      { value: "disabled", label: "Disabled", tone: "danger" },
    ],
  },
};

/** Long labels truncate in the pill rather than stretching the filter strip. */
export const LongLabels: Story = {
  args: {
    maxWidth: 160,
    allLabel: "Every integration",
    value: "salesforce",
    options: [
      { value: "salesforce", label: "Salesforce Service Cloud (EU-West)" },
      { value: "zendesk", label: "Zendesk Support" },
    ],
  },
};
