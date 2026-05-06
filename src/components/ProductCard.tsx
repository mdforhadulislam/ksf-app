'use client';

import { Product } from '@/types';
import { ShoppingCart, Zap } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import toast from 'react-hot-toast';

interface ProductCardProps {
  product: Product;
  index?: number;
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const router = useRouter();
  const { addToCart } = useCart();

  const handleClick = () => {
    router.push(`/products/${product.id}`);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
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

  const handleBuyNow = (e: React.MouseEvent) => {
    e.stopPropagation();
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
    <div 
      onClick={handleClick}
      className="cursor-pointer bg-white border border-gray-200 rounded-2xl overflow-hidden hover:border-neon-green hover:shadow-lg transition-all duration-300"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="relative h-60 overflow-hidden bg-gray-100 flex items-center justify-center text-6xl">
        {product.image ? (
          <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
        ) : (
          '📦'
        )}
        {product.stock === 0 && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-medium">
              Out of Stock
            </span>
          </div>
        )}
      </div>

      <div className="p-5">
        <div className="flex flex-col justify-between items-start mb-1">
          <h3 className="font-semibold text-lg text-black line-clamp-1">
            {product.name}
          </h3>
          <span className="text-lg font-bold text-black">
            BDT {(product?.price || 0).toFixed(1)}
          </span>
        </div>
        
        <p className="text-gray-600 text-sm line-clamp-2 mb-3">
          {product.description}
        </p>

        <div className="flex gap-1">
          <button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className="flex-1 bg-neon-green text-black py-2.5 rounded-xl hover:bg-neon-green-dark transition font-medium text-sm flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <ShoppingCart size={16} />
            Add To Cart
          </button>
          <button
            onClick={handleBuyNow}
            disabled={product.stock === 0}
            className="flex-1 bg-white text-black py-2.5 rounded-xl border-2 border-neon-green hover:bg-neon-green hover:text-black transition font-medium text-sm flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <Zap size={16} />
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}
