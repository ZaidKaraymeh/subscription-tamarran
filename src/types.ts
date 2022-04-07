export type RootStackParamList = {
  Home: undefined;
  Subscribe: {user_id: number};
  Details: {booking_id: number; user_id: number};
  Menu: {user_id: number};
  Account: {user_id: number};
  OrderHistory: {user_id: number};
  SalesHistory: {user_id: number};
};
