import { CheckCheck } from "lucide-react";

import type { NotificationHeaderProps } from "./NotificationBell.types.js";

/**
 * Panel heading with the "mark everything read" action. Rendered only when the
 * caller supplies `onMarkAllRead` — a header whose one control does nothing is
 * worse than no header.
 */
function NotificationHeader({ title, hasUnread, onMarkAll, markAllLabel }: NotificationHeaderProps) {
  return (
    <div
      data-slot="notification-header"
      className="flex items-center justify-between border-b border-white/10 bg-brand-surface-2/60 px-4 py-3 backdrop-blur-[15px]"
    >
      <span className="text-[13px] font-bold text-white">{title ?? "Notifications"}</span>
      <button
        type="button"
        onClick={onMarkAll}
        disabled={!hasUnread}
        className="inline-flex items-center gap-1 text-[11px] font-medium text-white/70 transition-colors hover:text-brand-green disabled:cursor-not-allowed disabled:opacity-40"
      >
        <CheckCheck size={13} aria-hidden="true" />
        {markAllLabel ?? "Mark all read"}
      </button>
    </div>
  );
}

export { NotificationHeader };
