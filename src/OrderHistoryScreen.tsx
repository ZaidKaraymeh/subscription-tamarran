import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { Fragment } from 'react'
import { Booking, getUserById, OrderHistory, selectUsers } from './features/userSlice';
import { useSelector } from 'react-redux';
import tw from 'twrnc'
type Props = {}

const OrderHistoryScreen = ({route, navigation}: any) => {
  const {user_id} = route.params
  const users = useSelector(selectUsers)
  const user = getUserById(user_id)
  return (
    <ScrollView>
      <Text style={tw` text-xl bg-white`}>Booking History:</Text>
      {user.order_histroy.map((booking: OrderHistory) => {
        return (
          <View key={booking.id} style={tw`bg-white border-t border-b my-2`} >
            <Text style={tw`ml-2 text-lg`} key={booking.id}>
              {" "}Order ID: {booking.id}
            </Text>
            <Text style={tw`ml-2 text-lg`} key={booking.id}>
              {" "}Vendor: {booking.vendor_name}
            </Text>
            <Text style={tw`ml-2 text-lg`} key={booking.id}>
              {" "}Price: BHD{booking.price}
            </Text>
            {booking.timing?
              <Text style={tw`ml-2 text-lg`} key={booking.id}>
                {" "}Timing: {booking.timing}
              </Text>
              :
              <Text style={tw`ml-2 text-lg`} key={booking.id}>
                {" "}Timing: N/A
              </Text>

            }

          </View>
        );
      })}
    </ScrollView>
  );
};

export default OrderHistoryScreen

const styles = StyleSheet.create({})