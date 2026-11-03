import React from 'react';
import { Star, CheckCircle, User } from 'lucide-react';

export default function ReviewCard({ review }) {
  if (!review) return null;

  const { rating, comment, date, reviewerName, reviewerEmail } = review;

  const formattedDate = date
    ? new Date(date).toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      })
    : '';

  return (
    <div className="bg-[#F7F5F0]/60 rounded-2xl border border-[#D8C8B5]/50 p-5 sm:p-6 transition-all hover:bg-[#F7F5F0] hover:border-[#78917E]/50">
      {/* Top: Stars & Date */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-1 text-[#78917E]">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={`w-4 h-4 ${
                star <= (rating || 0)
                  ? 'fill-[#78917E] text-[#78917E]'
                  : 'fill-[#D8C8B5]/40 text-[#D8C8B5]/40'
              }`}
            />
          ))}
          <span className="text-xs font-semibold text-[#202522] ml-1.5">
            {rating ? `${rating}.0` : ''}
          </span>
        </div>

        {formattedDate && (
          <span className="text-xs text-[#202522]/40 tracking-wider">{formattedDate}</span>
        )}
      </div>

      {/* Review Comment */}
      <p className="font-serif text-sm sm:text-base text-[#202522] italic mb-4 leading-relaxed font-normal">
        &ldquo;{comment}&rdquo;
      </p>

      {/* Reviewer Details */}
      <div className="flex items-center gap-3 pt-3 border-t border-[#D8C8B5]/40 text-xs text-[#202522]/60">
        <div className="w-7 h-7 rounded-full bg-white border border-[#D8C8B5]/60 text-[#78917E] flex items-center justify-center font-bold text-xs shadow-2xs">
          {reviewerName ? reviewerName.charAt(0).toUpperCase() : <User className="w-3.5 h-3.5" />}
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2">
          <span className="font-semibold text-[#202522] flex items-center gap-1">
            {reviewerName || 'Verified Collector'}
            <CheckCircle className="w-3.5 h-3.5 text-[#78917E] inline" title="Verified Customer" />
          </span>
          {reviewerEmail && (
            <span className="text-[#202522]/40 text-[11px] truncate max-w-xs">
              {reviewerEmail}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
