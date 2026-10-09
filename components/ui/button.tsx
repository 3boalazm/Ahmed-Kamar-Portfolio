import { cx } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost";

/** Class recipe shared by every CTA (anchors and buttons). Rectangular, not pill — the data-site signature. */
export function btn(variant: Variant = "primary", extra?: string) {
  return cx(
    "group inline-flex items-center justify-center gap-2 rounded-card px-4 py-2.5 font-mono text-label uppercase tracking-[0.06em]",
    "transition-[transform,background-color,border-color,color] duration-[400ms] ease-physics hover:-translate-y-0.5",
    variant === "primary" && "bg-accent text-navy hover:bg-[color-mix(in_srgb,var(--color-accent)_88%,white)]",
    variant === "secondary" &&
      "border border-border-default bg-surface-1 text-text-primary hover:border-accent hover:text-accent-text",
    variant === "ghost" && "text-text-secondary hover:text-text-primary",
    extra,
  );
}
