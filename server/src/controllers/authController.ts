import { Request, Response } from "express";
import admin, { auth } from "../config/firebase.js";
import User from "../models/User.js";

interface AuthenticatedRequest extends Request {
  user?: admin.auth.DecodedIdToken;
}

export const register = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const {firebaseUid, email, password, displayName, phoneNumber, role, firstName, lastName } = req.body;
    // const firebaseUser = await auth.createUser({
    //   email,
    //   password,
    //   displayName,
    // });

    const newUser = new User({
      firebaseUID: firebaseUid,
      email,
      firstName,
      lastName,
      phoneNumber,
      role
    });
    await newUser.save();
    res.status(201).json({ message: "User Registered", newUser });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  res.status(200).json({ message: "Firebase  handles login" });
};
