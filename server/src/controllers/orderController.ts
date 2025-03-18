import { OrderModel } from "../models/Order.js";
import createCRUDController from "./genericController.js";

const orderController = createCRUDController(OrderModel, "order");

export const getAllOrders = orderController.getAll;
export const getOrder = orderController.getById;
export const createOrder = orderController.create;
export const updateOrder = orderController.update;
export const deleteOrder = orderController.delete;

export default orderController;