import React from 'react';
import ProductCard from './ProductCard';
import { Sparkles, RotateCcw } from 'lucide-react';

export default function ProductGrid({
  products = [],
  onResetFilters,
  hasActiveFilters = false
}) {
  if (products.length === 0) {
    return (
      <div className="bg-white rounded-3xl border border-[#D8C8B5]/60 p-12 sm:p-16 text-center max-w-xl mx-auto my-12 shadow-xs">
        <div className="w-14 h-14 bg-[#F7F5F0] text-[#78917E] rounded-full flex items-center justify-center mx-auto mb-5 border border-[#D8C8B5]/40">
          <Sparkles className="w-6 h-6" />
        </div>
        <h3 className="font-serif text-2xl font-normal text-[#202522] mb-2">
          No Products Found
        </h3>
        <p className="text-sm text-[#202522]/60 mb-6 max-w-sm mx-auto leading-relaxed">
          We could not find any products matching your specific criteria. Please consider adjusting your search query or reset your filters.
        </p>
        {hasActiveFilters && onResetFilters && (
          <button
            onClick={onResetFilters}
            className="inline-flex items-center gap-2 bg-[#202522] hover:bg-[#78917E] text-[#F7F5F0] font-semibold text-xs uppercase tracking-wider py-3 px-6 rounded-xl transition-colors cursor-pointer shadow-xs"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset All Filters</span>
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-7">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
