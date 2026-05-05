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

  if (products.length === 0) return null;

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? products.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === products.length - 1 ? 0 : prev + 1));
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const product = products[currentIndex];

  return (
    <div className="relative max-w-2xl mx-auto">
      {/* Main Card */}
      <div
        onClick={() => router.push(`/products/${product.id}`)}
        className="cursor-pointer bg-white border border-gray-200 rounded-2xl overflow-hidden hover:border-neon-green hover:shadow-lg transition-all duration-300"
      >
        <div className="relative h-64 overflow-hidden bg-gray-100 flex items-center justify-center text-8xl">
          {product.image ? (
            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
          ) : (
            '📦'
          )}
        </div>

        <div className="p-6">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-xl font-semibold text-black line-clamp-1">
              {product.name}
            </h3>
            <span className="text-2xl font-bold text-black ml-2">
              BDT {(product.price || 0).toFixed(2)}
            </span>
          </div>
          
          <p className="text-gray-600 text-sm line-clamp-2 mb-4">
            {product.description}
          </p>

          <button
            onClick={(e) => { 
              e.stopPropagation();
              // Add to cart logic
            }}
            className="w-full bg-neon-green text-black py-3 rounded-xl hover:bg-neon-green-dark transition font-medium flex items-center justify-center gap-2"
          >
            <ShoppingCart size={18} />
            Add to Cart
          </button>
        </div>
      </div>

      {/* Navigation Arrows */}
      {products.length > 3 && (
        <>
          <button
            onClick={goToPrevious}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 bg-white p-3 rounded-full shadow-lg hover:bg-gray-100 transition z-10"
          >
            ←
          </button>

          <button
            onClick={goToNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 bg-white p-3 rounded-full shadow-lg hover:bg-gray-100 transition z-10"
          >
            →
          </button>
        </>
      )}

      {/* Dots Indicator */}
      {products.length > 3 && (
        <div className="flex justify-center gap-2 mt-6">
          {products.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentIndex 
                  ? 'bg-neon-green w-8' 
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
