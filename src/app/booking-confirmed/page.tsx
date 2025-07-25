'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { CheckCircle, Calendar, MapPin, Users, Download, Share } from 'lucide-react';
import { Button } from '../../components/ui/Button';

export default function BookingConfirmedPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [bookingDetails, setBookingDetails] = useState<any>(null);

  const bookingId = searchParams.get('bookingId');
  const bookingType = searchParams.get('type');
  const totalPrice = searchParams.get('total');

  useEffect(() => {
    // In a real app, you'd fetch booking details from API using bookingId
    if (bookingId) {
      setBookingDetails({
        id: bookingId,
        type: bookingType,
        totalPrice: totalPrice,
        confirmationDate: new Date().toISOString(),
      });
    }
  }, [bookingId, bookingType, totalPrice]);

  if (!bookingId) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">No booking found</h2>
          <p className="text-gray-600 mb-4">We couldn't find your booking confirmation.</p>
          <Button onClick={() => router.push('/')}>Return Home</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle size={32} className="text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Booking Confirmed!</h1>
            <p className="text-gray-600 mt-2">Your reservation has been successfully confirmed</p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Confirmation Details */}
        <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
          <div className="border-b pb-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Booking Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <div className="flex items-center text-gray-600 mb-2">
                  <Calendar size={20} className="mr-2" />
                  <span className="text-sm">Booking Reference</span>
                </div>
                <p className="font-semibold text-gray-900">{bookingId}</p>
              </div>
              <div>
                <div className="flex items-center text-gray-600 mb-2">
                  <MapPin size={20} className="mr-2" />
                  <span className="text-sm">Booking Type</span>
                </div>
                <p className="font-semibold text-gray-900 capitalize">{bookingType}</p>
              </div>
              <div>
                <div className="flex items-center text-gray-600 mb-2">
                  <Users size={20} className="mr-2" />
                  <span className="text-sm">Total Amount</span>
                </div>
                <p className="font-semibold text-gray-900">${totalPrice}</p>
              </div>
            </div>
          </div>

          {/* Confirmation Message */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
            <div className="flex items-start">
              <CheckCircle size={24} className="text-green-600 mr-3 mt-1" />
              <div>
                <h3 className="text-lg font-semibold text-green-900 mb-2">
                  Confirmation Email Sent
                </h3>
                <p className="text-green-800">
                  We've sent a detailed confirmation email with your booking information, 
                  including any special instructions and contact details. Please check your 
                  inbox and spam folder.
                </p>
              </div>
            </div>
          </div>

          {/* Next Steps */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-blue-900 mb-3">What's Next?</h3>
            <ul className="space-y-2 text-blue-800">
              <li className="flex items-start">
                <span className="inline-block w-2 h-2 bg-blue-600 rounded-full mr-3 mt-2"></span>
                <span>Keep your booking reference handy for check-in</span>
              </li>
              <li className="flex items-start">
                <span className="inline-block w-2 h-2 bg-blue-600 rounded-full mr-3 mt-2"></span>
                <span>You can view and manage your booking in your dashboard</span>
              </li>
              <li className="flex items-start">
                <span className="inline-block w-2 h-2 bg-blue-600 rounded-full mr-3 mt-2"></span>
                <span>Contact customer support if you need to make changes</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            onClick={() => router.push('/dashboard')}
            className="flex items-center justify-center"
          >
            <Calendar size={20} className="mr-2" />
            View My Bookings
          </Button>
          
          <Button 
            variant="outline" 
            onClick={() => router.push('/')}
            className="flex items-center justify-center"
          >
            Book Another Trip
          </Button>

          <Button 
            variant="outline"
            onClick={() => window.print()}
            className="flex items-center justify-center"
          >
            <Download size={20} className="mr-2" />
            Print Confirmation
          </Button>

          <Button 
            variant="outline"
            onClick={() => {
              if (navigator.share) {
                navigator.share({
                  title: 'My Travel Booking',
                  text: `I just booked a ${bookingType} trip! Booking reference: ${bookingId}`,
                  url: window.location.href,
                });
              } else {
                navigator.clipboard.writeText(window.location.href);
                alert('Booking link copied to clipboard!');
              }
            }}
            className="flex items-center justify-center"
          >
            <Share size={20} className="mr-2" />
            Share
          </Button>
        </div>

        {/* Customer Support */}
        <div className="text-center mt-8">
          <p className="text-gray-600 mb-2">Need help with your booking?</p>
          <div className="flex justify-center space-x-6 text-sm">
            <a href="mailto:support@travelbooking.com" className="text-blue-600 hover:text-blue-800">
              Email Support
            </a>
            <a href="tel:+1-555-123-4567" className="text-blue-600 hover:text-blue-800">
              Call Us: +1-555-123-4567
            </a>
            <a href="/help" className="text-blue-600 hover:text-blue-800">
              Help Center
            </a>
          </div>
        </div>
      </div>
    </div>
  );
} 