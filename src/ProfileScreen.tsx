import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import tw from 'twrnc';
import {useSelector} from 'react-redux';
import {selectUsers} from './features/userSlice';
import {useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../App';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

export const getUserById = (user_id: number, users: any) => {
  return users.find((user: any) => user.id === user_id);
};

export type accountScreenProp = NativeStackNavigationProp<
  RootStackParamList,
  'Account'
>;

const ProfileScreen = ({route, navigation}: any) => {
    const {user_id} = route.params;
    const users = useSelector(selectUsers);

  const user = getUserById(user_id, users);
  const navigateAccount = useNavigation<accountScreenProp>();

  return (
    <View style={tw`flex-1`}>
      <TouchableOpacity
        onPress={() => navigateAccount.navigate('Account', {user_id: user_id})}>
        <View style={tw`h-50px  text-lg justify-center pl-5`}>
          <Text style={tw`text-xl font-bold`}>Account</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigateAccount.navigate('Account', {user_id: user_id})}>
        <View style={tw`h-50px  text-lg justify-center pl-5`}>
          <Text style={tw`text-xl font-bold`}>Booking History</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigateAccount.navigate('Subscribe', {user_id: user_id})}>
        <View style={tw`h-50px  text-lg justify-center pl-5`}>
          <Text style={tw`text-xl font-bold`}>Subscribe</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({});
