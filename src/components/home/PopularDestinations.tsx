import Link from 'next/link';
import { MapPin, Star } from 'lucide-react';

const destinations = [
  {
    id: 1,
    name: 'Paris, France',
    image: 'https://images.unsplash.com/photo-1502602898536-47ad22581b52?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    rating: 4.8,
    reviews: 12543,
    price: 'from $189',
    description: 'The City of Light awaits with iconic landmarks, world-class cuisine, and timeless romance.',
  },
  {
    id: 2,
    name: 'Tokyo, Japan',
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    reviews: 8932,
    price: 'from $245',
    description: 'Experience the perfect blend of ancient traditions and cutting-edge technology.',
  },
  {
    id: 3,
    name: 'New York, USA',
    image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    rating: 4.7,
    reviews: 15621,
    price: 'from $199',
    description: 'The city that never sleeps offers endless entertainment, culture, and iconic skylines.',
  },
  {
    id: 4,
    name: 'Bali, Indonesia',
    image: 'https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    rating: 4.8,
    reviews: 9876,
    price: 'from $129',
    description: 'Tropical paradise with stunning beaches, rich culture, and spiritual experiences.',
  },
  {
    id: 5,
    name: 'London, UK',
    image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    rating: 4.6,
    reviews: 11234,
    price: 'from $169',
    description: 'Historic charm meets modern sophistication in this iconic European capital.',
  },
  {
    id: 6,
    name: 'Dubai, UAE',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    rating: 4.7,
    reviews: 7654,
    price: 'from $219',
    description: 'Luxury and innovation converge in this futuristic desert metropolis.',
  },
];

export function PopularDestinations() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Popular Destinations
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover the world's most beloved travel destinations, carefully curated for unforgettable experiences.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {destinations.map((destination) => (
            <Link
              key={destination.id}
              href={`/search?type=hotels&destination=${encodeURIComponent(destination.name)}`}
              className="group bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative">
                <img
                  src={destination.image}
                  alt={destination.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 right-4 bg-white px-2 py-1 rounded-lg text-sm font-semibold text-blue-600">
                  {destination.price}
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                    {destination.name}
                  </h3>
                  <div className="flex items-center text-yellow-500">
                    <Star size={16} className="fill-current" />
                    <span className="ml-1 text-sm font-medium text-gray-700">
                      {destination.rating}
                    </span>
                  </div>
                </div>
                
                <p className="text-gray-600 text-sm mb-3">
                  {destination.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-gray-500 text-sm">
                    <MapPin size={14} className="mr-1" />
                    <span>{destination.reviews.toLocaleString()} reviews</span>
                  </div>
                  <span className="text-blue-600 font-medium text-sm group-hover:text-blue-700">
                    Explore →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link
            href="/destinations"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            View All Destinations
          </Link>
        </div>
      </div>
    </section>
  );
} 