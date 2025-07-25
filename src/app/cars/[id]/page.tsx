'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import Image from 'next/image';
import { 
  Users, 
  Settings, 
  Fuel, 
  Navigation, 
  Shield,
  Star,
  MapPin,
  ArrowLeft,
  Heart,
  Share,
  Calendar,
  AlertCircle
} from 'lucide-react';
import { format } from 'date-fns';
import { Car } from '../../../types';
import { mockCars } from '../../../utils/mockData';
import { startBooking } from '../../../store/slices/bookingSlice';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';

export default function CarDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const dispatch = useDispatch();
  const [car, setCar] = useState<Car | null>(null);
  const [pickupDate, setPickupDate] = useState('');
  const [dropoffDate, setDropoffDate] = useState('');
  const [driverAge, setDriverAge] = useState(25);
  const [selectedInsurance, setSelectedInsurance] = useState<string[]>([]);

  useEffect(() => {
    const carData = mockCars.find(c => c.id === params.id);
    setCar(carData || null);
    if (carData) {
      // Set default dates (today + 1 week)
      const today = new Date();
      const nextWeek = new Date(today);
      nextWeek.setDate(today.getDate() + 7);
      setPickupDate(format(today, 'yyyy-MM-dd'));
      setDropoffDate(format(nextWeek, 'yyyy-MM-dd'));
    }
  }, [params.id]);

  if (!car) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Car not found</h2>
          <p className="text-gray-600 mb-4">The car you&apos;re looking for doesn&apos;t exist.</p>
          <Button onClick={() => router.back()}>Go Back</Button>
        </div>
      </div>
    );
  }

  const calculateDays = () => {
    if (!pickupDate || !dropoffDate) return 1;
    const pickup = new Date(pickupDate);
    const dropoff = new Date(dropoffDate);
    const diffTime = Math.abs(dropoff.getTime() - pickup.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays || 1;
  };

  const days = calculateDays();
  const basePrice = car.price * days;
  const insurancePrice = selectedInsurance.reduce((total, insuranceName) => {
    const insurance = car.insurance.optional.find(i => i.name === insuranceName);
    return total + (insurance ? insurance.price * days : 0);
  }, 0);
  const totalPrice = basePrice + insurancePrice;
  const savings = car.originalPrice ? (car.originalPrice - car.price) * days : 0;

  const handleBooking = () => {
    dispatch(startBooking({
      type: 'car',
      totalPrice,
      car: {
        carId: car.id,
        pickupDate,
        dropoffDate,
        pickupLocation: car.location.pickupAddress,
        dropoffLocation: car.location.pickupAddress,
        driverAge,
        insurance: [...car.insurance.included, ...selectedInsurance],
      },
    }));
    router.push('/book');
  };

  const toggleInsurance = (insuranceName: string) => {
    setSelectedInsurance(prev => 
      prev.includes(insuranceName)
        ? prev.filter(i => i !== insuranceName)
        : [...prev, insuranceName]
    );
  };

  const getCategoryIcon = () => {
    switch (car.category) {
      case 'luxury': return '🏆';
      case 'suv': return '🚙';
      case 'economy': return '💰';
      case 'compact': return '🚗';
      case 'midsize': return '🚙';
      case 'fullsize': return '🚗';
      case 'convertible': return '🏎️';
      default: return '🚗';
    }
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
            {/* Car Overview */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div className="text-4xl">{getCategoryIcon()}</div>
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900">{car.name}</h1>
                    <p className="text-gray-600">{car.brand} {car.model} {car.year}</p>
                  </div>
                </div>
                
                {savings > 0 && (
                  <div className="bg-green-100 text-green-800 px-4 py-2 rounded-lg">
                    <span className="font-semibold">Save ${savings}</span>
                  </div>
                )}
              </div>

              {/* Car Image */}
              <div className="relative h-64 md:h-80 rounded-lg overflow-hidden mb-6">
                <Image
                  src={car.images[0]}
                  alt={car.name}
                  width={800}
                  height={400}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Car Features */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="flex items-center space-x-3">
                  <Users size={24} className="text-blue-600" />
                  <div>
                    <h3 className="font-medium text-gray-900">{car.features.seats} Seats</h3>
                    <p className="text-sm text-gray-500">{car.features.doors} doors</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Settings size={24} className="text-blue-600" />
                  <div>
                    <h3 className="font-medium text-gray-900 capitalize">{car.features.transmission}</h3>
                    <p className="text-sm text-gray-500">Transmission</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Fuel size={24} className="text-blue-600" />
                  <div>
                    <h3 className="font-medium text-gray-900 capitalize">{car.features.fuelType}</h3>
                    <p className="text-sm text-gray-500">Fuel type</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Navigation size={24} className="text-blue-600" />
                  <div>
                    <h3 className="font-medium text-gray-900">{car.features.gps ? 'GPS Included' : 'No GPS'}</h3>
                    <p className="text-sm text-gray-500">Navigation</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Rental Company Info */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Rental Company</h2>
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">{car.rental.company}</h3>
                  <div className="flex items-center mb-2">
                    <Star size={16} className="text-yellow-500 fill-current mr-1" />
                    <span className="font-medium">{car.rental.rating}</span>
                    <span className="text-gray-500 ml-1">({car.rental.reviewCount} reviews)</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <MapPin size={16} className="mr-1" />
                    <span className="text-sm">{car.location.pickupAddress}</span>
                  </div>
                </div>
              </div>
              <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-1">Pickup Instructions</h4>
                <p className="text-sm text-gray-600">{car.rental.pickupInstructions}</p>
              </div>
            </div>

            {/* Insurance Options */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Insurance Coverage</h2>
              
              <div className="mb-6">
                <h3 className="font-medium text-gray-900 mb-3">Included Coverage</h3>
                <div className="space-y-2">
                  {car.insurance.included.map((coverage, index) => (
                    <div key={index} className="flex items-center">
                      <Shield size={16} className="text-green-500 mr-2" />
                      <span className="text-gray-700">{coverage}</span>
                    </div>
                  ))}
                </div>
              </div>

              {car.insurance.optional.length > 0 && (
                <div>
                  <h3 className="font-medium text-gray-900 mb-3">Optional Coverage</h3>
                  <div className="space-y-4">
                    {car.insurance.optional.map((option) => (
                      <div key={option.name} className="flex items-start justify-between p-4 border rounded-lg">
                        <div className="flex items-start space-x-3">
                          <input
                            type="checkbox"
                            checked={selectedInsurance.includes(option.name)}
                            onChange={() => toggleInsurance(option.name)}
                            className="mt-1"
                          />
                          <div>
                            <h4 className="font-medium text-gray-900">{option.name}</h4>
                            <p className="text-sm text-gray-600 mt-1">{option.description}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="font-medium text-gray-900">+${option.price}/day</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Requirements */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Rental Requirements</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Age Requirement</h3>
                  <p className="text-gray-600">Minimum {car.rental.requirements.minAge} years old</p>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">License</h3>
                  <p className="text-gray-600">{car.rental.requirements.license.join(' or ')} license required</p>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Payment</h3>
                  <p className="text-gray-600">{car.rental.requirements.creditCard ? 'Credit card required' : 'Debit card accepted'}</p>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Mileage</h3>
                  <p className="text-gray-600">
                    {car.mileage.unlimited ? 'Unlimited mileage' : `${car.mileage.limit} miles/day`}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-4">
              <div className="text-center mb-6">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  {car.originalPrice && (
                    <span className="text-gray-500 line-through text-lg">
                      ${car.originalPrice}
                    </span>
                  )}
                  <span className="text-3xl font-bold text-gray-900">
                    ${car.price}
                  </span>
                </div>
                <div className="text-gray-600">per day</div>
                {savings > 0 && (
                  <div className="text-green-600 font-medium">
                    Save ${car.originalPrice! - car.price} per day
                  </div>
                )}
              </div>

              {/* Booking Form */}
              <div className="space-y-4 mb-6">
                <Input
                  type="date"
                  label="Pickup Date"
                  value={pickupDate}
                  onChange={(e) => setPickupDate(e.target.value)}
                  icon={<Calendar size={16} className="text-gray-400" />}
                />
                <Input
                  type="date"
                  label="Drop-off Date"
                  value={dropoffDate}
                  onChange={(e) => setDropoffDate(e.target.value)}
                  icon={<Calendar size={16} className="text-gray-400" />}
                />
                <Input
                  type="number"
                  label="Driver Age"
                  min={car.rental.requirements.minAge}
                  max="99"
                  value={driverAge}
                  onChange={(e) => setDriverAge(parseInt(e.target.value))}
                  icon={<Users size={16} className="text-gray-400" />}
                />
              </div>

              {/* Price Breakdown */}
              <div className="border-t border-gray-200 pt-4 mb-6">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Base rate ({days} days)</span>
                    <span>${basePrice}</span>
                  </div>
                  {insurancePrice > 0 && (
                    <div className="flex justify-between">
                      <span>Optional insurance</span>
                      <span>${insurancePrice}</span>
                    </div>
                  )}
                  <div className="flex justify-between font-medium text-lg border-t pt-2">
                    <span>Total</span>
                    <span>${totalPrice}</span>
                  </div>
                </div>
              </div>

              {/* Age Validation */}
              {driverAge < car.rental.requirements.minAge && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
                  <div className="flex items-center">
                    <AlertCircle size={16} className="text-red-500 mr-2" />
                    <span className="text-red-700 text-sm">
                      Driver must be at least {car.rental.requirements.minAge} years old
                    </span>
                  </div>
                </div>
              )}

              <Button 
                onClick={handleBooking} 
                size="lg" 
                className="w-full"
                disabled={driverAge < car.rental.requirements.minAge}
              >
                Reserve Now
              </Button>

              <p className="text-xs text-gray-500 text-center mt-3">
                {car.cancellationPolicy}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 