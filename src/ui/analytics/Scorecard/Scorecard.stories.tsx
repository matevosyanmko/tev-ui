import type { Meta, StoryObj } from "@storybook/react-vite";

import { ANALYTICS_WIDGET_SAMPLES } from "../AnalyticsWidget/AnalyticsWidget.samples.js";
import { Scorecard } from "./Scorecard";

const meta = {
  title: "Analytics/Scorecard",
  component: Scorecard,
  args: ANALYTICS_WIDGET_SAMPLES.scorecard_table,
} satisfies Meta<typeof Scorecard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
