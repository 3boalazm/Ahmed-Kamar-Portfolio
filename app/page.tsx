import { Hero } from "@/features/hero/hero";
import { FeaturedCases } from "@/features/work/featured-cases";
import { AnalysisBand } from "@/features/home/analysis-band";
import { WhyValue } from "@/features/home/why-value";
import { MethodStrip } from "@/features/home/method";
import { AboutTeaser, SkillsMarquee } from "@/features/home/practice";
import { CtaBand } from "@/features/home/faq-contact";
import { Marker } from "@/components/ui/marker";
import { Reveal } from "@/components/ui/reveal";
import { l } from "@/lib/content";

/**
 * HOME — the OS's narrative, in the same order, but every band is now a
 * teaser that opens its own page (/work, /method, /about, /contact):
 * clarity → proof → analysis → why → method → background → CTA.
 */
export default function Home() {
  return (
    <main>
      <Hero />

      <section className="narrative-section narrative-section--proof">
        <div className="container-wide">
          <Marker index="01" label={l("SELECTED WORK", "أعمال مختارة")} />
        </div>
        <FeaturedCases />
      </section>

      <section className="narrative-section narrative-section--proof">
        <div className="container-wide">
          <Marker index="02" label={l("ANALYSIS / SAMPLE", "التحليل / نموذج")} />
        </div>
        <Reveal>
          <AnalysisBand />
        </Reveal>
      </section>

      <section className="narrative-section narrative-section--proof">
        <div className="container-wide">
          <Marker index="03" label={l("WHY / VALUE", "لماذا / القيمة")} />
        </div>
        <Reveal>
          <WhyValue />
        </Reveal>
      </section>

      <section className="narrative-section narrative-section--process">
        <div className="container-wide">
          <Marker index="04" label={l("METHOD / PROCESS", "المنهج / العملية")} />
        </div>
        <Reveal>
          <MethodStrip />
        </Reveal>
      </section>

      <section className="narrative-section narrative-section--about">
        <div className="container-wide">
          <Marker index="05" label={l("PRACTICE / BACKGROUND", "الممارسة / الخلفية")} />
        </div>
        <Reveal>
          <AboutTeaser />
        </Reveal>
        <div className="section-divider" aria-hidden="true" />
        <Reveal delay={50}>
          <SkillsMarquee />
        </Reveal>
      </section>

      <section className="narrative-section narrative-section--cta">
        <div className="container-wide">
          <Marker index="06" label={l("NEXT / CONTACT", "التالي / تواصل")} />
        </div>
        <Reveal>
          <CtaBand />
        </Reveal>
      </section>
    </main>
  );
}
