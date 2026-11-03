import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

export default function Breadcrumb({ items = [] }) {
  if (!items || items.length === 0) return null;

  return (
    <nav aria-label="Breadcrumb" className="py-4 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
      <ol className="flex items-center flex-wrap gap-2 text-xs tracking-wide">
        <li>
          <Link
            to="/"
            className="text-[#202522]/60 hover:text-[#202522] uppercase tracking-wider font-semibold transition-colors"
          >
            ShopKart
          </Link>
        </li>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <React.Fragment key={index}>
              <li>
                <ChevronRight className="w-3 h-3 text-[#D8C8B5] flex-shrink-0" />
              </li>
              <li>
                {isLast || !item.link ? (
                  <span
                    className="font-medium text-[#202522] line-clamp-1 max-w-[200px] sm:max-w-xs md:max-w-md"
                    title={item.label}
                  >
                    {item.label}
                  </span>
                ) : (
                  <Link
                    to={item.link}
                    className="hover:text-[#202522] text-[#202522]/60 capitalize transition-colors"
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            </React.Fragment>
          );
        })}
      </ol>
    </nav>
  );
}
