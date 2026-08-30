import type { Meta, StoryObj } from "@storybook/react-vite";

import { AppFilterRow } from "./AppFilterRow";
import { FilterGroup } from "../../brand/FilterGroup/FilterGroup";
import { DateIcon, ChannelIcon } from "../../brand/Icons/Icons";

const meta = {
  title: "Layout/AppFilterRow",
  component: AppFilterRow,
  argTypes: { disabled: { control: "boolean" } },
  args: { disabled: false },
} satisfies Meta<typeof AppFilterRow>;

export default meta;
type Story = StoryObj<typeof meta>;

/** The app supplies each `<FilterGroup>` — the row itself only owns the track. */
export const Default: Story = {
  render: (args) => (
    <AppFilterRow {...args}>
      <FilterGroup
        icon={DateIcon}
        label="Date"
        className="h-12 rounded-[24px] bg-brand-surface-2 p-2"
      >
        <div className="flex h-8 items-center rounded-[24px] bg-brand-green px-3 text-[11px] font-semibold text-brand-green-foreground">
          Last 7 days
        </div>
      </FilterGroup>
      <FilterGroup
        icon={ChannelIcon}
        label="Channel"
        className="h-12 rounded-[24px] bg-brand-surface-2 p-2"
      >
        <div className="flex h-8 items-center rounded-[24px] bg-white/10 px-3 text-[11px] text-white">
          All channels
        </div>
      </FilterGroup>
    </AppFilterRow>
  ),
};

export const Disabled: Story = { ...Default, args: { disabled: true } };
