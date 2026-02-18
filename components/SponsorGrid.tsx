import Card from "@/components/Card";
import ImageWithFallback from "@/components/ImageWithFallback";
import { CARD_DELAY_AFTER_HEADER } from "@/components/motion";
import Reveal from "@/components/Reveal";
import { cn } from "@/lib/utils";
import type { Sponsor, SponsorTier } from "@/types/content";

const tierOrder: SponsorTier[] = ["Champion", "Nitro", "Turbo", "Speed", "Support"];

interface SponsorGridProps {
  sponsors: Sponsor[];
  cardClassName?: string;
}

export default function SponsorGrid({ sponsors, cardClassName }: SponsorGridProps) {
  const groupedSponsors = tierOrder
    .map((tier) => ({
      tier,
      items: sponsors.filter((sponsor) => sponsor.tier === tier)
    }))
    .filter((group) => group.items.length > 0);

  return (
    <div className="space-y-10">
      {groupedSponsors.map((group) => (
        <section key={group.tier} aria-labelledby={`tier-${group.tier.toLowerCase()}`}>
          <div className="mb-5 flex items-center gap-3">
            <h3 id={`tier-${group.tier.toLowerCase()}`} className="gold-underline font-heading text-2xl">
              {group.tier}
            </h3>
            <span className="tier-chip">Tier</span>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {group.items.map((sponsor, index) => (
              <Reveal key={sponsor.name} delay={CARD_DELAY_AFTER_HEADER + index * 0.06} variant="fadeUp">
                <Card className={cn("card-pad-default", cardClassName)}>
                  <div className="sponsor-logo-frame" data-sponsor-size="page">
                    <ImageWithFallback
                      src={sponsor.logo}
                      alt={`${sponsor.name} logo`}
                      width={220}
                      height={84}
                      className="sponsor-logo-image media-fade-hover"
                      data-sponsor-size="page"
                    />
                  </div>
                  <h4 className="mt-5 font-heading text-xl">{sponsor.name}</h4>
                  <p className="copy-sm mt-3">{sponsor.description}</p>
                </Card>
              </Reveal>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
