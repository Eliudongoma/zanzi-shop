import { useCallback } from "react";
import { userService } from "../../services/apiServices";
import { User } from "../../types";
import useFetch from "./useFetch";

const useFetchUsers = () => {
  const fetchUsers = useCallback(async (signal: AbortSignal) => {
    return await userService.getAll(signal);
  }, []);
  return useFetch<User[]>(fetchUsers, [], false,3,1000)
};

export default useFetchUsers;
