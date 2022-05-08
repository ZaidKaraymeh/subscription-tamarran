import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'
import { selectUsers } from '../features/userSlice'
import { homeScreenProp, User } from '../types'
import { useNavigation } from '@react-navigation/native'
import tw from 'twrnc'
import Header from '../components/Header'

type Props = {}

const LoginScreen = (props: Props) => {
    const users = useSelector(selectUsers)
    const homeNavigation = useNavigation<homeScreenProp>()
  return (
    <View style={[tw`flex-1 bg-white`]}>
      <View
        style={[
          tw`flex-row h-50px bg-green-700`,
          {
            backgroundColor: '#1BBC31',
            shadowColor: 'black',
            shadowOpacity: 0.26,
            shadowOffset: {width: 0, height: 2},
            shadowRadius: 10,
            elevation: 15,
          },
        ]}>
        <View style={tw`flex-1 items-center justify-center`}>
        </View>
        <View style={tw`flex-2  justify-center items-center`}>
            <Text style={tw`text-xl pl-5 text-white `}>Login</Text>
        </View>
        <View style={tw`flex-1 items-center justify-center`}></View>
      </View>
      <ScrollView>
        {users.map((user: User) => {
          return (
            <TouchableOpacity
              key={user.id}
              onPress={() => homeNavigation.navigate('Home', {user: user})}
              style={[
                tw`flex-1 m-3 rounded-xl`,
                {
                  shadowColor: 'black',
                  shadowOpacity: 0.26,
                  shadowOffset: {width: 0, height: 2},
                  shadowRadius: 10,
                  elevation: 4,
                  backgroundColor: 'white',
                },
              ]}>
                  <View style={[tw`p-3 rounded-xl`]} >
                    <Text style={tw`text-xl text-black`}>ID: {user.id}</Text>
                    <Text style={tw`text-xl text-black`}>User: {user.username}</Text>
                    <Text style={tw`text-xl text-black`}>Email: {user.email}</Text>
                    <Text style={tw`text-xl text-black`}>Type: {user.user_type}</Text>
                  </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

export default LoginScreen

const styles = StyleSheet.create({})