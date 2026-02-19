import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";
import TeamGrid from "@/components/TeamGrid";
import { siteContent } from "@/lib/content";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Meet the Successors | Successors",
  description:
    "Get to know the students behind Successors. Organized for efficiency, united by passion.",
  alternates: {
    canonical: "/team",
  },
};

export default function TeamPage() {
  return (
    <Section
      atmoId="team-overview"
      title={siteContent.teamPage.title}
      subtitle={siteContent.teamPage.subtitle}
    >
      <Container>
        <TeamGrid members={siteContent.teamMembers} />
      </Container>
    </Section>
  );
}
