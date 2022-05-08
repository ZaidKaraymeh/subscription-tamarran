import { useSelector } from "react-redux";
import { User, Booking } from "../types";
import { bookings, selectUsers } from "./userSlice";

export const getUserById = (id: number) => {
  const users = useSelector(selectUsers);
  return users.find((user: any) => user.id == id);
};

export const getBookingById = (id: number) => {
  return bookings.bookings.find((booking) => booking.id === id);
};

export const getVendorBookingsById = (user: User) => {
  const {vendor_bookings_id} = user

  let bookings: any[] = []
  
  for (let index = 0; index < vendor_bookings_id.length; index++) {
    bookings = [...bookings, getBookingById(vendor_bookings_id[index])]
  }

  return bookings

}