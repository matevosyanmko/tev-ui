import type { Meta, StoryObj } from "@storybook/react-vite";

import {
  ANALYTICS_CATEGORY_LABELS,
  ANALYTICS_CATEGORY_ORDER,
  ANALYTICS_COMPONENTS,
} from "../AnalyticsCatalog/AnalyticsCatalog.js";
import { AnalyticsWidgetPreview } from "./AnalyticsWidget";

const meta = {
  title: "Analytics/AnalyticsWidget",
  component: AnalyticsWidgetPreview,
  args: {
    componentKey: "donut",
    title: "Call share by topic",
    description: "Share of calls per topic",
  },
  argTypes: {
    componentKey: {
      control: "select",
      options: ANALYTICS_COMPONENTS.map((c) => c.key),
    },
  },
  decorators: [
    (Story) => (
      <div className="w-[560px] bg-[#f5f7fb] p-6">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof AnalyticsWidgetPreview>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Pick any `componentKey`: the same renderer draws every stored widget. */
export const Default: Story = {};

export const Bare: Story = { args: { bare: true } };

export const UnknownKey: Story = { args: { componentKey: "pie_3d" } };

/** Every component type in the catalog, with its sample figures. */
export const Catalog: Story = {
  decorators: [],
  render: () => (
    <div className="space-y-8 bg-[#f5f7fb] p-6">
      {ANALYTICS_CATEGORY_ORDER.map((category) => (
        <section key={category}>
          <h2 className="mb-3 text-sm font-semibold">{ANALYTICS_CATEGORY_LABELS[category]}</h2>
          <div className="grid grid-cols-[repeat(auto-fill,minmax(360px,1fr))] gap-4">
            {ANALYTICS_COMPONENTS.filter((c) => c.category === category).map((c) => (
              <div key={c.key} className={c.span === 1 ? "" : "col-span-full"}>
                <AnalyticsWidgetPreview
                  componentKey={c.key}
                  title={c.label}
                  description={c.description}
                />
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  ),
};
