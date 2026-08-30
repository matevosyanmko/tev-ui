import type { Meta, StoryObj } from "@storybook/react-vite";

import { Sidebar, SidebarNav, SidebarGroup, SidebarFooter } from "./Sidebar";
import { SidebarItem, SidebarItemIcon, SidebarItemLabel } from "../SidebarItem/SidebarItem";
import { LangPicker } from "../../brand/LangPicker/LangPicker";
import { AnalyticsIcon, HomeIcon, AlertsIcon, AuditIcon } from "../../brand/Icons/Icons";

const meta = {
  title: "Layout/Sidebar",
  component: Sidebar,
  parameters: { layout: "fullscreen" },
  decorators: [
    (Story) => (
      <div className="h-dvh bg-black p-4">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Sidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Groups come from the app's own nav data — a divider between entries starts
 * a new `<SidebarGroup>` card; the footer is whatever account controls the
 * app wants below the nav (a language switcher, logout, settings…).
 */
export const Default: Story = {
  render: () => (
    <Sidebar className="flex">
      <SidebarNav>
        <SidebarGroup>
          <SidebarItem asChild active>
            <a href="#home">
              <SidebarItemIcon icon={HomeIcon} />
              <SidebarItemLabel>Home</SidebarItemLabel>
            </a>
          </SidebarItem>
          <SidebarItem asChild>
            <a href="#analytics">
              <SidebarItemIcon icon={AnalyticsIcon} />
              <SidebarItemLabel>Analytics</SidebarItemLabel>
            </a>
          </SidebarItem>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarItem asChild>
            <a href="#alerts">
              <SidebarItemIcon icon={AlertsIcon} />
              <SidebarItemLabel>Alerts</SidebarItemLabel>
            </a>
          </SidebarItem>
          <SidebarItem asChild>
            <a href="#audit">
              <SidebarItemIcon icon={AuditIcon} />
              <SidebarItemLabel>Audit log</SidebarItemLabel>
            </a>
          </SidebarItem>
        </SidebarGroup>
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
          className="flex min-w-18 shrink-0 items-center justify-center gap-2 rounded-[16px] border border-white/12 bg-white/5 px-2 py-2 text-[13px] font-semibold text-white/80"
        >
          Log out
        </button>
      </SidebarFooter>
    </Sidebar>
  ),
};
