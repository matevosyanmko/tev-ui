import * as React from "react";
import { Search } from "lucide-react";

import { Input } from "../Input/Input.js";
import { cn } from "../../../utils.js";
import type { SearchFieldProps } from "./SearchField.types.js";

const SearchField = React.forwardRef<HTMLInputElement, SearchFieldProps>(function SearchField(
  { className, inputClassName, containerProps, ...props },
  ref,
) {
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
