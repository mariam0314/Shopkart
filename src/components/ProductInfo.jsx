import React from 'react';
import {
  Star,
  ShieldCheck,
  Truck,
  CheckCircle2,
  AlertTriangle,
  ShoppingBag,
  Sparkles
} from 'lucide-react';
import { calculateOriginalPrice, formatCurrency } from '../api/products';

export default function ProductInfo({ product }) {
  if (!product) return null;

  const {
    title,
    brand,
    category,
    rating,
    reviews,
    price,
    discountPercentage,
    stock,
    minimumOrderQuantity,
    sku,
    availabilityStatus,
    warrantyInformation,
    shippingInformation
  } = product;

  const originalPrice = calculateOriginalPrice(price, discountPercentage);
  const reviewCount = reviews ? reviews.length : 0;
  const isOutOfStock = stock <= 0 || availabilityStatus?.toLowerCase() === 'out of stock';
  const isLowStock = stock > 0 && stock <= 10;

  return (
    <div className="flex flex-col bg-white rounded-3xl border border-[#D8C8B5]/60 p-7 sm:p-9 shadow-xs">
      
      {/* Brand & Category Minimal Pill */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
        <span className="text-[11px] font-semibold tracking-widest text-[#78917E] uppercase bg-[#F7F5F0] border border-[#D8C8B5]/50 px-3 py-1 rounded-full">
          {brand || 'ShopKart Selection'}
        </span>
        <span className="text-[11px] font-medium text-[#202522]/60 uppercase tracking-widest">
          Category: <strong className="text-[#202522] capitalize">{category}</strong>
        </span>
      </div>

      {/* Editorial Title */}
      <h1 className="font-serif text-3xl sm:text-4xl text-[#202522] leading-[1.2] mb-4 font-normal">
        {title}
      </h1>

      {/* Ratings & Reviews & Minimal Assurance */}
      <div className="flex flex-wrap items-center gap-4 pb-6 border-b border-[#D8C8B5]/40 text-xs">
        <div className="flex items-center gap-1.5 text-[#78917E]">
          <Star className="w-4 h-4 fill-[#78917E]" />
          <span className="font-semibold text-sm text-[#202522]">
            {rating ? rating.toFixed(1) : '4.5'}
          </span>
        </div>
        <span className="text-[#D8C8B5]">•</span>
        <span className="text-[#202522]/70 hover:underline cursor-pointer font-medium">
          {reviewCount} Verified {reviewCount === 1 ? 'Customer Review' : 'Customer Reviews'}
        </span>
        <span className="text-[#D8C8B5]">•</span>
        <div className="flex items-center gap-1.5 text-[#78917E] font-medium">
          <ShieldCheck className="w-4 h-4" />
          <span>ShopKart Guaranteed Authentic</span>
        </div>
      </div>

      {/* Price Section */}
      <div className="py-6 border-b border-[#D8C8B5]/40">
        <div className="flex items-baseline gap-3">
          <span className="text-3xl sm:text-4xl font-extrabold text-[#202522] tracking-tight">
            {formatCurrency(price)}
          </span>
          {originalPrice && originalPrice > price && (
            <span className="text-base sm:text-lg text-[#202522]/40 line-through">
              {formatCurrency(originalPrice)}
            </span>
          )}
          {discountPercentage && discountPercentage > 0 && (
            <span className="text-xs font-semibold uppercase tracking-wider text-white bg-[#78917E] px-3 py-1 rounded-full shadow-2xs">
              {Math.round(discountPercentage)}% Off Limited Offer
            </span>
          )}
        </div>
        <p className="text-xs text-[#202522]/50 mt-1.5">All applicable duties, taxes, and handling calculated at checkout</p>
      </div>

      {/* Stock, SKU, MOQ Quick Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 py-6 border-b border-[#D8C8B5]/40 text-xs">
        <div className="bg-[#F7F5F0]/80 p-3.5 rounded-2xl border border-[#D8C8B5]/40">
          <span className="text-[#202522]/50 block mb-1 uppercase tracking-wider text-[10px]">Stock Status</span>
          <div className="font-semibold">
            {isOutOfStock ? (
              <span className="text-[#202522] flex items-center gap-1">
                <AlertTriangle className="w-3.5 h-3.5 text-[#202522]" /> Out of stock
              </span>
            ) : isLowStock ? (
              <span className="text-[#78917E] flex items-center gap-1">
                <AlertTriangle className="w-3.5 h-3.5 text-[#78917E]" /> Only {stock} units left
              </span>
            ) : (
              <span className="text-[#78917E] flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> {availabilityStatus || 'In Stock'}
              </span>
            )}
          </div>
        </div>

        <div className="bg-[#F7F5F0]/80 p-3.5 rounded-2xl border border-[#D8C8B5]/40">
          <span className="text-[#202522]/50 block mb-1 uppercase tracking-wider text-[10px]">Minimum Order</span>
          <span className="font-semibold text-[#202522]">
            {minimumOrderQuantity || 1} unit(s)
          </span>
        </div>

        <div className="bg-[#F7F5F0]/80 p-3.5 rounded-2xl border border-[#D8C8B5]/40 col-span-2 sm:col-span-1">
          <span className="text-[#202522]/50 block mb-1 uppercase tracking-wider text-[10px]">Reference SKU</span>
          <span className="font-mono font-medium text-[#202522] truncate block">
            {sku || 'N/A'}
          </span>
        </div>
      </div>

      {/* Delivery & Warranty Highlights */}
      <div className="py-5 space-y-2.5 text-xs text-[#202522]/70 border-b border-[#D8C8B5]/40">
        {shippingInformation && (
          <div className="flex items-center gap-2.5">
            <Truck className="w-4 h-4 text-[#78917E] flex-shrink-0" />
            <span>
              <strong className="text-[#202522]">Shipping:</strong> {shippingInformation}
            </span>
          </div>
        )}
        {warrantyInformation && (
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-4 h-4 text-[#78917E] flex-shrink-0" />
            <span>
              <strong className="text-[#202522]">Warranty:</strong> {warrantyInformation}
            </span>
          </div>
        )}
      </div>

      {/* Action Buttons: "View Product" prominent button + Bag / Buy Now */}
      <div className="pt-6 space-y-3">
        <button
          type="button"
          className="w-full bg-[#202522] hover:bg-[#78917E] active:bg-[#202522] text-[#F7F5F0] font-semibold text-xs uppercase tracking-widest py-3.5 px-6 rounded-2xl transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-sm"
        >
          <Sparkles className="w-4 h-4" />
          <span>View Product</span>
        </button>

        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            className="w-full bg-white hover:bg-[#F7F5F0] text-[#202522] border border-[#202522] font-semibold text-xs uppercase tracking-wider py-3 px-4 rounded-2xl transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4 text-[#78917E]" />
            <span>Add to Bag</span>
          </button>
          <button
            type="button"
            className="w-full bg-[#78917E] hover:bg-[#5d7463] text-white font-semibold text-xs uppercase tracking-wider py-3 px-4 rounded-2xl transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
          >
            <span>Instant Buy</span>
          </button>
        </div>
      </div>
    </div>
  );
}
