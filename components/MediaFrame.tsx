"use client";

import Card from "@/components/Card";
import ImageWithFallback from "@/components/ImageWithFallback";
import { cn } from "@/lib/utils";

interface MediaFrameProps {
  alt: string;
  imageSrc?: string;
  videoMp4Src?: string;
  videoWebmSrc?: string;
  posterSrc?: string;
  className?: string;
  mediaClassName?: string;
  sizes?: string;
}

export default function MediaFrame({
  alt,
  imageSrc,
  videoMp4Src,
  videoWebmSrc,
  posterSrc,
  className,
  mediaClassName,
  sizes = "(min-width: 1024px) 46vw, 100vw",
}: MediaFrameProps) {
  const hasVideo = Boolean(videoMp4Src || videoWebmSrc);
  const resolvedImageSrc = imageSrc ?? posterSrc ?? "/brand/hero.jpg";
  const resolvedPosterSrc = posterSrc ?? resolvedImageSrc;

  return (
    <Card className={cn("group overflow-hidden hover-info-v1", className)} cardType="info">
      <div className="media-pop-shell relative aspect-[16/10] overflow-hidden">
        {hasVideo ? (
          <video
            className={cn("media-pop h-full w-full object-cover", mediaClassName)}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster={resolvedPosterSrc}
            aria-label={alt}
          >
            {videoWebmSrc ? <source src={videoWebmSrc} type="video/webm" /> : null}
            {videoMp4Src ? <source src={videoMp4Src} type="video/mp4" /> : null}
          </video>
        ) : (
          <ImageWithFallback
            src={resolvedImageSrc}
            alt={alt}
            width={1600}
            height={1000}
            className={cn("media-pop h-full w-full object-cover", mediaClassName)}
            sizes={sizes}
            priority={false}
          />
        )}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(58, 12, 163, 0) 20%, rgba(10, 10, 14, 0.52) 66%, rgba(5, 5, 5, 0.82) 100%)",
          }}
        />
      </div>
    </Card>
  );
}
