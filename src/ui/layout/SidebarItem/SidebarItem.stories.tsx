import type { Meta, StoryObj } from "@storybook/react-vite";

import { SidebarItem, SidebarItemIcon, SidebarItemLabel } from "./SidebarItem";
import {
  AlertsIcon,
  AnalyticsIcon,
  AuditIcon,
  HomeIcon,
  InteractionSearchIcon,
} from "../../brand/Icons/Icons";

const meta = {
  title: "Layout/SidebarItem",
  component: SidebarItem,
  argTypes: { active: { control: "boolean" } },
  args: { active: false, href: "#" },
  decorators: [
    (Story) => (
      <div className="w-[168px] rounded-[24px] bg-brand-surface-1 p-3">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof SidebarItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Inactive: Story = {
  render: (args) => (
    <SidebarItem {...args}>
      <SidebarItemIcon icon={HomeIcon} />
      <SidebarItemLabel>Home</SidebarItemLabel>
    </SidebarItem>
  ),
};

export const Active: Story = { ...Inactive, args: { active: true, href: "#" } };

/** A whole nav group: exactly one item active, the rest transparent. */
export const NavGroup: Story = {
  render: () => (
    <nav className="flex flex-col gap-1">
      {[
        { icon: HomeIcon, label: "Home", active: false },
        { icon: AnalyticsIcon, label: "Analytics", active: true },
        { icon: InteractionSearchIcon, label: "Interaction search", active: false },
        { icon: AlertsIcon, label: "Alerts", active: false },
        { icon: AuditIcon, label: "Audit log", active: false },
      ].map((entry) => (
        <SidebarItem key={entry.label} href="#" active={entry.active}>
          <SidebarItemIcon icon={entry.icon} />
          <SidebarItemLabel>{entry.label}</SidebarItemLabel>
        </SidebarItem>
      ))}
    </nav>
  ),
};

/**
 * The label clamps to two lines rather than truncating — the longest Armenian
 * nav label does not fit on one, and an ellipsis would hide which section it is.
 */
export const TwoLineLabel: Story = {
  render: () => (
    <SidebarItem href="#" active>
      <SidebarItemIcon icon={AnalyticsIcon} />
      <SidebarItemLabel>վերլուծություն</SidebarItemLabel>
    </SidebarItem>
  ),
};

/**
 * `asChild` is how a router link gets in — the library itself has no routing
 * dependency. Swap the <a> for <Link to=…> and everything else is unchanged.
 */
export const AsChild: Story = {
  render: () => (
    <SidebarItem asChild active>
      <a href="#analytics" data-testid="router-link">
        <SidebarItemIcon icon={AnalyticsIcon} />
        <SidebarItemLabel>Analytics</SidebarItemLabel>
      </a>
    </SidebarItem>
  ),
};
