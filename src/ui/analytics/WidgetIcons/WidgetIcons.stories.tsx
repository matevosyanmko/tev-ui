import type { Meta, StoryObj } from "@storybook/react-vite";

import { KpiTile } from "../KpiTile/KpiTile";
import { WIDGET_ICON_NAMES, WidgetIcons, getWidgetIcon } from "./WidgetIcons";

const meta = {
  title: "Analytics/WidgetIcons",
  parameters: {
    docs: {
      description: {
        component:
          "The lucide icons a stored widget may name. A widget keeps the kebab-case name; `getWidgetIcon` turns it back into the component.",
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

/** Every name a widget can store, with the icon it resolves to. */
export const Gallery: Story = {
  render: () => (
    <div className="grid w-[720px] grid-cols-5 gap-3">
      {WIDGET_ICON_NAMES.map((name) => {
        const Icon = WidgetIcons[name];
        return (
          <div
            key={name}
            className="flex flex-col items-center gap-2 rounded-xl border p-3 text-center"
          >
            <Icon className="size-5" aria-hidden="true" />
            <span className="font-mono text-[11px] text-gray-500">{name}</span>
          </div>
        );
      })}
    </div>
  ),
};

/** A stored name resolved for a KPI tile, the way an app renders a saved widget. */
export const ResolvedInKpiTile: Story = {
  render: () => (
    <div className="grid w-[520px] grid-cols-2 gap-3">
      <KpiTile icon={getWidgetIcon("shield-alert")} tone="coral" label="Safety incidents" value={12} />
      <KpiTile icon={getWidgetIcon("phone-outgoing")} tone="green" label="Callbacks" value="38" unit="%" />
    </div>
  ),
};
