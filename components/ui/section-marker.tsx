import type { ReactNode } from "react";

export function SectionMarker({ index, label }: { index: string; label: ReactNode }) {
  return (
    <div className="narrative-marker">
      <span className="narrative-marker__index">{index}</span>
      <span className="narrative-marker__line" aria-hidden />
      <span className="narrative-marker__label">{label}</span>
    </div>
  );
}
