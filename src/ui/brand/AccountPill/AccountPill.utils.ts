// Kept out of AccountPill.tsx so that file only exports components — the
// prerequisite for React Fast Refresh to hot-swap <AccountPill> rather than
// remount the tree.

/**
 * First letter of each of the first two words, uppercased: "Anna Petrosyan" →
 * "AP". Falls back to "?" so the avatar is never an empty circle.
 *
 * Deliberately naive, and exposed as `user.initials` for that reason: any rule
 * more elaborate than "split on whitespace" is locale-specific (a mononym, a
 * CJK name, a patronymic that should not be abbreviated), and locale belongs to
 * the caller, not to this package.
 */
export function accountInitials(name?: string): string {
  const words = name?.trim().split(/\s+/).filter(Boolean) ?? [];
  if (words.length === 0) return "?";
  // Spread rather than `word[0]`: indexing splits a surrogate pair and yields
  // half a character for names outside the BMP.
  return words
    .slice(0, 2)
    .map((word) => [...word][0])
    .join("")
    .toUpperCase();
}
