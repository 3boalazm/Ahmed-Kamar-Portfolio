"use client";

/**
 * REPORT TOOLBAR — the data-site take on the OS's floating pill nav.
 * Same job (brand · sections · lang · theme · primary CTA · mobile
 * panel), different anatomy: a full-width glass bar whose section links
 * behave like worksheet tabs (amber tab-rule on the active one).
 */
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { usePrefs } from "@/components/providers/prefs";
import { NAV_LINKS, SITE, l } from "@/lib/content";
import { BrandMark } from "@/components/ui/brand-mark";
import { Icon } from "@/components/ui/icon";
import { Arrow } from "@/components/ui/arrow";
import { btn } from "@/components/ui/button";
import { cx } from "@/lib/utils";

const SECTION_IDS = [...NAV_LINKS.map((n) => n.id), "contact"];

export function Nav() {
  const { t, ar, theme, toggleLang, toggleTheme } = usePrefs();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("");

  const home = pathname === "/";
  const base = home ? "" : "/";

  useEffect(() => {
    if (!home) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      setScrolled(window.scrollY > 24);
      let current = "";
      for (const id of SECTION_IDS) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 140) current = id;
      }
      setActive(current);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [home]);

  if (pathname.startsWith("/cv")) return null;

  return (
    <header className="no-print fixed inset-x-0 top-0 z-50">
      <div
        className={cx(
          "glass border-x-0 border-t-0 transition-shadow duration-500 ease-physics",
          scrolled || open ? "shadow-card" : "shadow-none",
        )}
      >
        <nav aria-label={ar ? "التنقل الرئيسي" : "Primary"} className="container-wide flex h-14 items-center gap-3">
          <a href={home ? "#top" : "/"} className="flex items-center gap-2.5" aria-label={SITE.short}>
            <BrandMark />
            <span className="hidden font-display text-subtitle leading-none tracking-[-0.02em] sm:block">
              Ahmed <span className="text-accent-text">Kamar</span>
            </span>
          </a>

          <ul className="ms-6 hidden items-stretch self-stretch md:flex" role="list">
            {NAV_LINKS.map((link) => {
              const isActive = active === link.id;
              return (
                <li key={link.id} className="relative flex">
                  <a
                    href={`${base}#${link.id}`}
                    aria-current={isActive ? "location" : undefined}
                    className={cx(
                      "relative flex items-center px-3 font-mono text-caption uppercase tracking-[0.1em] transition-colors duration-300",
                      isActive ? "text-text-primary" : "text-text-tertiary hover:text-text-secondary",
                    )}
                  >
                    {t(link.label)}
                    <span
                      aria-hidden
                      className={cx(
                        "absolute inset-x-2 bottom-0 h-0.5 origin-center bg-accent transition-transform duration-500 ease-physics",
                        isActive ? "scale-x-100" : "scale-x-0",
                      )}
                    />
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="ms-auto flex items-center gap-2">
            <button
              type="button"
              onClick={toggleLang}
              aria-label={ar ? "Switch to English" : "التبديل إلى العربية"}
              className="grid h-8 min-w-8 place-items-center rounded-card border border-border-subtle px-2 font-mono text-micro text-text-secondary transition-colors duration-300 hover:border-border-strong hover:text-text-primary"
            >
              {ar ? "EN" : <span style={{ fontFamily: "var(--font-sans)", fontSize: "0.95rem", lineHeight: 1 }}>ع</span>}
            </button>
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
              className="grid size-8 place-items-center rounded-card border border-border-subtle text-text-secondary transition-colors duration-300 hover:border-border-strong hover:text-text-primary"
            >
              <Icon name={theme === "dark" ? "sun" : "moon"} size={14} />
            </button>
            <a href={`${base}#contact`} className={btn("primary", "hidden px-3 py-1.5 text-caption sm:inline-flex")}>
              {ar ? "تواصل" : "CONTACT"}
              <Arrow size={12} className="transition-transform duration-300 group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5" />
            </a>
            <button
              type="button"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((v) => !v)}
              className="grid size-8 place-items-center rounded-card text-text-secondary hover:text-text-primary md:hidden"
            >
              <Icon name={open ? "x" : "menu"} size={18} />
            </button>
          </div>
        </nav>

        {open && (
          <div id="mobile-menu" className="container-wide border-t border-border-subtle pb-3 pt-2 md:hidden">
            <ul className="flex flex-col" role="list">
              {[...NAV_LINKS, { id: "contact", label: l("CONTACT", "تواصل") }].map((link, i) => (
                <li key={link.id}>
                  <a
                    href={`${base}#${link.id}`}
                    onClick={() => setOpen(false)}
                    className={cx(
                      "flex items-center justify-between border-b border-border-subtle py-3 font-mono text-label uppercase tracking-[0.08em]",
                      active === link.id ? "text-accent-text" : "text-text-secondary",
                    )}
                  >
                    <span>
                      <span className="text-text-ghost">{String(i + 1).padStart(2, "0")}</span>
                      <span className="ms-3">{t(link.label)}</span>
                    </span>
                    <Arrow size={14} />
                  </a>
                </li>
              ))}
              <li>
                <a href={SITE.cv} className={btn("secondary", "mt-3 w-full")}>
                  {ar ? "تحميل السيرة الذاتية" : "Download CV"}
                  <Icon name="arrow-down" size={14} />
                </a>
              </li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
}
