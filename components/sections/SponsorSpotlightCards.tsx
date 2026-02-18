"use client";

import { useMemo } from "react";
import { buttonClasses } from "@/components/Button";
import Card from "@/components/Card";
import { openModal } from "@/components/modals/GlobalModalHost";
import { CARD_DELAY_AFTER_HEADER } from "@/components/motion";
import Reveal from "@/components/Reveal";
import type { Sponsor } from "@/types/content";

interface SponsorSpotlightCardsProps {
  sponsors: Sponsor[];
}

interface SponsorSpotlightDetail {
  id: string;
  brandName: string;
  tier: string;
  description: string;
}

const sponsorSpotlightDetails: SponsorSpotlightDetail[] = [
  {
    id: "vmake",
    brandName: "VMake",
    tier: "Champion",
    description:
      "Founded by Merveil and Vikram, VMake Events, Marketing & Films is a UAE-based creative powerhouse delivering world-class events, marketing strategies, and cinematic storytelling across the GCC. Like a Formula 1 team, where precision and execution define success, VMake delivers large-scale activations and luxury VIP experiences. From day one, they believed in our vision-supporting our team with the same precision and ambition that defines motorsport. Driving creativity at full throttle, VMake powers our journey forward as we accelerate innovation and chase pole position on and off the track.",
  },
  {
    id: "spicebox-ai",
    brandName: "Spicebox.AI",
    tier: "Turbo",
    description:
      "Founded by Marisha, Spicebox is a tech-agnostic innovation advisory making AI accessible, practical, and transformative. Through strategy, hands-on workshops, and powerful storytelling, they help organizations turn ideas into action using AI as a tool for innovation. As the first to believe in our dream, Spicebox champions young engineers and fuels our drive for precision, performance, and smart design. In motorsport, performance is built through precision and continuous optimisation-values that mirror our drive to translate advanced technology into real-world impact.",
  },
  {
    id: "indiana-delights",
    brandName: "Indiana Delights",
    tier: "Turbo",
    description:
      "Since 2013, Indiana Delights has been serving bold, authentic flavours that celebrate the power of spice and tradition. Redefining Indian dining in JLT, they blend rich aromas and vibrant presentation to create experiences beyond taste. Driven by passion, precision, and consistency-just like motorsport-they keep our team energised. Our F1 in Schools team thrives on intensity and pushing limits, turning heat into performance. We are proud to partner with a restaurant that understands how the right balance of spice, speed, and skill truly sets excellence apart.",
  },
  {
    id: "yetkey",
    brandName: "YetKey",
    tier: "Speed",
    description:
      "YetKey. The Future. Our Support Partner. Founded in 2023, YetKey delivers premium, comfortable apparel and performance-focused supplements through 100% environmentally sustainable production. Built on innovation and responsibility, YetKey aligns with our drive for efficiency and long-term impact-powering a faster, smarter, and more sustainable future on and off the track.",
  },
];

const sponsorDetailIdByBrandName: Record<string, SponsorSpotlightDetail["id"]> = {
  VMake: "vmake",
  "Spicebox.AI": "spicebox-ai",
  "Indiana Delights": "indiana-delights",
  YetKey: "yetkey",
};

export default function SponsorSpotlightCards({ sponsors }: SponsorSpotlightCardsProps) {
  const spotlightDetailsById = useMemo(
    () =>
      sponsorSpotlightDetails.reduce<Record<string, SponsorSpotlightDetail>>((accumulator, detail) => {
        accumulator[detail.id] = detail;
        return accumulator;
      }, {}),
    []
  );

  return (
    <Reveal delay={CARD_DELAY_AFTER_HEADER}>
      <div className="grid gap-4 md:grid-cols-2">
        {sponsors.map((sponsor) => {
          const detailId = sponsorDetailIdByBrandName[sponsor.name];
          const detail = detailId ? spotlightDetailsById[detailId] : null;

          return (
            <Card
              key={`spotlight-${sponsor.name}`}
              className="card-pad-default hover-info-v2"
              cardType="info"
            >
              <p className="tier-chip mb-3 w-fit">{sponsor.tier}</p>
              <h3 className="font-heading text-xl">{sponsor.name}</h3>
              <p className="copy-sm mt-3">{sponsor.description}</p>
              {detail ? (
                <button
                  type="button"
                  className={buttonClasses({ variant: "gold", size: "md", className: "mt-5" })}
                  onClick={() => {
                    void openModal("sponsorDetail", {
                      badgeText: detail.tier,
                      title: detail.brandName,
                      body: detail.description,
                      ariaLabel: `${detail.brandName} details`,
                      closeButtonAriaLabel: "Close sponsor details modal"
                    });
                  }}
                >
                  Discover More
                </button>
              ) : null}
            </Card>
          );
        })}
      </div>
    </Reveal>
  );
}
