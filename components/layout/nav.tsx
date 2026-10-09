"use client";

/**
 * FLOATING PILL NAV — the OS navigation, carried over 1:1 in structure:
 * brand orb · section links with an amber underline + active dot · AR/EN
 * flip · theme flip · primary CTA · glass mobile panel. The orb is
 * Ahmed's portrait. Active state follows the route (multi-page).
 */
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { usePrefs } from "@/components/providers/prefs";
import { NAV_LINKS, NAV_MORE, SITE } from "@/lib/content";
import { BrandOrb } from "@/components/ui/brand-orb";
import { Icon } from "@/components/ui/icon";
import { Arrow } from "@/components/ui/arrow";
import { btn } from "@/components/ui/button";
import { cx } from "@/lib/utils";

export function Nav() {
  const { t, ar, theme, toggleLang, toggleTheme } = usePrefs();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 64);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  if (pathname.startsWith("/cv")) return null;

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href.split("#")[0]!));

  return (
    <nav
      aria-label={ar ? "التنقل الرئيسي" : "Primary"}
      className="no-print fixed left-1/2 top-2 z-50 w-max max-w-[calc(100vw-16px)] -translate-x-1/2"
    >
      <div
        className={cx(
          "glass flex items-center gap-2 rounded-pill py-1 ps-3 pe-1 transition-shadow duration-500 ease-physics md:gap-3",
          scrolled || open ? "shadow-card" : "shadow-none",
        )}
      >
        <Link href="/" aria-label={SITE.short} className="flex items-center gap-2">
          <BrandOrb size={32} alt={SITE.short} />
          <span className="hidden font-display text-subtitle leading-none tracking-[-0.02em] sm:block" aria-hidden>
            A<span className="text-accent-text">K</span>
          </span>
        </Link>

        <ul className="hidden items-center gap-2 md:flex" role="list">
          {NAV_LINKS.map((link) => {
            const active = isActive(link.href);
            return (
              <li key={link.href} className="relative">
                <Link
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={cx(
                    "group relative block px-2 py-1 font-display text-caption uppercase tracking-[0.08em] transition-colors duration-500 ease-physics",
                    active ? "text-text-primary" : "text-text-tertiary hover:text-text-secondary",
                  )}
                >
                  {t(link.label)}
                  <span className="absolute inset-x-1 -bottom-px h-px origin-left scale-x-0 bg-accent transition-transform duration-700 ease-physics group-hover:scale-x-100" />
                </Link>
                {active && <span className="absolute -bottom-0.5 left-1/2 size-1 -translate-x-1/2 rounded-pill bg-accent" />}
              </li>
            );
          })}
        </ul>

        <button
          type="button"
          onClick={toggleLang}
          aria-label={ar ? "Switch to English" : "التبديل إلى العربية"}
          className="rounded-pill border border-border-subtle px-2 py-1 font-mono text-micro text-text-secondary transition-colors duration-500 ease-physics hover:border-border-strong hover:text-text-primary"
        >
          {ar ? "EN" : <span style={{ fontFamily: "var(--font-sans)", fontSize: "1rem", lineHeight: 1, fontWeight: 500 }}>ع</span>}
        </button>

        <button
          type="button"
          onClick={toggleTheme}
          aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
          className="grid size-7 place-items-center rounded-pill border border-border-subtle text-text-secondary transition-colors duration-500 ease-physics hover:border-border-strong hover:text-text-primary"
        >
          <Icon name={theme === "dark" ? "sun" : "moon"} size={14} />
        </button>

        <Link
          href="/contact"
          className={btn("primary", "group whitespace-nowrap px-3 py-1 font-display text-caption tracking-[0.06em]")}
        >
          {ar ? "تواصل" : "CONTACT"}
          <Arrow size={12} className="hidden transition-transform duration-500 ease-physics group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5 sm:inline-flex" />
        </Link>

        <button
          type="button"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
          className="grid size-8 place-items-center rounded-pill text-text-secondary transition-colors duration-500 ease-physics hover:text-text-primary md:hidden"
        >
          <Icon name={open ? "x" : "menu"} size={16} />
        </button>
      </div>

      {open && (
        <ul
          id="mobile-menu"
          role="list"
          className="glass fade-up mt-1 flex max-h-[calc(100svh-5.5rem)] flex-col overflow-y-auto overscroll-contain rounded-panel p-2 shadow-card md:hidden"
        >
          {[{ href: "/", label: { en: "HOME", ar: "الرئيسية" } }, ...NAV_LINKS, ...NAV_MORE].map((link) => {
            const label = t(link.label);
            const download = label.endsWith("↓");
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={isActive(link.href) ? "page" : undefined}
                  className={cx(
                    "flex items-center gap-1.5 rounded-card px-2 py-2.5 font-display text-micro uppercase tracking-[0.08em] transition-colors duration-500 ease-physics",
                    isActive(link.href) ? "text-accent-text" : "text-text-secondary hover:bg-surface-2 hover:text-text-primary",
                  )}
                >
                  {label.replace(/\s*↓$/, "")}
                  {download && <Icon name="arrow-down" size={13} className="text-text-ghost" />}
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </nav>
  );
}
