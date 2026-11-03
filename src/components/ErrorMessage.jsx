import React from 'react';
import { Link } from 'react-router-dom';
import { AlertCircle, RotateCcw, ArrowLeft } from 'lucide-react';

export default function ErrorMessage({
  title = 'Something went wrong',
  message = 'Unable to load products. Please try again.',
  onRetry,
  showBackHome = false,
  backHomeText = 'Back to Collection'
}) {
  return (
    <div className="max-w-lg mx-auto my-12 p-8 sm:p-10 bg-white border border-[#D8C8B5]/80 rounded-3xl shadow-xs text-center">
      <div className="w-12 h-12 bg-[#F7F5F0] text-[#78917E] rounded-full flex items-center justify-center mx-auto mb-4 border border-[#D8C8B5]/40">
        <AlertCircle className="w-6 h-6" />
      </div>

      <h3 className="font-serif text-2xl font-normal text-[#202522] mb-2">{title}</h3>
      <p className="text-sm text-[#202522]/70 mb-8 leading-relaxed max-w-sm mx-auto">{message}</p>

      <div className="flex flex-wrap items-center justify-center gap-3">
        {onRetry && (
          <button
            onClick={onRetry}
            className="inline-flex items-center gap-2 bg-[#202522] hover:bg-[#78917E] text-[#F7F5F0] font-semibold text-xs uppercase tracking-wider py-3 px-6 rounded-xl transition-colors cursor-pointer shadow-xs"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Try Again</span>
          </button>
        )}

        {showBackHome && (
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-[#F7F5F0] hover:bg-[#EDE5DA] text-[#202522] font-semibold text-xs uppercase tracking-wider py-3 px-6 rounded-xl transition-colors cursor-pointer border border-[#D8C8B5]/60"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>{backHomeText}</span>
          </Link>
        )}
      </div>
    </div>
  );
}
