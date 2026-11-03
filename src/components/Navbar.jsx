import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  ShoppingBag,
  Search,
  Menu,
  X,
  ChevronDown,
  User
} from 'lucide-react';

export default function Navbar({ onSearchChange, searchTerm = '' }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [navSearch, setNavSearch] = useState(searchTerm);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setNavSearch(searchTerm);
  }, [searchTerm]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const query = navSearch.trim();
    if (location.pathname !== '/') {
      navigate(`/?q=${encodeURIComponent(query)}`);
    } else {
      if (onSearchChange) {
        onSearchChange(query);
      }
      navigate(`/?q=${encodeURIComponent(query)}`, { replace: true });
    }
    setMobileMenuOpen(false);
  };

  const handleSearchInputChange = (e) => {
    const val = e.target.value;
    setNavSearch(val);
    if (location.pathname === '/' && onSearchChange) {
      onSearchChange(val);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-[#F7F5F0]/90 backdrop-blur-md border-b border-[#D8C8B5]/50 transition-colors">
      {/* Top editorial micro announcement banner */}
      <div className="bg-[#202522] text-[#D8C8B5] text-[11px] tracking-wider uppercase py-2 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between font-medium">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#78917E]" />
            <span className="text-[#F7F5F0] tracking-widest font-semibold">ShopKart Atelier</span>
            <span className="hidden sm:inline text-[#D8C8B5]/40">—</span>
            <span className="hidden sm:inline text-[#D8C8B5]">Complimentary express delivery on orders over $50</span>
          </div>
          <div className="flex items-center gap-5 text-[10px] tracking-widest">
            <span className="text-[#D8C8B5] hover:text-white transition-colors cursor-pointer hidden md:inline">Concierge Support</span>
            <span className="text-[#D8C8B5] hover:text-white transition-colors cursor-pointer hidden sm:inline">Track Order</span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4 md:gap-8">
          
          {/* ShopKart Wordmark */}
          <Link to="/" className="flex items-baseline gap-1.5 group flex-shrink-0">
            <span className="font-serif text-2xl sm:text-3xl font-semibold tracking-tight text-[#202522] transition-colors">
              Shop<span className="italic font-normal text-[#78917E]">Kart</span>
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#78917E] -mb-1 inline-block" />
          </Link>

          {/* Search Bar - Desktop */}
          <form
            onSubmit={handleSearchSubmit}
            className="hidden md:flex flex-1 max-w-xl relative items-center"
          >
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search by product title, brand, or category..."
                value={navSearch}
                onChange={handleSearchInputChange}
                className="w-full pl-11 pr-12 py-2.5 text-xs sm:text-sm bg-white border border-[#D8C8B5] rounded-full focus:outline-none focus:ring-1 focus:ring-[#78917E] focus:border-[#78917E] text-[#202522] placeholder:text-[#202522]/40 transition-all shadow-xs"
              />
              <Search className="w-4 h-4 text-[#78917E] absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
              <button
                type="submit"
                aria-label="Search products"
                className="absolute right-1.5 top-1/2 -translate-y-1/2 bg-[#202522] hover:bg-[#78917E] text-[#F7F5F0] p-2 rounded-full transition-colors cursor-pointer"
              >
                <Search className="w-3.5 h-3.5" />
              </button>
            </div>
          </form>

          {/* Desktop Navigation Links & Visual Actions */}
          <div className="hidden md:flex items-center gap-7">
            <Link
              to="/"
              className={`text-xs font-semibold uppercase tracking-wider transition-colors ${
                location.pathname === '/' ? 'text-[#202522] border-b-2 border-[#78917E] pb-1' : 'text-[#202522]/70 hover:text-[#202522]'
              }`}
            >
              Home
            </Link>

            <a
              href="#categories-section"
              onClick={() => {
                if (location.pathname !== '/') {
                  navigate('/#categories-section');
                }
              }}
              className="text-xs font-semibold uppercase tracking-wider text-[#202522]/70 hover:text-[#202522] flex items-center gap-1 transition-colors"
            >
              Categories
              <ChevronDown className="w-3.5 h-3.5 text-[#78917E]" />
            </a>

            {/* Visual Account Button */}
            <div className="flex items-center gap-1.5 text-[#202522]/80 hover:text-[#202522] cursor-pointer text-xs font-semibold uppercase tracking-wider transition-colors">
              <User className="w-4 h-4 text-[#78917E]" />
              <span>Account</span>
            </div>

            {/* Visual Cart Icon */}
            <div
              className="relative flex items-center gap-2 p-2 rounded-full hover:bg-white border border-transparent hover:border-[#D8C8B5] transition-all cursor-pointer text-[#202522]"
              title="Shopping Bag (Visual)"
            >
              <div className="relative">
                <ShoppingBag className="w-5 h-5 text-[#202522]" />
                <span className="absolute -top-1.5 -right-2 bg-[#78917E] text-white font-bold text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                  2
                </span>
              </div>
              <span className="text-xs font-semibold uppercase tracking-wider text-[#202522] hidden lg:inline">Cart</span>
            </div>
          </div>

          {/* Mobile Right Icons (Cart + Hamburger) */}
          <div className="flex items-center gap-2 md:hidden">
            {/* Visual Bag */}
            <div className="relative p-2 text-[#202522]">
              <ShoppingBag className="w-5 h-5" />
              <span className="absolute top-0.5 right-0 bg-[#78917E] text-white font-bold text-[10px] w-3.5 h-3.5 rounded-full flex items-center justify-center">
                2
              </span>
            </div>

            {/* Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-[#202522] hover:bg-white focus:outline-none cursor-pointer"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Search Input */}
        <div className="pb-4 md:hidden">
          <form onSubmit={handleSearchSubmit} className="relative w-full">
            <input
              type="text"
              placeholder="Search products, brands, categories..."
              value={navSearch}
              onChange={handleSearchInputChange}
              className="w-full pl-10 pr-10 py-2.5 text-xs bg-white border border-[#D8C8B5] rounded-full focus:outline-none focus:ring-1 focus:ring-[#78917E] text-[#202522] placeholder:text-[#202522]/40"
            />
            <Search className="w-3.5 h-3.5 text-[#78917E] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <button
              type="submit"
              className="absolute right-1.5 top-1/2 -translate-y-1/2 bg-[#202522] text-[#F7F5F0] p-1.5 rounded-full cursor-pointer"
              aria-label="Search"
            >
              <Search className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#D8C8B5]/60 bg-[#F7F5F0] px-5 pt-4 pb-6 space-y-3 shadow-lg">
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2.5 text-sm font-semibold uppercase tracking-wider text-[#202522] border-b border-[#D8C8B5]/40"
          >
            Home Collection
          </Link>
          <a
            href="#categories-section"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2.5 text-sm font-medium tracking-wide text-[#202522]/80 hover:text-[#202522] border-b border-[#D8C8B5]/40"
          >
            Browse Categories
          </a>
          <div className="flex items-center justify-between py-2 text-[#202522]/80 border-b border-[#D8C8B5]/40">
            <span className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider">
              <User className="w-4 h-4 text-[#78917E]" />
              Account Concierge
            </span>
            <span className="text-[11px] bg-white border border-[#D8C8B5] px-2 py-0.5 rounded text-[#202522]/70">Guest</span>
          </div>
          <div className="pt-2 text-[11px] text-[#202522]/60 flex items-center justify-between">
            <span>ShopKart Technical Assessment</span>
            <span className="text-[#78917E] font-serif italic">Curated Essentials</span>
          </div>
        </div>
      )}
    </header>
  );
}
