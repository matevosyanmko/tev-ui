import type { Meta, StoryObj } from "@storybook/react-vite";

import { FilterGroup } from "./FilterGroup";
import { FilterDropdown } from "../FilterDropdown/FilterDropdown";
import { ChannelIcon, DirectionIcon, StatementIcon } from "../Icons/Icons";

const meta = {
  title: "Brand/FilterGroup",
  component: FilterGroup,
  args: { label: "Channel", icon: ChannelIcon },
} satisfies Meta<typeof FilterGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

/** The label and icon inherit their colour, so the group works on any surface. */
export const Default: Story = {
  render: (args) => (
    <div className="w-fit rounded-2xl bg-brand-surface-1 p-4 text-white">
      <FilterGroup {...args}>
        <FilterDropdown
          value=""
          allLabel="All"
          options={[
            { value: "voice", label: "Voice" },
            { value: "webchat", label: "Webchat" },
            { value: "email", label: "Email" },
          ]}
          onChange={() => {}}
        />
      </FilterGroup>
    </div>
  ),
};

/** A whole filter strip: this is the shape the component exists to keep consistent. */
export const FilterStrip: Story = {
  render: () => (
    <div className="flex w-fit flex-wrap items-center gap-6 rounded-2xl bg-brand-surface-1 p-4 text-white">
      <FilterGroup icon={ChannelIcon} label="Channel">
        <FilterDropdown
          value=""
          allLabel="All"
          options={[
            { value: "voice", label: "Voice" },
            { value: "webchat", label: "Webchat" },
          ]}
          onChange={() => {}}
        />
      </FilterGroup>
      <FilterGroup icon={DirectionIcon} label="Direction">
        <FilterDropdown
          value="inbound"
          options={[
            { value: "inbound", label: "Inbound" },
            { value: "outbound", label: "Outbound" },
          ]}
          onChange={() => {}}
        />
      </FilterGroup>
      <FilterGroup icon={StatementIcon} label="Sentiment">
        <FilterDropdown
          value=""
          allLabel="Any"
          options={[
            { value: "positive", label: "Positive" },
            { value: "neutral", label: "Neutral" },
            { value: "negative", label: "Negative" },
          ]}
          onChange={() => {}}
        />
      </FilterGroup>
    </div>
  ),
};

/** Without an icon the label carries the group on its own. */
export const WithoutIcon: Story = {
  render: () => (
    <div className="w-fit rounded-2xl bg-brand-surface-1 p-4 text-white">
      <FilterGroup label="Agent">
        <FilterDropdown
          value=""
          allLabel="Everyone"
          options={[{ value: "anna", label: "Anna Petrosyan" }]}
          onChange={() => {}}
        />
      </FilterGroup>
    </div>
  ),
};
