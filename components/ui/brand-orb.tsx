/* eslint-disable @next/next/no-img-element */
import { SITE } from "@/lib/content";

/** Portrait avatar with the OS "breathing" amber halo. Used in the nav and footer. */
export function BrandOrb({ size = 32, alt = SITE.short }: { size?: number; alt?: string }) {
  return (
    <span className="brand-orb" style={{ width: size, height: size }}>
      <span className="brand-orb__glow" aria-hidden />
      <img src={SITE.avatar} alt={alt} width={size} height={size} className="brand-orb__img" style={{ width: size, height: size }} />
    </span>
  );
}
