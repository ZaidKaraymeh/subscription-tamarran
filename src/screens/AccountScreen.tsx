import {StyleSheet, Text, View} from 'react-native';
import React, { Fragment } from 'react';
import {useSelector} from 'react-redux';
import {Booking, selectUsers, User} from '../features/userSlice';
import tw from 'twrnc'
import { getUserById } from '../features/userUtilities';

type Props = {};

const AccountScreen = ({route, navigation}: any) => {
  const {user_id} = route.params;

  const user:User = getUserById(user_id);
  return (
    <View style={tw`flex-1 mx-2 mt-2`} >
      <Text style={tw` text-xl`} >
          Id: {user.id}
      </Text>
      <Text style={tw` text-xl`} >
          Username: {user.username}
      </Text>
      <Text style={tw` text-xl`} >
          Email: {user.email}
      </Text>
      <Text style={tw` text-xl`} >
          Subscription Active: {user.is_subscribed ? "Yes" : "No"}
      </Text>
      <Text style={tw` text-xl`} >
          User Type: {user.user_type}
      </Text>
        {user.is_subscribed && user.user_type == "customer" ? 
          <Text style={tw` text-xl`} >
                Purchases Left: {5 - user.purchases_count}
          </Text>
          :
          <Fragment></Fragment>
        }
      
    </View>
  );
};

export default AccountScreen;

const styles = StyleSheet.create({});
