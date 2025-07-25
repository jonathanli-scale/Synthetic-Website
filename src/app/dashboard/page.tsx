'use client';

import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import {
  Calendar,
  MapPin,
  Plane,
  Hotel,
  Car,
  User,
  Settings,
  CreditCard,
  Bell,
  LogOut,
  Eye,
  Download,
  X,
  Edit,
  Plus
} from 'lucide-react';
import { RootState } from '../../store';
import { loadBookingsSuccess } from '../../store/slices/bookingSlice';
import { logout } from '../../store/slices/userSlice';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { bookingAPI } from '../../utils/api';

// Mock user data
const mockUser = {
  id: '1',
  email: 'john.doe@example.com',
  firstName: 'John',
  lastName: 'Doe',
  avatar: '',
  createdAt: '2023-01-15T00:00:00Z',
};

// Mock bookings data - Start with empty array for clean account
const mockBookings: never[] = [];

export default function DashboardPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { bookings } = useSelector((state: RootState) => (state.booking as any));
  const { isAuthenticated, user } = useSelector((state: RootState) => (state.user as any));
  
  const [activeTab, setActiveTab] = useState('bookings');
  const [showBookingDetails, setShowBookingDetails] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    firstName: mockUser.firstName,
    lastName: mockUser.lastName,
    email: mockUser.email,
    phone: '+1-555-0123',
  });

  useEffect(() => {
    // Load bookings from API or fallback to empty array
    const loadBookings = async () => {
      try {
                 const apiBookings = await bookingAPI.getUserBookings();
         dispatch(loadBookingsSuccess(apiBookings as any));
      } catch (error) {
        console.log('Failed to load bookings from API, using empty array:', error);
        // Start with empty bookings array for clean account
        dispatch(loadBookingsSuccess([]));
      }
    };

    loadBookings();
  }, [dispatch]);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  const handleLogout = () => {
    dispatch(logout());
    router.push('/');
  };

  const handleSaveProfile = () => {
    // In a real app, this would make an API call
    console.log('Saving profile:', profileData);
    setIsEditing(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getBookingIcon = (type: string) => {
    switch (type) {
      case 'hotel':
        return <Hotel size={20} className="text-blue-600" />;
      case 'flight':
        return <Plane size={20} className="text-blue-600" />;
      case 'car':
        return <Car size={20} className="text-blue-600" />;
      default:
        return <Calendar size={20} className="text-blue-600" />;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const tabs = [
    { id: 'bookings', label: 'My Bookings', icon: Calendar },
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'payment', label: 'Payment Methods', icon: CreditCard },
    { id: 'notifications', label: 'Notifications', icon: Bell },
  ];

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                <User size={24} className="text-blue-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Welcome back, {user?.firstName || mockUser.firstName}!
                </h1>
                <p className="text-gray-600">Manage your bookings and account settings</p>
              </div>
            </div>
            <Button variant="outline" onClick={handleLogout}>
              <LogOut size={16} className="mr-2" />
              Sign Out
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <nav className="space-y-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                        activeTab === tab.id
                          ? 'bg-blue-50 text-blue-700 border border-blue-200'
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      <Icon size={20} />
                      <span className="font-medium">{tab.label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeTab === 'bookings' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-900">My Bookings</h2>
                  <Button onClick={() => router.push('/')}>
                    <Plus size={16} className="mr-2" />
                    New Booking
                  </Button>
                </div>

                {bookings.length === 0 ? (
                  <div className="bg-white rounded-xl shadow-sm p-12 text-center">
                    <Calendar size={48} className="text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      No bookings yet
                    </h3>
                    <p className="text-gray-600 mb-6">
                      Start planning your next adventure!
                    </p>
                    <Button onClick={() => router.push('/')}>
                      Browse Travel Options
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {bookings.map((booking) => (
                      <div key={booking.id} className="bg-white rounded-xl shadow-sm p-6">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center space-x-4">
                            {getBookingIcon(booking.type)}
                            <div>
                              <h3 className="font-semibold text-gray-900 capitalize">
                                {booking.type} Booking
                              </h3>
                              <p className="text-sm text-gray-600">
                                Booked on {formatDate(booking.bookingDate)}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-3">
                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(booking.status)}`}>
                              {booking.status}
                            </span>
                            <span className="text-lg font-bold text-gray-900">
                              ${booking.totalPrice}
                            </span>
                          </div>
                        </div>

                        {booking.hotel && (
                          <div className="bg-gray-50 rounded-lg p-4 mb-4">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              <div>
                                <p className="text-sm text-gray-600">Check-in</p>
                                <p className="font-medium">{formatDate(booking.hotel.checkIn)}</p>
                              </div>
                              <div>
                                <p className="text-sm text-gray-600">Check-out</p>
                                <p className="font-medium">{formatDate(booking.hotel.checkOut)}</p>
                              </div>
                              <div>
                                <p className="text-sm text-gray-600">Guests</p>
                                <p className="font-medium">{booking.hotel.guests} guests</p>
                              </div>
                            </div>
                          </div>
                        )}

                        {booking.flight && (
                          <div className="bg-gray-50 rounded-lg p-4 mb-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <p className="text-sm text-gray-600">Passengers</p>
                                <p className="font-medium">{booking.flight.passengers.length} passenger(s)</p>
                              </div>
                              <div>
                                <p className="text-sm text-gray-600">Flight ID</p>
                                <p className="font-medium">{booking.flight.flightId}</p>
                              </div>
                            </div>
                          </div>
                        )}

                        <div className="flex space-x-3">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setShowBookingDetails(booking.id)}
                          >
                            <Eye size={16} className="mr-2" />
                            View Details
                          </Button>
                          <Button variant="outline" size="sm">
                            <Download size={16} className="mr-2" />
                            Download Receipt
                          </Button>
                          {booking.status === 'confirmed' && (
                            <Button variant="outline" size="sm">
                              Cancel Booking
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'profile' && (
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">Profile Information</h2>
                  <Button
                    variant={isEditing ? 'primary' : 'outline'}
                    onClick={() => isEditing ? handleSaveProfile() : setIsEditing(true)}
                  >
                    {isEditing ? 'Save Changes' : (
                      <>
                        <Edit size={16} className="mr-2" />
                        Edit Profile
                      </>
                    )}
                  </Button>
                </div>

                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      label="First Name"
                      value={profileData.firstName}
                      onChange={(e) => setProfileData({ ...profileData, firstName: e.target.value })}
                      disabled={!isEditing}
                    />
                    <Input
                      label="Last Name"
                      value={profileData.lastName}
                      onChange={(e) => setProfileData({ ...profileData, lastName: e.target.value })}
                      disabled={!isEditing}
                    />
                  </div>

                  <Input
                    label="Email Address"
                    type="email"
                    value={profileData.email}
                    onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                    disabled={!isEditing}
                  />

                  <Input
                    label="Phone Number"
                    value={profileData.phone}
                    onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                    disabled={!isEditing}
                  />

                  {isEditing && (
                    <div className="flex space-x-3">
                      <Button onClick={handleSaveProfile}>
                        Save Changes
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => setIsEditing(false)}
                      >
                        Cancel
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'payment' && (
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">Payment Methods</h2>
                  <Button>
                    <Plus size={16} className="mr-2" />
                    Add New Card
                  </Button>
                </div>

                <div className="space-y-4">
                  <div className="border rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-6 bg-blue-600 rounded flex items-center justify-center">
                          <span className="text-white text-xs font-bold">VISA</span>
                        </div>
                        <div>
                          <p className="font-medium">•••• •••• •••• 1234</p>
                          <p className="text-sm text-gray-600">Expires 12/25</p>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">Edit</Button>
                        <Button variant="outline" size="sm">Remove</Button>
                      </div>
                    </div>
                  </div>

                  <div className="border rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-6 bg-red-600 rounded flex items-center justify-center">
                          <span className="text-white text-xs font-bold">MC</span>
                        </div>
                        <div>
                          <p className="font-medium">•••• •••• •••• 5678</p>
                          <p className="text-sm text-gray-600">Expires 08/26</p>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">Edit</Button>
                        <Button variant="outline" size="sm">Remove</Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'notifications' && (
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Notification Preferences</h2>

                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-gray-900">Email Notifications</h3>
                      <p className="text-sm text-gray-600">Receive booking confirmations and updates via email</p>
                    </div>
                    <input type="checkbox" defaultChecked className="w-4 h-4" />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-gray-900">SMS Notifications</h3>
                      <p className="text-sm text-gray-600">Get text messages for important updates</p>
                    </div>
                    <input type="checkbox" defaultChecked className="w-4 h-4" />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-gray-900">Marketing Communications</h3>
                      <p className="text-sm text-gray-600">Receive deals and promotional offers</p>
                    </div>
                    <input type="checkbox" className="w-4 h-4" />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-gray-900">Booking Reminders</h3>
                      <p className="text-sm text-gray-600">Get reminders before your travel dates</p>
                    </div>
                    <input type="checkbox" defaultChecked className="w-4 h-4" />
                  </div>

                  <Button>Save Preferences</Button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Booking Details Modal */}
        {showBookingDetails && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold text-gray-900">Booking Details</h3>
                  <button
                    onClick={() => setShowBookingDetails(null)}
                    className="p-2 hover:bg-gray-100 rounded-lg"
                  >
                    <X size={20} />
                  </button>
                </div>

                {/* Booking details content would go here */}
                <div className="space-y-4">
                  <p className="text-gray-600">
                    Detailed booking information for booking ID: {showBookingDetails}
                  </p>
                  {/* Add more detailed booking information */}
                </div>

                <div className="flex space-x-3 mt-6">
                  <Button onClick={() => setShowBookingDetails(null)}>
                    Close
                  </Button>
                  <Button variant="outline">
                    <Download size={16} className="mr-2" />
                    Download Receipt
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 