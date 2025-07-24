import { SearchBar } from '../search/SearchBar';

export function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white">
      {/* Background Image Overlay */}
      <div className="absolute inset-0 bg-black/30"></div>
      
      {/* Background Pattern */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='7' cy='7' r='1'/%3E%3Ccircle cx='27' cy='7' r='1'/%3E%3Ccircle cx='47' cy='7' r='1'/%3E%3Ccircle cx='7' cy='27' r='1'/%3E%3Ccircle cx='27' cy='27' r='1'/%3E%3Ccircle cx='47' cy='27' r='1'/%3E%3Ccircle cx='7' cy='47' r='1'/%3E%3Ccircle cx='27' cy='47' r='1'/%3E%3Ccircle cx='47' cy='47' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")"
        }}
      ></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Your Journey
            <span className="block text-yellow-400">Starts Here</span>
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
            Discover amazing destinations, find the best deals, and create unforgettable memories with our comprehensive travel booking platform.
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-5xl mx-auto">
          <SearchBar />
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 text-center">
          <div>
            <div className="text-3xl md:text-4xl font-bold text-yellow-400">500K+</div>
            <div className="text-blue-100 mt-1">Hotels Worldwide</div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-bold text-yellow-400">1M+</div>
            <div className="text-blue-100 mt-1">Flight Routes</div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-bold text-yellow-400">50K+</div>
            <div className="text-blue-100 mt-1">Car Rental Locations</div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-bold text-yellow-400">10M+</div>
            <div className="text-blue-100 mt-1">Happy Travelers</div>
          </div>
        </div>
      </div>
    </section>
  );
} 