"use client";

import { AnimatePresence, motion } from "motion/react";
import { ReactNode, useEffect, useRef } from "react";
import { X } from "lucide-react";

export function Modal({
  open,
  onClose,
  children,
  labelledBy,
  headerLabel = "decrypt · file",
}: {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  labelledBy: string;
  headerLabel?: string;
}) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    document.documentElement.classList.add("modal-open");
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    panelRef.current?.focus();
    return () => {
      document.documentElement.classList.remove("modal-open");
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-end justify-center bg-bg/80 backdrop-blur-sm sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22 }}
          onClick={onClose}
        >
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={labelledBy}
            tabIndex={-1}
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, y: 20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 14, scale: 0.98 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex max-h-[92vh] w-full max-w-2xl flex-col rounded-t-2xl border border-line bg-surface shadow-[0_30px_80px_-20px_rgba(0,0,0,0.7)] sm:rounded-2xl"
          >
            {/* Sticky header */}
            <div className="flex shrink-0 items-center justify-between border-b border-line px-5 py-3 sm:px-7">
              <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
                {headerLabel}
              </span>
              <button
                onClick={onClose}
                aria-label="Close"
                data-cursor="lock"
                className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-line bg-surface-2 text-muted transition-colors hover:border-accent/50 hover:text-text"
              >
                <X size={15} strokeWidth={2} aria-hidden />
              </button>
            </div>

            {/* Scrollable body */}
            <div className="overflow-y-auto overscroll-contain">
              {children}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
