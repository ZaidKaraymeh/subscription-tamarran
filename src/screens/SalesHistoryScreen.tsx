import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {Fragment} from 'react';
import {Booking, OrderHistory, Sales, selectUsers, User} from '../features/userSlice';
import {useSelector} from 'react-redux';
import tw from 'twrnc';
import {getUserById} from '../features/userUtilities';
type Props = {};

const SalesHistoryScreen = ({route, navigation}: any) => {
  const {user_id} = route.params;
  const vendor: User = getUserById(user_id);
  return (
    <ScrollView>
      <Text style={tw` text-xl bg-white`}>Sales History:</Text>
      {vendor.sales!.map((booking: Sales) => {
        return (
          <View key={booking.id} style={tw`bg-white border-t border-b my-2`}>
            <Text style={tw`ml-2 text-lg`}> Order ID: {booking.id}</Text>
            <Text style={tw`ml-2 text-lg`}> Vendor: {booking.vendor_name}</Text>
            <Text style={tw`ml-2 text-lg`}> Price: BHD{booking.price}</Text>
            <Text style={tw`ml-2 text-lg`}>
              {' '}
              User: {getUserById(booking.user_id).username}
            </Text>
            <Text style={tw`ml-2 text-lg`}>
              {' '}
              User Subscribed: {getUserById(booking.user_id).is_subscribed ? "Yes" : "No"}
            </Text>
            {booking.timing != "None" ? (
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

export default SalesHistoryScreen;

const styles = StyleSheet.create({});
