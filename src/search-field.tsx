import * as React from "react";
import { Search } from "lucide-react";

import { Input } from "./input";
import { cn } from "./utils";

export interface SearchFieldProps extends React.ComponentProps<"input"> {
  /** Classes for the wrapper that positions the search icon. */
  className?: string;
  /** Classes for the <input> itself. */
  inputClassName?: string;
  containerProps?: React.ComponentProps<"div"> & Record<`data-${string}`, string>;
}

const SearchField = React.forwardRef<HTMLInputElement, SearchFieldProps>(
  function SearchField({ className, inputClassName, containerProps, ...props }, ref) {
  return (
    <div className={cn("relative", className)} {...containerProps}>
      <Search
        size={14}
        className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-foreground"
      />
      <Input
        ref={ref}
        data-slot="search-field"
        className={cn(
          "h-8 w-full rounded-full focus:border-input border-transparent bg-card! pl-8 text-[11px] shadow-none ring-0!",
          inputClassName,
        )}
        {...props}
      />
    </div>
  );
});

SearchField.displayName = "SearchField";

export { SearchField };
