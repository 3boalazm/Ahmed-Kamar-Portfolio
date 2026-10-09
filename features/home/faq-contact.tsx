"use client";

import { useState } from "react";
import Link from "next/link";
import { usePrefs } from "@/components/providers/prefs";
import { CONTACT, FAQ, SITE } from "@/lib/content";
import { Icon } from "@/components/ui/icon";
import { Arrow } from "@/components/ui/arrow";
import { btn } from "@/components/ui/button";

/* ── FAQ / objection handling ── */
export function Faq() {
  const { t, lang } = usePrefs();
  const [a, b] = FAQ.title[lang];
  return (
    <section id="faq" className="container-content scroll-mt-24 py-14 md:py-20">
      <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <p className="font-mono text-caption uppercase tracking-[0.14em] text-accent-text">{t(FAQ.kicker)}</p>
          <h2 className="mt-3 max-w-[13ch] text-title leading-[1.02] tracking-[-0.025em]">
            {a}
            <em className="mark-em">{b}</em>
          </h2>
        </div>
        <div className="glass edge-light rounded-panel px-6">
          {FAQ.items.map((item) => (
            <details key={item.q.en} className="group border-b border-border-subtle py-5 last:border-b-0">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-subtitle tracking-[-0.01em] [&::-webkit-details-marker]:hidden">
                <span>{t(item.q)}</span>
                <Icon name="plus" size={16} className="shrink-0 text-accent-text transition-transform duration-300 group-open:rotate-45" />
              </summary>
              <p className="max-w-[60ch] pt-4 text-body-sm leading-[1.75] text-text-secondary">{t(item.a)}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Compact CTA band — closes home and every inner page, links to /contact ── */
export function CtaBand() {
  const { t, lang } = usePrefs();
  const [a, b] = CONTACT.title[lang];
  return (
    <section className="container-content">
      <div className="glass-strong edge-light relative overflow-hidden rounded-panel p-8 shadow-panel md:p-12">
        <div aria-hidden className="blueprint opacity-50" />
        <div className="relative z-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="flex flex-col gap-3">
            <p className="font-mono text-caption uppercase tracking-[0.14em] text-accent-text">{t(CONTACT.kicker)}</p>
            <h2 className="max-w-[20ch] text-display tracking-[-0.03em]" style={{ lineHeight: lang === "ar" ? 1.25 : 1.05 }}>
              {a}
              <em className="mark-em">{b}</em>
            </h2>
          </div>
          <div className="flex flex-wrap gap-3">
            <a href={`mailto:${SITE.email}`} className={btn("primary")}>
              <Icon name="mail" size={15} />
              {t(CONTACT.primary)}
            </a>
            <Link href="/contact" className={btn("secondary")}>
              {lang === "ar" ? "صفحة التواصل" : "Contact page"}
              <Arrow size={14} className="transition-transform duration-300 group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Full contact sheet — /contact ── */
export function ContactSheet() {
  const { t, ar } = usePrefs();
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(SITE.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${SITE.email}`;
    }
  };

  const rows: { k: string; v: string; href?: string }[] = [
    { k: ar ? "الإيميل" : "EMAIL", v: SITE.email, href: `mailto:${SITE.email}` },
    { k: "LINKEDIN", v: SITE.linkedinLabel, href: SITE.linkedin },
    { k: "GITHUB", v: SITE.githubLabel, href: SITE.github },
    { k: ar ? "المقر" : "LOCATION", v: t(SITE.location) },
    { k: t(CONTACT.availability), v: t(CONTACT.where) },
  ];

  return (
    <section className="container-content">
      <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
        <div className="glass-strong edge-light flex flex-col justify-between gap-8 rounded-panel p-8 shadow-panel md:p-10">
          <div className="flex flex-col gap-4">
            <p className="font-mono text-caption uppercase tracking-[0.14em] text-accent-text">{t(CONTACT.kicker)}</p>
            <p className="max-w-[40ch] text-lead text-text-secondary">{t(CONTACT.body)}</p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <a href={`mailto:${SITE.email}`} className={btn("primary")}>
              <Icon name="mail" size={15} />
              {t(CONTACT.primary)}
              <Arrow size={14} className="transition-transform duration-300 group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
            </a>
            <a href={SITE.linkedin} target="_blank" rel="noopener noreferrer" className={btn("secondary")}>
              <Icon name="linkedin" size={14} />
              {t(CONTACT.secondary)}
            </a>
            <a href={SITE.github} target="_blank" rel="noopener noreferrer" className={btn("secondary")}>
              <Icon name="github" size={14} />
              {t(CONTACT.tertiary)}
            </a>
          </div>
        </div>

        <div className="glass edge-light overflow-hidden rounded-panel">
          <div className="flex items-center justify-between border-b border-border-subtle px-5 py-3">
            <span className="font-mono text-micro text-text-tertiary" dir="ltr">
              contact.sheet
            </span>
            <button
              type="button"
              onClick={copy}
              className="inline-flex items-center gap-1.5 rounded-pill border border-border-subtle px-2.5 py-1 font-mono text-caption uppercase tracking-[0.08em] text-text-secondary transition-colors duration-500 hover:border-accent hover:text-accent-text"
            >
              <Icon name={copied ? "check" : "copy"} size={12} />
              {copied ? t(CONTACT.copied) : t(CONTACT.copy)}
            </button>
          </div>
          <dl>
            {rows.map((r) => (
              <div key={r.k} className="grid grid-cols-[6.5rem_1fr] gap-3 border-b border-border-subtle px-5 py-4 last:border-b-0">
                <dt className="font-mono text-caption uppercase tracking-[0.1em] text-text-ghost">{r.k}</dt>
                <dd className="min-w-0 break-words text-body-sm text-text-secondary">
                  {r.href ? (
                    <a
                      href={r.href}
                      {...(r.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      className="text-text-primary underline decoration-border-default underline-offset-4 transition-colors hover:text-accent-text"
                      dir="ltr"
                    >
                      {r.v}
                    </a>
                  ) : (
                    r.v
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
