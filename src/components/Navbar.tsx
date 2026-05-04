'use client';

import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { ShoppingCart, User, LogOut } from 'lucide-react';

export default function Navbar() {
  const { user, logout, isAdmin } = useAuth();
  const { itemCount } = useCart();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    toast.success('Logged out');
    router.push('/');
  };

  return (
    <nav className="bg-white/95 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-2xl font-extrabold text-black">
            K<span className="text-neon-green">S</span>F
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-gray-600 hover:text-black transition text-sm font-medium">
              Home
            </Link>
            <Link href="/products" className="text-gray-600 hover:text-black transition text-sm font-medium">
              Products
            </Link>
            {user && (
              <Link href="/cart" className="text-gray-600 hover:text-black transition relative text-sm font-medium flex items-center gap-1">
                <ShoppingCart size={18} />
                Cart
                {itemCount > 0 && (
                  <span className="absolute -top-2 -right-4 bg-neon-green text-black text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </Link>
            )}
            {isAdmin && (
              <Link href="/admin" className="text-gray-600 hover:text-black transition text-sm font-medium">
                Admin
              </Link>
            )}
          </div>

          <div className="flex items-center gap-3">
            {user ? (
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-600 hidden sm:flex items-center gap-1">
                  <User size={16} />
                  {user.displayName}
                </span>
                <button 
                  onClick={handleLogout} 
                  className="bg-black text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-gray-800 transition flex items-center gap-1"
                >
                  <LogOut size={16} />
                  Logout
                </button>
              </div>
            ) : (
              <Link 
                href="/login" 
                className="bg-neon-green text-black px-5 py-2 rounded-lg text-sm font-semibold hover:bg-neon-green-dark transition"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
