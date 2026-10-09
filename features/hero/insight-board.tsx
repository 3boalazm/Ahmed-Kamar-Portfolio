"use client";

/**
 * INSIGHT BOARD — the hero's signature asset (replaces the OS's
 * "system constellation"). A tiny BI window that cycles through the
 * three analyses Ahmed actually does: sales, price vs commission, and
 * customer ratings. Every number is SAMPLE DATA and labelled as such —
 * nothing here is client data.
 */
import { useEffect, useMemo, useRef, useState } from "react";
import { usePrefs } from "@/components/providers/prefs";
import { BOARD } from "@/lib/content";
import { cx } from "@/lib/utils";

type TabId = (typeof BOARD.tabs)[number]["id"];

const W = 420;
const H = 232;
const X0 = 36;
const X1 = 404;
const BASE = 188;
const TOP = 18;
const PLOT_H = BASE - TOP;

const y = (v: number, max = 100) => BASE - (v / max) * PLOT_H;

function segLen(pts: [number, number][]) {
  let len = 0;
  for (let i = 1; i < pts.length; i++) {
    const a = pts[i - 1]!;
    const b = pts[i]!;
    len += Math.hypot(b[0] - a[0], b[1] - a[1]);
  }
  return Math.ceil(len) + 4;
}

function Grid({ max = 100, steps = 4 }: { max?: number; steps?: number }) {
  return (
    <g>
      {Array.from({ length: steps + 1 }, (_, i) => {
        const v = (max / steps) * i;
        return (
          <g key={i}>
            <line x1={X0} x2={X1} y1={y(v, max)} y2={y(v, max)} stroke="var(--color-border-subtle)" strokeDasharray={i === 0 ? undefined : "2 4"} />
            <text x={X0 - 8} y={y(v, max) + 3} textAnchor="end" className="fill-text-ghost" style={{ fontSize: 9, fontFamily: "var(--font-mono)" }}>
              {Math.round(v)}
            </text>
          </g>
        );
      })}
    </g>
  );
}

function SalesChart({ hover, setHover }: { hover: number | null; setHover: (i: number | null) => void }) {
  const { t } = usePrefs();
  const { values, days } = BOARD.sales;
  const step = (X1 - X0) / values.length;
  const barW = 32;
  const peak = values.indexOf(Math.max(...values));
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="block w-full" role="img" aria-label="Sample bar chart of orders by weekday">
      <Grid />
      {values.map((v, i) => {
        const x = X0 + i * step + (step - barW) / 2;
        const h = (v / 100) * PLOT_H;
        const on = hover === i || (hover === null && i === peak);
        return (
          <g key={i} onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(null)} onFocus={() => setHover(i)} onBlur={() => setHover(null)} tabIndex={0}>
            <rect x={x - 6} y={TOP} width={barW + 12} height={PLOT_H} fill="transparent" />
            <rect
              className="bar-y"
              style={{ "--i": i } as React.CSSProperties}
              x={x}
              y={BASE - h}
              width={barW}
              height={h}
              rx={3}
              fill={on ? "var(--color-accent)" : "var(--color-sky)"}
              opacity={on ? 1 : 0.55}
            />
            <text x={x + barW / 2} y={BASE + 16} textAnchor="middle" className={on ? "fill-text-primary" : "fill-text-tertiary"} style={{ fontSize: 10, fontFamily: "var(--font-mono)" }}>
              {t(days[i]!)}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

function CommissionChart({ hover, setHover }: { hover: number | null; setHover: (i: number | null) => void }) {
  const { months, price, net } = BOARD.commission;
  const step = (X1 - X0) / (months.length - 1);
  const px = (i: number) => X0 + i * step;
  const pPts = useMemo(() => price.map((v, i) => [px(i), y(v)] as [number, number]), [price]); // eslint-disable-line react-hooks/exhaustive-deps
  const nPts = useMemo(() => net.map((v, i) => [px(i), y(v)] as [number, number]), [net]); // eslint-disable-line react-hooks/exhaustive-deps
  const d = (pts: [number, number][]) => pts.map((p, i) => `${i ? "L" : "M"}${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join(" ");
  const gap = `${d(pPts)} ${[...nPts].reverse().map((p) => `L${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join(" ")} Z`;
  const ref = useRef<SVGSVGElement>(null);

  const onMove = (e: React.PointerEvent<SVGSVGElement>) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    const x = ((e.clientX - r.left) / r.width) * W;
    setHover(Math.min(months.length - 1, Math.max(0, Math.round((x - X0) / step))));
  };

  return (
    <svg
      ref={ref}
      viewBox={`0 0 ${W} ${H}`}
      className="block w-full touch-pan-y"
      role="img"
      aria-label="Sample line chart of menu price index versus net after commission"
      onPointerMove={onMove}
      onPointerLeave={() => setHover(null)}
    >
      <Grid />
      <path d={gap} fill="var(--color-rose)" opacity={0.14} className="area-in" />
      <path d={d(pPts)} fill="none" stroke="var(--color-sky)" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" className="draw-line" style={{ "--len": segLen(pPts) } as React.CSSProperties} />
      <path d={d(nPts)} fill="none" stroke="var(--color-accent)" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" className="draw-line" style={{ "--len": segLen(nPts) } as React.CSSProperties} />
      {months.map((m, i) => (
        <text key={i} x={px(i)} y={BASE + 16} textAnchor="middle" className={hover === i ? "fill-text-primary" : "fill-text-tertiary"} style={{ fontSize: 10, fontFamily: "var(--font-mono)" }}>
          {m}
        </text>
      ))}
      {hover !== null && (
        <g>
          <line x1={px(hover)} x2={px(hover)} y1={TOP} y2={BASE} stroke="var(--color-border-strong)" />
          <circle cx={px(hover)} cy={y(price[hover]!)} r={4} fill="var(--color-sky)" stroke="var(--color-surface-1)" strokeWidth={2} />
          <circle cx={px(hover)} cy={y(net[hover]!)} r={4} fill="var(--color-accent)" stroke="var(--color-surface-1)" strokeWidth={2} />
        </g>
      )}
    </svg>
  );
}

function RatingsChart({ hover, setHover }: { hover: number | null; setHover: (i: number | null) => void }) {
  const { t } = usePrefs();
  const { items, scale } = BOARD.ratings;
  const trackW = X1 - X0;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="block w-full" role="img" aria-label="Sample horizontal bar chart of customer ratings">
      {items.map((it, i) => {
        const yy = 34 + i * 58;
        const w = (it.value / scale) * trackW;
        const on = hover === i;
        return (
          <g key={i} onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(null)} onFocus={() => setHover(i)} onBlur={() => setHover(null)} tabIndex={0}>
            <rect x={X0 - 8} y={yy - 22} width={trackW + 16} height={50} fill="transparent" />
            <text x={X0} y={yy - 8} className={on ? "fill-text-primary" : "fill-text-secondary"} style={{ fontSize: 11, fontFamily: "var(--font-sans)" }}>
              {t(it.label)}
            </text>
            <text x={X1} y={yy - 8} textAnchor="end" className="fill-text-primary" style={{ fontSize: 12, fontFamily: "var(--font-mono)", fontWeight: 600 }}>
              {it.value.toFixed(1)}
            </text>
            <rect x={X0} y={yy} width={trackW} height={12} rx={3} fill="var(--color-surface-3)" />
            <rect
              className="bar-x"
              style={{ "--i": i } as React.CSSProperties}
              x={X0}
              y={yy}
              width={w}
              height={12}
              rx={3}
              fill={["var(--color-mint)", "var(--color-rose)", "var(--color-sky)"][i]}
              opacity={on || hover === null ? 1 : 0.5}
            />
          </g>
        );
      })}
      <text x={X0} y={H - 8} className="fill-text-ghost" style={{ fontSize: 9, fontFamily: "var(--font-mono)" }}>
        0
      </text>
      <text x={X1} y={H - 8} textAnchor="end" className="fill-text-ghost" style={{ fontSize: 9, fontFamily: "var(--font-mono)" }}>
        {scale}
      </text>
    </svg>
  );
}

export function InsightBoard() {
  const { t, ar } = usePrefs();
  const [tab, setTab] = useState<TabId>("sales");
  const [hover, setHover] = useState<number | null>(null);
  const [auto, setAuto] = useState(true);
  const [paused, setPaused] = useState(false);

  /* Cycle tabs until the visitor takes control; never under reduced motion. */
  useEffect(() => {
    if (!auto || paused) return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => {
      setHover(null);
      setTab((cur) => {
        const i = BOARD.tabs.findIndex((x) => x.id === cur);
        return BOARD.tabs[(i + 1) % BOARD.tabs.length]!.id;
      });
    }, 7000);
    return () => window.clearInterval(id);
  }, [auto, paused]);

  const readout = useMemo(() => {
    if (tab === "sales") {
      const { values, days, unit } = BOARD.sales;
      const i = hover ?? values.indexOf(Math.max(...values));
      return {
        k: hover === null ? (ar ? "الذروة" : "PEAK") : t(days[i]!).toUpperCase(),
        v: `${t(days[i]!)} · ${values[i]} ${t(unit)}`,
      };
    }
    if (tab === "commission") {
      const { months, price, net } = BOARD.commission;
      const i = hover ?? months.length - 1;
      return {
        k: hover === null ? (ar ? "آخر نقطة" : "LATEST") : months[i]!,
        v: `${ar ? "السعر" : "price"} ${price[i]} · ${ar ? "الصافي" : "net"} ${net[i]} · ${ar ? "فجوة العمولة" : "commission gap"} ${price[i]! - net[i]!}`,
      };
    }
    const { items, scale } = BOARD.ratings;
    const lowest = items.reduce((a, b) => (a.value <= b.value ? a : b));
    const i = hover ?? items.indexOf(lowest);
    return {
      k: hover === null ? (ar ? "الأضعف" : "LOWEST") : (ar ? "التقييم" : "RATING"),
      v: `${t(items[i]!.label)} · ${items[i]!.value.toFixed(1)} / ${scale}`,
    };
  }, [tab, hover, t, ar]);

  return (
    <div
      className="overflow-hidden rounded-panel border border-border-default bg-surface-1 shadow-panel"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* window chrome */}
      <div className="flex items-center gap-3 border-b border-border-subtle px-4 py-2.5">
        <span className="flex gap-1.5" aria-hidden>
          <i className="size-2.5 rounded-full bg-rose/70" />
          <i className="size-2.5 rounded-full bg-accent/70" />
          <i className="size-2.5 rounded-full bg-mint/70" />
        </span>
        <span className="font-mono text-micro text-text-tertiary" dir="ltr">{BOARD.file}</span>
        <span className="ms-auto rounded-card border border-accent-24 bg-accent-08 px-2 py-0.5 font-mono text-caption uppercase tracking-[0.1em] text-accent-text">
          {ar ? "نموذج" : "SAMPLE"}
        </span>
      </div>

      {/* tabs */}
      <div role="tablist" aria-label={ar ? "عروض التحليل" : "Analysis views"} className="flex border-b border-border-subtle">
        {BOARD.tabs.map((x) => {
          const on = x.id === tab;
          return (
            <button
              key={x.id}
              role="tab"
              aria-selected={on}
              type="button"
              onClick={() => {
                setTab(x.id);
                setHover(null);
                setAuto(false);
              }}
              className={cx(
                "relative flex-1 px-2 py-2.5 font-mono text-caption uppercase tracking-[0.08em] transition-colors duration-300",
                on ? "bg-surface-2 text-text-primary" : "text-text-tertiary hover:text-text-secondary",
              )}
            >
              {t(x.label)}
              <span aria-hidden className={cx("absolute inset-x-0 top-0 h-0.5 bg-accent transition-transform duration-500 ease-physics", on ? "scale-x-100" : "scale-x-0")} />
            </button>
          );
        })}
      </div>

      {/* chart */}
      <div className="px-4 pb-2 pt-4" dir="ltr">
        <div key={tab} role="tabpanel">
          {tab === "sales" && <SalesChart hover={hover} setHover={setHover} />}
          {tab === "commission" && <CommissionChart hover={hover} setHover={setHover} />}
          {tab === "ratings" && <RatingsChart hover={hover} setHover={setHover} />}
        </div>
      </div>

      {/* legend + readout */}
      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 border-t border-border-subtle px-4 py-2.5">
        <p className="font-mono text-micro text-text-secondary" aria-live="polite">
          <span className="text-accent-text">{readout.k}</span>
          <span className="mx-2 text-text-ghost">/</span>
          {readout.v}
        </p>
        {tab === "commission" && (
          <p className="flex items-center gap-3 font-mono text-caption text-text-tertiary">
            <span className="flex items-center gap-1.5"><i className="h-0.5 w-3 bg-sky" />{t(BOARD.commission.priceLabel)}</span>
            <span className="flex items-center gap-1.5"><i className="h-0.5 w-3 bg-accent" />{t(BOARD.commission.netLabel)}</span>
          </p>
        )}
      </div>
      <p className="border-t border-border-subtle bg-surface-0/40 px-4 py-1.5 text-center font-mono text-caption uppercase tracking-[0.1em] text-text-ghost">
        {t(BOARD.disclaimer)}
      </p>
    </div>
  );
}
