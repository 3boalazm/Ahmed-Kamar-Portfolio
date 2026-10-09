import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/page-header";
import { Reveal } from "@/components/ui/reveal";
import { AboutStory, EducationLanguages } from "@/features/home/about-parts";
import { CtaBand } from "@/features/home/faq-contact";
import { PAGES } from "@/lib/content";

export const metadata: Metadata = {
  title: "About",
  description: "Ahmed Kamar — Data Analyst with hands-on restaurant, retail, and delivery-platform experience at HungerStation and Spinneys.",
};

export default function AboutPage() {
  const p = PAGES.about;
  return (
    <main>
      <PageHeader index={p.index} kicker={p.kicker} title={p.title} sub={p.sub} />
      <AboutStory />
      <EducationLanguages />
      <div className="pt-8">
        <Reveal>
          <CtaBand />
        </Reveal>
      </div>
    </main>
  );
}
