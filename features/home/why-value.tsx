"use client";

import Link from "next/link";
import { usePrefs } from "@/components/providers/prefs";
import { WHY } from "@/lib/content";
import { Arrow } from "@/components/ui/arrow";
import { SERIES, cx, type Series } from "@/lib/utils";

const COLORS: Series[] = ["sky", "mint", "violet"];

/** Trust layer between proof and process — three principles, grounded in the actual work. */
export function WhyValue({ showLink = true }: { showLink?: boolean }) {
  const { t, lang } = usePrefs();
  const [a, b] = WHY.title[lang];
  return (
    <section className="container-content glass edge-light rounded-panel py-12 md:py-16">
      <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
        <div className="flex flex-col gap-3">
          <p className="font-mono text-micro uppercase tracking-[0.1em] text-accent-text">{t(WHY.kicker)}</p>
          <h2 className="max-w-[18ch] text-title tracking-[-0.02em]">
            {a}
            <em className="mark-em">{b}</em>
          </h2>
          <p className="max-w-[46ch] text-body-sm text-text-secondary">{t(WHY.sub)}</p>
          {showLink && (
            <Link
              href="/method"
              className="group inline-flex w-fit items-center gap-1.5 font-mono text-label uppercase tracking-[0.06em] text-text-tertiary transition-colors duration-500 hover:text-text-primary"
            >
              {t(WHY.link)}
              <Arrow className="transition-transform duration-500 ease-physics group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
            </Link>
          )}
        </div>

        <div className="flex flex-col border-t border-border-subtle">
          {WHY.items.map((item, i) => {
            const s = SERIES[COLORS[i] ?? "sky"];
            return (
              <div
                key={item.n}
                className="grid gap-2 border-b border-border-subtle py-6 transition-colors duration-500 hover:bg-surface-2/40 sm:grid-cols-[3.5rem_1fr] sm:gap-4"
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
