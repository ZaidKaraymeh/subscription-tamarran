import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, { Fragment } from 'react';
import tw from 'twrnc';
import {useSelector} from 'react-redux';
import {selectUsers, User} from './features/userSlice';
import {useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../App';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import { getUserById } from './features/userUtilities';


export type accountScreenProp = NativeStackNavigationProp<
  RootStackParamList,
  'Account'
>;
export type orderHistoryScreenProp = NativeStackNavigationProp<
  RootStackParamList,
  'OrderHistory'
>;
export type salesHistoryScreenProp = NativeStackNavigationProp<
  RootStackParamList,
  'SalesHistory'
>;

const MenuScreen = ({route, navigation}: any) => {
    const {user_id} = route.params;

  const user: User = getUserById(user_id)
  const navigateAccount = useNavigation<accountScreenProp>();
  const navigateOrderHistory = useNavigation<orderHistoryScreenProp>();
  const navigateSalesHistory = useNavigation<salesHistoryScreenProp>();

  return (
    <View style={tw`flex-1`}>
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
