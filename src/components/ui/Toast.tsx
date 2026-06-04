import { useEffect, useState } from 'react';
import { cn } from '../../utils/cn';

export type ToastType = 'success' | 'error' | 'info';

interface ToastItem {
  id: number;
  message: string;
  type: ToastType;
}

let toastId = 0;
const listeners: Array<(toast: ToastItem) => void> = [];

export function showToast(message: string, type: ToastType = 'info') {
  const toast: ToastItem = { id: ++toastId, message, type };
  listeners.forEach((fn) => fn(toast));
}

export function useToast() {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const [leavingIds, setLeavingIds] = useState<Set<number>>(new Set());

  useEffect(() => {
    const handler = (toast: ToastItem) => {
      setToasts((prev) => [...prev, toast]);
      // Start leave animation after 2.8s, remove after 3s
      setTimeout(() => {
        setLeavingIds((prev) => new Set(prev).add(toast.id));
      }, 2800);
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== toast.id));
        setLeavingIds((prev) => {
          const next = new Set(prev);
          next.delete(toast.id);
          return next;
        });
      }, 3000);
    };
    listeners.push(handler);
    return () => {
      const idx = listeners.indexOf(handler);
      if (idx >= 0) listeners.splice(idx, 1);
    };
  }, []);

  return { toasts, leavingIds };
}

const typeClasses: Record<ToastType, string> = {
  success: 'bg-emerald-50 border-emerald-200 text-emerald-800',
  error: 'bg-red-50 border-red-200 text-red-800',
  info: 'bg-primary-50 border-primary-200 text-primary-800',
};

const typeIcons: Record<ToastType, string> = {
  success: '✅',
  error: '❌',
  info: 'ℹ️',
};

export function ToastContainer() {
  const { toasts, leavingIds } = useToast();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-2 pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={cn(
            'px-4 py-3 rounded-xl border shadow-lg text-sm font-medium pointer-events-auto',
            leavingIds.has(toast.id) ? 'animate-slide-out' : 'animate-slide-in',
            typeClasses[toast.type]
          )}
        >
          <span className="mr-2">{typeIcons[toast.type]}</span>
          {toast.message}
        </div>
      ))}
    </div>
  );
}
