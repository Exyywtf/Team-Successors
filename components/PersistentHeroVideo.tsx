"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { usePathname } from "next/navigation";

let HERO_HAS_LOADED_ONCE = false;

export default function PersistentHeroVideo() {
  const pathname = usePathname();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [ready, setReady] = useState(HERO_HAS_LOADED_ONCE);

  const isHome = pathname === "/";

  // 1. Using strict rgba() instead of "transparent" fixes cross-browser hard lines.
  // 2. Ending at 95% ensures it hits true zero opacity *before* the container ends.
  const heroMediaMaskStyle: CSSProperties = {
    maskImage: "linear-gradient(to bottom, rgba(0,0,0,1) 50%, rgba(0,0,0,0) 95%)",
    WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,1) 50%, rgba(0,0,0,0) 95%)",
    transform: "translateZ(0)",
  };

  const handlePlaying = () => {
    if (!ready) {
      setReady(true);
      HERO_HAS_LOADED_ONCE = true;
    }
  };

  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    videoElement.muted = true;
    videoElement.playsInline = true;

    if (videoElement.currentTime > 0 && !videoElement.paused) {
      handlePlaying();
    }

    const playPromise = videoElement.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {});
    }
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute left-0 top-0 w-full overflow-hidden"
      style={{
        zIndex: 0,
        height: "clamp(850px, 100vh, 1175px)", // Matches hero section height
        opacity: isHome ? 1 : 0,
        transition: "opacity 600ms ease-out", // Smooth fade in/out on route change
        // We use visibility hidden when not home to avoid potential GPU usage/painting when not needed,
        // but we need to wait for transition. For now, simple opacity is safest for 'purity' of transition.
        pointerEvents: "none",
      }}
    >
      <div
        data-hero-bg-stack
        className="absolute inset-0 left-1/2 -translate-x-1/2 w-screen h-full"
        style={heroMediaMaskStyle}
      >
        {/* Because the mask is on the parent, this matte background now fades out too */}
        <div data-hero-matte className="absolute inset-0 bg-[#050505]" />

        <div
          data-hero-media-wrapper
          className="absolute inset-x-0 top-0 h-full overflow-hidden"
        >
          <img
            src="/brand/hero.jpg"
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
          />

          <video
            ref={videoRef}
            className="absolute inset-0 h-full w-full object-cover"
            style={{
              opacity: ready ? 1 : 0,
              willChange: "opacity",
              transition: "opacity 600ms ease-out",
            }}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster="/brand/hero.jpg"
            disablePictureInPicture
            controls={false}
            tabIndex={-1}
            onPlaying={handlePlaying}
          >
            <source src="/brand/hero.webm" type="video/webm" />
            <source src="/brand/hero.mp4" type="video/mp4" />
          </video>
        </div>
      </div>
    </div>
  );
}
