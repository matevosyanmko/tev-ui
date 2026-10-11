import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { FadeIn } from "./FadeIn";

const meta = {
  title: "Primitives/FadeIn",
  component: FadeIn,
  argTypes: {
    from: { control: "inline-radio", options: ["none", "top", "bottom", "left", "right"] },
    distance: { control: "text" },
    duration: { control: { type: "number", step: 50 } },
    delay: { control: { type: "number", step: 50 } },
    easing: { control: "text" },
    scale: { control: { type: "number", min: 0, max: 1, step: 0.01 } },
    blur: { control: { type: "number", min: 0, step: 1 } },
  },
  args: { from: "none" },
} satisfies Meta<typeof FadeIn>;

export default meta;
type Story = StoryObj<typeof meta>;

function Card({ title, value }: { title: string; value: string }) {
  return (
    <div className="w-64 rounded-xl border bg-card p-4 text-card-foreground">
      <div className="text-xs text-muted-foreground">{title}</div>
      <div className="mt-1 text-2xl font-bold tabular-nums">{value}</div>
    </div>
  );
}

/**
 * Plays once per mount. "Play again" changes the `key`, which is how a tab or
 * a step brings in new content.
 */
function Replay({ children }: { children: (key: number) => React.ReactNode }) {
  const [key, setKey] = React.useState(0);
  return (
    <div className="flex flex-col items-start gap-4">
      <button
        type="button"
        onClick={() => setKey((value) => value + 1)}
        className="rounded-md border px-3 py-1.5 text-sm"
      >
        Play again
      </button>
      {children(key)}
    </div>
  );
}

export const Default: Story = {
  render: (args) => (
    <Replay>
      {(key) => (
        <FadeIn key={key} {...args}>
          <Card title="Total interactions" value="1,284" />
        </FadeIn>
      )}
    </Replay>
  ),
};

/** A small rise: what the analytics tabs use when switching groups. */
export const FromBottom: Story = {
  args: { from: "bottom", distance: 6 },
  render: Default.render,
};

/** A softer entrance for a dialog-like surface. */
export const ScaleAndBlur: Story = {
  args: { scale: 0.96, blur: 4, duration: 300 },
  render: Default.render,
};

/** Staggered with `delay`; each card stays hidden until its turn. */
export const Staggered: Story = {
  args: { from: "bottom", distance: 8 },
  render: (args) => (
    <Replay>
      {(key) => (
        <div key={key} className="flex flex-wrap gap-3">
          {["Resolved", "Unresolved", "Escalated", "Follow-up"].map((title, index) => (
            <FadeIn key={title} {...args} delay={index * 80}>
              <Card title={title} value={String((index + 2) * 113)} />
            </FadeIn>
          ))}
        </div>
      )}
    </Replay>
  ),
};

/** `asChild`: the caller's element animates itself, with no wrapper. */
export const AsChild: Story = {
  args: { from: "left", distance: 16 },
  render: (args) => (
    <Replay>
      {(key) => (
        <FadeIn key={key} {...args} asChild>
          <section className="w-72 rounded-xl border bg-card p-4 text-sm text-card-foreground">
            This &lt;section&gt; is the animated element.
          </section>
        </FadeIn>
      )}
    </Replay>
  ),
};
