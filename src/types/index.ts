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
  // Enhanced flight details
  aircraft?: {
    type: string;
    name: string;
  };
  distance?: number; // miles
  amenities?: {
    wifi: boolean;
    entertainment: boolean;
    meals: string[];
    power: boolean;
  };
  seatMap?: {
    totalSeats: number;
    availableSeats: number;
    seatConfiguration: string; // e.g., "3-3-3"
  };
}

// Car types
export interface Car {
  id: string;
  name: string;
  category: 'economy' | 'compact' | 'midsize' | 'fullsize' | 'luxury' | 'suv' | 'convertible';
  brand: string;
  model: string;
  year: number;
  images: string[];
  price: number; // per day
  originalPrice?: number;
  location: {
    pickupAddress: string;
    city: string;
    country: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
  features: {
    seats: number;
    doors: number;
    transmission: 'automatic' | 'manual';
    fuelType: 'gasoline' | 'hybrid' | 'electric';
    airConditioning: boolean;
    gps: boolean;
  };
  rental: {
    company: string;
    rating: number;
    reviewCount: number;
    pickupInstructions: string;
    requirements: {
      minAge: number;
      license: string[];
      creditCard: boolean;
    };
  };
  insurance: {
    included: string[];
    optional: Array<{
      name: string;
      description: string;
      price: number;
    }>;
  };
  mileage: {
    unlimited: boolean;
    limit?: number; // miles per day
    overage?: number; // cost per extra mile
  };
  cancellationPolicy: string;
  available: boolean;
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
  car?: {
    carId: string;
    pickupDate: string;
    dropoffDate: string;
    pickupLocation: string;
    dropoffLocation: string;
    driverAge: number;
    insurance: string[];
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
  cars: {
    results: Car[];
    loading: boolean;
    error: string | null;
    filters: SearchFilters;
    sortBy: 'price' | 'rating' | 'category';
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