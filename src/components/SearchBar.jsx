import React from 'react';
import { Search, X, RotateCcw } from 'lucide-react';

export default function SearchBar({
  searchTerm,
  onSearchChange,
  categories = [],
  selectedCategory,
  onCategorySelect,
  sortBy,
  onSortChange,
  totalResults = 0,
  totalProducts = 0
}) {
  return (
    <div className="bg-white rounded-2xl border border-[#D8C8B5]/60 p-5 shadow-xs mb-8 transition-shadow hover:shadow-sm">
      <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
        
        {/* Stylish Search input */}
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#78917E]" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search by product name, maker, or category..."
            className="w-full pl-11 pr-10 py-3 text-sm bg-[#F7F5F0]/60 border border-[#D8C8B5]/80 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#78917E] focus:border-[#78917E] focus:bg-white text-[#202522] placeholder:text-[#202522]/40 transition-all"
          />
          {searchTerm && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#202522]/40 hover:text-[#202522] p-1 transition-colors cursor-pointer"
              title="Clear search query"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Category & Sorting Selectors */}
        <div className="flex flex-wrap sm:flex-nowrap items-center gap-3">
          
          {/* Category Dropdown */}
          <div className="flex-1 sm:flex-initial min-w-[160px]">
            <select
              value={selectedCategory}
              onChange={(e) => onCategorySelect(e.target.value)}
              className="w-full px-3.5 py-3 text-xs uppercase tracking-wider font-semibold bg-[#F7F5F0]/60 border border-[#D8C8B5]/80 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#78917E] text-[#202522] capitalize cursor-pointer hover:bg-white transition-colors"
            >
              <option value="">All Categories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat.replace('-', ' ')}
                </option>
              ))}
            </select>
          </div>

          {/* Sort Dropdown */}
          <div className="flex-1 sm:flex-initial min-w-[190px]">
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
              className="w-full px-3.5 py-3 text-xs uppercase tracking-wider font-semibold bg-[#F7F5F0]/60 border border-[#D8C8B5]/80 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#78917E] text-[#202522] cursor-pointer hover:bg-white transition-colors"
            >
              <option value="default">Default</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating-desc">Rating: High to Low</option>
              <option value="name-asc">Name: A-Z</option>
            </select>
          </div>
        </div>
      </div>

      {/* Sub-bar: Results count and active filter summary */}
      <div className="flex flex-wrap items-center justify-between gap-3 mt-4 pt-3.5 border-t border-[#D8C8B5]/30 text-xs text-[#202522]/60">
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="font-semibold text-[#202522]">
            {totalResults}
          </span>
          <span>of {totalProducts} curated products</span>
          {searchTerm && (
            <span className="text-[#202522]">
              matching &ldquo;<strong className="text-[#78917E] font-medium">{searchTerm}</strong>&rdquo;
            </span>
          )}
          {selectedCategory && (
            <span className="text-[#202522]">
              in &ldquo;<strong className="capitalize text-[#78917E] font-medium">{selectedCategory.replace('-', ' ')}</strong>&rdquo;
            </span>
          )}
        </div>

        {(searchTerm || selectedCategory || sortBy !== 'default') && (
          <button
            onClick={() => {
              onSearchChange('');
              onCategorySelect('');
              onSortChange('default');
            }}
            className="text-[#78917E] hover:text-[#202522] font-semibold text-xs uppercase tracking-wider flex items-center gap-1 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset filters</span>
          </button>
        )}
      </div>
    </div>
  );
}
