import type { Meta, StoryObj } from "@storybook/react-vite";

/*
 * The token layer on its own, before any component: what theme.css declares
 * and what the active theme (toolbar → Theme) answers. Switch to TevScribe to
 * check the values against the Figma "TevScribe / Selected" collections.
 */

const meta = {
  title: "Foundations/Tokens",
  parameters: { layout: "padded" },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const SWATCHES = {
  surface: [
    ["surface/primary", "bg-surface-primary"],
    ["surface/subtle", "bg-surface-subtle"],
    ["surface/neutral-subtle", "bg-surface-neutral-subtle"],
    ["surface/inverse", "bg-surface-inverse"],
    ["surface/accent-green", "bg-surface-accent-green"],
    ["surface/accent-green-soft", "bg-surface-accent-green-soft"],
    ["surface/accent-coral", "bg-surface-accent-coral"],
  ],
  content: [
    ["text/primary", "bg-content-primary"],
    ["text/neutral-secondary", "bg-content-secondary"],
    ["text/muted", "bg-content-muted"],
    ["text/inverse", "bg-content-inverse"],
    ["text/neutral-dark", "bg-content-dark"],
    ["text/neutral-canvas", "bg-content-canvas"],
    ["text/accent-coral", "bg-content-accent-coral"],
  ],
  stroke: [
    ["border/neutral-ink", "bg-stroke-ink"],
    ["border/neutral-dark", "bg-stroke-dark"],
    ["border/neutral-secondary", "bg-stroke-secondary"],
    ["border/neutral-muted", "bg-stroke-muted"],
    ["border/neutral-subtle", "bg-stroke-subtle"],
    ["border/neutral-white", "bg-stroke-white"],
    ["border/accent-green", "bg-stroke-accent-green"],
    ["border/accent-red", "bg-stroke-accent-red"],
  ],
  status: [
    ["status/live", "bg-status-live"],
    ["status/success", "bg-status-success"],
    ["status/danger", "bg-status-danger"],
    ["status/neutral", "bg-status-neutral"],
    ["platform", "bg-platform"],
  ],
} as const;

export const Colors: Story = {
  render: () => (
    <div className="flex flex-col gap-8">
      {Object.entries(SWATCHES).map(([group, items]) => (
        <section key={group} className="flex flex-col gap-3">
          <h2 className="text-heading-16 capitalize">{group}</h2>
          <div className="flex flex-wrap gap-4">
            {items.map(([name, cls]) => (
              <figure key={name} className="flex w-36 flex-col gap-2">
                <div className={`${cls} h-16 rounded-12 border border-stroke-subtle`} />
                <figcaption className="text-body-12 text-content-secondary">{name}</figcaption>
              </figure>
            ))}
          </div>
        </section>
      ))}
    </div>
  ),
};

const TYPE = [
  ["Display 80 · Bold", "text-display-80"],
  ["Display 56 · ExtraBold · -3%", "text-display-56"],
  ["Display 48 · ExtraBold · upper", "text-display-48 uppercase"],
  ["Heading 56 · ExtraBold", "text-heading-56"],
  ["Heading 40 · Bold", "text-heading-40"],
  ["Heading 32 · Bold", "text-heading-32"],
  ["Heading 28 · Bold", "text-heading-28"],
  ["Heading 24 · Bold", "text-heading-24"],
  ["Heading 20 · Regular", "text-heading-20"],
  ["Heading 16 · Bold", "text-heading-16"],
  ["Heading 14 · Bold", "text-heading-14"],
  ["Heading 12 · Bold", "text-heading-12"],
  ["Body 20 · Regular", "text-body-20"],
  ["Body 16 · Regular", "text-body-16"],
  ["Body 14 · Regular", "text-body-14"],
  ["Body 12 · Regular", "text-body-12"],
  ["Label 12 · Medium", "text-label-12"],
  ["Label 10 · SemiBold", "text-label-10"],
  ["Caption 10 · Regular", "text-caption-10"],
  ["Micro 8 · Light", "text-micro-8"],
  ["Micro 6 · Regular", "text-micro-6"],
] as const;

export const Typography: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      {TYPE.map(([name, cls]) => (
        <div key={name} className="flex items-baseline gap-6 border-b border-stroke-subtle pb-3">
          <span className="w-56 shrink-0 text-body-12 text-content-secondary">{name}</span>
          <span className={cls}>Product discussion · Ապրանքի քննարկում</span>
        </div>
      ))}
    </div>
  ),
};

const RADII = ["rounded-3", "rounded-8", "rounded-10", "rounded-12", "rounded-16", "rounded-20", "rounded-24", "rounded-30", "rounded-32", "rounded-40", "rounded-full"] as const;

export const RadiusAndElevation: Story = {
  render: () => (
    <div className="flex flex-col gap-8">
      <div className="flex flex-wrap gap-4">
        {RADII.map((cls) => (
          <figure key={cls} className="flex flex-col items-center gap-2">
            <div className={`${cls} size-20 border-2 border-stroke-ink bg-surface-subtle`} />
            <figcaption className="text-body-12 text-content-secondary">{cls}</figcaption>
          </figure>
        ))}
      </div>
      <div className="flex flex-wrap gap-6">
        <div className="flex h-24 w-56 items-center justify-center rounded-16 border-2 border-stroke-ink bg-surface-primary shadow-popover text-body-14">
          shadow-popover
        </div>
        <div className="flex h-24 w-56 items-center justify-center rounded-24 border-2 border-stroke-white bg-surface-inverse text-body-14 text-content-inverse shadow-glass">
          shadow-glass
        </div>
      </div>
    </div>
  ),
};

const MOTION = [
  ["--duration-instant", "duration-(--duration-instant)"],
  ["--duration-fast", "duration-(--duration-fast)"],
  ["--duration-base", "duration-(--duration-base)"],
  ["--duration-slow", "duration-(--duration-slow)"],
] as const;

export const Motion: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <p className="text-body-14 text-content-secondary">Hover a row: the dot travels with ease-standard at each duration.</p>
      {MOTION.map(([name, cls]) => (
        <div key={name} className="group flex items-center gap-4">
          <span className="w-40 text-body-12">{name}</span>
          <div className="relative h-8 w-80 rounded-full bg-surface-subtle">
            <span
              className={`${cls} absolute top-1 left-1 size-6 rounded-full bg-surface-inverse transition-transform ease-standard group-hover:translate-x-72 motion-reduce:transition-none`}
            />
          </div>
        </div>
      ))}
    </div>
  ),
};
