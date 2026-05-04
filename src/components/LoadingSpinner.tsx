export default function LoadingSpinner() {
  return (
    <div className="min-h-[400px] flex items-center justify-center">
      <div className="w-16 h-16 border-4 border-neon-green border-t-transparent rounded-full animate-spin" />
    </div>
  );
}
