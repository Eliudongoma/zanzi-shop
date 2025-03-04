import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { auth } from "../config/firebase.js";

const JWT_Secret = process.env.JWT_SECRET || "secret-key";

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password, displayName } = req.body;
    const user = await auth.createUser({
      email,
      password,
      displayName,
    });

    res.status(201).json({ message: "User Registered", user });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  res.status(200).json({ message: "Firebase  handles login" });
};
