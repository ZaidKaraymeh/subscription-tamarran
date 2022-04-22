import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import {RootState} from '../app/store';
import { Booking, BookingAction, OrderHistory, Sales, SubscribeAction, User } from '../types';
import { getUserById } from './userUtilities';

// interface CounterState {
//   value: number;
//   status: 'idle' | 'loading' | 'failed';
// }

interface BookingsInterface {
  bookings: Booking[];
}

export const bookings: BookingsInterface = {
  bookings: [
    {
      id: 1,
      vendor_user_id: 1,
      vendor_name: 'Busaiteen Gym',
      price: 25,
      member_price: 15,
      stars: 5,
      location: 'Busaiteen',
      timing: 'None',
    },
    {
      id: 2,
      vendor_user_id: 1,
      vendor_name: 'CrossFit',
      price: 35,
      member_price: 20,
      stars: 3,
      location: 'Riffa',
      timing: '8:00-9:30',
    },
    {
      id: 3,
      vendor_name: 'Batelco Gym',
      vendor_user_id: 3,
      price: 15,
      member_price: 5,
      stars: 4,
      location: 'Hamala',
      timing: 'None',
    },
    {
      id: 4,
      vendor_user_id: 1,
      vendor_name: 'Personal Trainer',
      price: 55,
      member_price: 37,
      stars: 4,
      location: 'Manama',
      timing: '12:00-13:30',
    },
  ],
}; 


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
      sales: [],
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
    {
      id: 3,
      username: 'Saeed Ali',
      email: 'saeedali@gmail.com',
      is_subscribed: false,
      purchases_count: 0,
      order_histroy: [],
      user_type: 'vendor',
      sales: [],
    },
  ],
};

// const initialState: CounterState = {
//   value: 0,
//   status: 'idle',
// };




export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    completeUserBooking: (state, action: PayloadAction<BookingAction>) => {
      const {user, booking} = action.payload;
      const index = state.users.findIndex(x => x.id == user.id)
      const id = Math.floor(Math.random() * 9999999);
      const order: OrderHistory = {
        id: id,
        vendor_name: booking.vendor_name,
        price: user.is_subscribed && user.purchases_count <= 4 ? booking.member_price : booking.price,
        user_id: user.id,
        is_user_subscribed: user.is_subscribed,
        timing: booking.timing
      }
      const user_new: User = {
        id: user.id,
        username: user.username,
        email: user.email,
        purchases_count: user.is_subscribed ? user.purchases_count + 1 : user.purchases_count,
        is_subscribed: user.is_subscribed,
        user_type: user.user_type,
        
        order_histroy: [order, ...user.order_histroy],
        
      };
      const vendor_user_index = state.users.findIndex(x => x.id == booking.vendor_user_id)
      const vendor_user = state.users.find(x => x.id == booking.vendor_user_id)!
      const sale : Sales = {
        id: id,
        vendor_name: booking.vendor_name,
        price: user.is_subscribed && user.purchases_count <= 4 ? booking.member_price : booking.price,
        user_id: user.id,
        timing: booking.timing
      }
      const vendor_user_new: User = {
        id: vendor_user.id,
        username: vendor_user.username,
        email: vendor_user.email,
        purchases_count: vendor_user.purchases_count,
        is_subscribed: vendor_user.is_subscribed,
        user_type: vendor_user.user_type,
        order_histroy: vendor_user.order_histroy,
        sales: [sale, ...vendor_user.sales!]
      }
      const booking_instance = bookings.bookings.find(
        (x) => x.vendor_name == order.vendor_name,
      );
      state.users[index]  = user_new
      state.users[vendor_user_index] = vendor_user_new
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
