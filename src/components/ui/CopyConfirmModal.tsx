"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import {
  backdropVariants,
  modalTransition,
  panelVariants,
  reducedBackdropVariants,
  reducedModalTransition,
  reducedPanelVariants,
} from "@/components/motion/modalVariants";

interface CopyConfirmModalProps {
  open: boolean;
  message: string;
  onCloseComplete?: () => void;
}

export default function CopyConfirmModal({
  open,
  message,
  onCloseComplete,
}: CopyConfirmModalProps) {
  const prefersReducedMotion = useReducedMotion();
  const overlayMotionVariants = prefersReducedMotion
    ? reducedBackdropVariants
    : backdropVariants;
  const panelMotionVariants = prefersReducedMotion
    ? reducedPanelVariants
    : panelVariants;
  const activeTransition = prefersReducedMotion
    ? reducedModalTransition
    : modalTransition;

  return (
    <AnimatePresence onExitComplete={onCloseComplete}>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
          variants={overlayMotionVariants}
          initial="closed"
          animate="open"
          exit="closed"
          transition={activeTransition}
          aria-hidden
        >
          <motion.div
            className="card-pro card-glow-rest gradient-border card-pad-default relative w-full max-w-xl"
            variants={panelMotionVariants}
            initial="closed"
            animate="open"
            exit="closed"
            transition={activeTransition}
            role="status"
            aria-live="polite"
          >
            <div className="flex flex-col items-center text-center">
              <CheckCircle2
                className="h-[72px] w-[72px] text-[var(--obsidian-purple)] drop-shadow-[0_0_18px_rgba(58,12,163,0.45)]"
                strokeWidth={1.9}
              />
              <p className="type-subtitle mt-5 max-w-[34ch]">{message}</p>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
