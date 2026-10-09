"use client";

import { usePrefs } from "@/components/providers/prefs";
import { WHY } from "@/lib/content";
import { Arrow } from "@/components/ui/arrow";
import { SERIES, cx, type Series } from "@/lib/utils";

const COLORS: Series[] = ["sky", "mint", "violet"];

/** Trust layer between proof and process — three principles, grounded in the actual work. */
export function WhyValue() {
  const { t, lang } = usePrefs();
  const [a, b] = WHY.title[lang];
  return (
    <section id="why-band" className="container-content rounded-panel border border-border-subtle bg-surface-1/60 py-12 md:py-16">
      <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
        <div className="flex flex-col gap-3">
          <p className="font-mono text-micro uppercase tracking-[0.1em] text-accent-text">{t(WHY.kicker)}</p>
          <h2 className="max-w-[18ch] text-title tracking-[-0.02em]">
            {a}
            <em className="mark-em">{b}</em>
          </h2>
          <p className="max-w-[46ch] text-body-sm text-text-secondary">{t(WHY.sub)}</p>
          <a
            href="#method"
            className="group inline-flex w-fit items-center gap-1.5 font-mono text-label uppercase tracking-[0.06em] text-text-tertiary transition-colors duration-300 hover:text-text-primary"
          >
            {t(WHY.link)}
            <Arrow className="transition-transform duration-300 group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
          </a>
        </div>

        <div className="flex flex-col border-t border-border-subtle">
          {WHY.items.map((item, i) => {
            const s = SERIES[COLORS[i] ?? "sky"];
            return (
              <div
                key={item.n}
                className="grid gap-2 border-b border-border-subtle py-5 transition-colors duration-300 hover:bg-surface-2/40 sm:grid-cols-[3.5rem_1fr] sm:gap-4"
              >
                <span className={cx("font-mono text-label", s.text)} dir="ltr">
                  {item.n}
                </span>
                <div className="flex flex-col gap-1.5">
                  <h3 className={cx("text-subtitle tracking-[-0.01em]", s.text)}>{t(item.title)}</h3>
                  <p className="max-w-[56ch] text-body-sm text-text-secondary">{t(item.body)}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
