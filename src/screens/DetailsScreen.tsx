import {Alert, StyleSheet, Text, TouchableOpacity, View, Image, ScrollView, ImageBackground} from 'react-native';
import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {completeUserBooking, selectUsers} from '../features/userSlice';
import tw from 'twrnc'
import { getBookingById, getUserById, getUserProAccessLeft } from '../features/userUtilities';
import QRCode from 'react-native-qrcode-svg';

import {QRCodeType, User} from '../types';
import Header from '../components/Header';





const DetailsScreen = ({route, navigation}: any) => {
  const {booking_id, user} = route.params;
  const booking = getBookingById(booking_id)!;
  const vendor: User = getUserById(booking.vendor_user_id)
  const user_new = getUserById(user.id)
  const dispatch = useDispatch()
  const access_left = getUserProAccessLeft(user_new, booking)

  return (
    <View style={[tw`flex-1 bg-white`]}>
      <Header route={route} navigation={navigation} />
      <ScrollView style={tw``}>
        <View style={tw`flex-1`}>
          <View style={[tw`h-100 justify-center items-center`]}>
            {/* <View
              style={[
                tw`h-80 w-60 border rounded-3xl`,
                {backgroundColor: '#54BAB9'},
              ]}> */}
            <ImageBackground
              source={{
                uri: `https://picsum.photos/id/105${booking.id}/600/600`,
              }}
              style={[tw`h-100 w-100 rounded-3xl`, {borderRadius: 60}]}
              imageStyle={{borderRadius: 10}}></ImageBackground>
            {/* </View> */}
          </View>
        </View>
        <View style={[tw`px-5, pt-7`, {borderRadius: 40}]}>
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
          {booking.booking_settings.is_member ? (
            <Fragment>
              {user_new.is_subscribed && access_left > 0 ? (
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
                  {/* {!vendor.vendor_settings?.all_access && (
                    <Text style={tw`font-bold text-xl`}>
                      Timing: {booking.timing}
                    </Text>
                  )} */}
                  <View style={tw`items-center`}>
                    {booking.booking_settings.max_access == '-1' ?
                      <Text style={tw`text-lg  text-black text-center mt-3`}>
                        Max Access - Unlimited
                      </Text>
                      :
                      <Fragment>
                        <Text style={tw`text-lg  text-black text-center mt-3`}>
                          Access Left - {access_left}
                        </Text>
                        <Text style={tw`text-lg  text-black text-center`}>
                          Max Access -{' '}
                            {booking.booking_settings.max_access}
                        </Text>
                      </Fragment>
                    }
                    {/* {vendor.vendor_settings.all_access ?
                        <Fragment>
                          <Text style={tw`text-lg  text-black text-center`}>
                            Access Left - {access_left}
                          </Text>
                          <Text style={tw`text-lg  text-black text-center`}>
                            Max Access - {booking.max_access}
                          </Text>
                        </Fragment>
                        :
                        <Fragment></Fragment>
                    } */}
                    <Text style={tw`text-lg text-center pt-4 text-black`}>
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
                      BHD {booking.price}
                    </Text>
                    <Text
                      style={tw`text-lg flex-1 w-50 text-black opacity-60 text-center`}>
                      Timing:{' '}
                      {booking.timing == 'None' ? '24/7' : booking.timing}
                    </Text>
                  </View>
                  {/* <Text style={tw`text-lg  text-black text-center`}>
                    Not Subscribed
                  </Text> */}
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
                  Timing: {booking.timing == 'None' ? '24/7' : booking.timing}
                </Text>
              </View>
            </Fragment>
          )}
          <Text style={tw`mb-2 text-lg font-bold mt-10`}>Description</Text>
          <Text style={tw`mb-2 text-base`}>{booking.description}</Text>
          <View style={[tw`my-2`]}>
            <TouchableOpacity
              onPress={() => {
                dispatch(
                  completeUserBooking({user: user_new, booking: booking, access_left}),
                );
                Alert.alert('Booking Successful!', '', [
                  {
                    text: 'OK',
                    onPress: () =>
                      navigation.navigate('Home', {user: user_new}),
                  },
                ]);
              }}>
              <View
                style={[
                  tw`h-80px rounded-2xl items-center justify-center`,
                  {backgroundColor: '#231f20'},
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
