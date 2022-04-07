import { StyleSheet, Text, TouchableOpacity, View, Image, ImageBackground, ScrollView, Alert } from 'react-native'
import React, { Fragment } from 'react'
import tw from 'twrnc'
import { useDispatch, useSelector } from 'react-redux'
import { activateUserSubscription, selectUsers } from '../features/userSlice'
import { getUserById } from '../features/userUtilities'


type Props = {}

const gyms = [
  {
    name: "Batelco Gym",
  },
  {
    name: "Muharraq Indoors Gym",
  },
  {
    name: "Crossfit Gym",
  },
  {
    name: "Batelco Gym",
  },
  {
    name: "Muharraq Indoors Gym",
  },
  {
    name: "Crossfit Gym",
  },
  {
    name: "Batelco Gym",
  },
  {
    name: "Muharraq Indoors Gym",
  },
  {
    name: "Crossfit Gym",
  },
  {
    name: "Batelco Gym",
  },
  {
    name: "Muharraq Indoors Gym",
  },
  {
    name: "Crossfit Gym",
  },
]
const vendors = [
  {
    name: "GNC",
  },
  {
    name: "Dr. Nutrition",
  },
  {
    name: "Calorie Express",
  },
  {
    name: "GNC",
  },
  {
    name: "Dr. Nutrition",
  },
  {
    name: "Calorie Express",
  },
  {
    name: "GNC",
  },
  {
    name: "Dr. Nutrition",
  },
  {
    name: "Calorie Express",
  },
  
]

const SubscribeScreen = ({route, navigation}: any) => {
  const dispatch = useDispatch();
  const {user_id} = route.params;
  const user = getUserById(user_id);
  return (
    <ScrollView style={tw`flex-1 bg-white`}>
      <View style={tw`flex-1 flex-col items-center bg-white`}>
        <View style={tw``}>
          <Text style={tw`text-4xl my-5 mt-15 py-2 font-bold`}>
            <Image style={[tw`m-5`]} source={require('frontend/logo.png')} />
            <Text> </Text>
            Tamarran Pro
          </Text>
        </View>
        {user.is_subscribed ? (
          <Text style={tw`text-2xl`}>Subscription Active for 7 Days!</Text>
        ) : (
          <Fragment>
            <Text style={tw`text-3xl text-center my-3 font-light`}>
              Access to 20+ gyms and exclusive offers from 30+ vendors
            </Text>
            <TouchableOpacity
              onPress={() => {
                dispatch(activateUserSubscription({user: user}));
                Alert.alert('Subscription Activated Successful!', '', [
                  {
                    text: 'OK',
                    onPress: () =>
                      navigation.navigate('Home', {user_id: user.id}),
                  },
                ]);
              }}
              style={[tw`rounded-2xl my-5 bg-green-600`]}>
              <Text style={tw`text-3xl p-4 my-2 text-white w-80 text-center `}>
                Subscribe Now
              </Text>
            </TouchableOpacity>
            <Text style={tw`text-2xl`}>BD6/week or BD20/month</Text>
            <Text style={tw`text-xl`}>Cancel Anytime</Text>
            <View style={tw`flex-1 flex-col w-80 my-15`}>
              <Text style={tw`text-2xl font-bold  `}>Gyms Include: </Text>
              <View style={tw`border-b border-lime-700 my-2`}></View>
              {gyms.map((gym) => {
                return (
                  <Text
                    key={Math.floor(Math.random() * 9999999)}
                    style={tw`text-xl`}>
                    *{gym.name}
                  </Text>
                );
              })}
            </View>
            <View style={tw`flex-1 flex-col w-80 pb-10 `}>
              <Text style={tw`text-2xl font-bold  `}>Vendors Include: </Text>
              <View style={tw`border-b border-lime-700 my-2`}></View>
              {vendors.map((vendor) => {
                return (
                  <Text
                    key={Math.floor(Math.random() * 9999999)}
                    style={tw`text-xl`}>
                    *{vendor.name}
                  </Text>
                );
              })}
            </View>
          </Fragment>
        )}
      </View>
    </ScrollView>
  );
};

export default SubscribeScreen

const styles = StyleSheet.create({
  header: {width: '20%'},
  logo: {width: '30%'}
})