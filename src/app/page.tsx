'use client';

import { useEffect, useState } from 'react';
import HeroSection from '@/components/HeroSection';
import ProductCard from '@/components/ProductCard';
import LoadingSpinner from '@/components/LoadingSpinner';
import { Product } from '@/types';
import Link from 'next/link';

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('/api/products');
        const data = await res.json();
        setProducts(data.slice(0, 8));
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div>
      <HeroSection />

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-4xl font-extrabold text-black">
              Featured <span className="text-neon-green">Products</span>
            </h2>
            <p className="text-gray-600 mt-3">
              Handpicked products for you
            </p>
          </div>

          {loading ? (
            <LoadingSpinner />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <Link
              href="/products"
              className="border-2 border-neon-green text-black px-8 py-3 rounded-full font-semibold hover:bg-neon-green transition inline-block"
            >
              View All
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: '🚀', title: 'Fast Delivery', desc: 'Quick shipping' },
              { icon: '🛡️', title: 'Secure Payment', desc: 'Safe checkout' },
              { icon: '⭐', title: 'Quality Products', desc: 'Curated items' },
            ].map((feature, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl text-center hover:shadow-lg transition" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="text-4xl mb-3">{feature.icon}</div>
                <h3 className="font-bold text-lg">{feature.title}</h3>
                <p className="text-gray-600 text-sm mt-1">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
