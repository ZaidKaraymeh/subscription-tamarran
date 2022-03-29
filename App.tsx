/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the Redux TypeScript template
 * https://github.com/rahsheen/react-native-template-redux-typescript
 *
 * @format
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
} from 'react-native';

import {
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import LearnReduxLinks from './src/components/LearnReduxLinks';
import Header from './src/components/Header';
import {Counter} from './src/features/counter/Counter';
import SubscribeScreen from './src/features/Subscription/SubscribeScreen';
import tw from 'twrnc';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './src/HomeScreen';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import DetailsScreen from './src/DetailsScreen';
import ProfileScreen from './src/ProfileScreen';
import AccountScreen from './src/AccountScreen';
import OrderHistoryScreen from './src/OrderHistoryScreen';


export type RootStackParamList = {
  Home: undefined;
  Subscribe: {user_id: number};
  Details: {booking_id: number; user_id: number};
  Profile: {user_id: number};
  Account: {user_id: number};
  OrderHistory: {user_id: number};
};

type Props = NativeStackScreenProps<RootStackParamList, 'Subscribe'>;
const RootStack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <NavigationContainer>
      <RootStack.Navigator initialRouteName="Home">
        <RootStack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerShown: false,
          }}
        />
        <RootStack.Screen
          name="Subscribe"
          component={SubscribeScreen}
          options={{
            animation: 'slide_from_right',
          }}
        />
        <RootStack.Screen name="Details" component={DetailsScreen} />
        <RootStack.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            animation: 'slide_from_left',
          }}
        />
        <RootStack.Screen
          name="Account"
          component={AccountScreen}
          options={{
            animation: 'slide_from_left',
          }}
        />
        <RootStack.Screen
          name="OrderHistory"
          component={OrderHistoryScreen}
          options={{
            animation: 'slide_from_left',
          }}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
    flex: 1,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
