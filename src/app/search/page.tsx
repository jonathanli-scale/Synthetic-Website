'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { Filter, Grid, List, SortAsc } from 'lucide-react';
import { RootState } from '../../store';
import { searchHotelsSuccess, searchFlightsSuccess, setHotelSort, setFlightSort } from '../../store/slices/searchSlice';
import { setSearchType } from '../../store/slices/uiSlice';
import { searchHotels, searchFlights } from '../../utils/mockData';
import { HotelCard } from '../../components/search/HotelCard';
import { FlightCard } from '../../components/search/FlightCard';
import { FilterSidebar } from '../../components/search/FilterSidebar';
import { Button } from '../../components/ui/Button';

export default function SearchPage() {
  const searchParams = useSearchParams();
  const dispatch = useDispatch();
  const { hotels, flights } = useSelector((state: RootState) => state.search);
  const { searchType } = useSelector((state: RootState) => state.ui);

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
    }
  }, [type, destination, checkIn, checkOut, guests, rooms, from, to, departureDate, passengers, hotels.filters, hotels.sortBy, flights.filters, flights.sortBy, dispatch]);

  const currentResults = type === 'hotels' ? hotels.results : flights.results;
  const currentLoading = type === 'hotels' ? hotels.loading : flights.loading;
  const currentSort = type === 'hotels' ? hotels.sortBy : flights.sortBy;

  const handleSortChange = (sortBy: string) => {
    if (type === 'hotels') {
      dispatch(setHotelSort(sortBy as 'price' | 'rating' | 'distance'));
    } else {
      dispatch(setFlightSort(sortBy as 'price' | 'duration' | 'departure'));
    }
  };

  const getSortOptions = () => {
    if (type === 'hotels') {
      return [
        { value: 'price', label: 'Price (Low to High)' },
        { value: 'rating', label: 'Rating (High to Low)' },
        { value: 'distance', label: 'Distance' },
      ];
    } else {
      return [
        { value: 'price', label: 'Price (Low to High)' },
        { value: 'duration', label: 'Duration (Shortest)' },
        { value: 'departure', label: 'Departure Time' },
      ];
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Search Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {type === 'hotels' ? 'Hotels' : 'Flights'}
                {destination && ` in ${destination}`}
                {from && to && ` from ${from} to ${to}`}
              </h1>
              <p className="text-gray-600 mt-1">
                {currentResults.length} {type} found
                {checkIn && checkOut && ` • ${checkIn} - ${checkOut}`}
                {departureDate && ` • ${departureDate}`}
              </p>
            </div>
            
            <div className="flex items-center space-x-3">
              {/* View Mode Toggle */}
              <div className="hidden md:flex items-center bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-md ${viewMode === 'list' ? 'bg-white shadow-sm' : 'text-gray-500'}`}
                >
                  <List size={16} />
                </button>
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-md ${viewMode === 'grid' ? 'bg-white shadow-sm' : 'text-gray-500'}`}
                >
                  <Grid size={16} />
                </button>
              </div>

              {/* Sort Dropdown */}
              <div className="relative">
                <select
                  value={currentSort}
                  onChange={(e) => handleSortChange(e.target.value)}
                  className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 text-sm"
                >
                  {getSortOptions().map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <SortAsc size={16} className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>

              {/* Filter Toggle */}
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
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Filter Sidebar */}
          <div className={`w-80 ${showFilters ? 'block' : 'hidden'} md:block`}>
            <FilterSidebar searchType={type} />
          </div>

          {/* Results */}
          <div className="flex-1">
            {currentLoading ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                <span className="ml-3 text-gray-600">Searching...</span>
              </div>
            ) : (
              <div className={`${viewMode === 'grid' ? 'grid grid-cols-1 xl:grid-cols-2 gap-6' : 'space-y-6'}`}>
                {currentResults.map((result) => (
                  <div key={result.id}>
                    {type === 'hotels' ? (
                      <HotelCard hotel={result as any} />
                    ) : (
                      <FlightCard flight={result as any} />
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* No Results */}
            {!currentLoading && currentResults.length === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-400 text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  No {type} found
                </h3>
                <p className="text-gray-600 mb-6">
                  Try adjusting your search criteria or filters to find more options.
                </p>
                <Button onClick={() => window.history.back()}>
                  Go Back
                </Button>
              </div>
            )}

            {/* Load More */}
            {currentResults.length > 0 && currentResults.length >= 10 && (
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