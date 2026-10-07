import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { LogOut } from "lucide-react";

import { SidebarSheet } from "./SidebarSheet";
import { Sidebar, SidebarNav, SidebarGroup, SidebarFooter } from "../Sidebar/Sidebar";
import { SidebarItem, SidebarItemIcon, SidebarItemLabel } from "../SidebarItem/SidebarItem";
import { LangPicker } from "../../brand/LangPicker/LangPicker";
import {
  AlertsIcon,
  AnalyticsIcon,
  HomeIcon,
  InteractionSearchIcon,
  KpiIcon,
} from "../../brand/Icons/Icons";

const meta = {
  title: "Layout/SidebarSheet",
  component: SidebarSheet,
  parameters: { layout: "fullscreen" },
  // Mobile-only chrome: below `lg` is where an app shows it.
  globals: { viewport: { value: "mobile1", isRotated: false } },
} satisfies Meta<typeof SidebarSheet>;

export default meta;
type Story = StoryObj<typeof meta>;

const GROUPS = [
  [{ id: "home", label: "Home", icon: HomeIcon }],
  [
    { id: "analytics", label: "Analytics", icon: AnalyticsIcon },
    { id: "search", label: "Interactions", icon: InteractionSearchIcon },
  ],
  [{ id: "alerts", label: "Alerts", icon: AlertsIcon }],
  [{ id: "kpi", label: "KPI", icon: KpiIcon }],
];

function DemoNav({ active, onNavigate }: { active: string; onNavigate: (id: string) => void }) {
  return (
    <Sidebar>
      <SidebarNav>
        {GROUPS.map((group) => (
          <SidebarGroup key={group[0].id}>
            {group.map((item) => (
              <SidebarItem key={item.id} asChild active={item.id === active}>
                <a
                  href={`#${item.id}`}
                  onClick={(event) => {
                    event.preventDefault();
                    onNavigate(item.id);
                  }}
                >
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
          className="flex min-w-18 shrink-0 items-center justify-center gap-2 rounded-[16px] border border-white/12 bg-white/5 px-2 py-2 text-[13px] font-semibold text-white/80"
        >
          <LogOut aria-hidden="true" className="size-4" />
          Log out
        </button>
      </SidebarFooter>
    </Sidebar>
  );
}

/**
 * The menu tile in a mobile toolbar. Opening it slides the full sidebar in
 * from the left; picking an item closes it again. The links here call
 * `preventDefault` to stay on the story, so the demo closes the panel itself
 * — a real router link is closed by the sheet on its own.
 */
export const Default: Story = {
  args: { open: false, onOpenChange: () => {}, children: null },
  render: function Render() {
    const [open, setOpen] = React.useState(false);
    const [active, setActive] = React.useState("home");
    return (
      <div className="flex h-dvh flex-col gap-3 bg-black p-3">
        <div className="flex h-12 items-center gap-2">
          <SidebarSheet open={open} onOpenChange={setOpen}>
            <DemoNav
              active={active}
              onNavigate={(id) => {
                setActive(id);
                setOpen(false);
              }}
            />
          </SidebarSheet>
          <span className="text-sm text-white/70">Page: {active}</span>
        </div>
        <div className="flex-1 rounded-3xl bg-brand-purple-soft" />
      </div>
    );
  },
};
