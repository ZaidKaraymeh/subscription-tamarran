import { Button, StyleSheet, Switch, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import tw from 'twrnc'
import Header from '../components/Header';
import { VendorSettingsAction } from '../types';
import { useDispatch } from 'react-redux';
import { saveVendorSettings } from '../features/userSlice';
import { getUserById } from '../features/userUtilities';
type Props = {}

const VendorSettings = ({route, navigation}: any) => {
    const {user} = route.params;
    // const user_new = getUserById(user.id)
    const [settings, setSettings] = useState<VendorSettingsAction>(user.vendor_settings)
    const dispatch = useDispatch()
    const onSubmit = () => {
      dispatch(saveVendorSettings({...settings, user}))
      navigation.navigate("Home")
    }

    // useEffect(() => {
    //   console.log(settings)
    
    // }, [settings])
    

  return (
    <View style={[tw`flex-1`, {backgroundColor: '#FBF8F1'}]}>
      <Header route={route} navigation={navigation} />
      <View style={tw`p-3`}>
        <View style={tw`flex-row my-1`}>
          <View style={tw`flex-3`}>
            <Text style={tw`text-lg`}>Join the Tamarran Pro program</Text>
          </View>
          <View style={tw`flex-1 items-start pl-2 items-center`}>
            <Switch
              trackColor={{false: '#767577', true: '#81b0ff'}}
              thumbColor={settings?.is_member ? '#f5dd4b' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={() =>
                setSettings({...settings, is_member: !settings?.is_member, all_access: false})
              }
              value={settings.is_member}
            />
          </View>
        </View>
        <View style={tw`flex-row my-1`}>
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
        </View>
        <View style={tw`flex-row my-1`}>
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
        </View>
        <View style={tw`my-4`} >
          <Button onPress={onSubmit} title="Save Changes" color="#54BAB9" />
        </View>
      </View>
    </View>
  );
};

export default VendorSettings

const styles = StyleSheet.create({})