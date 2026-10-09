"use client";

import { usePrefs } from "@/components/providers/prefs";
import type { L } from "@/lib/content";
import { SectionMarker } from "./section-marker";

/** Language-aware numbered section marker (01 ─ SELECTED WORK). */
export function Marker({ index, label }: { index: string; label: L }) {
  const { t } = usePrefs();
  return <SectionMarker index={index} label={t(label)} />;
}
