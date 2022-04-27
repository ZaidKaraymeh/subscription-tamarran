import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { Fragment } from 'react'
import {selectUsers } from '../features/userSlice';
import tw from 'twrnc'
import { getUserById } from '../features/userUtilities';
import { OrderHistory } from '../types';
import Header from '../components/Header';
type Props = {}

const OrderHistoryScreen = ({route, navigation}: any) => {
  const {user} = route.params
  return (
    <ScrollView style={tw`bg-white`} >
      <Header route={route} navigation={navigation} />
      <Text style={tw` text-xl`}>Booking History:</Text>
      {user.order_histroy.map((booking: OrderHistory) => {
        return (
          <View key={booking.id} style={tw`bg-white border-t border-b my-2`}>
            <Text style={tw`ml-2 text-lg`}> Order ID: {booking.id}</Text>
            <Text style={tw`ml-2 text-lg`}> Vendor: {booking.vendor_name}</Text>
            <Text style={tw`ml-2 text-lg`}> Price: BHD{booking.price}</Text>
            {booking.timing != 'None' ? (
              <Text style={tw`ml-2 text-lg`}> Timing: {booking.timing}</Text>
            ) : (
              <Text style={tw`ml-2 text-lg`}> Timing: N/A</Text>
            )}
          </View>
        );
      })}
    </ScrollView>
  );
};

export default OrderHistoryScreen

const styles = StyleSheet.create({})