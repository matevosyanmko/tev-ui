import * as React from "react";
import { Search } from "lucide-react";

import { Input } from "../Input/Input.js";
import { SearchIcon } from "../../brand/ScribeIcons/ScribeIcons.js";
import { cn } from "../../../utils.js";
import type { SearchFieldProps } from "./SearchField.types.js";

const SearchField = React.forwardRef<HTMLInputElement, SearchFieldProps>(function SearchField(
  { className, inputClassName, containerProps, variant = "default", ...props },
  ref,
) {
  if (variant === "pill") {
    // TevScribe's toolbar search (100:41115): a 32px white pill with a black
    // stroke, the 32px search glyph 8px in and the text 6px after it.
    return (
      <div className={cn("relative", className)} {...containerProps}>
        <SearchIcon className="pointer-events-none absolute top-1/2 left-2 -translate-y-1/2 text-icon-ink" />
        <Input
          ref={ref}
          data-slot="search-field"
          data-variant="pill"
          className={cn(
            "h-8 w-full rounded-30 border-stroke-ink bg-surface-primary py-0 pr-3 pl-11.25 text-caption-10 text-content-primary shadow-none placeholder:text-content-primary md:text-caption-10",
            "transition-[color,background-color,box-shadow] duration-(--duration-fast) ease-standard hover:bg-surface-subtle motion-reduce:transition-none",
            inputClassName,
          )}
          {...props}
        />
      </div>
    );
  }

  return (
    <div className={cn("relative", className)} {...containerProps}>
      <Search
        size={14}
        className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-brand-surface-1"
      />
      <Input
        ref={ref}
        data-slot="search-field"
        className={cn(
          "h-8 w-full rounded-full border-transparent bg-card! pl-8 text-[11px] text-brand-surface-1 shadow-none ring-0! focus:border-input",
          inputClassName,
        )}
        {...props}
      />
    </div>
  );
});

SearchField.displayName = "SearchField";

export { SearchField };
