import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";
import TeamGrid from "@/components/TeamGrid";
import { siteContent } from "@/lib/content";

export default function TeamPage() {
  return (
    <Section atmoId="team-overview" title={siteContent.teamPage.title} subtitle={siteContent.teamPage.subtitle}>
      <Container>
        <TeamGrid members={siteContent.teamMembers} />
      </Container>
    </Section>
  );
}
