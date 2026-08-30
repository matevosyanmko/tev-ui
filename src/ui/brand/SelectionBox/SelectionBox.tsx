import { Check } from "lucide-react";

import { cn } from "../../../utils.js";
import type { SelectionBoxProps } from "./SelectionBox.types.js";

/**
 * Square selection checkbox with a green dot when checked (Figma table style),
 * used by every table that supports row selection.
 *
 * A real <input type="checkbox"> stretched over the square rather than a
 * div + role: that keeps the native label association, focus handling and
 * form participation, and the square is drawn on the <label> around it.
 */
function SelectionBox({
  checked,
  onCheckedChange,
  label,
  className,
  ...props
}: SelectionBoxProps) {
  return (
    <label
      data-slot="selection-box"
      data-checked={checked || undefined}
      className={cn(
        "relative inline-flex size-[18px] items-center justify-center rounded-[6px]",
        "border border-black/35 bg-white align-middle transition-colors",
        "has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-brand-purple/50",
        checked && "border-brand-green",
        className,
      )}
    >
      <input
        type="checkbox"
        aria-label={label}
        checked={checked}
        onChange={(event) => onCheckedChange?.(event.target.checked)}
        className="absolute inset-0 size-full cursor-pointer appearance-none"
        {...props}
      />
      {checked ? (
        <span
          data-slot="selection-box-indicator"
          className="pointer-events-none inline-flex size-[10px] items-center justify-center rounded-full bg-brand-green"
        >
          <Check size={8} strokeWidth={4} className="text-brand-green-foreground" />
        </span>
      ) : null}
    </label>
  );
}

export { SelectionBox };
