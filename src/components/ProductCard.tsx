'use client';

import Image from 'next/image';
import { Product } from '@/types';
import { useCart } from '@/context/CartContext';
import toast from 'react-hot-toast';
import { ShoppingCart, Zap } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface ProductCardProps {
  product: Product;
  index?: number;
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const { addToCart } = useCart();
  const router = useRouter();

  const handleAddToCart = () => {
    addToCart({
      id: product.id!,
      productId: product.id!,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
    });
    toast.success('Added to cart');
  };

  const handleBuyNow = () => {
    addToCart({
      id: product.id!,
      productId: product.id!,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
    });
    router.push('/checkout');
  };

  return (
    <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:border-neon-green hover:shadow-lg transition-all duration-300" style={{ animationDelay: `${index * 0.1}s` }}>
      <div className="relative h-56 overflow-hidden bg-gray-100">
        <Image
          src={product.image || '/images/placeholder.jpg'}
          alt={product.name}
          fill
          className="object-cover hover:scale-105 transition-transform duration-500"
        />
        {product.stock === 0 && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-medium">
              Out of Stock
            </span>
          </div>
        )}
      </div>

      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-black line-clamp-1">
            {product.name}
          </h3>
          <span className="text-xl font-bold text-black ml-2">
            ${product.price.toFixed(2)}
          </span>
        </div>
        
        <p className="text-gray-600 text-sm line-clamp-2 mb-4">
          {product.description}
        </p>

        <div className="flex gap-2">
          <button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className="flex-1 bg-neon-green text-black py-2.5 rounded-xl hover:bg-neon-green-dark transition font-medium text-sm flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <ShoppingCart size={16} />
            Add
          </button>
          <button
            onClick={handleBuyNow}
            disabled={product.stock === 0}
            className="flex-1 bg-white text-black py-2.5 rounded-xl border-2 border-neon-green hover:bg-neon-green hover:text-black transition font-medium text-sm flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <Zap size={16} />
            Buy
          </button>
        </div>
      </div>
    </div>
  );
}
