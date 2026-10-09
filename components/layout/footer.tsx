"use client";

import { usePathname } from "next/navigation";
import { usePrefs } from "@/components/providers/prefs";
import { FOOTER, SITE } from "@/lib/content";
import { BrandMark } from "@/components/ui/brand-mark";
import { Icon } from "@/components/ui/icon";

export function Footer() {
  const { t } = usePrefs();
  const pathname = usePathname();
  if (pathname.startsWith("/cv")) return null;
  const base = pathname === "/" ? "" : "/";

  return (
    <footer className="mt-16 border-t border-border-subtle">
      <div className="axis-ticks" aria-hidden />
      <div className="container-wide grid gap-8 py-8 md:grid-cols-[1.2fr_2fr]">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2.5">
            <BrandMark size={32} />
            <p className="font-display text-[1.6rem] leading-none tracking-[-0.03em]">
              A<span className="text-accent-text">K</span>.
            </p>
          </div>
          <p className="max-w-[34ch] text-body-sm text-text-tertiary">{t(FOOTER.blurb)}</p>
        </div>

        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3">
          {FOOTER.cols.map((col) => (
            <nav key={col.head.en} aria-label={col.head.en} className="flex flex-col gap-2">
              <p className="font-mono text-caption uppercase tracking-[0.12em] text-text-ghost">{t(col.head)}</p>
              <div className="flex flex-col gap-1.5">
                {col.links.map((link) => {
                  const label = t(link.label);
                  const outbound = label.endsWith("↗");
                  const download = label.endsWith("↓");
                  const text = label.replace(/\s*[↗↓]$/, "");
                  const external = link.href.startsWith("http") || link.href.startsWith("mailto");
                  const href = link.href.startsWith("#") ? `${base}${link.href}` : link.href;
                  return (
                    <a
                      key={link.href}
                      href={href}
                      {...(external && !link.href.startsWith("mailto") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      className="inline-flex w-fit items-center gap-1 text-body-sm text-text-tertiary transition-colors duration-300 hover:text-text-primary"
                    >
                      {text}
                      {outbound && <Icon name="arrow-up-right" size={12} className="text-text-ghost rtl:-scale-x-100" />}
                      {download && <Icon name="arrow-down" size={12} className="text-text-ghost" />}
                    </a>
                  );
                })}
              </div>
            </nav>
          ))}
        </div>
      </div>

      <div className="container-wide flex flex-wrap items-baseline justify-between gap-2 border-t border-border-subtle py-3">
        <p className="font-mono text-micro uppercase tracking-[0.1em] text-text-ghost">
          © 2026 {SITE.short.toUpperCase()} — {t(FOOTER.rights)}
        </p>
        <p className="font-mono text-micro uppercase tracking-[0.1em] text-text-ghost">{t(FOOTER.surprise)}</p>
        <p className="font-mono text-micro uppercase tracking-[0.1em] text-text-ghost">{t(FOOTER.built)}</p>
      </div>
    </footer>
  );
}
