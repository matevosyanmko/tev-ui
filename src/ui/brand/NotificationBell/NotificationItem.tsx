import { cn } from "../../../utils.js";
import type {
  NotificationItemProps,
  NotificationTone,
} from "./NotificationBell.types.js";

// Written out in full rather than assembled from a `bg-brand-${tone}` template:
// Tailwind scans source text, so a class built at runtime compiles to nothing.
const TONE_DOT: Record<NotificationTone, string> = {
  default: "bg-brand-purple",
  success: "bg-brand-green",
  warning: "bg-brand-amber",
  danger: "bg-brand-coral",
};

function NotificationItem({
  notification,
  onClick,
  formatTime,
  showDetailsLabel,
}: NotificationItemProps) {
  return (
    <button
      type="button"
      data-slot="notification-item"
      data-tone={notification.tone ?? "default"}
      data-read={notification.read || undefined}
      onClick={() => onClick?.(notification)}
      className="flex w-full items-center gap-4 border-b border-white/10 px-4 py-4 text-left transition-colors last:border-b-0 hover:bg-white/5"
    >
      <span
        aria-hidden="true"
        className={cn("size-3.5 shrink-0 rounded-full", TONE_DOT[notification.tone ?? "default"])}
      />
      <span className="min-w-0 flex-1">
        <span className="flex items-center justify-between gap-2">
          <span className="min-w-0 truncate text-[11px] font-medium text-white">
            {notification.title}
          </span>
          {notification.createdAt ? (
            <span className="shrink-0 text-[9px] text-white/50">
              {formatTime(notification.createdAt)}
            </span>
          ) : null}
        </span>
        {notification.hasDetails ? (
          <span className="mt-1 block text-[9px] text-white/70 underline underline-offset-2">
            {showDetailsLabel ?? "Show details"}
          </span>
        ) : notification.body ? (
          <span className="mt-1 block truncate text-[10px] text-white/60">
            {notification.body}
          </span>
        ) : null}
      </span>
      {!notification.read ? (
        <span aria-hidden="true" className="size-2 shrink-0 rounded-full bg-brand-green" />
      ) : null}
    </button>
  );
}

export { NotificationItem };
