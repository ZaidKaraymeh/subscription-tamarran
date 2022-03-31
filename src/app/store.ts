import {configureStore, ThunkAction, Action} from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import userSlice from '../features/userSlice';

export const store = configureStore({
  reducer: {
    users: userSlice
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
