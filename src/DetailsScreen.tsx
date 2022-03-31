import {Alert, StyleSheet, Text, TouchableOpacity, View, Image} from 'react-native';
import React, { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {bookings, completeUserBooking, selectUsers, User} from './features/userSlice';
import tw from 'twrnc'
import { getUserById } from './features/userUtilities';

export const getBookingById = (id: number) => {
  return bookings.bookings.find((booking) => booking.id === id);
};

const DetailsScreen = ({route, navigation}: any) => {
  const {booking_id, user_id} = route.params;
  const booking = getBookingById(booking_id)!;
  const user: User = getUserById(user_id)

  const dispatch = useDispatch()

  return (
    <View style={tw`flex-1 px-2 py-1 bg-white  `}>
      <Text style={tw`font-bold text-xl`}>{booking?.vendor_name}</Text>
      <Text style={tw`font-bold text-xl`}>
        BHD
        {user.is_subscribed && user.purchases_count <= 4
          ? booking?.member_price
          : booking?.price}
      </Text>
      <Text style={tw`font-bold text-xl`}>
        Timing:  
        {booking.timing != "None" 
          ? booking.timing
          : "N/A"}
      </Text>

      {booking.timing == 'None' && user.is_subscribed ? (
        <Text style={tw`h-0 w-0 p-0 m-0`}></Text>
      ) : (
        <TouchableOpacity
          onPress={() => {
            dispatch(completeUserBooking({user: user, booking: booking}));
            Alert.alert('Booking Successful!', '', [
              {
                text: 'OK',
                onPress: () =>
                  navigation.navigate('OrderHistory', {user_id: user.id}),
              },
            ]);
          }}
          style={tw`items-center justify-center bg-green-700 h-50px rounded-2xl border`}>
          <Text style={tw`text-white font-bold text-xl`}>Book Now</Text>
        </TouchableOpacity>
      )}

      {/* <Text style={tw`font-bold text-xl text-center`}>
        {user.is_subscribed && user.purchases_count <= 4
          ? 'Subscription Benefits Applied Automatically!'
          : ''}
      </Text> */}

      <View style={tw`items-center`}>
        {user.is_subscribed  ? (
          <Fragment>
            <Text style={tw`text-lg text-center pt-4`}>
              Subscription Active and benefits are applied automatically for online bookings, show this QR Code to vendor for out of app bookings with subscription benefits.
            </Text>
            <Image style={tw`h-50 w-50`} source={require('./qrcode.png')} />
          </Fragment>
        ) : (
          <Text style={tw`h-0 w-0 p-0 m-0`}></Text>
        )}
      </View>
    </View>
  );
};

export default DetailsScreen;

const styles = StyleSheet.create({});
