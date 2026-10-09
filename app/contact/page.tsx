import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/page-header";
import { Reveal } from "@/components/ui/reveal";
import { ContactSheet, Faq } from "@/features/home/faq-contact";
import { PAGES } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contact",
  description: "Email Ahmed Kamar — open to Data Analyst roles in Egypt, the Gulf, or remote.",
};

export default function ContactPage() {
  const p = PAGES.contact;
  return (
    <main>
      <PageHeader index={p.index} kicker={p.kicker} title={p.title} sub={p.sub} />
      <Reveal>
        <ContactSheet />
      </Reveal>
      <Reveal>
        <Faq />
      </Reveal>
    </main>
  );
}
