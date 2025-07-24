import { configureStore } from '@reduxjs/toolkit';
import userSlice from './slices/userSlice';
import searchSlice from './slices/searchSlice';
import bookingSlice from './slices/bookingSlice';
import uiSlice from './slices/uiSlice';

export const store = configureStore({
  reducer: {
    user: userSlice,
    search: searchSlice,
    booking: bookingSlice,
    ui: uiSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 