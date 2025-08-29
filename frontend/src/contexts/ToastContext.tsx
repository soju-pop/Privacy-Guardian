import { createContext, useContext, useState } from "@lynx-js/react";
import type { ReactNode } from "@lynx-js/react";

export interface ToastOptions {
  message: string;
  duration?: number;
  style?: any;
  background?: string;
}

interface ToastContextType {
  showToast: (options: ToastOptions) => void;
  hideToast: () => void;
  toast: ToastOptions | null;
  isVisible: boolean;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toast, setToast] = useState<ToastOptions | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  function showToast(options: ToastOptions) {
    setToast(options);
    setIsVisible(true);

    // Auto-hide after duration (default 3 seconds)
    const duration = options.duration || 3000;
    setTimeout(() => {
      hideToast();
    }, duration);
  }

  function hideToast() {
    setIsVisible(false);
    // Clear toast after animation
    setTimeout(() => {
      setToast(null);
    }, 300);
  }

  return (
    <ToastContext.Provider value={{ showToast, hideToast, toast, isVisible }}>
      {children}
    </ToastContext.Provider>
  );
}
