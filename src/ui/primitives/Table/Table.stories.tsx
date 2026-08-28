import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "./Table";

const meta = {
  title: "Primitives/Table",
  component: Table,
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

const calls = [
  { id: "CL-1042", agent: "Ada Whitfield", duration: "4m 12s", status: "Completed" },
  { id: "CL-1041", agent: "Marcus Kane", duration: "1m 58s", status: "Missed" },
  { id: "CL-1040", agent: "Priya Raman", duration: "7m 34s", status: "Completed" },
];

export const Default: Story = {
  render: (args) => (
    <Table {...args}>
      <TableCaption>Recent calls from the last 24 hours.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Call ID</TableHead>
          <TableHead>Agent</TableHead>
          <TableHead>Duration</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {calls.map((call) => (
          <TableRow key={call.id}>
            <TableCell>{call.id}</TableCell>
            <TableCell>{call.agent}</TableCell>
            <TableCell>{call.duration}</TableCell>
            <TableCell>{call.status}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell>3 calls</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  ),
};
