"use client";

/**
 * HERO — same viewport architecture as the OS (status row → statement
 * headline → lead + CTAs → signature asset → metric band). The signature
 * asset is now Ahmed's portrait in a glass frame with floating readout
 * chips; the live insight board moved to its own band further down.
 */
import Image from "next/image";
import Link from "next/link";
import { usePrefs } from "@/components/providers/prefs";
import { HERO, METRICS, METRICS_HEADING, METRICS_NOTE, SITE } from "@/lib/content";
import { Icon } from "@/components/ui/icon";
import { Arrow } from "@/components/ui/arrow";
import { btn } from "@/components/ui/button";

function StatusNode() {
  const { t } = usePrefs();
  return (
    <Link
      href="/contact"
      className="glass group inline-flex items-center gap-2.5 rounded-pill py-1.5 pe-3.5 ps-3 transition-colors duration-500 ease-physics hover:border-accent"
    >
      <span className="relative flex size-2 items-center justify-center" aria-hidden>
        <span className="status-ring absolute inset-0 rounded-full bg-success" />
        <span className="relative size-1.5 rounded-full bg-success" />
      </span>
      <span className="font-mono text-micro uppercase tracking-[0.1em] text-text-secondary transition-colors duration-500 group-hover:text-text-primary">
        [{t(HERO.status)}]
      </span>
    </Link>
  );
}

function Portrait() {
  const { t } = usePrefs();
  return (
    <div className="relative mx-auto w-full max-w-[26rem] lg:ms-auto lg:me-0">
      {/* corner ticks — the blueprint motif, framing the subject */}
      <span aria-hidden className="absolute -start-3 -top-3 size-6 border-s-2 border-t-2 border-accent/70" />
      <span aria-hidden className="absolute -bottom-3 -end-3 size-6 border-b-2 border-e-2 border-accent/70" />

      <div className="edge-light glass-strong relative aspect-[4/5] overflow-hidden rounded-panel shadow-panel">
        <Image
          src={SITE.portrait}
          alt={t(HERO.portraitAlt)}
          fill
          priority
          sizes="(min-width: 1024px) 26rem, 90vw"
          className="object-cover object-[50%_12%]"
        />
        <div aria-hidden className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-navy/70 to-transparent" />
      </div>

      {HERO.chips.map((c, i) => (
        <div
          key={c.k.en}
          className="glass float-y absolute rounded-card px-3 py-2 shadow-card"
          style={
            {
              "--fd": `${i * 1.4}s`,
              ...(i === 0 ? { insetInlineStart: "-1.25rem", bottom: "22%" } : { insetInlineEnd: "-1rem", top: "12%" }),
            } as unknown as React.CSSProperties
          }
        >
          <p className="font-mono text-caption uppercase tracking-[0.12em] text-accent-text">{t(c.k)}</p>
          <p className="text-body-sm font-medium text-text-primary">{t(c.v)}</p>
        </div>
      ))}
    </div>
  );
}

function MetricRow() {
  const { t } = usePrefs();
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between gap-4">
        <p className="font-mono text-micro uppercase tracking-[0.1em] text-text-ghost">{t(METRICS_HEADING)}</p>
        <p className="hidden font-mono text-micro text-text-ghost sm:inline">{t(METRICS_NOTE)}</p>
      </div>
      <div className="grid gap-2 sm:grid-cols-3 sm:gap-4">
        {METRICS.map((m, i) => (
          <div key={m.label.en} className="group fade-up relative cursor-default py-4 pe-3" style={{ "--d": `${900 + i * 120}ms` } as React.CSSProperties}>
            <span className="absolute inset-x-0 top-0 h-px bg-border-subtle" />
            <span className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-accent transition-transform duration-500 ease-physics group-hover:scale-x-100 rtl:origin-right" />
            <p
              className="font-display text-display tracking-[-0.03em] text-text-primary transition-transform duration-500 ease-physics group-hover:-translate-y-1"
              style={{ fontSize: m.value.length > 4 ? "clamp(1.9rem, 3.4vw, 3rem)" : undefined, lineHeight: 1.08 }}
            >
              <span dir="ltr" className="inline-block">
                {m.value}
                {m.suffix && <span className="text-[0.55em] text-text-secondary transition-colors duration-300 group-hover:text-accent-text">{m.suffix}</span>}
              </span>
            </p>
            <p className="mt-1 text-body font-medium text-text-primary">{t(m.label)}</p>
            <p className="mt-0.5 font-mono text-micro uppercase tracking-[0.08em] text-accent-text">{t(m.context)}</p>
            <p className="mt-1 text-body-sm text-text-tertiary">{t(m.detail)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function Hero() {
  const { t, lang } = usePrefs();
  const lines = HERO.lines[lang];

  return (
    <section id="top" className="relative flex min-h-svh flex-col overflow-hidden pt-16" style={{ isolation: "isolate" }}>
      <div aria-hidden className="blueprint" />

      <div className="container-wide relative z-10 grid flex-1 items-center gap-12 pb-10 pt-10 lg:grid-cols-[1.1fr_0.9fr] lg:pt-14">
        <div className="flex flex-col gap-5">
          <div className="fade-up flex flex-wrap items-center gap-3" style={{ "--d": "500ms" } as React.CSSProperties}>
            <StatusNode />
            <span className="hidden font-mono text-micro text-text-ghost xl:inline" dir="ltr">
              {HERO.query}
            </span>
          </div>

          <p className="fade-up font-mono text-label uppercase tracking-[0.12em] text-text-tertiary" style={{ "--d": "650ms" } as React.CSSProperties}>
            {SITE.name} <span className="mx-1.5 text-text-ghost">/</span> <span className="text-accent-text">{t(SITE.role)}</span>
          </p>

          <h1 className="hero-h1 text-hero tracking-[-0.035em] text-text-primary">
            {lines.map((line, i) => (
              <span key={line} className="hero-line block overflow-hidden pb-[0.08em]" style={{ "--i": i } as React.CSSProperties}>
                <span>{i === HERO.markLine ? <em className="mark-em">{line}</em> : line}</span>
              </span>
            ))}
          </h1>

          <p className="fade-up max-w-[48ch] text-lead text-text-secondary" style={{ "--d": "800ms" } as React.CSSProperties}>
            {t(HERO.lead)}
          </p>

          <div className="fade-up flex flex-wrap items-center gap-3 pt-1" style={{ "--d": "900ms" } as React.CSSProperties}>
            <a href={SITE.cv} className={btn("primary")}>
              {t(HERO.ctaCv)}
              <Icon name="arrow-down" size={14} className="transition-transform duration-300 group-hover:translate-y-0.5" />
            </a>
            <Link href="/contact" className={btn("secondary")}>
              {t(HERO.ctaContact)}
              <Arrow size={14} className="transition-transform duration-300 group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
            </Link>
            <a href={SITE.github} target="_blank" rel="noopener noreferrer" className={btn("secondary")}>
              <Icon name="github" size={14} />
              {t(HERO.ctaGithub)}
            </a>
          </div>

          <div className="fade-up flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-micro text-text-ghost" style={{ "--d": "1000ms" } as React.CSSProperties}>
            <Link href="/contact" className="underline decoration-border-default underline-offset-4 transition-colors hover:text-text-primary">
              {t(HERO.hiring)} <span aria-hidden className="inline-block rtl:-scale-x-100">→</span>
            </Link>
            <span aria-hidden>·</span>
            <Link href="/work" className="underline decoration-border-default underline-offset-4 transition-colors hover:text-text-primary">
              {lang === "ar" ? "أعمال مختارة" : "Selected work"} <span aria-hidden className="inline-block rtl:-scale-x-100">→</span>
            </Link>
          </div>
        </div>

        <div className="fade-up w-full" style={{ "--d": "500ms" } as React.CSSProperties}>
          <Portrait />
        </div>
      </div>

      <div className="container-wide relative z-10 w-full border-t border-border-subtle py-4">
        <MetricRow />
      </div>
    </section>
  );
}
