import {Alert, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {bookings} from './HomeScreen';
import { useDispatch, useSelector } from 'react-redux';
import {completeUserBooking, selectUsers} from './features/userSlice';
import { getUserById } from './ProfileScreen';
import tw from 'twrnc'

export const getBookingById = (id: number) => {
  return bookings.bookings.find((booking) => booking.id === id);
};

const DetailsScreen = ({route, navigation}: any) => {
  const {booking_id, user_id} = route.params;
  const booking = getBookingById(booking_id)!;
  const users = useSelector(selectUsers)
  const user = getUserById(user_id, users)

  const dispatch = useDispatch()

  return (
    <View style={tw`flex-1 mx-2 my-1`}>
      <Text style={tw`font-bold text-xl`}>
        {booking?.vendor_name}
      </Text>
      <Text style={tw`font-bold text-xl`}>
        BHD{user.is_subscribed ? booking?.member_price : booking?.price}
      </Text>
      <TouchableOpacity
        onPress={
          () => {
            dispatch(completeUserBooking({user: user, booking: booking}));
            Alert.alert('Booking Successful!', '', [
              {text: 'OK', onPress: () => navigation.navigate("Account", {user_id:user.id}) },
            ]);
          }
        }
        style={tw`items-center justify-center bg-green-700 h-50px rounded-2xl border`}>
        <Text style={tw`text-white font-bold text-xl`}>Book Now</Text>
      </TouchableOpacity>
    </View>
  );
};

export default DetailsScreen;

const styles = StyleSheet.create({});
