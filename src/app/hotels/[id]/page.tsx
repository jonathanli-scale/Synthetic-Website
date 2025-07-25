'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { 
  Star, 
  MapPin, 
  Wifi, 
  Car, 
  Utensils, 
  Waves, 
  Dumbbell, 
  Coffee, 
  Users, 
  Calendar,
  ArrowLeft,
  Heart,
  Share,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { Hotel } from '../../../types';
import { mockHotels } from '../../../utils/mockData';
import { startBooking } from '../../../store/slices/bookingSlice';
import { openModal } from '../../../store/slices/uiSlice';
import { RootState } from '../../../store';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';

const amenityIcons: Record<string, any> = {
  'Free WiFi': Wifi,
  'Pool': Waves,
  'Restaurant': Utensils,
  'Parking': Car,
  'Gym': Dumbbell,
  'Room Service': Coffee,
};

export default function HotelDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state: RootState) => state.user);
  const [hotel, setHotel] = useState<Hotel | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedRoom, setSelectedRoom] = useState<string>('');
  const [bookingData, setBookingData] = useState({
    checkIn: '',
    checkOut: '',
    guests: 2,
    rooms: 1,
  });

  useEffect(() => {
    const hotelData = mockHotels.find(h => h.id === params.id);
    setHotel(hotelData || null);
    if (hotelData?.rooms.length) {
      setSelectedRoom(hotelData.rooms[0].id);
    }
  }, [params.id]);

  // Server-side: render loading placeholder
  if (typeof window === 'undefined') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Loading...</h2>
          <p className="text-gray-600 mb-4">Please wait while we load the hotel details.</p>
        </div>
      </div>
    );
  }

  // Client-side: show not found if hotel doesn't exist
  if (!hotel) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Hotel not found</h2>
          <p className="text-gray-600 mb-4">The hotel you're looking for doesn't exist.</p>
          <Button onClick={() => router.back()}>Go Back</Button>
        </div>
      </div>
    );
  }

  const selectedRoomData = hotel.rooms.find(room => room.id === selectedRoom);
  const totalPrice = selectedRoomData ? selectedRoomData.price * bookingData.rooms : hotel.price;

  const handleBooking = () => {
    if (!isAuthenticated) {
      dispatch(openModal('login'));
      return;
    }

    if (!selectedRoom) {
      alert('Please select a room');
      return;
    }

    if (!bookingData.checkIn || !bookingData.checkOut) {
      alert('Please select check-in and check-out dates');
      return;
    }

    // Dispatch booking action and navigate to booking page
    dispatch(startBooking({
      type: 'hotel',
      totalPrice: totalPrice,
      hotel: {
        hotelId: hotel!.id,
        roomId: selectedRoom,
        checkIn: bookingData.checkIn,
        checkOut: bookingData.checkOut,
        guests: bookingData.guests,
      }
    }));

    router.push('/book');
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % hotel.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + hotel.images.length) % hotel.images.length);
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
            {/* Image Gallery */}
            <div className="relative mb-8">
              <div className="aspect-video bg-gray-200 rounded-xl overflow-hidden">
                <img
                  src={hotel.images[currentImageIndex]}
                  alt={hotel.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {hotel.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 transition-opacity"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 transition-opacity"
                  >
                    <ChevronRight size={20} />
                  </button>
                </>
              )}

              {/* Thumbnail Navigation */}
              <div className="flex space-x-2 mt-4 overflow-x-auto">
                {hotel.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${
                      index === currentImageIndex ? 'border-blue-500' : 'border-transparent'
                    }`}
                  >
                    <img src={image} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Hotel Info */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{hotel.name}</h1>
                  <div className="flex items-center text-gray-600 mb-3">
                    <MapPin size={16} className="mr-2" />
                    <span>{hotel.location.address}, {hotel.location.city}, {hotel.location.country}</span>
                  </div>
                  <div className="flex items-center">
                    <div className="flex items-center text-yellow-500 mr-3">
                      <Star size={18} className="fill-current" />
                      <span className="ml-1 text-lg font-semibold text-gray-900">
                        {hotel.rating}
                      </span>
                    </div>
                    <span className="text-gray-600">
                      ({hotel.reviewCount.toLocaleString()} reviews)
                    </span>
                  </div>
                </div>
                
                {hotel.featured && (
                  <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
                    Featured Property
                  </div>
                )}
              </div>

              <p className="text-gray-700 leading-relaxed">{hotel.description}</p>
            </div>

            {/* Amenities */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Amenities</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {hotel.amenities.map((amenity) => {
                  const Icon = amenityIcons[amenity];
                  return (
                    <div key={amenity} className="flex items-center">
                      {Icon ? (
                        <Icon size={20} className="text-blue-600 mr-3" />
                      ) : (
                        <div className="w-5 h-5 bg-blue-600 rounded-full mr-3"></div>
                      )}
                      <span className="text-gray-700">{amenity}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Room Selection */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Choose Your Room</h2>
              <div className="space-y-4">
                {hotel.rooms.map((room) => (
                  <div
                    key={room.id}
                    className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                      selectedRoom === room.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setSelectedRoom(room.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center mb-2">
                          <h3 className="text-lg font-semibold text-gray-900 mr-3">
                            {room.name}
                          </h3>
                          <div className="flex items-center text-gray-600">
                            <Users size={16} className="mr-1" />
                            <span className="text-sm">Max {room.maxGuests} guests</span>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-2 mb-2">
                          {room.amenities.map((amenity) => (
                            <span
                              key={amenity}
                              className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs"
                            >
                              {amenity}
                            </span>
                          ))}
                        </div>
                        <div className="text-sm text-gray-600">
                          {room.available ? '✅ Available' : '❌ Not Available'}
                        </div>
                      </div>
                      <div className="text-right ml-4">
                        <div className="text-2xl font-bold text-gray-900">
                          ${room.price}
                        </div>
                        <div className="text-sm text-gray-600">per night</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-4">
              <div className="text-center mb-6">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  {hotel.originalPrice && (
                    <span className="text-gray-500 line-through text-lg">
                      ${hotel.originalPrice}
                    </span>
                  )}
                  <span className="text-3xl font-bold text-gray-900">
                    ${selectedRoomData?.price || hotel.price}
                  </span>
                </div>
                <div className="text-gray-600">per night</div>
                {hotel.originalPrice && (
                  <div className="text-green-600 font-medium">
                    Save ${hotel.originalPrice - (selectedRoomData?.price || hotel.price)}
                  </div>
                )}
              </div>

              {/* Booking Form */}
              <div className="space-y-4 mb-6">
                <div className="grid grid-cols-2 gap-3">
                  <Input
                    type="date"
                    label="Check-in"
                    value={bookingData.checkIn}
                    onChange={(e) => setBookingData({ ...bookingData, checkIn: e.target.value })}
                    icon={<Calendar size={16} className="text-gray-400" />}
                  />
                  <Input
                    type="date"
                    label="Check-out"
                    value={bookingData.checkOut}
                    onChange={(e) => setBookingData({ ...bookingData, checkOut: e.target.value })}
                    icon={<Calendar size={16} className="text-gray-400" />}
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <Input
                    type="number"
                    label="Guests"
                    min="1"
                    max="10"
                    value={bookingData.guests}
                    onChange={(e) => setBookingData({ ...bookingData, guests: parseInt(e.target.value) })}
                    icon={<Users size={16} className="text-gray-400" />}
                  />
                  <Input
                    type="number"
                    label="Rooms"
                    min="1"
                    max="5"
                    value={bookingData.rooms}
                    onChange={(e) => setBookingData({ ...bookingData, rooms: parseInt(e.target.value) })}
                  />
                </div>
              </div>

              {/* Price Breakdown */}
              {bookingData.checkIn && bookingData.checkOut && (
                <div className="border-t pt-4 mb-6">
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Room rate × {bookingData.rooms} room(s)</span>
                      <span>${(selectedRoomData?.price || hotel.price) * bookingData.rooms}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Taxes & fees</span>
                      <span>${Math.round(totalPrice * 0.15)}</span>
                    </div>
                    <div className="border-t pt-2 font-semibold flex justify-between">
                      <span>Total</span>
                      <span>${totalPrice + Math.round(totalPrice * 0.15)}</span>
                    </div>
                  </div>
                </div>
              )}

              <Button
                onClick={handleBooking}
                className="w-full"
                size="lg"
                disabled={!bookingData.checkIn || !bookingData.checkOut || !selectedRoom}
              >
                Book Now
              </Button>

              <div className="text-center mt-4">
                <p className="text-sm text-gray-600">{hotel.cancellationPolicy}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 