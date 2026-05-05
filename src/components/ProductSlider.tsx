'use client';

import { useState } from 'react';
import { Product } from '@/types';
import { ShoppingCart } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface ProductSliderProps {
  products: Product[];
}

export default function ProductSlider({ products }: ProductSliderProps) {
  const [startIndex, setStartIndex] = useState(0);
  const router = useRouter();
  const itemsPerView = 4;

  const canScrollLeft = startIndex > 0;
  const canScrollRight = startIndex + itemsPerView < products.length;

  const scrollLeft = () => {
    if (canScrollLeft) {
      setStartIndex(startIndex - 1);
    }
  };

  const scrollRight = () => {
    if (canScrollRight) {
      setStartIndex(startIndex + 1);
    }
  };

  const visibleProducts = products.slice(startIndex, startIndex + itemsPerView);

  if (products.length === 0) return null;

  return (
    <div className="relative">
      <div className="flex gap-6 overflow-hidden">
        {visibleProducts.map((product, index) => (
          <div
            key={product.id}
            onClick={() => router.push(`/products/${product.id}`)}
            className="flex-shrink-0 w-1/4 cursor-pointer bg-white border border-gray-200 rounded-2xl overflow-hidden hover:border-neon-green hover:shadow-lg transition-all duration-300"
          >
            <div className="relative h-48 overflow-hidden bg-gray-100 flex items-center justify-center text-6xl">
              {product.image ? (
                <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
              ) : (
                '📦'
              )}
            </div>
            <div className="p-5">
              <h3 className="font-semibold text-black mb-2 line-clamp-1">
                {product.name}
              </h3>
              <div className="flex justify-between items-center">
                <span className="text-xl font-bold text-black">
                  BDT {product.price.toFixed(2)}
                </span>
                <button 
                  onClick={(e) => { e.stopPropagation(); }}
                  className="bg-neon-green text-black p-2 rounded-xl hover:bg-neon-green-dark transition"
                >
                  <ShoppingCart size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {canScrollLeft && (
        <button
          onClick={scrollLeft}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white p-2 rounded-full shadow-lg hover:bg-gray-100 transition z-10"
        >
          ←
        </button>
      )}

      {canScrollRight && (
        <button
          onClick={scrollRight}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white p-2 rounded-full shadow-lg hover:bg-gray-100 transition z-10"
        >
          →
        </button>
      )}
    </div>
  );
}
