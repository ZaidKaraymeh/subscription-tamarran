import {ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {Fragment} from 'react';
import { selectUsers} from '../features/userSlice';
import {useSelector} from 'react-redux';
import tw from 'twrnc';
import {getUserById} from '../features/userUtilities';
import { Sales, User } from '../types';
import Header from '../components/Header';
type Props = {};

const SalesHistoryScreen = ({route, navigation}: any) => {
  const {user_id} = route.params;
  const vendor: User = getUserById(user_id);
  return (
    <ScrollView style={[tw`flex-1`, {backgroundColor: '#FBF8F1'}]}>
      <Header route={route} navigation={navigation} />
      <View style={tw`mx-2`} >
        <Text style={tw` text-xl `}>Sales History:</Text>
        {vendor.sales!.map((booking: Sales) => {
          return (
            <View key={booking.id} style={tw`bg-white border-t border-b my-2`}>
              <Text style={tw`text-lg`}> Order ID: {booking.id}</Text>
              <Text style={tw`text-lg`}> Vendor: {booking.vendor_name}</Text>
              <Text style={tw`text-lg`}> Price: BHD{booking.price}</Text>
              <Text style={tw`text-lg`}>
                {' '}
                User: {getUserById(booking.user_id).username}
              </Text>
              <Text style={tw`text-lg`}>
                {' '}
                User Subscribed:{' '}
                {getUserById(booking.user_id).is_subscribed ? 'Yes' : 'No'}
              </Text>
              {booking.timing != 'None' ? (
                <Text style={tw` text-lg`}> Timing: {booking.timing}</Text>
              ) : (
                <Text style={tw` text-lg`}> Timing: N/A</Text>
              )}
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
};

export default SalesHistoryScreen;

const styles = StyleSheet.create({});
