'use client';

import { useState } from 'react';
import { Product } from '@/types';
import { ShoppingCart } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface ProductSliderProps {
  products: Product[];
}

export default function ProductSlider({ products }: ProductSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const router = useRouter();

  const getItemsPerView = () => {
    if (typeof window === 'undefined') return 4;
    if (window.innerWidth >= 1024) return 4; // lg
    if (window.innerWidth >= 768) return 3; // md
    if (window.innerWidth >= 640) return 2; // sm
    return 1; // xs
  };

  const [itemsPerView, setItemsPerView] = useState(getItemsPerView());

  // handle resize
  useState(() => {
    const handleResize = () => {
      setItemsPerView(getItemsPerView());
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  });

  const maxIndex = Math.max(0, products.length - itemsPerView);

  const goNext = () => {
    setCurrentIndex((prev) =>
      prev + itemsPerView > maxIndex ? 0 : prev + itemsPerView
    );
  };

  const goPrev = () => {
    setCurrentIndex((prev) =>
      prev - itemsPerView < 0 ? maxIndex : prev - itemsPerView
    );
  };

  const visibleProducts = products.slice(
    currentIndex,
    currentIndex + itemsPerView
  );

  return (
    <div className="relative  mx-auto">
      
      {/* Slider */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {visibleProducts.map((product) => (
          <div
            key={product.id}
            onClick={() => router.push(`/products/${product.id}`)}
            className="cursor-pointer bg-white border border-gray-200 rounded-2xl overflow-hidden hover:border-neon-green hover:shadow-lg transition-all duration-300"
          >
            <div className="h-48 bg-gray-100 flex items-center justify-center text-5xl">
              {product.image ? (
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                '📦'
              )}
            </div>

            <div className="p-4">
              <h3 className="text-lg font-semibold line-clamp-1">
                {product.name}
              </h3>

              <p className="text-sm text-gray-500 line-clamp-2 mb-2">
                {product.description}
              </p>

              <div className="flex justify-between items-center">
                <span className="font-bold">
                  BDT {(product.price || 0).toFixed(2)}
                </span>

                <button
                  onClick={(e) => e.stopPropagation()}
                  className="bg-neon-green p-2 rounded-lg"
                >
                  <ShoppingCart size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Arrows */}
      {products.length > itemsPerView && (
        <>
          <button
            onClick={goPrev}
            className="absolute -left-8 top-1/2 -translate-y-1/2 bg-white shadow p-3 rounded-full"
          >
            ←
          </button>

          <button
            onClick={goNext}
            className="absolute -right-8 top-1/2 -translate-y-1/2 bg-white shadow p-3 rounded-full"
          >
            →
          </button>
        </>
      )}
    </div>
  );
}