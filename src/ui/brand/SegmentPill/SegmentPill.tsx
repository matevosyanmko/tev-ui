import { cn } from "../../../utils.js";
import type { SegmentPillProps } from "./SegmentPill.types.js";
import {
  segmentPillLabelVariants,
  segmentPillSegmentVariants,
  segmentPillVariants,
} from "./SegmentPill.variants.js";

/**
 * A composite status pill: a leading badge, a toned segment with its label,
 * and an optional chip at the segment's end.
 *
 *   <SegmentPill
 *     tone="live"
 *     leading={<PlatformBadge platform="meet" />}
 *     trailing={<Chip size="sm">12:35m</Chip>}
 *   >
 *     Ongoing
 *   </SegmentPill>
 *
 * It knows tones, not meetings: the app decides that "ongoing" is `live`.
 * For the micro card, pass `size="micro"` and the micro sizes of the badge
 * and chip.
 */
function SegmentPill({
  tone = "neutral",
  size = "row",
  leading,
  trailing,
  className,
  children,
  ...props
}: SegmentPillProps) {
  const hasTrailing = trailing !== undefined && trailing !== null && trailing !== false;

  return (
    <span
      data-slot="segment-pill"
      data-tone={tone}
      data-size={size}
      className={cn(segmentPillVariants({ size }), className)}
      {...props}
    >
      {leading}
      <span
        data-slot="segment-pill-segment"
        className={segmentPillSegmentVariants({ tone, size, trailing: hasTrailing })}
      >
        <span data-slot="segment-pill-label" className={segmentPillLabelVariants({ tone, size })}>
          {children}
        </span>
        {trailing}
      </span>
    </span>
  );
}

export { SegmentPill };
