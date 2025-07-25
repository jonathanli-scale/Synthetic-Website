const API_BASE = 'http://localhost:8000/api/v1';

// Get auth token from localStorage or Redux
const getAuthToken = () => {
  // For now, we'll use a demo token. In production, this would come from Redux state or localStorage
  return localStorage.getItem('authToken') || null;
};

// Generic API call function
async function apiCall<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const token = getAuthToken();
  
  const config: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
    ...options,
  };

  const response = await fetch(`${API_BASE}${endpoint}`, config);
  
  if (!response.ok) {
    throw new Error(`API Error: ${response.status} ${response.statusText}`);
  }
  
  return response.json();
}

interface BookingData {
  booking_type: string;
  hotel_id?: number;
  flight_id?: number;
  check_in_date?: string;
  check_out_date?: string;
  guest_details: {
    adults: number;
    children: number;
    rooms: number;
  };
  traveler_info: Array<{
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
  }>;
  total_price: number;
  currency?: string;
  special_requests?: string;
}

// Auth API calls
export const authAPI = {
  demoLogin: async () => {
    const response = await fetch(`${API_BASE}/auth/demo-login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
    const data = await response.json();
    
    // Store token in localStorage
    if (data.access_token) {
      localStorage.setItem('authToken', data.access_token);
    }
    
    return data;
  },

  getCurrentUser: async () => {
    return apiCall('/users/me');
  },
};

// Booking API calls
export const bookingAPI = {
  createBooking: async (bookingData: BookingData) => {
    return apiCall('/bookings/', {
      method: 'POST',
      body: JSON.stringify(bookingData),
    });
  },

  getUserBookings: async () => {
    return apiCall('/bookings/');
  },

  getBooking: async (bookingId: number) => {
    return apiCall(`/bookings/${bookingId}`);
  },
};

// Hotel API calls
export const hotelAPI = {
  searchHotels: async (params: {
    destination?: string;
    check_in?: string;
    check_out?: string;
    guests?: number;
    rooms?: number;
  }) => {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        searchParams.append(key, value.toString());
      }
    });
    
    return apiCall(`/search/hotels?${searchParams.toString()}`);
  },

  getHotel: async (hotelId: number) => {
    return apiCall(`/hotels/${hotelId}`);
  },
}; 