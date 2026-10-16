import type { Meta, StoryObj } from "@storybook/react-vite";
import { CalendarDays, ChevronRight } from "lucide-react";
import { Badge } from "../Badge/Badge";
import { Button } from "../Button/Button";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemFooter,
  ItemGroup,
  ItemMedia,
  ItemSeparator,
  ItemTitle,
} from "./Item";

const meta = {
  title: "Primitives/Item",
  component: Item,
  argTypes: {
    variant: { control: "inline-radio", options: ["default", "outline", "muted"] },
    size: { control: "inline-radio", options: ["default", "sm"] },
  },
  args: { variant: "outline", size: "default" },
  decorators: [
    (Story) => (
      <div className="w-[360px]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Item>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Item {...args}>
      <ItemMedia variant="icon">
        <CalendarDays />
      </ItemMedia>
      <ItemContent>
        <ItemTitle>Weekly sync</ItemTitle>
        <ItemDescription>Google Meet · 10:00 · 45 min</ItemDescription>
      </ItemContent>
      <ItemActions>
        <Badge>Completed</Badge>
      </ItemActions>
    </Item>
  ),
};

/** The whole row is the link: one press target, one destination. */
export const AsLink: Story = {
  render: (args) => (
    <Item {...args} asChild>
      <a href="#meeting">
        <ItemContent>
          <ItemTitle>Quarterly planning with the product, design and engineering leads</ItemTitle>
          <ItemDescription>Zoom · 08:23 · 1 h 2 min</ItemDescription>
        </ItemContent>
        <ItemActions>
          <ChevronRight className="size-4 text-muted-foreground" />
        </ItemActions>
      </a>
    </Item>
  ),
};

/** A phone-sized list: rows on one card, hairlines between them. */
export const Group: Story = {
  args: { variant: "default", size: "sm" },
  render: (args) => (
    <ItemGroup className="rounded-xl border bg-card">
      {["Weekly sync", "Customer interview", "Design review"].map((title, index) => (
        <div key={title}>
          {index > 0 ? <ItemSeparator /> : null}
          <Item {...args} asChild>
            <a href={`#${index}`}>
              <ItemContent>
                <ItemTitle>{title}</ItemTitle>
                <ItemDescription>Google Meet · 10:00</ItemDescription>
              </ItemContent>
              <ItemActions>
                <Badge variant="secondary">Completed</Badge>
              </ItemActions>
            </a>
          </Item>
        </div>
      ))}
    </ItemGroup>
  ),
};

/** A footer line under the row for its controls, e.g. a calendar event's Join. */
export const WithFooter: Story = {
  render: (args) => (
    <Item {...args}>
      <ItemContent>
        <ItemTitle>Design review</ItemTitle>
        <ItemDescription>Today · 14:00 – 15:00 · 6 attendees</ItemDescription>
      </ItemContent>
      <ItemFooter>
        <span className="text-xs text-muted-foreground">Summary in English</span>
        <Button size="sm">Join</Button>
      </ItemFooter>
    </Item>
  ),
};
