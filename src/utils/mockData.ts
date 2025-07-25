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
  {
    id: '4',
    name: 'Swiss Alpine Lodge',
    description: 'Charming mountain retreat in the heart of the Swiss Alps. Perfect for skiing in winter and hiking in summer, with breathtaking mountain views.',
    images: [
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    ],
    rating: 4.7,
    reviewCount: 523,
    price: 320,
    originalPrice: 380,
    location: {
      address: 'Dorfstrasse 12, 123 Zermatt Street',
      city: 'Zermatt',
      country: 'Switzerland',
      coordinates: {
        lat: 46.0207,
        lng: 7.7491,
      },
    },
    amenities: ['Free WiFi', 'Ski Storage', 'Restaurant', 'Spa', 'Mountain Views', 'Fireplace'],
    rooms: [
      {
        id: 'r5',
        name: 'Alpine Suite',
        price: 320,
        maxGuests: 2,
        amenities: ['King Bed', 'Mountain View', 'Balcony', 'Mini Bar'],
        images: ['https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'],
        available: true,
      },
    ],
    cancellationPolicy: 'Free cancellation up to 48 hours before check-in',
    featured: true,
  },
  {
    id: '5',
    name: 'Santorini Sunset Resort',
    description: 'Iconic whitewashed resort perched on the cliffs of Santorini. Enjoy stunning sunsets, infinity pools, and authentic Greek hospitality.',
    images: [
      'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    ],
    rating: 4.9,
    reviewCount: 789,
    price: 450,
    location: {
      address: 'Imerovigli, 123 Imerovigli Street',
      city: 'Santorini',
      country: 'Greece',
      coordinates: {
        lat: 36.4218,
        lng: 25.4312,
      },
    },
    amenities: ['Infinity Pool', 'Sunset Views', 'Free WiFi', 'Spa', 'Restaurant', 'Concierge'],
    rooms: [
      {
        id: 'r6',
        name: 'Caldera View Suite',
        price: 450,
        maxGuests: 2,
        amenities: ['King Bed', 'Caldera View', 'Private Terrace', 'Jacuzzi'],
        images: ['https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'],
        available: true,
      },
    ],
    cancellationPolicy: 'Free cancellation up to 72 hours before check-in',
    featured: true,
  },
  {
    id: '6',
    name: 'Dubai Marina Tower Hotel',
    description: 'Ultra-modern skyscraper hotel in Dubai Marina with panoramic city and sea views. Luxury shopping and dining at your doorstep.',
    images: [
      'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    ],
    rating: 4.6,
    reviewCount: 1456,
    price: 350,
    originalPrice: 420,
    location: {
      address: 'Dubai Marina Walk, 123 Dubai Marina Street',
      city: 'Dubai',
      country: 'UAE',
      coordinates: {
        lat: 25.0657,
        lng: 55.1713,
      },
    },
    amenities: ['Rooftop Pool', 'Free WiFi', 'Gym', 'Multiple Restaurants', 'Valet Parking', 'Beach Access'],
    rooms: [
      {
        id: 'r7',
        name: 'Marina View Room',
        price: 350,
        maxGuests: 2,
        amenities: ['King Bed', 'Marina View', 'Floor-to-ceiling Windows', 'Work Desk'],
        images: ['https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'],
        available: true,
      },
    ],
    cancellationPolicy: 'Free cancellation up to 24 hours before check-in',
    featured: false,
  },
  {
    id: '7',
    name: 'Costa Rica Eco Lodge',
    description: 'Sustainable rainforest retreat surrounded by tropical wildlife. Perfect for nature lovers seeking adventure and tranquility.',
    images: [
      'https://images.unsplash.com/photo-1520637836862-4d197d17c55a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    ],
    rating: 4.5,
    reviewCount: 342,
    price: 180,
    location: {
      address: 'Manuel Antonio National Park, 123 Manuel Antonio Street',
      city: 'Manuel Antonio',
      country: 'Costa Rica',
      coordinates: {
        lat: 9.3908,
        lng: -84.1417,
      },
    },
    amenities: ['Nature Tours', 'Free WiFi', 'Restaurant', 'Wildlife Viewing', 'Hiking Trails', 'Eco-Friendly'],
    rooms: [
      {
        id: 'r8',
        name: 'Rainforest Cabin',
        price: 180,
        maxGuests: 2,
        amenities: ['Queen Bed', 'Forest View', 'Private Bathroom', 'Mosquito Nets'],
        images: ['https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'],
        available: true,
      },
    ],
    cancellationPolicy: 'Free cancellation up to 48 hours before check-in',
    featured: false,
  },
  {
    id: '8',
    name: 'Kyoto Traditional Ryokan',
    description: 'Authentic Japanese inn with tatami rooms, zen gardens, and traditional kaiseki dining. Experience ancient Japanese hospitality.',
    images: [
      'https://images.unsplash.com/photo-1580837119756-563d608dd119?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1528164344705-47542687000d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    ],
    rating: 4.8,
    reviewCount: 667,
    price: 280,
    location: {
      address: 'Gion District, 123 Gion Street',
      city: 'Kyoto',
      country: 'Japan',
      coordinates: {
        lat: 35.0116,
        lng: 135.7681,
      },
    },
    amenities: ['Traditional Baths', 'Zen Garden', 'Kaiseki Dining', 'Tea Ceremony', 'Kimono Rental', 'Free WiFi'],
    rooms: [
      {
        id: 'r9',
        name: 'Tatami Suite',
        price: 280,
        maxGuests: 2,
        amenities: ['Tatami Floors', 'Futon Beds', 'Garden View', 'Private Bath'],
        images: ['https://images.unsplash.com/photo-1611892440504-42a792e24d32?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'],
        available: true,
      },
    ],
    cancellationPolicy: 'Free cancellation up to 24 hours before check-in',
    featured: true,
  },
  {
    id: '9',
    name: 'Sydney Harbor Hotel',
    description: 'Prime location overlooking Sydney Harbor with views of the Opera House and Harbor Bridge. Modern luxury in the heart of the city.',
    images: [
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    ],
    rating: 4.7,
    reviewCount: 1123,
    price: 380,
    originalPrice: 450,
    location: {
      address: 'Circular Quay, 123 Circular Street',
      city: 'Sydney',
      country: 'Australia',
      coordinates: {
        lat: -33.8688,
        lng: 151.2093,
      },
    },
    amenities: ['Harbor Views', 'Rooftop Bar', 'Free WiFi', 'Gym', 'Business Center', 'Concierge'],
    rooms: [
      {
        id: 'r10',
        name: 'Harbor View Suite',
        price: 380,
        maxGuests: 2,
        amenities: ['King Bed', 'Opera House View', 'Floor-to-ceiling Windows', 'Mini Bar'],
        images: ['https://images.unsplash.com/photo-1618773928121-c32242e63f39?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'],
        available: true,
      },
    ],
    cancellationPolicy: 'Free cancellation up to 24 hours before check-in',
    featured: true,
  },
  {
    id: '10',
    name: 'Marrakech Riad Palace',
    description: 'Authentic Moroccan riad in the historic medina. Traditional architecture with modern amenities, rooftop terrace, and hammam spa.',
    images: [
      'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1609948742350-b4b8b5a2ad17?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    ],
    rating: 4.4,
    reviewCount: 445,
    price: 160,
    location: {
      address: 'Medina Quarter, 123 Medina Street',
      city: 'Marrakech',
      country: 'Morocco',
      coordinates: {
        lat: 31.6295,
        lng: -7.9811,
      },
    },
    amenities: ['Rooftop Terrace', 'Hammam Spa', 'Traditional Decor', 'Free WiFi', 'Restaurant', 'Airport Transfer'],
    rooms: [
      {
        id: 'r11',
        name: 'Moroccan Suite',
        price: 160,
        maxGuests: 2,
        amenities: ['Traditional Furnishing', 'Moroccan Tiles', 'Courtyard View', 'Air Conditioning'],
        images: ['https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'],
        available: true,
      },
    ],
    cancellationPolicy: 'Free cancellation up to 48 hours before check-in',
    featured: false,
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