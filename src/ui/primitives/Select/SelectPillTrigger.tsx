import { Select as SelectPrimitive } from "radix-ui";

import { ChevronDownIcon } from "../../brand/ScribeIcons/ScribeIcons.js";
import { cn } from "../../../utils.js";
import type { SelectTriggerProps } from "./Select.types.js";

/**
 * `<SelectTrigger variant="pill">`: TevScribe's language pill (100:41115,
 * 100:41869; `size="lg"` for settings, 100:40567). Its own file because it
 * owns a styling contract separate from the default trigger's — a flag circle,
 * the value and the 8px Figma chevron, with the 2px value-to-chevron gap the
 * frames draw — and is not exported on its own.
 */
function SelectPillTrigger({
  className,
  size = "default",
  media,
  children,
  ...props
}: Omit<SelectTriggerProps, "variant">) {
  return (
    <SelectPrimitive.Trigger
      data-slot="select-trigger"
      data-variant="pill"
      data-size={size}
      className={cn(
        "group/select-pill inline-flex w-fit shrink-0 items-center justify-center gap-2 rounded-20 bg-surface-primary px-3 text-caption-10 whitespace-nowrap text-content-primary inset-ring inset-ring-stroke-ink outline-none data-[size=default]:h-8 data-[size=lg]:h-10 data-[size=lg]:px-5 data-[size=sm]:h-8",
        "transition-fill duration-(--duration-fast) ease-standard hover:bg-surface-subtle focus-visible:ring-3 focus-visible:ring-ring/50 motion-reduce:transition-none",
        "disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:inset-ring-stroke-accent-red data-[placeholder]:text-content-secondary",
        "*:data-[slot=select-value]:flex *:data-[slot=select-value]:min-w-0 *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2 *:data-[slot=select-value]:truncate",
        className,
      )}
      {...props}
    >
      {media ? (
        <span
          data-slot="select-trigger-media"
          aria-hidden="true"
          className="flex size-4 shrink-0 items-center justify-center *:size-4 *:rounded-full *:object-cover"
        >
          {media}
        </span>
      ) : null}
      <span className="flex min-w-0 items-center gap-0.5">
        {children}
        <SelectPrimitive.Icon asChild>
          <ChevronDownIcon className="transition-transform duration-(--duration-fast) ease-standard group-data-[state=open]/select-pill:rotate-180 motion-reduce:transition-none" />
        </SelectPrimitive.Icon>
      </span>
    </SelectPrimitive.Trigger>
  );
}

export { SelectPillTrigger };
