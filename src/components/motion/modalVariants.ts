import type { Transition, Variants } from "framer-motion";
import { easeOutCubic } from "@/lib/motion";

export const modalDuration = 0.34;
export const modalEase = easeOutCubic;
export const modalTransition: Transition = {
  duration: modalDuration,
  ease: modalEase,
};
export const reducedModalTransition: Transition = {
  duration: 0.18,
};

const panelClosedState = { opacity: 0, y: 20, scale: 0.98 };
const panelOpenState = { opacity: 1, y: 0, scale: 1 };
const backdropClosedState = { opacity: 0 };
const backdropOpenState = { opacity: 1 };

export const backdropVariants: Variants = {
  closed: backdropClosedState,
  open: backdropOpenState,
};

export const panelVariants: Variants = {
  closed: panelClosedState,
  open: panelOpenState,
};

export const reducedBackdropVariants: Variants = {
  closed: backdropClosedState,
  open: backdropOpenState,
};

export const reducedPanelVariants: Variants = {
  closed: panelClosedState,
  open: panelOpenState,
};
