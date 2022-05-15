import { Button, ScrollView, StyleSheet, Switch, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import tw from 'twrnc'
import Header from '../components/Header';
import { Booking, VendorSettingsAction, venueSettingsScreenProp } from '../types';
import { useDispatch } from 'react-redux';
import { saveVendorSettings } from '../features/userSlice';
import { getUserById, getVendorBookings } from '../features/userUtilities';
import { useNavigation } from '@react-navigation/native';
type Props = {}

const VendorSettings = ({route, navigation}: any) => {
    const {user} = route.params;
    // const user_new = getUserById(user.id)
    const [settings, setSettings] = useState<VendorSettingsAction>(user.vendor_settings)
    const dispatch = useDispatch()
    
    const onSubmit = () => {
      dispatch(saveVendorSettings({...settings, user}))
      navigation.navigate("Home", {user: user})
    }

    const bookings = getVendorBookings(user)

    const navigateVenueSettings = useNavigation<venueSettingsScreenProp>()

    // useEffect(() => {
    //   console.log(settings)
    
    // }, [settings])
    

  return (
    <View style={[tw`flex-1 bg-white`]}>
      <Header route={route} navigation={navigation} />
      <View style={tw`p-3`}>
        {/* <View style={tw`flex-row my-1`}>
          <View style={tw`flex-3`}>
            <Text style={tw`text-lg`}>Join the Tamarran Pro program</Text>
          </View>
          <View style={tw`flex-1 items-start pl-2 items-center`}>
            <Switch
              trackColor={{false: '#767577', true: '#81b0ff'}}
              thumbColor={settings.is_member ? '#f5dd4b' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={() =>
                setSettings({
                  ...settings,
                  is_member: !settings?.is_member,
                  all_access: false,
                })
              }
              value={settings.is_member}
            />
          </View>
        </View> */}
        {/* <View style={tw`flex-row my-1`}>
          <View style={[tw`flex-3 `]}>
            <Text style={tw`text-lg`}>Members Get All Access</Text>
          </View>
          <View style={tw`flex-1 items-start pl-2 items-center`}>
            <Switch
              trackColor={{false: '#767577', true: '#81b0ff'}}
              thumbColor={settings.all_access ? '#f5dd4b' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={() =>
                setSettings({...settings, all_access: !settings.all_access})
              }
              disabled={!settings.is_member}
              value={settings.all_access}
            />
          </View>
        </View> */}
        {/* <View style={tw`flex-row my-1`}>
          <View style={tw`flex-3 justify-center `}>
            <Text style={tw`text-lg`}>Max Access with Pro Benefits</Text>
          </View>
          <View style={tw`flex-1 items-start pl-2`}>
            <TextInput
            style={tw`h-45px text-xl border-b text-center`}
            onChangeText={(ev) => setSettings({...settings, max_access: ev})}
            value={settings.max_access.toString()}
            placeholder="Enter username"
            keyboardType="numeric"
            />
          </View>
        </View> */}
        {/* <View style={tw`my-4`}>
          <Button onPress={onSubmit} title="Save Changes" color="#54BAB9" />
        </View> */}
      </View>
      <Text style={tw`text-2xl text-center `} >Edit Venue & Activity Settings</Text>
      <ScrollView style={tw`flex-1`}>
        {bookings.map((booking : Booking) => {
          return (
            <TouchableOpacity
              key={booking.id}
              onPress={() => navigateVenueSettings.navigate('VenueSettings', {user, booking})}
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
              <View style={[tw`p-3 rounded-xl`]}>
                <Text style={tw`text-xl text-black`}> {booking.vendor_name} - {booking.location}</Text>
              </View>
            </TouchableOpacity>

          )
        })}
      </ScrollView>
    </View>
  );
};

export default VendorSettings

const styles = StyleSheet.create({})