import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { fetchProducts } from '../api/products';
import ProductGrid from '../components/ProductGrid';
import SearchBar from '../components/SearchBar';
import { ProductGridSkeleton } from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';
import Breadcrumb from '../components/Breadcrumb';
import {
  ShieldCheck,
  Truck,
  RotateCcw,
  Sparkles
} from 'lucide-react';

export default function Products({ searchTerm, onSearchChange }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get('category') || '';
  const queryParam = searchParams.get('q') || '';

  const [selectedCategory, setSelectedCategory] = useState(categoryParam);
  const [sortBy, setSortBy] = useState('default');

  const loadProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchProducts(100);
      setProducts(data);
    } catch (err) {
      console.error('Error fetching products:', err);
      setError(err.message || 'Unable to load products. Please try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  useEffect(() => {
    setSelectedCategory(categoryParam);
  }, [categoryParam]);

  useEffect(() => {
    if (queryParam && onSearchChange) {
      onSearchChange(queryParam);
    }
  }, [queryParam, onSearchChange]);

  const categories = useMemo(() => {
    const set = new Set();
    products.forEach((p) => {
      if (p.category) set.add(p.category);
    });
    return Array.from(set).sort();
  }, [products]);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    const newParams = new URLSearchParams(searchParams);
    if (category) {
      newParams.set('category', category);
    } else {
      newParams.delete('category');
    }
    setSearchParams(newParams, { replace: true });
  };

  const filteredProducts = useMemo(() => {
    let result = [...products];

    const query = (searchTerm || '').trim().toLowerCase();
    if (query) {
      result = result.filter((p) => {
        const titleMatch = p.title?.toLowerCase().includes(query);
        const brandMatch = p.brand?.toLowerCase().includes(query);
        const categoryMatch = p.category?.toLowerCase().includes(query);
        return titleMatch || brandMatch || categoryMatch;
      });
    }

    if (selectedCategory) {
      result = result.filter((p) => p.category?.toLowerCase() === selectedCategory.toLowerCase());
    }

    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => (a.price || 0) - (b.price || 0));
        break;
      case 'price-desc':
        result.sort((a, b) => (b.price || 0) - (a.price || 0));
        break;
      case 'rating-desc':
        result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case 'name-asc':
        result.sort((a, b) => (a.title || '').localeCompare(b.title || ''));
        break;
      default:
        break;
    }

    return result;
  }, [products, searchTerm, selectedCategory, sortBy]);

  const handleResetFilters = () => {
    if (onSearchChange) onSearchChange('');
    setSelectedCategory('');
    setSortBy('default');
    setSearchParams({}, { replace: true });
  };

  return (
    <div className="min-h-screen bg-[#F7F5F0] pb-24 text-[#202522]">
      {/* Breadcrumb */}
      <Breadcrumb items={[{ label: 'Products' }]} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Large Beautiful Hero Section: "Discover Your Everyday Essentials" */}
        <section className="relative rounded-3xl bg-white border border-[#D8C8B5]/60 p-8 sm:p-14 lg:p-16 mb-10 overflow-hidden shadow-[0_4px_24px_rgba(32,37,34,0.03)]">
          {/* Subtle background luxury framing */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#F7F5F0] rounded-bl-full pointer-events-none -z-0 opacity-70" />
          <div className="absolute -bottom-10 right-20 w-44 h-44 bg-[#D8C8B5]/20 rounded-full blur-2xl pointer-events-none -z-0" />

          <div className="relative z-10 max-w-3xl">
            {/* Editorial Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F7F5F0] border border-[#D8C8B5]/60 text-[#78917E] text-xs font-semibold uppercase tracking-widest mb-6">
              <Sparkles className="w-3.5 h-3.5 text-[#78917E]" />
              <span>Curated Edition 2026</span>
            </div>
            
            {/* Main Required Heading */}
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-[#202522] tracking-tight font-normal leading-[1.12] mb-5">
              Discover Your <br className="hidden sm:inline" />
              <span className="italic text-[#78917E]">Everyday Essentials</span>
            </h1>
            
            <p className="text-sm sm:text-base text-[#202522]/70 mb-8 leading-relaxed max-w-xl font-normal">
              A thoughtful collection of elevated beauty rituals, personal scents, enduring home pieces, and everyday necessities—sourced with clarity and delivered with care.
            </p>

            {/* Quick Feature Accents */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-[#D8C8B5]/40 text-xs">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-full bg-[#F7F5F0] border border-[#D8C8B5]/50 flex items-center justify-center text-[#78917E]">
                  <ShieldCheck className="w-3.5 h-3.5" />
                </div>
                <span className="font-medium text-[#202522]">100% Verified Provenance</span>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-full bg-[#F7F5F0] border border-[#D8C8B5]/50 flex items-center justify-center text-[#78917E]">
                  <Truck className="w-3.5 h-3.5" />
                </div>
                <span className="font-medium text-[#202522]">Complimentary Express Delivery</span>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-full bg-[#F7F5F0] border border-[#D8C8B5]/50 flex items-center justify-center text-[#78917E]">
                  <RotateCcw className="w-3.5 h-3.5" />
                </div>
                <span className="font-medium text-[#202522]">Hassle-Free 7-Day Returns</span>
              </div>
            </div>
          </div>
        </section>

        {/* Category Navigation Pills */}
        {categories.length > 0 && (
          <div id="categories-section" className="mb-8">
            <div className="flex items-center justify-between mb-3 px-1">
              <span className="text-xs uppercase tracking-widest font-semibold text-[#78917E]">
                Select Department
              </span>
              <span className="text-xs text-[#202522]/50">
                {categories.length} Curated Categories
              </span>
            </div>

            <div className="flex items-center gap-2.5 overflow-x-auto pb-2 scrollbar-thin">
              <button
                onClick={() => handleCategorySelect('')}
                className={`flex-shrink-0 px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                  selectedCategory === ''
                    ? 'bg-[#202522] text-[#F7F5F0] shadow-xs'
                    : 'bg-white text-[#202522]/80 border border-[#D8C8B5]/70 hover:border-[#78917E] hover:text-[#202522]'
                }`}
              >
                All Products ({products.length})
              </button>
              {categories.map((cat) => {
                const count = products.filter((p) => p.category === cat).length;
                const isSelected = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => handleCategorySelect(cat)}
                    className={`flex-shrink-0 capitalize px-4 py-2 rounded-full text-xs font-medium tracking-wide transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#78917E] text-white font-semibold shadow-xs'
                        : 'bg-white text-[#202522]/80 border border-[#D8C8B5]/70 hover:border-[#78917E] hover:text-[#202522]'
                    }`}
                  >
                    {cat.replace('-', ' ')} <span className="opacity-60 text-[10px]">({count})</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* "Explore Products" Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-4 px-1 gap-2">
          <div>
            <h2 className="font-serif text-2xl sm:text-3xl text-[#202522] font-normal">
              Explore Products
            </h2>
            <p className="text-xs text-[#202522]/60 mt-1 uppercase tracking-wider">
              Curated everyday selections with authentic customer reviews
            </p>
          </div>
        </div>

        {/* Stylish Search Bar & Controls */}
        <SearchBar
          searchTerm={searchTerm}
          onSearchChange={onSearchChange}
          categories={categories}
          selectedCategory={selectedCategory}
          onCategorySelect={handleCategorySelect}
          sortBy={sortBy}
          onSortChange={setSortBy}
          totalResults={filteredProducts.length}
          totalProducts={products.length}
        />

        {/* Product Grid / Loading / Error */}
        {loading ? (
          <ProductGridSkeleton count={8} />
        ) : error ? (
          <ErrorMessage
            title="Failed to Load Products"
            message={error}
            onRetry={loadProducts}
          />
        ) : (
          <ProductGrid
            products={filteredProducts}
            onResetFilters={handleResetFilters}
            hasActiveFilters={Boolean(searchTerm || selectedCategory || sortBy !== 'default')}
          />
        )}
      </main>
    </div>
  );
}
