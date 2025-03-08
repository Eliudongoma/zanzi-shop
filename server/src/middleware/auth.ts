import { NextFunction, Request, Response } from "express";
import { auth } from "../config/firebase.js";
declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}

const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    res.status(401).json({ message: "Unauthorised: no token provided" });
    return;
  }
  try {
    const decodedToken = await auth.verifyIdToken(token);
    req.userId = decodedToken.uid;
    next();
  } catch (error) {
    res.status(401).json({ message: "Unauthorzed: invalid token" });
    return;
  }
};
export default authenticate;
