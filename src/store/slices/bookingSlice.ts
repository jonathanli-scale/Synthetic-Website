import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BookingState, Booking } from '../../types';

const initialState: BookingState = {
  currentBooking: null,
  bookings: [],
  loading: false,
  error: null,
};

const bookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {
    startBooking: (state, action: PayloadAction<Partial<Booking>>) => {
      state.currentBooking = action.payload;
      state.error = null;
    },
    updateBooking: (state, action: PayloadAction<Partial<Booking>>) => {
      if (state.currentBooking) {
        state.currentBooking = { ...state.currentBooking, ...action.payload };
      }
    },
    bookingStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    bookingSuccess: (state, action: PayloadAction<Booking>) => {
      state.loading = false;
      state.bookings.push(action.payload);
      state.currentBooking = null;
    },
    bookingFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    loadBookingsStart: (state) => {
      state.loading = true;
    },
    loadBookingsSuccess: (state, action: PayloadAction<Booking[]>) => {
      state.loading = false;
      state.bookings = action.payload;
    },
    loadBookingsFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    cancelBooking: (state, action: PayloadAction<string>) => {
      const booking = state.bookings.find(b => b.id === action.payload);
      if (booking) {
        booking.status = 'cancelled';
      }
    },
    clearCurrentBooking: (state) => {
      state.currentBooking = null;
    },
    clearBookingError: (state) => {
      state.error = null;
    },
  },
});

export const {
  startBooking,
  updateBooking,
  bookingStart,
  bookingSuccess,
  bookingFailure,
  loadBookingsStart,
  loadBookingsSuccess,
  loadBookingsFailure,
  cancelBooking,
  clearCurrentBooking,
  clearBookingError,
} = bookingSlice.actions;

export default bookingSlice.reducer; 