import type { Meta, StoryObj } from "@storybook/react-vite";

import { AccountPill } from "./AccountPill";

const meta = {
  title: "Brand/AccountPill",
  component: AccountPill,
  args: { fullName: "Anna Petrosyan", position: "supervisor" },
  decorators: [
    (Story) => (
      <div className="flex h-40 w-[560px] items-center justify-end rounded-[24px] bg-brand-surface-1 p-4">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof AccountPill>;

export default meta;
type Story = StoryObj<typeof meta>;

/** How it sits in the header: gradient pill, initials avatar, name over role. */
export const Default: Story = {};

/** No role to show — the name centres itself against the avatar. */
export const NameOnly: Story = {
  args: { fullName: "Anna Petrosyan" },
};

/**
 * Both lines truncate at 160px rather than growing the pill or wrapping, so a
 * long name and a long role cannot push the header layout around.
 */
export const LongName: Story = {
  args: {
    fullName: "Hovhannes Gasparyan-Sargsyan",
    position: "regional quality assurance supervisor",
  },
};

/**
 * Nothing signed in yet, or a session with no profile on it: the avatar shows
 * "?" and the top line falls back to English unless `labels.unknownUser`
 * supplies the app's own translation.
 */
export const UnknownUser: Story = {
  // Rendered rather than `args: { fullName: undefined }`: Storybook treats an
  // explicitly-undefined arg as unset and falls back to the meta's value, so
  // the story would show "Anna Petrosyan" instead of the empty state.
  render: () => <AccountPill />,
};

export const TranslatedFallback: Story = {
  render: () => <AccountPill labels={{ unknownUser: "Օգտատեր" }} />,
};

/**
 * `initials` wins over anything derived from `fullName`. This is the escape
 * hatch for the names "split on whitespace" gets wrong — a mononym, a CJK
 * name, or a display name that leads with a title.
 */
export const CustomInitials: Story = {
  args: { fullName: "Դավիթ Հակոբյան", position: "admin", initials: "ԴՀ" },
};

/**
 * The account page is usually a route, so the caller hands in its own link
 * element and the pill renders as that instead of a <button> — the avatar and
 * identity become its children. In an app this child is a router `<Link>`.
 */
export const AsLink: Story = {
  render: (args) => (
    <AccountPill {...args} asChild>
      <a href="#account" title="Account settings" />
    </AccountPill>
  ),
};

/**
 * Below `sm` the identity block drops out and the avatar carries the account
 * on its own, while the pill keeps its 80px height so the header row does not
 * reflow. `sm:` is a viewport query, so narrow the browser window under 640px
 * to see it — a narrower decorator cannot trigger it.
 */
export const Compact: Story = {};
