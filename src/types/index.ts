// User types
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  createdAt: string;
}

export interface UserState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

// Search types
export interface SearchFilters {
  priceRange: [number, number];
  rating?: number;
  amenities: string[];
  location?: string;
  dates?: {
    checkIn: string;
    checkOut: string;
  };
}

export interface HotelSearchParams {
  destination: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  rooms: number;
}

export interface FlightSearchParams {
  from: string;
  to: string;
  departureDate: string;
  returnDate?: string;
  passengers: number;
  tripType: 'one-way' | 'round-trip';
  cabinClass: 'economy' | 'business' | 'first';
}

export interface CarSearchParams {
  location: string;
  pickupDate: string;
  dropoffDate: string;
  age: number;
}

// Hotel types
export interface Hotel {
  id: string;
  name: string;
  description: string;
  images: string[];
  rating: number;
  reviewCount: number;
  price: number;
  originalPrice?: number;
  location: {
    address: string;
    city: string;
    country: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
  amenities: string[];
  rooms: Room[];
  cancellationPolicy: string;
  featured: boolean;
}

export interface Room {
  id: string;
  name: string;
  price: number;
  maxGuests: number;
  amenities: string[];
  images: string[];
  available: boolean;
}

// Flight types
export interface Flight {
  id: string;
  airline: string;
  flightNumber: string;
  from: {
    code: string;
    name: string;
    city: string;
  };
  to: {
    code: string;
    name: string;
    city: string;
  };
  departure: string;
  arrival: string;
  duration: number; // minutes
  price: number;
  originalPrice?: number;
  stops: number;
  cabinClass: 'economy' | 'business' | 'first';
  baggage: {
    carry: string;
    checked: string;
  };
  cancellationPolicy: string;
}

// Booking types
export interface Booking {
  id: string;
  type: 'hotel' | 'flight' | 'car';
  status: 'confirmed' | 'pending' | 'cancelled';
  bookingDate: string;
  totalPrice: number;
  travelerInfo: TravelerInfo;
  paymentInfo: PaymentInfo;
  hotel?: {
    hotelId: string;
    roomId: string;
    checkIn: string;
    checkOut: string;
    guests: number;
  };
  flight?: {
    flightId: string;
    passengers: Passenger[];
  };
}

export interface TravelerInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
}

export interface Passenger {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  passportNumber?: string;
  seat?: string;
}

export interface PaymentInfo {
  method: 'card' | 'paypal';
  cardNumber?: string;
  expiryDate?: string;
  cvv?: string;
  billingAddress?: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
}

// UI types
export interface UIState {
  searchType: 'hotels' | 'flights' | 'cars';
  loading: boolean;
  error: string | null;
  modals: {
    login: boolean;
    signup: boolean;
    booking: boolean;
  };
}

// Search state
export interface SearchState {
  hotels: {
    results: Hotel[];
    loading: boolean;
    error: string | null;
    filters: SearchFilters;
    sortBy: 'price' | 'rating' | 'distance';
    page: number;
    totalPages: number;
  };
  flights: {
    results: Flight[];
    loading: boolean;
    error: string | null;
    filters: SearchFilters;
    sortBy: 'price' | 'duration' | 'departure';
    page: number;
    totalPages: number;
  };
}

// Booking state
export interface BookingState {
  currentBooking: Partial<Booking> | null;
  bookings: Booking[];
  loading: boolean;
  error: string | null;
} 