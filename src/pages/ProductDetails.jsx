import React, { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchProductById } from '../api/products';
import Breadcrumb from '../components/Breadcrumb';
import ProductGallery from '../components/ProductGallery';
import ProductInfo from '../components/ProductInfo';
import ProductSpecifications from '../components/ProductSpecifications';
import ShippingWarranty from '../components/ShippingWarranty';
import BarcodeCard from '../components/BarcodeCard';
import ReviewCard from '../components/ReviewCard';
import { ProductDetailsSkeleton } from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';
import {
  ArrowLeft,
  Tag,
  Star,
  Info,
  Package
} from 'lucide-react';

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadProduct = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchProductById(id);
      setProduct(data);
    } catch (err) {
      console.error(`Failed to load product ${id}:`, err);
      setError('Unable to load product details.');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    window.scrollTo(0, 0);
    loadProduct();
  }, [loadProduct]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F7F5F0] py-4">
        <Breadcrumb items={[{ label: 'Collection', link: '/' }, { label: 'Loading details...' }]} />
        <ProductDetailsSkeleton />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-[#F7F5F0] py-16 px-4">
        <ErrorMessage
          title="Product Not Found"
          message={error || 'Unable to load product details.'}
          showBackHome={true}
          backHomeText="Back to Products"
          onRetry={loadProduct}
        />
      </div>
    );
  }

  const {
    title,
    category,
    description,
    tags,
    reviews,
    meta,
    sku,
    weight,
    dimensions
  } = product;

  const breadcrumbItems = [
    { label: 'Products', link: '/' },
    { label: category, link: `/?category=${encodeURIComponent(category)}` },
    { label: title }
  ];

  return (
    <div className="min-h-screen bg-[#F7F5F0] pb-24 text-[#202522]">
      {/* Breadcrumb Navigation */}
      <Breadcrumb items={breadcrumbItems} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back to Products Button */}
        <div className="mb-6">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#202522] hover:text-[#78917E] bg-white border border-[#D8C8B5]/60 px-4 py-2.5 rounded-xl shadow-2xs hover:shadow-xs transition-all"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-[#78917E]" />
            <span>Back to Products</span>
          </Link>
        </div>

        {/* 1. Main Product Section (Two columns on desktop, stacked on mobile) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 mb-12 items-start">
          {/* LEFT: Large image gallery */}
          <div className="lg:col-span-6 sticky top-28">
            <ProductGallery images={product.images} title={title} />
          </div>

          {/* RIGHT: Product Information & Purchase options */}
          <div className="lg:col-span-6">
            <ProductInfo product={product} />
          </div>
        </div>

        {/* 2. Description Section: "About this product" */}
        <section className="bg-white rounded-3xl border border-[#D8C8B5]/60 p-7 sm:p-10 shadow-xs mb-8">
          <div className="flex items-center gap-2.5 mb-5 pb-4 border-b border-[#D8C8B5]/40">
            <Info className="w-5 h-5 text-[#78917E]" />
            <h2 className="font-serif text-2xl text-[#202522] font-normal">
              About this product
            </h2>
          </div>
          <div className="text-[#202522]/80 leading-relaxed text-sm sm:text-base space-y-4 font-normal">
            <p>{description || 'No detailed description provided by manufacturer.'}</p>
          </div>
        </section>

        {/* 3. Product Specifications Table */}
        <section className="mb-8">
          <ProductSpecifications product={product} />
        </section>

        {/* 4. Shipping / Warranty / Returns Information */}
        <section className="mb-8">
          <ShippingWarranty product={product} />
        </section>

        {/* 5. Product Tags Section */}
        {tags && Array.isArray(tags) && tags.length > 0 && (
          <section className="bg-white rounded-3xl border border-[#D8C8B5]/60 p-7 shadow-xs mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Tag className="w-4 h-4 text-[#78917E]" />
              <h3 className="text-xs font-semibold uppercase tracking-widest text-[#202522]">
                Product Tags
              </h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-full text-xs font-medium bg-[#F7F5F0] text-[#202522] border border-[#D8C8B5]/60 capitalize hover:border-[#78917E] transition-colors"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* 6. Barcode + QR Code Section */}
        <section className="mb-8">
          <BarcodeCard meta={meta} sku={sku} />
        </section>

        {/* 7. Customer Reviews Section */}
        <section className="bg-white rounded-3xl border border-[#D8C8B5]/60 p-7 sm:p-10 shadow-xs mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-5 border-b border-[#D8C8B5]/40">
            <div>
              <h2 className="font-serif text-2xl sm:text-3xl text-[#202522] font-normal flex items-center gap-2.5">
                <Star className="w-5 h-5 text-[#78917E] fill-[#78917E]" />
                <span>Customer Reviews</span>
              </h2>
              <p className="text-xs text-[#202522]/50 mt-1 uppercase tracking-wider">
                Independent feedback from verified purchasers
              </p>
            </div>

            {/* Overall Rating Score Header */}
            <div className="flex items-center gap-3.5 bg-[#F7F5F0] px-5 py-3 rounded-2xl border border-[#D8C8B5]/50">
              <span className="font-serif text-3xl font-semibold text-[#202522]">
                {product.rating ? product.rating.toFixed(1) : '4.5'}
              </span>
              <div className="flex flex-col">
                <div className="flex text-[#78917E]">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-3.5 h-3.5 ${
                        star <= Math.round(product.rating || 4)
                          ? 'fill-[#78917E] text-[#78917E]'
                          : 'fill-[#D8C8B5]/40 text-[#D8C8B5]/40'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-[11px] text-[#202522]/60 mt-0.5">
                  Based on {reviews ? reviews.length : 0} reviews
                </span>
              </div>
            </div>
          </div>

          {/* List of Reviews */}
          {reviews && Array.isArray(reviews) && reviews.length > 0 ? (
            <div className="space-y-4">
              {reviews.map((rev, index) => (
                <ReviewCard key={index} review={rev} />
              ))}
            </div>
          ) : (
            <div className="text-center py-10 text-[#202522]/60 text-sm">
              No customer reviews submitted yet for this product.
            </div>
          )}
        </section>

        {/* 8. Additional Information (Package & Physical Dimensions) */}
        {(weight !== undefined || dimensions) && (
          <section className="bg-white rounded-3xl border border-[#D8C8B5]/60 p-7 sm:p-9 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-6 pb-4 border-b border-[#D8C8B5]/40 gap-2">
              <h3 className="font-serif text-2xl text-[#202522] font-normal flex items-center gap-2">
                <Package className="w-5 h-5 text-[#78917E]" />
                <span>Additional Information: Package &amp; Dimensions</span>
              </h3>
              <span className="text-xs text-[#202522]/50 uppercase tracking-widest font-medium">
                Logistics Metrics
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs sm:text-sm">
              {weight !== undefined && (
                <div className="p-4 bg-[#F7F5F0]/60 rounded-2xl border border-[#D8C8B5]/40">
                  <span className="text-[10px] uppercase tracking-wider text-[#78917E] font-semibold block mb-1">Total Unit Weight</span>
                  <span className="font-semibold text-[#202522] text-base">{weight} kg</span>
                </div>
              )}
              {dimensions?.width !== undefined && (
                <div className="p-4 bg-[#F7F5F0]/60 rounded-2xl border border-[#D8C8B5]/40">
                  <span className="text-[10px] uppercase tracking-wider text-[#78917E] font-semibold block mb-1">Width</span>
                  <span className="font-semibold text-[#202522] text-base">{dimensions.width} cm</span>
                </div>
              )}
              {dimensions?.height !== undefined && (
                <div className="p-4 bg-[#F7F5F0]/60 rounded-2xl border border-[#D8C8B5]/40">
                  <span className="text-[10px] uppercase tracking-wider text-[#78917E] font-semibold block mb-1">Height</span>
                  <span className="font-semibold text-[#202522] text-base">{dimensions.height} cm</span>
                </div>
              )}
              {dimensions?.depth !== undefined && (
                <div className="p-4 bg-[#F7F5F0]/60 rounded-2xl border border-[#D8C8B5]/40">
                  <span className="text-[10px] uppercase tracking-wider text-[#78917E] font-semibold block mb-1">Depth</span>
                  <span className="font-semibold text-[#202522] text-base">{dimensions.depth} cm</span>
                </div>
              )}
            </div>
          </section>
        )}

      </main>
    </div>
  );
}
