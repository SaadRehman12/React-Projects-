
export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="flex flex-col items-center space-y-4">
        {/* Spinner Animation */}
        <div className="relative w-16 h-16">
          <div className="animate-spin absolute inset-0 rounded-full border-4 border-purple-500 border-t-transparent"></div>
        </div>
        
        {/* Pulsing Text */}
        <p className="text-xl font-semibold text-gray-700 animate-pulse">Loading...</p>
      </div>
    </div>
  );
}
