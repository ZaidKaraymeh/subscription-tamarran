import {configureStore, ThunkAction, Action} from '@reduxjs/toolkit';
import bookingSlice from '../features/bookingReducer';
import userSlice from '../features/userSlice';

export const store = configureStore({
  reducer: {
    users: userSlice,
    bookings: bookingSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
