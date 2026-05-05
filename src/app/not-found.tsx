import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white to-gray-50 px-4">
      <div className="text-center space-y-8">
        {/* 404 Text */}
        <h1 className="text-7xl font-extrabold text-black tracking-tight">
          4<span className="text-neon-green">0</span>4
        </h1>

        {/* Message */}
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-gray-800">Page not found</h2>
          <p className="text-gray-500">
            Sorry, the page you are looking for doesn’t exist or has been moved.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <Link
            href="/"
            className="bg-neon-green text-black px-6 py-3 rounded-xl font-semibold hover:bg-neon-green-dark transition"
          >
            Go Home
          </Link>

          <Link
            href="/products"
            className="border border-gray-300 px-6 py-3 rounded-xl font-semibold text-gray-700 hover:bg-gray-100 transition"
          >
            Browse Products
          </Link>
        </div>

        {/* Subtle Animation Dot */}
        <div className="flex justify-center gap-2 pt-4">
          <span className="w-2 h-2 bg-neon-green rounded-full animate-bounce"></span>
          <span className="w-2 h-2 bg-neon-green rounded-full animate-bounce [animation-delay:0.15s]"></span>
          <span className="w-2 h-2 bg-neon-green rounded-full animate-bounce [animation-delay:0.3s]"></span>
        </div>
      </div>
    </div>
  );
}
