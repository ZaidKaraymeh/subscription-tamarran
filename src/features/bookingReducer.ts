import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {useSelector} from 'react-redux';
import {RootState} from '../app/store';
import {
  Booking,
  BookingAction,
  OrderHistory,
  Sales,
  SubscribeAction,
  User,
  VendorSettings,
  VendorSettingsAction,
  VenueSettings,
  VenueSettingsAction,
  BookingsInterface,
} from '../types';
import {getUserById} from './userUtilities';

export const initialState: BookingsInterface = {
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
      booking_settings: {
        max_access: "-1",
        all_access: false,
        is_member: false,
      },
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed semper at eros vel malesuada. Integer facilisis eget felis eu dictum. Nulla facilisi. Interdum et malesuada fames ac ante ipsum primis in faucibus. Praesent et eros tincidunt, laoreet sapien id, vestibulum enim. Nulla nibh libero, eleifend id dapibus et, facilisis in dolor. Maecenas bibendum felis in nunc finibus pellentesque. Cras augue massa, blandit vitae vehicula sollicitudin, consequat at tortor. Integer nunc purus, ultrices ac magna sit amet, pellentesque efficitur turpis. Praesent lacus orci, semper vitae diam sed, dignissim bibendum turpis. Maecenas varius tempor viverra. Etiam interdum tristique diam vitae dapibus. Nunc eu neque vitae turpis sagittis imperdiet et sit amet dolor.',
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
      booking_settings: {
        max_access: "3",
        all_access: false,
        is_member: false,
      },
      description:
        'Sed vel nisl sed justo euismod scelerisque vel eget orci. Vestibulum felis risus, iaculis vitae magna a, fringilla iaculis velit. Nunc facilisis vitae purus vitae bibendum. Curabitur id mollis ipsum. Donec dictum justo at magna condimentum sollicitudin. Ut ornare tincidunt molestie. Vivamus elementum nunc porttitor nisl suscipit facilisis. Sed accumsan dolor sed eros facilisis imperdiet. Praesent ac malesuada libero, quis ullamcorper justo. Vestibulum odio odio, sodales ut suscipit vitae, condimentum nec urna. Praesent vel suscipit sem. Nunc in convallis eros. Morbi quam est, elementum a turpis nec, mattis congue libero.',
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
      booking_settings: {
        max_access: "-1",
        all_access: false,
        is_member: false,
      },
      description:
        'Phasellus auctor, enim non aliquam feugiat, arcu ipsum porta nisi, a cursus nunc velit quis arcu. Quisque lacinia aliquet enim, ut lobortis justo tempor vitae. Donec ullamcorper erat non diam hendrerit, nec pellentesque ligula tempus. Morbi in odio vitae quam imperdiet mattis. Donec vel arcu a purus mollis placerat. Vivamus suscipit elit nec sagittis varius. Lorem ipsum dolor sit amet, consectetur adipiscing elit.Phasellus auctor, enim non aliquam feugiat, arcu ipsum porta nisi, a cursus nunc velit quis arcu. Quisque lacinia aliquet enim, ut lobortis justo tempor vitae. Donec ullamcorper erat non diam hendrerit, nec pellentesque ligula tempus. Morbi in odio vitae quam imperdiet mattis. Donec vel arcu a purus mollis placerat. Vivamus suscipit elit nec sagittis varius. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
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
      booking_settings: {
        max_access: "2",
        all_access: false,
        is_member: false,
      },
      description:
        'Nam vehicula mauris tincidunt eros congue, a dapibus arcu tempor. Fusce luctus nisi dui, non convallis arcu porta ut. Morbi in viverra eros. Maecenas lacinia purus risus, id aliquet lacus feugiat quis. Maecenas ac leo vel dolor ullamcorper feugiat. Nam facilisis odio vel diam interdum feugiat. Aliquam mattis malesuada dolor non rhoncus. Nullam sodales diam eget lacinia porta. Nulla pretium lorem ante, vitae rhoncus nulla pulvinar quis.',
    },
  ],
};

export const bookingSlice = createSlice({
  name: 'bookings',
  initialState,
  reducers: {
    saveVenueSettings: (state, action: PayloadAction<VenueSettingsAction>) => {
      console.log("ACTION ", action.payload)
      const {user, booking, venue_settings} = action.payload;
      const new_booking: Booking = {
        ...booking,
        booking_settings: venue_settings,
      };
      const index = state.bookings.findIndex((x) => x.id == booking.id);
      console.log('BEFORE', state.bookings[index]);
      state.bookings[index] = new_booking;
      console.log('AFTER', state.bookings[index]);
    },
  },
});

export const {saveVenueSettings} =
  bookingSlice.actions;

export const selectBookings = (state: any) => state.bookings.bookings;

export default bookingSlice.reducer;