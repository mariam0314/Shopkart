import React from 'react';
import { Truck, Shield, RotateCcw, CheckCircle2 } from 'lucide-react';

export default function ShippingWarranty({ product }) {
  if (!product) return null;

  const {
    shippingInformation,
    warrantyInformation,
    returnPolicy,
    availabilityStatus
  } = product;

  const cards = [
    {
      title: 'Shipping Information',
      value: shippingInformation || 'Standard express shipping available',
      icon: Truck
    },
    {
      title: 'Warranty',
      value: warrantyInformation || 'Manufacturer warranty included',
      icon: Shield
    },
    {
      title: 'Return Policy',
      value: returnPolicy || 'Check return guidelines for details',
      icon: RotateCcw
    },
    {
      title: 'Availability',
      value: availabilityStatus || 'In Stock',
      icon: CheckCircle2
    }
  ];

  return (
    <div className="bg-white rounded-3xl border border-[#D8C8B5]/60 p-7 sm:p-9 shadow-xs">
      <div className="mb-6 pb-4 border-b border-[#D8C8B5]/40">
        <h3 className="font-serif text-2xl text-[#202522] font-normal">
          Shipping, Warranty &amp; Return Information
        </h3>
        <p className="text-xs text-[#202522]/50 mt-1 uppercase tracking-wider">
          Official Merchant &amp; Delivery Terms
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.title}
              className="p-5 rounded-2xl border border-[#D8C8B5]/50 bg-[#F7F5F0]/60 hover:bg-[#F7F5F0] transition-colors flex flex-col gap-3"
            >
              <div className="w-10 h-10 rounded-xl bg-white border border-[#D8C8B5]/50 text-[#78917E] flex items-center justify-center shadow-2xs">
                <Icon className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-semibold text-[#78917E] uppercase tracking-widest block mb-1">
                  {item.title}
                </span>
                <p className="text-sm font-semibold text-[#202522] leading-snug">
                  {item.value}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
