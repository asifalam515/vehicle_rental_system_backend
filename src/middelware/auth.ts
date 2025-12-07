import { NextFunction, Request, Response } from "express";
import jwt, { decode, JwtPayload } from "jsonwebtoken";
import config from "../config";

const auth = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ message: "Unauthorized. Token missing or invalid format." });
    }
    // now get the token
    const token = authHeader.split(" ")[1] as string;
    try {
      const decoded = jwt.verify(token, config.jwtSecret as string);
      console.log(decode);
      req.user = decode as JwtPayload;
      next();
    } catch (error: any) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }
  };
};
export default auth;
