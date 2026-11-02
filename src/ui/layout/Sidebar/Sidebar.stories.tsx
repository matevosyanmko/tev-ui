import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { LogOut } from "lucide-react";
import { expect, userEvent } from "storybook/test";

import { Sidebar, SidebarNav, SidebarGroup, SidebarFooter } from "./Sidebar";
import { SidebarItem, SidebarItemIcon, SidebarItemLabel } from "../SidebarItem/SidebarItem";
import { LangPicker } from "../../brand/LangPicker/LangPicker";
import { Button } from "../../primitives/Button/Button";
import {
  NavHomeIcon,
  NavMenuIcon,
  NavSettingsIcon,
  NavUsageIcon,
} from "../../brand/ScribeIcons/ScribeIcons";
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
 * moves out. Desktop only: below `lg` a sidebar opens in a `SidebarSheet`.
 */
export const Collapsed: Story = { ...Default, args: { collapsed: true } };

// ---- TevScribe ----------------------------------------------------------

const SCRIBE_GROUPS = [
  [{ id: "home", label: "Home", icon: NavHomeIcon }],
  [
    { id: "usage", label: "Usage", icon: NavUsageIcon },
    { id: "settings", label: "Settings", icon: NavSettingsIcon },
  ],
];

function ScribeRail({
  collapsed,
  initial = "home",
  labels = { home: "Home", usage: "Usage", settings: "Settings", logout: "log out" },
}: {
  collapsed?: boolean;
  initial?: string;
  labels?: Record<string, string>;
}) {
  const [current, setCurrent] = React.useState(initial);
  const [lang, setLang] = React.useState("en");
  return (
    <Sidebar variant="boxed" collapsed={collapsed}>
      <SidebarNav>
        {SCRIBE_GROUPS.map((group) => (
          <SidebarGroup key={group[0].id}>
            {group.map((item) => (
              <SidebarItem key={item.id} asChild active={item.id === current}>
                <a
                  href={`#${item.id}`}
                  onClick={(event) => {
                    event.preventDefault();
                    setCurrent(item.id);
                  }}
                >
                  <SidebarItemIcon icon={item.icon} />
                  <SidebarItemLabel>{labels[item.id]}</SidebarItemLabel>
                </a>
              </SidebarItem>
            ))}
          </SidebarGroup>
        ))}
      </SidebarNav>

      <SidebarFooter>
        <Button variant="quiet-inverse" size="icon-box" aria-label="Collapse menu">
          <NavMenuIcon />
        </Button>
        <LangPicker
          variant="accent-pill"
          value={lang}
          options={[
            { value: "en", label: "ENG" },
            { value: "am", label: "ARM" },
            { value: "ru", label: "RUS" },
          ]}
          onChange={setLang}
          label="Language"
        />
        <Button variant="quiet-inverse" size="pill-sm">
          {labels.logout}
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}

const scribe = { globals: { theme: "scribe" } } as const;

/**
 * TevScribe's rail (100:41115): each group an outlined box, items a 40px icon
 * and a 10px label, the current page a white tile. The footer is the menu
 * button, the green language pill (it opens upwards) and log out. Click an
 * item to move the current page; hover tints a row, Tab rings it in green.
 */
export const ScribeBoxed: Story = {
  ...scribe,
  render: () => <ScribeRail />,
  play: async ({ canvas }) => {
    const usage = canvas.getByRole("link", { name: "Usage" });
    await userEvent.click(usage);
    await expect(usage).toHaveAttribute("aria-current", "page");
    await expect(canvas.getByRole("link", { name: "Home" })).not.toHaveAttribute("aria-current");
  },
};

/** Usage current (100:40457). */
export const ScribeBoxedUsage: Story = { ...scribe, render: () => <ScribeRail initial="usage" /> };

/** Settings current (100:40567). */
export const ScribeBoxedSettings: Story = {
  ...scribe,
  render: () => <ScribeRail initial="settings" />,
};

/** Armenian labels: the longest wraps to two lines rather than truncating. */
export const ScribeBoxedArmenian: Story = {
  ...scribe,
  render: () => (
    <ScribeRail
      labels={{ home: "Գլխավոր", usage: "Օգտագործում", settings: "Կարգավորումներ", logout: "Ելք" }}
    />
  ),
};

/** The boxed rail collapsed to icons on desktop; it opens over the page on hover or focus. */
export const ScribeBoxedCollapsed: Story = {
  ...scribe,
  render: () => <ScribeRail collapsed />,
};
