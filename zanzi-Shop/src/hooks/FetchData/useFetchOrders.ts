import { useCallback } from "react";
import { orderService } from "../../services/apiServices";
import { Order } from "../../types";
import useFetch from "./useFetch";

const useFetchOrders = () => {
  const fetchOrders = useCallback(async (signal: AbortSignal) => {
    return await orderService.getAll(signal);
  }, []);
  return useFetch<Order[]>(fetchOrders, [], false,3,1000)
};

export default useFetchOrders;
