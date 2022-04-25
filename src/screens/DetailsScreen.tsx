import {Alert, StyleSheet, Text, TouchableOpacity, View, Image, ScrollView, ImageBackground} from 'react-native';
import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {bookings, completeUserBooking, selectUsers} from '../features/userSlice';
import tw from 'twrnc'
import { getUserById } from '../features/userUtilities';
import QRCode from 'react-native-qrcode-svg';

import {QRCodeType, User} from '../types';
import Header from '../components/Header';



export const getBookingById = (id: number) => {
  return bookings.bookings.find((booking) => booking.id === id);
};

const DetailsScreen = ({route, navigation}: any) => {
  const {booking_id, user} = route.params;
  const booking = getBookingById(booking_id)!;
  const vendor: User = getUserById(booking.vendor_user_id)

  const dispatch = useDispatch()


  return (
    <View style={[tw`flex-1 bg-white`, {backgroundColor: '#F7ECDE'}]}>
      <Header route={route} navigation={navigation} />
      <ScrollView style={tw``}>
        <View style={tw`flex-1`}>
          <View
            style={[
              tw`h-100 justify-center items-center`,
              {backgroundColor: '#F7ECDE'},
            ]}>
            <View
              style={[
                tw`h-80 w-60 border rounded-3xl`,
                {backgroundColor: '#54BAB9'},
              ]}>
              {/* <ImageBackground
                source={{
                  uri: `https://picsum.photos/id/105${booking.id}/550/745`,
                }}
                style={[tw`h-80 rounded-3xl`, {borderRadius: 60}]}
                resizeMode="contain"
                
                imageStyle={{borderRadius: 10}}></ImageBackground> */}
            </View>
          </View>
        </View>
        <View
          style={[
            tw`px-5, pt-7`,
            {backgroundColor: '#FBF8F1', borderRadius: 40},
          ]}>
          <Text style={tw`text-2xl font-bold text-center`}>
            {booking?.vendor_name}
          </Text>
          <Text style={tw`text-xl opacity-60 text-center mt-1 text-black`}>
            {booking.location}
          </Text>
          <Text style={tw`text-2xl font-bold text-yellow-600 text-center mt-2`}>
            {Array.from(Array(booking.stars), (e, i) => {
              return '* ';
            })}
          </Text>
          {vendor.vendor_settings?.is_member ? (
            <Fragment>
              {user.is_subscribed ? (
                <Fragment>
                  <View style={tw`flex-row mt-5`}>
                    <Text style={tw`text-lg flex-1  text-black text-center`}>
                      BHD {booking.member_price}
                    </Text>
                    <Text
                      style={tw`text-lg flex-1 w-50 text-black opacity-60 text-center`}>
                      Timing:{' '}
                      {booking.timing == 'None' ? '24/7' : booking.timing}
                    </Text>
                  </View>
                  {!vendor.vendor_settings?.all_access && (
                    <Text style={tw`font-bold text-xl`}>
                      Timing: {booking.timing}
                    </Text>
                  )}
                  <View style={tw`items-center`}>
                    <Text style={tw`text-lg text-center pt-4`}>
                      Subscription Active and benefits are applied automatically
                      for online bookings, show this QR Code to vendor for out
                      of app bookings with subscription benefits.
                    </Text>
                    {/* <Image style={tw`h-50 w-50`} source={require(`./qrcode.png`)} /> */}
                    <View style={tw`border p-5 my-3`}>
                      <QRCode
                        value={`https://picsum.photos/id/104${booking_id}/500/500`}
                        size={220}
                      />
                    </View>
                  </View>
                </Fragment>
              ) : (
                <Fragment>
                  <View style={tw`flex-row mt-5`}>
                    <Text style={tw`text-lg flex-1  text-black text-center`}>
                      ${booking.price}
                    </Text>
                    <Text
                      style={tw`text-lg flex-1 w-50 text-black opacity-60 text-center`}>
                      Timing:{' '}
                      {booking.timing == 'None' ? '24/7' : booking.timing}
                    </Text>
                  </View>
                  <Text>Not Subscribed</Text>
                </Fragment>
              )}
            </Fragment>
          ) : (
            <Fragment>
              <View style={tw`flex-row mt-5`}>
                <Text
                  style={tw`text-lg font-bold flex-1 opacity-70 text-black text-center`}>
                  BHD{booking.price}
                </Text>
                <Text
                  style={tw`text-lg font-bold flex-1 w-50 text-black opacity-70 text-center`}>
                  Timing:{' '}
                  {booking.timing == 'None' ? '24/7' : booking.timing}
                </Text>
              </View>
            </Fragment>
          )}
          <Text style={tw`mb-2 text-lg font-bold mt-10`}>Description</Text>
          <Text style={tw`mb-2 text-base`}>{booking.description}</Text>
          <View style={[tw`my-2`]}>
            <TouchableOpacity
              onPress={() => {
                dispatch(completeUserBooking({user: user, booking: booking}));
                Alert.alert('Booking Successful!', '', [
                  {
                    text: 'OK',
                    onPress: () => navigation.navigate('Home'),
                  },
                ]);
              }}>
              <View
                style={[
                  tw`h-80px rounded-2xl items-center justify-center`,
                  {backgroundColor: '#54BAB9'},
                ]}>
                <Text style={tw`font-bold text-2xl text-white `}>Book Now</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        {/* <TouchableOpacity
          onPress={() => {
            dispatch(completeUserBooking({user: user, booking: booking}));
            Alert.alert('Booking Successful!', '', [
              {
                text: 'OK',
                onPress: () =>
                  navigation.navigate('OrderHistory', {
                    user_id: user.id,
                  }),
              },
            ]);
          }}
          style={tw`items-center justify-center bg-green-700 h-50px rounded-2xl border`}>
          <Text style={tw`text-white font-bold text-xl`}>Book Now</Text>
        </TouchableOpacity> */}
      </ScrollView>
    </View>
  );
};

export default DetailsScreen;

const styles = StyleSheet.create({});
