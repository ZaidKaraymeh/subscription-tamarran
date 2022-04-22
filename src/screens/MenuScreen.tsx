import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, { Fragment } from 'react';
import tw from 'twrnc';
import {useSelector} from 'react-redux';
import {selectUsers} from '../features/userSlice';
import {useNavigation} from '@react-navigation/native';
import {RootStackParamList, settingsScreenProp, User} from '../types';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import { getUserById } from '../features/userUtilities';

import {accountScreenProp, orderHistoryScreenProp, salesHistoryScreenProp} from '../types';
import Header from '../components/Header';



const MenuScreen = ({route, navigation}: any) => {
    const {user_id} = route.params;
    const params = {route, navigation};
  const user: User = getUserById(user_id)
  const navigateAccount = useNavigation<accountScreenProp>();
  const navigateOrderHistory = useNavigation<orderHistoryScreenProp>();
  const navigateSalesHistory = useNavigation<salesHistoryScreenProp>();
  const navigateSettings = useNavigation<settingsScreenProp>();

  return (
    <View style={[tw`flex-1`, {backgroundColor: '#FBF8F1'}]}>
      <Header route={route} navigation={navigation} />
      <TouchableOpacity
        onPress={() => navigateAccount.navigate('Account', {user_id: user_id})}>
        <View style={tw`h-50px  text-lg justify-center pl-5`}>
          <Text style={tw`text-xl font-bold`}>Account</Text>
        </View>
      </TouchableOpacity>
      {user.user_type == 'customer' ? (
        <Fragment>
          <TouchableOpacity
            onPress={() =>
              navigateOrderHistory.navigate('OrderHistory', {user_id: user_id})
            }>
            <View style={tw`h-50px  text-lg justify-center pl-5`}>
              <Text style={tw`text-xl font-bold`}>Booking History</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              navigateAccount.navigate('Subscribe', {user_id: user_id})
            }>
            <View style={tw`h-50px  text-lg justify-center pl-5`}>
              <Text style={tw`text-xl font-bold`}>Subscribe</Text>
            </View>
          </TouchableOpacity>
        </Fragment>
      ) : (
        <Fragment>
          <TouchableOpacity
            onPress={() => navigateSettings.navigate('Settings', {user: user})}>
            <View style={tw`h-50px  text-lg justify-center pl-5`}>
              <Text style={tw`text-xl font-bold`}>Settings</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              navigateSalesHistory.navigate('SalesHistory', {user_id: user_id})
            }>
            <View style={tw`h-50px  text-lg justify-center pl-5`}>
              <Text style={tw`text-xl font-bold`}>Sales History</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              navigateSalesHistory.navigate('SalesHistory', {user_id: user_id})
            }>
            <View style={tw`h-50px  text-lg justify-center pl-5`}>
              <Text style={tw`text-xl font-bold`}>Scan QR Code</Text>
            </View>
          </TouchableOpacity>
        </Fragment>
      )}
    </View>
  );
};

export default MenuScreen;

const styles = StyleSheet.create({});
