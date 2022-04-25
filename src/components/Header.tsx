import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import tw from 'twrnc';

type Props = {}

const Header = (props: any) => {
    const {route, navigation} = props
  return (
    <View
      style={[
        tw`flex-row h-50px bg-green-700`,
        {
          backgroundColor: '#687E4A',
          shadowColor: 'black',
          shadowOpacity: 0.26,
          shadowOffset: {width: 0, height: 2},
          shadowRadius: 10,
          elevation: 15,
        },
      ]}>
      <View style={tw`flex-1 items-center justify-center`}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={tw`text-xl pl-5 text-white`}>Back</Text>
        </TouchableOpacity>
      </View>
      <View style={tw`flex-2  justify-center items-center`}></View>
      <View style={tw`flex-2 items-center justify-center`}></View>
    </View>
  );
}

export default Header

const styles = StyleSheet.create({})