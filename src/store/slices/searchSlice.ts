import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SearchState, Hotel, Flight, SearchFilters } from '../../types';

const initialState: SearchState = {
  hotels: {
    results: [],
    loading: false,
    error: null,
    filters: {
      priceRange: [0, 1000],
      amenities: [],
    },
    sortBy: 'price',
    page: 1,
    totalPages: 1,
  },
  flights: {
    results: [],
    loading: false,
    error: null,
    filters: {
      priceRange: [0, 2000],
      amenities: [],
    },
    sortBy: 'price',
    page: 1,
    totalPages: 1,
  },
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    // Hotel search actions
    searchHotelsStart: (state) => {
      state.hotels.loading = true;
      state.hotels.error = null;
    },
    searchHotelsSuccess: (state, action: PayloadAction<{ results: Hotel[]; totalPages: number }>) => {
      state.hotels.loading = false;
      state.hotels.results = action.payload.results;
      state.hotels.totalPages = action.payload.totalPages;
    },
    searchHotelsFailure: (state, action: PayloadAction<string>) => {
      state.hotels.loading = false;
      state.hotels.error = action.payload;
    },
    setHotelFilters: (state, action: PayloadAction<Partial<SearchFilters>>) => {
      state.hotels.filters = { ...state.hotels.filters, ...action.payload };
    },
    setHotelSort: (state, action: PayloadAction<'price' | 'rating' | 'distance'>) => {
      state.hotels.sortBy = action.payload;
    },
    setHotelPage: (state, action: PayloadAction<number>) => {
      state.hotels.page = action.payload;
    },

    // Flight search actions
    searchFlightsStart: (state) => {
      state.flights.loading = true;
      state.flights.error = null;
    },
    searchFlightsSuccess: (state, action: PayloadAction<{ results: Flight[]; totalPages: number }>) => {
      state.flights.loading = false;
      state.flights.results = action.payload.results;
      state.flights.totalPages = action.payload.totalPages;
    },
    searchFlightsFailure: (state, action: PayloadAction<string>) => {
      state.flights.loading = false;
      state.flights.error = action.payload;
    },
    setFlightFilters: (state, action: PayloadAction<Partial<SearchFilters>>) => {
      state.flights.filters = { ...state.flights.filters, ...action.payload };
    },
    setFlightSort: (state, action: PayloadAction<'price' | 'duration' | 'departure'>) => {
      state.flights.sortBy = action.payload;
    },
    setFlightPage: (state, action: PayloadAction<number>) => {
      state.flights.page = action.payload;
    },

    // Clear search results
    clearHotelResults: (state) => {
      state.hotels.results = [];
      state.hotels.page = 1;
      state.hotels.totalPages = 1;
    },
    clearFlightResults: (state) => {
      state.flights.results = [];
      state.flights.page = 1;
      state.flights.totalPages = 1;
    },
  },
});

export const {
  searchHotelsStart,
  searchHotelsSuccess,
  searchHotelsFailure,
  setHotelFilters,
  setHotelSort,
  setHotelPage,
  searchFlightsStart,
  searchFlightsSuccess,
  searchFlightsFailure,
  setFlightFilters,
  setFlightSort,
  setFlightPage,
  clearHotelResults,
  clearFlightResults,
} = searchSlice.actions;

export default searchSlice.reducer; 