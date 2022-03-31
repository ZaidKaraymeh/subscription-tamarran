import { useSelector } from "react-redux";
import { selectUsers } from "./userSlice";

export const getUserById = (id: number) => {
  const users = useSelector(selectUsers);
  return users.find((user: any) => user.id == id);
};
