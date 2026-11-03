import React from 'react';
import { formatCurrency } from '../api/products';

export default function ProductSpecifications({ product }) {
  if (!product) return null;

  const {
    sku,
    brand,
    category,
    price,
    discountPercentage,
    rating,
    stock,
    minimumOrderQuantity,
    weight,
    dimensions,
    availabilityStatus
  } = product;

  const specs = [
    { label: 'SKU', value: sku },
    { label: 'Brand', value: brand },
    { label: 'Category', value: category ? category.charAt(0).toUpperCase() + category.slice(1) : null },
    { label: 'Price', value: price !== undefined ? formatCurrency(price) : null },
    { label: 'Discount percentage', value: discountPercentage ? `${discountPercentage}%` : null },
    { label: 'Rating', value: rating ? `${rating} / 5` : null },
    { label: 'Stock', value: stock !== undefined ? `${stock} units` : null },
    { label: 'Minimum order quantity', value: minimumOrderQuantity ? `${minimumOrderQuantity} unit(s)` : null },
    { label: 'Weight', value: weight !== undefined ? `${weight} kg` : null },
    { label: 'Width', value: dimensions?.width !== undefined ? `${dimensions.width} cm` : null },
    { label: 'Height', value: dimensions?.height !== undefined ? `${dimensions.height} cm` : null },
    { label: 'Depth', value: dimensions?.depth !== undefined ? `${dimensions.depth} cm` : null },
    { label: 'Availability status', value: availabilityStatus },
  ].filter((item) => item.value !== undefined && item.value !== null && item.value !== '');

  if (specs.length === 0) return null;

  return (
    <div className="bg-white rounded-3xl border border-[#D8C8B5]/60 p-7 sm:p-9 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-6 pb-4 border-b border-[#D8C8B5]/40 gap-2">
        <h3 className="font-serif text-2xl text-[#202522] font-normal">
          Product Specifications
        </h3>
        <span className="text-xs text-[#202522]/50 uppercase tracking-widest font-medium">
          Verified Technical Schema
        </span>
      </div>

      <div className="overflow-hidden rounded-2xl border border-[#D8C8B5]/50">
        <table className="w-full text-left text-xs sm:text-sm border-collapse">
          <tbody>
            {specs.map((spec, index) => (
              <tr
                key={spec.label}
                className={index % 2 === 0 ? 'bg-[#F7F5F0]/50' : 'bg-white'}
              >
                <td className="py-3.5 px-5 font-medium text-[#202522]/60 w-2/5 border-b border-[#D8C8B5]/30">
                  {spec.label}
                </td>
                <td className="py-3.5 px-5 text-[#202522] font-semibold border-b border-[#D8C8B5]/30">
                  {spec.value}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
