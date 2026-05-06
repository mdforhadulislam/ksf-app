'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const slides = [
  {
    title: 'New Collection',
    subtitle: 'Discover our latest products with modern design',
    cta: 'Shop Now',
  },
  {
    title: 'Special Offers',
    subtitle: 'Limited time deals on premium items',
    cta: 'View Deals',
  },
];

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const slide = slides[currentSlide];

  return (
    <div className="relative h-[500px] overflow-hidden bg-gray-50 border-b border-gray-200">
      <div className="relative z-10 flex items-center justify-center h-full">
        <div className="text-center px-4 animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-extrabold text-black mb-4">
            {slide.title}
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            {slide.subtitle}
          </p>
          <Link
            href="/products"
            className="bg-neon-green text-black px-8 py-3 rounded-full font-semibold hover:bg-neon-green-dark transition inline-block"
          >
            {slide.cta}
          </Link>
        </div>
      </div>

      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentSlide ? 'w-8 bg-black' : 'bg-gray-400'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
