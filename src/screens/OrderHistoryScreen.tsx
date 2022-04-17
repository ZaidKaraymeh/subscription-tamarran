import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { Fragment } from 'react'
import { Booking, OrderHistory, selectUsers } from '../features/userSlice';
import tw from 'twrnc'
import { getUserById } from '../features/userUtilities';
type Props = {}

const OrderHistoryScreen = ({route, navigation}: any) => {
  const {user_id} = route.params
  const user = getUserById(user_id)
  return (
    <ScrollView>
      <Text style={tw` text-xl bg-white`}>Booking History:</Text>
      {user.order_histroy.map((booking: OrderHistory) => {
        return (
          <View key={booking.id} style={tw`bg-white border-t border-b my-2`} >
            <Text style={tw`ml-2 text-lg`}>
              {" "}Order ID: {booking.id}
            </Text>
            <Text style={tw`ml-2 text-lg`}>
              {" "}Vendor: {booking.vendor_name}
            </Text>
            <Text style={tw`ml-2 text-lg`}>
              {" "}Price: BHD{booking.price}
            </Text>
            {booking.timing != "None" ?
              <Text style={tw`ml-2 text-lg`}>
                {" "}Timing: {booking.timing}
              </Text>
              :
              <Text style={tw`ml-2 text-lg`}>
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