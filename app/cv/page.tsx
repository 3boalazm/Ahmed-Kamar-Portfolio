import type { Metadata } from "next";
import { CV, SITE, SKILLS } from "@/lib/content";
import { PrintBar } from "./print-bar";

export const metadata: Metadata = {
  title: "CV",
  description: "Ahmed Kamar — Data Analyst. Curriculum vitae.",
  robots: { index: true, follow: true },
};

const INK = "text-[#0A1529]";
const MUTED = "text-[#3B4B68]";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="break-inside-avoid pt-5">
      <h2 className="mb-2 flex items-center gap-3 font-mono text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-[#1B3A78]">
        {title}
        <span aria-hidden className="h-px flex-1 bg-[#C9D3E6]" />
      </h2>
      {children}
    </section>
  );
}

/**
 * /cv — print-ready English CV generated from the same content file as the
 * site. Use "Save as PDF" in the print dialog. When a designed PDF exists,
 * drop it in /public and point SITE.cv at it (lib/content.ts).
 */
export default function CvPage() {
  return (
    <div className="min-h-svh bg-[#E4EAF5] px-3 py-6 print:bg-white print:p-0" dir="ltr" lang="en">
      <PrintBar />
      <article
        className={`print-sheet mx-auto max-w-[210mm] bg-white px-[14mm] py-[12mm] shadow-[0_20px_60px_rgba(10,21,41,0.18)] ${INK}`}
        style={{ fontFamily: "var(--font-sans)", fontSize: "0.92rem", lineHeight: 1.55 }}
      >
        <header className="border-b-2 border-[#0A1529] pb-4">
          <h1 className="text-[2.1rem] font-bold leading-none tracking-[-0.03em]" style={{ fontFamily: "var(--font-display)" }}>
            {SITE.name}
          </h1>
          <p className="mt-1.5 text-[1.05rem] font-semibold text-[#1B3A78]">{SITE.role.en}</p>
          <p className={`mt-2 font-mono text-[0.75rem] ${MUTED}`}>
            {SITE.location.en} · {SITE.email} · {SITE.linkedinLabel} · {SITE.githubLabel}
          </p>
        </header>

        <Section title="Summary">
          <p className={MUTED}>{CV.summary}</p>
        </Section>

        <Section title="Experience">
          <div className="flex flex-col gap-3.5">
            {CV.experience.map((job) => (
              <div key={job.org} className="break-inside-avoid">
                <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                  <p className="font-semibold">
                    {job.role} <span className="font-normal text-[#1B3A78]">· {job.org}</span>
                  </p>
                  <p className={`font-mono text-[0.72rem] ${MUTED}`}>{job.period}</p>
                </div>
                <ul className={`mt-1 list-disc ps-5 ${MUTED}`}>
                  {job.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Section>

        <Section title="Project">
          <div className="break-inside-avoid">
            <p className="font-semibold">{CV.project.name}</p>
            <ul className={`mt-1 list-disc ps-5 ${MUTED}`}>
              {CV.project.bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
            <p className={`mt-1 font-mono text-[0.72rem] ${MUTED}`}>{CV.project.link}</p>
          </div>
        </Section>

        <Section title="Skills">
          <ul className="grid grid-cols-2 gap-x-8 gap-y-1">
            {SKILLS.map((s) => (
              <li key={s.tool} className="flex items-baseline justify-between border-b border-dotted border-[#C9D3E6] py-0.5">
                <span>{s.tool}</span>
                <span className={`font-mono text-[0.72rem] ${MUTED}`}>{s.level === 4 ? "Advanced" : "Intermediate"}</span>
              </li>
            ))}
          </ul>
          <p className={`mt-2 ${MUTED}`}>
            Domain: menu and catalog management · pricing and commission analysis · delivery-platform operations
          </p>
        </Section>

        <div className="grid gap-x-10 sm:grid-cols-2">
          <Section title="Education">
            <ul className={`flex flex-col gap-1 ${MUTED}`}>
              {CV.education.map((e) => (
                <li key={e}>{e}</li>
              ))}
            </ul>
          </Section>
          <Section title="Languages">
            <ul className={`flex flex-col gap-1 ${MUTED}`}>
              {CV.languages.map((e) => (
                <li key={e}>{e}</li>
              ))}
            </ul>
          </Section>
        </div>
      </article>
    </div>
  );
}
