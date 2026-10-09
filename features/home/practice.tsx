"use client";

/**
 * PRACTICE — building blocks shared by home, /about and /skills:
 * about teaser, drifting skills marquee, the skill sheet (honest
 * levels), domain chips and the "what I can take on" capabilities.
 */
import Link from "next/link";
import { usePrefs } from "@/components/providers/prefs";
import { ABOUT, CAPABILITIES, DOMAIN, HOME, MARQUEE, MARQUEE_AR, SITE, SKILLS, SKILLS_HEADING } from "@/lib/content";
import { Icon } from "@/components/ui/icon";
import { Arrow } from "@/components/ui/arrow";
import { Reveal } from "@/components/ui/reveal";
import { SERIES, cx } from "@/lib/utils";

export function Facts() {
  const { t } = usePrefs();
  return (
    <dl className="glass edge-light flex h-fit flex-col rounded-panel px-5">
      {ABOUT.facts.map((f) => (
        <div key={f.k.en} className="border-b border-border-subtle py-3.5 last:border-b-0">
          <dt className="font-mono text-micro uppercase tracking-[0.1em] text-text-ghost">{t(f.k)}</dt>
          <dd className="text-body-sm text-text-secondary">{t(f.v)}</dd>
        </div>
      ))}
    </dl>
  );
}

/** Home teaser — links through to /about. */
export function AboutTeaser() {
  const { t, lang } = usePrefs();
  const [a, b, c] = ABOUT.title[lang];
  return (
    <section className="container-content grid gap-10 py-12 lg:grid-cols-[7fr_5fr]">
      <div className="flex flex-col gap-4">
        <h2 className="max-w-[22ch] text-title tracking-[-0.02em]">
          {a}
          <em className="mark-em">{b}</em>
          {c}
        </h2>
        {ABOUT.paragraphs.map((p) => (
          <p key={p.en} className="max-w-[58ch] text-body text-text-secondary">
            {t(p)}
          </p>
        ))}
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
          <Link
            href="/about"
            className="group inline-flex w-fit items-center gap-1.5 font-mono text-label uppercase tracking-[0.06em] text-text-tertiary transition-colors duration-500 hover:text-text-primary"
          >
            {t(HOME.about.link)}
            <Arrow className="transition-transform duration-500 ease-physics group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
          </Link>
          <a
            href={SITE.cv}
            className="group inline-flex w-fit items-center gap-1.5 font-mono text-label uppercase tracking-[0.06em] text-text-tertiary transition-colors duration-500 hover:text-text-primary"
          >
            {t(ABOUT.link)}
            <Icon name="arrow-down" size={14} className="transition-transform duration-300 group-hover:translate-y-0.5" />
          </a>
        </div>
      </div>
      <Facts />
    </section>
  );
}

export function SkillsMarquee() {
  const { ar } = usePrefs();
  const list = ar ? MARQUEE_AR : MARQUEE;
  const row = [...list, ...list];
  return (
    <div aria-hidden className="marquee-wrap overflow-hidden border-y border-border-subtle py-4">
      <div className="marquee flex w-max items-center gap-6">
        {row.map((s, i) => (
          <span key={i} className="flex items-center gap-6 whitespace-nowrap font-display text-title tracking-[-0.02em] text-text-secondary">
            {s}
            <Icon name="spark" size="0.5em" className="text-accent" />
          </span>
        ))}
      </div>
    </div>
  );
}

export function SkillSheet() {
  const { t } = usePrefs();
  return (
    <Reveal>
      <div className="glass edge-light overflow-hidden rounded-panel">
        {SKILLS.map((sk, i) => {
          const s = SERIES[sk.color];
          return (
            <div
              key={sk.tool}
              className="ledger-row grid grid-cols-[auto_1fr] items-center gap-x-4 gap-y-2 border-t border-border-subtle px-5 py-4 first:border-t-0 sm:grid-cols-[auto_1fr_auto_7rem]"
            >
              <span className={cx("grid size-11 place-items-center rounded-card font-mono text-label font-semibold", s.dim, s.text)} dir="ltr" aria-hidden>
                {sk.glyph}
              </span>
              <div className="min-w-0">
                <p className="text-body-lg font-medium text-text-primary" dir="ltr" style={{ textAlign: "start" }}>
                  {sk.tool}
                </p>
                <p className="font-mono text-micro uppercase tracking-[0.08em] text-text-ghost">{t(sk.area)}</p>
              </div>
              <div className="col-span-2 flex items-center gap-1 sm:col-span-1" role="img" aria-label={t(SKILLS_HEADING.levels[sk.level]!)} dir="ltr">
                {Array.from({ length: 5 }, (_, n) => (
                  <span
                    key={n}
                    className={cx("h-1.5 w-7 rounded-full", n < sk.level ? s.bg : "bg-border-subtle")}
                    style={{ opacity: n < sk.level ? 0.55 + (n / 5) * 0.45 : 1, transition: `opacity 600ms ${i * 60}ms` }}
                  />
                ))}
              </div>
              <span className={cx("hidden text-end font-mono text-micro uppercase tracking-[0.08em] sm:block", s.text)}>{t(SKILLS_HEADING.levels[sk.level]!)}</span>
            </div>
          );
        })}
      </div>
    </Reveal>
  );
}

export function DomainChips() {
  const { t } = usePrefs();
  return (
    <div className="flex flex-col gap-3">
      <p className="font-mono text-caption uppercase tracking-[0.12em] text-text-ghost">{t(DOMAIN.k)}</p>
      <ul className="flex flex-wrap gap-2" role="list">
        {DOMAIN.chips.map((chip) => (
          <li key={chip.en} className="glass rounded-pill px-3.5 py-1.5 text-body-sm text-text-secondary">
            {t(chip)}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Capabilities() {
  const { t } = usePrefs();
  return (
    <Reveal delay={80}>
      <div>
        <p className="mb-3 font-mono text-caption uppercase tracking-[0.12em] text-text-ghost">{t(CAPABILITIES.k)}</p>
        <ul className="grid gap-4 sm:grid-cols-2" role="list">
          {CAPABILITIES.items.map((it, i) => (
            <li key={it.t.en} className="glass edge-light flex flex-col gap-1.5 rounded-panel p-5 transition-transform duration-700 ease-physics hover:-translate-y-1">
              <span className="font-mono text-caption text-accent-text" dir="ltr">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="text-subtitle tracking-[-0.01em]">{t(it.t)}</span>
              <span className="text-body-sm text-text-tertiary">{t(it.d)}</span>
            </li>
          ))}
        </ul>
      </div>
    </Reveal>
  );
}
