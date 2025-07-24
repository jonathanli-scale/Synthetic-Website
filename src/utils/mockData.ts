import { Hotel, Flight } from '../types';

export const mockHotels: Hotel[] = [
  {
    id: '1',
    name: 'Grand Luxury Hotel Paris',
    description: 'Experience Parisian elegance at its finest in this luxury hotel located in the heart of the city. Just steps away from the Louvre and Champs-Élysées.',
    images: [
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    ],
    rating: 4.8,
    reviewCount: 1247,
    price: 289,
    originalPrice: 350,
    location: {
      address: '123 Rue de Rivoli',
      city: 'Paris',
      country: 'France',
      coordinates: {
        lat: 48.8566,
        lng: 2.3522,
      },
    },
    amenities: ['Free WiFi', 'Pool', 'Spa', 'Restaurant', 'Gym', 'Room Service', 'Concierge'],
    rooms: [
      {
        id: 'r1',
        name: 'Deluxe Room',
        price: 289,
        maxGuests: 2,
        amenities: ['King Bed', 'City View', 'Free WiFi', 'Mini Bar'],
        images: ['https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'],
        available: true,
      },
      {
        id: 'r2',
        name: 'Executive Suite',
        price: 459,
        maxGuests: 4,
        amenities: ['Separate Living Room', 'Eiffel Tower View', 'Butler Service', 'Premium WiFi'],
        images: ['https://images.unsplash.com/photo-1618773928121-c32242e63f39?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'],
        available: true,
      },
    ],
    cancellationPolicy: 'Free cancellation up to 24 hours before check-in',
    featured: true,
  },
  {
    id: '2',
    name: 'Tokyo Bay Resort',
    description: 'Modern waterfront hotel with stunning bay views and traditional Japanese hospitality. Perfect blend of contemporary comfort and cultural authenticity.',
    images: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    ],
    rating: 4.6,
    reviewCount: 892,
    price: 245,
    location: {
      address: '1-1 Shibaura, Minato City',
      city: 'Tokyo',
      country: 'Japan',
      coordinates: {
        lat: 35.6762,
        lng: 139.6503,
      },
    },
    amenities: ['Free WiFi', 'Restaurant', 'Bar', 'Business Center', 'Laundry'],
    rooms: [
      {
        id: 'r3',
        name: 'Bay View Room',
        price: 245,
        maxGuests: 2,
        amenities: ['Queen Bed', 'Bay View', 'Free WiFi', 'Tea Set'],
        images: ['https://images.unsplash.com/photo-1611892440504-42a792e24d32?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'],
        available: true,
      },
    ],
    cancellationPolicy: 'Free cancellation up to 48 hours before check-in',
    featured: false,
  },
  {
    id: '3',
    name: 'Manhattan Boutique Hotel',
    description: 'Stylish boutique hotel in the heart of Manhattan. Walking distance to Times Square, Central Park, and world-class shopping.',
    images: [
      'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1596436889106-be35e843f974?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    ],
    rating: 4.4,
    reviewCount: 634,
    price: 199,
    originalPrice: 249,
    location: {
      address: '789 5th Avenue',
      city: 'New York',
      country: 'USA',
      coordinates: {
        lat: 40.7589,
        lng: -73.9851,
      },
    },
    amenities: ['Free WiFi', 'Fitness Center', 'Restaurant', 'Room Service'],
    rooms: [
      {
        id: 'r4',
        name: 'City View Room',
        price: 199,
        maxGuests: 2,
        amenities: ['Queen Bed', 'City View', 'Free WiFi', 'Work Desk'],
        images: ['https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'],
        available: true,
      },
    ],
    cancellationPolicy: 'Free cancellation up to 24 hours before check-in',
    featured: true,
  },
];

export const mockFlights: Flight[] = [
  {
    id: 'f1',
    airline: 'Air France',
    flightNumber: 'AF 1234',
    from: {
      code: 'JFK',
      name: 'John F. Kennedy International Airport',
      city: 'New York',
    },
    to: {
      code: 'CDG',
      name: 'Charles de Gaulle Airport',
      city: 'Paris',
    },
    departure: '2024-03-15T14:30:00',
    arrival: '2024-03-16T03:45:00',
    duration: 435, // 7h 15m
    price: 599,
    originalPrice: 799,
    stops: 0,
    cabinClass: 'economy',
    baggage: {
      carry: '1 x 8kg',
      checked: '1 x 23kg',
    },
    cancellationPolicy: 'Refundable with fee',
  },
  {
    id: 'f2',
    airline: 'Delta Airlines',
    flightNumber: 'DL 456',
    from: {
      code: 'LAX',
      name: 'Los Angeles International Airport',
      city: 'Los Angeles',
    },
    to: {
      code: 'NRT',
      name: 'Narita International Airport',
      city: 'Tokyo',
    },
    departure: '2024-03-20T11:00:00',
    arrival: '2024-03-21T16:30:00',
    duration: 690, // 11h 30m
    price: 845,
    stops: 0,
    cabinClass: 'economy',
    baggage: {
      carry: '1 x 7kg',
      checked: '2 x 23kg',
    },
    cancellationPolicy: 'Non-refundable',
  },
  {
    id: 'f3',
    airline: 'British Airways',
    flightNumber: 'BA 789',
    from: {
      code: 'LHR',
      name: 'Heathrow Airport',
      city: 'London',
    },
    to: {
      code: 'DXB',
      name: 'Dubai International Airport',
      city: 'Dubai',
    },
    departure: '2024-03-25T09:15:00',
    arrival: '2024-03-25T19:20:00',
    duration: 425, // 7h 5m
    price: 479,
    stops: 0,
    cabinClass: 'economy',
    baggage: {
      carry: '1 x 8kg',
      checked: '1 x 23kg',
    },
    cancellationPolicy: 'Refundable with fee',
  },
];

// Helper function to filter and sort results
export function searchHotels(
  destination: string,
  checkIn: string,
  checkOut: string,
  guests: number,
  rooms: number,
  filters?: {
    priceRange?: [number, number];
    rating?: number;
    amenities?: string[];
  },
  sortBy: 'price' | 'rating' | 'distance' = 'price'
): Hotel[] {
  let results = [...mockHotels];

  // Filter by destination
  if (destination) {
    results = results.filter(hotel =>
      hotel.location.city.toLowerCase().includes(destination.toLowerCase()) ||
      hotel.location.country.toLowerCase().includes(destination.toLowerCase()) ||
      hotel.name.toLowerCase().includes(destination.toLowerCase())
    );
  }

  // Apply filters
  if (filters) {
    if (filters.priceRange) {
      results = results.filter(hotel => 
        hotel.price >= filters.priceRange![0] && hotel.price <= filters.priceRange![1]
      );
    }

    if (filters.rating) {
      results = results.filter(hotel => hotel.rating >= filters.rating!);
    }

    if (filters.amenities && filters.amenities.length > 0) {
      results = results.filter(hotel =>
        filters.amenities!.some(amenity => hotel.amenities.includes(amenity))
      );
    }
  }

  // Sort results
  results.sort((a, b) => {
    switch (sortBy) {
      case 'price':
        return a.price - b.price;
      case 'rating':
        return b.rating - a.rating;
      case 'distance':
        // Mock distance sorting - in real app would use coordinates
        return Math.random() - 0.5;
      default:
        return 0;
    }
  });

  return results;
}

export function searchFlights(
  from: string,
  to: string,
  departureDate: string,
  passengers: number,
  filters?: {
    priceRange?: [number, number];
    stops?: number;
    cabinClass?: 'economy' | 'business' | 'first';
  },
  sortBy: 'price' | 'duration' | 'departure' = 'price'
): Flight[] {
  let results = [...mockFlights];

  // Filter by route
  if (from && to) {
    results = results.filter(flight =>
      flight.from.city.toLowerCase().includes(from.toLowerCase()) &&
      flight.to.city.toLowerCase().includes(to.toLowerCase())
    );
  }

  // Apply filters
  if (filters) {
    if (filters.priceRange) {
      results = results.filter(flight => 
        flight.price >= filters.priceRange![0] && flight.price <= filters.priceRange![1]
      );
    }

    if (filters.stops !== undefined) {
      results = results.filter(flight => flight.stops === filters.stops);
    }

    if (filters.cabinClass) {
      results = results.filter(flight => flight.cabinClass === filters.cabinClass);
    }
  }

  // Sort results
  results.sort((a, b) => {
    switch (sortBy) {
      case 'price':
        return a.price - b.price;
      case 'duration':
        return a.duration - b.duration;
      case 'departure':
        return new Date(a.departure).getTime() - new Date(b.departure).getTime();
      default:
        return 0;
    }
  });

  return results;
} 