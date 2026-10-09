"use client";

export function PrintBar() {
  return (
    <div className="no-print mx-auto mb-4 flex max-w-[210mm] items-center justify-between gap-3">
      <a
        href="/"
        className="font-mono text-[0.75rem] uppercase tracking-[0.1em] text-[#3B4B68] underline-offset-4 hover:underline"
      >
        ← Back to portfolio
      </a>
      <button
        type="button"
        onClick={() => window.print()}
        className="rounded-md bg-[#0A1529] px-4 py-2 font-mono text-[0.75rem] uppercase tracking-[0.08em] text-white transition-transform duration-300 hover:-translate-y-0.5"
      >
        Print / Save as PDF
      </button>
    </div>
  );
}
