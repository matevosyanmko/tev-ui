import type * as React from "react";
import { Slot } from "radix-ui";

import { cn } from "../../../utils.js";
import { Separator } from "../Separator/Separator.js";
import type { ItemMediaProps, ItemProps } from "./Item.types.js";
import { itemMediaVariants, itemVariants } from "./Item.variants.js";

/**
 * One row of a list: media, a title over a description, and actions — the
 * phone-sized shape of what a table row says across five columns.
 *
 *   <ItemGroup>
 *     <Item asChild>
 *       <Link to="/meetings/42">
 *         <ItemMedia>GM</ItemMedia>
 *         <ItemContent>
 *           <ItemTitle>Weekly sync</ItemTitle>
 *           <ItemDescription>10:00 · 45 min</ItemDescription>
 *         </ItemContent>
 *         <ItemActions><Badge>Completed</Badge></ItemActions>
 *       </Link>
 *     </Item>
 *   </ItemGroup>
 *
 * The row wraps (`flex-wrap`), so `ItemHeader` and `ItemFooter` — full-width
 * lines — sit above and below the media/content/actions line.
 *
 * No list roles are implied: a row is usually a link, and `role="listitem"`
 * on an <a> would take its link role away. Where the count matters to a
 * screen reader, render the group as a <ul> and each row inside an <li>.
 */
function ItemGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="item-group"
      className={cn("group/item-group flex flex-col", className)}
      {...props}
    />
  );
}

function ItemSeparator({ className, ...props }: React.ComponentProps<typeof Separator>) {
  return (
    <Separator
      data-slot="item-separator"
      orientation="horizontal"
      className={cn("my-0", className)}
      {...props}
    />
  );
}

function Item({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: ItemProps) {
  const Comp = asChild ? Slot.Root : "div";
  return (
    <Comp
      data-slot="item"
      data-variant={variant}
      data-size={size}
      className={cn(itemVariants({ variant, size, className }))}
      {...props}
    />
  );
}

function ItemMedia({ className, variant = "default", ...props }: ItemMediaProps) {
  return (
    <div
      data-slot="item-media"
      data-variant={variant}
      className={cn(itemMediaVariants({ variant, className }))}
      {...props}
    />
  );
}

function ItemContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="item-content"
      className={cn(
        "flex min-w-0 flex-1 flex-col gap-1 [&+[data-slot=item-content]]:flex-none",
        className,
      )}
      {...props}
    />
  );
}

function ItemTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="item-title"
      className={cn(
        "flex w-fit max-w-full items-center gap-2 text-sm leading-snug font-medium",
        className,
      )}
      {...props}
    />
  );
}

function ItemDescription({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="item-description"
      className={cn(
        "line-clamp-2 text-sm leading-normal font-normal text-balance text-muted-foreground",
        "[&>a]:underline [&>a]:underline-offset-4 [&>a:hover]:text-primary",
        className,
      )}
      {...props}
    />
  );
}

function ItemActions({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div data-slot="item-actions" className={cn("flex items-center gap-2", className)} {...props} />
  );
}

function ItemHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="item-header"
      className={cn("flex basis-full items-center justify-between gap-2", className)}
      {...props}
    />
  );
}

function ItemFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="item-footer"
      className={cn("flex basis-full items-center justify-between gap-2", className)}
      {...props}
    />
  );
}

export {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemFooter,
  ItemGroup,
  ItemHeader,
  ItemMedia,
  ItemSeparator,
  ItemTitle,
};
