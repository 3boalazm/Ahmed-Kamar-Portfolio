"use client";

/**
 * PAGE HEADER — opener for every inner route (the OS's page-title block):
 * numbered marker → display title with marker emphasis → sub → optional
 * extra (e.g. a CTA row). Blueprint plate behind, glass beneath the nav.
 */
import type { ReactNode } from "react";
import { usePrefs } from "@/components/providers/prefs";
import type { L } from "@/lib/content";
import { SectionMarker } from "./section-marker";

export function PageHeader({
  index,
  kicker,
  title,
  sub,
  children,
}: {
  index: string;
  kicker: L;
  title: { readonly en: readonly string[]; readonly ar: readonly string[] };
  sub: L;
  children?: ReactNode;
}) {
  const { t, lang } = usePrefs();
  const [a, b] = title[lang];
  return (
    <header className="page-hero pt-28 md:pt-36">
      <div aria-hidden className="blueprint" style={{ maskImage: "radial-gradient(70% 90% at 30% 20%, #000 20%, transparent 75%)", WebkitMaskImage: "radial-gradient(70% 90% at 30% 20%, #000 20%, transparent 75%)" }} />
      <div className="container-wide relative z-10 pb-10 md:pb-14">
        <SectionMarker index={index} label={t(kicker)} />
        <h1 className="fade-up max-w-[18ch] text-display tracking-[-0.03em] text-text-primary" style={{ lineHeight: lang === "ar" ? 1.3 : 1.02 }}>
          {a}
          <em className="mark-em">{b}</em>
        </h1>
        <p className="fade-up mt-5 max-w-[56ch] text-lead text-text-secondary" style={{ "--d": "120ms" } as React.CSSProperties}>
          {t(sub)}
        </p>
        {children && (
          <div className="fade-up mt-6 flex flex-wrap items-center gap-3" style={{ "--d": "220ms" } as React.CSSProperties}>
            {children}
          </div>
        )}
      </div>
    </header>
  );
}
