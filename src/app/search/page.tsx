'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { Filter, Grid, List, SortAsc } from 'lucide-react';
import { RootState } from '../../store';
import { 
  searchHotelsSuccess, 
  searchFlightsSuccess, 
  searchCarsSuccess,
  setHotelSort, 
  setFlightSort,
  setCarSort
} from '../../store/slices/searchSlice';
import { setSearchType } from '../../store/slices/uiSlice';
import { searchHotels, searchFlights } from '../../utils/mockData';
import { HotelCard } from '../../components/search/HotelCard';
import { FlightCard } from '../../components/search/FlightCard';
import { CarCard } from '../../components/search/CarCard';
import { FilterSidebar } from '../../components/search/FilterSidebar';
import { Button } from '../../components/ui/Button';
import { mockCars } from '../../utils/mockData';
import { SearchFilters, Hotel, Flight, Car, SearchState } from '../../types';

function SearchContent() {
  const searchParams = useSearchParams();
  const dispatch = useDispatch();
  const searchState = useSelector((state: RootState) => state.search as SearchState);
  const { hotels, flights, cars } = searchState;

  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);

  // Get search parameters
  const searchType = searchParams.get('type') as 'hotels' | 'flights' | 'cars' || 'hotels';
  const destination = searchParams.get('destination') || '';
  const checkIn = searchParams.get('checkIn') || '';
  const checkOut = searchParams.get('checkOut') || '';
  const guests = parseInt(searchParams.get('guests') || '2');
  const rooms = parseInt(searchParams.get('rooms') || '1');

  // Flight-specific parameters
  const from = searchParams.get('from') || '';
  const to = searchParams.get('to') || '';
  const departureDate = searchParams.get('departureDate') || '';
  const passengers = parseInt(searchParams.get('passengers') || '1');
  const tripType = searchParams.get('tripType') as 'one-way' | 'round-trip' || 'round-trip';
  const cabinClass = searchParams.get('cabinClass') as 'economy' | 'business' | 'first' || 'economy';

  // Car-specific parameters
  const location = searchParams.get('location') || '';
  const pickupDate = searchParams.get('pickupDate') || '';
  const dropoffDate = searchParams.get('dropoffDate') || '';

  useEffect(() => {
    // Set the search type in the store
    dispatch(setSearchType(searchType));

    // Perform the search based on type
    if (searchType === 'hotels' && destination) {
      const results = searchHotels(
        destination,
        checkIn, 
        checkOut,
        guests,
        rooms,
        hotels.filters,
        hotels.sortBy
      );
      dispatch(searchHotelsSuccess({ results, totalPages: Math.ceil(results.length / 10) }));
    } else if (searchType === 'flights' && from && to) {
      const results = searchFlights(
        from,
        to, 
        departureDate,
        passengers,
        flights.filters,
        flights.sortBy
      );
      dispatch(searchFlightsSuccess({ results, totalPages: Math.ceil(results.length / 10) }));
    } else if (searchType === 'cars' && location) {
      // For now, use mock data for cars
      dispatch(searchCarsSuccess({ results: mockCars, totalPages: Math.ceil(mockCars.length / 10) }));
    }
  }, [
    searchType, destination, checkIn, checkOut, guests, rooms,
    from, to, departureDate, passengers, tripType, cabinClass,
    location, pickupDate, dropoffDate, dispatch, searchParams,
    hotels.filters, hotels.sortBy, flights.filters, flights.sortBy
  ]);

  const getCurrentResults = () => {
    switch (searchType) {
      case 'hotels':
        return hotels.results;
      case 'flights':
        return flights.results;
      case 'cars':
        return cars.results;
      default:
        return [];
    }
  };

  const getCurrentSort = () => {
    switch (searchType) {
      case 'hotels':
        return hotels.sortBy;
      case 'flights':
        return flights.sortBy;
      case 'cars':
        return cars.sortBy;
      default:
        return 'price';
    }
  };

  const handleSortChange = (sortBy: string) => {
    switch (searchType) {
      case 'hotels':
        dispatch(setHotelSort(sortBy as 'price' | 'rating' | 'distance'));
        break;
      case 'flights':
        dispatch(setFlightSort(sortBy as 'price' | 'duration' | 'departure'));
        break;
      case 'cars':
        dispatch(setCarSort(sortBy as 'price' | 'rating' | 'category'));
        break;
    }
  };

  const getSortOptions = () => {
    switch (searchType) {
      case 'hotels':
        return [
          { value: 'price', label: 'Price (Low to High)' },
          { value: 'rating', label: 'Rating (High to Low)' },
          { value: 'distance', label: 'Distance' },
        ];
      case 'flights':
        return [
          { value: 'price', label: 'Price (Low to High)' },
          { value: 'duration', label: 'Duration (Shortest)' },
          { value: 'departure', label: 'Departure Time' },
        ];
      case 'cars':
        return [
          { value: 'price', label: 'Price (Low to High)' },
          { value: 'rating', label: 'Rating (High to Low)' },
          { value: 'category', label: 'Category' },
        ];
      default:
        return [];
    }
  };

  const renderSearchCard = (result: Hotel | Flight | Car) => {
    switch (searchType) {
      case 'hotels':
        return <HotelCard key={result.id} hotel={result as Hotel} />;
      case 'flights':
        return <FlightCard key={result.id} flight={result as Flight} />;
      case 'cars':
        return <CarCard key={result.id} car={result as Car} />;
      default:
        return null;
    }
  };

  const getSearchSummary = () => {
    switch (searchType) {
      case 'hotels':
        return `${destination} • ${checkIn} to ${checkOut} • ${guests} guest${guests > 1 ? 's' : ''}, ${rooms} room${rooms > 1 ? 's' : ''}`;
      case 'flights':
        return `${from} to ${to} • ${departureDate} • ${passengers} passenger${passengers > 1 ? 's' : ''} • ${cabinClass}`;
      case 'cars':
        return `${location} • ${pickupDate} to ${dropoffDate}`;
      default:
        return '';
    }
  };

  const results = getCurrentResults();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Summary */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 capitalize mb-2">
                {searchType} Search Results
              </h1>
              <p className="text-gray-600">{getSearchSummary()}</p>
              <p className="text-sm text-gray-500 mt-1">
                {results.length} {searchType} found
              </p>
            </div>
            
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              {/* Sort Options */}
              <div className="flex items-center space-x-2">
                <SortAsc size={16} className="text-gray-500" />
                <select
                  value={getCurrentSort()}
                  onChange={(e) => handleSortChange(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
                >
                  {getSortOptions().map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* View Mode Toggle */}
              <div className="flex items-center border border-gray-300 rounded-lg">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 ${viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'text-gray-500'}`}
                >
                  <Grid size={16} />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 ${viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'text-gray-500'}`}
                >
                  <List size={16} />
                </button>
              </div>

              {/* Filter Toggle (Mobile) */}
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="md:hidden"
              >
                <Filter size={16} className="mr-2" />
                Filters
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className={`lg:col-span-1 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <FilterSidebar searchType={searchType} />
          </div>

          {/* Results */}
          <div className="lg:col-span-3">
            {results.length === 0 ? (
              <div className="bg-white rounded-xl shadow-sm p-12 text-center">
                <div className="text-gray-400 mb-4">
                  <Filter size={48} className="mx-auto" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No results found
                </h3>
                <p className="text-gray-600 mb-6">
                  Try adjusting your search criteria or filters to find more options.
                </p>
                <Button onClick={() => window.history.back()}>
                  Modify Search
                </Button>
              </div>
            ) : (
              <div className={`space-y-6 ${viewMode === 'grid' ? 'md:grid md:grid-cols-1 md:gap-6 md:space-y-0' : ''}`}>
                {results.map((result) => renderSearchCard(result))}
              </div>
            )}

            {/* Load More Button */}
            {results.length > 0 && results.length >= 20 && (
              <div className="text-center mt-8">
                <Button variant="outline" size="lg">
                  Load More Results
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Searching for your perfect trip...</p>
        </div>
      </div>
    }>
      <SearchContent />
    </Suspense>
  );
} 