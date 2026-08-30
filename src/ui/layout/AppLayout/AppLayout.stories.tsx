import type { Meta, StoryObj } from "@storybook/react-vite";

import { AppLayout } from "./AppLayout";

const meta = {
  title: "Layout/AppLayout",
  component: AppLayout,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof AppLayout>;

export default meta;
type Story = StoryObj<typeof meta>;

function DemoHeader() {
  return (
    <header className="flex h-20 shrink-0 items-center justify-between rounded-2xl bg-brand-surface-1 px-4 text-white">
      <span className="font-bold">Tevvoice</span>
      <span className="text-sm text-white/70">Account</span>
    </header>
  );
}

function DemoSidebar() {
  return (
    <aside className="hidden w-42 shrink-0 flex-col rounded-2xl bg-brand-surface-1 p-3 text-white/70 md:flex">
      <span className="text-xs">Home</span>
      <span className="text-xs">Analytics</span>
      <span className="text-xs">Alerts</span>
    </aside>
  );
}

export const Default: Story = {
  render: () => (
    <AppLayout header={<DemoHeader />} sidebar={<DemoSidebar />}>
      <div className="flex h-full items-center justify-center rounded-2xl bg-brand-purple-soft text-black">
        Page content
      </div>
    </AppLayout>
  ),
};

/** A page-fallback / auth shell that has no nav rail at all. */
export const HeaderOnly: Story = {
  render: () => (
    <AppLayout header={<DemoHeader />}>
      <div className="flex h-full items-center justify-center rounded-2xl bg-brand-purple-soft text-black">
        Page content
      </div>
    </AppLayout>
  ),
};
