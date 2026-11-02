import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";

import { PlatformBadge } from "./PlatformBadge";

const meta = {
  title: "Brand/PlatformBadge",
  component: PlatformBadge,
  globals: { theme: "scribe" },
  argTypes: {
    platform: { control: "inline-radio", options: ["meet", "zoom", "teams"] },
    size: { control: "inline-radio", options: ["default", "micro"] },
    tone: { control: "inline-radio", options: ["default", "danger"] },
  },
  args: { platform: "meet", size: "default", tone: "default" },
} satisfies Meta<typeof PlatformBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("img", { name: "Google Meet" })).toBeInTheDocument();
  },
};

/**
 * Rows and cards (100:41115: Meet, Zoom, and a failed meeting's coral), and
 * the micro card's 20×16 (100:43960). A platform without artwork shows its
 * initial.
 */
export const AllPlatforms: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <PlatformBadge platform="meet" />
        <PlatformBadge platform="zoom" />
        <PlatformBadge platform="meet" tone="danger" />
        <PlatformBadge platform="teams" label="Microsoft Teams" />
      </div>
      <div className="flex items-center gap-3">
        <PlatformBadge platform="meet" size="micro" />
        <PlatformBadge platform="zoom" size="micro" />
        <PlatformBadge platform="meet" size="micro" tone="danger" />
        <PlatformBadge platform="teams" size="micro" label="Microsoft Teams" />
      </div>
    </div>
  ),
};
