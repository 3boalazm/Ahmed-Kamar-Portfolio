import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/page-header";
import { Reveal } from "@/components/ui/reveal";
import { CaseFiles, ExperienceLedger } from "@/features/work/featured-cases";
import { CtaBand } from "@/features/home/faq-contact";
import { PAGES } from "@/lib/content";

export const metadata: Metadata = {
  title: "Work",
  description: "Case files from HungerStation, Spinneys, and a database-driven graduation project. Client work is summarized under NDA.",
};

export default function WorkPage() {
  const p = PAGES.work;
  return (
    <main>
      <PageHeader index={p.index} kicker={p.kicker} title={p.title} sub={p.sub} />
      <CaseFiles />
      <ExperienceLedger />
      <div className="pt-8">
        <Reveal>
          <CtaBand />
        </Reveal>
      </div>
    </main>
  );
}
