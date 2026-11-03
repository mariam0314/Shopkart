import React, { useState } from 'react';
import { ZoomIn } from 'lucide-react';

export default function ProductGallery({ images = [], title = 'Product' }) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  const imageList = Array.isArray(images) && images.length > 0
    ? images
    : ['https://via.placeholder.com/600x600?text=ShopKart'];

  const currentImage = imageList[activeImageIndex] || imageList[0];

  return (
    <div className="flex flex-col gap-4">
      {/* Main Image Stage */}
      <div
        className="relative w-full aspect-square max-h-[540px] bg-white rounded-3xl border border-[#D8C8B5]/60 p-8 sm:p-12 flex items-center justify-center overflow-hidden shadow-xs cursor-crosshair group"
        onMouseEnter={() => setIsZoomed(true)}
        onMouseLeave={() => setIsZoomed(false)}
      >
        <img
          src={currentImage}
          alt={`${title} - view ${activeImageIndex + 1}`}
          className={`max-h-full max-w-full object-contain transition-transform duration-500 ease-out ${
            isZoomed ? 'scale-125' : 'scale-100'
          }`}
          onError={(e) => {
            e.currentTarget.src = 'https://via.placeholder.com/600x600?text=ShopKart';
          }}
        />

        {/* Minimal luxury zoom indicator */}
        <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-md border border-[#D8C8B5]/60 text-[#202522] text-[11px] font-medium px-3 py-1.5 rounded-full flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity shadow-xs">
          <ZoomIn className="w-3.5 h-3.5 text-[#78917E]" />
          <span>Zoom</span>
        </div>
      </div>

      {/* Thumbnails Row */}
      {imageList.length > 1 && (
        <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-thin pt-1">
          {imageList.map((imgUrl, index) => {
            const isActive = index === activeImageIndex;
            return (
              <button
                key={index}
                onClick={() => setActiveImageIndex(index)}
                aria-label={`View photo ${index + 1}`}
                className={`relative flex-shrink-0 w-20 h-20 sm:w-24 sm:h-24 rounded-2xl border p-2 bg-white overflow-hidden transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'border-[#202522] ring-1 ring-[#202522] shadow-xs'
                    : 'border-[#D8C8B5]/60 hover:border-[#78917E] opacity-75 hover:opacity-100'
                }`}
              >
                <img
                  src={imgUrl}
                  alt={`Thumbnail ${index + 1}`}
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    e.currentTarget.src = 'https://via.placeholder.com/100x100?text=ShopKart';
                  }}
                />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
