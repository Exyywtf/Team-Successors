import Container from "@/components/Container";
import GalleryGrid from "@/components/GalleryGrid";
import Section from "@/components/Section";
import Timeline from "@/components/Timeline";
import { siteContent } from "@/lib/content";

export default function EngineeringPage() {
  const { engineeringPage } = siteContent;

  return (
    <>
      <Section atmoId="engineering-timeline" title={engineeringPage.title} subtitle={engineeringPage.subtitle}>
        <Container>
          <Timeline steps={engineeringPage.timeline} />
        </Container>
      </Section>

      <Section
        atmoId="engineering-gallery"
        title="Digital Prototyping & Analysis"
        subtitle="Iterative 3D CAD exploration and virtual CFD testing of our independent foundational concepts."
      >
        <Container>
          <GalleryGrid
            items={engineeringPage.gallery}
            tabs={["All", "Renders", "CFD"] as const}
            defaultTab="All"
          />
        </Container>
      </Section>
    </>
  );
}
