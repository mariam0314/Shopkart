import React from 'react';
import { Link } from 'react-router-dom';
import { Star, ArrowRight } from 'lucide-react';
import { calculateOriginalPrice, formatCurrency } from '../api/products';

export default function ProductCard({ product }) {
  if (!product) return null;

  const {
    id,
    title,
    brand,
    category,
    price,
    discountPercentage,
    rating,
    reviews,
    stock,
    availabilityStatus,
    thumbnail,
    images
  } = product;

  const originalPrice = calculateOriginalPrice(price, discountPercentage);
  const displayImage = thumbnail || (images && images[0]) || 'https://via.placeholder.com/400x400?text=ShopKart';
  const reviewCount = reviews ? reviews.length : 0;

  // Stock status evaluation
  const isOutOfStock = stock <= 0 || availabilityStatus?.toLowerCase() === 'out of stock';
  const isLowStock = stock > 0 && stock <= 10;

  return (
    <div className="group bg-white rounded-2xl border border-[#D8C8B5]/60 hover:border-[#78917E]/60 shadow-[0_2px_12px_rgba(32,37,34,0.04)] hover:shadow-[0_12px_28px_rgba(32,37,34,0.08)] transition-all duration-300 flex flex-col h-full overflow-hidden relative">
      
      {/* Top Floating Badges (Discount & Stock) */}
      <div className="absolute top-3.5 left-3.5 right-3.5 z-10 flex items-center justify-between pointer-events-none">
        {discountPercentage && discountPercentage > 0 ? (
          <span className="bg-[#78917E] text-white text-[10px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-full shadow-xs">
            {Math.round(discountPercentage)}% Off
          </span>
        ) : <span />}

        {isOutOfStock ? (
          <span className="bg-[#202522] text-[#F7F5F0] text-[10px] font-semibold tracking-wider uppercase px-2.5 py-0.5 rounded-full">
            Out of Stock
          </span>
        ) : isLowStock ? (
          <span className="bg-[#D8C8B5]/90 text-[#202522] text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded-full backdrop-blur-xs">
            Only {stock} Left
          </span>
        ) : (
          <span className="bg-white/90 text-[#78917E] text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded-full border border-[#D8C8B5]/50 backdrop-blur-xs">
            In Stock
          </span>
        )}
      </div>

      {/* Large Product Image Container with Subtle Framing */}
      <Link
        to={`/product/${id}`}
        className="w-full h-64 sm:h-72 p-6 bg-[#F7F5F0]/50 flex items-center justify-center overflow-hidden relative group-hover:bg-[#F7F5F0]/80 transition-colors"
      >
        <img
          src={displayImage}
          alt={title || 'Product photo'}
          loading="lazy"
          className="max-h-full max-w-full object-contain transition-transform duration-500 ease-out group-hover:scale-108"
          onError={(e) => {
            e.currentTarget.src = 'https://via.placeholder.com/400x400?text=ShopKart';
          }}
        />
      </Link>

      {/* Product Content */}
      <div className="p-5 sm:p-6 flex flex-col flex-1">
        {/* Brand & Category Minimal Meta */}
        <div className="flex items-center justify-between text-xs mb-1.5 gap-2">
          <span className="font-semibold text-[#78917E] uppercase tracking-widest text-[10px] truncate">
            {brand || 'Atelier'}
          </span>
          <span className="capitalize text-[#202522]/50 text-[10px] tracking-wider uppercase truncate">
            {category}
          </span>
        </div>

        {/* Product Title */}
        <Link
          to={`/product/${id}`}
          className="font-medium text-[#202522] group-hover:text-[#78917E] text-base line-clamp-2 leading-snug mb-2.5 transition-colors"
          title={title}
        >
          {title}
        </Link>

        {/* Rating and Reviews */}
        <div className="flex items-center gap-2 mb-4">
          <div className="flex items-center gap-1 text-[#78917E]">
            <Star className="w-3.5 h-3.5 fill-[#78917E]" />
            <span className="text-xs font-semibold text-[#202522]">
              {rating ? rating.toFixed(1) : '4.5'}
            </span>
          </div>
          <span className="text-[#D8C8B5]">•</span>
          <span className="text-xs text-[#202522]/50">
            {reviewCount} {reviewCount === 1 ? 'review' : 'reviews'}
          </span>
        </div>

        {/* Price Presentation */}
        <div className="mt-auto pt-3 border-t border-[#D8C8B5]/40 flex items-baseline justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-lg sm:text-xl font-bold text-[#202522] tracking-tight">
              {formatCurrency(price)}
            </span>
            {originalPrice && originalPrice > price && (
              <span className="text-xs text-[#202522]/40 line-through">
                {formatCurrency(originalPrice)}
              </span>
            )}
          </div>
        </div>

        {/* Elegant "View Details" Button */}
        <div className="mt-4">
          <Link
            to={`/product/${id}`}
            className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-semibold uppercase tracking-wider text-[#F7F5F0] bg-[#202522] hover:bg-[#78917E] active:bg-[#202522] rounded-xl transition-all duration-200 shadow-2xs group/btn"
          >
            <span>View Details</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover/btn:translate-x-1" />
          </Link>
        </div>
      </div>
    </div>
  );
}
