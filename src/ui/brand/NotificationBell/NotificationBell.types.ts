import type * as React from "react";

/**
 * How prominently an item reads. The app maps its own notification taxonomy
 * onto these four — the library has no business knowing that a type spelled
 * "task_audio" is a success and "alert" with severity "critical" is a danger.
 */
export type NotificationTone = "default" | "success" | "warning" | "danger";

export interface NotificationItemData {
  id: string | number;
  title?: React.ReactNode;
  body?: React.ReactNode;
  tone?: NotificationTone;
  /** Renders the "show details" affordance instead of the body. */
  hasDetails?: boolean;
  read?: boolean;
  createdAt?: string | number | Date;
}

export interface NotificationLabels {
  /** Accessible name for the bell, and the panel heading. */
  title?: string;
  empty?: string;
  showDetails?: string;
  markAllRead?: string;
}

export interface NotificationBellProps {
  items: NotificationItemData[];
  /** Number of items the user has not seen yet; drives the green dot. */
  unseen?: number;
  onItemClick?: (item: NotificationItemData) => void;
  /** Omit to hide the panel header entirely. */
  onMarkAllRead?: () => void;
  /**
   * Renders an item's timestamp. Defaults to coarse English relative time;
   * supply your own to get the app's locale and plural rules.
   */
  formatTime?: (value: NonNullable<NotificationItemData["createdAt"]>) => string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  labels?: NotificationLabels;
  /** Classes for the bell button. */
  className?: string;
  /** Classes for the dropdown panel. */
  contentClassName?: string;
}

export interface NotificationListProps {
  items: NotificationItemData[];
  onItemClick?: (item: NotificationItemData) => void;
  formatTime: (value: NonNullable<NotificationItemData["createdAt"]>) => string;
  labels?: Pick<NotificationLabels, "empty" | "showDetails">;
}

export interface NotificationItemProps {
  notification: NotificationItemData;
  onClick?: (item: NotificationItemData) => void;
  formatTime: (value: NonNullable<NotificationItemData["createdAt"]>) => string;
  showDetailsLabel?: string;
}

export interface NotificationHeaderProps {
  title?: string;
  hasUnread: boolean;
  onMarkAll: () => void;
  markAllLabel?: string;
}
