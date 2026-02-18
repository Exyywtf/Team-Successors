"use client";

import Link from "next/link";
import { buttonClasses } from "@/components/Button";
import Card from "@/components/Card";
import Container from "@/components/Container";
import FAQ from "@/components/FAQ";
import { CARD_DELAY_AFTER_HEADER } from "@/components/motion";
import Reveal from "@/components/Reveal";
import Section from "@/components/Section";
import { siteContent } from "@/lib/content";

interface OutreachAndImpactSectionProps {
  atmoId?: string;
  title?: string;
  subtitle?: string;
  showOutreachItems?: boolean;
}

export default function OutreachAndImpactSection({
  atmoId = "enterprise-outreach",
  title,
  subtitle,
  showOutreachItems = true,
}: OutreachAndImpactSectionProps) {
  const { enterprisePage } = siteContent;
  const sectionTitle = title ?? enterprisePage.outreach.title;
  const sectionSubtitle = subtitle ?? enterprisePage.outreach.description;

  return (
    <Section
      atmoId={atmoId}
      title={sectionTitle}
      subtitle={sectionSubtitle}
      headerClassName="lg:[&_.type-subtitle]:max-w-none lg:[&_.type-subtitle]:whitespace-nowrap"
    >
      <Container>
        <Reveal delay={CARD_DELAY_AFTER_HEADER}>
          {showOutreachItems ? (
            <div className="grid gap-4 md:grid-cols-3">
              {enterprisePage.outreach.items.map((item) => (
                <Card
                  key={item}
                  className="card-pad-default hover-info-v2"
                  cardType="info"
                >
                  <p className="copy-sm">{item}</p>
                </Card>
              ))}
            </div>
          ) : null}
          <div className={showOutreachItems ? "mt-8" : undefined}>
            <FAQ items={enterprisePage.faqs} cardClassName="hover-info-v2" />
          </div>
          <div className="mt-8">
            <Link href="/contact" className={buttonClasses({ variant: "gold", size: "lg" })}>
              Start a Partnership
            </Link>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
