'use client';

import { Loader2 } from 'lucide-react';

export default function LoadingPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="text-center space-y-6 animate-fade-in">
        <div className="relative">
          <div className="w-20 h-20 border-4 border-gray-200 rounded-full"></div>
          <div className="w-20 h-20 border-4 border-neon-green border-t-transparent rounded-full animate-spin absolute top-0 left-1/2 -translate-x-1/2"></div>
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-black">Loading...</h2>
          <p className="text-gray-600">Please wait while we prepare your experience</p>
        </div>
        <div className="flex items-center justify-center gap-1">
          <div className="w-2 h-2 bg-neon-green rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-neon-green rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-2 h-2 bg-neon-green rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>
      </div>
    </div>
  );
}
