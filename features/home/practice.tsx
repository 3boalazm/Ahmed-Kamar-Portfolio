"use client";

/**
 * PRACTICE / BACKGROUND — about teaser + facts sheet, drifting skills
 * marquee, then the "skill sheet" (honest levels) and capabilities.
 */
import { usePrefs } from "@/components/providers/prefs";
import { ABOUT, CAPABILITIES, DOMAIN, MARQUEE, MARQUEE_AR, SITE, SKILLS, SKILLS_HEADING } from "@/lib/content";
import { Icon } from "@/components/ui/icon";
import { Reveal } from "@/components/ui/reveal";
import { SERIES, cx } from "@/lib/utils";

export function AboutTeaser() {
  const { t, lang } = usePrefs();
  const [a, b, c] = ABOUT.title[lang];
  return (
    <section id="about" className="container-content grid gap-10 py-12 lg:grid-cols-[7fr_5fr]">
      <div className="flex flex-col gap-4">
        <p className="font-mono text-micro uppercase tracking-[0.1em] text-text-ghost">01 / {t(ABOUT.kicker)}</p>
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
        <a
          href={SITE.cv}
          className="group inline-flex w-fit items-center gap-1.5 font-mono text-label uppercase tracking-[0.06em] text-text-tertiary transition-colors duration-300 hover:text-text-primary"
        >
          {t(ABOUT.link)}
          <Icon name="arrow-down" size={14} className="transition-transform duration-300 group-hover:translate-y-0.5" />
        </a>
      </div>

      <dl className="flex h-fit flex-col rounded-panel border border-border-subtle bg-surface-1/60 px-4">
        {ABOUT.facts.map((f) => (
          <div key={f.k.en} className="border-b border-border-subtle py-3 last:border-b-0">
            <dt className="font-mono text-micro uppercase tracking-[0.1em] text-text-ghost">{t(f.k)}</dt>
            <dd className="text-body-sm text-text-secondary">{t(f.v)}</dd>
          </div>
        ))}
      </dl>
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
  const { t, lang } = usePrefs();
  const [a, b] = SKILLS_HEADING.title[lang];
  return (
    <section id="skills" className="container-content grid gap-10 py-12 lg:grid-cols-[0.8fr_1.2fr]">
      <div className="flex flex-col gap-3">
        <p className="font-mono text-micro uppercase tracking-[0.1em] text-text-ghost">02 / {t(SKILLS_HEADING.kicker)}</p>
        <h2 className="max-w-[14ch] text-title tracking-[-0.02em]">
          {a}
          <em className="mark-em">{b}</em>
        </h2>

        <div className="mt-4 flex flex-col gap-2">
          <p className="font-mono text-caption uppercase tracking-[0.12em] text-text-ghost">{t(DOMAIN.k)}</p>
          <ul className="flex flex-wrap gap-2" role="list">
            {DOMAIN.chips.map((chip) => (
              <li key={chip.en} className="rounded-card border border-border-default bg-surface-1 px-2.5 py-1 text-body-sm text-text-secondary">
                {t(chip)}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="flex flex-col gap-8">
        <Reveal>
          <div className="overflow-hidden rounded-panel border border-border-subtle">
            {SKILLS.map((sk, i) => {
              const s = SERIES[sk.color];
              return (
                <div
                  key={sk.tool}
                  className="ledger-row grid grid-cols-[auto_1fr] items-center gap-x-4 gap-y-2 border-t border-border-subtle px-4 py-3.5 first:border-t-0 sm:grid-cols-[auto_1fr_auto_6.5rem]"
                >
                  <span
                    className={cx("grid size-10 place-items-center rounded-card font-mono text-label font-semibold", s.dim, s.text)}
                    dir="ltr"
                    aria-hidden
                  >
                    {sk.glyph}
                  </span>
                  <div className="min-w-0">
                    <p className="text-body font-medium text-text-primary" dir="ltr" style={{ textAlign: "start" }}>
                      {sk.tool}
                    </p>
                    <p className="font-mono text-micro uppercase tracking-[0.08em] text-text-ghost">{t(sk.area)}</p>
                  </div>
                  <div className="col-span-2 flex items-center gap-1 sm:col-span-1" role="img" aria-label={`${t(SKILLS_HEADING.levels[sk.level]!)}`} dir="ltr">
                    {Array.from({ length: 5 }, (_, n) => (
                      <span
                        key={n}
                        className={cx("h-1.5 w-6 rounded-full", n < sk.level ? s.bg : "bg-border-subtle")}
                        style={{ opacity: n < sk.level ? 0.55 + (n / 5) * 0.45 : 1, transition: `opacity 600ms ${i * 60}ms` }}
                      />
                    ))}
                  </div>
                  <span className={cx("hidden text-end font-mono text-micro uppercase tracking-[0.08em] sm:block", s.text)}>
                    {t(SKILLS_HEADING.levels[sk.level]!)}
                  </span>
                </div>
              );
            })}
          </div>
        </Reveal>

        <Reveal delay={80}>
          <div>
            <p className="mb-3 font-mono text-caption uppercase tracking-[0.12em] text-text-ghost">{t(CAPABILITIES.k)}</p>
            <ul className="grid gap-px overflow-hidden rounded-panel border border-border-subtle bg-border-subtle sm:grid-cols-2" role="list">
              {CAPABILITIES.items.map((it, i) => (
                <li key={it.t.en} className="flex flex-col gap-1 bg-surface-0 p-4 transition-colors duration-300 hover:bg-surface-1">
                  <span className="font-mono text-caption text-accent-text" dir="ltr">{String(i + 1).padStart(2, "0")}</span>
                  <span className="text-subtitle tracking-[-0.01em]">{t(it.t)}</span>
                  <span className="text-body-sm text-text-tertiary">{t(it.d)}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
