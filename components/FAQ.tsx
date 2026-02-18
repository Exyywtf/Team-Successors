"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useId, useState } from "react";
import Card from "@/components/Card";
import { easeOutExpo } from "@/components/motion";
import { cn } from "@/lib/utils";
import type { FaqItem } from "@/types/content";

interface FAQProps {
  items: FaqItem[];
  cardClassName?: string;
}

export default function FAQ({ items, cardClassName }: FAQProps) {
  const prefersReducedMotion = useReducedMotion();
  const baseId = useId().replace(/[:]/g, "");
  const [openItems, setOpenItems] = useState<Record<number, boolean>>({});

  return (
    <div className="space-y-3">
      {items.map((item, index) => {
        const isOpen = Boolean(openItems[index]);
        const triggerId = `${baseId}-faq-trigger-${index}`;
        const panelId = `${baseId}-faq-panel-${index}`;

        return (
          <Card
            key={item.question}
            className={cn("card-pad-compact", cardClassName)}
            hover={false}
          >
            <div className="group">
              <button
                id={triggerId}
                type="button"
                className="focus-ring w-full cursor-pointer text-left font-heading text-lg"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => {
                  setOpenItems((current) => ({
                    ...current,
                    [index]: !current[index],
                  }));
                }}
              >
                {item.question}
              </button>

              {prefersReducedMotion ? (
                isOpen ? (
                  <div id={panelId} role="region" aria-labelledby={triggerId}>
                    <p className="copy-sm mt-3">{item.answer}</p>
                  </div>
                ) : null
              ) : (
                <AnimatePresence initial={false}>
                  {isOpen ? (
                    <motion.div
                      key={panelId}
                      id={panelId}
                      role="region"
                      aria-labelledby={triggerId}
                      initial={{ height: 0, opacity: 0, y: 6 }}
                      animate={{ height: "auto", opacity: 1, y: 0 }}
                      exit={{ height: 0, opacity: 0, y: 4 }}
                      transition={{
                        height: { duration: 0.34, ease: easeOutExpo },
                        opacity: { duration: 0.26, ease: easeOutExpo },
                        y: { duration: 0.34, ease: easeOutExpo },
                      }}
                      className="overflow-hidden"
                      style={{ willChange: "height, opacity" }}
                    >
                      <p className="copy-sm mt-3">{item.answer}</p>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              )}
            </div>
          </Card>
        );
      })}
    </div>
  );
}
