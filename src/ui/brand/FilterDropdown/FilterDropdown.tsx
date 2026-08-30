"use client";

import { ChevronDown } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../primitives/DropdownMenu/DropdownMenu.js";
import { cn } from "../../../utils.js";
import type { FilterDropdownProps, FilterOption } from "./FilterDropdown.types.js";

const ALL_VALUE = "all";

/**
 * The green pill that opens a single-select filter menu — the control every
 * filter strip in the product is built from.
 *
 * `minWidth`/`maxWidth` are inline styles rather than variants because callers
 * size these to their own layout grid; a variant scale would never cover it.
 */
function FilterDropdown({
  value,
  options,
  onChange,
  allLabel,
  className,
  contentClassName,
  minWidth,
  maxWidth,
}: FilterDropdownProps) {
  const hasAllOption = Boolean(allLabel);
  const active = value || (hasAllOption ? ALL_VALUE : options[0]?.value);
  const entries: FilterOption[] =
    hasAllOption && allLabel ? [{ value: ALL_VALUE, label: allLabel }, ...options] : options;
  const current = entries.find((option) => option.value === active);
  const tone = current?.tone ?? "default";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        data-brand="filter-dropdown-trigger"
        data-tone={tone}
        style={minWidth || maxWidth ? { minWidth, maxWidth } : undefined}
        className={cn(
          "group flex h-8 shrink-0 items-center gap-1.5 rounded-full px-4",
          "text-[11px] font-bold transition-colors outline-none",
          "text-brand-green-foreground hover:bg-brand-purple-hover",
          tone === "danger" ? "bg-brand-coral" : "bg-brand-green",
          "data-[state=open]:bg-brand-purple data-[state=open]:text-brand-purple-hover data-[state=open]:hover:bg-brand-purple",
          className,
        )}
      >
        <span className="flex-1 truncate">{current?.label ?? allLabel}</span>
        <ChevronDown
          size={11}
          aria-hidden="true"
          className="shrink-0 text-brand-green-foreground transition-transform group-data-[state=open]:rotate-180"
        />
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="center"
        sideOffset={6}
        data-brand="filter-dropdown-content"
        className={cn(
          "flex max-w-[calc(50vw-16px)] min-w-[150px] flex-col gap-1",
          "rounded-[14px] border-none bg-brand-surface-1 p-1.5 shadow-xl",
          contentClassName,
        )}
      >
        <DropdownMenuGroup className="flex flex-col gap-1">
          {entries.map((option) => {
            const selected = option.value === active;
            return (
              <DropdownMenuItem
                key={option.value}
                data-brand="filter-dropdown-item"
                onSelect={() =>
                  onChange(hasAllOption && option.value === ALL_VALUE ? "" : option.value)
                }
                className={cn(
                  "block w-full truncate rounded-full border px-4 py-[7px]",
                  "justify-start text-[11px] font-semibold",
                  selected
                    ? "border-transparent bg-brand-purple text-brand-purple-foreground"
                    : "border-white/10 bg-transparent text-white/70 hover:border-transparent hover:bg-brand-purple-hover hover:text-black focus:border-transparent focus:bg-brand-purple-hover focus:text-black",
                )}
              >
                {option.label}
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export { FilterDropdown };
