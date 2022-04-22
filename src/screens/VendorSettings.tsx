import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import tw from 'twrnc'
import Header from '../components/Header';
type Props = {}

const VendorSettings = ({route, navigation}: any) => {
    const {user} = route.params;
  return (
    <View style={[tw`flex-1`, {backgroundColor: '#FBF8F1'}]}>
      <Header route={route} navigation={navigation} />
      <Text>VendorSettings</Text>
    </View>
  );
};

export default VendorSettings

const styles = StyleSheet.create({})