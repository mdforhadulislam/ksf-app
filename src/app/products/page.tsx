'use client';

import { useEffect, useState } from 'react';
import ProductCard from '@/components/ProductCard';
import LoadingSpinner from '@/components/LoadingSpinner';

export default function ProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [priceRange, setPriceRange] = useState('');
  const [loading, setLoading] = useState(true);
  

  const fetchProducts = async () => {
    try {
      const res = await fetch('/api/products');
      const data = await res.json();
      setProducts(data);
      setLoading(false);
    } catch (error) { setLoading(false); }
  };

  const fetchCategories = async () => {
    try {
      const res = await fetch('/api/categories');
      const data = await res.json();
      setCategories(data);
    } catch (error) { console.error('Failed to fetch categories'); }
  };

  const filteredProducts = products.filter(p => {
    // Category filter
    if (selectedCategory && p.category !== selectedCategory) return false;
    
    // Price filter
    if (priceRange) {
      const [min, max] = priceRange.split('-').map(Number);
      if (max) {
        return p.price >= min && p.price <= max;
      } else {
        return p.price >= min;
      }
    }
    return true;
  });


  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);


  return (
    <div className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-black">
            All <span className="text-neon-green">Products</span>
          </h1>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-8">
          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-xl"
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.name}>{cat.name}</option>
            ))}
          </select>

          {/* Price Filter */}
          <select
            value={priceRange}
            onChange={(e) => setPriceRange(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-xl"
          >
            <option value="">All Prices</option>
            <option value="0-50">BDT 0 - 50</option>
            <option value="50-100">BDT 50 - 100</option>
            <option value="100-200">BDT 100 - 200</option>
            <option value="200-500">BDT 200 - 500</option>
            <option value="500">BDT 500+</option>
          </select>

          {/* Clear Filters */}
          {(selectedCategory || priceRange) && (
            <button
              onClick={() => { setSelectedCategory(''); setPriceRange(''); }}
              className="text-sm text-neon-green hover:underline"
            >
              Clear Filters
            </button>
          )}
        </div>

        {loading ? (
          <LoadingSpinner />
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredProducts.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-12 text-gray-500">
                No products found matching your criteria.
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
