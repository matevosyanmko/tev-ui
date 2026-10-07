import type { Meta, StoryObj } from "@storybook/react-vite";
import { LogOut } from "lucide-react";

import { Sidebar, SidebarNav, SidebarGroup, SidebarFooter } from "./Sidebar";
import { SidebarItem, SidebarItemIcon, SidebarItemLabel } from "../SidebarItem/SidebarItem";
import { LangPicker } from "../../brand/LangPicker/LangPicker";
import {
  AlertsIcon,
  AnalyticsIcon,
  AuditIcon,
  HomeIcon,
  IntegrationIcon,
  InteractionSearchIcon,
  KpiIcon,
  TeamQualityIcon,
} from "../../brand/Icons/Icons";

const meta = {
  title: "Layout/Sidebar",
  component: Sidebar,
  parameters: { layout: "fullscreen" },
  argTypes: { collapsed: { control: "boolean" } },
  args: { collapsed: false },
  // A row, as in AppLayout: it gives the rail its height, and the page beside
  // it shows a collapsed rail opening over the content instead of pushing it.
  decorators: [
    (Story) => (
      <div className="flex h-dvh gap-4 bg-black p-4">
        <Story />
        <div className="flex-1 rounded-2xl bg-brand-purple-soft" />
      </div>
    ),
  ],
} satisfies Meta<typeof Sidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

const GROUPS = [
  [{ id: "home", label: "Home", icon: HomeIcon }],
  [
    { id: "analytics", label: "Analytics", icon: AnalyticsIcon },
    { id: "search", label: "Interactions", icon: InteractionSearchIcon },
    { id: "integration", label: "Integration", icon: IntegrationIcon },
  ],
  [
    { id: "alerts", label: "Alerts", icon: AlertsIcon },
    { id: "quality", label: "Team quality", icon: TeamQualityIcon },
    { id: "audit", label: "Audit log", icon: AuditIcon },
  ],
  [{ id: "kpi", label: "KPI", icon: KpiIcon }],
];

/**
 * Groups come from the app's own nav data — a divider between entries starts
 * a new `<SidebarGroup>` card; the footer is whatever account controls the
 * app wants below the nav (a language switcher, logout, settings…).
 *
 * The logout label uses the `sidebar-collapsed:` variant to swap to an icon
 * on the icon-only rail, where a translated label would not fit.
 */
export const Default: Story = {
  render: (args) => (
    <Sidebar {...args}>
      <SidebarNav>
        {GROUPS.map((group) => (
          <SidebarGroup key={group[0].id}>
            {group.map((item) => (
              <SidebarItem key={item.id} asChild active={item.id === "home"}>
                <a href={`#${item.id}`}>
                  <SidebarItemIcon icon={item.icon} />
                  <SidebarItemLabel>{item.label}</SidebarItemLabel>
                </a>
              </SidebarItem>
            ))}
          </SidebarGroup>
        ))}
      </SidebarNav>

      <SidebarFooter>
        <LangPicker
          value="en"
          options={[
            { value: "en", label: "ENG" },
            { value: "am", label: "ARM" },
          ]}
          onChange={() => {}}
          label="Language"
        />
        <button
          type="button"
          aria-label="Log out"
          className="flex min-w-18 shrink-0 items-center justify-center gap-2 rounded-[16px] border border-white/12 bg-white/5 px-2 py-2 text-[13px] font-semibold text-white/80"
        >
          <LogOut aria-hidden="true" className="hidden size-4 sidebar-collapsed:block" />
          <span className="sidebar-collapsed:sr-only">Log out</span>
        </button>
      </SidebarFooter>
    </Sidebar>
  ),
};

/**
 * The icon rail on desktop too. Point at it, or Tab into it, and it opens over
 * the page with its labels; it closes again when the pointer leaves or focus
 * moves out. Below `lg` every sidebar looks like this, without the opening.
 */
export const Collapsed: Story = { ...Default, args: { collapsed: true } };
