"use client";

import { usePrefs } from "@/components/providers/prefs";
import { HOME } from "@/lib/content";
import { InsightBoard } from "@/features/hero/insight-board";

/** Home band 02 — the live insight board, given room to breathe instead of crowding the hero. */
export function AnalysisBand() {
  const { t, lang } = usePrefs();
  const [a, b] = HOME.analysis.title[lang];
  return (
    <div className="container-content grid gap-10 py-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
      <div className="flex flex-col gap-4">
        <p className="font-mono text-caption uppercase tracking-[0.14em] text-accent-text">{t(HOME.analysis.kicker)}</p>
        <h2 className="max-w-[16ch] text-title tracking-[-0.02em]">
          {a}
          <em className="mark-em">{b}</em>
        </h2>
        <p className="max-w-[44ch] text-body-sm text-text-secondary">{t(HOME.analysis.body)}</p>
        <p className="font-mono text-micro uppercase tracking-[0.1em] text-text-ghost">{t(HOME.analysis.hint)}</p>
      </div>
      <InsightBoard />
    </div>
  );
}
