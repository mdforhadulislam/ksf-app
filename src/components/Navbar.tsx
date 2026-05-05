'use client';

import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { ShoppingCart, User, LogOut, ChevronDown } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

export default function Navbar() {
  const { user, logout, isAdmin } = useAuth();
  const { itemCount } = useCart();
  const router = useRouter();
  const [showDropdown, setShowDropdown] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  // ✅ outside click close
  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    toast.success('Logged out');
    router.push('/');
    setShowDropdown(false);
  };

  return (
    <nav className="bg-white/95 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <Link href="/" className="text-2xl font-extrabold text-black">
            K<span className="text-neon-green">S</span>F
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-gray-600 hover:text-black transition text-sm font-medium">
              Home
            </Link>
            <Link href="/products" className="text-gray-600 hover:text-black transition text-sm font-medium">
              Products
            </Link>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-2">

            {/* Cart */}
            {user && (
              <Link
                href="/cart"
                className="relative text-gray-600 hover:text-black transition flex items-center"
              >
                <ShoppingCart size={18} />

                {itemCount > 0 && (
                  <span className="absolute -top-2 -right-3 bg-neon-green text-black text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </Link>
            )}

            {/* User Dropdown */}
            {user ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setShowDropdown((prev) => !prev)} // ✅ click toggle
                  className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition"
                >
                  <div className="w-8 h-8 bg-neon-green/20 rounded-full flex items-center justify-center">
                    <User size={16} />
                  </div>

                  <span className="text-sm text-gray-700 hidden sm:block">
                    {user.displayName}
                  </span>

                  <ChevronDown
                    size={14}
                    className={`text-gray-500 transition-transform ${
                      showDropdown ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {showDropdown && (
                  <div className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50 animate-fadeIn">

                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-sm font-semibold text-black">
                        {user.displayName}
                      </p>
                      <p className="text-xs text-gray-500">{user.email}</p>
                    </div>

                    {isAdmin && (
                      <Link
                        href="/admin"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition"
                        onClick={() => setShowDropdown(false)}
                      >
                        Admin Panel
                      </Link>
                    )}

                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50 transition flex items-center gap-2"
                    >
                      <LogOut size={14} />
                      Logout
                    </button>
                  </div>
                )}
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