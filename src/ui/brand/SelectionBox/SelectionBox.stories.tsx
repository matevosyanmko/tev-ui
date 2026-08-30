import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";

import { SelectionBox } from "./SelectionBox";

const meta = {
  title: "Brand/SelectionBox",
  component: SelectionBox,
  argTypes: { checked: { control: "boolean" } },
  args: { checked: false, label: "Select row" },
} satisfies Meta<typeof SelectionBox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Unchecked: Story = {};
export const Checked: Story = { args: { checked: true } };

/** The real use: a header box that reflects and drives every row below it. */
export const SelectionColumn: Story = {
  render: function SelectionColumnStory() {
    const rows = ["Anna Petrosyan", "David Grigoryan", "Mariam Sargsyan"];
    const [selected, setSelected] = React.useState<string[]>([rows[1]]);
    const allSelected = selected.length === rows.length;

    return (
      <table className="w-80 text-left text-sm">
        <thead>
          <tr className="border-b">
            <th className="w-10 py-2">
              <SelectionBox
                checked={allSelected}
                label="Select all agents"
                onCheckedChange={(next) => setSelected(next ? rows : [])}
              />
            </th>
            <th className="py-2 font-medium">Agent</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((name) => (
            <tr key={name} className="border-b">
              <td className="py-2">
                <SelectionBox
                  checked={selected.includes(name)}
                  label={`Select ${name}`}
                  onCheckedChange={(next) =>
                    setSelected((current) =>
                      next
                        ? [...current, name]
                        : current.filter((entry) => entry !== name),
                    )
                  }
                />
              </td>
              <td className="py-2">{name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  },
};

export const Disabled: Story = { args: { checked: true, disabled: true } };
