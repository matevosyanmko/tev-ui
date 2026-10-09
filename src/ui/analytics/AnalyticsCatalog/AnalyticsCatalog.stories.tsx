import type { Meta, StoryObj } from "@storybook/react-vite";

import { ANALYTICS_CATEGORY_LABELS, ANALYTICS_COMPONENTS } from "./AnalyticsCatalog";

function CatalogTable() {
  return (
    <table className="text-left text-[13px]">
      <thead>
        <tr className="text-gray-400">
          <th className="pr-6 pb-2">componentKey</th>
          <th className="pr-6 pb-2">Label</th>
          <th className="pr-6 pb-2">Category</th>
          <th className="pr-6 pb-2">Component</th>
          <th className="pb-2">Span</th>
        </tr>
      </thead>
      <tbody>
        {ANALYTICS_COMPONENTS.map((c) => (
          <tr key={c.key}>
            <td className="pr-6 font-mono">{c.key}</td>
            <td className="pr-6">{c.label}</td>
            <td className="pr-6">{ANALYTICS_CATEGORY_LABELS[c.category]}</td>
            <td className="pr-6">{c.component}</td>
            <td>{String(c.span)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

const meta = {
  title: "Analytics/AnalyticsCatalog",
  component: CatalogTable,
} satisfies Meta<typeof CatalogTable>;

export default meta;
type Story = StoryObj<typeof meta>;

/** The keys a stored widget may name, as `AnalyticsCatalog` exports them. */
export const Keys: Story = {};
