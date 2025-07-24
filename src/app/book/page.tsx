'use client';

import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { 
  User, 
  CreditCard, 
  Lock, 
  MapPin, 
  Mail, 
  Phone, 
  Calendar,
  CheckCircle,
  ArrowLeft
} from 'lucide-react';
import { useForm } from 'react-hook-form';
import { RootState } from '../../store';
import { bookingSuccess, clearCurrentBooking } from '../../store/slices/bookingSlice';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';

interface TravelerFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
}

interface PaymentFormData {
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  cardholderName: string;
  billingAddress: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  sameAsContact: boolean;
}

export default function BookingPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { currentBooking, loading } = useSelector((state: RootState) => state.booking);
  const [currentStep, setCurrentStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);

  const {
    register: registerTraveler,
    handleSubmit: handleTravelerSubmit,
    formState: { errors: travelerErrors },
    watch: watchTraveler,
  } = useForm<TravelerFormData>();

  const {
    register: registerPayment,
    handleSubmit: handlePaymentSubmit,
    formState: { errors: paymentErrors },
    watch: watchPayment,
    setValue: setPaymentValue,
  } = useForm<PaymentFormData>();

  const sameAsContact = watchPayment('sameAsContact');
  const travelerData = watchTraveler();

  useEffect(() => {
    if (!currentBooking) {
      router.push('/');
    }
  }, [currentBooking, router]);

  useEffect(() => {
    if (sameAsContact && travelerData.address) {
      setPaymentValue('billingAddress.street', travelerData.address.street);
      setPaymentValue('billingAddress.city', travelerData.address.city);
      setPaymentValue('billingAddress.state', travelerData.address.state);
      setPaymentValue('billingAddress.zipCode', travelerData.address.zipCode);
      setPaymentValue('billingAddress.country', travelerData.address.country);
    }
  }, [sameAsContact, travelerData.address, setPaymentValue]);

  if (!currentBooking) {
    return null;
  }

  const onTravelerSubmit = (data: TravelerFormData) => {
    setCurrentStep(2);
  };

  const onPaymentSubmit = async (data: PaymentFormData) => {
    setIsProcessing(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const booking = {
      id: `booking_${Date.now()}`,
      type: currentBooking.type!,
      status: 'confirmed' as const,
      bookingDate: new Date().toISOString(),
      totalPrice: currentBooking.totalPrice!,
      travelerInfo: {
        firstName: travelerData.firstName,
        lastName: travelerData.lastName,
        email: travelerData.email,
        phone: travelerData.phone,
        address: travelerData.address,
      },
      paymentInfo: {
        method: 'card' as const,
        cardNumber: `****-****-****-${data.cardNumber.slice(-4)}`,
        billingAddress: data.billingAddress,
      },
      hotel: currentBooking.hotel,
      flight: currentBooking.flight,
    };

    dispatch(bookingSuccess(booking));
    setCurrentStep(3);
    setIsProcessing(false);
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const steps = [
    { number: 1, title: 'Traveler Information', icon: User },
    { number: 2, title: 'Payment Details', icon: CreditCard },
    { number: 3, title: 'Confirmation', icon: CheckCircle },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button
            onClick={() => router.back()}
            className="flex items-center text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft size={20} className="mr-2" />
            Back
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = currentStep === step.number;
              const isCompleted = currentStep > step.number;
              
              return (
                <div key={step.number} className="flex items-center">
                  <div className={`flex items-center justify-center w-12 h-12 rounded-full border-2 ${
                    isCompleted 
                      ? 'bg-green-500 border-green-500 text-white' 
                      : isActive 
                        ? 'bg-blue-500 border-blue-500 text-white' 
                        : 'border-gray-300 text-gray-400'
                  }`}>
                    <Icon size={20} />
                  </div>
                  <div className="ml-3 mr-8">
                    <p className={`text-sm font-medium ${
                      isActive ? 'text-blue-600' : isCompleted ? 'text-green-600' : 'text-gray-500'
                    }`}>
                      Step {step.number}
                    </p>
                    <p className={`text-sm ${
                      isActive ? 'text-gray-900' : 'text-gray-500'
                    }`}>
                      {step.title}
                    </p>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`flex-1 h-0.5 mx-4 ${
                      isCompleted ? 'bg-green-500' : 'bg-gray-300'
                    }`} />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {currentStep === 1 && (
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">
                  Traveler Information
                </h2>
                
                <form onSubmit={handleTravelerSubmit(onTravelerSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      label="First Name"
                      {...registerTraveler('firstName', { required: 'First name is required' })}
                      error={travelerErrors.firstName?.message}
                      icon={<User size={16} className="text-gray-400" />}
                    />
                    <Input
                      label="Last Name"
                      {...registerTraveler('lastName', { required: 'Last name is required' })}
                      error={travelerErrors.lastName?.message}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      label="Email"
                      type="email"
                      {...registerTraveler('email', { 
                        required: 'Email is required',
                        pattern: {
                          value: /^\S+@\S+$/i,
                          message: 'Invalid email address'
                        }
                      })}
                      error={travelerErrors.email?.message}
                      icon={<Mail size={16} className="text-gray-400" />}
                    />
                    <Input
                      label="Phone Number"
                      {...registerTraveler('phone', { required: 'Phone number is required' })}
                      error={travelerErrors.phone?.message}
                      icon={<Phone size={16} className="text-gray-400" />}
                    />
                  </div>

                  <Input
                    label="Date of Birth"
                    type="date"
                    {...registerTraveler('dateOfBirth', { required: 'Date of birth is required' })}
                    error={travelerErrors.dateOfBirth?.message}
                    icon={<Calendar size={16} className="text-gray-400" />}
                  />

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-gray-900">Address</h3>
                    
                    <Input
                      label="Street Address"
                      {...registerTraveler('address.street', { required: 'Street address is required' })}
                      error={travelerErrors.address?.street?.message}
                      icon={<MapPin size={16} className="text-gray-400" />}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Input
                        label="City"
                        {...registerTraveler('address.city', { required: 'City is required' })}
                        error={travelerErrors.address?.city?.message}
                      />
                      <Input
                        label="State"
                        {...registerTraveler('address.state', { required: 'State is required' })}
                        error={travelerErrors.address?.state?.message}
                      />
                      <Input
                        label="ZIP Code"
                        {...registerTraveler('address.zipCode', { required: 'ZIP code is required' })}
                        error={travelerErrors.address?.zipCode?.message}
                      />
                    </div>

                    <Input
                      label="Country"
                      {...registerTraveler('address.country', { required: 'Country is required' })}
                      error={travelerErrors.address?.country?.message}
                    />
                  </div>

                  <Button type="submit" className="w-full" size="lg">
                    Continue to Payment
                  </Button>
                </form>
              </div>
            )}

            {currentStep === 2 && (
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">
                  Payment Information
                </h2>
                
                <form onSubmit={handlePaymentSubmit(onPaymentSubmit)} className="space-y-6">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-center">
                      <Lock size={20} className="text-blue-600 mr-2" />
                      <span className="text-sm text-blue-800">
                        Your payment information is secure and encrypted
                      </span>
                    </div>
                  </div>

                  <Input
                    label="Cardholder Name"
                    {...registerPayment('cardholderName', { required: 'Cardholder name is required' })}
                    error={paymentErrors.cardholderName?.message}
                    icon={<User size={16} className="text-gray-400" />}
                  />

                  <Input
                    label="Card Number"
                    placeholder="1234 5678 9012 3456"
                    {...registerPayment('cardNumber', { 
                      required: 'Card number is required',
                      minLength: { value: 19, message: 'Invalid card number' }
                    })}
                    error={paymentErrors.cardNumber?.message}
                    icon={<CreditCard size={16} className="text-gray-400" />}
                    onChange={(e) => {
                      const formatted = formatCardNumber(e.target.value);
                      e.target.value = formatted;
                    }}
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      label="Expiry Date"
                      placeholder="MM/YY"
                      {...registerPayment('expiryDate', { required: 'Expiry date is required' })}
                      error={paymentErrors.expiryDate?.message}
                    />
                    <Input
                      label="CVV"
                      placeholder="123"
                      {...registerPayment('cvv', { 
                        required: 'CVV is required',
                        minLength: { value: 3, message: 'Invalid CVV' }
                      })}
                      error={paymentErrors.cvv?.message}
                    />
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        {...registerPayment('sameAsContact')}
                        className="mr-2"
                      />
                      <label className="text-sm text-gray-700">
                        Billing address same as contact address
                      </label>
                    </div>

                    {!sameAsContact && (
                      <>
                        <h3 className="text-lg font-medium text-gray-900">Billing Address</h3>
                        
                        <Input
                          label="Street Address"
                          {...registerPayment('billingAddress.street', { required: 'Street address is required' })}
                          error={paymentErrors.billingAddress?.street?.message}
                        />

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <Input
                            label="City"
                            {...registerPayment('billingAddress.city', { required: 'City is required' })}
                            error={paymentErrors.billingAddress?.city?.message}
                          />
                          <Input
                            label="State"
                            {...registerPayment('billingAddress.state', { required: 'State is required' })}
                            error={paymentErrors.billingAddress?.state?.message}
                          />
                          <Input
                            label="ZIP Code"
                            {...registerPayment('billingAddress.zipCode', { required: 'ZIP code is required' })}
                            error={paymentErrors.billingAddress?.zipCode?.message}
                          />
                        </div>

                        <Input
                          label="Country"
                          {...registerPayment('billingAddress.country', { required: 'Country is required' })}
                          error={paymentErrors.billingAddress?.country?.message}
                        />
                      </>
                    )}
                  </div>

                  <div className="flex space-x-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setCurrentStep(1)}
                      className="flex-1"
                    >
                      Back
                    </Button>
                    <Button
                      type="submit"
                      className="flex-1"
                      size="lg"
                      loading={isProcessing}
                    >
                      {isProcessing ? 'Processing...' : `Pay $${currentBooking.totalPrice! + Math.round(currentBooking.totalPrice! * 0.15)}`}
                    </Button>
                  </div>
                </form>
              </div>
            )}

            {currentStep === 3 && (
              <div className="bg-white rounded-xl shadow-sm p-6 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle size={32} className="text-green-600" />
                </div>
                
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Booking Confirmed!
                </h2>
                
                <p className="text-gray-600 mb-6">
                  Your booking has been successfully confirmed. You will receive a confirmation email shortly.
                </p>
                
                <div className="flex space-x-4 justify-center">
                  <Button onClick={() => router.push('/dashboard')}>
                    View My Bookings
                  </Button>
                  <Button variant="outline" onClick={() => router.push('/')}>
                    Book Another Trip
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h3>
              
              {currentBooking.type === 'hotel' && currentBooking.hotel && (
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-900">Hotel Booking</h4>
                    <p className="text-sm text-gray-600">Check-in: {currentBooking.hotel.checkIn}</p>
                    <p className="text-sm text-gray-600">Check-out: {currentBooking.hotel.checkOut}</p>
                    <p className="text-sm text-gray-600">Guests: {currentBooking.hotel.guests}</p>
                  </div>
                </div>
              )}

              {currentBooking.type === 'flight' && currentBooking.flight && (
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-900">Flight Booking</h4>
                    <p className="text-sm text-gray-600">Passengers: {currentBooking.flight.passengers.length}</p>
                  </div>
                </div>
              )}

              <div className="border-t pt-4 mt-4">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${currentBooking.totalPrice}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Taxes & fees</span>
                    <span>${Math.round(currentBooking.totalPrice! * 0.15)}</span>
                  </div>
                  <div className="border-t pt-2 font-semibold flex justify-between">
                    <span>Total</span>
                    <span>${currentBooking.totalPrice! + Math.round(currentBooking.totalPrice! * 0.15)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 