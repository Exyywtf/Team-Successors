import type { Transition, Variants } from "framer-motion";
import { easeOutCubic } from "@/lib/motion";

export const globalModalDuration = 0.34;
export const globalModalBackdropBlurPx = 8;
export const globalModalEase = easeOutCubic;

export const globalModalTransition: Transition = {
  duration: globalModalDuration,
  ease: globalModalEase,
};

export const reducedGlobalModalTransition: Transition = {
  duration: 0.18,
};

export const globalModalPanelVariants = {
  initial: { opacity: 0, y: 20, scale: 0.98 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: 20, scale: 0.98 },
} as Variants;

export const globalModalBackdropVariants = {
  initial: {
    opacity: 0,
    backdropFilter: `blur(${globalModalBackdropBlurPx}px)`,
    WebkitBackdropFilter: `blur(${globalModalBackdropBlurPx}px)`,
  },
  animate: {
    opacity: 1,
    backdropFilter: `blur(${globalModalBackdropBlurPx}px)`,
    WebkitBackdropFilter: `blur(${globalModalBackdropBlurPx}px)`,
  },
  exit: {
    opacity: 0,
    backdropFilter: `blur(${globalModalBackdropBlurPx}px)`,
    WebkitBackdropFilter: `blur(${globalModalBackdropBlurPx}px)`,
  },
} as Variants;
