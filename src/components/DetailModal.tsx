"use client";

import { motion, useReducedMotion } from "framer-motion";
import { X } from "lucide-react";
import { useEffect, useRef } from "react";
import EnterpriseBulletList from "@/components/ui/EnterpriseBulletList";
import {
  backdropVariants,
  modalTransition,
  panelVariants,
  reducedModalTransition,
  reducedBackdropVariants,
  reducedPanelVariants,
} from "@/components/motion/modalVariants";

interface DetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  onClosedComplete: () => void;
  ariaLabel: string;
  closeButtonAriaLabel: string;
  badgeText: string;
  title: string;
  body: string;
  listItems?: string[];
  listItemKeyPrefix?: string;
}

export default function DetailModal({
  isOpen,
  onClose,
  onClosedComplete,
  ariaLabel,
  closeButtonAriaLabel,
  badgeText,
  title,
  body,
  listItems,
  listItemKeyPrefix = "detail-item",
}: DetailModalProps) {
  const prefersReducedMotion = useReducedMotion();
  const didCloseCompleteRef = useRef(false);
  const overlayMotionVariants = prefersReducedMotion
    ? reducedBackdropVariants
    : backdropVariants;
  const panelMotionVariants = prefersReducedMotion
    ? reducedPanelVariants
    : panelVariants;
  const activeTransition = prefersReducedMotion
    ? reducedModalTransition
    : modalTransition;

  useEffect(() => {
    if (isOpen) {
      didCloseCompleteRef.current = false;
    }
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const handlePanelAnimationComplete = (definition: string | string[]) => {
    if (isOpen || didCloseCompleteRef.current) {
      return;
    }

    const reachedClosed =
      definition === "closed" ||
      (Array.isArray(definition) && definition.includes("closed"));
    if (!reachedClosed) {
      return;
    }

    didCloseCompleteRef.current = true;
    onClosedComplete();
  };

  return (
    <motion.div
      className="fixed inset-0 z-[70] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
      variants={overlayMotionVariants}
      initial="closed"
      animate={isOpen ? "open" : "closed"}
      transition={activeTransition}
      style={{ pointerEvents: isOpen ? "auto" : "none" }}
      onClick={onClose}
    >
      <motion.div
        className="card-pro card-glow-rest gradient-border card-pad-default relative w-full max-w-xl"
        variants={panelMotionVariants}
        initial="closed"
        animate={isOpen ? "open" : "closed"}
        transition={activeTransition}
        onAnimationComplete={handlePanelAnimationComplete}
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={ariaLabel}
      >
        <button
          onClick={onClose}
          className="focus-ring absolute right-3 top-3 rounded-md p-2 text-[var(--muted)] transition-colors duration-200 hover:text-main"
          aria-label={closeButtonAriaLabel}
        >
          <X size={18} />
        </button>

        <p className="tier-chip mb-4 w-fit">{badgeText}</p>
        <h3 className="font-heading text-2xl">{title}</h3>
        <p className="copy-sm mt-4">{body}</p>
        {listItems?.length ? (
          <EnterpriseBulletList
            items={listItems}
            className="mt-5"
            itemKeyPrefix={listItemKeyPrefix}
          />
        ) : null}
      </motion.div>
    </motion.div>
  );
}
