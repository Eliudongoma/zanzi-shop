import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const JWT_Secret = process.env.JWT_SECRET || "secret-key";

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    const userExists = await User.findOne({
      email,
    });
    if (userExists) {
      return res.status(400).json({ message: "Email already registered" });
    }
    const user = await User.create({
      name,
      email,
      password,
    });
    await user.save();

    const token = jwt.sign({ id: user._id, role: user.role }, JWT_Secret);
    res.status(201).json({ user, token });
  } catch (error) {
    res.status(500).json({ message: "Registration failed" });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({
      email,
    });
    if (!user || (await user.comparePassword(password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign({ id: user._id, role: user.role }, JWT_Secret);
    res.status(200).json({ user, token });
  } catch (error) {
    res.status(500).json({ message: "Login failed" });
  }
};
