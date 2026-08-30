"use client";

import { ScrollArea as ScrollAreaPrimitive } from "radix-ui";

import { NotificationItem } from "./NotificationItem.js";
import type { NotificationListProps } from "./NotificationBell.types.js";

/**
 * The frosted dark scroll pane inside the bell's popover.
 *
 * Uses the Radix ScrollArea primitive directly rather than this package's
 * <ScrollArea>: the track and thumb here are always visible and carry this
 * panel's own glass look, which the shared primitive deliberately does not.
 */
function NotificationList({ items, onItemClick, formatTime, labels }: NotificationListProps) {
  return (
    <div
      data-slot="notification-list"
      className="overflow-hidden rounded-b-[16px] bg-brand-surface-2/60 py-2 backdrop-blur-[15px]"
    >
      <ScrollAreaPrimitive.Root type="always" className="relative h-100">
        <ScrollAreaPrimitive.Viewport className="size-full">
          {/* w-1 min-w-full: Radix renders the viewport's content as
              `display: table`, which sizes to its content — this pair forces it
              back to the viewport's width so row text truncates instead of
              overflowing. The right padding reserves a gutter so no row (or
              unread dot) sits under the always-visible scrollbar overlay. */}
          <div className="w-1 min-w-full pr-3">
            {items.length ? (
              items.map((notification) => (
                <NotificationItem
                  key={notification.id}
                  notification={notification}
                  onClick={onItemClick}
                  formatTime={formatTime}
                  showDetailsLabel={labels?.showDetails}
                />
              ))
            ) : (
              <div className="px-4 py-12 text-center text-[12px] text-white/50">
                {labels?.empty ?? "No notifications"}
              </div>
            )}
          </div>
        </ScrollAreaPrimitive.Viewport>
        <ScrollAreaPrimitive.ScrollAreaScrollbar
          orientation="vertical"
          className="my-2 mr-2 flex w-[5px] touch-none rounded-full bg-white/25 select-none"
        >
          <ScrollAreaPrimitive.ScrollAreaThumb className="relative flex-1 rounded-full bg-brand-green" />
        </ScrollAreaPrimitive.ScrollAreaScrollbar>
      </ScrollAreaPrimitive.Root>
    </div>
  );
}

export { NotificationList };
