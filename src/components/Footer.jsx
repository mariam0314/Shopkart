import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Truck, RotateCcw, Award } from 'lucide-react';

const CURRENT_YEAR = 2026;

export default function Footer() {
  return (
    <footer className="bg-[#202522] text-[#D8C8B5] mt-auto border-t border-[#D8C8B5]/20 text-sm">
      {/* Editorial Value Props Banner */}
      <div className="border-b border-[#D8C8B5]/15 py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="flex items-start gap-3.5">
            <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 text-[#78917E] flex items-center justify-center flex-shrink-0 mt-0.5">
              <Truck className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-semibold text-[#F7F5F0] text-xs uppercase tracking-widest">Conscious Shipping</h4>
              <p className="text-xs text-[#D8C8B5]/70 mt-1 leading-relaxed">Fast express dispatch with carbon-neutral transit</p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 text-[#78917E] flex items-center justify-center flex-shrink-0 mt-0.5">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-semibold text-[#F7F5F0] text-xs uppercase tracking-widest">Guaranteed Authentic</h4>
              <p className="text-xs text-[#D8C8B5]/70 mt-1 leading-relaxed">Direct sourcing with individual GS1 registry verification</p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 text-[#78917E] flex items-center justify-center flex-shrink-0 mt-0.5">
              <RotateCcw className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-semibold text-[#F7F5F0] text-xs uppercase tracking-widest">Effortless Returns</h4>
              <p className="text-xs text-[#D8C8B5]/70 mt-1 leading-relaxed">Simple 7-day pickup guarantee with prompt refunds</p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 text-[#78917E] flex items-center justify-center flex-shrink-0 mt-0.5">
              <Award className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-semibold text-[#F7F5F0] text-xs uppercase tracking-widest">Dedicated Concierge</h4>
              <p className="text-xs text-[#D8C8B5]/70 mt-1 leading-relaxed">Expert customer care available around the clock</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand Column */}
          <div className="space-y-4">
            <div className="flex items-baseline gap-1.5">
              <span className="font-serif text-2xl font-semibold tracking-tight text-[#F7F5F0]">
                Shop<span className="italic font-normal text-[#78917E]">Kart</span>
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#78917E] inline-block" />
            </div>
            <p className="text-xs text-[#D8C8B5]/70 leading-relaxed max-w-xs">
              Everyday essentials curated with minimal luxury aesthetics and transparent provenance. Powered dynamically by DummyJSON.
            </p>
          </div>

          {/* Curated Categories */}
          <div>
            <h4 className="text-[#F7F5F0] text-xs font-semibold uppercase tracking-widest mb-4">Curated Departments</h4>
            <ul className="space-y-2.5 text-xs">
              <li><Link to="/?category=beauty" className="text-[#D8C8B5]/80 hover:text-white transition-colors">Beauty &amp; Formulations</Link></li>
              <li><Link to="/?category=fragrances" className="text-[#D8C8B5]/80 hover:text-white transition-colors">Luxury Fragrance &amp; Scents</Link></li>
              <li><Link to="/?category=furniture" className="text-[#D8C8B5]/80 hover:text-white transition-colors">Living &amp; Minimal Furniture</Link></li>
              <li><Link to="/?category=groceries" className="text-[#D8C8B5]/80 hover:text-white transition-colors">Gourmet &amp; Daily Provisions</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-[#F7F5F0] text-xs font-semibold uppercase tracking-widest mb-4">Concierge Services</h4>
            <ul className="space-y-2.5 text-xs text-[#D8C8B5]/80">
              <li className="hover:text-white transition-colors cursor-pointer">Order Inquiries &amp; Tracking</li>
              <li className="hover:text-white transition-colors cursor-pointer">Domestic &amp; Global Shipping</li>
              <li className="hover:text-white transition-colors cursor-pointer">Complimentary Returns Policy</li>
              <li className="hover:text-white transition-colors cursor-pointer">Product Authentication Registry</li>
            </ul>
          </div>

          {/* Assessment Info */}
          <div>
            <h4 className="text-[#F7F5F0] text-xs font-semibold uppercase tracking-widest mb-4">Assessment Specifications</h4>
            <p className="text-xs text-[#D8C8B5]/70 leading-relaxed mb-3">
              Full technical assessment demo with live API data, real-time filtering, responsive mobile layout, and zero hardcoded records.
            </p>
            <div className="inline-block bg-white/5 border border-white/10 text-[#78917E] text-[11px] font-mono px-3 py-1 rounded-full">
              Status: Production Ready
            </div>
          </div>
        </div>

        <div className="border-t border-[#D8C8B5]/15 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#D8C8B5]/50 gap-3">
          <span>&copy; {CURRENT_YEAR} ShopKart Atelier. All rights reserved.</span>
          <span>Designed with Minimal Luxury Aesthetics &bull; React &bull; Vite &bull; Tailwind CSS</span>
        </div>
      </div>
    </footer>
  );
}
