'use client';

import { useEffect, useState, use } from 'react';
import { useRouter } from 'next/navigation';
import ProductSlider from '@/components/ProductSlider';
import { useCart } from '@/context/CartContext';
import toast from 'react-hot-toast';
import { ShoppingCart, Zap, ArrowLeft } from 'lucide-react';

interface ProductDetailsProps {
  params: Promise<{ id: string }>; // ✅ Promise
}

export default function ProductDetailsPage({ params }: ProductDetailsProps) {
  const { id } = use(params); // ✅ unwrap params

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
      console.error('Failed to fetch related');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchProduct();
      fetchRelated();
    }
  }, [id]); // ✅ use id

  const handleAddToCart = () => {
    if (product) {
      addToCart({
        id: product.id,
        productId: product.id,
        name: product.name,
        price: product.price || 0,
        image: product.image,
        quantity: 1,
      });
      toast.success('Added to cart');
    }
  };

  const handleBuyNow = () => {
    if (product) {
      addToCart({
        id: product.id,
        productId: product.id,
        name: product.name,
        price: product.price || 0,
        image: product.image,
        quantity: 1,
      });
      router.push('/checkout');
    }
  };

  if (loading) {
    return (
      <div className="py-20 text-center">
        <div className="w-16 h-16 border-4 border-neon-green border-t-transparent rounded-full animate-spin mx-auto" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="py-20 text-center">
        <p className="text-gray-500">Product not found</p>
      </div>
    );
  }

  return (
    <div className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => router.push('/products')}
          className="flex items-center gap-2 text-gray-600 hover:text-black mb-8 transition"
        >
          <ArrowLeft size={20} />
          Back to Products
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div className="bg-gray-100 rounded-2xl h-96 flex items-center justify-center text-8xl">
            {product.image ? (
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover rounded-2xl"
              />
            ) : (
              '🎧'
            )}
          </div>

          <div className="space-y-6">
            <div>
              <h1 className="text-4xl font-extrabold text-black mb-2">
                {product.name}
              </h1>
              <p className="text-gray-600">{product.category}</p>
            </div>

            <p className="text-5xl font-bold text-black">
              BDT ${((product?.price || 0)).toFixed(2)}
            </p>

            <p className="text-gray-700 leading-relaxed">
              {product.description}
            </p>

            <div className="flex items-center gap-4">
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${
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

            <div className="flex gap-4 pt-4">
              <button
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className="flex-1 bg-neon-green text-black py-3 rounded-xl font-semibold hover:bg-neon-green-dark transition flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <ShoppingCart size={20} />
                Add to Cart
              </button>

              <button
                onClick={handleBuyNow}
                disabled={product.stock === 0}
                className="flex-1 bg-black text-white py-3 rounded-xl font-semibold hover:bg-gray-800 transition flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <Zap size={20} />
                Buy Now
              </button>
            </div>
          </div>
        </div>

        <div className="border-t pt-16">
          <h2 className="text-3xl font-extrabold text-black mb-8">
            Related <span className="text-neon-green">Products</span>
          </h2>

          <ProductSlider products={related} />
        </div>
      </div>
    </div>
  );
}