import { userService } from "../../services/apiServices";
import { User } from "../../types";
import useFetch from "./useFetch";

const useFetchUsers = () => {
  return useFetch<User[]>( (signal) => userService.getAll(signal), [], true,3,1000)
};

export default useFetchUsers;
