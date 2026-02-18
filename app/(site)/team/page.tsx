import Container from "@/components/Container";
import Section from "@/components/Section";
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
