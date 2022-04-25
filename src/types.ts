import {NativeStackNavigationProp} from '@react-navigation/native-stack';

export type RootStackParamList = {
  Home: undefined;
  Subscribe: {user: User};
  Details: {booking_id: number; user: User};
  Menu: {user: User};
  Account: {user: User};
  OrderHistory: {user: User};
  SalesHistory: {user: User};
  Settings: {user: User};
  VendorSettings: {user: User}
};



export type vendorSettingsScreenProp = NativeStackNavigationProp<
  RootStackParamList,
  'VendorSettings'
>;
export type settingsScreenProp = NativeStackNavigationProp<
  RootStackParamList,
  'Settings'
>;
export type subscribeScreenProp = NativeStackNavigationProp<
  RootStackParamList,
  'Subscribe'
>;
export type detailScreenProp = NativeStackNavigationProp<
  RootStackParamList,
  'Details'
>;
export type menuScreenProp = NativeStackNavigationProp<
  RootStackParamList,
  'Menu'
>;

export type accountScreenProp = NativeStackNavigationProp<
  RootStackParamList,
  'Account'
>;
export type orderHistoryScreenProp = NativeStackNavigationProp<
  RootStackParamList,
  'OrderHistory'
>;
export type salesHistoryScreenProp = NativeStackNavigationProp<
  RootStackParamList,
  'SalesHistory'
>;

export type QRCodeType = {
  uri: string;
  width: number;
  height: number;
  base64: string | undefined;
};

export type BookingAction = {
  booking: Booking;
  user: User;
};

export type VendorSettingsAction = {
  is_member: boolean;
  all_access: boolean;
  max_access: string;
  user: User;
}
export type VendorSettings = {
  is_member: boolean;
  all_access: boolean;
  max_access: string;
}
export type SubscribeAction = {
  user: User;
};

export type OrderHistory = {
  id: number;
  vendor_name: string;
  price: number;
  user_id: number;
  is_user_subscribed: boolean;
  timing?: string;
};
export type Sales = {
  id: number;
  vendor_name: string;
  price: number;
  user_id: number;
  timing?: string;
};

export type User = {
  id: number;
  username: string;
  email: string;
  is_subscribed: boolean;
  purchases_count: number;
  order_histroy: OrderHistory[];
  user_type: 'vendor' | 'customer';
  sales?: Sales[];
  vendor_bookings_id?: number []
  vendor_settings: VendorSettings,
};
export type Booking = {
  id: number;
  vendor_name: string;
  vendor_user_id: number;
  description: string;
  price: number;
  stars: number;
  member_price: number;
  location: string;
  timing?: string;
};