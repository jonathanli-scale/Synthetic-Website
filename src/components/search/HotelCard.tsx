'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { MapPin, Star, Wifi, Car, Utensils, Waves } from 'lucide-react';
import { Hotel } from '../../types';
import { Button } from '../ui/Button';
import { startBooking } from '../../store/slices/bookingSlice';
import { openModal } from '../../store/slices/uiSlice';
import { RootState } from '../../store';

interface HotelCardProps {
  hotel: Hotel;
}

const amenityIcons: Record<string, any> = {
  'Free WiFi': Wifi,
  'Pool': Waves,
  'Restaurant': Utensils,
  'Parking': Car,
};

export function HotelCard({ hotel }: HotelCardProps) {
  const router = useRouter();
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state: RootState) => state.user);
  
  const savings = hotel.originalPrice ? hotel.originalPrice - hotel.price : 0;
  const savingsPercentage = hotel.originalPrice 
    ? Math.round((savings / hotel.originalPrice) * 100) 
    : 0;

  const handleQuickBooking = () => {
    if (!isAuthenticated) {
      dispatch(openModal('login'));
      return;
    }

    // Quick booking with default values
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const dayAfter = new Date();
    dayAfter.setDate(dayAfter.getDate() + 2);

    dispatch(startBooking({
      type: 'hotel',
      totalPrice: hotel.price,
      hotel: {
        hotelId: hotel.id,
        roomId: hotel.rooms[0]?.id || 'standard',
        checkIn: tomorrow.toISOString().split('T')[0],
        checkOut: dayAfter.toISOString().split('T')[0],
        guests: 2,
      }
    }));

    router.push('/book');
  };

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
      <div className="md:flex">
        {/* Image Section */}
        <div className="md:w-1/3 relative">
          <img
            src={hotel.images[0]}
            alt={hotel.name}
            className="w-full h-48 md:h-full object-cover"
          />
          {hotel.featured && (
            <div className="absolute top-3 left-3 bg-blue-600 text-white px-2 py-1 rounded text-xs font-semibold">
              Featured
            </div>
          )}
          {savings > 0 && (
            <div className="absolute top-3 right-3 bg-green-500 text-white px-2 py-1 rounded text-xs font-semibold">
              {savingsPercentage}% OFF
            </div>
          )}
        </div>

        {/* Content Section */}
        <div className="md:w-2/3 p-6">
          <div className="flex justify-between items-start mb-3">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-1 hover:text-blue-600">
                <Link href={`/hotels/${hotel.id}`}>
                  {hotel.name}
                </Link>
              </h3>
              <div className="flex items-center text-gray-600 text-sm mb-2">
                <MapPin size={14} className="mr-1" />
                <span>{hotel.location.address}, {hotel.location.city}</span>
              </div>
              <div className="flex items-center mb-3">
                <div className="flex items-center text-yellow-500 mr-2">
                  <Star size={16} className="fill-current" />
                  <span className="ml-1 text-sm font-medium text-gray-700">
                    {hotel.rating}
                  </span>
                </div>
                <span className="text-gray-500 text-sm">
                  ({hotel.reviewCount.toLocaleString()} reviews)
                </span>
              </div>
            </div>
            
            {/* Price Section */}
            <div className="text-right">
              <div className="flex items-center justify-end space-x-2 mb-1">
                {hotel.originalPrice && (
                  <span className="text-gray-500 line-through text-sm">
                    ${hotel.originalPrice}
                  </span>
                )}
                <span className="text-2xl font-bold text-gray-900">
                  ${hotel.price}
                </span>
              </div>
              <div className="text-gray-500 text-sm">per night</div>
              {savings > 0 && (
                <div className="text-green-600 text-sm font-medium">
                  Save ${savings}
                </div>
              )}
            </div>
          </div>

          {/* Description */}
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {hotel.description}
          </p>

          {/* Amenities */}
          <div className="flex flex-wrap gap-2 mb-4">
            {hotel.amenities.slice(0, 6).map((amenity) => {
              const Icon = amenityIcons[amenity];
              return (
                <div
                  key={amenity}
                  className="flex items-center bg-gray-100 px-2 py-1 rounded text-xs text-gray-700"
                >
                  {Icon && <Icon size={12} className="mr-1" />}
                  {amenity}
                </div>
              );
            })}
            {hotel.amenities.length > 6 && (
              <div className="flex items-center bg-gray-100 px-2 py-1 rounded text-xs text-gray-700">
                +{hotel.amenities.length - 6} more
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">
              {hotel.cancellationPolicy}
            </div>
            <div className="flex space-x-2">
              <Link href={`/hotels/${hotel.id}`}>
                <Button variant="outline" size="sm">
                  View Details
                </Button>
              </Link>
              <Button size="sm" onClick={handleQuickBooking}>
                Book Now
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 