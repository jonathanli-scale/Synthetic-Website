'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { 
  Plane, 
  Clock, 
  Calendar, 
  Users, 
  Luggage, 
  ArrowLeft, 
  Heart, 
  Share,
  MapPin,
  AlertCircle
} from 'lucide-react';
import { format } from 'date-fns';
import { Flight } from '../../../types';
import { mockFlights } from '../../../utils/mockData';
import { startBooking } from '../../../store/slices/bookingSlice';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';

export default function FlightDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const dispatch = useDispatch();
  const [flight, setFlight] = useState<Flight | null>(null);
  const [passengers, setPassengers] = useState(1);
  const [selectedDate, setSelectedDate] = useState('');

  useEffect(() => {
    const flightData = mockFlights.find(f => f.id === params.id);
    setFlight(flightData || null);
    if (flightData) {
      setSelectedDate(format(new Date(flightData.departure), 'yyyy-MM-dd'));
    }
  }, [params.id]);

  if (!flight) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Flight not found</h2>
          <p className="text-gray-600 mb-4">The flight you&apos;re looking for doesn&apos;t exist.</p>
          <Button onClick={() => router.back()}>Go Back</Button>
        </div>
      </div>
    );
  }

  const departureTime = new Date(flight.departure);
  const arrivalTime = new Date(flight.arrival);
  const duration = Math.floor(flight.duration / 60) + 'h ' + (flight.duration % 60) + 'm';
  const totalPrice = flight.price * passengers;
  const savings = flight.originalPrice ? (flight.originalPrice - flight.price) * passengers : 0;

  const handleBooking = () => {
    dispatch(startBooking({
      type: 'flight',
      flight: {
        flightId: flight.id,
        passengers: Array.from({ length: passengers }, () => ({
          firstName: '',
          lastName: '',
          dateOfBirth: '',
        })),
      },
      totalPrice,
    }));
    router.push('/book');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => router.back()}
              className="flex items-center text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft size={20} className="mr-2" />
              Back to search
            </button>
            <div className="flex items-center space-x-3">
              <button className="p-2 text-gray-600 hover:text-red-500 transition-colors">
                <Heart size={20} />
              </button>
              <button className="p-2 text-gray-600 hover:text-blue-500 transition-colors">
                <Share size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Flight Overview */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                    <Plane size={24} className="text-white" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900">{flight.airline}</h1>
                    <p className="text-gray-600">{flight.flightNumber}</p>
                  </div>
                </div>
                
                {savings > 0 && (
                  <div className="bg-green-100 text-green-800 px-4 py-2 rounded-lg">
                    <span className="font-semibold">Save ${savings}</span>
                  </div>
                )}
              </div>

              {/* Flight Route */}
              <div className="bg-gray-50 rounded-lg p-6 mb-6">
                <div className="flex items-center justify-between">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-gray-900 mb-1">
                      {format(departureTime, 'HH:mm')}
                    </div>
                    <div className="text-lg font-semibold text-gray-700 mb-1">
                      {flight.from.code}
                    </div>
                    <div className="text-sm text-gray-600">{flight.from.city}</div>
                    <div className="text-xs text-gray-500 mt-1">
                      {format(departureTime, 'MMM dd, yyyy')}
                    </div>
                  </div>

                  <div className="flex-1 mx-8 relative">
                    <div className="border-t-2 border-dashed border-gray-300"></div>
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-4 py-2 rounded-lg border">
                      <div className="flex items-center text-sm text-gray-600 space-x-2">
                        <Clock size={16} />
                        <span>{duration}</span>
                      </div>
                      <div className="text-xs text-center text-gray-500 mt-1">
                        {flight.stops === 0 ? 'Non-stop' : `${flight.stops} stop${flight.stops > 1 ? 's' : ''}`}
                      </div>
                    </div>
                    <div className="absolute top-0 left-0 transform -translate-y-1/2 w-3 h-3 bg-blue-600 rounded-full"></div>
                    <div className="absolute top-0 right-0 transform -translate-y-1/2 w-3 h-3 bg-blue-600 rounded-full"></div>
                  </div>

                  <div className="text-center">
                    <div className="text-3xl font-bold text-gray-900 mb-1">
                      {format(arrivalTime, 'HH:mm')}
                    </div>
                    <div className="text-lg font-semibold text-gray-700 mb-1">
                      {flight.to.code}
                    </div>
                    <div className="text-sm text-gray-600">{flight.to.city}</div>
                    <div className="text-xs text-gray-500 mt-1">
                      {format(arrivalTime, 'MMM dd, yyyy')}
                    </div>
                  </div>
                </div>
              </div>

              {/* Airport Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-blue-50 rounded-lg p-4">
                  <div className="flex items-center mb-2">
                    <MapPin size={18} className="text-blue-600 mr-2" />
                    <span className="font-semibold text-gray-900">Departure</span>
                  </div>
                  <p className="text-sm text-gray-700">{flight.from.name}</p>
                  <p className="text-sm text-gray-600">{flight.from.city}</p>
                </div>
                <div className="bg-green-50 rounded-lg p-4">
                  <div className="flex items-center mb-2">
                    <MapPin size={18} className="text-green-600 mr-2" />
                    <span className="font-semibold text-gray-900">Arrival</span>
                  </div>
                  <p className="text-sm text-gray-700">{flight.to.name}</p>
                  <p className="text-sm text-gray-600">{flight.to.city}</p>
                </div>
              </div>
            </div>

            {/* Flight Details */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Flight Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Aircraft</h3>
                  <p className="text-gray-600">{flight.aircraft?.name || 'Boeing 777-300ER'}</p>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Cabin Class</h3>
                  <p className="text-gray-600 capitalize">{flight.cabinClass}</p>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Flight Distance</h3>
                  <p className="text-gray-600">{flight.distance ? `${flight.distance.toLocaleString()} miles` : '3,459 miles'}</p>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Flight Time</h3>
                  <p className="text-gray-600">{duration}</p>
                </div>
              </div>
              
              {/* Enhanced Details */}
              {flight.seatMap && (
                <div className="border-t border-gray-200 pt-6 mt-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <h3 className="font-medium text-gray-900 mb-2">Seat Configuration</h3>
                      <p className="text-gray-600">{flight.seatMap.seatConfiguration}</p>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900 mb-2">Total Seats</h3>
                      <p className="text-gray-600">{flight.seatMap.totalSeats}</p>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900 mb-2">Available Seats</h3>
                      <p className={`font-medium ${flight.seatMap.availableSeats < 10 ? 'text-red-600' : 'text-green-600'}`}>
                        {flight.seatMap.availableSeats} remaining
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Flight Amenities */}
            {flight.amenities && (
              <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">In-Flight Amenities</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${flight.amenities.wifi ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                    <span className={flight.amenities.wifi ? 'text-gray-900' : 'text-gray-500'}>Wi-Fi</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${flight.amenities.entertainment ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                    <span className={flight.amenities.entertainment ? 'text-gray-900' : 'text-gray-500'}>Entertainment</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${flight.amenities.power ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                    <span className={flight.amenities.power ? 'text-gray-900' : 'text-gray-500'}>Power Outlets</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${flight.amenities.meals.length > 0 ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                    <span className={flight.amenities.meals.length > 0 ? 'text-gray-900' : 'text-gray-500'}>
                      {flight.amenities.meals.length > 0 ? flight.amenities.meals.join(', ') : 'Meals'}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Baggage Information */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Baggage Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-start space-x-3">
                  <Luggage size={24} className="text-blue-600 mt-1" />
                  <div>
                    <h3 className="font-medium text-gray-900 mb-1">Carry-on Baggage</h3>
                    <p className="text-gray-600">{flight.baggage.carry}</p>
                    <p className="text-sm text-gray-500 mt-1">Included in fare</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Luggage size={24} className="text-green-600 mt-1" />
                  <div>
                    <h3 className="font-medium text-gray-900 mb-1">Checked Baggage</h3>
                    <p className="text-gray-600">{flight.baggage.checked}</p>
                    <p className="text-sm text-gray-500 mt-1">Included in fare</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Policies */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Policies & Terms</h2>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <AlertCircle size={20} className="text-amber-500 mt-0.5" />
                  <div>
                    <h3 className="font-medium text-gray-900 mb-1">Cancellation Policy</h3>
                    <p className="text-gray-600">{flight.cancellationPolicy}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Calendar size={20} className="text-blue-500 mt-0.5" />
                  <div>
                    <h3 className="font-medium text-gray-900 mb-1">Date Changes</h3>
                    <p className="text-gray-600">Changes allowed with fee starting from $75</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Users size={20} className="text-green-500 mt-0.5" />
                  <div>
                    <h3 className="font-medium text-gray-900 mb-1">Seat Selection</h3>
                    <p className="text-gray-600">Free standard seat selection at check-in</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-4">
              <div className="text-center mb-6">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  {flight.originalPrice && (
                    <span className="text-gray-500 line-through text-lg">
                      ${flight.originalPrice}
                    </span>
                  )}
                  <span className="text-3xl font-bold text-gray-900">
                    ${flight.price}
                  </span>
                </div>
                <div className="text-gray-600">per person</div>
                {savings > 0 && (
                  <div className="text-green-600 font-medium">
                    Save ${flight.originalPrice! - flight.price} per person
                  </div>
                )}
              </div>

              {/* Booking Form */}
              <div className="space-y-4 mb-6">
                <Input
                  type="date"
                  label="Departure Date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  icon={<Calendar size={16} className="text-gray-400" />}
                />
                <Input
                  type="number"
                  label="Passengers"
                  min="1"
                  max="9"
                  value={passengers}
                  onChange={(e) => setPassengers(parseInt(e.target.value))}
                  icon={<Users size={16} className="text-gray-400" />}
                />
              </div>

              {/* Price Breakdown */}
              <div className="border-t pt-4 mb-6">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Flight fare × {passengers} passenger(s)</span>
                    <span>${flight.price * passengers}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Taxes & fees</span>
                    <span>${Math.round(totalPrice * 0.2)}</span>
                  </div>
                  <div className="border-t pt-2 font-semibold flex justify-between">
                    <span>Total</span>
                    <span>${totalPrice + Math.round(totalPrice * 0.2)}</span>
                  </div>
                </div>
              </div>

              <Button
                onClick={handleBooking}
                className="w-full"
                size="lg"
                disabled={!selectedDate || passengers < 1}
              >
                Select Flight
              </Button>

              <div className="text-center mt-4">
                <p className="text-sm text-gray-600">
                  Price includes taxes and fees
                </p>
              </div>

              {/* Trust Indicators */}
              <div className="mt-6 pt-6 border-t">
                <div className="text-center space-y-2">
                  <div className="flex items-center justify-center text-green-600 text-sm">
                    <span className="mr-2">✓</span>
                    Free cancellation within 24hrs
                  </div>
                  <div className="flex items-center justify-center text-green-600 text-sm">
                    <span className="mr-2">✓</span>
                    No hidden fees
                  </div>
                  <div className="flex items-center justify-center text-green-600 text-sm">
                    <span className="mr-2">✓</span>
                    Instant confirmation
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 