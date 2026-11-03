import React from 'react';

/**
 * Aesthetic skeleton loader for product listing grid
 */
export function ProductGridSkeleton({ count = 8 }) {
  const items = Array.from({ length: count }, (_, index) => index);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-7 animate-pulse">
      {items.map((i) => (
        <div
          key={i}
          className="bg-white rounded-2xl border border-[#D8C8B5]/50 p-5 flex flex-col h-[420px] shadow-xs"
        >
          {/* Image placeholder */}
          <div className="w-full h-64 bg-[#F7F5F0] rounded-xl mb-4 border border-[#D8C8B5]/20" />

          {/* Meta placeholder */}
          <div className="flex justify-between mb-2">
            <div className="h-3 w-16 bg-[#D8C8B5]/40 rounded-full" />
            <div className="h-3 w-12 bg-[#D8C8B5]/40 rounded-full" />
          </div>

          {/* Title placeholder */}
          <div className="h-4 w-4/5 bg-[#D8C8B5]/50 rounded-md mb-2" />
          <div className="h-4 w-3/5 bg-[#D8C8B5]/40 rounded-md mb-4" />

          {/* Rating placeholder */}
          <div className="h-4 w-20 bg-[#D8C8B5]/30 rounded-full mb-4" />

          {/* Price placeholder */}
          <div className="mt-auto pt-3 border-t border-[#D8C8B5]/30 flex items-center justify-between">
            <div className="h-6 w-20 bg-[#D8C8B5]/50 rounded-md" />
          </div>

          {/* Button placeholder */}
          <div className="h-9 w-full bg-[#202522]/10 rounded-xl mt-3" />
        </div>
      ))}
    </div>
  );
}

/**
 * Aesthetic skeleton loader for product details page
 */
export function ProductDetailsSkeleton() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-pulse">
      {/* Back button skeleton */}
      <div className="h-8 w-36 bg-[#D8C8B5]/40 rounded-xl mb-6" />

      {/* Main two-column skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-12">
        {/* Gallery column */}
        <div className="lg:col-span-6 space-y-4">
          <div className="w-full h-[520px] bg-white border border-[#D8C8B5]/50 rounded-3xl" />
          <div className="flex gap-3">
            <div className="w-20 h-20 bg-white border border-[#D8C8B5]/40 rounded-xl" />
            <div className="w-20 h-20 bg-white border border-[#D8C8B5]/40 rounded-xl" />
            <div className="w-20 h-20 bg-white border border-[#D8C8B5]/40 rounded-xl" />
          </div>
        </div>

        {/* Info column */}
        <div className="lg:col-span-6 space-y-5">
          <div className="h-4 w-28 bg-[#D8C8B5]/40 rounded-full" />
          <div className="h-10 w-4/5 bg-[#D8C8B5]/60 rounded-lg" />
          <div className="h-6 w-36 bg-[#D8C8B5]/40 rounded-full" />
          <div className="h-12 w-48 bg-[#D8C8B5]/50 rounded-lg my-6" />
          <div className="h-28 w-full bg-white border border-[#D8C8B5]/40 rounded-2xl" />
          <div className="h-14 w-full bg-[#202522]/20 rounded-2xl mt-6" />
        </div>
      </div>

      {/* Specs skeleton */}
      <div className="h-72 bg-white border border-[#D8C8B5]/40 rounded-3xl mb-8" />
    </div>
  );
}

export default function Loading({ message = 'Loading curated collection...' }) {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <div className="w-9 h-9 border-2 border-[#202522] border-t-transparent rounded-full animate-spin mb-4" />
      <p className="text-[#202522]/70 text-xs font-medium uppercase tracking-widest">{message}</p>
    </div>
  );
}
