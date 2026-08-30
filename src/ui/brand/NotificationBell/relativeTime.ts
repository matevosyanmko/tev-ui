/**
 * Coarse English relative time — "just now", "12m ago", "3h ago", "2d ago".
 *
 * Deliberately the *fallback*, not the mechanism: it has no locale and no
 * plural rules. Pass `formatTime` to <NotificationBell> to use the app's own
 * translator. Kept out of the component files so those export only components.
 */
export function relativeTime(value: string | number | Date): string {
  const timestamp = new Date(value).getTime();
  if (Number.isNaN(timestamp)) return "";

  const minutes = Math.floor(Math.max(0, Date.now() - timestamp) / 60_000);
  if (minutes < 1) return "just now";
  if (minutes < 60) return `${minutes}m ago`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;

  return `${Math.floor(hours / 24)}d ago`;
}
