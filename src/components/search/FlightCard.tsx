'use client';

import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { Plane, Clock } from 'lucide-react';
import { Flight } from '../../types';
import { Button } from '../ui/Button';
import { startBooking } from '../../store/slices/bookingSlice';
import { openModal } from '../../store/slices/uiSlice';
import { RootState } from '../../store';
import { format } from 'date-fns';

interface FlightCardProps {
  flight: Flight;
}

export function FlightCard({ flight }: FlightCardProps) {
  const router = useRouter();
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state: RootState) => state.user);
  
  const departureTime = new Date(flight.departure);
  const arrivalTime = new Date(flight.arrival);
  const duration = Math.floor(flight.duration / 60) + 'h ' + (flight.duration % 60) + 'm';
  
  const savings = flight.originalPrice ? flight.originalPrice - flight.price : 0;
  const savingsPercentage = flight.originalPrice 
    ? Math.round((savings / flight.originalPrice) * 100) 
    : 0;

  const handleFlightSelection = () => {
    if (!isAuthenticated) {
      dispatch(openModal('login'));
      return;
    }

    // Start flight booking
    dispatch(startBooking({
      type: 'flight',
      totalPrice: flight.price,
      flight: {
        flightId: flight.id,
        passengers: [{ // Default single passenger
          firstName: '',
          lastName: '',
          dateOfBirth: '',
        }],
      }
    }));

    router.push('/book');
  };

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
            <Plane size={16} className="text-white" />
          </div>
          <div>
            <div className="font-semibold text-gray-900">{flight.airline}</div>
            <div className="text-sm text-gray-500">{flight.flightNumber}</div>
          </div>
        </div>
        
        {savings > 0 && (
          <div className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
            {savingsPercentage}% OFF
          </div>
        )}
      </div>

      {/* Flight Route */}
      <div className="flex items-center justify-between mb-4">
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-900">
            {format(departureTime, 'HH:mm')}
          </div>
          <div className="text-sm text-gray-600">{flight.from.code}</div>
          <div className="text-xs text-gray-500">{flight.from.city}</div>
        </div>

        <div className="flex-1 mx-4 relative">
          <div className="border-t-2 border-dashed border-gray-300"></div>
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-2">
            <div className="flex items-center text-xs text-gray-500 space-x-1">
              <Clock size={12} />
              <span>{duration}</span>
            </div>
          </div>
          {flight.stops > 0 && (
            <div className="absolute top-0 left-1/4 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-gray-400 rounded-full"></div>
          )}
        </div>

        <div className="text-center">
          <div className="text-2xl font-bold text-gray-900">
            {format(arrivalTime, 'HH:mm')}
          </div>
          <div className="text-sm text-gray-600">{flight.to.code}</div>
          <div className="text-xs text-gray-500">{flight.to.city}</div>
        </div>
      </div>

      {/* Flight Details */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-4 border-t border-gray-200">
        <div>
          <div className="text-xs text-gray-500">Stops</div>
          <div className="font-medium">
            {flight.stops === 0 ? 'Non-stop' : `${flight.stops} stop${flight.stops > 1 ? 's' : ''}`}
          </div>
        </div>
        <div>
          <div className="text-xs text-gray-500">Class</div>
          <div className="font-medium capitalize">{flight.cabinClass}</div>
        </div>
        <div>
          <div className="text-xs text-gray-500">Baggage</div>
          <div className="font-medium text-sm">{flight.baggage.carry}</div>
        </div>
        <div>
          <div className="text-xs text-gray-500">Date</div>
          <div className="font-medium">{format(departureTime, 'MMM dd')}</div>
        </div>
      </div>

      {/* Price and Actions */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-200">
        <div>
          <div className="flex items-center space-x-2">
            {flight.originalPrice && (
              <span className="text-gray-500 line-through text-sm">
                ${flight.originalPrice}
              </span>
            )}
            <span className="text-2xl font-bold text-gray-900">
              ${flight.price}
            </span>
          </div>
          <div className="text-sm text-gray-500">per person</div>
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
            onClick={() => router.push(`/flights/${flight.id}`)}
          >
            View Details
          </Button>
          <Button size="sm" onClick={handleFlightSelection}>
            Select Flight
          </Button>
        </div>
      </div>

      {/* Cancellation Policy */}
      <div className="mt-3 text-xs text-gray-500">
        {flight.cancellationPolicy}
      </div>
    </div>
  );
} 