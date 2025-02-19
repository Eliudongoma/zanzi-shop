import { Request, Response } from "express";
import Order from "../models/Order.js";
import { AuthRequest } from "../middleware/auth.js";

export const createOrder = async (req: AuthRequest, res: Response) => {
  try {
    const order = new Order({
      ...req.body,
      user: req.user?.id,
    });
    await order.save();
    res.status(201).json(order);
  } catch (error) {
    res.status(400).json({ message: "Order creation failed" });
  }
};

export const getOrders = async (req: AuthRequest, res: Response) => {
  try {
    const orders =
      req.user?.role === "admin"
        ? await Order.find().populate("items.product")
        : await Order.find({ user: req.user?.id }).populate("items.product");
    res.status(200).json(orders);
  } catch (error) {
    res.status(400).json({ message: "Failed to fetch orders" });
  }
};
