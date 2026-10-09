import { Icon } from "@/components/ui/icon";

export default function NotFound() {
  return (
    <main className="relative grid min-h-svh place-items-center overflow-hidden px-6 text-center">
      <div aria-hidden className="blueprint" />
      <div className="relative z-10 flex flex-col items-center gap-4">
        <p className="font-mono text-label uppercase tracking-[0.14em] text-accent-text">ERROR 404 · 0 ROWS RETURNED</p>
        <h1 className="text-display tracking-[-0.03em]">
          That page isn&apos;t in <em className="mark-em">the table.</em>
        </h1>
        <p className="font-mono text-micro text-text-tertiary" dir="ltr">
          SELECT * FROM pages WHERE url = &apos;this&apos;;
        </p>
        <a
          href="/"
          className="mt-2 inline-flex items-center gap-2 rounded-card bg-accent px-4 py-2.5 font-mono text-label uppercase tracking-[0.06em] text-navy transition-transform duration-300 hover:-translate-y-0.5"
        >
          <Icon name="arrow-right" size={14} className="rotate-180" />
          Back to portfolio
        </a>
      </div>
    </main>
  );
}
