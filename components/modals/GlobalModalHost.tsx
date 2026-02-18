"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
  globalModalBackdropVariants,
  globalModalPanelVariants,
  globalModalTransition,
  reducedGlobalModalTransition
} from "@/components/motion/globalModalVariants";
import ToastCheckmarkLottie from "@/components/toast/ToastCheckmarkLottie";
import EnterpriseBulletList from "@/components/ui/EnterpriseBulletList";

const COPY_MODAL_VISIBLE_MS = 2000;
const COPY_MODAL_OPEN_DELAY_MS = 500;

interface DetailModalPayload {
  badgeText: string;
  title: string;
  body: string;
  ariaLabel: string;
  closeButtonAriaLabel: string;
  listItems?: string[];
  listItemKeyPrefix?: string;
}

interface CopyToastModalPayload {
  message: string;
  copyText: string;
  pendingUrl: string;
  onBeforeOpen?: () => void;
  onCloseComplete?: () => void;
}

interface ModalPayloadMap {
  teamBio: DetailModalPayload;
  sponsorDetail: DetailModalPayload;
  copyToast: CopyToastModalPayload;
}

type ModalType = keyof ModalPayloadMap;

type ActiveModal =
  | { type: "teamBio"; payload: DetailModalPayload }
  | { type: "sponsorDetail"; payload: DetailModalPayload }
  | { type: "copyToast"; payload: CopyToastModalPayload };

type ModalCommand = { kind: "open"; modal: ActiveModal } | { kind: "close" };
type ModalListener = (command: ModalCommand) => void;

type PendingCopyAction = {
  url: string;
  onBeforeOpen?: () => void;
  onCloseComplete?: () => void;
};

const listeners = new Set<ModalListener>();

function emit(command: ModalCommand) {
  listeners.forEach((listener) => listener(command));
}

async function copyTextToClipboard(text: string) {
  if (typeof navigator === "undefined" || typeof document === "undefined") {
    return;
  }

  if (navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      return;
    } catch {
      // Fallback below.
    }
  }

  let textarea: HTMLTextAreaElement | null = null;

  try {
    textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.setAttribute("readonly", "");
    textarea.style.position = "fixed";
    textarea.style.top = "0";
    textarea.style.left = "0";
    textarea.style.width = "1px";
    textarea.style.height = "1px";
    textarea.style.opacity = "0";
    textarea.style.pointerEvents = "none";
    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();
    textarea.setSelectionRange(0, textarea.value.length);
    document.execCommand("copy");
  } finally {
    if (textarea?.parentNode) {
      textarea.parentNode.removeChild(textarea);
    }
  }
}

export async function openModal<T extends ModalType>(type: T, payload: ModalPayloadMap[T]) {
  if (type === "copyToast") {
    await copyTextToClipboard((payload as ModalPayloadMap["copyToast"]).copyText);
  }

  emit({
    kind: "open",
    modal: {
      type,
      payload
    } as ActiveModal
  });
}

export function closeModal() {
  emit({ kind: "close" });
}

export default function GlobalModalHost() {
  const [mounted, setMounted] = useState(false);
  const [activeModal, setActiveModal] = useState<ActiveModal | null>(null);
  const [toastOpenCount, setToastOpenCount] = useState(0);
  const autoCloseTimerRef = useRef<number | null>(null);
  const openAfterCloseTimerRef = useRef<number | null>(null);
  const pendingCopyActionRef = useRef<PendingCopyAction | null>(null);
  const prefersReducedMotion = useReducedMotion();
  const activeTransition = prefersReducedMotion ? reducedGlobalModalTransition : globalModalTransition;
  const backdropVariants = globalModalBackdropVariants;
  const panelVariants = globalModalPanelVariants;

  const clearTimers = () => {
    if (autoCloseTimerRef.current !== null) {
      window.clearTimeout(autoCloseTimerRef.current);
      autoCloseTimerRef.current = null;
    }

    if (openAfterCloseTimerRef.current !== null) {
      window.clearTimeout(openAfterCloseTimerRef.current);
      openAfterCloseTimerRef.current = null;
    }
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) {
      return;
    }

    const listener: ModalListener = (command) => {
      clearTimers();

      if (command.kind === "close") {
        pendingCopyActionRef.current = null;
        setActiveModal(null);
        return;
      }

      const modal = command.modal;
      setActiveModal(modal);

      if (modal.type === "copyToast") {
        setToastOpenCount((value) => value + 1);
        pendingCopyActionRef.current = {
          url: modal.payload.pendingUrl,
          onBeforeOpen: modal.payload.onBeforeOpen,
          onCloseComplete: modal.payload.onCloseComplete
        };
        autoCloseTimerRef.current = window.setTimeout(() => {
          setActiveModal((current) => (current?.type === "copyToast" ? null : current));
          autoCloseTimerRef.current = null;
        }, COPY_MODAL_VISIBLE_MS);
      } else {
        pendingCopyActionRef.current = null;
      }
    };

    listeners.add(listener);

    return () => {
      listeners.delete(listener);
      clearTimers();
    };
  }, [mounted]);

  useEffect(() => {
    if (!activeModal) {
      return;
    }

    const previousHtmlOverflow = document.documentElement.style.overflow;
    const previousOverflow = document.body.style.overflow;
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";

    return () => {
      document.documentElement.style.overflow = previousHtmlOverflow;
      document.body.style.overflow = previousOverflow;
    };
  }, [activeModal]);

  useEffect(() => {
    if (!activeModal || activeModal.type === "copyToast") {
      return;
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveModal(null);
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [activeModal]);

  const handleCloseRequest = () => {
    setActiveModal(null);
  };

  const handleExitComplete = () => {
    if (!pendingCopyActionRef.current) {
      return;
    }

    const pendingAction = pendingCopyActionRef.current;
    pendingCopyActionRef.current = null;
    pendingAction.onCloseComplete?.();

    openAfterCloseTimerRef.current = window.setTimeout(() => {
      pendingAction.onBeforeOpen?.();
      window.open(pendingAction.url, "_blank", "noopener,noreferrer");
      openAfterCloseTimerRef.current = null;
    }, COPY_MODAL_OPEN_DELAY_MS);
  };

  if (!mounted || typeof document === "undefined") {
    return null;
  }

  return createPortal(
    <AnimatePresence mode="wait" onExitComplete={handleExitComplete}>
      {activeModal ? (
        <div
          key={activeModal.type}
          className="modal-overlay-root"
        >
          <motion.div
            className="modal-backdrop"
            variants={backdropVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={activeTransition}
            onClick={activeModal.type === "copyToast" ? undefined : handleCloseRequest}
          />
          <div className="modal-center-wrap">
            {activeModal.type === "copyToast" ? (
              <motion.div
                className="modal-toast-card modal-detail-card card-pro card-glow-rest gradient-border card-pad-default pointer-events-auto"
                variants={panelVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={activeTransition}
                role="status"
                aria-live="polite"
                onClick={(event) => event.stopPropagation()}
              >
                <div className="flex flex-col items-center text-center">
                  <motion.div
                    className="-mt-1 mb-1 flex h-24 w-24 items-center justify-center rounded-full max-[411px]:h-20 max-[411px]:w-20 md:h-28 md:w-28"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={activeTransition}
                  >
                    <ToastCheckmarkLottie playKey={toastOpenCount} />
                  </motion.div>
                  <div className="mt-0">
                    <div className="toast-line1 type-subtitle">{activeModal.payload.message}</div>
                    <div className="toast-line2 type-subtitle">Looking forward to hearing from you.</div>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                className="modal-detail-card card-pro card-glow-rest gradient-border card-pad-default pointer-events-auto relative w-full max-w-xl"
                variants={panelVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={activeTransition}
                onClick={(event) => event.stopPropagation()}
                role="dialog"
                aria-modal="true"
                aria-label={activeModal.payload.ariaLabel}
              >
                <button
                  onClick={handleCloseRequest}
                  className="focus-ring absolute right-3 top-3 rounded-md p-2 text-[var(--muted)] transition-colors duration-200 hover:text-main"
                  aria-label={activeModal.payload.closeButtonAriaLabel}
                >
                  <X size={18} />
                </button>
                <p className="tier-chip mb-4 w-fit">{activeModal.payload.badgeText}</p>
                <h3 className="font-heading text-2xl">{activeModal.payload.title}</h3>
                <p className="copy-sm mt-4">{activeModal.payload.body}</p>
                {activeModal.payload.listItems?.length ? (
                  <EnterpriseBulletList
                    items={activeModal.payload.listItems}
                    className="mt-5"
                    itemKeyPrefix={activeModal.payload.listItemKeyPrefix ?? "detail-item"}
                  />
                ) : null}
              </motion.div>
            )}
          </div>
        </div>
      ) : null}
    </AnimatePresence>,
    document.body
  );
}
