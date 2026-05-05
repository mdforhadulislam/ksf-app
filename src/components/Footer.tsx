'use client';

import Link from 'next/link';
import { ShoppingBag, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-2xl font-extrabold">
              K<span className="text-neon-green">S</span>F
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Your modern e-commerce destination for premium products with fast delivery and excellent service.
            </p>
            <div className="flex gap-4">
              <a href="https://www.facebook.com/ksfhomedecor/" className="text-gray-400 hover:text-neon-green transition text-sm">Facebook</a>
              <a href="https://www.instagram.com/ksfartificalgarden/" className="text-gray-400 hover:text-neon-green transition text-sm">Instagram</a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-neon-green transition text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-gray-400 hover:text-neon-green transition text-sm">
                  Products
                </Link>
              </li>
              <li>
                <Link href="/cart" className="text-gray-400 hover:text-neon-green transition text-sm">
                  Cart
                </Link>
              </li>
              <li>
                <Link href="/login" className="text-gray-400 hover:text-neon-green transition text-sm">
                  Login
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-lg font-bold mb-4">Customer Service</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm text-gray-400">
                <Mail size={16} />
                <span>support@ksf.com</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-400">
                <Phone size={16} />
                <span>+880 123 456 7890</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-400">
                <MapPin size={16} />
                <span>Dhaka, Bangladesh</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-lg font-bold mb-4">Newsletter</h4>
            <p className="text-gray-400 text-sm mb-4">
              Subscribe to get updates on new products and exclusive offers.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm focus:outline-none focus:border-neon-green"
              />
              <button className="bg-neon-green text-black px-4 py-2 rounded-lg text-sm font-semibold hover:bg-neon-green-dark transition">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} KSF Ecommerce. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="/privacy" className="text-gray-400 hover:text-neon-green text-sm transition">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-gray-400 hover:text-neon-green text-sm transition">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
