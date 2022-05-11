import { useSelector } from "react-redux";
import { User, Booking, OrderHistory } from "../types";
import { selectBookings } from "./bookingReducer";
import { selectUsers } from "./userSlice";

export const getUserById = (id: number) => {
  const users = useSelector(selectUsers);
  return users.find((user: any) => user.id == id);
};

export const getBookingById = (id: number) => {
  const bookings = useSelector(selectBookings)
  return bookings.find((booking: Booking) => booking.id === id);
};

export const getVendorBookings = (user: User) => {
  const {vendor_bookings_id} = user

  let bookings: any[] = []
  
  for (let index = 0; index < vendor_bookings_id.length; index++) {
    bookings = [...bookings, getBookingById(vendor_bookings_id[index])]
  }

  return bookings

}

export const getUserProAccessLeft = (user: User, vendor: Booking) => {
  if (vendor.booking_settings.max_access == null) {return}
  let bookings_amount : number = 0
  for (let index = 0; index < user.order_histroy.length; index++) {
    if (user.order_histroy[index].vendor_id === vendor.id){
      bookings_amount += 1;
    }
    // console.log("bookings amount ", bookings_amount)
    
  }
  // const user_vendor_orders = user.order_histroy.map(
  //   (booking: OrderHistory) => {
  //     if (booking.id === vendor.id){
  //       return bookings = [...bookings, booking]
  //     }
  // })
  const access_left =  parseInt(vendor.booking_settings.max_access) - bookings_amount
  return access_left < 0 ? 0 : access_left
};