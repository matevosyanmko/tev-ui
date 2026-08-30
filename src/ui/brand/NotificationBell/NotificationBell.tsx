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
          "relative flex size-20 shrink-0 items-center justify-center rounded-[18px]",
          "bg-brand-surface-2 text-white transition-[filter] outline-none hover:brightness-125",
          className,
        )}
      >
        <NotificationBellIcon size={32} />
        {unseen > 0 ? (
          <span
            aria-hidden="true"
            className="absolute top-3 right-3 size-[10px] rounded-full bg-brand-green"
          />
        ) : null}
      </PopoverTrigger>

      <PopoverContent
        align="end"
        sideOffset={10}
        data-brand="notification-bell-content"
        className={cn(
          "w-90 overflow-hidden rounded-[16px] border-none bg-transparent p-0 text-black",
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
