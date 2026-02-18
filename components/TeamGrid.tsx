"use client";

import { buttonClasses } from "@/components/Button";
import Card from "@/components/Card";
import {
  TEAM_MEDIA_BACKGROUND_CLASS,
  TEAM_MEDIA_FADE_STYLE,
  TEAM_MEDIA_OVERLAY_SIZE_CLASS
} from "@/components/media/teamMediaStyles";
import { openModal } from "@/components/modals/GlobalModalHost";
import ImageWithFallback from "@/components/ImageWithFallback";
import { CARD_DELAY_AFTER_HEADER } from "@/components/motion";
import Reveal from "@/components/Reveal";
import EnterpriseBulletList from "@/components/ui/EnterpriseBulletList";
import type { TeamMember } from "@/types/content";

interface TeamGridProps {
  members: TeamMember[];
}

export default function TeamGrid({ members }: TeamGridProps) {
  const openBio = (member: TeamMember) => {
    void openModal("teamBio", {
      badgeText: member.role,
      title: member.name,
      body: member.bio,
      listItems: member.achievements,
      listItemKeyPrefix: member.id,
      ariaLabel: `${member.name} bio`,
      closeButtonAriaLabel: "Close bio modal"
    });
  };

  return (
    <div className="grid items-stretch gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {members.map((member, index) => (
        <Reveal
          key={member.id}
          delay={CARD_DELAY_AFTER_HEADER + index * 0.05}
          variant="fadeUp"
          className="h-full"
        >
          <Card className="flex h-full flex-col overflow-hidden">
            <div
              className="media-pop-shell relative h-72 w-full overflow-hidden"
              data-team-media-wrapper="1"
              style={{ borderColor: "transparent", boxShadow: "none" }}
            >
              <div aria-hidden="true" className={TEAM_MEDIA_BACKGROUND_CLASS} style={TEAM_MEDIA_FADE_STYLE} />
              <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center">
                <ImageWithFallback
                  src={member.imageSrc}
                  alt={`${member.name} headshot`}
                  width={720}
                  height={920}
                  className={TEAM_MEDIA_OVERLAY_SIZE_CLASS}
                />
              </div>
            </div>

            <div className="flex flex-1 flex-col p-6">
              <p className="tier-chip mb-3 w-fit">{member.role}</p>
              <h3 className="font-heading text-xl">{member.name}</h3>
              <EnterpriseBulletList
                items={member.achievements.slice(0, 3)}
                className="mt-3"
                itemKeyPrefix={member.id}
              />
              <div className="mt-auto">
                <button
                  className={buttonClasses({ variant: "gold", size: "md", className: "mt-5" })}
                  onClick={() => openBio(member)}
                >
                  View Bio
                </button>
              </div>
            </div>
          </Card>
        </Reveal>
      ))}
    </div>
  );
}
