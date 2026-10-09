"use client";

/** /about — portrait + story + facts, then education and languages. */
import Image from "next/image";
import { usePrefs } from "@/components/providers/prefs";
import { ABOUT, HERO, SITE } from "@/lib/content";
import { Icon } from "@/components/ui/icon";
import { Reveal } from "@/components/ui/reveal";
import { btn } from "@/components/ui/button";
import { Facts } from "./practice";

export function AboutStory() {
  const { t } = usePrefs();
  return (
    <section className="container-wide grid gap-10 pb-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
      <Reveal className="lg:sticky lg:top-24">
        <div className="relative mx-auto w-full max-w-[26rem] lg:mx-0">
          <span aria-hidden className="absolute -start-3 -top-3 size-6 border-s-2 border-t-2 border-accent/70" />
          <span aria-hidden className="absolute -bottom-3 -end-3 size-6 border-b-2 border-e-2 border-accent/70" />
          <div className="edge-light glass-strong relative aspect-[4/5] overflow-hidden rounded-panel shadow-panel">
            <Image src={SITE.portrait} alt={t(HERO.portraitAlt)} fill sizes="(min-width: 1024px) 26rem, 90vw" className="object-cover object-[50%_12%]" />
            <div aria-hidden className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-navy/70 to-transparent" />
            <p className="absolute inset-x-0 bottom-0 p-4 font-mono text-micro uppercase tracking-[0.1em] text-white/85" dir="ltr">
              {SITE.name}
            </p>
          </div>
        </div>
      </Reveal>

      <div className="flex flex-col gap-8">
        <Reveal>
          <div className="flex flex-col gap-4">
            {ABOUT.paragraphs.map((p) => (
              <p key={p.en} className="max-w-[60ch] text-body-lg text-text-secondary first:text-lead first:text-text-primary">
                {t(p)}
              </p>
            ))}
            <div className="flex flex-wrap gap-3 pt-2">
              <a href={SITE.cv} className={btn("primary")}>
                {t(ABOUT.link)}
                <Icon name="arrow-down" size={14} className="transition-transform duration-300 group-hover:translate-y-0.5" />
              </a>
              <a href={SITE.linkedin} target="_blank" rel="noopener noreferrer" className={btn("secondary")}>
                <Icon name="linkedin" size={14} />
                LinkedIn
              </a>
            </div>
          </div>
        </Reveal>
        <Reveal delay={60}>
          <Facts />
        </Reveal>
      </div>
    </section>
  );
}

export function EducationLanguages() {
  const { t } = usePrefs();
  return (
    <section className="container-wide grid gap-10 py-10 lg:grid-cols-[1.2fr_0.8fr]">
      <Reveal>
        <div>
          <p className="mb-4 font-mono text-caption uppercase tracking-[0.12em] text-text-ghost">{t(ABOUT.educationHeading)}</p>
          <ol className="flex flex-col gap-4" role="list">
            {ABOUT.education.map((e) => (
              <li key={e.title.en} className="glass edge-light grid gap-3 rounded-panel p-5 sm:grid-cols-[4.5rem_1fr]">
                <span className="font-mono text-label text-accent-text" dir="ltr">
                  {e.year}
                </span>
                <div>
                  <h3 className="text-subtitle tracking-[-0.01em]">{t(e.title)}</h3>
                  <p className="text-body-sm font-medium text-text-primary">{t(e.org)}</p>
                  <p className="mt-1 text-body-sm text-text-tertiary">{t(e.note)}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </Reveal>

      <Reveal delay={80}>
        <div>
          <p className="mb-4 font-mono text-caption uppercase tracking-[0.12em] text-text-ghost">{t(ABOUT.languagesHeading)}</p>
          <ul className="glass edge-light flex flex-col rounded-panel px-5" role="list">
            {ABOUT.languages.map((lg) => (
              <li key={lg.name.en} className="flex flex-col gap-2 border-b border-border-subtle py-4 last:border-b-0">
                <div className="flex items-baseline justify-between gap-3">
                  <span className="text-body-lg font-medium">{t(lg.name)}</span>
                  <span className="font-mono text-micro uppercase tracking-[0.08em] text-text-tertiary">{t(lg.level)}</span>
                </div>
                <div className="flex gap-1" dir="ltr" role="img" aria-label={t(lg.level)}>
                  {Array.from({ length: 5 }, (_, n) => (
                    <span key={n} className={n < lg.value ? "h-1.5 flex-1 rounded-full bg-accent" : "h-1.5 flex-1 rounded-full bg-border-subtle"} />
                  ))}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </section>
  );
}
