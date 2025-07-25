'use client';

import { useEffect, useState } from 'react';
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
import { searchHotels, searchFlights, searchCars } from '../../utils/mockData';
import { HotelCard } from '../../components/search/HotelCard';
import { FlightCard } from '../../components/search/FlightCard';
import { CarCard } from '../../components/search/CarCard';
import { FilterSidebar } from '../../components/search/FilterSidebar';
import { Button } from '../../components/ui/Button';

export default function SearchPage() {
  const searchParams = useSearchParams();
  const dispatch = useDispatch();
  const { hotels, flights, cars } = useSelector((state: RootState) => state.search) as any;
  const { searchType } = useSelector((state: RootState) => state.ui) as any;

  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');

  // Get search parameters
  const type = searchParams.get('type') as 'hotels' | 'flights' | 'cars' || 'hotels';
  const destination = searchParams.get('destination') || '';
  const checkIn = searchParams.get('checkIn') || '';
  const checkOut = searchParams.get('checkOut') || '';
  const guests = parseInt(searchParams.get('guests') || '2');
  const rooms = parseInt(searchParams.get('rooms') || '1');
  
  // Flight parameters
  const from = searchParams.get('from') || '';
  const to = searchParams.get('to') || '';
  const departureDate = searchParams.get('departureDate') || '';
  const passengers = parseInt(searchParams.get('passengers') || '1');

  // Car parameters
  const location = searchParams.get('location') || '';
  const pickupDate = searchParams.get('pickupDate') || '';
  const dropoffDate = searchParams.get('dropoffDate') || '';
  const age = parseInt(searchParams.get('age') || '25');

  useEffect(() => {
    dispatch(setSearchType(type));
    
    if (type === 'hotels') {
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
    } else if (type === 'flights') {
      const results = searchFlights(
        from,
        to,
        departureDate,
        passengers,
        flights.filters,
        flights.sortBy
      );
      dispatch(searchFlightsSuccess({ results, totalPages: Math.ceil(results.length / 10) }));
    } else if (type === 'cars') {
      const results = searchCars(
        location,
        pickupDate,
        dropoffDate,
        age,
        cars.filters,
        cars.sortBy
      );
      dispatch(searchCarsSuccess({ results, totalPages: Math.ceil(results.length / 10) }));
    }
  }, [
    type, destination, checkIn, checkOut, guests, rooms, 
    from, to, departureDate, passengers,
    location, pickupDate, dropoffDate, age,
    hotels.filters, hotels.sortBy, 
    flights.filters, flights.sortBy,
    cars.filters, cars.sortBy,
    dispatch
  ]);

  const getCurrentResults = () => {
    switch (type) {
      case 'hotels': return hotels.results;
      case 'flights': return flights.results;
      case 'cars': return cars.results;
      default: return [];
    }
  };

  const getCurrentLoading = () => {
    switch (type) {
      case 'hotels': return hotels.loading;
      case 'flights': return flights.loading;
      case 'cars': return cars.loading;
      default: return false;
    }
  };

  const getCurrentSort = () => {
    switch (type) {
      case 'hotels': return hotels.sortBy;
      case 'flights': return flights.sortBy;
      case 'cars': return cars.sortBy;
      default: return 'price';
    }
  };

  const handleSortChange = (sortBy: string) => {
    if (type === 'hotels') {
      dispatch(setHotelSort(sortBy as 'price' | 'rating' | 'distance'));
    } else if (type === 'flights') {
      dispatch(setFlightSort(sortBy as 'price' | 'duration' | 'departure'));
    } else if (type === 'cars') {
      dispatch(setCarSort(sortBy as 'price' | 'rating' | 'category'));
    }
  };

  const getSortOptions = () => {
    if (type === 'hotels') {
      return [
        { value: 'price', label: 'Price (Low to High)' },
        { value: 'rating', label: 'Rating (High to Low)' },
        { value: 'distance', label: 'Distance' },
      ];
    } else if (type === 'flights') {
      return [
        { value: 'price', label: 'Price (Low to High)' },
        { value: 'duration', label: 'Duration (Shortest)' },
        { value: 'departure', label: 'Departure Time' },
      ];
    } else {
      return [
        { value: 'price', label: 'Price (Low to High)' },
        { value: 'rating', label: 'Rating (High to Low)' },
        { value: 'category', label: 'Category' },
      ];
    }
  };

  const getSearchSummary = () => {
    if (type === 'hotels') {
      return `${hotels.results.length} hotels in ${destination}`;
    } else if (type === 'flights') {
      return `${flights.results.length} flights from ${from} to ${to}`;
    } else {
      return `${cars.results.length} cars in ${location}`;
    }
  };

  const currentResults = getCurrentResults();
  const currentLoading = getCurrentLoading();
  const currentSort = getCurrentSort();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Search Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 capitalize">{type} Search Results</h1>
              <p className="text-gray-600 mt-1">{getSearchSummary()}</p>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Sort Dropdown */}
              <div className="flex items-center space-x-2">
                <SortAsc size={20} className="text-gray-500" />
                <select
                  value={currentSort}
                  onChange={(e) => handleSortChange(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                <Button
                  variant={viewMode === 'list' ? 'primary' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className="rounded-r-none border-r-0"
                >
                  <List size={16} />
                </Button>
                <Button
                  variant={viewMode === 'grid' ? 'primary' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className="rounded-l-none"
                >
                  <Grid size={16} />
                </Button>
              </div>

              {/* Filter Toggle */}
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center space-x-2"
              >
                <Filter size={16} />
                <span>Filters</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Filter Sidebar */}
          {showFilters && (
            <div className="w-80 flex-shrink-0">
              <FilterSidebar searchType={type} />
            </div>
          )}

          {/* Results */}
          <div className="flex-1">
            {currentLoading ? (
              <div className="flex items-center justify-center py-12">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                  <p className="text-gray-600">Searching...</p>
                </div>
              </div>
            ) : currentResults.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-600 text-lg">No results found. Try adjusting your search criteria.</p>
              </div>
            ) : (
              <div className={viewMode === 'grid' ? 'grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6' : 'space-y-6'}>
                {currentResults.map((result: any) => {
                  if (type === 'hotels') {
                    return <HotelCard key={result.id} hotel={result} />;
                  } else if (type === 'flights') {
                    return <FlightCard key={result.id} flight={result} />;
                  } else {
                    return <CarCard key={result.id} car={result} />;
                  }
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 