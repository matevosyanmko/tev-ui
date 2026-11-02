import { cn } from "../../../utils.js";
import { GoogleMeetIcon, ZoomIcon } from "../ScribeIcons/ScribeIcons.js";
import type { PlatformBadgeProps } from "./PlatformBadge.types.js";
import { platformBadgeVariants } from "./PlatformBadge.variants.js";

/**
 * The green pill that says where a meeting happens: the Meet "G" or the Zoom
 * wordmark, at the glyph's Figma size. It is an image with a name, so a list
 * read aloud says "Google Meet" rather than nothing.
 *
 * Platforms without a glyph show the first letter of their name, so a new
 * integration renders something sensible before it gets artwork.
 */
function PlatformBadge({
  platform,
  label,
  size = "default",
  tone = "default",
  className,
  ...props
}: PlatformBadgeProps) {
  const micro = size === "micro";
  const name =
    label ?? (platform === "meet" ? "Google Meet" : platform === "zoom" ? "Zoom" : platform);

  return (
    <span
      role="img"
      aria-label={name}
      data-slot="platform-badge"
      data-platform={platform}
      data-size={size}
      className={cn(platformBadgeVariants({ size, tone }), className)}
      {...props}
    >
      {platform === "meet" ? (
        <GoogleMeetIcon size={micro ? 8 : 16} />
      ) : platform === "zoom" ? (
        <ZoomIcon size={micro ? 12 : 24} />
      ) : (
        <span aria-hidden="true">{name.charAt(0).toUpperCase()}</span>
      )}
    </span>
  );
}

export { PlatformBadge };
