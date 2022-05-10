import {
  Image,
  ImageBackground,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { Fragment } from 'react';
import SubscribeScreen from './SubscribeScreen';
import {SafeAreaView} from 'react-native-safe-area-context';
import tw from 'twrnc';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {bookings} from '../features/userSlice';
import {RootStackParamList, User} from '../types'
import { getUserById, getVendorBookings } from '../features/userUtilities';

import { subscribeScreenProp, detailScreenProp, menuScreenProp } from '../types'

type Props = {};



const HomeScreen = ({route, navigation}: any) => {
  const { user }: { user : User }  = route.params;
  const user_new: User = getUserById(user.id)
  const navigateSubscribe = useNavigation<subscribeScreenProp>();
  const navigateDetails = useNavigation<detailScreenProp>();
  const navigateMenu = useNavigation<menuScreenProp>();
  
  let vendor_bookings = []

  if (user_new.user_type == "vendor"){
    vendor_bookings = getVendorBookings(user_new);
  }

  // console.log(vendor_bookings)

  return (
    <Fragment>
      <View
        style={[
          tw`flex-row h-75px mb-2`,
          {
            backgroundColor: '#1BBC31',
            shadowColor: 'black',
            shadowOpacity: 0.31,
            shadowOffset: {width: 0, height: 2},
            shadowRadius: 12,
            elevation: 25,
          },
        ]}>
        <View style={tw` flex-1 h-75px justify-center items-center`}>
          <TouchableOpacity
            onPress={() =>
              navigateSubscribe.navigate('Subscribe', {user: user_new})
            }>
            <Text
              style={tw`text-white`}
              onPress={() => navigateMenu.navigate('Menu', {user: user_new})}>
              Menu
            </Text>
          </TouchableOpacity>
        </View>
        <View style={tw` flex-3 h-75px justify-center items-center`}>
          <View
            style={tw`bg-white h-38px  w-65 rounded-2xl  justify-center px-2`}>
            <Text style={tw`opacity-70`}>Try "Gym"</Text>
          </View>
        </View>
        {/* <View style={tw` flex-1 h-75px justify-center items-center`}>
          <Text>
            {' '}
            {user.user_type} {'\n'} id:{user.id}{' '}
          </Text>
        </View> */}
      </View>

      <ScrollView style={[tw`flex-1 bg-white`]}>
        {user_new.user_type == 'customer' ? (
          bookings.bookings.map((booking) => {
            return (
              <TouchableOpacity
                key={booking.id}
                style={[
                  tw`border-0 mb-3 mx-3 rounded-xl`,
                  {
                    shadowColor: 'black',
                    shadowOpacity: 0.26,
                    shadowOffset: {width: 0, height: 2},
                    shadowRadius: 10,
                    elevation: 4,
                    backgroundColor: 'white',
                  },
                ]}
                onPress={() =>
                  navigateDetails.navigate('Details', {
                    booking_id: booking.id,
                    user: user_new,
                  })
                }>
                <ImageBackground
                  source={{
                    uri: `https://picsum.photos/id/105${booking.id}/1000/1000`,
                  }}
                  style={tw`h-150px p-2 justify-end`}
                  imageStyle={{borderRadius: 10}}></ImageBackground>
                <View style={tw`p-2`}>
                  <Text style={tw`text-lg`}>
                    {booking.vendor_name} - {booking.location}
                  </Text>
                  <Text
                    style={tw`text-2xl font-bold text-yellow-600 p-0 m-0  `}>
                    {Array.from(Array(booking.stars), (e, i) => {
                      return '* ';
                    })}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })
        ) : (
          <Fragment>
            <Text style={tw`text-xl text-center my-3`}>
              My Venues & Activities
            </Text>
            {vendor_bookings.map((booking) => {
              return (
                <TouchableOpacity
                  key={booking.id}
                  style={[
                    tw`border-0 mb-3 mx-3 rounded-xl`,
                    {
                      shadowColor: 'black',
                      shadowOpacity: 0.26,
                      shadowOffset: {width: 0, height: 2},
                      shadowRadius: 10,
                      elevation: 4,
                      backgroundColor: 'white',
                    },
                  ]}
                  onPress={() =>
                    navigateDetails.navigate('Details', {
                      booking_id: booking.id,
                      user: user_new,
                    })
                  }>
                  <ImageBackground
                    source={{
                      uri: `https://picsum.photos/id/105${booking.id}/1000/1000`,
                    }}
                    style={tw`h-150px p-2 justify-end`}
                    imageStyle={{borderRadius: 10}}></ImageBackground>
                  <View style={tw`p-2`}>
                    <Text style={tw`text-lg`}>
                      {booking.vendor_name} - {booking.location}
                    </Text>
                    <Text
                      style={tw`text-2xl font-bold text-yellow-600 p-0 m-0  `}>
                      {Array.from(Array(booking.stars), (e, i) => {
                        return '* ';
                      })}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </Fragment>
        )}

        {/* <TouchableOpacity 
        onPress={() => navigate.navigate("Subscribe")}
        style={tw`bg-green-600 rounded-2xl my-5 mx-5`}>
        <Text style={tw`text-xl p-4 my-2 text-white text-center`}>
          Become a Tamarran Pro Member
        </Text>
      </TouchableOpacity> */}
      </ScrollView>
    </Fragment>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
