'use client';

import Link from 'next/link';
import { Home, ArrowLeft } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="text-center space-y-8 animate-fade-in">
        <div className="space-y-4">
          <h1 className="text-9xl font-extrabold text-black">
            4<span className="text-neon-green">0</span>4
          </h1>
          <h2 className="text-3xl font-bold text-gray-900">Page Not Found</h2>
          <p className="text-gray-600 max-w-md mx-auto">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>

        <div className="flex items-center justify-center gap-4">
          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-2 px-6 py-3 border-2 border-gray-300 rounded-xl font-semibold hover:border-black transition"
          >
            <ArrowLeft size={20} />
            Go Back
          </button>
          <Link
            href="/"
            className="flex items-center gap-2 bg-neon-green text-black px-6 py-3 rounded-xl font-semibold hover:bg-neon-green-dark transition"
          >
            <Home size={20} />
            Home
          </Link>
        </div>
      </div>
    </div>
  );
}
