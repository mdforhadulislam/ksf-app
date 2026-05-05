
export default function LoadingPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white to-gray-50">
      
      <div className="flex flex-col items-center gap-8">

        {/* Glow Spinner */}
        <div className="relative">
          <div className="w-20 h-20 rounded-full border border-gray-200"></div>

          <div className="absolute inset-0 rounded-full border-4 border-neon-green border-t-transparent animate-spin shadow-[0_0_25px_rgba(57,255,20,0.4)]"></div>

          {/* Inner pulse */}
          <div className="absolute inset-3 rounded-full bg-neon-green/10 animate-pulse"></div>
        </div>

        {/* Text */}
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold text-black tracking-tight">
            Loading Experience
          </h2>
          <p className="text-gray-500 text-sm">
            Preparing something awesome for you...
          </p>
        </div>

        {/* Animated dots */}
        <div className="flex gap-2">
          <span className="w-2 h-2 bg-neon-green rounded-full animate-bounce"></span>
          <span className="w-2 h-2 bg-neon-green rounded-full animate-bounce [animation-delay:0.15s]"></span>
          <span className="w-2 h-2 bg-neon-green rounded-full animate-bounce [animation-delay:0.3s]"></span>
        </div>

      </div>
    </div>
  );
}