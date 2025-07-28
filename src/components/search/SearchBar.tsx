'use client';

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Search, MapPin, Calendar, Users, Plane, Car } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { RootState } from '../../store';
import { setSearchType } from '../../store/slices/uiSlice';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { UIState } from '../../types';
import { useEventLogger } from '../../utils/logger';

export function SearchBar() {
  const router = useRouter();
  const dispatch = useDispatch();
  const uiState = useSelector((state: RootState) => state.ui as UIState);
  const searchType = uiState.searchType;
  const logger = useEventLogger();

  // Hotel search state
  const [hotelSearch, setHotelSearch] = useState({
    destination: '',
    checkIn: '',
    checkOut: '',
    guests: 2,
    rooms: 1,
  });

  // Flight search state
  const [flightSearch, setFlightSearch] = useState({
    from: '',
    to: '',
    departureDate: '',
    returnDate: '',
    passengers: 1,
    tripType: 'round-trip' as 'one-way' | 'round-trip',
    cabinClass: 'economy' as 'economy' | 'business' | 'first',
  });

  // Car search state
  const [carSearch, setCarSearch] = useState({
    location: '',
    pickupDate: '',
    dropoffDate: '',
    age: 25,
  });

  const handleTabChange = (type: 'hotels' | 'flights' | 'cars') => {
    dispatch(setSearchType(type));
    
    // Log tab change
    logger.logClick(
      `User switched to ${type} search tab`,
      `[data-search-tab="${type}"]`,
      { x: 0, y: 0 } // Coordinates would be captured in real click handler
    );
  };

  const handleHotelSearch = () => {
    const params = new URLSearchParams({
      type: 'hotels',
      destination: hotelSearch.destination,
      checkIn: hotelSearch.checkIn,
      checkOut: hotelSearch.checkOut,
      guests: hotelSearch.guests.toString(),
      rooms: hotelSearch.rooms.toString(),
    });
    
    // Log search action
    logger.logCustom(
      `User searched for hotels: ${hotelSearch.destination || 'all destinations'} from ${hotelSearch.checkIn} to ${hotelSearch.checkOut}, ${hotelSearch.guests} guests, ${hotelSearch.rooms} rooms`,
      'hotel_search',
      {
        destination: hotelSearch.destination,
        checkIn: hotelSearch.checkIn,
        checkOut: hotelSearch.checkOut,
        guests: hotelSearch.guests,
        rooms: hotelSearch.rooms
      }
    );
    
    // Log navigation
    const targetUrl = `/search?${params.toString()}`;
    logger.logNavigation(`Navigating to hotel search results`, 'GO_TO_URL', targetUrl);
    
    router.push(targetUrl);
  };

  const handleFlightSearch = () => {
    const params = new URLSearchParams({
      type: 'flights',
      from: flightSearch.from,
      to: flightSearch.to,
      departureDate: flightSearch.departureDate,
      passengers: flightSearch.passengers.toString(),
      tripType: flightSearch.tripType,
      cabinClass: flightSearch.cabinClass,
    });
    
    if (flightSearch.tripType === 'round-trip' && flightSearch.returnDate) {
      params.append('returnDate', flightSearch.returnDate);
    }
    
    // Log search action
    logger.logCustom(
      `User searched for flights: ${flightSearch.from || 'any origin'} to ${flightSearch.to || 'any destination'} on ${flightSearch.departureDate}, ${flightSearch.passengers} passengers, ${flightSearch.cabinClass} class`,
      'flight_search',
      {
        from: flightSearch.from,
        to: flightSearch.to,
        departureDate: flightSearch.departureDate,
        returnDate: flightSearch.returnDate,
        passengers: flightSearch.passengers,
        tripType: flightSearch.tripType,
        cabinClass: flightSearch.cabinClass
      }
    );
    
    // Log navigation
    const targetUrl = `/search?${params.toString()}`;
    logger.logNavigation(`Navigating to flight search results`, 'GO_TO_URL', targetUrl);
    
    router.push(targetUrl);
  };

  const handleCarSearch = () => {
    const params = new URLSearchParams({
      type: 'cars',
      location: carSearch.location,
      pickupDate: carSearch.pickupDate,
      dropoffDate: carSearch.dropoffDate,
      age: carSearch.age.toString(),
    });
    
    // Log search action
    logger.logCustom(
      `User searched for cars: ${carSearch.location || 'all locations'} from ${carSearch.pickupDate} to ${carSearch.dropoffDate}, driver age ${carSearch.age}`,
      'car_search',
      {
        location: carSearch.location,
        pickupDate: carSearch.pickupDate,
        dropoffDate: carSearch.dropoffDate,
        age: carSearch.age
      }
    );
    
    // Log navigation
    const targetUrl = `/search?${params.toString()}`;
    logger.logNavigation(`Navigating to car search results`, 'GO_TO_URL', targetUrl);
    
    router.push(targetUrl);
  };

  const tabs = [
    { id: 'hotels', label: 'Hotels', icon: MapPin },
    { id: 'flights', label: 'Flights', icon: Plane },
    { id: 'cars', label: 'Cars', icon: Car },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 max-w-4xl mx-auto">
      {/* Tabs */}
      <div className="flex space-x-1 mb-6">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id as 'hotels' | 'flights' | 'cars')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                searchType === tab.id
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Icon size={18} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Hotel Search Form */}
      {searchType === 'hotels' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Input
              label='Where are you going?'
              placeholder="Anywhere!"
              value={hotelSearch.destination}
              onChange={(e) => setHotelSearch({ ...hotelSearch, destination: e.target.value })}
              icon={<MapPin size={16} className="text-gray-400" />}
            />
            <Input
              type="date"
              label="Check-in"
              value={hotelSearch.checkIn}
              onChange={(e) => setHotelSearch({ ...hotelSearch, checkIn: e.target.value })}
              icon={<Calendar size={16} className="text-gray-400" />}
            />
            <Input
              type="date"
              label="Check-out"
              value={hotelSearch.checkOut}
              onChange={(e) => setHotelSearch({ ...hotelSearch, checkOut: e.target.value })}
              icon={<Calendar size={16} className="text-gray-400" />}
            />
            <div className="flex space-x-2">
              <div className="flex-1">
                <Input
                  type="number"
                  label="Guests"
                  min="1"
                  max="10"
                  value={hotelSearch.guests}
                  onChange={(e) => setHotelSearch({ ...hotelSearch, guests: parseInt(e.target.value) })}
                  icon={<Users size={16} className="text-gray-400" />}
                />
              </div>
              <div className="flex-1">
                <Input
                  type="number"
                  label="Rooms"
                  min="1"
                  max="5"
                  value={hotelSearch.rooms}
                  onChange={(e) => setHotelSearch({ ...hotelSearch, rooms: parseInt(e.target.value) })}
                />
              </div>
            </div>
          </div>
          <Button onClick={handleHotelSearch} size="lg" className="w-full md:w-auto">
            <Search size={18} className="mr-2" />
            Search Hotels
          </Button>
        </div>
      )}

      {/* Flight Search Form */}
      {searchType === 'flights' && (
        <div className="space-y-4">
          <div className="flex space-x-6 mb-4 pt-2">
            <label className="flex items-center text-gray-900 font-medium">
              <input
                type="radio"
                name="tripType"
                value="round-trip"
                checked={flightSearch.tripType === 'round-trip'}
                onChange={(e) => setFlightSearch({ ...flightSearch, tripType: e.target.value as 'round-trip' })}
                className="mr-2 text-blue-600 focus:ring-blue-500"
              />
              Round Trip
            </label>
            <label className="flex items-center text-gray-900 font-medium">
              <input
                type="radio"
                name="tripType"
                value="one-way"
                checked={flightSearch.tripType === 'one-way'}
                onChange={(e) => setFlightSearch({ ...flightSearch, tripType: e.target.value as 'one-way' })}
                className="mr-2 text-blue-600 focus:ring-blue-500"
              />
              One Way
            </label>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <Input
              placeholder="From where?"
              value={flightSearch.from}
              onChange={(e) => setFlightSearch({ ...flightSearch, from: e.target.value })}
              icon={<Plane size={16} className="text-gray-400" />}
            />
            <Input
              placeholder="Where to?"
              value={flightSearch.to}
              onChange={(e) => setFlightSearch({ ...flightSearch, to: e.target.value })}
              icon={<MapPin size={16} className="text-gray-400" />}
            />
            <Input
              type="date"
              label="Departure"
              value={flightSearch.departureDate}
              onChange={(e) => setFlightSearch({ ...flightSearch, departureDate: e.target.value })}
              icon={<Calendar size={16} className="text-gray-400" />}
            />
            {flightSearch.tripType === 'round-trip' && (
              <Input
                type="date"
                label="Return"
                value={flightSearch.returnDate}
                onChange={(e) => setFlightSearch({ ...flightSearch, returnDate: e.target.value })}
                icon={<Calendar size={16} className="text-gray-400" />}
              />
            )}
            <div className="space-y-2">
              <Input
                type="number"
                label="Passengers"
                min="1"
                max="9"
                value={flightSearch.passengers}
                onChange={(e) => setFlightSearch({ ...flightSearch, passengers: parseInt(e.target.value) })}
                icon={<Users size={16} className="text-gray-400" />}
              />
              <div className="w-full">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Cabin Class
                </label>
                <select
                  value={flightSearch.cabinClass}
                  onChange={(e) => setFlightSearch({ ...flightSearch, cabinClass: e.target.value as 'economy' | 'business' | 'first' })}
                  className="block w-full px-3 py-2 text-gray-900 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                >
                  <option value="economy">Economy</option>
                  <option value="business">Business</option>
                  <option value="first">First Class</option>
                </select>
              </div>
            </div>
          </div>
          <Button onClick={handleFlightSearch} size="lg" className="w-full md:w-auto">
            <Search size={18} className="mr-2" />
            Search Flights
          </Button>
        </div>
      )}

      {/* Car Search Form */}
      {searchType === 'cars' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Input
              label="Pick-up location"
              placeholder="Anywhere!"
              value={carSearch.location}
              onChange={(e) => setCarSearch({ ...carSearch, location: e.target.value })}
              icon={<MapPin size={16} className="text-gray-400" />}
            />
            <Input
              type="date"
              label="Pick-up date"
              value={carSearch.pickupDate}
              onChange={(e) => setCarSearch({ ...carSearch, pickupDate: e.target.value })}
              icon={<Calendar size={16} className="text-gray-400" />}
            />
            <Input
              type="date"
              label="Drop-off date"
              value={carSearch.dropoffDate}
              onChange={(e) => setCarSearch({ ...carSearch, dropoffDate: e.target.value })}
              icon={<Calendar size={16} className="text-gray-400" />}
            />
            <Input
              type="number"
              label="Driver age"
              min="18"
              max="99"
              value={carSearch.age}
              onChange={(e) => setCarSearch({ ...carSearch, age: parseInt(e.target.value) })}
            />
          </div>
          <Button onClick={handleCarSearch} size="lg" className="w-full md:w-auto">
            <Search size={18} className="mr-2" />
            Search Cars
          </Button>
        </div>
      )}
    </div>
  );
} 