import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Booking, User } from '../types';
import Header from '../components/Header';

type Props = {}

const VenueSettings = ({route, navigation}: any) => {
    const {user, booking}: {user: User, booking: Booking} = route.params;
  return (
    <View>
      <Header route={route} navigation={navigation} />
      <Text>{booking.vendor_name}</Text>
    </View>
  );
};

export default VenueSettings

const styles = StyleSheet.create({})