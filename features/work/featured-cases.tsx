"use client";

/**
 * CASES — the proof layer, in two densities (same idea as the OS's
 * FeaturedCases vs. the /work index):
 *   · FeaturedCases  — home: three glass cards + link to /work
 *   · CaseFiles      — /work: one full-width, detailed file per case
 * plus the reserved slot for the first dashboard case study and the
 * experience ledger.
 */
import Link from "next/link";
import { usePrefs } from "@/components/providers/prefs";
import { CASES, CASE_SLOT, HOME, LEDGER, LEDGER_HEADERS, WORK_HEADING, type Case } from "@/lib/content";
import { Icon } from "@/components/ui/icon";
import { Arrow } from "@/components/ui/arrow";
import { Reveal } from "@/components/ui/reveal";
import { SERIES, cx } from "@/lib/utils";

function RepoLink({ c }: { c: Case }) {
  const { t } = usePrefs();
  if (!c.link) return null;
  return (
    <a
      href={c.link.href}
      target="_blank"
      rel="noopener noreferrer"
      className="group/link inline-flex w-fit items-center gap-1.5 font-mono text-label uppercase tracking-[0.06em] text-text-primary transition-colors duration-500 hover:text-accent-text"
    >
      <Icon name="github" size={14} />
      {t(c.link.label)}
      <Icon name="arrow-up-right" size={12} className="transition-transform duration-300 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5 rtl:-scale-x-100" />
    </a>
  );
}

function Tags({ c }: { c: Case }) {
  const s = SERIES[c.accent];
  return (
    <ul className="flex flex-wrap gap-1.5" role="list">
      {c.tags.map((tag) => (
        <li key={tag} className={cx("rounded-pill border px-2.5 py-0.5 font-mono text-caption", s.border, s.dim, s.text)}>
          {tag}
        </li>
      ))}
    </ul>
  );
}

/* ───────────── HOME — compact glass card ───────────── */
function CaseCard({ c, delay }: { c: Case; delay: number }) {
  const { t, lang } = usePrefs();
  const s = SERIES[c.accent];
  return (
    <Reveal delay={delay} className="h-full">
      <article
        id={`case-${c.id}`}
        className="glass edge-light group relative flex h-full scroll-mt-24 flex-col overflow-hidden rounded-panel transition-[border-color,transform] duration-700 ease-physics hover:-translate-y-1 hover:border-border-strong"
      >
        <span aria-hidden className={cx("h-1 w-full", s.bg)} />
        <div className="flex flex-1 flex-col gap-4 p-6">
          <header className="flex items-start justify-between gap-3">
            <span className={cx("font-mono text-label", s.text)} dir="ltr">
              CASE {c.n}
            </span>
            <span className="text-end font-mono text-micro uppercase tracking-[0.08em] text-text-ghost">{t(c.period)}</span>
          </header>
          <div>
            <h3 className="font-display text-title tracking-[-0.02em] text-text-primary">{t(c.name)}</h3>
            <p className={cx("mt-1 font-mono text-micro uppercase tracking-[0.08em]", s.text)}>{t(c.category)}</p>
          </div>
          <p className="text-body-sm text-text-secondary">{t(c.challenge)}</p>
          <ul className="flex flex-col gap-2" role="list">
            {c.did[lang].slice(0, 3).map((item) => (
              <li key={item} className="flex gap-2.5 text-body-sm text-text-secondary">
                <Icon name="check" size={14} className={cx("mt-1 shrink-0", s.text)} />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <div className="mt-auto flex flex-col gap-3 pt-2">
            <Tags c={c} />
            <Link
              href="/work"
              className="group/more inline-flex w-fit items-center gap-1.5 font-mono text-label uppercase tracking-[0.06em] text-text-tertiary transition-colors duration-500 hover:text-text-primary"
            >
              {lang === "ar" ? "الملف كاملًا" : "Open the case file"}
              <Arrow className="transition-transform duration-500 ease-physics group-hover/more:translate-x-1 rtl:group-hover/more:-translate-x-1" />
            </Link>
          </div>
        </div>
      </article>
    </Reveal>
  );
}

export function FeaturedCases() {
  const { t, lang } = usePrefs();
  const [a, b] = WORK_HEADING.title[lang];
  return (
    <div className="container-wide flex flex-col gap-8 py-6">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div className="flex max-w-[52ch] flex-col gap-2">
          <h2 className="text-title tracking-[-0.02em] text-text-primary">
            {a}
            <em className="mark-em">{b}</em>
          </h2>
          <p className="text-body-sm text-text-secondary">{t(WORK_HEADING.sub)}</p>
        </div>
        <Link
          href="/work"
          className="group inline-flex w-fit items-center gap-1.5 font-mono text-label uppercase tracking-[0.06em] text-text-tertiary transition-colors duration-500 hover:text-text-primary"
        >
          {t(HOME.work.all)}
          <Arrow className="transition-transform duration-500 ease-physics group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
        </Link>
      </div>
      <div className="grid gap-5 lg:grid-cols-3">
        {CASES.map((c, i) => (
          <CaseCard key={c.id} c={c} delay={i * 90} />
        ))}
      </div>
    </div>
  );
}

/* ───────────── WORK PAGE — one detailed file per case ───────────── */
function CaseFile({ c }: { c: Case }) {
  const { t, lang } = usePrefs();
  const s = SERIES[c.accent];
  const ctxLabel = lang === "ar" ? "السياق" : "CONTEXT";
  const didLabel = lang === "ar" ? "ما نفّذته" : "WHAT I DID";
  return (
    <Reveal>
      <article id={`case-${c.id}`} className="glass edge-light relative scroll-mt-24 overflow-hidden rounded-panel">
        <span aria-hidden className={cx("absolute inset-y-0 start-0 w-1", s.bg)} />
        <div className="grid gap-10 p-6 md:p-10 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="flex flex-col gap-5">
            <p className={cx("font-mono text-label", s.text)} dir="ltr">
              CASE {c.n}
            </p>
            <div>
              <h2 className="text-display tracking-[-0.03em] text-text-primary" style={{ fontSize: "clamp(2rem,4vw,3.4rem)", lineHeight: lang === "ar" ? 1.25 : 1.02 }}>
                {t(c.name)}
              </h2>
              <p className={cx("mt-3 font-mono text-micro uppercase tracking-[0.1em]", s.text)}>{t(c.category)}</p>
            </div>
            <dl className="grid gap-px overflow-hidden rounded-card border border-border-subtle bg-border-subtle">
              <div className="bg-surface-0/60 px-4 py-3">
                <dt className="font-mono text-caption uppercase tracking-[0.12em] text-text-ghost">{lang === "ar" ? "الفترة" : "PERIOD"}</dt>
                <dd className="text-body-sm text-text-primary">{t(c.period)}</dd>
              </div>
              <div className="bg-surface-0/60 px-4 py-3">
                <dt className="font-mono text-caption uppercase tracking-[0.12em] text-text-ghost">{lang === "ar" ? "المجال" : "DOMAIN"}</dt>
                <dd className="pt-1.5">
                  <Tags c={c} />
                </dd>
              </div>
            </dl>
            {c.note && <p className="font-mono text-caption text-text-ghost">{t(c.note)}</p>}
            <RepoLink c={c} />
          </div>

          <div className="flex flex-col gap-8">
            <div>
              <p className="mb-2 font-mono text-caption uppercase tracking-[0.12em] text-text-ghost">{ctxLabel}</p>
              <p className="max-w-[56ch] text-body-lg text-text-secondary">{t(c.challenge)}</p>
            </div>
            <div>
              <p className="mb-3 font-mono text-caption uppercase tracking-[0.12em] text-text-ghost">{didLabel}</p>
              <ol className="flex flex-col border-t border-border-subtle" role="list">
                {c.did[lang].map((item, i) => (
                  <li key={item} className="grid grid-cols-[2.5rem_1fr] items-baseline gap-3 border-b border-border-subtle py-4">
                    <span className={cx("font-mono text-label", s.text)} dir="ltr">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-body-lg tracking-[-0.005em] text-text-primary">{item}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </article>
    </Reveal>
  );
}

export function CaseSlot() {
  const { t } = usePrefs();
  return (
    <Reveal delay={80}>
      <div className="glass relative overflow-hidden rounded-panel border-dashed p-6 md:p-10" style={{ borderStyle: "dashed", borderColor: "var(--color-border-default)" }}>
        <div className="grid gap-8 md:grid-cols-[0.9fr_1.1fr] md:items-center">
          <div className="flex flex-col gap-3">
            <p className="flex flex-wrap items-center gap-2 font-mono text-label text-accent-text" dir="ltr">
              CASE {CASE_SLOT.n}
              <span className="rounded-pill border border-accent-40 bg-accent-08 px-2 py-0.5 text-caption uppercase tracking-[0.1em]">{t(CASE_SLOT.tag)}</span>
            </p>
            <h3 className="font-display text-title tracking-[-0.02em] text-text-primary">{t(CASE_SLOT.title)}</h3>
            <p className="max-w-[46ch] text-body-sm text-text-secondary">{t(CASE_SLOT.body)}</p>
          </div>
          <ol className="grid grid-cols-2 gap-px overflow-hidden rounded-card border border-border-subtle bg-border-subtle sm:grid-cols-4" role="list">
            {CASE_SLOT.steps.map((step, i) => (
              <li key={step.en} className="flex flex-col gap-1 bg-surface-0/70 px-3 py-4">
                <span className="font-mono text-caption text-text-ghost" dir="ltr">{String(i + 1).padStart(2, "0")}</span>
                <span className="font-display text-subtitle text-text-secondary">{t(step)}</span>
                <span aria-hidden className="mt-1 h-1 w-full rounded-full bg-surface-3" />
              </li>
            ))}
          </ol>
        </div>
      </div>
    </Reveal>
  );
}

export function CaseFiles() {
  return (
    <div className="container-wide flex flex-col gap-6 pb-6">
      {CASES.map((c) => (
        <CaseFile key={c.id} c={c} />
      ))}
      <CaseSlot />
    </div>
  );
}

/* ───────────── LEDGER ───────────── */
export function ExperienceLedger() {
  const { t, ar } = usePrefs();
  const H = LEDGER_HEADERS;
  const grid = "grid-cols-[2rem_1fr] gap-x-3 md:grid-cols-[2.5rem_1.4fr_1fr_1.5fr_1.1fr] md:gap-x-4";
  return (
    <section id="ledger" className="container-wide scroll-mt-20 pb-6 pt-10" aria-label="Experience ledger">
      <p className="mb-4 font-mono text-micro uppercase tracking-[0.1em] text-text-ghost">{ar ? "سجل الخبرة" : "EXPERIENCE LEDGER"}</p>
      <Reveal>
        <div className="glass overflow-hidden rounded-panel">
          <div className={cx("hidden bg-surface-1/60 px-5 py-2.5 font-mono text-caption uppercase tracking-[0.12em] text-text-ghost md:grid", grid)}>
            <span dir="ltr">{H.n}</span>
            <span>{t(H.role)}</span>
            <span>{t(H.org)}</span>
            <span>{t(H.focus)}</span>
            <span>{t(H.period)}</span>
          </div>
          {LEDGER.map((row) => {
            const inner = (
              <>
                <span className="pt-0.5 font-mono text-label text-text-ghost transition-colors duration-300 group-hover:text-accent-text" dir="ltr">
                  {row.n}
                </span>
                <span className="font-display text-subtitle tracking-[-0.01em] text-text-primary transition-transform duration-500 ease-physics group-hover:translate-x-1.5 rtl:group-hover:-translate-x-1.5">
                  {t(row.role)}
                </span>
                <span className="col-start-2 text-body-sm font-medium text-text-primary md:col-start-auto" dir="ltr">
                  {row.org}
                </span>
                <span className="col-start-2 text-body-sm text-text-secondary md:col-start-auto">{t(row.focus)}</span>
                <span className="col-start-2 font-mono text-micro uppercase tracking-[0.06em] text-text-tertiary md:col-start-auto">{t(row.period)}</span>
              </>
            );
            const base = cx("ledger-row group grid items-baseline border-t border-border-subtle px-5 py-5 first:border-t-0", grid);
            return row.caseId ? (
              <a key={row.n} href={`#case-${row.caseId}`} className={base}>
                {inner}
              </a>
            ) : (
              <div key={row.n} className={base}>
                {inner}
              </div>
            );
          })}
        </div>
      </Reveal>
    </section>
  );
}
