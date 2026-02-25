import { Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-green-600 via-emerald-500 to-lime-400 text-white py-6 mt-12">
      <div className="max-w-6xl mx-auto px-4 text-center space-y-2">
        
        <p className="flex items-center justify-center gap-2 text-sm md:text-base">
          © {new Date().getFullYear()} 
          <span className="font-semibold">Smart Food Tracker</span>
          • Made with 
          <Heart size={16} className="text-red-200 animate-pulse" />
          by Satyam
        </p>

        <p className="text-xs opacity-80">
          Track expiry. Reduce waste. Stay healthy.
        </p>

      </div>
    </footer>
  );
}
