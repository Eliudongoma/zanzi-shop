import { Request, Response } from "express";
import admin from "../config/firebase.js";
import User from "../models/User.js";

interface AuthenticatedRequest extends Request {
  user?: admin.auth.DecodedIdToken;
}

export const register = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const {
      email,
      phoneNumber,
      role,
      password,
      firstName,
      lastName,
    } = req.body;
    const userRecord = await admin.auth().createUser({
      email, password
    })
    await admin.auth().setCustomUserClaims(userRecord.uid, {role})
    const newUser = new User({
      firebaseUID: userRecord.uid,
      email,
      firstName,
      lastName,
      phoneNumber,
      role,
      registeredAt: new Date()
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
