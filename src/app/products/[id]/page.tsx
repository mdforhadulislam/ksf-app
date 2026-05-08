'use client';

import { useEffect, useState, use } from 'react';
import { useRouter } from 'next/navigation';
import ProductSlider from '@/components/ProductSlider';
import { useCart } from '@/context/CartContext';
import toast from 'react-hot-toast';
import {
  ShoppingCart,
  Zap,
  ArrowLeft,
  BadgePercent,
} from 'lucide-react';

interface ProductDetailsProps {
  params: Promise<{ id: string }>;
}

export default function ProductDetailsPage({
  params,
}: ProductDetailsProps) {
  const { id } = use(params);

  const [product, setProduct] = useState<any>(null);
  const [related, setRelated] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const { addToCart } = useCart();
  const router = useRouter();

  const fetchProduct = async () => {
    try {
      const res = await fetch(`/api/products/${id}`);
      const data = await res.json();

      if (res.ok) {
        setProduct(data);
      }
    } catch (error) {
      console.error('Failed to fetch product');
    }
  };

  const fetchRelated = async () => {
    try {
      const res = await fetch('/api/products');
      const data = await res.json();

      setRelated(data.filter((p: any) => p.id !== id).slice(0, 4));
    } catch (error) {
      console.error('Failed to fetch related products');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchProduct();
      fetchRelated();
    }
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;

    addToCart({
      id: product.id,
      productId: product.id,
      name: product.name,
      price: product.price || 0,
      image: product.image,
      quantity: 1,
    });

    toast.success('Added to cart');
  };

  const handleBuyNow = () => {
    if (!product) return;

    addToCart({
      id: product.id,
      productId: product.id,
      name: product.name,
      price: product.price || 0,
      image: product.image,
      quantity: 1,
    });

    router.push('/checkout');
  };

  if (loading) {
    return (
      <div className="py-24 flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-neon-green border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="py-24 text-center">
        <p className="text-gray-500 text-lg">Product not found</p>
      </div>
    );
  }

  const hasDiscount =
    product.discountPercent && product.discountPercent > 0;

  const originalPrice = hasDiscount
    ? product.price / (1 - product.discountPercent / 100)
    : product.price;

  return (
    <div className="py-20 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Button */}
        <button
          onClick={() => router.push('/products')}
          className="flex items-center gap-2 text-gray-600 hover:text-black transition mb-10"
        >
          <ArrowLeft size={20} />
          Back to Products
        </button>

        {/* Main Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 mb-20">
          
          {/* Product Image */}
          <div className="relative bg-gray-100 rounded-3xl overflow-hidden h-[520px] flex items-center justify-center">
            
            {/* Discount Badge */}
            {hasDiscount && (
              <div className="absolute top-5 left-5 z-10 bg-red-500 text-white px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2 shadow-lg">
                <BadgePercent size={16} />
                {product.discountPercent}% OFF
              </div>
            )}

            {/* Stock Overlay */}
            {product.stock === 0 && (
              <div className="absolute inset-0 bg-black/50 z-20 flex items-center justify-center">
                <span className="bg-red-100 text-red-700 px-5 py-2 rounded-full font-semibold">
                  Out of Stock
                </span>
              </div>
            )}

            {product.image ? (
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-8xl">🎧</span>
            )}
          </div>

          {/* Product Details */}
          <div className="flex flex-col justify-center space-y-7">
            
            {/* Title */}
            <div>
              <h1 className="text-4xl lg:text-5xl font-extrabold text-black mb-3">
                {product.name}
              </h1>

              <p className="text-gray-500 text-lg">
                {product.category}
              </p>
            </div>

            {/* Price */}
            <div className="flex items-center gap-4 flex-wrap">
              <span className="text-4xl font-black text-black">
                BDT {(product?.price || 0).toFixed(2)}
              </span>

              {hasDiscount && (
                <>
                  <span className="text-2xl text-gray-400 line-through">
                    BDT {originalPrice.toFixed(2)}
                  </span>

                  <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-semibold">
                    Save {product.discountPercent}%
                  </span>
                </>
              )}
            </div>

            {/* Description */}
            <div>
              <h3 className="text-lg font-semibold text-black mb-2">
                Description
              </h3>

              <p className="text-gray-700 leading-relaxed text-base">
                {product.description}
              </p>
            </div>

            {/* Stock Status */}
            <div>
              <span
                className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${
                  product.stock > 0
                    ? 'bg-green-100 text-green-700'
                    : 'bg-red-100 text-red-700'
                }`}
              >
                {product.stock > 0
                  ? `In Stock (${product.stock})`
                  : 'Out of Stock'}
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className="flex-1 bg-neon-green text-black py-4 rounded-2xl font-bold hover:bg-neon-green-dark transition flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <ShoppingCart size={20} />
                Add To Cart
              </button>

              <button
                onClick={handleBuyNow}
                disabled={product.stock === 0}
                className="flex-1 bg-black text-white py-4 rounded-2xl font-bold hover:bg-gray-800 transition flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <Zap size={20} />
                Buy Now
              </button>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div className="border-t border-gray-200 pt-16">
          <h2 className="text-3xl font-extrabold text-black mb-8">
            Related{' '}
            <span className="text-neon-green">
              Products
            </span>
          </h2>

          <ProductSlider products={related} />
        </div>
      </div>
    </div>
  );
}