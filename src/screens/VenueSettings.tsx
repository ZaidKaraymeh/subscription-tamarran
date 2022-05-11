import { Button, ScrollView, StyleSheet, Switch, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { Booking, User, vendorSettingsScreenProp } from '../types';
import Header from '../components/Header';
import tw from 'twrnc'
import { useDispatch } from 'react-redux';
import { saveVenueSettings } from '../features/bookingReducer';
import { useNavigation } from '@react-navigation/native';

type Props = {}

const VenueSettings = ({route, navigation}: any) => {
    const {user, booking}: {user: User, booking: Booking} = route.params;
    const [settings, setSettings] = useState({...booking.booking_settings})

    const dispatch = useDispatch()
    const navigateVendorSettings = useNavigation<vendorSettingsScreenProp>()
    const onSubmit = () => {
      dispatch(saveVenueSettings({venue_settings:settings, user, booking}))
      navigateVendorSettings.navigate("VendorSettings", {user: user})
    }

  return (
    <View style={[tw`flex-1 bg-white`]}>
      <Header route={route} navigation={navigation} />
      <ScrollView style={[tw`flex-1 p-4`]}>
        <View style={tw`flex-row my-1`}>
          <View style={tw`flex-4 justify-center `}>
            <Text style={tw`text-lg`}>ِAdd this venue to Pro Membership</Text>
          </View>
          <View style={tw`flex-1 items-start pl-2`}>
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
        </View>
        <View style={tw`flex-row my-1`}>
          <View style={tw`flex-4 justify-center `}>
            <Text style={tw`text-lg`}>ِMembers Get All Access</Text>
          </View>
          <View style={tw`flex-1 items-start pl-2`}>
            <Switch
              trackColor={{false: '#767577', true: '#81b0ff'}}
              thumbColor={settings.all_access ? '#f5dd4b' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={() =>
                setSettings({
                  ...settings,
                  all_access: !settings.all_access,
                  max_access: "-1",
                })
              }
              disabled={!settings.is_member}
              value={settings.all_access}
            />
          </View>
        </View>
        <View style={tw`flex-row my-1`}>
          <View style={tw`flex-4 justify-center `}>
            <Text style={tw`text-lg`}>Max Access with Pro Benefits</Text>
          </View>
          <View style={tw`flex-1 items-start pl-2`}>
            <TextInput
              style={tw`h-45px text-xl border-b text-center`}
              // onChangeText={(ev) => setSettings({...settings, max_access: ev})}
              value={
                settings.all_access ? 'N/A' : settings.max_access!.toString()
              }
              placeholder="Enter username"
              keyboardType="numeric"
              editable={!settings.all_access}
              onChangeText={(ev)=> setSettings({
                ...settings,
                max_access: ev,
              })}
              
            />
          </View>
        </View>
        <View style={tw`my-4`}>
          <Button onPress={onSubmit} title="Save Changes" color="#54BAB9" />
        </View>
      </ScrollView>
    </View>
  );
};

export default VenueSettings

const styles = StyleSheet.create({})