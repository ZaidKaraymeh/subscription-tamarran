import {
  Image,
  ImageBackground,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import SubscribeScreen from './features/Subscription/SubscribeScreen';
import {SafeAreaView} from 'react-native-safe-area-context';
import tw from 'twrnc';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {getUserById} from './features/userSlice';
import {RootStackParamList} from '../App';
import {Booking} from './features/userSlice';

export type subscribeScreenProp = NativeStackNavigationProp<
  RootStackParamList,
  'Subscribe'
>;
export type detailScreenProp = NativeStackNavigationProp<
  RootStackParamList,
  'Details'
>;
export type profileScreenProp = NativeStackNavigationProp<
  RootStackParamList,
  'Profile'
>;
type Props = {};

interface BookingsInterface {
  bookings: Booking[]
}

export const bookings:BookingsInterface ={
    bookings: [
      {
        id: 1,
        vendor_name: 'Busaiteen Football Club',
        price: 25,
        member_price: 20,
        stars: 5,
        location: 'Busaiteen',
        timing: "None",
      },
      {
        id: 2,
        vendor_name: 'CrossFit Gym',
        price: 35,
        member_price: 20,
        stars: 3,
        location: 'Riffa',
        timing: "8:00-9:30",
      },
      {
        id: 3,
        vendor_name: 'Batelco Gym',
        price: 20,
        member_price: 10,
        stars: 4,
        location: 'Hamala',
        timing: "None",
      },
    ]
} 

const HomeScreen = (props: Props) => {
  const navigateSubscribe = useNavigation<subscribeScreenProp>();
  const navigateDetails = useNavigation<detailScreenProp>();
  const navigateProfile = useNavigation<profileScreenProp>();

  const user = getUserById(2);

  return (
    <ScrollView style={tw`flex-1 bg-white`}>
      <View style={tw`flex-row h-75px bg-green-700 mb-2`}>
        <View style={tw` w-20 h-75px justify-center items-center`}>
          <TouchableOpacity
            onPress={() => navigateSubscribe.navigate('Subscribe', {user_id: user.id})}>
            <Text
              onPress={() =>
                navigateProfile.navigate('Profile', {user_id: user.id})
              }>
              Menu
            </Text>
          </TouchableOpacity>
        </View>
        <View style={tw` w-60 h-75px justify-center items-center`}>
          <View
            style={tw`bg-white h-38px border w-200px rounded-2xl justify-center px-2`}>
            <Text>Try "Gym"</Text>
          </View>
        </View>
        <View style={tw` w-20 h-75px justify-center items-center`}>
          <Text></Text>
        </View>
      </View>
      {bookings.bookings.map((booking) => {
        return (
          <TouchableOpacity
            key={booking.id}
            style={tw`border my-1 mx-3 rounded-2xl`}
            onPress={() =>
              navigateDetails.navigate('Details', {
                booking_id: booking.id,
                user_id: user.id
              })
            }>
            <ImageBackground
              source={{uri: `https://picsum.photos/id/1058/1000/1000`}}
              style={tw`h-150px rounded-2xl  opacity-85 p-2 justify-end`}
              imageStyle={{borderRadius: 15}}>
              <View>
                <Text style={tw`text-base font-bold`}>
                  {booking.vendor_name}
                </Text>
                <Text style={tw`text-base font-bold`}>
                  {booking.stars}/5 Reviews
                </Text>
                <Text style={tw`text-base font-bold`}>{booking.location}</Text>
              </View>
            </ImageBackground>
          </TouchableOpacity>
        );
      })}

      {/* <TouchableOpacity 
        onPress={() => navigate.navigate("Subscribe")}
        style={tw`bg-green-600 rounded-2xl my-5 mx-5`}>
        <Text style={tw`text-xl p-4 my-2 text-white text-center`}>
          Become a Tamarran Pro Member
        </Text>
      </TouchableOpacity> */}
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
