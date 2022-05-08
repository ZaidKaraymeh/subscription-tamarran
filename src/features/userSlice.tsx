import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import {RootState} from '../app/store';
import { Booking, BookingAction, OrderHistory, Sales, SubscribeAction, User, VendorSettings, VendorSettingsAction } from '../types';
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
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed semper at eros vel malesuada. Integer facilisis eget felis eu dictum. Nulla facilisi. Interdum et malesuada fames ac ante ipsum primis in faucibus. Praesent et eros tincidunt, laoreet sapien id, vestibulum enim. Nulla nibh libero, eleifend id dapibus et, facilisis in dolor. Maecenas bibendum felis in nunc finibus pellentesque. Cras augue massa, blandit vitae vehicula sollicitudin, consequat at tortor. Integer nunc purus, ultrices ac magna sit amet, pellentesque efficitur turpis. Praesent lacus orci, semper vitae diam sed, dignissim bibendum turpis. Maecenas varius tempor viverra. Etiam interdum tristique diam vitae dapibus. Nunc eu neque vitae turpis sagittis imperdiet et sit amet dolor."
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
      description: "Sed vel nisl sed justo euismod scelerisque vel eget orci. Vestibulum felis risus, iaculis vitae magna a, fringilla iaculis velit. Nunc facilisis vitae purus vitae bibendum. Curabitur id mollis ipsum. Donec dictum justo at magna condimentum sollicitudin. Ut ornare tincidunt molestie. Vivamus elementum nunc porttitor nisl suscipit facilisis. Sed accumsan dolor sed eros facilisis imperdiet. Praesent ac malesuada libero, quis ullamcorper justo. Vestibulum odio odio, sodales ut suscipit vitae, condimentum nec urna. Praesent vel suscipit sem. Nunc in convallis eros. Morbi quam est, elementum a turpis nec, mattis congue libero."
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
      description: "Phasellus auctor, enim non aliquam feugiat, arcu ipsum porta nisi, a cursus nunc velit quis arcu. Quisque lacinia aliquet enim, ut lobortis justo tempor vitae. Donec ullamcorper erat non diam hendrerit, nec pellentesque ligula tempus. Morbi in odio vitae quam imperdiet mattis. Donec vel arcu a purus mollis placerat. Vivamus suscipit elit nec sagittis varius. Lorem ipsum dolor sit amet, consectetur adipiscing elit.Phasellus auctor, enim non aliquam feugiat, arcu ipsum porta nisi, a cursus nunc velit quis arcu. Quisque lacinia aliquet enim, ut lobortis justo tempor vitae. Donec ullamcorper erat non diam hendrerit, nec pellentesque ligula tempus. Morbi in odio vitae quam imperdiet mattis. Donec vel arcu a purus mollis placerat. Vivamus suscipit elit nec sagittis varius. Lorem ipsum dolor sit amet, consectetur adipiscing elit."
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
      description: "Nam vehicula mauris tincidunt eros congue, a dapibus arcu tempor. Fusce luctus nisi dui, non convallis arcu porta ut. Morbi in viverra eros. Maecenas lacinia purus risus, id aliquet lacus feugiat quis. Maecenas ac leo vel dolor ullamcorper feugiat. Nam facilisis odio vel diam interdum feugiat. Aliquam mattis malesuada dolor non rhoncus. Nullam sodales diam eget lacinia porta. Nulla pretium lorem ante, vitae rhoncus nulla pulvinar quis."
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
      vendor_bookings_id: [1, 2, 4],
      vendor_settings: {is_member: false, all_access: false, max_access: '5'},
    },
    {
      id: 2,
      username: 'Ahmed Muhammed',
      email: 'ahmedmuhammad@gmail.com',
      is_subscribed: false,
      purchases_count: 0,
      order_histroy: [],
      user_type: 'customer',
      vendor_bookings_id: [],
      vendor_settings: {is_member: false, all_access: false, max_access: '5'},
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
      vendor_bookings_id: [3],
      vendor_settings: {is_member: false, all_access: false, max_access: '5'},
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
      console.log(action.payload)
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
        ...user,
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
        ...vendor_user,
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
      console.log("STATE USER", state.users[index])
      state.users[vendor_user_index] = vendor_user_new
    },
    
    activateUserSubscription: (state, action: PayloadAction<SubscribeAction>) => {
      const {user} = action.payload;
      const index = state.users.findIndex(x => x.id == user.id)
      const user_new: User = {
        ...user,
        id: user.id,
        username: user.username,
        email: user.email,
        purchases_count: user.purchases_count,
        is_subscribed: !user.is_subscribed,
        user_type: user.user_type,
        order_histroy: user.order_histroy,
      };
      state.users[index]  = user_new
    },

    saveVendorSettings: (state, action: PayloadAction<VendorSettingsAction>) => {
      // console.log("ACTION ", action.payload)
      const {user} = action.payload
      const new_vendor_settings: VendorSettings = {
        is_member: action.payload.is_member,
        all_access: action.payload.all_access,
        max_access: action.payload.max_access,
      }; 
      const index = state.users.findIndex((x) => x.id == user.id);
      state.users[index].vendor_settings = new_vendor_settings
    }

  },
});

export const {completeUserBooking, activateUserSubscription, saveVendorSettings} = usersSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.users.value)`
export const selectUsers = (state:any) => state.users.users;
export const selectUser = (state:any, id:number) => state.users.users.find((user:any)=> user.id===id);

export default usersSlice.reducer;
