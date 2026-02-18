import Link from "next/link";
import { buttonClasses } from "@/components/ui/Button";
import Container from "@/components/layout/Container";
import FAQ from "@/components/FAQ";
import {
  CARD_DELAY_AFTER_HEADER,
  SECTION_TITLE_WORD_STAGGER,
} from "@/components/motion";
import Reveal from "@/components/Reveal";
import Section from "@/components/layout/Section";
import TextReveal from "@/components/TextReveal";
import type { FaqItem } from "@/types/content";

const engineeringFaqItems: FaqItem[] = [
  {
    question: "How fast can an F1 in Schools car actually go?",
    answer:
      "Blindingly fast. A highly optimized car covers the 20-meter track in roughly one second, hitting top speeds of 80 km/h. The world record currently sits at a blistering 0.916 seconds.",
  },
  {
    question: "What powers the car?",
    answer:
      "Instead of batteries, we rely on a highly pressurized CO2 cartridge housed in the rear chassis. When punctured on the starting grid, the rapidly escaping gas creates instant, explosive thrust.",
  },
  {
    question: "What software and machinery do you use to build the car?",
    answer:
      "We design our concepts using Autodesk Fusion 360, analyze aerodynamics with Ansys CFD, and manufacture the physical chassis using a Denford 2600 CNC router and precision 3D printers.",
  },
  {
    question: "How do you ensure the car is as fast as possible?",
    answer:
      "We run our digital models through rigorous CFD (Computational Fluid Dynamics) simulations to measure drag coefficients, control flow separation, and manage turbulent wake before any physical manufacturing begins.",
  },
  {
    question: "How is the final car tested?",
    answer:
      "Beyond digital simulations, we conduct physical test races at Yas Marina Circuit to gather timing data and perform wind-tunnel testing to validate our aerodynamic predictions.",
  },
];

const enterpriseFaqItems: FaqItem[] = [
  {
    question: "How can a business partner with the team?",
    answer:
      'We offer multiple sponsorship tiers-from our "Speed" package to our top-tier "Champion" package. Depending on the tier, sponsors receive logo placement, collaborative social media posts, promotional videos, and dedicated representation at our events.',
  },
  {
    question: "Where does the team's funding go?",
    answer:
      "Our projected budget of 25,230 AED is allocated strategically for maximum performance: 53.5% goes to engineering and manufacturing, 37.7% to enterprise and marketing, and 8.8% to team management and operations.",
  },
  {
    question: "What kind of community outreach do you do?",
    answer:
      "We actively engage with our community off the track. This includes hosting a charity run alongside our Champion sponsor, organizing educational AI workshops for younger students, and pitching business solutions at the Adam Burfield Enterprise Award.",
  },
];

function FaqColumn({ heading, items }: { heading: string; items: FaqItem[] }) {
  return (
    <div>
      <TextReveal
        as="h3"
        className="gold-underline font-heading text-[26px]"
        type="words"
        stagger={SECTION_TITLE_WORD_STAGGER}
      >
        {heading}
      </TextReveal>
      <Reveal delay={CARD_DELAY_AFTER_HEADER}>
        <div className="mt-6">
          <FAQ items={items} cardClassName="hover-info-v1" />
        </div>
      </Reveal>
    </div>
  );
}

export default function FaqPage() {
  return (
    <Section
      atmoId="faq-outreach"
      title="FAQ"
      subtitle="Common questions about our technical development, funding strategy, and community initiatives."
      headerClassName="lg:[&_.type-subtitle]:max-w-none lg:[&_.type-subtitle]:whitespace-nowrap"
    >
      <Container>
        <div className="space-y-10">
          <FaqColumn heading="Engineering" items={engineeringFaqItems} />

          <div>
            <FaqColumn heading="Enterprise" items={enterpriseFaqItems} />
            <Reveal delay={CARD_DELAY_AFTER_HEADER}>
              <div className="mt-8">
                <Link href="/contact" className={buttonClasses({ variant: "gold", size: "lg" })}>
                  Start a Partnership
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </Section>
  );
}
