"use client";

import { DotLottieReact, type DotLottie } from "@lottiefiles/dotlottie-react";
import { useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

const LOCAL_TOAST_CHECKMARK_SRC = "/brand/toast-checkmark.lottie";
const REMOTE_TOAST_CHECKMARK_SRC =
  "https://lottie.host/fc0722c6-7886-46d1-a909-33f0d8453a01/SjZrjPeXzy.lottie";
const PLAY_DURATION_MS = 1900;

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function easeInOutSine(progress: number) {
  return -(Math.cos(Math.PI * progress) - 1) / 2;
}

interface ToastCheckmarkLottieProps {
  playKey: number;
}

export default function ToastCheckmarkLottie({
  playKey,
}: ToastCheckmarkLottieProps) {
  const dotLottieRef = useRef<DotLottie | null>(null);
  const rafIdRef = useRef<number | null>(null);
  const pendingPlayKeyRef = useRef<number | null>(null);
  const lastPlayedKeyRef = useRef<number>(-1);
  const usedRemoteFallbackRef = useRef(false);
  const prefersReducedMotion = useReducedMotion();
  const [src, setSrc] = useState(LOCAL_TOAST_CHECKMARK_SRC);

  const className = useMemo(() => "h-full w-full", []);

  const clearRaf = useCallback(() => {
    if (rafIdRef.current !== null) {
      window.cancelAnimationFrame(rafIdRef.current);
      rafIdRef.current = null;
    }
  }, []);

  const playWithScrub = useCallback(
    (targetPlayKey: number) => {
      const dotLottie = dotLottieRef.current;

      if (!dotLottie || !dotLottie.isLoaded) {
        return;
      }

      if (lastPlayedKeyRef.current === targetPlayKey) {
        return;
      }

      lastPlayedKeyRef.current = targetPlayKey;
      clearRaf();

      const totalFrames = Number.isFinite(dotLottie.totalFrames)
        ? dotLottie.totalFrames
        : 0;
      const lastFrame = Math.max(0, Math.floor(totalFrames) - 1);

      dotLottie.setLoop(false);
      dotLottie.setUseFrameInterpolation(true);
      dotLottie.unfreeze();
      dotLottie.pause();
      dotLottie.setFrame(0);

      if (prefersReducedMotion) {
        dotLottie.setFrame(lastFrame);
        dotLottie.pause();
        dotLottie.freeze();
        return;
      }

      const startTime = performance.now();

      const animate = (timestamp: number) => {
        const progress = clamp(
          (timestamp - startTime) / PLAY_DURATION_MS,
          0,
          1,
        );
        const eased = easeInOutSine(progress);
        const frame = eased * lastFrame;
        dotLottie.setFrame(frame);

        if (progress < 1) {
          rafIdRef.current = window.requestAnimationFrame(animate);
          return;
        }

        dotLottie.setFrame(lastFrame);
        dotLottie.pause();
        dotLottie.freeze();
        rafIdRef.current = null;
      };

      rafIdRef.current = window.requestAnimationFrame(animate);
    },
    [clearRaf, prefersReducedMotion],
  );

  const handleLoad = useCallback(() => {
    if (pendingPlayKeyRef.current === null) {
      return;
    }

    playWithScrub(pendingPlayKeyRef.current);
  }, [playWithScrub]);

  const handleLoadError = useCallback(() => {
    if (usedRemoteFallbackRef.current) {
      return;
    }

    usedRemoteFallbackRef.current = true;
    setSrc(REMOTE_TOAST_CHECKMARK_SRC);
  }, []);

  const dotLottieRefCallback = useCallback(
    (instance: DotLottie | null) => {
      if (dotLottieRef.current === instance) {
        return;
      }

      if (dotLottieRef.current) {
        dotLottieRef.current.removeEventListener("load", handleLoad);
        dotLottieRef.current.removeEventListener("loadError", handleLoadError);
      }

      dotLottieRef.current = instance;

      if (!instance) {
        return;
      }

      instance.addEventListener("load", handleLoad);
      instance.addEventListener("loadError", handleLoadError);

      if (instance.isLoaded) {
        handleLoad();
      }
    },
    [handleLoad, handleLoadError],
  );

  useEffect(() => {
    pendingPlayKeyRef.current = playKey;

    if (dotLottieRef.current?.isLoaded) {
      playWithScrub(playKey);
    }
  }, [playKey, playWithScrub]);

  useEffect(() => {
    return () => {
      clearRaf();

      if (dotLottieRef.current) {
        dotLottieRef.current.removeEventListener("load", handleLoad);
        dotLottieRef.current.removeEventListener("loadError", handleLoadError);
      }

      dotLottieRef.current = null;
    };
  }, [clearRaf, handleLoad, handleLoadError]);

  return (
    <DotLottieReact
      src={src}
      autoplay={false}
      loop={false}
      className={className}
      dotLottieRefCallback={dotLottieRefCallback}
      aria-hidden="true"
    />
  );
}
