import type { Meta, StoryObj } from "@storybook/react-vite";

import { Chip } from "../../primitives/Chip/Chip";
import { PlatformBadge } from "../PlatformBadge/PlatformBadge";
import { SegmentPill } from "./SegmentPill";

const meta = {
  title: "Brand/SegmentPill",
  component: SegmentPill,
  globals: { theme: "scribe" },
  argTypes: {
    tone: { control: "inline-radio", options: ["live", "neutral", "success", "danger"] },
    size: { control: "inline-radio", options: ["row", "card", "micro"] },
  },
  args: {
    tone: "live",
    size: "row",
    children: "Ongoing",
    leading: <PlatformBadge platform="meet" />,
    trailing: <Chip size="sm">12:35m</Chip>,
  },
} satisfies Meta<typeof SegmentPill>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

/** The meetings list's four statuses (100:41115), each 200px wide. */
export const Rows: Story = {
  render: () => (
    <div className="flex flex-col items-start gap-4">
      <SegmentPill
        tone="live"
        leading={<PlatformBadge platform="meet" />}
        trailing={<Chip size="sm">12:35m</Chip>}
      >
        Ongoing
      </SegmentPill>
      <SegmentPill
        tone="neutral"
        leading={<PlatformBadge platform="zoom" />}
        trailing={<Chip size="sm">12:00 - 13:00</Chip>}
      >
        Upcoming
      </SegmentPill>
      <SegmentPill
        tone="success"
        leading={<PlatformBadge platform="meet" />}
        trailing={<Chip size="sm">Duration: 25m</Chip>}
      >
        Done
      </SegmentPill>
      <SegmentPill
        tone="danger"
        leading={<PlatformBadge platform="meet" tone="danger" />}
        trailing={<Chip size="sm">Duration: 0</Chip>}
      >
        Failed
      </SegmentPill>
    </div>
  ),
};

/** Expanded meet cards (100:43864 / 100:43894 / 100:43926) and the detail header's "Completed" (100:40794). */
export const Cards: Story = {
  render: () => (
    <div className="flex flex-col items-start gap-4">
      <SegmentPill
        size="card"
        tone="live"
        leading={<PlatformBadge platform="meet" />}
        trailing={<Chip size="sm">12:35m</Chip>}
      >
        Ongoing
      </SegmentPill>
      <SegmentPill size="card" tone="neutral" leading={<PlatformBadge platform="meet" />}>
        Upcoming
      </SegmentPill>
      <SegmentPill
        size="card"
        tone="success"
        leading={<PlatformBadge platform="meet" />}
        trailing={<Chip size="sm">Duration: 25m</Chip>}
      >
        Done
      </SegmentPill>
      <SegmentPill size="card" tone="success" leading={<PlatformBadge platform="meet" />}>
        Completed
      </SegmentPill>
    </div>
  ),
};

/** The calendar's micro cards (100:43960 / 100:43975 / 100:43987). */
export const Micro: Story = {
  render: () => (
    <div className="flex flex-col items-start gap-3">
      <SegmentPill
        size="micro"
        tone="live"
        leading={<PlatformBadge platform="meet" size="micro" />}
        trailing={<Chip size="micro">12:35m</Chip>}
      >
        Ongoing
      </SegmentPill>
      <SegmentPill
        size="micro"
        tone="neutral"
        leading={<PlatformBadge platform="meet" size="micro" />}
      >
        Upcoming
      </SegmentPill>
      <SegmentPill
        size="micro"
        tone="success"
        leading={<PlatformBadge platform="meet" size="micro" />}
      >
        Completed
      </SegmentPill>
    </div>
  ),
};

/** Armenian labels and a long one: the row pill grows past 200px instead of clipping. */
export const EdgeCases: Story = {
  render: () => (
    <div className="flex flex-col items-start gap-4">
      <SegmentPill
        tone="live"
        leading={<PlatformBadge platform="meet" />}
        trailing={<Chip size="sm">12:35ր</Chip>}
      >
        Ընթացիկ
      </SegmentPill>
      <SegmentPill
        tone="neutral"
        leading={<PlatformBadge platform="zoom" />}
        trailing={<Chip size="sm">12:00 - 13:00</Chip>}
      >
        Սպասվող հանդիպում
      </SegmentPill>
      <SegmentPill tone="neutral">No leading badge</SegmentPill>
    </div>
  ),
};
