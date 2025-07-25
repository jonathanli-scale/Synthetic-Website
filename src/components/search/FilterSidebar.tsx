'use client';

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { RootState } from '../../store';
import { setHotelFilters, setFlightFilters, setCarFilters } from '../../store/slices/searchSlice';
import { Button } from '../ui/Button';

interface FilterSidebarProps {
  searchType: 'hotels' | 'flights' | 'cars';
}

export function FilterSidebar({ searchType }: FilterSidebarProps) {
  const dispatch = useDispatch();
  const searchState = useSelector((state: RootState) => state.search) as any;
  const currentFilters = searchType === 'hotels' ? searchState.hotels.filters : 
                        searchType === 'flights' ? searchState.flights.filters : 
                        searchState.cars.filters;

  const [expandedSections, setExpandedSections] = useState({
    price: true,
    rating: true,
    amenities: true,
    stops: true,
    cabinClass: true,
  });

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section as keyof typeof prev],
    }));
  };

  const handlePriceChange = (range: [number, number]) => {
    if (searchType === 'hotels') {
      dispatch(setHotelFilters({ priceRange: range }));
    } else {
      dispatch(setFlightFilters({ priceRange: range }));
    }
  };

  const handleRatingChange = (rating: number) => {
    if (searchType === 'hotels') {
      dispatch(setHotelFilters({ rating }));
    }
  };

  const handleAmenityToggle = (amenity: string) => {
    const currentAmenities = currentFilters.amenities || [];
    const newAmenities = currentAmenities.includes(amenity)
      ? currentAmenities.filter((a: string) => a !== amenity)
      : [...currentAmenities, amenity];

    if (searchType === 'hotels') {
      dispatch(setHotelFilters({ amenities: newAmenities }));
    } else if (searchType === 'flights') {
      dispatch(setFlightFilters({ amenities: newAmenities }));
    } else {
      dispatch(setCarFilters({ amenities: newAmenities }));
    }
  };

  const clearFilters = () => {
    const defaultFilters = {
      priceRange: [0, searchType === 'hotels' ? 1000 : 2000] as [number, number],
      amenities: [],
    };

    if (searchType === 'hotels') {
      dispatch(setHotelFilters({ ...defaultFilters, rating: undefined }));
    } else {
      dispatch(setFlightFilters(defaultFilters));
    }
  };

  const hotelAmenities = [
    'Free WiFi',
    'Pool',
    'Spa',
    'Restaurant',
    'Gym',
    'Room Service',
    'Parking',
    'Pet Friendly',
    'Business Center',
    'Concierge',
  ];

  return (
    <div className="bg-white rounded-xl shadow-md p-6 sticky top-4">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
        <Button variant="ghost" size="sm" onClick={clearFilters}>
          Clear All
        </Button>
      </div>

      {/* Price Range */}
      <div className="mb-6">
        <button
          onClick={() => toggleSection('price')}
          className="flex items-center justify-between w-full mb-3"
        >
          <span className="font-medium text-gray-900">Price Range</span>
          {expandedSections.price ? (
            <ChevronUp size={16} className="text-gray-500" />
          ) : (
            <ChevronDown size={16} className="text-gray-500" />
          )}
        </button>
        
        {expandedSections.price && (
          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm text-gray-600">
              <span>${currentFilters.priceRange[0]}</span>
              <span>${currentFilters.priceRange[1]}</span>
            </div>
            <input
              type="range"
              min="0"
              max={searchType === 'hotels' ? 1000 : 2000}
              step="50"
              value={currentFilters.priceRange[1]}
              onChange={(e) => handlePriceChange([currentFilters.priceRange[0], parseInt(e.target.value)])}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="grid grid-cols-3 gap-2">
              {searchType === 'hotels' ? (
                <>
                  <Button
                    variant={currentFilters.priceRange[1] <= 150 ? 'primary' : 'outline'}
                    size="sm"
                    onClick={() => handlePriceChange([0, 150])}
                  >
                    Under $150
                  </Button>
                  <Button
                    variant={currentFilters.priceRange[1] <= 300 && currentFilters.priceRange[1] > 150 ? 'primary' : 'outline'}
                    size="sm"
                    onClick={() => handlePriceChange([150, 300])}
                  >
                    $150-300
                  </Button>
                  <Button
                    variant={currentFilters.priceRange[1] > 300 ? 'primary' : 'outline'}
                    size="sm"
                                         onClick={() => handlePriceChange([300, 1000])}
                  >
                    $300+
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    variant={currentFilters.priceRange[1] <= 500 ? 'primary' : 'outline'}
                    size="sm"
                    onClick={() => handlePriceChange([0, 500])}
                  >
                    Under $500
                  </Button>
                  <Button
                    variant={currentFilters.priceRange[1] <= 1000 && currentFilters.priceRange[1] > 500 ? 'primary' : 'outline'}
                    size="sm"
                    onClick={() => handlePriceChange([500, 1000])}
                  >
                    $500-1000
                  </Button>
                  <Button
                    variant={currentFilters.priceRange[1] > 1000 ? 'primary' : 'outline'}
                    size="sm"
                    onClick={() => handlePriceChange([1000, 2000])}
                  >
                    $1000+
                  </Button>
                </>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Hotel-specific filters */}
      {searchType === 'hotels' && (
        <>
          {/* Rating */}
          <div className="mb-6">
            <button
              onClick={() => toggleSection('rating')}
              className="flex items-center justify-between w-full mb-3"
            >
              <span className="font-medium text-gray-900">Star Rating</span>
              {expandedSections.rating ? (
                <ChevronUp size={16} className="text-gray-500" />
              ) : (
                <ChevronDown size={16} className="text-gray-500" />
              )}
            </button>
            
            {expandedSections.rating && (
              <div className="space-y-2">
                {[5, 4, 3, 2].map((rating) => (
                  <label key={rating} className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="rating"
                      value={rating}
                      checked={currentFilters.rating === rating}
                      onChange={() => handleRatingChange(rating)}
                      className="mr-2"
                    />
                    <div className="flex items-center">
                      {Array.from({ length: rating }).map((_, i) => (
                        <span key={i} className="text-yellow-400">★</span>
                      ))}
                      <span className="text-gray-400 ml-1">& up</span>
                    </div>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Amenities */}
          <div className="mb-6">
            <button
              onClick={() => toggleSection('amenities')}
              className="flex items-center justify-between w-full mb-3"
            >
              <span className="font-medium text-gray-900">Amenities</span>
              {expandedSections.amenities ? (
                <ChevronUp size={16} className="text-gray-500" />
              ) : (
                <ChevronDown size={16} className="text-gray-500" />
              )}
            </button>
            
            {expandedSections.amenities && (
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {hotelAmenities.map((amenity) => (
                  <label key={amenity} className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={currentFilters.amenities.includes(amenity)}
                      onChange={() => handleAmenityToggle(amenity)}
                      className="mr-2"
                    />
                    <span className="text-sm text-gray-700">{amenity}</span>
                  </label>
                ))}
              </div>
            )}
          </div>
        </>
      )}

      {/* Flight-specific filters */}
      {searchType === 'flights' && (
        <>
          {/* Stops */}
          <div className="mb-6">
            <button
              onClick={() => toggleSection('stops')}
              className="flex items-center justify-between w-full mb-3"
            >
              <span className="font-medium text-gray-900">Stops</span>
              {expandedSections.stops ? (
                <ChevronUp size={16} className="text-gray-500" />
              ) : (
                <ChevronDown size={16} className="text-gray-500" />
              )}
            </button>
            
            {expandedSections.stops && (
              <div className="space-y-2">
                {[
                  { label: 'Non-stop', value: 0 },
                  { label: '1 stop', value: 1 },
                  { label: '2+ stops', value: 2 },
                ].map((option) => (
                  <label key={option.value} className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="stops"
                      value={option.value}
                      className="mr-2"
                    />
                    <span className="text-sm text-gray-700">{option.label}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Cabin Class */}
          <div className="mb-6">
            <button
              onClick={() => toggleSection('cabinClass')}
              className="flex items-center justify-between w-full mb-3"
            >
              <span className="font-medium text-gray-900">Cabin Class</span>
              {expandedSections.cabinClass ? (
                <ChevronUp size={16} className="text-gray-500" />
              ) : (
                <ChevronDown size={16} className="text-gray-500" />
              )}
            </button>
            
            {expandedSections.cabinClass && (
              <div className="space-y-2">
                {[
                  { label: 'Economy', value: 'economy' },
                  { label: 'Business', value: 'business' },
                  { label: 'First Class', value: 'first' },
                ].map((option) => (
                  <label key={option.value} className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="cabinClass"
                      value={option.value}
                      className="mr-2"
                    />
                    <span className="text-sm text-gray-700">{option.label}</span>
                  </label>
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
} 