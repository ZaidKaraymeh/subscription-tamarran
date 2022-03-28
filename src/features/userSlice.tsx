import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import {RootState} from '../app/store';

// interface CounterState {
//   value: number;
//   status: 'idle' | 'loading' | 'failed';
// }
export type BookingAction = {
  booking: Booking,
  user: User
}
export type SubscribeAction = {
  user: User
}

export type OrderHistory = {
  vendor_name: string;
  price: number;
  user_id: number;
  is_user_subscribed: boolean;
  timing?: string;
};


export type User = {
  id: number;
  username: string;
  email: string;
  is_subscribed: boolean;
  purchases_count: number;
  order_histroy: Booking[];
  user_type: 'vendor' | 'customer';
}
export type Booking = {
  id: number;
  vendor_name: string;
  price: number;
  stars: number;
  member_price:number;
  location: string;
  timing?: string;
}
interface Users {
  users: User[];
}

const initialState: Users = {
  users: [
    {
      id: 1,
      username: 'Zaid Karaymeh',
      email: 'karaymehzaid@gmail.com',
      is_subscribed: false,
      purchases_count: 0,
      order_histroy: [],
      user_type: 'vendor',
    },
    {
      id: 2,
      username: 'Ahmed Muhammed',
      email: 'ahmedmuhammad@gmail.com',
      is_subscribed: false,
      purchases_count: 0,
      order_histroy: [],
      user_type: 'customer',
    },
  ],
};

// const initialState: CounterState = {
//   value: 0,
//   status: 'idle',
// };

export const getUserById = (id:number) => {
  const users = useSelector(selectUsers);
  return users.find((user: any) => user.id == id)
}


export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    completeUserBooking: (state, action: PayloadAction<BookingAction>) => {
      const {user, booking} = action.payload;
      const index = state.users.findIndex(x => x.id == user.id)
      const user_new: User = {
        id: user.id,
        username: user.username,
        email: user.email,
        purchases_count: user.purchases_count + 1,
        is_subscribed: user.is_subscribed,
        user_type: user.user_type,
        order_histroy: [...user.order_histroy, booking],
      };
      state.users[index]  = user_new
    },
    
    activateUserSubscription: (state, action: PayloadAction<SubscribeAction>) => {
      const {user} = action.payload;
      const index = state.users.findIndex(x => x.id == user.id)
      const user_new: User = {
        id: user.id,
        username: user.username,
        email: user.email,
        purchases_count: user.purchases_count,
        is_subscribed: !user.is_subscribed,
        user_type: user.user_type,
        order_histroy: user.order_histroy,
      };
      state.users[index]  = user_new
    }
  },
});

export const {completeUserBooking, activateUserSubscription} = usersSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.users.value)`
export const selectUsers = (state:any) => state.users.users;
export const selectUser = (state:any, id:number) => state.users.users.find((user:any)=> user.id===id);

export default usersSlice.reducer;
