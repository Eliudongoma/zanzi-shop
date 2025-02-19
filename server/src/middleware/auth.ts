import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "secret-key";

export interface AuthRequest extends Request {
  user?: {
    id: string;
    role: string;
  };
}
export const auth = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer", "");
    if (!token) {
      throw new Error();
    }

    const decoded = jwt.verify(token, JWT_SECRET) as {
      id: string;
      role: string;
    };
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Please authenticate" });
  }
};
export const isAdmin = (req:AuthRequest,res:Response,next:NextFunction) =>       {
  if(req.user?.role !== 'admin'){
    return  res.status(403).json({ message: "Admin access required" });
  }
  next();
};

