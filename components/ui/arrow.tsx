import { Icon } from "./icon";

/** Directional arrow that flips in RTL so "next" always points the reading direction. */
export function Arrow({ size = 14, className = "" }: { size?: number; className?: string }) {
  return <Icon name="arrow-right" size={size} className={`rtl:-scale-x-100 ${className}`} />;
}
