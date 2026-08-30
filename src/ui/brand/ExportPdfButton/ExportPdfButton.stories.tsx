import type { Meta, StoryObj } from "@storybook/react-vite";

import { ExportPdfButton } from "./ExportPdfButton";

const meta = {
  title: "Brand/ExportPdfButton",
  component: ExportPdfButton,
  argTypes: { disabled: { control: "boolean" } },
  args: { label: "Export PDF", disabled: false },
} satisfies Meta<typeof ExportPdfButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

/** Disabled while there is nothing to export — an empty result set, or an in-flight request. */
export const Disabled: Story = { args: { disabled: true } };

/** Where it lives: pinned to the right of a section heading. */
export const InSectionHeader: Story = {
  render: () => (
    <div className="flex w-[560px] items-center justify-between gap-4">
      <h2 className="text-[13px] font-bold">Alerts — last 30 days</h2>
      <ExportPdfButton label="Export PDF" onClick={() => {}} />
    </div>
  ),
};

/** A translated label; the component owns only the pill and the icon. */
export const Translated: Story = { args: { label: "Արտահանել PDF" } };
