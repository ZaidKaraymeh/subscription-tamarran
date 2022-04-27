import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import tw from 'twrnc'
import { useNavigation } from '@react-navigation/native'
import { vendorSettingsScreenProp } from '../types'
import Header from '../components/Header'

type Props = {}

const SettingsScreen = ({route, navigation}: any) => {
    const {user} = route.params;
  const navigateVendorSettings = useNavigation<vendorSettingsScreenProp>();
  return (
    <View style={[tw`flex-1 bg-white`]}>
      <Header route={route} navigation={navigation} />
      <TouchableOpacity
        onPress={() =>
          navigateVendorSettings.navigate('VendorSettings', {user: user})
        }>
        <View style={tw`h-50px  text-lg justify-center pl-5`}>
          <Text style={tw`text-xl font-bold`}>Vendor Subscription</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default SettingsScreen

const styles = StyleSheet.create({})