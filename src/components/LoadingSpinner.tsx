export default function LoadingSpinner() {
  return (
    <div className="min-h-[400px] flex flex-col items-center justify-center gap-6">

      {/* Spinner */}
      <div className="relative">
        <div className="w-16 h-16 border-4 border-gray-200 rounded-full" />
        <div className="absolute inset-0 w-16 h-16 border-4 border-neon-green border-t-transparent rounded-full animate-spin" />
      </div>

      {/* Text */}
      <div className="text-center">
        <p className="text-lg font-semibold text-gray-800 animate-pulse">
          Loading...
        </p>
        <p className="text-sm text-gray-500">
          Please wait a moment
        </p>
      </div>

    </div>
  );
}