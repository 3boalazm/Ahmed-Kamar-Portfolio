import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/page-header";
import { Reveal } from "@/components/ui/reveal";
import { Capabilities, DomainChips, SkillSheet, SkillsMarquee } from "@/features/home/practice";
import { CtaBand } from "@/features/home/faq-contact";
import { PAGES } from "@/lib/content";

export const metadata: Metadata = {
  title: "Skills",
  description: "SQL and Google Sheets at an advanced level; Power BI, Python, and Excel at a working level. Domain: menus, catalogs, pricing and commission analysis.",
};

export default function SkillsPage() {
  const p = PAGES.skills;
  return (
    <main>
      <PageHeader index={p.index} kicker={p.kicker} title={p.title} sub={p.sub} />
      <Reveal>
        <SkillsMarquee />
      </Reveal>
      <section className="container-content grid gap-10 py-12 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <DomainChips />
        </div>
        <div className="flex flex-col gap-10">
          <SkillSheet />
          <Capabilities />
        </div>
      </section>
      <Reveal>
        <CtaBand />
      </Reveal>
    </main>
  );
}
