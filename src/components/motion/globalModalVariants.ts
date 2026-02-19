import type { Transition, Variants } from "framer-motion";
import { easeOutCubic } from "@/lib/motion";

export const globalModalDuration = 0.28;
export const globalModalEase = easeOutCubic;
export const globalModalBackdropEase: [number, number, number, number] = [
  0.33, 0, 0.67, 1,
];
export const globalModalBackdropDuration = 0.42;

export const globalModalTransition: Transition = {
  duration: globalModalDuration,
  ease: globalModalEase,
};

export const globalModalBackdropTransition: Transition = {
  duration: globalModalBackdropDuration,
  ease: globalModalBackdropEase,
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
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
} as Variants;
