import React from 'react';
import { useApp } from '../context/AppContext';
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-5 right-5 rtl:right-auto rtl:left-5 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`pointer-events-auto flex items-center justify-between gap-3 p-3.5 rounded-xl border shadow-xl backdrop-blur-md text-xs font-medium transition-all transform animate-in slide-in-from-top-2 duration-200 ${
            toast.type === 'success'
              ? 'bg-white/95 border-emerald-300 text-emerald-900 shadow-emerald-500/10'
              : toast.type === 'error'
              ? 'bg-white/95 border-red-300 text-red-900 shadow-red-500/10'
              : 'bg-white/95 border-[#E8DEC8] text-[#2D241E] shadow-[#C9A45C]/15'
          }`}
        >
          <div className="flex items-center gap-2.5">
            {toast.type === 'success' && <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />}
            {toast.type === 'error' && <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />}
            {toast.type === 'info' && <Info className="w-4 h-4 text-[#8C6B28] shrink-0" />}
            <span>{toast.message}</span>
          </div>
          <button
            onClick={() => removeToast(toast.id)}
            className="p-1 text-[#7A6E63] hover:text-[#2D241E] transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ))}
    </div>
  );
};
