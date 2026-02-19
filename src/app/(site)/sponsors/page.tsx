import Link from "next/link";
import { buttonClasses } from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Container from "@/components/layout/Container";
import { CARD_DELAY_AFTER_HEADER } from "@/components/motion";
import Reveal from "@/components/Reveal";
import Section from "@/components/layout/Section";
import SponsorGrid from "@/components/SponsorGrid";
import SponsorSpotlightCards from "@/components/sections/SponsorSpotlightCards";
import { siteContent } from "@/lib/content";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Partners | Successors F1 - Sponsorship Opportunities & ROI",
  description:
    "We are powered by industry leaders. Explore our current partners and discover how to join our network.",
  alternates: {
    canonical: "/sponsors",
  },
};

export default function SponsorsPage() {
  const { sponsorsPage, sponsors } = siteContent;

  return (
    <>
      <Section
        atmoId="sponsors-overview"
        title={sponsorsPage.title}
        subtitle={sponsorsPage.subtitle}
      >
        <Container>
          <SponsorGrid sponsors={sponsors} cardClassName="hover-info-v2" />
        </Container>
      </Section>

      <Section
        atmoId="sponsors-spotlight"
        title={sponsorsPage.spotlightTitle}
        subtitle="Every sponsor partnership is integrated into race storytelling and community impact."
      >
        <Container>
          <SponsorSpotlightCards sponsors={sponsors} />
        </Container>
      </Section>

      <Section atmoId="sponsors-cta">
        <Container>
          <Reveal delay={CARD_DELAY_AFTER_HEADER}>
            <Card className="card-pad-showcase hover-info-v2 text-center">
              <h2 className="font-heading text-2xl sm:text-3xl">
                {sponsorsPage.ctaTitle}
              </h2>
              <p className="copy-sm mx-auto mt-3 max-w-2xl">
                {sponsorsPage.ctaDescription}
              </p>
              <div className="mt-6">
                <Link
                  href="/contact"
                  className={buttonClasses({ variant: "primary", size: "lg" })}
                >
                  Partner With Team Successors
                </Link>
              </div>
            </Card>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
