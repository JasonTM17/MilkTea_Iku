import { create } from "zustand";

export type ToastType = "success" | "error" | "info" | "warning";

export interface Toast {
  id: string;
  type: ToastType;
  message: string;
  duration: number;
}

interface ToastStore {
  toasts: Toast[];
  addToast: (payload: Omit<Toast, "id">) => string;
  removeToast: (id: string) => void;
}

export const useToastStore = create<ToastStore>((set) => ({
  toasts: [],

  addToast: (payload) => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
    const duration = payload.duration ?? 3000;

    set((state) => ({
      toasts: [...state.toasts, { ...payload, id, duration }],
    }));

    setTimeout(() => {
      set((state) => ({
        toasts: state.toasts.filter((t) => t.id !== id),
      }));
    }, duration);

    return id;
  },

  removeToast: (id) =>
    set((state) => ({
      toasts: state.toasts.filter((t) => t.id !== id),
    })),
}));

// Convenience hook — mirrors the react-hot-toast API surface
export function useToast() {
  const { addToast, removeToast } = useToastStore();

  return {
    success: (message: string, duration = 3000) =>
      addToast({ type: "success", message, duration }),
    error: (message: string, duration = 3000) =>
      addToast({ type: "error", message, duration }),
    info: (message: string, duration = 3000) =>
      addToast({ type: "info", message, duration }),
    warning: (message: string, duration = 3000) =>
      addToast({ type: "warning", message, duration }),
    dismiss: removeToast,
  };
}
