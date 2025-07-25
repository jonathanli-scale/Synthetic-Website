'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import Image from 'next/image';
import { 
  Users, 
  Settings, 
  Fuel, 
  Navigation, 
  Shield,
  Star,
  MapPin
} from 'lucide-react';
import { Car } from '../../types';
import { startBooking } from '../../store/slices/bookingSlice';
import { Button } from '../ui/Button';

interface CarCardProps {
  car: Car;
}

export function CarCard({ car }: CarCardProps) {
  const router = useRouter();
  const dispatch = useDispatch();
  const [showDetails, setShowDetails] = useState(false);

  const savings = car.originalPrice ? car.originalPrice - car.price : 0;

  const handleCarSelection = () => {
    dispatch(startBooking({
      type: 'car',
      totalPrice: car.price,
      car: {
        carId: car.id,
        pickupDate: '',
        dropoffDate: '',
        pickupLocation: car.location.pickupAddress,
        dropoffLocation: car.location.pickupAddress,
        driverAge: 25,
        insurance: car.insurance.included,
      },
    }));
    router.push('/book');
  };

  const getCategoryIcon = () => {
    switch (car.category) {
      case 'luxury':
        return '🏆';
      case 'suv':
        return '🚙';
      case 'economy':
        return '💰';
      default:
        return '🚗';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
      {/* Car Image */}
      <div className="relative h-48">
        <Image
          src={car.images[0]}
          alt={car.name}
          width={800}
          height={400}
          className="w-full h-full object-cover"
        />
        {savings > 0 && (
          <div className="absolute top-4 left-4 bg-green-500 text-white px-2 py-1 rounded text-sm font-medium">
            Save ${savings}/day
          </div>
        )}
        <div className="absolute top-4 right-4 bg-white bg-opacity-90 px-2 py-1 rounded text-sm">
          {getCategoryIcon()} {car.category.charAt(0).toUpperCase() + car.category.slice(1)}
        </div>
      </div>

      <div className="p-6">
        {/* Car Title and Rating */}
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">{car.name}</h3>
            <p className="text-sm text-gray-600">{car.brand} {car.model} {car.year}</p>
          </div>
          <div className="flex items-center">
            <Star size={16} className="text-yellow-500 fill-current mr-1" />
            <span className="text-sm font-medium">{car.rental.rating}</span>
            <span className="text-xs text-gray-500 ml-1">({car.rental.reviewCount})</span>
          </div>
        </div>

        {/* Rental Company and Location */}
        <div className="mb-4">
          <p className="text-sm font-medium text-gray-700">{car.rental.company}</p>
          <div className="flex items-center text-xs text-gray-500 mt-1">
            <MapPin size={12} className="mr-1" />
            <span>{car.location.city}</span>
          </div>
        </div>

        {/* Car Features */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 py-4 border-t border-gray-200">
          <div className="flex items-center text-sm text-gray-600">
            <Users size={14} className="mr-1" />
            <span>{car.features.seats} seats</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Settings size={14} className="mr-1" />
            <span className="capitalize">{car.features.transmission}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Fuel size={14} className="mr-1" />
            <span className="capitalize">{car.features.fuelType}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            {car.features.gps && <Navigation size={14} className="mr-1" />}
            <span>{car.features.gps ? 'GPS' : 'No GPS'}</span>
          </div>
        </div>

        {/* Additional Details (collapsible) */}
        {showDetails && (
          <div className="border-t border-gray-200 pt-4">
            <div className="space-y-3">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Insurance Included</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  {car.insurance.included.map((item, index) => (
                    <li key={index} className="flex items-center">
                      <Shield size={12} className="mr-2 text-green-500" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              
              {car.insurance.optional.length > 0 && (
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Optional Insurance</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {car.insurance.optional.map((item, index) => (
                      <li key={index} className="flex items-center justify-between">
                        <span>{item.name}</span>
                        <span className="font-medium">+${item.price}/day</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div>
                <h4 className="font-medium text-gray-900 mb-1">Mileage</h4>
                <p className="text-sm text-gray-600">
                  {car.mileage.unlimited ? 'Unlimited mileage' : `${car.mileage.limit} miles/day`}
                </p>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 mb-1">Requirements</h4>
                <p className="text-sm text-gray-600">
                  Minimum age: {car.rental.requirements.minAge} years
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Price and Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
          <div>
            <div className="flex items-center space-x-2">
              {car.originalPrice && (
                <span className="text-gray-500 line-through text-sm">
                  ${car.originalPrice}
                </span>
              )}
              <span className="text-2xl font-bold text-gray-900">
                ${car.price}
              </span>
            </div>
            <div className="text-sm text-gray-500">per day</div>
            {savings > 0 && (
              <div className="text-green-600 text-sm font-medium">
                Save ${savings}
              </div>
            )}
          </div>
          
          <div className="flex space-x-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setShowDetails(!showDetails)}
            >
              {showDetails ? 'Hide Details' : 'View Details'}
            </Button>
            <Button size="sm" onClick={handleCarSelection}>
              Select Car
            </Button>
          </div>
        </div>

        {/* Cancellation Policy */}
        <div className="mt-4 pt-4 border-t border-gray-200">
          <p className="text-xs text-gray-500">
            {car.cancellationPolicy}
          </p>
        </div>
      </div>
    </div>
  );
} 