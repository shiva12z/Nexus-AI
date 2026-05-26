"use client";

import { createContext, useCallback, useContext, useState, type ReactNode } from "react";
import { CheckCircle, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type Toast = { id: number; message: string };

type ToastContextValue = {
  showToast: (message: string) => void;
};

const ToastContext = createContext<ToastContextValue | null>(null);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((message: string) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3200);
  }, []);

  const dismiss = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <motion.div
        aria-live="polite"
        style={{
          position: "fixed",
          bottom: 24,
          right: 24,
          zIndex: 9999,
          display: "flex",
          flexDirection: "column",
          gap: 10,
          pointerEvents: "none",
        }}
      >
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 16, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.96 }}
              transition={{ duration: 0.22 }}
              style={{
                pointerEvents: "auto",
                display: "flex",
                alignItems: "center",
                gap: 12,
                background: "rgba(12,12,24,0.98)",
                border: "1px solid rgba(16,185,129,0.35)",
                borderRadius: 12,
                padding: "12px 16px",
                boxShadow: "0 12px 40px rgba(0,0,0,0.45)",
                minWidth: 260,
                maxWidth: 360,
              }}
            >
              <CheckCircle size={18} color="#10b981" style={{ flexShrink: 0 }} />
              <span style={{ flex: 1, fontSize: 13.5, fontWeight: 500, color: "#f0f0ff" }}>
                {toast.message}
              </span>
              <button
                onClick={() => dismiss(toast.id)}
                aria-label="Dismiss"
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: 2,
                  display: "flex",
                  color: "rgba(240,240,255,0.4)",
                }}
              >
                <X size={14} />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}
