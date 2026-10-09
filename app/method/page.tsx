import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/page-header";
import { Reveal } from "@/components/ui/reveal";
import { WhyValue } from "@/features/home/why-value";
import { Method } from "@/features/home/method";
import { CtaBand } from "@/features/home/faq-contact";
import { PAGES } from "@/lib/content";

export const metadata: Metadata = {
  title: "Method",
  description: "How Ahmed Kamar works: ask, clean, analyze, share — with the principles behind each analysis.",
};

export default function MethodPage() {
  const p = PAGES.method;
  return (
    <main>
      <PageHeader index={p.index} kicker={p.kicker} title={p.title} sub={p.sub} />
      <Reveal>
        <WhyValue showLink={false} />
      </Reveal>
      <div className="pt-12">
        <Method />
      </div>
      <Reveal>
        <CtaBand />
      </Reveal>
    </main>
  );
}
