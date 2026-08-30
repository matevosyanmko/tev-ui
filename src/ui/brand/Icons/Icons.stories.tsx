import type { Meta, StoryObj } from "@storybook/react-vite";

import { Icons } from "./Icons.registry";
import { AnalyticsIcon, ChannelIcon, HomeIcon } from "./Icons";

const meta = {
  title: "Brand/Icons",
  parameters: {
    docs: {
      description: {
        component:
          "Figma-exported brand glyphs. Every one strokes with `currentColor` and takes the same props as a lucide icon, so it drops straight into a call site that had one.",
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

/** The whole set at its natural size, on a light surface. */
export const Gallery: Story = {
  render: () => (
    <div className="grid w-[640px] grid-cols-4 gap-4">
      {Object.entries(Icons).map(([name, Icon]) => (
        <div
          key={name}
          className="flex flex-col items-center gap-2 rounded-xl border p-4 text-center"
        >
          <Icon />
          <span className="text-[10px] text-muted-foreground">{name}</span>
        </div>
      ))}
    </div>
  ),
};

/**
 * `currentColor` is the whole point: the same glyph reads correctly on the dark
 * sidebar, on an active purple pill, and on a light card, with no per-surface
 * variant. SettingsIcon is the one exception — it paints its own gradient.
 */
export const InheritsColor: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <span className="rounded-xl bg-brand-surface-1 p-4 text-white">
        <HomeIcon size={32} />
      </span>
      <span className="rounded-xl bg-brand-purple p-4 text-brand-purple-foreground">
        <HomeIcon size={32} />
      </span>
      <span className="rounded-xl border p-4 text-brand-purple">
        <HomeIcon size={32} />
      </span>
      <span className="rounded-xl border p-4 text-muted-foreground">
        <HomeIcon size={32} />
      </span>
    </div>
  ),
};

/** `size` is the only geometry knob; the artwork carries its own stroke widths. */
export const Sizes: Story = {
  render: () => (
    <div className="flex items-end gap-4 text-foreground">
      {[16, 20, 24, 32, 48].map((size) => (
        <div key={size} className="flex flex-col items-center gap-1">
          <AnalyticsIcon size={size} />
          <span className="text-[10px] text-muted-foreground">{size}</span>
        </div>
      ))}
    </div>
  ),
};

/** Drop-in for a lucide icon: same `size`/`className`, `strokeWidth` accepted and ignored. */
export const LucideCompatible: Story = {
  render: () => (
    <p className="flex items-center gap-2 text-sm text-brand-purple">
      <ChannelIcon size={18} strokeWidth={1.5} />
      Filtered by channel
    </p>
  ),
};
