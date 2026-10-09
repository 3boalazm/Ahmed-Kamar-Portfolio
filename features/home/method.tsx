"use client";

/**
 * METHOD — the OS's sticky "how we work" story, as a data pipeline:
 * Ask → Clean → Analyze → Share. `Method` is the full scroll story for
 * /method; `MethodStrip` is the compact four-step teaser for home.
 * The active step is driven by an IntersectionObserver on the step
 * blocks, so there is no scroll listener and no layout thrash.
 */
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePrefs } from "@/components/providers/prefs";
import { HOME, METHOD } from "@/lib/content";
import { Arrow } from "@/components/ui/arrow";
import { SERIES, cx, type Series } from "@/lib/utils";

export function Method() {
  const { t, lang } = usePrefs();
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLLIElement | null)[]>([]);
  const [a, b] = METHOD.title[lang];

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            const i = Number((e.target as HTMLElement).dataset.step);
            if (!Number.isNaN(i)) setActive(i);
          }
        }
      },
      { rootMargin: "-42% 0px -42% 0px", threshold: 0 },
    );
    refs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section className="relative">
      <div className="container-content grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="lg:sticky lg:top-24 lg:flex lg:h-[calc(100vh-7rem)] lg:flex-col lg:justify-center lg:self-start">
          <p className="font-mono text-caption uppercase tracking-[0.14em] text-accent-text">{t(METHOD.kicker)}</p>
          <h2 className="mt-3 max-w-[14ch] text-[clamp(2.2rem,4.8vw,4.2rem)] leading-[0.98] tracking-[-0.035em]">
            {a}
            <em className="mark-em">{b}</em>
          </h2>
          <p className="mt-5 max-w-[40ch] text-body-sm leading-[1.75] text-text-secondary">{t(METHOD.sub)}</p>

          <div className="mt-8 flex gap-2" aria-hidden>
            {METHOD.steps.map((step, i) => (
              <span key={step.n} className={cx("h-1.5 flex-1 rounded-full transition-colors duration-500", i <= active ? SERIES[step.color as Series].bg : "bg-border-subtle")} />
            ))}
          </div>

          <Link
            href="/contact"
            className="group mt-8 inline-flex w-fit items-center gap-1.5 font-mono text-label uppercase tracking-[0.06em] text-text-tertiary transition-colors hover:text-text-primary"
          >
            {t(METHOD.link)}
            <Arrow className="transition-transform duration-500 ease-physics group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
          </Link>
        </div>

        <ol className="relative" role="list">
          {METHOD.steps.map((step, i) => {
            const on = i === active;
            const s = SERIES[step.color as Series];
            return (
              <li
                key={step.n}
                data-step={i}
                ref={(el) => {
                  refs.current[i] = el;
                }}
                className="min-h-[44vh] py-8 lg:min-h-[56vh] lg:py-14"
              >
                <div
                  className={cx(
                    "glass edge-light rounded-panel p-6 transition-[opacity,transform] duration-[600ms] ease-physics md:p-8",
                    on ? "translate-y-0 opacity-100" : "translate-y-3 opacity-35",
                  )}
                >
                  <div className="flex items-start justify-between gap-4">
                    <span className={cx("font-mono text-label", s.text)} dir="ltr">
                      {step.n}
                    </span>
                    <span className="text-end font-mono text-micro uppercase tracking-[0.08em] text-text-ghost">{t(step.proof)}</span>
                  </div>
                  <h3 className="mt-8 max-w-[14ch] text-[clamp(2rem,4vw,3.8rem)] leading-[0.98] tracking-[-0.03em]">{t(step.name)}</h3>
                  <p className="mt-5 max-w-[48ch] text-body-lg text-text-secondary">{t(step.short)}</p>
                  <div className="mt-8 h-px w-full bg-border-subtle" />
                  <p className="mt-3 font-mono text-micro uppercase tracking-[0.08em] text-text-ghost">
                    {t(METHOD.gate)} {step.n}
                  </p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

/** Home teaser: the four stages as a glass strip, linking to /method. */
export function MethodStrip() {
  const { t, lang } = usePrefs();
  const [a, b] = METHOD.title[lang];
  return (
    <div className="container-content flex flex-col gap-8">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="font-mono text-caption uppercase tracking-[0.14em] text-accent-text">{t(METHOD.kicker)}</p>
          <h2 className="mt-2 max-w-[18ch] text-title tracking-[-0.02em]">
            {a}
            <em className="mark-em">{b}</em>
          </h2>
        </div>
        <Link
          href="/method"
          className="group inline-flex w-fit items-center gap-1.5 font-mono text-label uppercase tracking-[0.06em] text-text-tertiary transition-colors duration-500 hover:text-text-primary"
        >
          {t(HOME.method.link)}
          <Arrow className="transition-transform duration-500 ease-physics group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
        </Link>
      </div>
      <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4" role="list">
        {METHOD.steps.map((step) => {
          const s = SERIES[step.color as Series];
          return (
            <li key={step.n} className="glass edge-light group relative overflow-hidden rounded-panel p-5 transition-transform duration-700 ease-physics hover:-translate-y-1">
              <span aria-hidden className={cx("absolute inset-x-0 top-0 h-0.5", s.bg)} />
              <p className={cx("font-mono text-label", s.text)} dir="ltr">
                {step.n}
              </p>
              <h3 className="mt-6 font-display text-title tracking-[-0.02em]">{t(step.name)}</h3>
              <p className="mt-2 text-body-sm text-text-secondary">{t(step.short)}</p>
              <p className="mt-4 font-mono text-micro uppercase tracking-[0.08em] text-text-ghost">{t(step.proof)}</p>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
