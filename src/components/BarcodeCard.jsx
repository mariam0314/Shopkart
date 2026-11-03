import React from 'react';
import { QrCode, ScanLine, Calendar } from 'lucide-react';

export default function BarcodeCard({ meta, sku }) {
  if (!meta && !sku) return null;

  const barcode = meta?.barcode;
  const qrCodeUrl = meta?.qrCode;
  const createdAt = meta?.createdAt ? new Date(meta.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' }) : null;
  const updatedAt = meta?.updatedAt ? new Date(meta.updatedAt).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' }) : null;

  return (
    <div className="bg-white rounded-3xl border border-[#D8C8B5]/60 p-7 sm:p-9 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-6 pb-4 border-b border-[#D8C8B5]/40 gap-2">
        <h3 className="font-serif text-2xl text-[#202522] font-normal">
          Barcode &amp; QR Code
        </h3>
        <span className="text-xs text-[#202522]/50 uppercase tracking-widest font-medium">
          Product Authentication
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        {/* Barcode section */}
        <div className="bg-[#F7F5F0]/70 border border-[#D8C8B5]/60 rounded-2xl p-6 flex flex-col items-center justify-center text-center">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-[#78917E] uppercase tracking-widest mb-4">
            <ScanLine className="w-4 h-4" />
            <span>Barcode</span>
          </div>

          {/* Barcode visual card */}
          <div className="bg-white px-8 py-4 rounded-xl border border-[#D8C8B5]/60 flex flex-col items-center shadow-xs">
            <div
              className="h-14 flex items-center gap-[3px] px-2 mb-2"
              aria-label={`Barcode: ${barcode || sku}`}
            >
              {[4, 2, 5, 2, 6, 3, 2, 5, 4, 2, 6, 3, 4, 2, 5, 3, 2, 6, 2, 4, 5, 3].map((height, idx) => (
                <div
                  key={idx}
                  className="bg-[#202522]"
                  style={{
                    width: idx % 3 === 0 ? '3px' : idx % 2 === 0 ? '1.5px' : '2px',
                    height: `${height * 7}px`
                  }}
                />
              ))}
            </div>
            <span className="font-mono text-sm tracking-widest font-semibold text-[#202522]">
              {barcode || sku || 'N/A'}
            </span>
          </div>

          <p className="text-[11px] text-[#202522]/50 mt-3">
            GS1 standard barcode identifier for supply chain traceability
          </p>
        </div>

        {/* QR Code section */}
        <div className="bg-[#F7F5F0]/70 border border-[#D8C8B5]/60 rounded-2xl p-6 flex flex-col items-center justify-center text-center">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-[#78917E] uppercase tracking-widest mb-4">
            <QrCode className="w-4 h-4" />
            <span>QR Code</span>
          </div>

          {qrCodeUrl ? (
            <div className="bg-white p-3 rounded-2xl border border-[#D8C8B5]/60 shadow-xs">
              <img
                src={qrCodeUrl}
                alt="Product verification QR code"
                className="w-28 h-28 object-contain"
                loading="lazy"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            </div>
          ) : (
            <div className="w-28 h-28 bg-white border border-[#D8C8B5]/60 rounded-2xl flex items-center justify-center text-[#202522]/40 text-xs">
              QR Code unavailable
            </div>
          )}

          <p className="text-[11px] text-[#202522]/50 mt-3">
            Scan via camera to view verified batch authenticity certificate
          </p>
        </div>
      </div>

      {/* Meta dates */}
      {(createdAt || updatedAt) && (
        <div className="mt-6 pt-4 border-t border-[#D8C8B5]/30 flex flex-wrap items-center justify-between text-xs text-[#202522]/50 gap-2">
          {createdAt && (
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-[#78917E]" />
              <span>Cataloged: <strong className="text-[#202522]">{createdAt}</strong></span>
            </div>
          )}
          {updatedAt && (
            <div>
              <span>Verified registry update: <strong className="text-[#202522]">{updatedAt}</strong></span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
