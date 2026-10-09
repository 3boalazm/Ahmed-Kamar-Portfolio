import { Hero } from "@/features/hero/hero";
import { FeaturedCases, ExperienceLedger } from "@/features/work/featured-cases";
import { WhyValue } from "@/features/home/why-value";
import { Method } from "@/features/home/method";
import { AboutTeaser, SkillsMarquee, SkillSheet } from "@/features/home/practice";
import { Faq, ContactCta } from "@/features/home/faq-contact";
import { Marker } from "@/components/ui/marker";
import { Reveal } from "@/components/ui/reveal";
import { l } from "@/lib/content";

/**
 * HOME — the OS's six-beat narrative, in the same order:
 * clarity (hero) → proof → why → method → background → objections → CTA.
 */
export default function Home() {
  return (
    <main>
      {/* 00 · Immediate clarity */}
      <Hero />

      {/* 01 · Proof first */}
      <section id="work" className="narrative-section narrative-section--proof">
        <div className="container-wide">
          <Marker index="01" label={l("SELECTED WORK", "أعمال مختارة")} />
        </div>
        <FeaturedCases />
        <ExperienceLedger />
      </section>

      {/* 02 · Why this approach */}
      <section id="why" className="narrative-section narrative-section--proof">
        <div className="container-wide">
          <Marker index="02" label={l("WHY / VALUE", "لماذا / القيمة")} />
        </div>
        <Reveal>
          <WhyValue />
        </Reveal>
      </section>

      {/* 03 · Method */}
      <section id="method" className="narrative-section narrative-section--process">
        <div className="container-wide">
          <Marker index="03" label={l("METHOD / PROCESS", "المنهج / العملية")} />
        </div>
        <Method />
      </section>

      {/* 04 · Background & practice */}
      <section id="background" className="narrative-section narrative-section--about">
        <div className="container-wide">
          <Marker index="04" label={l("PRACTICE / BACKGROUND", "الممارسة / الخلفية")} />
        </div>
        <Reveal>
          <AboutTeaser />
        </Reveal>
        <div className="section-divider" aria-hidden="true" />
        <Reveal delay={50}>
          <SkillsMarquee />
        </Reveal>
        <SkillSheet />
      </section>

      {/* 05 · FAQ */}
      <section id="faq" className="narrative-section narrative-section--about">
        <div className="container-wide">
          <Marker index="05" label={l("FAQ / BEFORE START", "أسئلة / قبل البداية")} />
        </div>
        <Reveal>
          <Faq />
        </Reveal>
      </section>

      {/* 06 · Call to action */}
      <section id="contact" className="narrative-section narrative-section--cta">
        <div className="container-wide">
          <Marker index="06" label={l("NEXT / CONTACT", "التالي / تواصل")} />
        </div>
        <Reveal>
          <ContactCta />
        </Reveal>
      </section>
    </main>
  );
}
