import Link from 'next/link';
import Image from 'next/image';
import { Clock, Percent, Zap } from 'lucide-react';
import { Button } from '../ui/Button';

const deals = [
  {
    id: 1,
    type: 'Hotel',
    title: 'Luxury Beach Resorts',
    discount: '40% OFF',
    originalPrice: 299,
    salePrice: 179,
    description: 'Escape to paradise with exclusive deals on 5-star beachfront resorts worldwide.',
    validUntil: '2024-02-15',
    image: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    urgent: true,
  },
  {
    id: 2,
    type: 'Flight',
    title: 'European City Breaks',
    discount: '25% OFF',
    originalPrice: 599,
    salePrice: 449,
    description: 'Discover European capitals with amazing flight deals. Perfect for weekend getaways.',
    validUntil: '2024-02-20',
    image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    urgent: false,
  },
  {
    id: 3,
    type: 'Package',
    title: 'Asia Adventure Bundle',
    discount: '35% OFF',
    originalPrice: 1299,
    salePrice: 844,
    description: 'Complete travel package including flights, hotels, and tours across Southeast Asia.',
    validUntil: '2024-02-10',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    urgent: true,
  },
];

const quickDeals = [
  {
    title: 'Last Minute Hotels',
    discount: 'Up to 60% OFF',
    description: 'Book tonight and save big on unsold inventory',
    icon: Clock,
    color: 'bg-red-500',
  },
  {
    title: 'Early Bird Flights',
    discount: 'Save $100+',
    description: 'Book 3 months ahead for maximum savings',
    icon: Zap,
    color: 'bg-green-500',
  },
  {
    title: 'Package Deals',
    discount: 'Extra 15% OFF',
    description: 'Combine flight + hotel for instant savings',
    icon: Percent,
    color: 'bg-blue-500',
  },
];

export function SpecialDeals() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Special Deals & Offers
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Don&apos;t miss out on these limited-time offers. Save big on your next adventure!
          </p>
        </div>

        {/* Quick Deals */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {quickDeals.map((deal, index) => {
            const Icon = deal.icon;
            return (
              <div
                key={index}
                className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center mb-4">
                  <div className={`${deal.color} p-3 rounded-lg mr-4`}>
                    <Icon size={24} className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{deal.title}</h3>
                    <p className="text-lg font-bold text-blue-600">{deal.discount}</p>
                  </div>
                </div>
                <p className="text-gray-600 text-sm">{deal.description}</p>
              </div>
            );
          })}
        </div>

        {/* Featured Deals */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {deals.map((deal) => (
            <div
              key={deal.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
            >
              {deal.urgent && (
                <div className="bg-red-500 text-white text-center py-2 px-4">
                  <span className="font-semibold text-sm">🔥 LIMITED TIME OFFER</span>
                </div>
              )}
              
              <div className="relative">
                <Image
                  src={deal.image}
                  alt={deal.title}
                  width={800}
                  height={400}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 left-4 bg-green-500 text-white px-3 py-1 rounded-lg font-bold">
                  {deal.discount}
                </div>
                <div className="absolute top-4 right-4 bg-white bg-opacity-90 px-2 py-1 rounded text-sm">
                  {deal.type}
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {deal.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  {deal.description}
                </p>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl font-bold text-gray-900">
                      ${deal.salePrice}
                    </span>
                    <span className="text-lg text-gray-500 line-through">
                      ${deal.originalPrice}
                    </span>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500">Valid until</p>
                    <p className="text-sm font-medium text-gray-700">
                      {new Date(deal.validUntil).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <Button className="w-full" variant="primary">
                  Book Now
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/deals"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            View All Deals
          </Link>
        </div>
      </div>
    </section>
  );
} 