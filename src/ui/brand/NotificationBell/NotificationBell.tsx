"use client";

import { Popover, PopoverContent, PopoverTrigger } from "../../primitives/Popover/Popover.js";
import { NotificationBellIcon } from "../Icons/Icons.js";
import { cn } from "../../../utils.js";
import { NotificationHeader } from "./NotificationHeader.js";
import { NotificationList } from "./NotificationList.js";
import { relativeTime } from "./relativeTime.js";
import type { NotificationBellProps } from "./NotificationBell.types.js";

/**
 * The header bell and its notification panel.
 *
 * Purely presentational: fetching, polling, marking-as-seen and routing on
 * click all stay in the app. It takes the items it should draw and reports
 * back what the user did. That is what lets it be storyboarded — and what
 * keeps a UI package free of the app's query client and router.
 *
 * `open`/`onOpenChange` are optional. Left out, the popover manages itself;
 * supplied, the app can close the panel as part of navigating away, or use the
 * open transition to mark the batch seen.
 *
 * The bell is a 48px tile below `lg` and 80px from `lg` up, matching
 * `AppHeader`'s height; the panel narrows to the screen on a phone.
 */
function NotificationBell({
  items,
  unseen = 0,
  onItemClick,
  onMarkAllRead,
  formatTime = relativeTime,
  open,
  onOpenChange,
  labels,
  className,
  contentClassName,
}: NotificationBellProps) {
  const hasUnread = items.some((item) => !item.read);

  return (
    <Popover open={open} onOpenChange={onOpenChange}>
      <PopoverTrigger
        data-brand="notification-bell"
        aria-label={labels?.title ?? "Notifications"}
        className={cn(
          "relative flex size-12 shrink-0 items-center justify-center rounded-[16px] lg:size-20 lg:rounded-[18px]",
          "bg-brand-surface-2 text-white transition-[filter] outline-none hover:brightness-125",
          className,
        )}
      >
        <NotificationBellIcon size={32} className="size-6 lg:size-8" />
        {unseen > 0 ? (
          <span
            aria-hidden="true"
            className="absolute top-2 right-2 size-[10px] rounded-full bg-brand-green lg:top-3 lg:right-3"
          />
        ) : null}
      </PopoverTrigger>

      <PopoverContent
        align="end"
        sideOffset={10}
        // Keeps the phone-width panel off the screen's edges, in step with the
        // shell's 12px gutter; the desktop panel never reaches an edge.
        collisionPadding={12}
        data-brand="notification-bell-content"
        className={cn(
          "w-[min(22.5rem,calc(100vw-1.5rem))] overflow-hidden rounded-[16px] border-none bg-transparent p-0 text-black",
          contentClassName,
        )}
      >
        {onMarkAllRead ? (
          <NotificationHeader
            title={labels?.title}
            hasUnread={hasUnread}
            onMarkAll={onMarkAllRead}
            markAllLabel={labels?.markAllRead}
          />
        ) : null}
        <NotificationList
          items={items}
          onItemClick={onItemClick}
          formatTime={formatTime}
          labels={labels}
        />
      </PopoverContent>
    </Popover>
  );
}

export { NotificationBell };
