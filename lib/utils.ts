export function cx(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}

/** Series colour → Tailwind class fragments (kept literal so Tailwind can see them). */
export const SERIES = {
  sky: { text: "text-sky-text", bg: "bg-sky", dim: "bg-sky-dim", border: "border-sky/40", var: "var(--color-sky)" },
  mint: { text: "text-mint-text", bg: "bg-mint", dim: "bg-mint-dim", border: "border-mint/40", var: "var(--color-mint)" },
  violet: { text: "text-violet-text", bg: "bg-violet", dim: "bg-violet-dim", border: "border-violet/40", var: "var(--color-violet)" },
  rose: { text: "text-rose-text", bg: "bg-rose", dim: "bg-rose-dim", border: "border-rose/40", var: "var(--color-rose)" },
} as const;
export type Series = keyof typeof SERIES;
