'use client';

import { Product } from '@/types';
import { ShoppingCart, Zap, BadgePercent } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import toast from 'react-hot-toast';

interface ProductCardProps {
  product: Product;
  index?: number;
}

export default function ProductCard({
  product,
  index = 0,
}: ProductCardProps) {
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

  const hasDiscount =
    product.discountPercent &&
    product.discountPercent > 0;

  const originalPrice = hasDiscount
    ? product.price / (1 - product.discountPercent / 100)
    : product.price;

  return (
    <div
      onClick={handleClick}
      className="cursor-pointer bg-white border border-gray-200 rounded-2xl overflow-hidden hover:border-neon-green hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      {/* Product Image */}
      <div className="relative h-60 overflow-hidden bg-gray-100 flex items-center justify-center text-6xl">
        
        {/* Discount Badge */}
        {hasDiscount && (
          <div className="absolute top-3 left-3 z-10 bg-red-500 text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1 shadow-md">
            <BadgePercent size={14} />
            {product.discountPercent}% OFF
          </div>
        )}

        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
          />
        ) : (
          '📦'
        )}

        {/* Out Of Stock Overlay */}
        {product.stock === 0 && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="bg-red-100 text-red-700 px-4 py-2 rounded-full text-sm font-semibold">
              Out of Stock
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        
        {/* Product Name */}
        <div className="mb-2">
          <h3 className="font-bold text-lg text-black line-clamp-1">
            {product.name}
          </h3>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2 flex-wrap mb-3">
          <span className="text-xl font-extrabold text-black">
            BDT {(product?.price || 0).toFixed(1)}
          </span>

          {hasDiscount && (
            <>
              <span className="text-sm text-gray-400 line-through">
                BDT {originalPrice.toFixed(1)}
              </span>

              <span className="text-xs font-semibold bg-red-100 text-red-600 px-2 py-1 rounded-full">
                Save {product.discountPercent}%
              </span>
            </>
          )}
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm line-clamp-2 mb-4 leading-relaxed">
          {product.description}
        </p>

        {/* Buttons */}
        <div className="flex gap-2">
          <button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className="flex-1 bg-neon-green text-black py-2.5 rounded-xl hover:bg-neon-green-dark transition font-semibold text-sm flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <ShoppingCart size={16} />
            Add To Cart
          </button>

          <button
            onClick={handleBuyNow}
            disabled={product.stock === 0}
            className="flex-1 bg-white text-black py-2.5 rounded-xl border-2 border-neon-green hover:bg-neon-green transition font-semibold text-sm flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <Zap size={16} />
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}