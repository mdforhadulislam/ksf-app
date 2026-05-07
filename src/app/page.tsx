'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import ProductCard from '@/components/ProductCard';
import LoadingSpinner from '@/components/LoadingSpinner';

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  
  const fetchFeaturedProducts = async () => {
    try {
      const res = await fetch('/api/products');
      const data = await res.json();
      setFeaturedProducts(data.slice(0, 8));
    } catch (error) { console.error('Error fetching products:', error); }
  };

  const fetchCategories = async () => {
    try {
      const res = await fetch('/api/categories');
      const data = await res.json();
      setCategories(data.slice(0, 4));
    } catch (error) { console.error('Failed to fetch categories'); }
  };


  useEffect(() => {
    fetchFeaturedProducts();
    fetchCategories();
  }, []);


  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-gray-900 to-black text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-4">
            Welcome to <span className="text-neon-green">KSF</span> Store
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Discover premium products with modern shopping experience
          </p>
          <Link
            href="/products"
            className="bg-neon-green text-black px-8 py-3 rounded-full font-semibold text-lg hover:bg-neon-green-dark transition inline-block"
          >
            Shop Now
          </Link>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
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
              {featuredProducts.map((product, index) => (
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

      {/* Categories Section */}
      {categories.length > 0 && (
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-extrabold text-black">
                Shop by <span className="text-neon-green">Category</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {categories.map((cat, i) => (
                <Link
                  key={cat.id}
                  href={`/products?category=${cat.name}`}
                  className="bg-white p-6 rounded-2xl text-center hover:shadow-lg hover:border-neon-green transition group"
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  <div className="text-4xl mb-4">
                    {cat.image ? (
                      <img src={cat.image} alt={cat.name} className="w-16 h-16 mx-auto object-cover rounded-xl" />
                    ) : (
                      '📦'
                    )}
                  </div>
                  <h3 className="font-bold text-lg group-hover:text-neon-green transition">
                    {cat.name}
                  </h3>
                  {cat.description && (
                    <p className="text-gray-600 text-sm mt-2">{cat.description}</p>
                  )}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: '🚀', title: 'Fast Delivery', desc: 'Quick shipping across Bangladesh' },
              { icon: '🛡️', title: 'Secure Payment', desc: 'Safe checkout experience' },
              { icon: '⭐', title: 'Quality Products', desc: 'Curated premium items' },
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
