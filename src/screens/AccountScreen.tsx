import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, { Fragment } from 'react';
import {useSelector} from 'react-redux';
import {selectUsers} from '../features/userSlice';
import tw from 'twrnc'
import { getUserById } from '../features/userUtilities';
import { User } from '../types';
import Header from '../components/Header';

type Props = {};

const AccountScreen = ({route, navigation}: any) => {
  const {user} = route.params;

  return (
    <View style={[tw`flex-1 bg-white`]}>
      <Header route={route} navigation={navigation} />
      <View style={tw`p-3`}>
        <Text style={tw` text-xl`}>Id: {user.id}</Text>
        <Text style={tw` text-xl`}>Username: {user.username}</Text>
        <Text style={tw` text-xl`}>Email: {user.email}</Text>
        <Text style={tw` text-xl`}>
          Subscription Active: {user.is_subscribed ? 'Yes' : 'No'}
        </Text>
        <Text style={tw` text-xl`}>User Type: {user.user_type}</Text>
        {user.is_subscribed && user.user_type == 'customer' ? (
          <Text style={tw` text-xl`}>
            Purchases Left: {5 - user.purchases_count}
          </Text>
        ) : (
          <Fragment></Fragment>
        )}
      </View>
    </View>
  );
};

export default AccountScreen;

const styles = StyleSheet.create({});
