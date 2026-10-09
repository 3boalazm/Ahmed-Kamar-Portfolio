/** Three-bar mark (sky · mint · amber) — the site's logo and favicon motif. */
export function BrandMark({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden className="shrink-0">
      <rect width="32" height="32" rx="7" fill="var(--color-navy)" />
      <rect width="31" height="31" x=".5" y=".5" rx="6.5" fill="none" stroke="var(--color-border-strong)" />
      <rect x="6" y="17" width="4.5" height="9" rx="1" fill="var(--color-sky)" />
      <rect x="13.75" y="11" width="4.5" height="15" rx="1" fill="var(--color-mint)" />
      <rect x="21.5" y="6" width="4.5" height="20" rx="1" fill="var(--color-accent)" />
    </svg>
  );
}
