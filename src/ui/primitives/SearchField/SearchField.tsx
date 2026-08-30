import * as React from "react";
import { Search } from "lucide-react";

import { Input } from "../Input/Input.js";
import { cn } from "../../../utils.js";
import type { SearchFieldProps } from "./SearchField.types.js";

const SearchField = React.forwardRef<HTMLInputElement, SearchFieldProps>(
  function SearchField(
    { className, inputClassName, containerProps, ...props },
    ref,
  ) {
    return (
      <div className={cn("relative", className)} {...containerProps}>
        <Search
          size={14}
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-brand-surface-1"
        />
        <Input
          ref={ref}
          data-slot="search-field"
          className={cn(
            "h-8 w-full rounded-full focus:border-input border-transparent bg-card! pl-8 text-[11px] shadow-none ring-0! text-brand-surface-1",
            inputClassName,
          )}
          {...props}
        />
      </div>
    );
  },
);

SearchField.displayName = "SearchField";

export { SearchField };
